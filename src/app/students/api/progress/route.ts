// src/app/students/api/progress/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function makeClient(token: string) {
  return createClient(supabaseUrl, supabaseAnon, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as
      | { course_slug?: string; lesson_id?: string; completed?: boolean }
      | null;
    const course_slug = body?.course_slug;
    const lesson_id = body?.lesson_id;
    const completed = body?.completed;

    if (!course_slug || !lesson_id) {
      return NextResponse.json({ error: "Missing course_slug or lesson_id" }, { status: 400 });
    }

    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (!token) return NextResponse.json({ error: "Missing auth token" }, { status: 401 });

    const supabase = makeClient(token);
    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr || !user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { error: upsertErr } = await supabase
      .from("lesson_progress")
      .upsert(
        {
          user_id: user.id,
          course_slug,
          lesson_id,
          completed: completed ?? true,
          completed_at: new Date().toISOString(),
        },
        { onConflict: "user_id,course_slug,lesson_id" }
      );

    if (upsertErr) {
      return NextResponse.json({ error: upsertErr.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const course_slug = searchParams.get("course_slug") || undefined;

    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (!token) return NextResponse.json({ error: "Missing auth token" }, { status: 401 });

    const supabase = makeClient(token);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    let query = supabase
      .from("lesson_progress")
      .select("lesson_id, completed")
      .eq("user_id", user.id);

    if (course_slug) query = query.eq("course_slug", course_slug);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ progress: data || [] });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
