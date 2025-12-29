// src/app/api/route.ts  (root /api endpoint)
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // prevent build-time evaluation

// GET-only health check for /api
export async function GET() {
  return NextResponse.json({
    ok: true,
    emailConfigured: Boolean(process.env.RESEND_API_KEY),
  });
}
