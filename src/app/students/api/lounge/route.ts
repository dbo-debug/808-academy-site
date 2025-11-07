// src/app/students/api/lounge/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { lessons as mpLessons } from "../../music-production/data/lessons";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const COURSE_TOTALS: Record<string, number> = {
  "music-production": mpLessons.length,
  // add more course totals as they go live
};

function client(token: string) {
  return createClient(supabaseUrl, supabaseAnon, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function GET(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization") || "";
    const token = auth.replace(/^Bearer\s+/i, "").trim();
    if (!token) return NextResponse.json({ error: "Missing auth" }, { status: 401 });

    const supabase = client(token);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    // 1) find current enrollment (active)
    const { data: enroll } = await supabase
      .from("enrollments")
      .select("course_slug, is_active, created_at")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    // default to music-production if not enrolled yet
    const course_slug = enroll?.course_slug || "music-production";

    // 2) progress: count completed lessons for this user & course
    const { data: progRows } = await supabase
      .from("lesson_progress")
      .select("lesson_id")
      .eq("user_id", user.id)
      .eq("course_slug", course_slug)
      .eq("completed", true);

    const done = new Set((progRows || []).map(r => r.lesson_id)).size;
    const total = COURSE_TOTALS[course_slug] ?? 0;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;

    // 3) GPA (simple): average of latest quiz attempts for this course
    //    GPA here = average % score (0–100). Adjust to a 4.0 scale later if you like.
    const { data: latestAttempts } = await supabase
      .from("quiz_attempts")
      .select("lesson_id, score, max_score, created_at")
      .eq("user_id", user.id)
      .eq("course_slug", course_slug)
      .order("created_at", { ascending: false });

    // Keep only the latest attempt per lesson
    const latestByLesson = new Map<string, { score: number; max_score: number }>();
    for (const a of latestAttempts || []) {
      if (!latestByLesson.has(a.lesson_id)) {
        latestByLesson.set(a.lesson_id, { score: a.score, max_score: a.max_score });
      }
    }
    let gpaPct = 0;
    if (latestByLesson.size > 0) {
      const sum = [...latestByLesson.values()].reduce((acc, x) => acc + (x.score / Math.max(1, x.max_score)), 0);
      gpaPct = Math.round((sum / latestByLesson.size) * 100);
    }

    // 4) surface quick links (customize as needed)
    const links = {
      contactTeacher: "mailto:teacher@808academy.com?subject=Student%20Question",
      contactTech: "mailto:tech@808academy.com?subject=Tech%20Support",
      contactAdmin: "mailto:admin@808academy.com?subject=Admin%20Request",
      discordDownload: "https://discord.com/download",
      discordServer: "https://discord.gg/your-server-code",
      tutoringBooking: "https://calendly.com/your-org/tutoring",
    };

    // 5) announcements (stub — you can source from DB later)
    const announcements = [
      { id: "a1", title: "Welcome to the Lounge", body: "Check the Knowledge Base and book tutoring if you need a hand.", date: new Date().toISOString() },
    ];

    return NextResponse.json({
  course: {
    slug: course_slug,
    title: course_slug
      .replace("-", " ")
      .replace(/\b\w/g, (c: string) => c.toUpperCase()),
  },
  progress: { done, total, percent },
  gpa: { percent: gpaPct },
  links,
  announcements,
});

  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}
