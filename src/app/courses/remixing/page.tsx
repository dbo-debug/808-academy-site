// src/app/courses/remixing/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Remixing Course — Coming Soon | 808 Academy",
  description:
    "A new Remixing course is on the way. Learn flip workflows, vocal chops, tempo mapping, and release-ready remixes with 808 Academy.",
};

export default function RemixingComingSoonPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 text-white">
      <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-10 backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#00FFF7]">Remixing</p>
        <h1 className="mt-3 text-4xl font-semibold">Remixing Course — Coming Soon</h1>
        <p className="mt-3 max-w-3xl text-white/70">
          We&apos;re finishing the new Remixing curriculum: tempo mapping, re-harmonization, vocal chopping, FX
          design, and contest-ready workflows. Add your name to the list and get first access when it opens.
        </p>

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link
            href="/membership"
            className="rounded-lg bg-[#00FFF7] px-5 py-2 font-semibold text-black transition hover:bg-white"
          >
            Join membership for early access
          </Link>
          <Link
            href="/apply?interest=remixing"
            className="rounded-lg border border-white/20 px-5 py-2 text-white/80 transition hover:border-[#00FFF7] hover:text-[#00FFF7]"
          >
            Get notified
          </Link>
        </div>

        <div className="mt-10 grid gap-4 rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-white/70">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#00FFF7]" />
            Bi-weekly remix contests stay live for members — check the Remix Contest page.
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white/60" />
            Curriculum covers flip prep, stems, creative resampling, arrangement, and finishing.
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white/60" />
            Includes Ableton/Logic templates, stems, and A/B references.
          </div>
        </div>
      </div>
    </main>
  );
}
