/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Image from "next/image";

type ZoomedImage = {
  src: string;
  alt: string;
} | null;

type InstrumentId = "sub" | "808" | "synth" | "acoustic" | "layered";

type ApproachKey = "kickAbove" | "bassAbove" | "shared";

const instrumentCards: {
  id: InstrumentId;
  title: string;
  description: string;
  imgSrc: string;
  sampleSrc: string;
}[] = [
  {
    id: "sub",
    title: "Sub Bass",
    description: "Pure tones that create a smooth, deep foundation.",
    imgSrc: "/assets/music-production/low-end/images/sub.jpg",
    sampleSrc: "/assets/music-production/low-end/samples/sub_bass.wav",
  },
  {
    id: "808",
    title: "808s",
    description:
      "Iconic in hip-hop and trap — a hybrid of drum and bass instrument.",
    imgSrc: "/assets/music-production/low-end/images/808.jpg",
    sampleSrc: "/assets/music-production/low-end/samples/808.wav",
  },
  {
    id: "synth",
    title: "Synth Bass",
    description:
      "Versatile analog or digital basses found in pop, dance, indie, and funk.",
    imgSrc: "/assets/music-production/low-end/images/synth.jpg",
    sampleSrc: "/assets/music-production/low-end/samples/synth_bass.wav",
  },
  {
    id: "acoustic",
    title: "Electric & Acoustic Bass",
    description: "Organic, expressive, and human — full of nuance and feel.",
    imgSrc: "/assets/music-production/low-end/images/acoustic.jpg",
    sampleSrc: "/assets/music-production/low-end/samples/electric_bass.wav",
  },
  {
    id: "layered",
    title: "Layered Low End",
    description:
      "Sub + mid-bass + harmonic layers combined so the low end translates everywhere.",
    imgSrc: "/assets/music-production/low-end/images/layered.jpg",
    sampleSrc: "/assets/music-production/low-end/samples/layered_low_end.wav",
  },
];

const approachLabels: Record<ApproachKey, string> = {
  kickAbove: "Kick Above Bass",
  bassAbove: "Bass Above Kick",
  shared: "Shared Space",
};

const sections = [
  { id: "intro-low-end", label: "1. Introduction: Why the Low End Matters" },
  {
    id: "understanding-low-frequencies",
    label: "2. Understanding Low Frequencies",
  },
  { id: "types-of-low-end", label: "3. Types of Low-End Instruments" },
  { id: "writing-basslines", label: "4. Writing Basslines" },
  { id: "kick-bass-relationship", label: "5. Kick & Bass Relationship" },
  { id: "design-808", label: "6. Designing an 808" },
  { id: "bass-selection", label: "7. Bass Sound Selection" },
  { id: "bass-dynamics", label: "8. Bass Dynamics & Movement" },
  { id: "verse-vs-hook", label: "9. Verse vs Hook Low End" },
];

