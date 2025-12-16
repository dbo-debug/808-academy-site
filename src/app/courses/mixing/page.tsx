// src/app/courses/mixing/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Mixing Course — Coming Soon | 808 Academy",
  description:
    "The new 808 Academy Mixing course is coming soon. Get notified for the next live cohort and member materials.",
};

export default function MixingComingSoonPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 text-white">
      <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-10 backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#00FFF7]">Mixing</p>
        <h1 className="mt-3 text-4xl font-semibold">Mixing Course — Coming Soon</h1>
        <p className="mt-3 max-w-3xl text-white/70">
          We&apos;re updating the Mixing course with new stems, templates, and live breakdowns. You&apos;ll learn modern
          vocal chains, low-end control, and translation that works everywhere. Join the list to get early seats.
        </p>

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link
            href="/membership"
            className="rounded-lg bg-[#00FFF7] px-5 py-2 font-semibold text-black transition hover:bg-white"
          >
            Join membership for early access
          </Link>
          <Link
            href="/apply?interest=mixing"
            className="rounded-lg border border-white/20 px-5 py-2 text-white/80 transition hover:border-[#00FFF7] hover:text-[#00FFF7]"
          >
            Get notified
          </Link>
        </div>

        <div className="mt-10 grid gap-4 rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-white/70">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#00FFF7]" />
            Live cohort schedule releases soon with replays for every class.
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white/60" />
            Updated Ableton/Logic mix templates and vocal chains included.
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white/60" />
            Office hours and feedback sessions for member mixes.
          </div>
        </div>
      </div>
    </main>
  );
}
