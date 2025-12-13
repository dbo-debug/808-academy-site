import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function sbUser(token: string) {
  return createClient(SUPABASE_URL, SUPABASE_ANON, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

const admin = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { persistSession: false, autoRefreshToken: false },
});

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (!token) {
      return NextResponse.json({ error: "Missing auth" }, { status: 401 });
    }

    const supabase = sbUser(token);
    const { data: auth } = await supabase.auth.getUser();
    const user = auth?.user;

    if (!user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const email = user.email?.toLowerCase() ?? null;
    if (!email) {
      return NextResponse.json({ error: "Missing user email" }, { status: 400 });
    }

    // 1) Try to get stripe_customer_id from your DB (preferred)
    const { data: membershipRow, error: memErr } = await admin
      .from("user_memberships")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (memErr) {
      console.error("[billing-portal] user_memberships select error", memErr);
    }

    let stripeCustomerId = membershipRow?.stripe_customer_id ?? null;

    // 2) Fallback: find/create customer in Stripe by email, and (optionally) persist it
    if (!stripeCustomerId) {
      const results = await stripe.customers.search({
        query: `email:"${email}"`,
        limit: 1,
      });

      if (results.data.length > 0) {
        stripeCustomerId = results.data[0].id;
      } else {
        const cust = await stripe.customers.create({ email });
        stripeCustomerId = cust.id;
      }

      // Best-effort: store it so future portal opens are instant
      try {
        await admin.from("user_memberships").upsert(
          {
            user_id: user.id,
            tier: "membership",
            stripe_customer_id: stripeCustomerId,
          },
          { onConflict: "user_id" }
        );
      } catch (e) {
        // Not fatal
        console.warn("[billing-portal] could not persist stripe_customer_id", e);
      }
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    // 3) Create billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${baseUrl}/students?billing=return`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("[billing-portal] error", err);
    return NextResponse.json(
      { error: err?.message ?? "Billing portal error" },
      { status: 500 }
    );
  }
}