export default function LowEndTheoryChapter() {
  const [zoomedImage, setZoomedImage] = useState<ZoomedImage>(null);
  const [activeInstrument, setActiveInstrument] = useState<InstrumentId | null>(
    null
  );
  const [activeApproach, setActiveApproach] =
    useState<ApproachKey>("kickAbove");

  const handleZoom = (src: string, alt: string) => {
    setZoomedImage({ src, alt });
  };

  const closeZoom = () => setZoomedImage(null);

  const handlePlaySample = (id: InstrumentId) => {
    if (typeof document === "undefined") return;
    const el = document.getElementById(
      `low-end-audio-${id}`
    ) as HTMLAudioElement | null;
    if (!el) return;

    // Stop any currently playing element
    document
      .querySelectorAll<HTMLAudioElement>('[id^="low-end-audio-"]')
      .forEach((audioEl) => {
        if (audioEl !== el) {
          audioEl.pause();
          audioEl.currentTime = 0;
        }
      });

    if (el.paused) {
      void el.play().catch(() => {});
      setActiveInstrument(id);
    } else {
      el.pause();
      el.currentTime = 0;
      setActiveInstrument(null);
    }
  };

  const scrollToSection = (id: string) => {
    if (typeof document === "undefined") return;
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderApproachContent = () => {
    switch (activeApproach) {
      case "kickAbove":
        return (
          <div className="space-y-3 text-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              1. Kick Above Bass (EDM / Pop / House / Techno)
            </p>
            <p>
              In this approach, the kick drum is the dominant low-end element,
              sitting slightly higher in pitch and often brighter than the bass.
              The bass occupies lower, steadier sub-frequencies, leaving the
              mid-low region clear for the kick to punch through.
            </p>
            <p className="font-semibold">Why it works:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Great for fast, energetic, club-oriented music</li>
              <li>Ensures the kick cuts through huge mixes</li>
              <li>Helps with consistent, driving movement</li>
              <li>Easy to sidechain for rhythmic clarity</li>
            </ul>
            <p className="font-semibold">Common traits:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Kick peaks around 60–100 Hz</li>
              <li>Bass sits lower (30–60 Hz)</li>
              <li>Clear separation = powerful, clean low end</li>
            </ul>
            <p>
              This is the classic “four-on-the-floor” system — the kick leads,
              the bass supports.
            </p>
            <div className="mt-3 space-y-2 text-xs">
              <p className="font-semibold">Reference tracks:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  <span className="font-medium">
                    Fred again.. – “Rumble” (with Skrillex &amp; Flowdan)
                  </span>
                  <br />
                  Hard, punchy kick completely dominates the low-end impact
                  while the bass rides underneath with heavy sidechain movement.
                  <br />
                  <a
                    href="https://www.youtube.com/watch?v=7z25ZZ3DHds"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-300 underline-offset-2 hover:underline"
                  >
                    Watch on YouTube
                  </a>
                </li>
                <li>
                  <span className="font-medium">
                    Calvin Harris — “One Kiss” (with Dua Lipa)
                  </span>
                  <br />
                  Bright, punchy kick dominates the low end, with a deeper,
                  steadier bass supporting it.
                  <br />
                  <a
                    href="https://www.youtube.com/watch?v=DkeiKbqa02g"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-300 underline-offset-2 hover:underline"
                  >
                    Watch on YouTube
                  </a>
                </li>
                <li>
                  <span className="font-medium">Avicii — “Levels”</span>
                  <br />
                  Kick is the main source of low-end punch, bass stays slightly
                  underneath.
                  <br />
                  <a
                    href="https://www.youtube.com/watch?v=_ovdm2yX4MA"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-300 underline-offset-2 hover:underline"
                  >
                    Watch on YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
        );
      case "bassAbove":
        return (
          <div className="space-y-3 text-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              2. Bass Above Kick (Trap / Hip-Hop / Drill / Modern Pop-Rap)
            </p>
            <p>
              Here, the 808 or bass carries the lowest frequencies, often
              extending down to 30–40 Hz. The kick is tuned higher, with more
              midrange punch than sub content. Instead of being the low-end
              anchor, the kick becomes a percussive attack that rides above the
              bass.
            </p>
            <p className="font-semibold">Why it works:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Modern trap 808s are huge, long, and expressive</li>
              <li>Lets the bass dominate the low-end identity</li>
              <li>Kick finds clarity without needing massive subs</li>
              <li>Great for spacious, vocal-forward mixes</li>
            </ul>
            <p className="font-semibold">Common traits:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Bass/sub occupies 30–60 Hz</li>
              <li>Kick peaks around 80–120 Hz</li>
              <li>Relationship shaped by distortion &amp; transient design</li>
            </ul>
            <p>
              This is why 808 slides and melodic subs shine in hip-hop — the
              kick isn’t competing.
            </p>
            <div className="mt-3 space-y-2 text-xs">
              <p className="font-semibold">Reference tracks:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  <span className="font-medium">21 Savage — “a lot”</span>
                  <br />
                  Warm, deep 808 filling the 30–60 Hz range with a sharp,
                  midrange-focused kick above it.
                  <br />
                  <a
                    href="https://www.youtube.com/watch?v=DmWWqogr_r8"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-300 underline-offset-2 hover:underline"
                  >
                    Watch on YouTube
                  </a>
                </li>
                <li>
                  <span className="font-medium">Future — “Mask Off”</span>
                  <br />
                  Subby, round 808 dominates 30–50 Hz while the kick is lightly
                  layered and non-competitive.
                  <br />
                  <a
                    href="https://www.youtube.com/watch?v=xvZqHgFz51I"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-300 underline-offset-2 hover:underline"
                  >
                    Watch on YouTube
                  </a>
                </li>
                <li>
                  <span className="font-medium">Pop Smoke — “Dior”</span>
                  <br />
                  Deep, sustained drill 808 slides with a punchy midrange kick
                  ticking above them.
                  <br />
                  <a
                    href="https://www.youtube.com/watch?v=oorVWW9ywG0"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-300 underline-offset-2 hover:underline"
                  >
                    Watch on YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
        );
      case "shared":
        return (
          <div className="space-y-3 text-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              3. Shared Space (R&amp;B / Alt-Pop / Indietronica / Neo-Soul)
            </p>
            <p>
              In this hybrid approach, the kick and bass both occupy parts of
              the same frequency range, but they’re shaped carefully so they
              don’t collide. They may overlap in the subs, but with contrast in
              tone, rhythm, or sidechain movement.
            </p>
            <p className="font-semibold">Why it works:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Creates warm, rounded, emotional mixes</li>
              <li>More fluid, “glued” low end</li>
              <li>Natural feel compared to hyper-separated genres</li>
              <li>Great when you want smooth, soulful low end</li>
            </ul>
            <p className="font-semibold">Common traits:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Kick and bass share the 50–80 Hz region</li>
              <li>Separation comes from envelope &amp; tone, not pitch</li>
              <li>
                Often uses gentle sidechain, saturation, or soft clipping for
                control
              </li>
            </ul>
            <p>
              This is a more musical, organic vibe — the low end feels blended
              and intimate.
            </p>
            <div className="mt-3 space-y-2 text-xs">
              <p className="font-semibold">Reference tracks:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  <span className="font-medium">Steve Lacy — “Bad Habit”</span>
                  <br />
                  Bass guitar and kick overlap naturally in the lows, but the
                  character difference keeps them clear.
                  <br />
                  <a
                    href="https://www.youtube.com/watch?v=VF-FGf_ZZiI"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-300 underline-offset-2 hover:underline"
                  >
                    Watch on YouTube
                  </a>
                </li>
                <li>
                  <span className="font-medium">
                    Khalid — “Talk” (prod. Disclosure)
                  </span>
                  <br />
                  Kick and bass share the 50–80 Hz region smoothly with
                  separation coming from tone and envelope.
                  <br />
                  <a
                    href="https://www.youtube.com/watch?v=Y1QZOprK7PQ"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-300 underline-offset-2 hover:underline"
                  >
                    Watch on YouTube
                  </a>
                </li>
                <li>
                  <span className="font-medium">
                    Snoh Aalegra — “I Want You Around”
                  </span>
                  <br />
                  Bass and kick live in the same warm low-end bed, blending
                  smoothly without conflict.
                  <br />
                  <a
                    href="https://www.youtube.com/watch?v=4976Fgvf5Ps"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-300 underline-offset-2 hover:underline"
                  >
                    Watch on YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <article className="space-y-10 text-sm text-slate-200">
        {/* HERO */}
        <section id="intro-low-end" className="space-y-6 scroll-mt-24">
          <header className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-black/80 shadow-lg shadow-black/40">
            <div className="absolute inset-0">
              <Image
                src="/assets/music-production/low-end/images/low-end-bkgrnd.jpg"
                alt="Studio with subwoofers and bass instruments"
                fill
                priority
                className="object-cover brightness-[0.4]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/45" />
            </div>

            <div className="relative z-10 space-y-8 p-6 sm:p-8 md:p-12">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-3">
                  <p className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
                    Chapter 5
                  </p>
                  <h1 className="text-3xl font-semibold tracking-tight text-emerald-50 sm:text-4xl">
                    Low End Theory: Bass, Subs, 808s &amp; Foundation
                  </h1>
                  <p className="max-w-2xl text-sm text-emerald-50/90 sm:text-base">
                    Bass, subs, 808s, movement, weight, and the foundation of modern production.
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-50 md:max-w-xs">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    Big Idea
                  </p>
                  <p className="mt-2">
                    The low end is the emotional and physical foundation of modern tracks. Get it right and everything else locks into place.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 md:items-start">
                <aside className="rounded-2xl border border-slate-800/80 bg-black/70 p-4 backdrop-blur">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Chapter Map
                  </p>
                  <p className="mt-2 text-[12px] text-slate-300">
                    Jump to any major section.
                  </p>
                  <ol className="mt-3 space-y-1.5 text-left">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button
                          type="button"
                          onClick={() => scrollToSection(section.id)}
                          className="hover:text-emerald-300"
                        >
                          {section.label}
                        </button>
                      </li>
                    ))}
                  </ol>
                </aside>

                <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-xs text-slate-200 backdrop-blur">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    You&apos;ll Learn
                  </p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    <ul className="ml-4 list-disc space-y-1">
                      <li>Sub frequencies &amp; harmonics</li>
                      <li>808s as bass instruments</li>
                      <li>Bass sound selection</li>
                      <li>Kick / bass relationship</li>
                      <li>Layering &amp; tuning</li>
                    </ul>
                    <ul className="ml-4 list-disc space-y-1">
                      <li>Sidechaining &amp; movement</li>
                      <li>Low-end arrangement</li>
                      <li>Dynamics &amp; control</li>
                      <li>How to build the low end of your project track</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* INTRO */}
          <section className="grid gap-6 md:grid-cols-[minmax(0,1.6fr),minmax(0,1fr)] md:items-start">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-emerald-50">
                1. Introduction: Why the Low End Matters
              </h2>
              <p>
                In modern music, the low end is not just another element — it’s
                the emotional and physical foundation of the entire track. The
                low end is the part of the song you feel in your chest, your
                spine, the floor beneath your feet. It shapes energy, movement,
                and intensity. A great melody can get a listener’s attention,
                but the low end is what makes the track hit.
              </p>
              <p>
                Bass and drums form what producers call <span>the engine.</span> It’s the driving force of the arrangement. If your low end is
                weak, unfocused, or muddy, the entire track collapses. A
                beautiful chord progression won’t save it. A perfect hook won’t
                save it. But once your low end is solid, cohesive, and
                intentional, your entire track suddenly sounds professional.
              </p>
              <p>The truth is, low end is notoriously hard to master:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Most speakers can&apos;t reproduce it accurately</li>
                <li>Rooms distort bass frequencies</li>
                <li>Small changes have huge consequences</li>
                <li>The ear perceives bass differently than mids or highs</li>
              </ul>
              <p>
                This chapter breaks it all down in a clear and approachable way.
              </p>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <button
                type="button"
                onClick={() =>
                  handleZoom(
                    "/assets/music-production/low-end/images/low-end.jpg",
                    "Producer working with subwoofers and bass instruments"
                  )
                }
                className="block w-full"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/assets/music-production/low-end/images/low-end.jpg"
                    alt="Producer dialing in low-end on studio monitors"
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
              </button>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                The low end is both the emotional and physical foundation of
                your track.
              </figcaption>
            </figure>
          </section>
        </section>

        {/* 2. UNDERSTANDING LOW FREQUENCIES */}
        <section
          id="understanding-low-frequencies"
          className="space-y-6 scroll-mt-24 rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6"
        >
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 2
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              2. Understanding Low Frequencies
            </h2>
          </header>

          <p>
            Before diving into 808s, subs, or basslines, it’s important to
            understand the actual frequency ranges you&apos;re working with. The
            low end is divided into distinct zones, each with its own emotional
            and sonic purpose.
          </p>

          {/* 2.1 */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              2.1 What Lives in the Low End
            </h3>
            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <button
                type="button"
                onClick={() =>
                  handleZoom(
                    "/assets/music-production/low-end/diagrams/bass-ranges.jpg",
                    "Diagram of bass and low-end frequency ranges"
                  )
                }
                className="block w-full"
              >
                <div className="relative w-full">
                  <img
                    src="/assets/music-production/low-end/diagrams/bass-ranges.jpg"
                    alt="Bass frequency ranges"
                    className="h-auto w-full rounded-xl object-contain"
                  />
                </div>
              </button>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Diagram of low-end zones — subs, bass, and low mids.
              </figcaption>
            </figure>
          </section>

          {/* 2.2 */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              2.2 Why Low End Is Hard
            </h3>
            <p>
              The difficulty of bass frequencies isn’t tied to experience — it’s
              difficult because physics and human perception work against you.
              Sub frequencies behave very differently from mids and highs. In
              small or untreated rooms, low frequencies bounce between walls and
              create standing waves, meaning certain bass notes get way louder
              while others disappear completely depending on your position in
              the room.
            </p>
            <p>
              Move your head 12 inches and the low end can change dramatically —
              that’s how sensitive these wavelengths are. Those reflections
              cause phase interactions: sometimes frequencies reinforce each
              other (boominess), sometimes they cancel out (hollow or missing
              bass), and sometimes they smear together, making it hard to tell
              what’s actually happening in your mix.
            </p>
            <p>
              Add psychoacoustics — the brain’s tendency to “fill in” bass that
              isn’t really there — and it becomes even harder to judge low end
              accurately on a single system.
            </p>
            <p>
              The good news? You can learn to mix the low end accurately. It
              comes with experience, room treatment, monitoring upgrades, and
              most importantly, cross-referencing your work on multiple systems.
              The car is one of the most reliable reality checks because (A)
              most people still listen to music in the car, and (B) car cabins
              exaggerate and compress low end in predictable ways.
            </p>
            <p>
              Many producers export the mix to their phone, drive around with it
              for a week, and let the car expose what the studio hid. Don’t
              worry if your room isn’t perfect yet. Use it as one reference
              point, not the only one.
            </p>
            <p>
              With time, treatment, familiar listening environments, and
              consistent referencing, you’ll develop a sense for what “true low
              end” actually feels like.
            </p>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <button
                type="button"
                onClick={() =>
                  handleZoom(
                    "/assets/music-production/low-end/diagrams/listening-habits.jpg",
                    "Producer listening on multiple playback systems"
                  )
                }
                className="block w-full"
              >
                <div className="relative w-full">
                  <img
                    src="/assets/music-production/low-end/diagrams/listening-habits.jpg"
                    alt="Different listening environments"
                    className="h-auto w-full rounded-xl object-cover"
                  />
                </div>
              </button>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Cross-check your low end on multiple systems: car, headphones,
                monitors, Bluetooth, and phone speakers.
              </figcaption>
            </figure>
          </section>

          {/* 2.3 */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              2.3 Feeling the Low End
            </h3>
            <p>
              Low end must be felt, not just heard. Always check your track on:
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Car speakers</li>
              <li>Headphones</li>
              <li>Studio monitors</li>
              <li>Bluetooth speakers</li>
              <li>Phone speakers</li>
            </ul>
            <p>Learn how your bass translates in different environments.</p>
          </section>
        </section>

        {/* 3. TYPES OF LOW-END INSTRUMENTS */}
        <section
          id="types-of-low-end"
          className="space-y-6 scroll-mt-24 rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6"
        >
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 3
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              3. Types of Low-End Instruments
            </h2>
          </header>

          <p>
            Modern producers work with a wide spectrum of bass tools, each
            offering different textures, strengths, and emotional effects.
          </p>

          <div className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Interactive • Low-End Instrument Explorer
            </p>
            <p className="text-xs text-slate-300">
              Click a card to hear an example. You&apos;ll hear how different
              low-end instruments change the feel of a track.
            </p>

            {/* Cards: 3 on the first row, 2 centered on the second row */}
            <div className="mt-3 space-y-3">
              {/* Top row: 3 cards */}
              <div className="flex flex-wrap justify-center gap-4">
                {instrumentCards.slice(0, 3).map((card) => (
                  <div
                    key={card.id}
                    className={`flex min-w-[210px] max-w-[230px] flex-col rounded-2xl border p-3 text-xs transition ${
                      activeInstrument === card.id
                        ? "border-emerald-400/70 bg-emerald-500/10"
                        : "border-slate-800/80 bg-black/70 hover:border-emerald-500/40"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handlePlaySample(card.id)}
                      className="flex flex-col gap-2 text-left"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                        <Image
                          src={card.imgSrc}
                          alt={card.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-200">
                        {card.title}
                      </p>
                      <p className="text-[11px] text-slate-300">
                        {card.description}
                      </p>
                    <span className="mt-1 inline-flex items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-200">
                      {activeInstrument === card.id
                        ? "Stop Sample"
                        : "Play Sample"}
                    </span>
                  </button>
                  <audio
                    id={`low-end-audio-${card.id}`}
                    src={card.sampleSrc}
                    className="sr-only"
                    preload="none"
                    controls
                    onEnded={() => setActiveInstrument(null)}
                  />
                  <a
                    href={card.sampleSrc}
                    className="mt-2 text-[11px] font-semibold text-emerald-200 underline-offset-4 hover:underline"
                    download
                  >
                    Download sample
                  </a>
                </div>
              ))}
            </div>

            {/* Bottom row: 2 cards, centered */}
            <div className="flex flex-wrap justify-center gap-4">
                {instrumentCards.slice(3).map((card) => (
                  <div
                    key={card.id}
                    className={`flex min-w-[210px] max-w-[230px] flex-col rounded-2xl border p-3 text-xs transition ${
                      activeInstrument === card.id
                        ? "border-emerald-400/70 bg-emerald-500/10"
                        : "border-slate-800/80 bg-black/70 hover:border-emerald-500/40"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handlePlaySample(card.id)}
                      className="flex flex-col gap-2 text-left"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                        <Image
                          src={card.imgSrc}
                          alt={card.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-200">
                        {card.title}
                      </p>
                      <p className="text-[11px] text-slate-300">
                        {card.description}
                      </p>
                    <span className="mt-1 inline-flex items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-200">
                      {activeInstrument === card.id
                        ? "Stop Sample"
                        : "Play Sample"}
                    </span>
                  </button>
                  <audio
                    id={`low-end-audio-${card.id}`}
                    src={card.sampleSrc}
                    className="sr-only"
                    preload="none"
                    controls
                    onEnded={() => setActiveInstrument(null)}
                  />
                  <a
                    href={card.sampleSrc}
                    className="mt-2 text-[11px] font-semibold text-emerald-200 underline-offset-4 hover:underline"
                    download
                  >
                    Download sample
                  </a>
                </div>
              ))}
            </div>
          </div>

            <p className="text-[11px] text-slate-400">
              Layered low end combines a sub layer, a mid-bass layer, and a
              harmonic layer so your bass feels huge on big systems and still
              translates on small speakers.
            </p>
          </div>
        </section>

        {/* 4. WRITING BASSLINES */}
        <section
          id="writing-basslines"
          className="space-y-6 scroll-mt-24 rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6"
        >
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 4
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              4. Writing Basslines
            </h2>
          </header>

          <p>
            Basslines play dual roles: harmonic support and rhythmic movement.
            Great basslines feel intentional, musical, and deeply connected to
            the groove.
          </p>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
            <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Watch • Basslines &amp; Groove
            </div>
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/WlITtBMC8lc"
                className="h-full w-full rounded-b-2xl"
                title="Writing basslines"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              4.1 Supporting the Chord Progression
            </h3>
            <p>Bass generally emphasizes:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Root notes</li>
              <li>Fifths</li>
              <li>Octaves</li>
              <li>Passing tones</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              4.2 Bass Movement in the Verse
            </h3>
            <p>Verses usually stay simple:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Sustained notes</li>
              <li>Sparse rhythms</li>
              <li>Quieter dynamics</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              4.3 Bass Movement in the Hook
            </h3>
            <p>Hooks expand:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>More active rhythms</li>
              <li>Slightly brighter tone</li>
              <li>More energy and presence</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              4.4 Bass + Groove
            </h3>
            <p>The bass should mirror or complement the drums by:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Locking with the kick</li>
              <li>Syncopating against the kick</li>
              <li>Creating tension and release through movement</li>
            </ul>
          </section>
        </section>

        {/* 5. KICK + BASS RELATIONSHIP */}
        <section
          id="kick-bass-relationship"
          className="space-y-6 scroll-mt-24 rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6"
        >
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 5
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              5. Kick + Bass Relationship
            </h2>
          </header>

          <p>
            The relationship between your kick and bass is the single most
            important factor in achieving a powerful, clean, modern low end.
            Ninety percent of low-end problems come from these two elements
            fighting for space — rhythmically, tonally, or dynamically. If your
            kick and bass don’t work together, the entire mix collapses; but
            when they lock, everything suddenly becomes punchy, solid, and
            professional.
          </p>
          <p>
            This section breaks down exactly how to make your kick and bass
            coexist, cooperate, and support each other across genres.
          </p>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
            <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Watch • Kick &amp; Bass Relationship
            </div>
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/uQ0Sgy0Bikc"
                className="h-full w-full rounded-b-2xl"
                title="Kick and bass relationship"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* 5.1 three approaches with clickable cards */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-100">
              5.1 The Three Classic Low-End Approaches
            </h3>
            <p>
              Every genre handles the relationship between the kick and bass
              differently. Even though both instruments live in the low end,
              they don’t need to compete — they need to cooperate. Most modern
              music follows one of three proven strategies:
            </p>

            <div className="flex flex-wrap gap-3">
              {(
                [
                  ["kickAbove", "Kick Above Bass (EDM / Pop / House)"],
                  ["bassAbove", "Bass Above Kick (Trap / Hip-Hop)"],
                  ["shared", "Shared Space (R&B / Neo-Soul)"],
                ] as [ApproachKey, string][]
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveApproach(key)}
                  className={`flex-1 min-w-[180px] rounded-2xl border px-3 py-2 text-left text-xs transition ${
                    activeApproach === key
                      ? "border-emerald-400/70 bg-emerald-500/10 text-emerald-50"
                      : "border-slate-800/80 bg-slate-950/80 text-slate-200 hover:border-emerald-400/60"
                  }`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                    {approachLabels[key]}
                  </p>
                  <p className="mt-1 text-[11px] opacity-80">{label}</p>
                </button>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-[minmax(0,1.5fr),minmax(0,1fr)] md:items-start">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
                {renderApproachContent()}
              </div>

              <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={
                      activeApproach === "kickAbove"
                        ? "/assets/music-production/low-end/images/edm.jpg"
                        : activeApproach === "bassAbove"
                        ? "/assets/music-production/low-end/images/hip-hop.jpg"
                        : "/assets/music-production/low-end/images/layered.jpg"
                    }
                    alt="Low-end style illustration"
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-[11px] text-slate-400">
                  Visualizing how kick and bass share (or divide) the low-end
                  spectrum in different genres.
                </figcaption>
              </figure>
            </div>
          </section>

          {/* 5.2 EQ Carving */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              5.2 EQ Carving
            </h3>
            <p>
              EQ carving is the most direct way to help the kick and bass fit
              together. You identify their “signature frequencies” — where each
              sound hits hardest — and slightly reduce that area on the other
              instrument.
            </p>
            <p className="font-semibold text-xs">Examples:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>
                If the kick peaks around 60–70 Hz, you gently dip that range on
                the bass.
              </li>
              <li>
                If the bass has strong fundamentals at 45–55 Hz, you carve that
                space out of the kick.
              </li>
            </ul>
            <p>
              Small moves (1–3 dB) go a long way. This creates pockets where
              each sound can punch through without masking the other.
            </p>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
              <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Tutorial • EQ Carving
              </div>
              <div className="aspect-video w-full">
                <video
                  className="h-full w-full rounded-b-2xl"
                  controls
                  src="/assets/music-production/low-end/tutorials/eq-carve.mp4"
                />
              </div>
            </div>
          </section>

          {/* 5.3 Envelope Shaping */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              5.3 Envelope Shaping
            </h3>

            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              {/* Text */}
              <div className="flex-1 space-y-2">
                <p>
                  Even if two sounds overlap in frequency, they don’t have to
                  overlap in time. By adjusting the shape of the sound — attack,
                  decay, sustain, release — you can control when each occupies
                  the low end.
                </p>
                <p className="text-xs font-semibold text-emerald-100">
                  Examples:
                </p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>
                    Shorten the kick’s tail so it doesn’t smear into the bass
                    note.
                  </li>
                  <li>
                    Use a softer attack on the bass so it blooms after the kick
                    transient.
                  </li>
                  <li>
                    Use sidechain compression so the bass dips momentarily when
                    the kick hits.
                  </li>
                </ul>
                <p>
                  Changing the timing of the low-end energy is often more
                  powerful than changing the EQ.
                </p>
              </div>

              {/* Image */}
              <figure className="w-full md:w-[340px] lg:w-[380px] rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <div className="relative w-full">
                  <img
                    src="/assets/music-production/low-end/diagrams/adsr.jpg"
                    alt="ADSR envelope diagram"
                    className="h-auto w-full rounded-xl object-contain"
                  />
                </div>
                <figcaption className="mt-2 text-[11px] text-slate-400">
                  ADSR envelope controlling how low-end energy appears over
                  time.
                </figcaption>
              </figure>
            </div>
          </section>

          {/* 5.4 Choosing Complementary Tones */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              5.4 Choosing Complementary Tones
            </h3>

            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              {/* Text */}
              <div className="flex-1 space-y-2">
                <p>
                  Sometimes the easiest fix is selecting sounds that naturally
                  complement each other. Not all kicks and basses want to live
                  in the same mix.
                </p>
                <p className="text-xs font-semibold text-emerald-100">
                  Examples:
                </p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Pair a deep subby bass with a punchy midrange kick.</li>
                  <li>
                    Match a clicky kick with a warm, mellow low-end bass.
                  </li>
                  <li>
                    Avoid layering two sounds that share identical resonance
                    peaks.
                  </li>
                </ul>
                <p>
                  This is why high-level producers audition dozens of kicks and
                  basses — not for volume, but for compatibility. When you
                  choose the right pairing, the mix practically balances itself.
                </p>
              </div>

              {/* Image */}
              <figure className="w-full md:w-[340px] lg:w-[380px] rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <div className="relative w-full">
                  <img
                    src="/assets/music-production/low-end/images/fit-together.jpg"
                    alt="Kick and bass waveforms fitting together"
                    className="h-auto w-full rounded-xl object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-[11px] text-slate-400">
                  Choosing sounds that naturally fit together instead of
                  fighting for the same space.
                </figcaption>
              </figure>
            </div>
          </section>

          {/* 5.5 Sidechain Compression */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              5.5 Sidechain Compression
            </h3>
            <p>Essential modern technique for low-end clarity:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Invisible sidechain (transparent ducking)</li>
              <li>Pumping sidechain (audible groove and bounce)</li>
              <li>Kick-triggered transparency for dense mixes</li>
            </ul>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
              <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Tutorial • Sidechain Techniques
              </div>
              <div className="aspect-video w-full">
                <video
                  className="h-full w-full rounded-b-2xl"
                  controls
                  src="/assets/music-production/low-end/tutorials/side-chain.mp4"
                />
              </div>
            </div>
          </section>
        </section>

        {/* 6. 808 DESIGN & CONTROL */}
        <section
          id="design-808"
          className="space-y-6 scroll-mt-24 rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6"
        >
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 6
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              6. 808 Design &amp; Control
            </h2>
          </header>

          <p>
            808s are no longer just drum machine sounds — in modern music, they
            are bass instruments, melodic instruments, and expressive tools all
            at once. An 808 can glide, growl, whisper, punch, or rumble
            depending on how you design it.
          </p>
          <p>
            This section demystifies how to shape, tune, control, and customize
            808s so they not only hit hard but also sit musically inside your
            track. If you’re working in hip-hop, trap, pop, or modern R&amp;B,
            this skill is essential.
          </p>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
            <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Watch • 808 Basics
            </div>
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/7_CIiNBdEvI"
                className="h-full w-full rounded-b-2xl"
                title="808 design and control"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              6.1 Tuning 808s
            </h3>
            <ul className="ml-4 list-disc space-y-1">
              <li>Always tune your 808s to the key of the song.</li>
              <li>Use analyzers, but trust your ears first.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              6.2 808 Movement
            </h3>
            <p>Movement tools:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Slides</li>
              <li>Rolls</li>
              <li>Glides</li>
              <li>Bends</li>
            </ul>
            <p>
              These techniques turn a static 808 into a melodic, expressive
              instrument.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              6.3 808 Length &amp; Shape
            </h3>
            <p>Envelope shaping controls:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Punch (attack / transient)</li>
              <li>Tail (decay / release)</li>
              <li>Sustain (how long the body of the note holds)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              6.4 Distortion &amp; Harmonics
            </h3>
            <p>Distortion makes 808s audible on small speakers:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Soft / hard clipping</li>
              <li>Tape saturation</li>
              <li>Tube-style drive</li>
              <li>Wavefolding and creative shapers</li>
            </ul>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
              <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Tutorial • 808 Design
              </div>
              <div className="aspect-video w-full">
                <video
                  className="h-full w-full rounded-b-2xl"
                  controls
                  src="/assets/music-production/low-end/tutorials/808.mp4"
                />
              </div>
            </div>
          </section>
        </section>

        {/* 7. BASS SOUND SELECTION */}
        <section
          id="bass-selection"
          className="space-y-6 scroll-mt-24 rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6"
        >
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 7
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              7. Bass Sound Selection
            </h2>
          </header>

          <div className="grid gap-4 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)] md:items-center">
            <div className="space-y-3">
              <p>
                Choosing the right bass sound is just as important as writing
                the right bassline. Tone communicates emotion: a soft sine sub
                feels intimate, a distorted 808 feels aggressive, a warm analog
                bass feels nostalgic.
              </p>
              <p>
                Great producers develop a sense of which low-end textures match
                the song’s mood, the artist’s voice, and the desired energy.
              </p>
              <p>
                In this section, you&apos;ll learn how to choose bass tones that
                serve the song instead of fighting it.
              </p>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative w-full">
                <img
                  src="/assets/music-production/low-end/images/choose.jpg"
                  alt="Choosing between different bass instruments"
                  className="h-auto w-full rounded-xl object-cover"
                />
              </div>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Choosing bass sounds that match the song&apos;s mood and
                energy.
              </figcaption>
            </figure>
          </div>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              7.1 Match Your Production Brief
            </h3>
            <p>Choose bass that fits your:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Mood</li>
              <li>Genre</li>
              <li>Emotional intention</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              7.2 Choosing Sub Sounds
            </h3>
            <ul className="ml-4 list-disc space-y-1">
              <li>Pure sine</li>
              <li>Slightly harmonic sine</li>
              <li>Triangle</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              7.3 Choosing Mid Bass (for Translation)
            </h3>
            <ul className="ml-4 list-disc space-y-1">
              <li>Saw</li>
              <li>Square</li>
              <li>Reese</li>
              <li>Juno-style bass patches</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              7.4 Layering
            </h3>
            <p>When layering multiple bass elements:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Check phase alignment regularly.</li>
              <li>
                Decide which layer owns the subs, which owns the mid-bass, and
                which adds character.
              </li>
            </ul>
          </section>
        </section>

        {/* 8. BASS DYNAMICS & CONTROL */}
        <section
          id="bass-dynamics"
          className="space-y-6 scroll-mt-24 rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6"
        >
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 8
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              8. Bass Dynamics &amp; Low-End Control
            </h2>
          </header>

          <p>
            Even the best bass sound will fall apart without proper dynamic
            control. Bass notes vary in loudness, sub energy shifts
            unpredictably, and room acoustics exaggerate or hide frequencies.
          </p>
          <p>
            Dynamics tools like compression, saturation, and targeted EQ help
            sculpt the low end so it stays stable, powerful, and consistent
            across systems.
          </p>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              8.1 Compression
            </h3>
            <p>Use compression for consistency and control:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Keep bass hits even in level.</li>
              <li>Tame peaks from aggressive playing or 808 transients.</li>
              <li>
                Use slower attacks to preserve punch, faster attacks to tame
                clicks.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              8.2 EQ Techniques
            </h3>
            <ul className="ml-4 list-disc space-y-1">
              <li>High-pass everything else that doesn&apos;t need subs.</li>
              <li>Identify and tame muddy low mids (around 200–400 Hz).</li>
              <li>Remove inaudible sub rumble below the musical range.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              8.3 Saturation
            </h3>
            <p>
              Saturation adds harmonics so bass is audible on phones and small
              speakers:
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Subtle tape or tube drive for warmth.</li>
              <li>Multiband saturation targeting only the lows or low mids.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              8.4 Mono Control
            </h3>
            <p>For tight, focused low end:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Keep bass below ~120 Hz strictly mono.</li>
              <li>
                Use stereo width or chorus on higher harmonics, not the subs.
              </li>
            </ul>
          </section>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
            <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Watch • Controlling the Low End
            </div>
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/O2mzqlaBZbk"
                className="h-full w-full rounded-b-2xl"
                title="Low-end control"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* 9. LOW END IN VERSE VS HOOK */}
        <section
          id="verse-vs-hook"
          className="space-y-6 scroll-mt-24 rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6"
        >
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 9
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              9. Low End in Verse vs Hook
            </h2>
          </header>

          <p>
            Just like drums, vocals, and chords shift between sections, your
            bass must also evolve to shape the emotional contour of the song.
            Verses typically require space, subtlety, and restraint, while hooks
            demand more energy, harmonic weight, and movement.
          </p>
          <p>
            Understanding how to adjust the low end between sections helps
            create the contrast needed for your hook to feel explosive.
          </p>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              9.1 Verse Low End
            </h3>
            <ul className="ml-4 list-disc space-y-1">
              <li>Simple patterns</li>
              <li>Darker tone</li>
              <li>Less motion and fewer fills</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              9.2 Hook Low End
            </h3>
            <ul className="ml-4 list-disc space-y-1">
              <li>More energetic patterns</li>
              <li>Brighter, more present tone</li>
              <li>Additional harmonic content and movement</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              9.3 Transition Techniques
            </h3>
            <ul className="ml-4 list-disc space-y-1">
              <li>Filter ramps into or out of the hook</li>
              <li>Pitch glides into the downbeat</li>
              <li>Dropouts where the bass disappears for impact</li>
            </ul>
          </section>
        </section>

        {/* 10. APPLYING TO PROJECT TRACK */}
        <section className="space-y-6">
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 10
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              10. Applying This to Your Project Track
            </h2>
          </header>

          <p>
            Now it’s time to take everything you’ve learned and apply it to your
            own production. The goal isn’t to create a perfect mix — it’s to
            build a low-end foundation that feels intentional, controlled, and
            aligned with your groove from Chapter 4.
          </p>
          <p>
            In this section, you&apos;ll write your basslines, shape your 808 or
            sub, and dial in the kick/bass relationship that defines the core
            identity of your track.
          </p>

          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-50">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Project Checklist • Low End Foundation
            </p>
            <ul className="mt-2 ml-4 list-disc space-y-1">
              <li>
                Choose your main bass sound (sub, 808, synth, or layered).
              </li>
              <li>Create a verse bassline that supports your chords.</li>
              <li>Create a hook bassline with more motion and energy.</li>
              <li>Tune and shape your 808/sub to the key and groove.</li>
              <li>Dial in sidechain between kick and bass.</li>
              <li>Add harmonics or saturation for translation.</li>
              <li>Align bass rhythm tightly with your drum groove.</li>
            </ul>
          </div>
        </section>

        {/* 11. HOMEWORK: LOW END DEVELOPMENT */}
        <section className="space-y-6">
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 11
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              11. Homework: Low End Development
            </h2>
          </header>

          <p>
            Your homework for this chapter turns theory into action. You’ll
            design the low end for your verse and hook, export your layers, and
            analyze how your choices affect groove, energy, and clarity. This
            assignment sets the foundation for the mixing chapters later in the
            course, where we’ll refine and polish the low end you build here.
          </p>

          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-50">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Homework • Low End Development
            </p>

            <div className="mt-3 space-y-4">
              <div>
                <p className="mb-1 font-semibold text-emerald-100">
                  Deliverables
                </p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>
                    Create your{" "}
                    <span className="font-semibold">verse bassline</span>
                  </li>
                  <li>
                    Create your{" "}
                    <span className="font-semibold">hook bassline</span>
                  </li>
                  <li>
                    Export a{" "}
                    <span className="font-semibold">solo low-end bounce</span>{" "}
                    (kick + bass only)
                  </li>
                  <li>
                    Export a{" "}
                    <span className="font-semibold">full mix bounce</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="mb-1 font-semibold text-emerald-100">
                  Reflection Questions
                </p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>
                    Does your bass stay controlled and consistent across the
                    track?
                  </li>
                  <li>
                    How well does your kick and bass cooperate rhythmically?
                  </li>
                  <li>
                    Does the hook feel bigger, brighter, or more energetic than
                    the verse?
                  </li>
                  <li>
                    Does your low end translate across multiple systems (car,
                    headphones, Bluetooth, phone)?
                  </li>
                  <li>
                    What frequency or envelope adjustments improved the clarity
                    the most?
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </article>

      {/* ZOOM OVERLAY */}
      {zoomedImage && (
        <button
          type="button"
          onClick={closeZoom}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8"
        >
          <div
            className="max-h-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={zoomedImage.src}
              alt={zoomedImage.alt}
              className="max-h-[80vh] w-auto rounded-2xl border border-slate-700 object-contain"
            />
          </div>
        </button>
      )}
    </div>
  );
}
