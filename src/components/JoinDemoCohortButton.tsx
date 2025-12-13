// src/components/JoinDemoCohortButton.tsx
"use client";

import { useState } from "react";

type JoinDemoCohortButtonProps = {
  /** "demo" will use STRIPE_PRICE_COHORT_DEMO, "paid" will use STRIPE_PRICE_COHORT_PAID */
  mode?: "demo" | "paid";
  /** Optional override for button label */
  label?: string;
  /** Extra tailwind classes if you want to tweak styling where it’s used */
  className?: string;
};

export function JoinDemoCohortButton({
  mode = "demo",
  label,
  className = "",
}: JoinDemoCohortButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;

    try {
      setLoading(true);

      // Call our checkout API with the cohort mode
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mode }), // { mode: "demo" } or { mode: "paid" }
      });

      if (!res.ok) {
        console.error("Checkout error", await res.text());
        alert("Something went wrong starting checkout. Please try again.");
        return;
      }

      const data = (await res.json()) as { url?: string };

      if (data.url) {
        // Redirect user to Stripe Checkout
        window.location.href = data.url;
      } else {
        console.error("No checkout URL returned from /api/checkout", data);
        alert("Couldn’t start checkout. Please try again.");
      }
    } catch (err) {
      console.error("Checkout exception", err);
      alert("Unexpected error starting checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`rounded-xl bg-[#00FFF7] px-6 py-3 font-semibold text-black transition hover:opacity-90 disabled:opacity-70 ${className}`}
    >
      {loading
        ? "Redirecting..."
        : label ?? (mode === "demo" ? "Join Free Demo Cohort" : "Join Cohort")}
    </button>
  );
}
