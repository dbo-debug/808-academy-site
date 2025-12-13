// src/app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripeSecret = process.env.STRIPE_SECRET_KEY;

if (!stripeSecret) {
  console.error(
    "[checkout] STRIPE_SECRET_KEY is not set in .env.local. Checkout will fail."
  );
}

const stripe = new Stripe(stripeSecret as string);

type CheckoutBody = {
  mode?: "demo" | "paid" | "payment" | "membership" | "subscription";
  priceId?: string;
  quantity?: number;
  source?: string;
};

export async function POST(req: NextRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const body = (await req.json().catch(() => ({}))) as CheckoutBody;
    const { priceId, quantity = 1, source } = body;

    /**
     * 1) MERCH / GENERIC CHECKOUT (explicit priceId from client)
     *    - One-time payment
     */
    if (priceId) {
      console.log("[checkout] merch / generic checkout", {
        priceId,
        quantity,
        source,
      });

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [{ price: priceId, quantity }],
        success_url: `${baseUrl}/students/store/merch?status=success`,
        cancel_url: `${baseUrl}/students/store/merch?status=cancelled`,
        allow_promotion_codes: true,
        metadata: {
          source: source ?? "merch",
        },
      });

      return NextResponse.json({ url: session.url });
    }

    /**
     * 2) MEMBERSHIP CHECKOUT (subscription)
     *    - Accepts body.mode === "membership" OR "subscription"
     *    - (Also supports source === "membership" just in case)
     */
    const isMembership =
      body.mode === "membership" ||
      body.mode === "subscription" ||
      body.source === "membership";

    if (isMembership) {
      const membershipPriceId = process.env.STRIPE_PRICE_MEMBERSHIP;

      if (!membershipPriceId) {
        console.error("[checkout] Missing STRIPE_PRICE_MEMBERSHIP");
        return NextResponse.json(
          { error: "Missing STRIPE_PRICE_MEMBERSHIP" },
          { status: 500 }
        );
      }

      console.log("[checkout] membership checkout", { membershipPriceId });

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [{ price: membershipPriceId, quantity: 1 }],
        success_url: `${baseUrl}/students?status=member_success`,
        cancel_url: `${baseUrl}/membership?status=cancelled`,
        allow_promotion_codes: true,
        metadata: {
          source: "membership",
        },
      });

      return NextResponse.json({ url: session.url });
    }

    /**
     * 3) COHORT CHECKOUT (demo/paid) - one-time payment
     */
    const mode: "demo" | "paid" = body.mode === "paid" ? "paid" : "demo";

    const cohortPriceId =
      mode === "demo"
        ? process.env.STRIPE_PRICE_COHORT_DEMO
        : process.env.STRIPE_PRICE_COHORT_PAID;

    if (!cohortPriceId) {
      console.error(`[checkout] Missing cohort price for mode=${mode}`);
      return NextResponse.json(
        {
          error: "Missing price config",
          details: `No Stripe price ID found for mode=${mode}`,
        },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: cohortPriceId, quantity: 1 }],
      success_url: `${baseUrl}/api/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/api/checkout/cancel`,
      allow_promotion_codes: true,
      metadata: {
        source: "cohort",
        cohortMode: mode,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("[checkout] route error", err);
    return NextResponse.json(
      { error: "Internal server error", details: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}
