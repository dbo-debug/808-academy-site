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

// Apps Script Webhook (Sheets writer)
const SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://www.the808academy.com";

const LOUNGE_LINK =
  process.env.LOUNGE_LINK || "https://www.the808academy.com/students";
const DISCORD_INVITE =
  process.env.DISCORD_INVITE || "https://discord.gg/8q49UNgG";
const SUBMISSION_LINK =
  process.env.SUBMISSION_LINK ||
  "https://www.the808academy.com/students/upload?type=sync";

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
  if (isRecord(err) && typeof err.message === "string") return err.message;
  if (typeof err === "string") return err;
  return "Unknown error";
}

function toIsoFromUnix(ts?: number | null) {
  if (!ts) return null;
  return new Date(ts * 1000).toISOString();
}

async function postToSheets(type: string, payload: Record<string, unknown>) {
  if (!SHEETS_WEBHOOK_URL) return;

  try {
    const res = await fetch(SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, payload }),
      redirect: "manual", // ⬅️ THIS IS THE FIX
    });

    // Apps Script often returns 302 even when successful
    if (!(res.status === 200 || res.status === 302)) {
      const txt = await res.text().catch(() => "");
      console.error("❌ Sheets webhook non-200/302:", res.status, txt);
    }
  } catch (err) {
    console.error("❌ Sheets webhook error:", err);
  }
}

/** ---- Stripe Customer helpers (fix TS: Customer | DeletedCustomer) ---- */
function isDeletedCustomer(
  c: Stripe.Customer | Stripe.DeletedCustomer
): c is Stripe.DeletedCustomer {
  return (c as Stripe.DeletedCustomer).deleted === true;
}

function getCustomerEmail(
  customer: string | Stripe.Customer | Stripe.DeletedCustomer | null | undefined
) {
  if (!customer || typeof customer === "string") return null;
  if (isDeletedCustomer(customer)) return null;
  return customer.email ?? null;
}

function getCustomerName(
  customer: string | Stripe.Customer | Stripe.DeletedCustomer | null | undefined
) {
  if (!customer || typeof customer === "string") return null;
  if (isDeletedCustomer(customer)) return null;
  return customer.name ?? null;
}

function getCustomerPhone(
  customer: string | Stripe.Customer | Stripe.DeletedCustomer | null | undefined
) {
  if (!customer || typeof customer === "string") return null;
  if (isDeletedCustomer(customer)) return null;
  return customer.phone ?? null;
}
/** ------------------------------------------------------------------- */

function summarizeLineItems(session: Stripe.Checkout.Session) {
  const items = session.line_items?.data ?? [];
  return items.map((li) => ({
    description: li.description ?? "",
    quantity: li.quantity ?? null,
    priceId: li.price?.id ?? null,
    amountSubtotal: li.amount_subtotal ?? null,
    amountTotal: li.amount_total ?? null,
    currency: li.currency ?? null,
  }));
}

function normalizeEmail(session: Stripe.Checkout.Session) {
  const email =
    session.customer_email ||
    session.customer_details?.email ||
    getCustomerEmail(session.customer);

  return email ? email.toLowerCase().trim() : null;
}

