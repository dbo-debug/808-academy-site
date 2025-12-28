// src/app/remix-contest/page.tsx
import Link from "next/link";

export const metadata = {
  title: "808 Remix Contest | $100 Monthly + Unlimited Submissions",
  description:
    "Monthly 808 Academy remix contests. Join membership to unlock the pack, submit unlimited flips, and compete for $100 plus feedback and features.",
};

export default function RemixContestPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 text-white">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] via-black to-[#0b1622] p-10 shadow-2xl shadow-cyan-500/10">
        {/* Top tag */}
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#00FFF7]">
          Launching Jan 1 • Monthly
        </p>

        {/* Title */}
        <h1 className="mt-3 text-4xl font-semibold leading-tight">
          808 Remix Contest
        </h1>

        {/* Lead */}
        <p className="mt-3 max-w-3xl text-white/70">
          Join the 808 Academy, unlock the contest pack inside the Student
          Lounge, flip it your way, and submit as many entries as you want.
          Winners get <span className="text-white font-semibold">$100 cash</span>{" "}
          plus features and feedback.
        </p>

        {/* Primary CTAs */}
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link
            href="/membership"
            className="rounded-lg bg-[#00FFF7] px-5 py-2 font-semibold text-black transition hover:bg-white"
          >
            Join Membership ($15) →
          </Link>

          <Link
            href="/courses/music-production"
            className="rounded-lg border border-white/20 px-5 py-2 text-white/80 transition hover:border-[#00FFF7] hover:text-[#00FFF7]"
          >
            See the free live class →
          </Link>
        </div>

        {/* Value bullets */}
        <div className="mt-10 grid gap-4 rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-white/80">
          <div className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-[#00FFF7]" />
            <div>
              <p className="font-semibold">$100 prize every month</p>
              <p className="text-white/70">
                Winner gets $100 cash plus a spotlight in the Student Lounge and
                on socials.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
            <div>
              <p className="font-semibold">Unlimited entries for members</p>
              <p className="text-white/70">
                Submit as many flips as you want while your membership is active.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
            <div>
              <p className="font-semibold">Feedback + momentum</p>
              <p className="text-white/70">
                Top submissions get feedback, features, and extra promo inside the
                community.
              </p>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[#00FFF7]">
              Step 1
            </p>
            <h3 className="mt-2 text-xl font-semibold">
              Unlock the contest pack
            </h3>
            <p className="mt-2 text-white/70">
              The stems, BPM/key, brief, and download link live in the Student
              Lounge. You’ll get access immediately after joining.
            </p>

            <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white/80">
              <p className="font-semibold text-white">Members-only access</p>
              <p className="mt-1 text-white/70">
                Packs are locked until you join. No dead links — everything
                unlocks inside your account.
              </p>
            </div>

            <Link
              href="/membership"
              className="mt-4 inline-flex items-center text-sm font-semibold text-[#00FFF7] underline-offset-4 hover:underline"
            >
              Join to unlock the pack →
            </Link>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[#00FFF7]">
              Step 2
            </p>
            <h3 className="mt-2 text-xl font-semibold">Submit your flip</h3>
            <p className="mt-2 text-white/70">
              Upload your WAV/MP3 and notes inside the lounge. Winners and
              shoutouts are announced there first.
            </p>

            <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white/80">
              <p className="font-semibold text-white">Unlimited submissions</p>
              <p className="mt-1 text-white/70">
                Try multiple versions, styles, and genres — submit as many as you
                want.
              </p>
            </div>

            <Link
              href="/membership"
              className="mt-4 inline-flex items-center text-sm font-semibold text-[#00FFF7] underline-offset-4 hover:underline"
            >
              Join to submit →
            </Link>
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-white/80">
              Membership is{" "}
              <span className="text-white font-semibold">$15/month</span>. Cancel
              anytime.
            </p>
            <p className="mt-1 text-xs text-white/60">
              Join for the contest, stay for the system.
            </p>
          </div>
          <Link
            href="/membership"
            className="inline-flex justify-center rounded-lg bg-[#00FFF7] px-6 py-2.5 font-semibold text-black transition hover:bg-white"
          >
            Join Membership →
          </Link>
        </div>
      </section>
    </main>
  );
}
