// src/app/apply/checkout/page.tsx
"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

type Mode = "demo" | "paid";

function normalizeMode(raw: string | null): Mode {
  if (!raw) return "paid"; // default paid
  const v = raw.toLowerCase();
  return v === "demo" ? "demo" : "paid";
}

export default function ApplyCheckoutBridgePage() {
  const sp = useSearchParams();

  const [status, setStatus] = React.useState<
    "starting" | "creating" | "redirecting" | "error"
  >("starting");
  const [message, setMessage] = React.useState<string>("");

  React.useEffect(() => {
    const run = async () => {
      try {
        setStatus("creating");

        const mode = normalizeMode(sp.get("cohort") || sp.get("mode"));
        const program = sp.get("program") || "Course";
        const course = sp.get("course") || "Music Production";
        const classTime = sp.get("classTime") || "";

        // Create Stripe checkout session using your EXISTING /api/checkout route
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode, // "demo" | "paid" -> your API maps paid correctly, demo is default
            source: "calendly",
            // metadata helpers (optional, safe)
            program,
            course,
            classTime,
            // pass-through: calendly can append these; we don't need them, but you can store later
            calendlyEvent: sp.get("event_type_uuid") || undefined,
            calendlyInvitee: sp.get("invitee_uuid") || undefined,
          }),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok || !data?.url) {
          throw new Error(data?.error || "Could not start checkout.");
        }

        setStatus("redirecting");
        window.location.href = data.url;
      } catch (e: unknown) {
        const msg =
          e instanceof Error ? e.message : "Could not start checkout.";
        setStatus("error");
        setMessage(msg);
      }
    };

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-[70vh] bg-black text-white flex items-center">
      <div className="mx-auto w-full max-w-xl px-6 py-12">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#00FFF7]">
            Step 3 of 3
          </p>

          <h1 className="mt-3 text-3xl font-semibold">Finishing enrollment…</h1>

          {status !== "error" ? (
            <p className="mt-3 text-white/70">
              We’re opening secure checkout now. If nothing happens in a few
              seconds, click the button below.
            </p>
          ) : (
            <p className="mt-3 text-red-300">
              {message || "Something went wrong starting checkout."}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3">
            <a
              href="/apply"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 transition"
            >
              Go back to Apply
            </a>

            <p className="text-xs text-white/40">
              Tip: Scheduling the call does not enroll you — checkout is required
              to save your spot.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
