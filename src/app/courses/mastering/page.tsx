// src/app/courses/mastering/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Mastering Course — Coming Soon | 808 Academy",
  description:
    "Mastering at 808 Academy is getting a new live format. Learn loudness, delivery, and QC. Join the list to be first in.",
};

export default function MasteringComingSoonPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 text-white">
      <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-10 backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#00FFF7]">Mastering</p>
        <h1 className="mt-3 text-4xl font-semibold">Mastering Course — Coming Soon</h1>
        <p className="mt-3 max-w-3xl text-white/70">
          A refreshed Mastering course is on deck: loudness targets, delivery checklists, QC workflows, and modern tools
          for streaming and club. Add your email for the early invite.
        </p>

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link
            href="/membership"
            className="rounded-lg bg-[#00FFF7] px-5 py-2 font-semibold text-black transition hover:bg-white"
          >
            Join membership for early access
          </Link>
          <Link
            href="/apply?interest=mastering"
            className="rounded-lg border border-white/20 px-5 py-2 text-white/80 transition hover:border-[#00FFF7] hover:text-[#00FFF7]"
          >
            Get notified
          </Link>
        </div>

        <div className="mt-10 grid gap-4 rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-white/70">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#00FFF7]" />
            Includes mastering chains, loudness targets, and delivery templates.
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white/60" />
            Cohort timing announced soon — replays included for members.
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white/60" />
            Pair it with the Mixing course for a full end-to-end workflow.
          </div>
        </div>
      </div>
    </main>
  );
}
