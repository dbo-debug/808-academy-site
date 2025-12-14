// src/app/remix-contest/page.tsx
import Link from "next/link";

export const metadata = {
  title: "808 Remix Contest | $100 every two weeks",
  description:
    "Bi-weekly 808 Academy remix contests. Download the pack, flip it, and compete for $100 plus feedback and features.",
};

export default function RemixContestPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 text-white">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] via-black to-[#0b1622] p-10 shadow-2xl shadow-cyan-500/10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#00FFF7]">Bi-weekly</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight">808 Remix Contest</h1>
        <p className="mt-3 max-w-3xl text-white/70">
          Every two weeks we drop stems and a brief. Flip it your way, submit, and you could win $100 plus a feature in
          class and on our socials. Members get unlimited entries and feedback.
        </p>

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link
            href="/membership"
            className="rounded-lg bg-[#00FFF7] px-5 py-2 font-semibold text-black transition hover:bg-white"
          >
            Join membership (unlimited entries)
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-lg border border-white/20 px-5 py-2 text-white/80 transition hover:border-[#00FFF7] hover:text-[#00FFF7]"
          >
            Create your account
          </Link>
        </div>

        <div className="mt-10 grid gap-4 rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-white/80">
          <div className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-[#00FFF7]" />
            <div>
              <p className="font-semibold">$100 prize every two weeks</p>
              <p className="text-white/70">Winner gets $100 plus a spotlight in the Student Lounge and on socials.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
            <div>
              <p className="font-semibold">Unlimited entries for members</p>
              <p className="text-white/70">Submit as many flips as you want while your membership is active.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
            <div>
              <p className="font-semibold">Feedback + features</p>
              <p className="text-white/70">Top submissions get live feedback, playlist spots, and extra promo.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[#00FFF7]">Step 1</p>
            <h3 className="mt-2 text-xl font-semibold">Download the contest pack</h3>
            <p className="mt-2 text-white/70">Grab the stems, BPM/key, and brief. Packs drop every two weeks.</p>
            <Link
              href="/students/contests/current"
              className="mt-4 inline-flex items-center text-sm font-semibold text-[#00FFF7] underline-offset-4 hover:underline"
            >
              Get the current pack →
            </Link>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[#00FFF7]">Step 2</p>
            <h3 className="mt-2 text-xl font-semibold">Submit your flip</h3>
            <p className="mt-2 text-white/70">Upload your WAV/MP3 and notes. We review and announce winners inside the lounge.</p>
            <Link
              href="/students/upload?type=remix"
              className="mt-4 inline-flex items-center text-sm font-semibold text-[#00FFF7] underline-offset-4 hover:underline"
            >
              Submit your remix →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
