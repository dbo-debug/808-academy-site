// src/app/tutoring/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tutoring | The 808 Academy",
  description:
    "1:1 and small-group music production coaching for producers who want better mixes, stronger songs, and release-ready tracks.",
};

const BENEFITS: { title: string; body: string }[] = [
  {
    title: "Dialed-in Feedback",
    body: "Get honest, actionable feedback on your beats, mixes, arrangements, and release strategy — not generic YouTube advice.",
  },
  {
    title: "Structured Weekly Progress",
    body: "We set clear goals for 4–8 weeks at a time so you always know what to practice when you sit down at your DAW.",
  },
  {
    title: "Sessions Built Around Your DAW",
    body: "We work in Ableton, FL Studio, Logic, and Pro Tools. You learn inside the tools you already use.",
  },
];

const WHO_ITS_FOR: string[] = [
  "You’ve been making beats or songs for a while but your mixes still don’t hit how you want.",
  "You get stuck finishing tracks and want someone to keep you accountable.",
  "You’re tired of random tutorials and want one clear path that fits your sound.",
  "You’d like real-world insight on releasing music, sync/supervision, or building a catalog.",
];

const HOW_IT_WORKS: string[] = [
  "Pick your tutoring option (single session or 4-session block) and fill out the short intake form.",
  "Schedule your first session in Calendly (you’ll do this before payment so you always get a real slot).",
  "Complete checkout to confirm your booking.",
  "If you chose the 4-session block, future sessions are scheduled with your tutor at the end of each call.",
];

const PACKAGES = [
  {
    title: "Single session — $49",
    body: "Perfect for mix feedback, a stuck track, or one focused breakthrough.",
  },
  {
    title: "4-session block — $139 (best value)",
    body: "Best for real progress. We set goals, track momentum, and build results over a month.",
  },
];

export default function TutoringPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="border-b border-white/10 bg-gradient-to-b from-cyan-500/10 via-black to-black">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:py-20 lg:px-8">
          {/* Left: copy */}
          <div className="flex-1 space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
              1:1 &amp; Small-Group Coaching
            </p>
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Level up your{" "}
              <span className="text-cyan-300">beats, mixes, and releases</span>{" "}
              with a real-world mentor.
            </h1>
            <p className="max-w-xl text-sm text-white/70 sm:text-base">
              Tutoring is for producers who want fast, real feedback and a clear
              plan — not another course that sits unfinished.
            </p>

            {/* NEW: Package explainer */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur">
              <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                Two ways to book
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {PACKAGES.map((p) => (
                  <div
                    key={p.title}
                    className="rounded-xl border border-white/10 bg-black/30 p-3"
                  >
                    <div className="font-semibold text-white">{p.title}</div>
                    <div className="mt-1 text-xs text-white/70">{p.body}</div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-white/60">
                You’ll schedule your first session before checkout so you always get a real time slot.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/apply?program=Tutoring"
                className="rounded-full bg-[#00FFF7] px-6 py-2.5 text-sm font-semibold text-black shadow-lg shadow-cyan-500/30 transition hover:translate-y-[1px] hover:shadow-cyan-400/40"
              >
                Book Tutoring
              </Link>

              <Link
                href="mailto:tutoring@the808academy.com?subject=Tutoring%20Inquiry"
                className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white/80 transition hover:border-cyan-300/70 hover:text-cyan-200"
              >
                Email about availability
              </Link>
            </div>

            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
              Limited spots • Sessions via Zoom • Screen-share in your DAW
            </p>
          </div>

          {/* Right: simple stat card */}
          <div className="flex-1">
            <div className="mx-auto max-w-xs rounded-3xl border border-white/10 bg-white/5 p-5 text-sm shadow-xl shadow-cyan-500/10 backdrop-blur">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                What you get
              </p>
              <ul className="mt-3 space-y-2 text-xs text-white/75">
                <li>• Private Zoom session(s)</li>
                <li>• Session recap notes + homework</li>
                <li>• Project feedback where possible</li>
                <li>• Guidance on releases + next steps</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold sm:text-2xl">
            Why tutoring instead of another course?
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            Courses teach foundations. Tutoring helps you apply everything to
            your own tracks and move faster with real feedback.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {BENEFITS.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur"
              >
                <h3 className="text-sm font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-white/70">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-b border-white/10 bg-gradient-to-b from-black via-black to-cyan-500/5">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold sm:text-2xl">Who it’s for</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {WHO_ITS_FOR.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-[5px] h-[6px] w-[6px] rounded-full bg-cyan-300" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-black">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold sm:text-2xl">
                How tutoring works
              </h2>
              <ol className="mt-4 space-y-3 text-sm text-white/75">
                {HOW_IT_WORKS.map((step, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-cyan-300">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="text-xl font-semibold sm:text-2xl">
                Common questions
              </h2>
              <dl className="mt-4 space-y-4 text-sm text-white/75">
                <div>
                  <dt className="font-semibold text-white">
                    Do I have to commit long-term?
                  </dt>
                  <dd className="mt-1 text-white/70">
                    No. Start with a single session. If you want momentum, the
                    4-session block is the best value.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">
                    What should I bring to the session?
                  </dt>
                  <dd className="mt-1 text-white/70">
                    A project you’re working on, your DAW open, and a clear goal
                    (mix feedback, arrangement, vocal chain, etc.).
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <Link
                  href="/apply?program=Tutoring"
                  className="inline-flex items-center justify-center rounded-full bg-[#00FFF7] px-6 py-2.5 text-sm font-semibold text-black shadow-lg shadow-cyan-500/40 transition hover:translate-y-[1px]"
                >
                  Book tutoring
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
