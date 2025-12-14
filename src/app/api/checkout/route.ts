// src/app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripeSecret = process.env.STRIPE_SECRET_KEY;

const stripe = stripeSecret ? new Stripe(stripeSecret) : null;

type CheckoutBody = {
  mode?: "demo" | "paid" | "payment" | "membership" | "subscription";
  priceId?: string;
  quantity?: number;
  source?: string;
};

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
      console.log("[checkout]", msg, JSON.stringify(payload, null, 2));

    /**
     * 1) MERCH / GENERIC CHECKOUT (explicit priceId from client)
     *    - One-time payment
     */
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
        },
      };

      log("merch/generic checkout start", { body, sessionParams });
      const session = await stripe.checkout.sessions.create(sessionParams);
      log("merch/generic checkout session created", {
        id: session.id,
        url: session.url,
        customer: session.customer,
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

      const sessionParams: Stripe.Checkout.SessionCreateParams = {
        mode: "subscription",
        line_items: [{ price: membershipPriceId, quantity: 1 }],
        success_url: `${origin}/api/checkout/success?flow=membership&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/membership?status=cancelled`,
        allow_promotion_codes: true,
        metadata: {
          flow: "membership",
          source: source ?? "membership",
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

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      line_items: [{ price: cohortPriceId, quantity: 1 }],
      success_url: `${origin}/api/checkout/success?flow=cohort&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/apply?status=cancelled`,
      allow_promotion_codes: true,
      metadata: {
        flow: "cohort",
        source: "cohort",
        cohortMode: mode,
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
    console.error("[checkout] route error", err);
    return NextResponse.json(
      { error: "Internal server error", details: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}
