// src/app/students/api/courses/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Pull totals from your course data (import per course)
import { lessons as mpLessons } from "../../music-production/data/lessons";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function client(token: string) {
  return createClient(supabaseUrl, supabaseAnon, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

const COURSE_TOTALS: Record<string, number> = {
  "music-production": mpLessons.length,
  // add future courses here (or import similarly)
};

export async function GET(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization") || "";
    const token = auth.replace(/^Bearer\s+/i, "").trim();
    if (!token) return NextResponse.json({ error: "Missing auth" }, { status: 401 });

    const supabase = client(token);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    // fetch available courses
    const { data: courses, error: cErr } = await supabase
      .from("courses")
      .select("slug,title")
      .order("created_at", { ascending: true });

    if (cErr) return NextResponse.json({ error: cErr.message }, { status: 400 });

    // user progress by course
    const { data: progressRows, error: pErr } = await supabase
      .from("lesson_progress")
      .select("course_slug, lesson_id, completed")
      .eq("user_id", user.id)
      .eq("completed", true);

    if (pErr) return NextResponse.json({ error: pErr.message }, { status: 400 });

    const completedMap = new Map<string, Set<string>>();
    for (const row of progressRows ?? []) {
      if (!completedMap.has(row.course_slug)) completedMap.set(row.course_slug, new Set());
      completedMap.get(row.course_slug)!.add(row.lesson_id);
    }

    const items = (courses ?? []).map((c) => {
      const total = COURSE_TOTALS[c.slug] ?? 0;
      const done = completedMap.get(c.slug)?.size ?? 0;
      const pct = total > 0 ? Math.round((done / total) * 100) : 0;
      return {
        slug: c.slug,
        title: c.title,
        total,
        completed: done,
        percent: pct,
      };
    });

    return NextResponse.json({ courses: items });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