function buildCommonPayload(session: Stripe.Checkout.Session) {
  const metadata = session.metadata || {};

  const email = normalizeEmail(session);

  const name =
    session.customer_details?.name ||
    getCustomerName(session.customer) ||
    null;

  const phone =
    session.customer_details?.phone ||
    getCustomerPhone(session.customer) ||
    null;

  const source = (metadata.source || metadata.product || "").toString();

  return {
    stripeSessionId: session.id,
    stripeCustomerId:
      typeof session.customer === "string"
        ? session.customer
        : session.customer?.id ?? null,
    mode: session.mode,
    paymentStatus: session.payment_status,
    amountTotal: session.amount_total ?? null,
    currency: session.currency ?? null,
    created: session.created ? toIsoFromUnix(session.created) : null,

    email,
    name,
    phone,

    source,
    metadata,

    // Cohort/course hints
    courseSlug: (metadata.course_slug || metadata.course || "music-production").toString(),
    cohortType: (metadata.cohort_type || metadata.cohort || "").toString(),

    lineItems: summarizeLineItems(session),
  } as Record<string, unknown>;
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

async function buildInviteActivateLink(email: string) {
  // Must be whitelisted in Supabase Redirect URLs:
  // https://www.the808academy.com/auth/confirm
  const redirectTo = `${SITE_URL}/auth/confirm?next=/auth/set-password`;

  try {
    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: "invite",
      email: email.toLowerCase(),
      options: { redirectTo },
    });

    if (error) {
      console.error("❌ generateLink(invite) error:", error);
      return null;
    }

    const actionLink =
      (data as any)?.properties?.action_link ||
      (data as any)?.action_link ||
      null;

    return actionLink;
  } catch (err) {
    console.error("❌ generateLink(invite) threw:", err);
    return null;
  }
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
    console.error("⚠️ Webhook signature verification failed:", getErrorMessage(err));
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log("✅ Webhook verified. Event type:", event.type);

  try {
    switch (event.type) {
      /**
       * ✅ Success purchase
       * - send to Sheets: active_user
       * - continue existing Supabase insert/upsert behavior
       */
      case "checkout.session.completed": {
        const sessionLite = event.data.object as Stripe.Checkout.Session;

        const session = await stripe.checkout.sessions.retrieve(sessionLite.id, {
          expand: ["line_items", "subscription", "customer"],
        });

        const email = normalizeEmail(session);
        if (!email) {
          console.error("checkout.session.completed with no email");
          break;
        }

        const metadata = session.metadata || {};
        const source = (metadata.source || metadata.product || "").toString();

        const lineItems = session.line_items?.data ?? [];
        const hasMembershipPrice =
          !!PRICE_MEMBERSHIP && lineItems.some((li) => li.price?.id === PRICE_MEMBERSHIP);

        const isMembership =
          source === "membership" || session.mode === "subscription" || hasMembershipPrice;
        const activateLink = await buildInviteActivateLink(email);

        // --- MEMBERSHIP path (existing behavior) ---
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
            currentPeriodEndUnix = getNumberProp(session.subscription, "current_period_end");
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

          // ✅ SHEETS: active_user
          await postToSheets("active_user", {
            ...buildCommonPayload(session),
            enrollmentType: "Membership",
            activateLink,
            links: { lounge: LOUNGE_LINK, discord: DISCORD_INVITE, submit: SUBMISSION_LINK },
          });

          break;
        }

        // --- COHORT path (existing behavior) ---
        const courseSlug = (metadata.course_slug || "music-production").toString();
        const cohortType = (metadata.cohort_type || metadata.product || "cohort").toString();

        const { error } = await supabaseAdmin.from("pending_enrollments").insert({
          email: email.toLowerCase(),
          course_slug: courseSlug,
          cohort_type: cohortType,
          stripe_session_id: session.id,
        });

        if (error) console.error("❌ pending_enrollments insert error:", error);
        else console.log("✅ Pending enrollment inserted:", { email, courseSlug, cohortType });

        // ✅ SHEETS: active_user
        await postToSheets("active_user", {
          ...buildCommonPayload(session),
          enrollmentType: "Course",
          activateLink,
          links: { lounge: LOUNGE_LINK, discord: DISCORD_INVITE, submit: SUBMISSION_LINK },
        });

        break;
      }

      /**
       * ✅ Abandoned carts (true “checkout started but not completed”)
       * Fires when the checkout session expires (Stripe sets an expiration time).
       */
      case "checkout.session.expired":
      case "checkout.session.async_payment_failed": {
        const sessionLite = event.data.object as Stripe.Checkout.Session;

        const session = await stripe.checkout.sessions.retrieve(sessionLite.id, {
          expand: ["line_items", "customer"],
        });

        await postToSheets("abandoned_cart", {
          ...buildCommonPayload(session),
          reason: event.type,
        });

        break;
      }

      /**
       * ✅ Keep your membership table synced when Stripe updates subscription state
       */
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;

        let email: string | null = null;

        if (typeof sub.customer === "string") {
          const cust = await stripe.customers.retrieve(sub.customer);
          if (!("deleted" in cust)) {
            // Stripe types here can still be strict depending on version
            email = (cust as Stripe.Customer).email ?? null;
          }
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

    // Optional: log webhook failures into Sheets too
    await postToSheets("admin_alert", {
      where: "stripe-webhook",
      error: getErrorMessage(err),
    });

    return NextResponse.json({ error: "Webhook handler error" }, { status: 500 });
  }
}
