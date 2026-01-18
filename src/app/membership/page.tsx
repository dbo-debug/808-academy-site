// src/app/membership/page.tsx
/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Membership | The 808 Academy",
  description:
    "Join the 808 Academy membership: live education, community, remix contests, sync submissions, sample library drops, and more.",
};

const PILL_ROWS = [
  "Live teachers",
  "Discord community + collabs",
  "Remix contests + prizes",
  "Sync submissions + opportunities",
  "Sample library",
  "Livestreams + sessions",
];

const FEATURE_CARDS = [
  {
    title: "Education",
    body:
      "The cornerstone of the platform. Live instruction, real feedback, and a system you can follow — not endless pre-recorded videos.",
  },
  {
    title: "Community",
    body:
      "Discord with collabs, peer review, practice sessions, course chats, and a serious music network.",
  },
  {
    title: "Remix Contests",
    body:
      "Monthly contests with paid prizes and real visibility. Unlimited member entries.",
  },
  {
    title: "Sync Submissions",
    body:
      "Submit original work for opportunities in TV/film/social. We’ll keep the pipeline active as we scale.",
  },
  {
    title: "Sample Library",
    body:
      "A curated library of loops, one-shots, MIDI patterns (multiple keys), and more. Splice-lite style (coming soon).",
  },
  {
    title: "Livestreams",
    body:
      "Live production / mix / master sessions, breakdowns, and office-hours style Q&A.",
  },
];

export default function MembershipPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: "url('/member-bkgrnd.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* overlays */}
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black" />

        {/* glow blobs */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
            808 Membership
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
            Your creative operating system —
            <span className="text-[#00FFF7]"> built for music people.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm sm:text-base text-white/75">
            A membership platform combining{" "}
            <span className="text-white">live education</span>,{" "}
            <span className="text-white">community</span>, and{" "}
            <span className="text-white">real opportunities</span> — with drops,
            contests, submissions, and a home base that keeps you moving.
          </p>

          {/* PILL ROW */}
          <div className="mt-7 flex flex-wrap gap-2">
            {PILL_ROWS.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur"
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/apply?program=Membership"
              className="rounded-full bg-[#00FFF7] px-7 py-3 text-sm font-semibold text-black shadow-lg shadow-cyan-500/30 transition hover:translate-y-[1px] hover:shadow-cyan-400/40"
            >
              Join Membership — $15/mo
            </Link>

            <Link
              href="mailto:support@the808academy.com?subject=Membership%20Question"
              className="rounded-full border border-white/20 bg-black/20 px-7 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 transition"
            >
              Ask a question
            </Link>

            <span className="w-full text-[11px] uppercase tracking-[0.2em] text-white/45">
              $15/month • Cancel anytime • Takes 60 seconds
            </span>
          </div>
        </div>
      </section>

      {/* DIAGRAM: PLATFORM EXPLAINED */}
      <section className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold">
                The platform, explained
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-white/70">
                Membership is the hub. Everything else plugs into it — education,
                community, resources, and opportunities.
              </p>
            </div>

            <Link
              href="/apply?program=Membership"
              className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white/90 hover:bg-white/10 transition"
            >
              Get access
            </Link>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl">
  <img
    src="/member-diagram.jpg"
    alt="808 Membership platform diagram"
    className="block w-full h-auto"
  />
</div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-white/50">
                No content graveyard
              </div>
              <p className="mt-2 text-sm text-white/75">
                We’re built around live teachers, submissions, feedback, and
                momentum — not pre-recorded celebrity lessons.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-white/50">
                Built for growth
              </div>
              <p className="mt-2 text-sm text-white/75">
                Learn, build, and put your work into real pipelines: contests,
                sync, and collabs.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-white/50">
                The home base
              </div>
              <p className="mt-2 text-sm text-white/75">
                The Lounge is where everything lives: announcements, resources,
                submissions, and access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET: FEATURE GRID */}
      <section className="border-b border-white/10 bg-gradient-to-b from-black via-black to-cyan-500/5">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-semibold">What you get</h2>
          <p className="mt-2 max-w-3xl text-sm text-white/70">
            This is your home base: resources + community + live education +
            submission pipelines. Built for long-term growth — not a content library.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURE_CARDS.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-white/20"
              >
                <div className="text-sm font-semibold text-white">{c.title}</div>
                <p className="mt-2 text-sm text-white/70">{c.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/apply?program=Membership"
              className="rounded-full bg-[#00FFF7] px-7 py-3 text-sm font-semibold text-black shadow-lg shadow-cyan-500/30 transition hover:translate-y-[1px]"
            >
              Join Membership — $15/mo
            </Link>

            <Link
              href="/courses"
              className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 transition"
            >
              Explore courses
            </Link>

            <p className="w-full mt-2 text-xs text-white/50">
              Cohorts will live inside the platform (membership-first). Tutoring stays separate.
            </p>
          </div>
        </div>
      </section>

      {/* FIT: COHORTS / TUTORING */}
      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            How membership fits with cohorts & tutoring
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-3 text-sm">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                Membership
              </p>
              <p className="mt-2 text-sm text-white/75">
                Your ongoing home base: Lounge access, Discord, drops, contests,
                sync, and more.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                Cohorts
              </p>
              <p className="mt-2 text-sm text-white/75">
                A focused live program with homework + feedback. Cohorts sit on
                top of membership.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                Tutoring
              </p>
              <p className="mt-2 text-sm text-white/75">
                Deep 1:1 coaching for a custom gameplan: production, mixing,
                workflow, and accountability.
              </p>
            </div>
          </div>

          {/* Bottom CTA band */}
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-lg font-semibold">Ready to plug in?</div>
              <p className="mt-1 text-sm text-white/70">
                Join now, get access to the Lounge, and start submitting / building immediately.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/apply?program=Membership"
                className="rounded-full bg-[#00FFF7] px-7 py-3 text-sm font-semibold text-black hover:opacity-90 transition"
              >
                Join — $15/mo
              </Link>
              <Link
                href="/remix-contest"
                className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 transition"
              >
                See remix contests
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
