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
  "Fill out a short intake form so we can understand your goals, DAW, and schedule.",
  "We hop on a 20–30 minute call to see if tutoring is a good fit.",
  "If it’s a match, we book weekly or bi-weekly sessions and set your first 4-week gameplan.",
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
              The 808 Academy tutoring program is for serious producers who want
              feedback, accountability, and a clear roadmap — not another
              40-hour course that collects dust.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {/* TODO: swap href with your real intake / checkout later */}
              <Link
                href="/apply"
                className="rounded-full bg-[#00FFF7] px-6 py-2.5 text-sm font-semibold text-black shadow-lg shadow-cyan-500/30 transition hover:translate-y-[1px] hover:shadow-cyan-400/40"
              >
                Apply for Tutoring
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
                <li>• Weekly or bi-weekly private Zoom sessions</li>
                <li>• Session recap notes + homework each week</li>
                <li>• Project file &amp; mix feedback between calls (where possible)</li>
                <li>• Guidance on releases, branding, and next steps</li>
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
            Courses are great for foundations. Tutoring is for when you’re ready
            to apply everything to your own tracks and move faster with a
            mentor.
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

      {/* How it works + FAQ-ish */}
      <section className="bg-black">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* How it works */}
            <div>
              <h2 className="text-xl font-semibold sm:text-2xl">
                How the tutoring program works
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

            {/* Quick FAQ */}
            <div>
              <h2 className="text-xl font-semibold sm:text-2xl">
                Common questions
              </h2>
              <dl className="mt-4 space-y-4 text-sm text-white/75">
                <div>
                  <dt className="font-semibold text-white">
                    How long is the commitment?
                  </dt>
                  <dd className="mt-1 text-white/70">
                    Most students commit in 4–8 week blocks. We’ll decide
                    together after the intro call based on your goals and
                    schedule.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">
                    What skill level do I need?
                  </dt>
                  <dd className="mt-1 text-white/70">
                    You should already know your way around a DAW and have a few
                    tracks or beats started. You don’t need to be advanced — just
                    serious about improving.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">
                    Do you offer group options?
                  </dt>
                  <dd className="mt-1 text-white/70">
                    Small group options may be available depending on the cohort
                    calendar. Mention it on your application if you’re
                    interested.
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center rounded-full bg-[#00FFF7] px-6 py-2.5 text-sm font-semibold text-black shadow-lg shadow-cyan-500/40 transition hover:translate-y-[1px]"
                >
                  Start your tutoring application
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
