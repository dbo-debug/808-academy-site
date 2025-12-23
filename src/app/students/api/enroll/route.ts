// src/app/students/api/enroll/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Ensure we run on Node.js (supabase-js is fine on node runtime)
export const runtime = "nodejs";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function client(token: string) {
  return createClient(SUPABASE_URL, SUPABASE_ANON, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * POST /students/api/enroll
 * body: { course_slug: string }
 * marks the given course as the student's active enrollment
 */
export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization") || "";
    const token = auth.replace(/^Bearer\s+/i, "").trim();
    if (!token) {
      return NextResponse.json({ error: "Missing auth" }, { status: 401 });
    }

    const { course_slug } = (await req.json()) as { course_slug?: string };
    if (!course_slug) {
      return NextResponse.json({ error: "Missing course_slug" }, { status: 400 });
    }

    const supabase = client(token);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Deactivate any existing active enrollments for this user
    await supabase
      .from("enrollments")
      .update({ is_active: false })
      .eq("user_id", user.id)
      .eq("is_active", true);

    // Insert a new active enrollment (or you could upsert on (user_id, course_slug))
    const { error } = await supabase.from("enrollments").insert({
      user_id: user.id,
      course_slug,
      is_active: true,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
