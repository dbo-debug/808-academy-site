// src/app/students/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const BUCKET = "student-uploads"; // make sure this bucket exists in Supabase Storage

function client(token: string) {
  return createClient(SUPABASE_URL, SUPABASE_ANON, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * POST /students/api/upload
 * form-data:
 *   - file: File
 *   - course_slug?: string
 *   - lesson_id?: string
 *
 * Returns: { ok: true, path, url } (signed url)
 */
export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization") || "";
    const token = auth.replace(/^Bearer\s+/i, "").trim();
    if (!token) return NextResponse.json({ error: "Missing auth" }, { status: 401 });

    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "Missing file" }, { status: 400 });

    const courseSlug = (form.get("course_slug") as string) || "music-production";
    const lessonId = (form.get("lesson_id") as string) || "unknown";

    const supabase = client(token);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    // Prepare a stable path: user/lesson/timestamp_filename
    const safeName = file.name.replace(/[^\w.\-]+/g, "_");
    const key = `${user.id}/${courseSlug}/${lessonId}/${Date.now()}_${safeName}`;

    // Convert File -> Buffer (Node runtime)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: upErr } = await supabase
      .storage
      .from(BUCKET)
      .upload(key, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (upErr) return NextResponse.json({ error: upErr.message }, { status: 400 });

    // Prefer a signed URL (bucket can remain private)
    const { data: signed, error: signErr } = await supabase
      .storage
      .from(BUCKET)
      .createSignedUrl(key, 60 * 60 * 24 * 7); // 7 days

    if (signErr) {
      // fallback to public url if bucket is public
      const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(key);
      return NextResponse.json({ ok: true, path: key, url: pub.publicUrl });
    }

    return NextResponse.json({ ok: true, path: key, url: signed.signedUrl });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}
