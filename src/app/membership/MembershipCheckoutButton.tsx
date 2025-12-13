"use client";

import { useState } from "react";

export default function MembershipCheckoutButton() {
  const [loading, setLoading] = useState(false);

  async function startCheckout() {
    try {
      setLoading(true);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "membership",
          source: "membership",
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        console.error("[membership] checkout error", json);
        alert(json?.error ?? "Checkout failed");
        return;
      }

      if (json?.url) {
        window.location.href = json.url;
        return;
      }

      alert("Checkout failed: missing session url");
    } catch (e) {
      console.error("[membership] unexpected error", e);
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={startCheckout}
      disabled={loading}
      className="rounded-full bg-[#00FFF7] px-6 py-2.5 text-sm font-semibold text-black shadow-lg shadow-fuchsia-500/30 transition hover:translate-y-[1px] hover:shadow-fuchsia-400/40 disabled:opacity-60"
    >
      {loading ? "Sending to Stripe…" : "Join Membership — $15/mo"}
    </button>
  );
}
