// src/app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecret ? new Stripe(stripeSecret) : null;

/**
 * LIVE PRICE IDS (provided by you)
 */
const PRICE_MEMBERSHIP = "price_1Sdzc8DgVrA91WNONcmRIcaK";

const PRICE_COHORT_DEMO = "price_1SdzboDgVrA91WNOdFCDAlJe";
const PRICE_COHORT_PAID = "price_1SdzbkDgVrA91WNOPbTM9jp7";

type CheckoutBody = {
  mode?: "demo" | "paid" | "payment" | "membership" | "subscription";
  priceId?: string;
  quantity?: number;
  source?: string; // "merch" | "membership" | "cohort" etc
};

function safeJson(input: unknown) {
  try {
    return JSON.stringify(input, null, 2);
  } catch {
    return String(input);
  }
}

export async function POST(req: NextRequest) {
  if (!stripe) {
    console.error("[checkout] STRIPE_SECRET_KEY is missing.");
    return NextResponse.json(
      { error: "Stripe not configured. Missing STRIPE_SECRET_KEY." },
      { status: 500 }
    );
  }

  try {
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || req.nextUrl.origin;

    const body = (await req.json().catch(() => ({}))) as CheckoutBody;
    const { priceId, quantity = 1, source } = body;

    const log = (msg: string, payload: Record<string, unknown>) =>
      console.log("[checkout]", msg, safeJson(payload));

    // --- 1) MERCH / GENERIC CHECKOUT (explicit priceId from client) ---
    // This is used by the store "Buy Now" buttons.
    if (priceId) {
      const sessionParams: Stripe.Checkout.SessionCreateParams = {
        mode: "payment",
        line_items: [{ price: priceId, quantity }],
        success_url: `${origin}/store/merch?status=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/store/merch?status=cancelled`,
        allow_promotion_codes: true,
        metadata: {
          flow: "merch",
          source: source ?? "merch",
          priceId,
        },
      };

      log("merch checkout start", { body, sessionParams });

      const session = await stripe.checkout.sessions.create(sessionParams);

      log("merch checkout session created", {
        id: session.id,
        url: session.url,
        customer: session.customer,
      });

      return NextResponse.json({ url: session.url });
    }

    // --- 2) MEMBERSHIP CHECKOUT (subscription) ---
    const isMembership =
      body.mode === "membership" ||
      body.mode === "subscription" ||
      body.source === "membership";

    if (isMembership) {
      const sessionParams: Stripe.Checkout.SessionCreateParams = {
        mode: "subscription",
        line_items: [{ price: PRICE_MEMBERSHIP, quantity: 1 }],
        success_url: `${origin}/api/checkout/success?flow=membership&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/membership?status=cancelled`,
        allow_promotion_codes: true,
        metadata: {
          flow: "membership",
          source: source ?? "membership",
          priceId: PRICE_MEMBERSHIP,
        },
      };

      log("membership checkout start", { body, sessionParams });

      const session = await stripe.checkout.sessions.create(sessionParams);

      log("membership checkout session created", {
        id: session.id,
        url: session.url,
        customer: session.customer,
      });

      return NextResponse.json({ url: session.url });
    }

    // --- 3) COHORT CHECKOUT (demo / paid) ---
    // Your current UI uses body.mode = "demo" | "paid"
    // If anything else comes in, default to demo.
    const cohortMode: "demo" | "paid" = body.mode === "paid" ? "paid" : "demo";
    const cohortPriceId =
      cohortMode === "demo" ? PRICE_COHORT_DEMO : PRICE_COHORT_PAID;

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      line_items: [{ price: cohortPriceId, quantity: 1 }],
      success_url: `${origin}/api/checkout/success?flow=cohort&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/apply?status=cancelled`,
      allow_promotion_codes: true,
      metadata: {
        flow: "cohort",
        source: source ?? "cohort",
        cohortMode,
        priceId: cohortPriceId,
      },
    };

    log("cohort checkout start", { body, sessionParams });

    const session = await stripe.checkout.sessions.create(sessionParams);

    log("cohort checkout session created", {
      id: session.id,
      url: session.url,
      customer: session.customer,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    // Stripe errors often live in err.raw.message, err.message, etc.
    const stripeMessage =
      err?.raw?.message || err?.message || err?.toString?.() || String(err);

    console.error("[checkout] route error", err);

    return NextResponse.json(
      { error: "Internal server error", details: stripeMessage },
      { status: 500 }
    );
  }
}
