import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server-only
);

export async function GET(req: Request) {
  const url = new URL(req.url);
  const path = url.searchParams.get("path"); // e.g. "sound-hearing/random-timelapse/foo.mp4"
  const expires = Number(url.searchParams.get("exp") ?? 60); // seconds

  if (!path) return NextResponse.json({ error: "path required" }, { status: 400 });

  const { data, error } = await supabase
    .storage
    .from("media-private")
    .createSignedUrl(path, expires);

  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: error?.message ?? "sign error" }, { status: 400 });
  }

  // Redirect the client to the signed URL
  return NextResponse.redirect(data.signedUrl, 302);
}
