// src/app/store/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function StorePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14 text-white">
      <header className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Image
              src="/logo-808-cyan.svg"
              alt="808 Academy Logo"
              width={180}
              height={70}
              className="mb-4"
            />
            <h1 className="text-4xl font-semibold tracking-tight">808 Store</h1>
            <p className="mt-3 max-w-2xl text-sm text-white/70">
              Official 808 Academy merch and tools. Open to everyone — students get member pricing once
              they sign in.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 text-sm text-white/70">
            <Link href="/auth/signin" className="underline-offset-4 hover:text-white hover:underline">
              Students: sign in →
            </Link>
            <Link href="/membership" className="underline-offset-4 hover:text-white hover:underline">
              Not a member yet? Join for perks →
            </Link>
          </div>
        </div>
      </header>

      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        <Link
          href="/store/merch"
          className="group flex flex-col rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-[#00FFF7]/70 hover:bg-white/10"
        >
          <div className="relative mb-4 h-48 w-full overflow-hidden rounded-2xl bg-black/40">
            <Image
              src="/assets/lounge/store/merch/art-hoodie-prod.jpg"
              alt="808 merch preview"
              fill
              className="object-cover opacity-85 transition duration-500 group-hover:scale-105"
            />
          </div>
          <h2 className="text-xl font-semibold">808 Merch</h2>
          <p className="mt-2 text-sm text-white/70">
            Hoodies, tees, caps, and stickers. Built for late sessions and shows.
          </p>
          <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#00FFF7]">
            Shop Merch →
          </span>
        </Link>

        <Link
          href="/store/plugins"
          className="group flex flex-col rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-[#00FFF7]/70 hover:bg-white/10"
        >
          <div className="relative mb-4 h-48 w-full overflow-hidden rounded-2xl bg-black/40">
            <Image
              src="/assets/lounge/lounge-bkgrnd.jpg"
              alt="Plugin perks coming soon"
              fill
              className="object-cover opacity-70 transition duration-500 group-hover:scale-105"
            />
            <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-white/70">
              Coming Soon
            </span>
          </div>
          <h2 className="text-xl font-semibold">Plugin Deals</h2>
          <p className="mt-2 text-sm text-white/70">
            Member-only pricing on EQs, compressors, synths, and FX bundles. Dropping soon.
          </p>
          <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#00FFF7]">
            Browse Deals →
          </span>
        </Link>
      </section>
    </main>
  );
}
