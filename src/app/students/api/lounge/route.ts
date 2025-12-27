// src/app/students/api/lounge/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const NO_CACHE_HEADERS = { "Cache-Control": "no-store, max-age=0", Pragma: "no-cache" };

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

type MembershipTier = "membership" | "tutoring" | "cohort";

type LoungeResponse = {
  // ✅ explicit gates
  hasLoungeAccess: boolean;
  hasCurriculumAccess: boolean;

  membershipTier: MembershipTier;
  displayName: string;
  avatarUrl: string | null;

  course: { slug: string; title: string };
  progress: {
    done: number;
    total: number;
    percent: number;
    currentLessonSlug?: string | null;
  };
  gpa: { percent: number };
  links: Array<{ label: string; href: string }>;
  announcements: Array<{
    id: string;
    title: string;
    body?: string | null;
    date?: string | null;
    pinned?: boolean | null;
  }>;
};

function isExpired(expiresAt?: string | null) {
  if (!expiresAt) return false;
  const d = new Date(expiresAt);
  return Number.isFinite(d.getTime()) ? d.getTime() < Date.now() : false;
}

function getMetadataName(metadata: unknown): string | null {
  if (!metadata || typeof metadata !== "object") return null;
  const fullName = (metadata as Record<string, unknown>).full_name;
  return typeof fullName === "string" ? fullName : null;
}

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
      return NextResponse.json({ error: "Missing auth" }, { status: 401, headers: NO_CACHE_HEADERS });
    }

    const supabase = sb(token);
    const { data: auth } = await supabase.auth.getUser();
    const user = auth?.user;
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401, headers: NO_CACHE_HEADERS });
    }

    // ---------- PROFILE ----------
    const { data: profile, error: profErr } = await supabase
      .from("profiles")
      .select("full_name, avatar_url, has_lounge_access, has_music_prod_ebook")
      .eq("id", user.id)
      .maybeSingle();

    if (profErr) console.warn("[students/api/lounge] profiles select error", profErr);

    const displayName =
      profile?.full_name ||
      getMetadataName(user.user_metadata) ||
      user.email?.split("@")[0] ||
      "Student";

    const avatarUrl = profile?.avatar_url ?? null;

    const legacyHasLounge = profile?.has_lounge_access === true;
    const legacyHasEbook = profile?.has_music_prod_ebook === true;

    // ---------- MEMBERSHIP ----------
    const { data: membershipRow, error: memErr } = await supabase
      .from("user_memberships")
      .select("tier, expires_at")
      .eq("user_id", user.id)
      .order("expires_at", { ascending: false, nullsFirst: false })
      .limit(1)
      .maybeSingle();

    if (memErr) console.warn("[students/api/lounge] user_memberships select error", memErr);

    const membershipTierFromRow =
      membershipRow?.tier === "membership" ||
      membershipRow?.tier === "tutoring" ||
      membershipRow?.tier === "cohort"
        ? (membershipRow.tier as MembershipTier)
        : null;

    const membershipActive =
      !!membershipTierFromRow && !isExpired(membershipRow?.expires_at ?? null);

    // ---------- ENROLLMENTS ----------
    const { data: enr, error: enrErr } = await supabase
      .from("enrollments")
      .select("course_slug, is_active")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .limit(1)
      .maybeSingle();

    if (enrErr) console.warn("[students/api/lounge] enrollments select error", enrErr);

    const hasEnrollment = !!enr?.course_slug;

    // ---------- ACCESS GATES ----------
    const hasLoungeAccess = membershipActive || hasEnrollment || legacyHasLounge;

    if (!hasLoungeAccess) {
      return NextResponse.json(
        { error: "No active membership or enrollment", hasLoungeAccess: false },
        { status: 403, headers: NO_CACHE_HEADERS }
      );
    }

    const inferredTier: MembershipTier =
      membershipActive && membershipTierFromRow
        ? membershipTierFromRow
        : hasEnrollment
        ? "cohort"
        : "membership";

    const hasCurriculumAccess =
      inferredTier === "cohort" || hasEnrollment || legacyHasEbook;

    // ---------- COURSE CHOICE ----------
    const url = new URL(req.url);
    const qCourse = url.searchParams.get("course") ?? undefined;
    const course_slug: string = qCourse || (enr?.course_slug as string) || "music-production";

    // ---------- PROGRESS ----------
    let done = 0;
    let total = 0;
    let currentLessonSlug: string | null = null;

    if (hasCurriculumAccess) {
      const { data: lessons } = await supabase
        .from("lessons")
        .select("id, slug")
        .eq("course_slug", course_slug);

      total = Array.isArray(lessons) && lessons.length > 0 ? lessons.length : 10;

      const { data: prog } = await supabase
        .from("lesson_progress")
        .select("lesson_id, completed_at")
        .eq("user_id", user.id)
        .eq("course_slug", course_slug)
        .eq("completed", true)
        .order("completed_at", { ascending: false });

      if (Array.isArray(prog)) {
        done = prog.length;
        currentLessonSlug = prog[0]?.lesson_id ?? null;
      }
    } else {
      total = 10;
      done = 0;
      currentLessonSlug = null;
    }

    const percent = total > 0 ? Math.round((done / total) * 100) : 0;

    // ---------- GPA ----------
    let gpaPct = 0;

    if (hasCurriculumAccess) {
      type AttemptRow = {
        lesson_id: string | null;
        score: number | null;
        max_score: number | null;
        submitted_at: string | null;
      };

      const { data: attempts } = await supabase
        .from("quiz_attempts")
        .select("lesson_id, score, max_score, submitted_at")
        .eq("user_id", user.id)
        .eq("course_slug", course_slug)
        .order("submitted_at", { ascending: false });

      const latestByLesson = new Map<string, number>();
      (attempts as AttemptRow[] | null)?.forEach((row) => {
        if (!row.lesson_id || latestByLesson.has(row.lesson_id)) return;
        if (typeof row.score === "number") latestByLesson.set(row.lesson_id, row.score);
      });

      const scores = Array.from(latestByLesson.values());
      if (scores.length > 0) {
        const avg = scores.reduce((sum, value) => sum + value, 0) / scores.length;
        gpaPct = Math.round(avg * 10) / 10;
      }
    }

    // ---------- LINKS ----------
    const links: LoungeResponse["links"] = [
      { label: "Student Discord", href: "/students/discord" },
      { label: "Contact Teacher", href: "mailto:teacher@the808academy.com" },
      { label: "Tech Support", href: "mailto:support@the808academy.com" },
      { label: "Book Tutoring", href: "/tutoring" },
    ];

    // ---------- ANNOUNCEMENTS (Supabase table) ----------
    type AnnouncementRow = {
      id: string;
      title: string | null;
      body: string | null;
      publish_at: string | null;
      created_at: string | null;
      is_published: boolean | null;
      pinned: boolean | null;
    };

    const nowIso = new Date().toISOString();

    const { data: annRows, error: annErr } = await supabase
      .from("announcements")
      .select("id, title, body, publish_at, created_at, is_published, pinned")
      .eq("is_published", true)
      .or(`publish_at.is.null,publish_at.lte.${nowIso}`)
      .order("pinned", { ascending: false })
      .order("publish_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(8);

    if (annErr) console.warn("[students/api/lounge] announcements select error", annErr);

    const announcements: LoungeResponse["announcements"] =
      (annRows as AnnouncementRow[] | null)?.map((r) => ({
        id: r.id,
        title: r.title ?? "Announcement",
        body: r.body ?? null,
        date: r.publish_at ?? r.created_at ?? null,
        pinned: r.pinned ?? false,
      })) ?? [];

    const body: LoungeResponse = {
      hasLoungeAccess,
      hasCurriculumAccess,

      membershipTier: inferredTier,
      displayName,
      avatarUrl,

      course: { slug: course_slug, title: toTitle(course_slug) },
      progress: { done, total, percent, currentLessonSlug },
      gpa: { percent: gpaPct },
      links,
      announcements,
    };

    return NextResponse.json(body, { headers: NO_CACHE_HEADERS });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("[students/api/lounge] error", e);
    return NextResponse.json({ error: msg }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
