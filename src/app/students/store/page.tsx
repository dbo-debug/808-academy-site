// src/app/students/store/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function StoreHubPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10">
      {/* HERO */}
      <header className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Image
              src="/logo-808-cyan.svg"
              alt="808 Academy Logo"
              width={160}
              height={60}
              className="mb-3"
            />
            <h1 className="text-3xl font-semibold tracking-tight">Student Store</h1>
            <p className="mt-2 max-w-xl text-sm text-white/70">
              Official 808 Academy merch, tools, plugin deals, and digital packs. 
              More drops are coming soon — students get early access.
            </p>
          </div>

          <Link
            href="/students"
            className="text-xs text-white/70 hover:text-white/100 transition"
          >
            ← Back to Lounge
          </Link>
        </div>

        <div className="mt-4 inline-flex items-center rounded-full border border-white/10 bg-black/40 px-4 py-1 text-[11px] uppercase tracking-[0.16em] text-white/60">
          Merch • Tools • Plugins • Packs
        </div>
      </header>

      {/* CATEGORY GRID */}
      <section className="grid gap-6 sm:grid-cols-2">
        {/* MERCH */}
        <Link
          href="/students/store/merch"
          className="group flex flex-col rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-[#00FFF7]/70 hover:bg-white/10"
        >
          <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-black/30 mb-4">
            <Image
              src="/assets/store/merch/black-hoodie-prod.jpg"
              alt="808 Merch preview"
              fill
              className="object-cover opacity-80 transition duration-500 group-hover:scale-105"
            />
          </div>

          <h2 className="text-xl font-semibold">808 Merch</h2>
          <p className="mt-2 text-sm text-white/70">
            Hoodies, tees, caps, and stickers — made-to-order and limited drops.
          </p>

          <span className="mt-4 inline-flex items-center text-[#00FFF7] text-sm font-semibold">
            Shop Merch →
          </span>
        </Link>

        {/* PLUGINS */}
        <Link
          href="/students/store/plugins"
          className="group flex flex-col rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-[#00FFF7]/70 hover:bg-white/10"
        >
          <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-black/30 mb-4">
            <Image
              src="/assets/lounge/lounge-bkgrnd.jpg"
              alt="Plugin preview"
              fill
              className="object-cover opacity-70 brightness-[0.4] transition duration-500 group-hover:scale-105"
            />
          </div>

          <h2 className="text-xl font-semibold">Plugin Deals</h2>
          <p className="mt-2 text-sm text-white/70">
            Exclusive student pricing on EQs, compressors, synths, FX bundles and more.
          </p>

          <span className="mt-4 inline-flex items-center text-[#00FFF7] text-sm font-semibold">
            Browse Plugins →
          </span>
        </Link>
      </section>
    </div>
  );
}
