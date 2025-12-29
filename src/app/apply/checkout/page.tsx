import { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="min-h-[70vh] bg-black text-white flex items-center">
          <div className="mx-auto w-full max-w-xl px-6 py-12">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#00FFF7]">
                Checkout
              </p>
              <h1 className="mt-3 text-3xl font-semibold">
                Sending you to checkout…
              </h1>
            </div>
          </div>
        </main>
      }
    >
      <CheckoutClient />
    </Suspense>
  );
}
