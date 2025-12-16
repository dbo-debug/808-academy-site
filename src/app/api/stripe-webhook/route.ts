// src/app/api/stripe-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Supabase admin client (server only)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } }
);

const PRICE_MEMBERSHIP = process.env.STRIPE_PRICE_MEMBERSHIP;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getStringProp(obj: unknown, key: string): string | null {
  if (isRecord(obj)) {
    const val = obj[key];
    if (typeof val === "string") return val;
  }
  return null;
}

function getNumberProp(obj: unknown, key: string): number | null {
  if (isRecord(obj)) {
    const val = obj[key];
    if (typeof val === "number") return val;
  }
  return null;
}

function getErrorMessage(err: unknown): string {
  if (isRecord(err) && typeof err.message === "string") {
    return err.message;
  }
  if (typeof err === "string") return err;
  return "Unknown error";
}

function toIsoFromUnix(ts?: number | null) {
  if (!ts) return null;
  return new Date(ts * 1000).toISOString();
}

async function upsertPendingMembership(args: {
  email: string;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  status?: string | null;
  currentPeriodEndUnix?: number | null;
  stripePriceId?: string | null;
}) {
  const {
    email,
    stripeCustomerId,
    stripeSubscriptionId,
    status,
    currentPeriodEndUnix,
    stripePriceId,
  } = args;

  const { error } = await supabaseAdmin.from("pending_memberships").upsert(
    {
      email,
      stripe_customer_id: stripeCustomerId ?? null,
      stripe_subscription_id: stripeSubscriptionId ?? null,
      status: status ?? null,
      current_period_end: toIsoFromUnix(currentPeriodEndUnix),
      stripe_price_id: stripePriceId ?? null,
    },
    { onConflict: "email" }
  );

  if (error) console.error("❌ pending_memberships upsert error:", error);
  else console.log("✅ pending_memberships upsert:", { email, status });
}

export async function POST(req: NextRequest) {
  console.log("🔔 Stripe webhook hit");

  const headerList = await headers();
  const sig = headerList.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    console.error("❌ Missing stripe-signature or STRIPE_WEBHOOK_SECRET");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: unknown) {
    console.error(
      "⚠️ Webhook signature verification failed:",
      getErrorMessage(err)
    );
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log("✅ Webhook verified. Event type:", event.type);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const sessionLite = event.data.object as Stripe.Checkout.Session;

        const session = await stripe.checkout.sessions.retrieve(sessionLite.id, {
          expand: ["line_items", "subscription", "customer"],
        });

        const email =
          session.customer_email || session.customer_details?.email || null;

        if (!email) {
          console.error("checkout.session.completed with no email");
          break;
        }

        const metadata = session.metadata || {};
        const source = metadata.source || metadata.product || "";

        const lineItems = session.line_items?.data ?? [];
        const hasMembershipPrice =
          !!PRICE_MEMBERSHIP &&
          lineItems.some((li) => li.price?.id === PRICE_MEMBERSHIP);

        const isMembership =
          source === "membership" ||
          session.mode === "subscription" ||
          hasMembershipPrice;

        if (isMembership) {
          const subscriptionId =
            typeof session.subscription === "string"
              ? session.subscription
              : session.subscription?.id ?? null;

          const customerId =
            typeof session.customer === "string"
              ? session.customer
              : session.customer?.id ?? null;

          let status: string | null = null;
          let currentPeriodEndUnix: number | null = null;

          if (session.subscription && typeof session.subscription !== "string") {
            status = getStringProp(session.subscription, "status");
            currentPeriodEndUnix = getNumberProp(
              session.subscription,
              "current_period_end"
            );
          } else if (subscriptionId) {
            const sub = await stripe.subscriptions.retrieve(subscriptionId);
            status = getStringProp(sub, "status");
            currentPeriodEndUnix = getNumberProp(sub, "current_period_end");
          }

          await upsertPendingMembership({
            email: email.toLowerCase(),
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscriptionId,
            status,
            currentPeriodEndUnix,
            stripePriceId: PRICE_MEMBERSHIP ?? null,
          });

          // ✅ No magic link here anymore.
          break;
        }

        // ---- COHORT path (existing behavior) ----
        const courseSlug = metadata.course_slug || "music-production";
        const cohortType = metadata.cohort_type || metadata.product || "cohort";

        const { error } = await supabaseAdmin
          .from("pending_enrollments")
          .insert({
            email: email.toLowerCase(),
            course_slug: courseSlug,
            cohort_type: cohortType,
            stripe_session_id: session.id,
          });

        if (error) console.error("❌ pending_enrollments insert error:", error);
        else
          console.log("✅ Pending enrollment inserted:", {
            email,
            courseSlug,
            cohortType,
          });

        // ✅ No magic link here anymore.
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;

        let email: string | null = null;

        if (typeof sub.customer === "string") {
          const cust = await stripe.customers.retrieve(sub.customer);
          if (!("deleted" in cust)) email = (cust.email as string) ?? null;
        } else {
          email = getStringProp(sub.customer, "email");
        }

        if (!email) break;

        await upsertPendingMembership({
          email: email.toLowerCase(),
          stripeCustomerId:
            typeof sub.customer === "string"
              ? sub.customer
              : getStringProp(sub.customer, "id"),
          stripeSubscriptionId: sub.id,
          status: getStringProp(sub, "status"),
          currentPeriodEndUnix: getNumberProp(sub, "current_period_end"),
          stripePriceId: PRICE_MEMBERSHIP ?? null,
        });

        break;
      }

      default:
        console.log("ℹ️ Ignoring event type", event.type);
        break;
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: unknown) {
    console.error("🔥 Webhook handler error:", err);
    return NextResponse.json({ error: "Webhook handler error" }, { status: 500 });
  }
}
