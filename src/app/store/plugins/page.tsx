// src/app/store/plugins/page.tsx
import Link from "next/link";

export default function StorePluginsComingSoon() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14 text-white">
      <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-10 text-center backdrop-blur">
        <p className="text-xs uppercase tracking-[0.24em] text-[#00FFF7]">Plugins</p>
        <h1 className="mt-3 text-4xl font-semibold">Plugin Partner Store</h1>
        <p className="mt-3 text-white/70">
          Exclusive pricing on EQs, compressors, synths, and FX bundles for 808 students and members. We&apos;re
          finalizing the partner list now — drop your email and we&apos;ll notify you.
        </p>

        <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/60 px-5 py-3 text-sm text-white/80">
          <span className="inline-flex h-2 w-2 rounded-full bg-[#00FFF7]" />
          Launching soon — stay tuned.
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
          <Link
            href="/auth/signin"
            className="rounded-lg border border-white/20 px-4 py-2 text-white/80 transition hover:border-[#00FFF7] hover:text-[#00FFF7]"
          >
            Students sign in
          </Link>
          <Link
            href="/membership"
            className="rounded-lg bg-[#00FFF7] px-4 py-2 font-semibold text-black transition hover:bg-white"
          >
            Join membership
          </Link>
        </div>
      </div>
    </main>
  );
}
