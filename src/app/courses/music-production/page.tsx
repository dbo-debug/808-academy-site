import Link from "next/link";
import JoinPlatformButton from "../../../components/JoinPlatformButton";

export const metadata = {
  title: "Music Production | 808 Academy",
  description:
    "Music production education inside the 808 Academy platform. Learn to produce, arrange, and finish release-ready songs from your home studio.",
  openGraph: {
    title: "Music Production | 808 Academy",
    description:
      "Structured music production education inside the 808 Academy membership platform.",
    images: ["/MusicProduction.png"],
  },
};

const CURRICULUM = [
  {
    n: "0",
    title: "Foundation: Sound & Hearing Fundamentals (Pre-Class)",
    desc:
      "Lesson 0 — the baseline every student completes before class starts. You’ll learn how to hear frequency, dynamics, and space so every mix decision you make is intentional (and repeatable).",
    badge: "Pre-class",
  },
  {
    n: "1",
    title: "DAW Signal Flow",
    desc:
      "Stop guessing. Learn exactly how audio moves through your DAW: routing, buses, sends, groups, gain staging, and a clean session template that stays organized as your track grows.",
  },
  {
    n: "2",
    title: "Pre-Production: Inspiration, Sources & Session Setup",
    desc:
      "Build the creative launchpad. We’ll pull references, choose a direction, prep your sounds, set BPM/key, and design a session that keeps you moving fast without losing the vibe.",
  },
  {
    n: "3",
    title: "Verse & Hook Development",
    desc:
      "Turn a loop into a real record. You’ll learn hook-first thinking, melodic layering, tension/release, arrangement choices that support the vocal, and how to make sections feel inevitable.",
  },
  {
    n: "4",
    title: "Drum Production",
    desc:
      "Program drums that feel alive. Groove, swing, pocket, fills, transitions, 808 placement, and sound selection — plus the mixing moves that make drums hit without killing dynamics.",
  },
  {
    n: "5",
    title: "Low End Theory",
    desc:
      "Get the bass/808/kick relationship right. You’ll learn phase and tuning, carving space, sidechain strategy, mono control, and how to make the low end translate on every system.",
  },
  {
    n: "6",
    title: "Harmony & Chord Progressions",
    desc:
      "Make your chords emotional and intentional. We’ll cover progression choices, voicings, inversions, tension chords, and how to build harmony that supports the hook and vocal range.",
  },
  {
    n: "7",
    title: "Vocal Production",
    desc:
      "Record and produce vocals that sound finished. Mic technique, comping, timing, tuning, stacks, adlibs, creative FX — and how to keep vocals upfront without harshness.",
  },
  {
    n: "8",
    title: "Mixing Fundamentals",
    desc:
      "A clean, repeatable mix workflow: balance, EQ, compression, panning, depth, automation, and reference matching — so your song feels 3D and competitive without over-processing.",
  },
  {
    n: "F",
    title: "Final Unit: Finalize Mix & Deliverables",
    desc:
      "Finish like a pro. Print stems, export versions, loudness targets, deliverables for release/sync, and a simple final polish checklist so you never get stuck at the finish line again.",
    badge: "Final unit",
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

function SectionTitle({ title, body }: { title: string; body?: string }) {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
      {body ? <p className="mt-2 text-sm text-white/70">{body}</p> : null}
    </div>
  );
}

export default function MusicProductionPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section
        className="relative border-b border-white/10"
        style={{
          backgroundImage: "url('/MusicProduction.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <div className="flex flex-wrap items-center gap-2">
            <Pill>Education path</Pill>
            <Pill>Inside the Platform</Pill>
            <Pill>Structured curriculum</Pill>
            <Pill>Feedback + accountability</Pill>
          </div>

          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
            Music Production
          </h1>

          <p className="mt-4 max-w-2xl text-sm sm:text-base text-white/75">
            Learn to produce, arrange, and finish release-ready songs from your
            home studio — with a structured path, community feedback, and
            real-world momentum.
          </p>

<p className="mt-5 max-w-2xl text-left text-lg font-semibold text-white">
  Live teachers. Real feedback. No pre-recorded lessons.
</p>

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            {/* Primary: Membership */}
            <JoinPlatformButton />

            {/* Secondary: Call */}
            <Link
              href="/apply?program=Course&course=Music+Production"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 transition"
            >
              Schedule a Call
            </Link>

            {/* Tertiary: Lounge */}
            <Link
              href="/students"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 transition"
            >
              Go to the Lounge
            </Link>
          </div>

          <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-white/45">
            Membership required • Zoom + screen share • Built for real progress
          </p>

          <p className="mt-3 max-w-2xl text-xs text-white/55">
            Join the platform to access the Student Lounge, education paths,
            community feedback, contests, submissions, and more.
          </p>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-12 border-b border-white/10">
        <SectionTitle
          title="How it works"
          body="Music Production is an education path inside the 808 Academy platform. Live cohorts and guided experiences are available to members when scheduled."
        />
        <div className="max-w-4xl mx-auto px-6 mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-white/50">
              Start here
            </div>
            <div className="mt-2 text-sm text-white/80">
              Join the Platform
              <br />
              Access the Lounge instantly
              <br />
              Begin the curriculum
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-white/50">
              Feedback loop
            </div>
            <div className="mt-2 text-sm text-white/80">
              Submit work
              <br />
              Get feedback + direction
              <br />
              Improve week to week
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-white/50">
              Go deeper
            </div>
            <div className="mt-2 text-sm text-white/80">
              Join live cohorts (when available)
              <br />
              Book tutoring if needed
              <br />
              Build real momentum
            </div>
          </div>
        </div>
      </section>

      {/* Offer / Value */}
      <section className="py-12 border-b border-white/10">
        <SectionTitle
          title="What you get"
          body="This is a structured build. We’re not chasing random tutorials — we’re finishing real records."
        />
        <div className="mx-auto max-w-5xl px-6 mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-semibold">
              A finished, release-ready track
            </div>
            <p className="mt-2 text-sm text-white/70">
              The goal is completion — not another half-done loop folder.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-semibold">Real feedback + direction</div>
            <p className="mt-2 text-sm text-white/70">
              Clear priorities so you always know what to improve next.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-semibold">
              Platform access + opportunities
            </div>
            <p className="mt-2 text-sm text-white/70">
              Student Lounge access, community, challenges, submissions, and
              resources — all included with membership.
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-12">
        <SectionTitle
          title="Curriculum overview"
          body="Every section stacks. You’ll build the song as you learn the skills."
        />
        <div className="mx-auto max-w-5xl px-6 mt-8 grid gap-4">
          {CURRICULUM.map((l) => (
            <div
              key={l.n}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-lg font-semibold">
                  {l.n === "0"
                    ? "Lesson 0"
                    : l.n === "F"
                    ? "Final Unit"
                    : `Chapter ${l.n}`}{" "}
                  — {l.title}
                </div>
                {l.badge ? <Pill>{l.badge}</Pill> : null}
              </div>
              <p className="mt-2 text-sm text-white/70">{l.desc}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-5xl px-6 mt-10 flex flex-wrap gap-3 items-center">
          <JoinPlatformButton />
          <Link
            href="/courses"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-7 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 transition"
          >
            Explore all courses
          </Link>

          <p className="w-full mt-3 text-xs text-white/50">
            Membership unlocks the Platform. Live cohorts and advanced programs
            can be added when available.
          </p>
        </div>
      </section>
    </main>
  );
}
