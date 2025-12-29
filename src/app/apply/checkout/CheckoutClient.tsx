// src/app/apply/checkout/CheckoutClient.tsx
"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

type Mode = "demo" | "paid";

function cohortToMode(raw: string | null): Mode {
  if (!raw) return "paid";
  return raw.toLowerCase() === "demo" ? "demo" : "paid";
}

export default function CheckoutClient() {
  const searchParams = useSearchParams();
  const startedRef = React.useRef(false);

  const [status, setStatus] = React.useState<"loading" | "error">("loading");
  const [message, setMessage] = React.useState<string>("");

  const startCheckout = React.useCallback(async () => {
    try {
      setStatus("loading");
      setMessage("");

      const mode = cohortToMode(searchParams.get("cohort"));
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          source: "calendly_redirect",
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.url) {
        throw new Error(
          data?.error || data?.details || "Could not start checkout."
        );
      }

      window.location.href = data.url;
    } catch (error: unknown) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Could not start checkout."
      );
    }
  }, [searchParams]);

  React.useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    void startCheckout();
  }, [startCheckout]);

  return (
    <main className="min-h-[70vh] bg-black text-white flex items-center">
      <div className="mx-auto w-full max-w-xl px-6 py-12">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#00FFF7]">
            Checkout
          </p>

          <h1 className="mt-3 text-3xl font-semibold">
            {status === "error" ? "Checkout error" : "Sending you to checkout…"}
          </h1>

          {status === "error" ? (
            <>
              <p className="mt-3 text-red-300">{message}</p>
              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => void startCheckout()}
                  className="inline-flex items-center justify-center rounded-xl bg-[#00FFF7] px-5 py-3 text-sm font-semibold text-black hover:opacity-90 transition"
                >
                  Retry checkout
                </button>
                <a
                  href="/apply"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 transition"
                >
                  Back to Apply
                </a>
              </div>
            </>
          ) : (
            <p className="mt-3 text-white/70">
              We’re opening secure checkout now…
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
