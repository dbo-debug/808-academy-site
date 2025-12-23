// src/app/students/api/submissions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 🔹 Optional: admin + email envs
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

const ZAPIER_SUBMISSION_WEBHOOK_URL =
  process.env.ZAPIER_SUBMISSION_WEBHOOK_URL ?? "";

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "no-reply@the808academy.com";
const SUBMISSIONS_NOTIFY_EMAIL =
  process.env.SUBMISSIONS_NOTIFY_EMAIL ?? "";

// ---------- helpers ----------

function sb(token: string): SupabaseClient {
  return createClient(SUPABASE_URL, SUPABASE_ANON, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

type Kind = "homework" | "sync" | "remix";

type Body = {
  kind: Kind;
  title?: string;
  url?: string;
  notes?: string;
  courseSlug?: string;
  lessonSlug?: string;
};

type SubmissionRow = {
  id: string;
  user_id: string;
  user_email: string | null;
  user_name: string | null;
  kind: Kind;
  course_slug: string | null;
  lesson_slug: string | null;
  title: string | null;
  url: string | null;
  notes: string | null;
  created_at: string;
};

function getMetadataName(metadata: unknown): string | null {
  if (!metadata || typeof metadata !== "object") return null;
  const fullName = (metadata as Record<string, unknown>).full_name;
  return typeof fullName === "string" ? fullName : null;
}

// Fire-and-forget Zapier webhook
async function notifyZapier(submission: SubmissionRow) {
  if (!ZAPIER_SUBMISSION_WEBHOOK_URL) return;

  try {
    await fetch(ZAPIER_SUBMISSION_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "student_submission",
        submission,
      }),
    });
  } catch (err) {
    console.error("[submissions] zapier webhook error", err);
  }
}

// Fire-and-forget Resend email
async function notifyResend(submission: SubmissionRow) {
  if (!RESEND_API_KEY || !SUBMISSIONS_NOTIFY_EMAIL) return;

  const subject = `[808] New ${submission.kind} submission from ${
    submission.user_name || submission.user_email || "Student"
  }`;

  const lines = [
    `Kind: ${submission.kind}`,
    `Course: ${submission.course_slug ?? "—"}`,
    `Lesson: ${submission.lesson_slug ?? "—"}`,
    `Student: ${submission.user_name ?? "—"}`,
    `Email: ${submission.user_email ?? "—"}`,
    `Title: ${submission.title ?? "—"}`,
    `URL: ${submission.url ?? "—"}`,
    `Notes: ${submission.notes ?? "—"}`,
    `Created at: ${submission.created_at}`,
  ];

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: [SUBMISSIONS_NOTIFY_EMAIL],
        subject,
        text: lines.join("\n"),
      }),
    });
  } catch (err) {
    console.error("[submissions] resend email error", err);
  }
}

// ---------- POST: create submission ----------
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();

    if (!token) {
      return NextResponse.json({ error: "Missing auth" }, { status: 401 });
    }

    const body = (await req.json().catch(() => null)) as Body | null;
    if (!body || !body.kind) {
      return NextResponse.json(
        { error: "Missing submission kind" },
        { status: 400 }
      );
    }

    const supabase = sb(token);
    const { data: auth } = await supabase.auth.getUser();
    const user = auth?.user;
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { kind, title, url, notes, courseSlug, lessonSlug } = body;

    const userEmail = user.email ?? null;
    const userName =
      getMetadataName(user.user_metadata) ??
      user.email?.split("@")[0] ??
      "Student";

    const { data: inserted, error: insertErr } = await supabase
      .from("student_submissions")
      .insert({
        user_id: user.id,
        user_email: userEmail,
        user_name: userName,
        kind,
        course_slug: courseSlug ?? "music-production",
        lesson_slug: lessonSlug || null,
        title: title ?? null,
        url: url ?? null,
        notes: notes ?? null,
      })
      .select()
      .single<SubmissionRow>();

    if (insertErr || !inserted) {
      console.error("[submissions] insert error", insertErr);
      return NextResponse.json(
        { error: "Failed to save submission" },
        { status: 500 }
      );
    }

    // Fire-and-forget notifications – don't block or throw for user
    void notifyZapier(inserted);
    void notifyResend(inserted);

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    console.error("[submissions] POST error", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// ---------- GET: list submissions ----------
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();

    if (!token) {
      return NextResponse.json({ error: "Missing auth" }, { status: 401 });
    }

    const supabase = sb(token);
    const { data: auth } = await supabase.auth.getUser();
    const user = auth?.user;
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const email = (user.email ?? "").toLowerCase();
    const isAdmin = ADMIN_EMAILS.includes(email);

    // RLS still controls what rows we get back.
    const { data, error } = await supabase
      .from("student_submissions")
      .select(
        "id, user_id, user_email, user_name, kind, course_slug, lesson_slug, title, url, notes, created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[submissions] select error", error);
      return NextResponse.json(
        { error: "Failed to fetch submissions" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      submissions: (data ?? []) as SubmissionRow[],
      isAdmin,
    });
  } catch (e: unknown) {
    console.error("[submissions] GET error", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
