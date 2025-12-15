"use client";

import React from "react";

/**
 * Shared Merch Page
 * Used by:
 * - /students/store/merch
 * - /store/merch
 */

type MerchItem = {
  key: string;
  title: string;
  price: string;
  description: string;
};

const MERCH_ITEMS: MerchItem[] = [
  {
    key: "hoodie-black",
    title: "808 Logo Hoodie (Black)",
    price: "$79 + tax & shipping",
    description:
      "Clean black hoodie with neon 808 chest logo. Simple, loud, and studio-ready.",
  },
  {
    key: "hoodie-art",
    title: "808 Art Hoodie",
    price: "$89 + tax & shipping",
    description:
      "Heavyweight hoodie with full-color artwork and 808 Academy lockup.",
  },
  {
    key: "tee-black",
    title: "808 Logo Tee (Black)",
    price: "$39 + tax & shipping",
    description:
      "Classic black tee with 808 Academy logo. Everyday studio essential.",
  },
];

export default function MerchPage({
  variant = "student",
}: {
  variant?: "student" | "public";
}) {
  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "merch",
        }),
      });

      if (!res.ok) throw new Error("Checkout failed");

      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      alert("Could not start checkout. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-white">808 Merch</h1>
        <p className="mt-2 max-w-xl text-sm text-slate-300">
          Limited-run merch designed for studio sessions and late nights.
          Made to order.
        </p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MERCH_ITEMS.map((item) => (
          <div
            key={item.key}
            className="rounded-2xl border border-slate-800/80 bg-black/60 p-6"
          >
            <h3 className="text-lg font-medium text-white">{item.title}</h3>
            <p className="mt-1 text-sm text-slate-400">{item.price}</p>

            <p className="mt-3 text-sm text-slate-300">
              {item.description}
            </p>

            <button
              onClick={handleCheckout}
              className="mt-5 w-full rounded-xl bg-teal-500 px-4 py-2 text-sm font-medium text-black hover:bg-teal-400"
            >
              Pre-order with Stripe
            </button>
          </div>
        ))}
      </section>

      {variant === "public" && (
        <p className="mt-10 text-center text-xs text-slate-400">
          Already a student? Access merch anytime from your Student Lounge.
        </p>
      )}
    </div>
  );
}
