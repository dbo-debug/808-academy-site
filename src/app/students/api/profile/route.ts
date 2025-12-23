// src/app/students/api/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function sb(token: string): SupabaseClient {
  return createClient(SUPABASE_URL, SUPABASE_ANON, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

type ProfileResponse = {
  fullName: string | null;
  avatarUrl: string | null;
};

function getMetadataName(metadata: unknown): string | null {
  if (!metadata || typeof metadata !== "object") return null;
  const fullName = (metadata as Record<string, unknown>).full_name;
  return typeof fullName === "string" ? fullName : null;
}

// ---------- helper to get user ----------
async function getUserFromRequest(req: NextRequest) {
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();

  if (!token) {
    return { error: "Missing auth", status: 401 as const, supabase: null, user: null };
  }

  const supabase = sb(token);
  const { data: auth } = await supabase.auth.getUser();
  const user = auth?.user ?? null;

  if (!user) {
    return { error: "Not authenticated", status: 401 as const, supabase: null, user: null };
  }

  return { error: null, status: 200 as const, supabase, user };
}

// ---------- GET: current profile ----------
export async function GET(req: NextRequest) {
  try {
    const { error, status, supabase, user } = await getUserFromRequest(req);
    if (error || !supabase || !user) {
      return NextResponse.json({ error }, { status });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, avatar_url")
      .eq("id", user.id)
      .maybeSingle();

    const fullName =
      profile?.full_name ||
      getMetadataName(user.user_metadata) ||
      user.email?.split("@")[0] ||
      "Student";

    const avatarUrl = profile?.avatar_url ?? null;

    return NextResponse.json<ProfileResponse>({
      fullName,
      avatarUrl,
    });
  } catch (e: unknown) {
    console.error("[profile] GET error", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// ---------- POST: update name / avatar ----------
export async function POST(req: NextRequest) {
  try {
    const { error, status, supabase, user } = await getUserFromRequest(req);
    if (error || !supabase || !user) {
      return NextResponse.json({ error }, { status });
    }

    const body = (await req.json().catch(() => ({}))) as {
      fullName?: string;
      avatarUrl?: string;
    };

    const updates: {
      id: string;
      updated_at: string;
      full_name?: string;
      avatar_url?: string;
    } = {
      id: user.id,
      updated_at: new Date().toISOString(),
    };

    if (typeof body.fullName === "string") {
      updates.full_name = body.fullName;
    }

    if (typeof body.avatarUrl === "string") {
      updates.avatar_url = body.avatarUrl;
    }

    const { error: upsertErr } = await supabase
      .from("profiles")
      .upsert(updates, { onConflict: "id" });

    if (upsertErr) {
      console.error("[profile] upsert error", upsertErr);
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    console.error("[profile] POST error", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
