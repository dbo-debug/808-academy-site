// src/app/students/api/notify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function client(token: string) {
  return createClient(supabaseUrl, supabaseAnon, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization") || "";
    const token = auth.replace(/^Bearer\s+/i, "").trim();
    if (!token) return NextResponse.json({ error: "Missing auth" }, { status: 401 });

    const body = (await req.json().catch(() => null)) as
      | { kind?: string; item?: string }
      | null;
    const kind = body?.kind;
    const item = body?.item;
    if (!kind || !item) return NextResponse.json({ error: "Missing kind or item" }, { status: 400 });

    const supabase = client(token);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    // Optional: capture email for convenience
    const email = user.email ?? null;

    const { error } = await supabase.from("store_interest").insert({
      user_id: user.id,
      email,
      kind,
      item,
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
