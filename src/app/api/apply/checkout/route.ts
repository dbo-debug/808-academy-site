// src/app/api/apply/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Backward-compatible redirect.
 * If anything (Calendly, old links, etc.) still hits /api/apply/checkout,
 * we forward them to the real page route: /apply/checkout
 */
export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const origin = url.origin;

  // Preserve all query params (cohort=demo/paid, program, course, classTime, etc.)
  const redirectTo = new URL("/apply/checkout", origin);
  url.searchParams.forEach((value, key) => redirectTo.searchParams.set(key, value));

  return NextResponse.redirect(redirectTo.toString(), { status: 302 });
}
