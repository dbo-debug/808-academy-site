// src/app/students/api/quiz/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client-scoped supabase (uses user's JWT to identify them)
function authedClient(token: string) {
  return createClient(supabaseUrl, supabaseAnon, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// Server-scoped supabase (bypasses RLS; DO NOT use in client components)
function adminClient() {
  if (!serviceRoleKey) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

type SubmittedAnswer = {
  question_id: string;
  selected_answer: "A" | "B" | "C" | "D";
};

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const quiz_id = url.searchParams.get("quiz_id");
    if (!quiz_id) {
      return NextResponse.json({ error: "Missing quiz_id" }, { status: 400 });
    }

    // Must be authed (students only)
    const auth = req.headers.get("authorization") || "";
    const token = auth.replace(/^Bearer\s+/i, "").trim();
    if (!token) return NextResponse.json({ error: "Missing auth" }, { status: 401 });

    const supabase = authedClient(token);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    // Fetch questions WITHOUT correct answers
    const admin = adminClient();
    const { data: questions, error } = await admin
      .from("quiz_questions")
      .select("id, order_index, type, prompt, choices, difficulty, tags")
      .eq("quiz_id", quiz_id)
      .order("order_index", { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ questions: questions ?? [] });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization") || "";
    const token = auth.replace(/^Bearer\s+/i, "").trim();
    if (!token) return NextResponse.json({ error: "Missing auth" }, { status: 401 });

    const body = await req.json();

    const {
      course_slug,
      lesson_id,
      quiz_id,
      answers, // array of {question_id, selected_answer}
    }: {
      course_slug: string;
      lesson_id: string;
      quiz_id: string;
      answers: SubmittedAnswer[];
    } = body;

    if (!course_slug || !lesson_id || !quiz_id || !Array.isArray(answers)) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const supabase = authedClient(token);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const admin = adminClient();

    // Get quiz metadata (passing score + question count)
    const { data: quiz, error: quizErr } = await admin
      .from("quizzes")
      .select("id, passing_score, question_count, is_published")
      .eq("id", quiz_id)
      .single();

    if (quizErr) return NextResponse.json({ error: quizErr.message }, { status: 400 });
    if (!quiz?.is_published) {
      return NextResponse.json({ error: "Quiz not published" }, { status: 403 });
    }

    // Load correct answers
    const { data: qs, error: qErr } = await admin
      .from("quiz_questions")
      .select("id, correct_answer")
      .eq("quiz_id", quiz_id);

    if (qErr) return NextResponse.json({ error: qErr.message }, { status: 400 });

    const correctMap = new Map<string, string>();
    (qs ?? []).forEach((q) => correctMap.set(q.id, q.correct_answer));

    const max_score = quiz?.question_count ?? (qs?.length ?? 10);

    // Grade
    let correctCount = 0;
    const normalized = answers.map((a) => ({
      question_id: a.question_id,
      selected_answer: a.selected_answer,
      is_correct: correctMap.get(a.question_id) === a.selected_answer,
    }));

    normalized.forEach((a) => {
      if (a.is_correct) correctCount += 1;
    });

    const scorePct = Math.round((correctCount / Math.max(1, max_score)) * 100);
    const passed = scorePct >= (quiz?.passing_score ?? 70);

    // Insert attempt (store raw submitted answers too for debugging / audit)
    const { data: attemptRow, error: insErr } = await admin
      .from("quiz_attempts")
      .insert({
        user_id: user.id,
        course_slug,
        lesson_id,
        quiz_id,
        answers, // raw json
        score: scorePct,
        max_score,
        passed,
        submitted_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (insErr) return NextResponse.json({ error: insErr.message }, { status: 400 });

    // Insert per-question answers (optional but valuable)
    if (attemptRow?.id) {
      const attemptAnswers = normalized.map((a) => ({
        attempt_id: attemptRow.id,
        question_id: a.question_id,
        selected_answer: a.selected_answer,
        is_correct: a.is_correct,
      }));

      const { error: ansErr } = await admin
        .from("quiz_attempt_answers")
        .insert(attemptAnswers);

      // Don’t fail whole request if this part errors; but report it
      if (ansErr) {
        return NextResponse.json({
          ok: true,
          score: scorePct,
          passed,
          correct: correctCount,
          max: max_score,
          warning: `Attempt saved but per-question answers failed: ${ansErr.message}`,
        });
      }
    }

    // If passed, mark lesson_progress complete
    if (passed) {
      // upsert is safest
      const { error: lpErr } = await admin
        .from("lesson_progress")
        .upsert(
          {
            user_id: user.id,
            course_slug,
            lesson_id,
            completed: true,
            completed_at: new Date().toISOString(),
          },
          { onConflict: "user_id,course_slug,lesson_id" }
        );

      if (lpErr) {
        // still return quiz result; progress update can be fixed
        return NextResponse.json({
          ok: true,
          score: scorePct,
          passed,
          correct: correctCount,
          max: max_score,
          warning: `Progress update failed: ${lpErr.message}`,
        });
      }
    }

    return NextResponse.json({
      ok: true,
      score: scorePct,
      passed,
      correct: correctCount,
      max: max_score,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}
