// src/app/students/api/lounge/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/** Create a supabase client bound to the incoming user's auth token */
function sb(token: string): SupabaseClient {
  return createClient(SUPABASE_URL, SUPABASE_ANON, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** "music-production" → "Music Production" */
const toTitle = (slug: string): string =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());

type LoungeResponse = {
  course: { slug: string; title: string };
  progress: { done: number; total: number; percent: number };
  gpa: { percent: number };
  links: Array<{ label: string; href: string }>;
  announcements: Array<{ id: string; title: string; body?: string }>;
};

/**
 * GET /students/api/lounge
 * optional query: ?course=<slug>
 * Requires Authorization: Bearer <token>
 */
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

    // Which course? query param takes precedence, else active enrollment, else default
    const url = new URL(req.url);
    const qCourse = url.searchParams.get("course") ?? undefined;

    // Try to read active enrollment
    let course_slug: string | undefined = qCourse;
    if (!course_slug) {
      const { data: enr, error: enrErr } = await supabase
        .from("enrollments")
        .select("course_slug, is_active")
        .eq("user_id", user.id)
        .order("is_active", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!enrErr && enr?.course_slug) course_slug = enr.course_slug;
    }
    if (!course_slug) course_slug = "music-production";

    // Progress summary (best-effort; if tables are empty, fall back to zeros)
    let done = 0;
    let total = 0;

    // total lessons from our lessons table (optional)
    const { data: lessons } = await supabase
      .from("lessons")
      .select("id")
      .eq("course_slug", course_slug);

    total = Array.isArray(lessons) ? lessons.length : 8; // fallback to 8

    // completed from progress table (optional)
    const { data: prog } = await supabase
      .from("progress")
      .select("lesson_id")
      .eq("user_id", user.id)
      .eq("course_slug", course_slug)
      .eq("completed", true);

    done = Array.isArray(prog) ? prog.length : 0;

    const percent = total > 0 ? Math.round((done / total) * 100) : 0;

    // simple GPA proxy for now: equal to progress percent
    const gpaPct = percent;

    const links: LoungeResponse["links"] = [
      { label: "Student Discord", href: "/students/discord" },
      { label: "Contact Teacher", href: "mailto:teacher@the808academy.com" },
      { label: "Tech Support", href: "mailto:support@the808academy.com" },
      { label: "Book Tutoring", href: "/tutoring" },
    ];

    const announcements: LoungeResponse["announcements"] = [
      { id: "welcome", title: "Welcome to the Student Lounge" },
    ];

    const body: LoungeResponse = {
      course: { slug: course_slug, title: toTitle(course_slug) },
      progress: { done, total, percent },
      gpa: { percent: gpaPct },
      links,
      announcements,
    };

    return NextResponse.json(body);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
