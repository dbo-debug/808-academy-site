// src/app/api/students/claim-enrollments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !serviceRoleKey) {
  console.warn(
    "[claim-enrollments] Supabase URL or service role key missing – endpoint will not work."
  );
}

const admin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function decodeJwtPayload(
  token: string
): { email?: string; sub?: string } | null {
  try {
    const [, payloadBase64] = token.split(".");
    if (!payloadBase64) return null;
    const normalized = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
    const json = Buffer.from(normalized, "base64").toString("utf8");
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader =
      req.headers.get("authorization") || req.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const token = authHeader.slice("Bearer ".length);
    const payload = decodeJwtPayload(token);

    const email = payload?.email?.toLowerCase();
    const userId = payload?.sub;

    if (!email || !userId) {
      return NextResponse.json(
        { error: "Invalid token payload" },
        { status: 400 }
      );
    }

    let membershipClaimed = 0;

    // -------------------------
    // A) CLAIM MEMBERSHIP (if any)
    // -------------------------
    const { data: pendingMember, error: pmErr } = await admin
      .from("pending_memberships")
      .select("stripe_customer_id, stripe_subscription_id, status, current_period_end, stripe_price_id")
      .eq("email", email)
      .maybeSingle();

    if (pmErr) {
      console.error("[claim-enrollments] pending_memberships select error", pmErr);
    }

    if (pendingMember) {
      const status = (pendingMember.status as string | null) ?? null;
      const isActive =
        status === "active" ||
        status === "trialing" ||
        status === "past_due"; // decide if you want to allow past_due

      if (isActive) {
        const { error: umErr } = await admin.from("user_memberships").upsert(
          {
            user_id: userId,
            tier: "membership",
            expires_at: pendingMember.current_period_end ?? null,
            stripe_customer_id: pendingMember.stripe_customer_id ?? null,
            stripe_subscription_id: pendingMember.stripe_subscription_id ?? null,
            stripe_price_id:
              pendingMember.stripe_price_id ??
              process.env.STRIPE_PRICE_MEMBERSHIP ??
              null,
          },
          { onConflict: "user_id" }
        );

        if (umErr) {
          console.error("[claim-enrollments] user_memberships upsert error", umErr);
        } else {
          membershipClaimed = 1;
        }
      }

      // cleanup pending row either way (optional but recommended)
      await admin.from("pending_memberships").delete().eq("email", email);
    }

    // -------------------------
    // B) CLAIM COHORT ENROLLMENTS (existing behavior)
    // -------------------------
    const { data: pending, error: pendingError } = await admin
      .from("pending_enrollments")
      .select("*")
      .eq("email", email);

    if (pendingError) {
      console.error("[claim-enrollments] pending select error", pendingError);
      return NextResponse.json(
        { error: "Database error (pending)" },
        { status: 500 }
      );
    }

    // Ensure profile exists & grant lounge access
    // ✅ lounge access true
    // ❌ ebook access false by default (membership does NOT unlock ebook)
    const { error: profileError } = await admin.from("profiles").upsert(
      {
        id: userId,
        full_name: null,
        avatar_url: null,
        has_lounge_access: true,
        has_music_prod_ebook: false,
      },
      { onConflict: "id" }
    );

    if (profileError) {
      console.error("[claim-enrollments] profile upsert error", profileError);
      return NextResponse.json(
        { error: "Database error (profile)" },
        { status: 500 }
      );
    }

    if (!pending || pending.length === 0) {
      return NextResponse.json({
        success: true,
        claimed: 0,
        membershipClaimed,
      });
    }

    let claimedCount = 0;

    for (const row of pending) {
      const courseSlug = row.course_slug as string;

      const { data: existing, error: existingErr } = await admin
        .from("enrollments")
        .select("id")
        .eq("user_id", userId)
        .eq("course_slug", courseSlug)
        .maybeSingle();

      if (existingErr) {
        console.error("[claim-enrollments] existing enrollment error", existingErr);
        continue;
      }

      if (!existing) {
        const { error: insertErr } = await admin.from("enrollments").insert({
          user_id: userId,
          course_slug: courseSlug,
          is_active: true,
        });

        if (insertErr) {
          console.error("[claim-enrollments] insert enrollment error", insertErr);
        } else {
          claimedCount++;
        }
      }
    }

    // If they have a cohort enrollment, you probably DO want ebook access
    // (optional: set true when any enrollment exists)
    if (claimedCount > 0) {
      await admin.from("profiles").upsert(
        { id: userId, has_music_prod_ebook: true },
        { onConflict: "id" }
      );
    }

    // cleanup pending enrollments
    await admin.from("pending_enrollments").delete().eq("email", email);

    return NextResponse.json({
      success: true,
      claimed: claimedCount,
      membershipClaimed,
    });
  } catch (err) {
    console.error("[claim-enrollments] unexpected error", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
