/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Image from "next/image";

type ZoomedImage = {
  src: string;
  alt: string;
} | null;

type HarmonySoundId = "pads" | "plucks" | "keys" | "gtrs" | "synths";

const harmonySoundCards: {
  id: HarmonySoundId;
  title: string;
  description: string;
  imgSrc: string;
  sampleSrc: string;
}[] = [
  {
    id: "pads",
    title: "Pads",
    description: "Warm, atmospheric, and supportive — perfect for emotional beds.",
    imgSrc: "/assets/music-production/harm-chord/images/pads.jpg",
    sampleSrc: "/assets/music-production/harm-chord/samples/pads.mp3",
  },
  {
    id: "plucks",
    title: "Plucks",
    description: "Add rhythmic energy, sparkle, and modern pop texture.",
    imgSrc: "/assets/music-production/harm-chord/images/plucks.jpg",
    sampleSrc: "/assets/music-production/harm-chord/samples/plucks.mp3",
  },
  {
    id: "keys",
    title: "Keys",
    description:
      "Pianos, Rhodes, and Wurlies — timeless harmonic tools for almost any genre.",
    imgSrc: "/assets/music-production/harm-chord/images/keys.jpg",
    sampleSrc: "/assets/music-production/harm-chord/samples/keys.mp3",
  },
  {
    id: "gtrs",
    title: "Guitars",
    description: "Organic warmth and storytelling texture — strums, arps, and riffs.",
    imgSrc: "/assets/music-production/harm-chord/images/gtrs.jpg",
    sampleSrc: "/assets/music-production/harm-chord/samples/gtrs.mp3",
  },
  {
    id: "synths",
    title: "Synths",
    description:
      "Digital shimmer or analog grit — perfect for defining genre and era.",
    imgSrc: "/assets/music-production/harm-chord/images/synths.jpg",
    sampleSrc: "/assets/music-production/harm-chord/samples/synths.mp3",
  },
];

export default function HarmonyChordsChapter() {
  const [zoomedImage, setZoomedImage] = useState<ZoomedImage>(null);
  const [activeHarmonySound, setActiveHarmonySound] =
    useState<HarmonySoundId | null>(null);

  const handleZoom = (src: string, alt: string) => {
    setZoomedImage({ src, alt });
  };

  const closeZoom = () => setZoomedImage(null);

  const handlePlayHarmonySample = (id: HarmonySoundId) => {
    if (typeof document === "undefined") return;
    const el = document.getElementById(
      `harmony-sound-audio-${id}`
    ) as HTMLAudioElement | null;
    if (!el) return;

    document
      .querySelectorAll<HTMLAudioElement>('[id^="harmony-sound-audio-"]')
      .forEach((audioEl) => {
        if (audioEl !== el) {
          audioEl.pause();
          audioEl.currentTime = 0;
        }
      });

    if (el.paused) {
      void el.play().catch(() => {});
      setActiveHarmonySound(id);
    } else {
      el.pause();
      el.currentTime = 0;
      setActiveHarmonySound(null);
    }
  };

  return (
    <div className="relative">
      <article className="space-y-10 text-sm text-slate-200">
        {/* HERO */}
        <section className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-black/80">
            <div className="relative h-52 w-full sm:h-64 md:h-72">
              <Image
                src="/assets/music-production/harm-chord/images/harm-bkgrnd.jpg"
                alt="Studio with keyboard, guitar, and harmonic instruments"
                fill
                priority
                className="object-cover brightness-[0.45]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/70 to-black/95" />
              <div className="relative z-10 flex h-full flex-col justify-end gap-2 p-5 md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
                  Chapter 6
                </p>
                <h1 className="text-2xl font-semibold text-emerald-50 md:text-3xl">
                  HARMONY &amp; CHORD PROGRESSIONS
                </h1>
                <p className="text-[11px] text-emerald-100/80">
                  The Emotional DNA of Your Song
                </p>
              </div>
            </div>
          </div>

          {/* 1. INTRODUCTION */}
          <section className="grid gap-6 md:grid-cols-[minmax(0,1.6fr),minmax(0,1fr)] md:items-start">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-emerald-50">
                1. Introduction: Harmony as Emotion
              </h2>
              <p>
                Harmony is one of the most powerful tools in modern production.
                Even when drums drive the rhythm and bass moves the energy,
                harmony defines the feeling of the entire track. It sets the
                emotional context for your melody, vocals, and low end — it
                tells the listener how to feel before a single lyric is sung.
              </p>
              <p>
                You don’t need classical training to create harmony. In fact,
                many iconic progressions are simple and repetitive. This chapter
                focuses on the producer’s approach to harmony: clear, practical,
                emotional, and easy to apply immediately.
              </p>
              <p>By the end of this chapter, you will be able to:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Create verse and hook chord progressions</li>
                <li>Use the Nashville Number System (your new best friend)</li>
                <li>Choose chord voicings that sound modern and emotional</li>
                <li>Select the right harmonic sounds for your vision</li>
                <li>Understand how harmony interacts with bass and melody</li>
                <li>Build the emotional foundation your vocals will sit on</li>
              </ul>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <button
                type="button"
                onClick={() =>
                  handleZoom(
                    "/assets/music-production/harm-chord/images/harmony-emotion.jpg",
                    "Producer playing chords to shape emotion"
                  )
                }
                className="block w-full"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/assets/music-production/harm-chord/images/harmony-emotion.jpg"
                    alt="Hands on a keyboard shaping harmony"
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
              </button>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Harmony quietly defines the emotional context before the vocals
                even enter.
              </figcaption>
            </figure>
          </section>
        </section>

        {/* 2. MUSIC THEORY CHEAT CODES */}
        <section className="space-y-6">
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 2
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              2. Music Theory Cheat Codes (Producer Edition)
            </h2>
          </header>

          <p>
            Music theory can feel intimidating, but producers don’t need to know
            everything. You only need a handful of concepts that unlock
            practical results. These are the “cheat codes” you’ll use in every
            session for the rest of your life.
          </p>

          {/* 2.1 What is a chord? */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-100">
              2.1 What Is a Chord?
            </h3>
            <div className="grid gap-4 md:grid-cols-[minmax(0,1.5fr),minmax(0,1fr)] md:items-center">
              <div className="space-y-2">
                <p>
                  A chord is a group of notes played at the same time. Most
                  modern chords fall into two categories:
                </p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Triads (root + 3rd + 5th)</li>
                  <li>Seventh chords (root + 3rd + 5th + 7th)</li>
                </ul>
                <p>
                  This is the foundation of pop, hip-hop, indie, R&amp;B, and
                  EDM harmony.
                </p>
              </div>
              <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <button
                  type="button"
                  onClick={() =>
                    handleZoom(
                      "/assets/music-production/harm-chord/diagrams/chord-types.jpg",
                      "Diagram of triads and seventh chords"
                    )
                  }
                  className="block w-full"
                >
                  <div className="relative w-full">
                    <img
                      src="/assets/music-production/harm-chord/diagrams/chord-types.jpg"
                      alt="Triads and seventh chord types"
                      className="h-auto w-full rounded-xl object-contain"
                    />
                  </div>
                </button>
                <figcaption className="mt-2 text-[11px] text-slate-400">
                  Basic chord types you&apos;ll see in nearly every modern
                  genre.
                </figcaption>
              </figure>
            </div>
          </section>

          {/* 2.2 Scale & Key */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              2.2 The Scale &amp; Key (Super Simple Version)
            </h3>
            <p>
              A <span className="font-semibold">scale</span> is a set of notes
              that sound good together. A{" "}
              <span className="font-semibold">key</span> is your song’s “home
              base.”
            </p>
            <p>Two primary flavors:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Major — bright, uplifting, confident</li>
              <li>Minor — emotional, introspective, dark</li>
            </ul>
            <p>
              You don’t need to memorize every interval. Just know: your chords
              are built from the notes in your scale.
            </p>
          </section>

          {/* 2.3 Nashville Number System */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-100">
              2.3 The Nashville Number System (Your New Best Friend)
            </h3>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
              <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Watch • Nashville Number System
              </div>
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/2vL5MIudgBQ"
                  className="h-full w-full rounded-b-2xl"
                  title="Nashville Number System"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <p>
              The Nashville Number System is one of the most useful shortcuts in
              modern songwriting and production. Instead of memorizing dozens of
              chord names in different keys, you learn{" "}
              <span className="font-semibold">one pattern</span> and apply it
              anywhere.
            </p>
            <p>Each note of the scale gets a number:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>1</li>
              <li>2m</li>
              <li>3m</li>
              <li>4</li>
              <li>5</li>
              <li>6m</li>
              <li>7° (rarely used in pop)</li>
            </ul>
            <p>
              This system is powerful because it stays the same in every key.
              The numbers describe relationships — not specific notes.
            </p>
            <p>This makes harmony:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Reusable</li>
              <li>Transposable</li>
              <li>Fast to communicate</li>
              <li>Super easy to modify</li>
              <li>Ideal for collaboration</li>
            </ul>

            <p className="text-xs font-semibold text-emerald-100">
              Example in C Major:
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>1 = C</li>
              <li>2m = Dm</li>
              <li>3m = Em</li>
              <li>4 = F</li>
              <li>5 = G</li>
              <li>6m = Am</li>
            </ul>
            <p>
              So a progression like <span className="font-mono">1 → 5 → 6m → 4</span>{" "}
              becomes:
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>C → G → Am → F (in C major)</li>
              <li>G → D → Em → C (in G major)</li>
              <li>F → C → Dm → Bb (in F major)</li>
            </ul>
            <p>
              Same emotional feel. Different key. Zero confusion. This system is
              used in Nashville sessions, L.A. pop writing rooms, producer
              camps, studio band charts, and even DAW session templates. Once
              you learn this, you unlock thousands of hit progressions
              instantly.
            </p>
          </section>
        </section>

        {/* 3. EMOTIONAL CATEGORIES OF CHORDS */}
        <section className="space-y-6">
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 3
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              3. Emotional Categories of Chords
            </h2>
          </header>

          <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] md:items-center">
            <div className="space-y-2">
              <p>
                Before choosing a progression, it helps to understand the
                emotional character of the chords themselves. Different chords
                carry different feelings — bright, dark, floating, tense,
                smooth, uplifting, or mysterious.
              </p>
              <p>
                By learning the emotional “categories” of chords, you can
                intentionally choose the harmonic mood of your verse, hook, or
                entire song.
              </p>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <button
                type="button"
                onClick={() =>
                  handleZoom(
                    "/assets/music-production/harm-chord/diagrams/chord-feel.jpg",
                    "Emotional qualities of different chord types"
                  )
                }
                className="block w-full"
              >
                <div className="relative w-full">
                  <img
                    src="/assets/music-production/harm-chord/diagrams/chord-feel.jpg"
                    alt="Emotional categories of chords"
                    className="h-auto w-full rounded-xl object-contain"
                  />
                </div>
              </button>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Different chord qualities map to distinct emotional colors.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 4. CREATING CHORD PROGRESSIONS */}
        <section className="space-y-6">
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 4
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              4. Creating Chord Progressions
            </h2>
          </header>

          <p>
            Now that you understand the emotional identity of different chords,
            it’s time to put them together into progressions. This section
            breaks down the most common harmonic patterns in modern music and
            shows you how to shape emotional energy through harmonic rhythm and
            movement.
          </p>

          {/* 4.0 Four chord song video */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
            <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Watch • The Four Chord Song
            </div>
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/iRNYUE9PZRE"
                className="h-full w-full rounded-b-2xl"
                title="The four chord song"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* 4.1 Common progressions */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              4.1 The Four Most Common Modern Progressions
            </h3>
            <p>These four patterns appear everywhere:</p>
            <ul className="ml-4 list-disc space-y-1 font-mono text-[13px]">
              <li>1 → 5 → 6m → 4</li>
              <li>6m → 4 → 1 → 5</li>
              <li>1 → 6m → 4 → 5</li>
              <li>4 → 1 → 5 → 6m</li>
            </ul>
            <p>Why they work:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Predictable emotional flow</li>
              <li>Smooth voice-leading</li>
              <li>Perfect for modern melody writing</li>
              <li>Endlessly reusable across genres</li>
            </ul>
          </section>

          {/* 4.2 Loop-based harmony */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              4.2 Loop-Based Harmony (The Modern Approach)
            </h3>
            <p>Most contemporary songs use 4-bar or 8-bar loops. Repeating progressions give you:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Clarity</li>
              <li>Focus</li>
              <li>Groove</li>
              <li>Emotional stability</li>
            </ul>
            <p>
              If the melody changes and the arrangement evolves, you don’t need
              complex chord patterns.
            </p>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
              <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Tutorial • 4-Bar &amp; 8-Bar Loop Harmony
              </div>
              <div className="aspect-video w-full">
                <video
                  className="h-full w-full rounded-b-2xl"
                  controls
                  src="/assets/music-production/harm-chord/tutorials/4bar-8bar.mp4"
                />
              </div>
            </div>
          </section>

          {/* 4.3 Harmonic rhythm */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              4.3 Harmonic Rhythm
            </h3>
            <p>
              <span className="font-semibold">Harmonic rhythm</span> = how often
              chords change.
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Slow changes = vibe, calm, vibe-driven music</li>
              <li>Fast changes = intensity, lift, drama</li>
            </ul>
            <p>
              Adjust this to shape your verse vs hook energy and how quickly the
              harmony “breathes.”
            </p>
          </section>

          {/* 4.4 Passing chords & walkdowns */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-100">
              4.4 Passing Chords &amp; Walkdowns
            </h3>
            <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] md:items-start">
              <div className="space-y-2">
                <p className="font-semibold text-xs">Passing chords:</p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Quick in-between chords</li>
                  <li>Add sophistication</li>
                  <li>Great in R&amp;B and pop hooks</li>
                </ul>
                <p className="font-semibold text-xs mt-2">Walkdowns:</p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Descending bassline under static chords</li>
                  <li>Creates tension and movement</li>
                </ul>
                <p>Use lightly, and don&apos;t feel overwhelmed!</p>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
                <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Watch • Passing Chords &amp; Walkdowns
                </div>
                <div className="aspect-video w-full">
                  <iframe
                    src="https://www.youtube.com/embed/xNkX5u2exSs"
                    className="h-full w-full rounded-b-2xl"
                    title="Passing chords and walkdowns"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* 5. VERSE vs HOOK PROGRESSIONS */}
        <section className="space-y-6">
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 5
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              5. Verse Progressions vs Hook Progressions
            </h2>
          </header>

          <div className="grid gap-4 md:grid-cols-[minmax(0,1.5fr),minmax(0,1fr)] md:items-start">
            <div className="space-y-3">
              <p>
                Verses and hooks serve different emotional purposes, so their
                harmonic structure often differs. Verses create space and
                support storytelling, while hooks bring lift and emotional
                payoff.
              </p>
              <p>
                This section shows how to use harmonic contrast to create
                impactful song sections.
              </p>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <button
                type="button"
                onClick={() =>
                  handleZoom(
                    "/assets/music-production/harm-chord/images/writer.jpg",
                    "Songwriter working out chords and lyrics"
                  )
                }
                className="block w-full"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/assets/music-production/harm-chord/images/writer.jpg"
                    alt="Songwriter with guitar and notebook"
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
              </button>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Verses, pre-chorus, and hooks each carry different harmonic
                responsibilities.
              </figcaption>
            </figure>
          </div>

          {/* 4 cards: verse / hook / pre-chorus / contrast */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300 mb-2">
                Verse Progressions
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs">
                <li>Simple</li>
                <li>Open</li>
                <li>Less tension</li>
                <li>Leave room for rhythm &amp; vocals</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300 mb-2">
                Hook Progressions
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs">
                <li>Bigger</li>
                <li>Brighter</li>
                <li>More harmonic motion</li>
                <li>Elevated emotion</li>
              </ul>
              <p className="mt-2 text-[11px] text-slate-300">
                Use extended or suspended chords to add sparkle.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300 mb-2">
                Pre-Chorus Progressions
              </p>
              <p className="text-[11px] text-slate-300">
                Used to build tension into the hook. Common tricks:
              </p>
              <ul className="ml-4 mt-1 list-disc space-y-1 text-xs">
                <li>Start on vi for emotional pull</li>
                <li>Start on ii for lift</li>
                <li>Use descending bass</li>
                <li>Add rhythmic pickups</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300 mb-2">
                Harmonic Contrast Techniques
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs">
                <li>Add or remove one chord</li>
                <li>Shift harmonic rhythm</li>
                <li>Use more open voicings in the hook</li>
                <li>Change the first or last chord</li>
                <li>Add suspended or extended tones</li>
              </ul>
              <p className="mt-2 text-[11px] text-slate-300">
                Small differences → huge emotional impact.
              </p>
            </div>
          </div>

          {/* Tutorial breakdown */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
            <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Tutorial • Song Section Harmonic Breakdown
            </div>
            <div className="aspect-video w-full">
              <video
                className="h-full w-full rounded-b-2xl"
                controls
                src="/assets/music-production/harm-chord/tutorials/break-down.mp4"
              />
            </div>
          </div>
        </section>

        {/* 6. CHORD VOICINGS, SPREAD & TEXTURE */}
        <section className="space-y-6">
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 6
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              6. Chord Voicings, Spread &amp; Texture
            </h2>
          </header>

          <p>
            Even simple chords can sound rich when voiced creatively. Voicing
            determines the spacing, inversion, and arrangement of notes within a
            chord — and this dramatically changes the emotional feel. This
            section teaches you how to give your chords width, depth, and modern
            emotional color.
          </p>

          {/* 6.1 Inversions */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              6.1 Inversions for Smooth Movement
            </h3>
            <p>
              Use inversions to avoid big jumps between chords. Smooth
              voice-leading keeps everything feeling connected and emotionally
              clear instead of jumpy or disjointed.
            </p>
          </section>

          {/* 6.2 Open voicings */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-100">
              6.2 Open Voicings for Cinematic Pop
            </h3>
            <p>
              Spread notes across octaves for width, modern polish, and
              atmospheric emotion. Open voicings push your chords toward
              cinematic pop, indie, and big modern productions.
            </p>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
              <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Watch • Open Voicings
              </div>
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/NL2FUEPcST0"
                  className="h-full w-full rounded-b-2xl"
                  title="Open chord voicings"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </section>

          {/* 6.3 Add9 & Add11 */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-100">
              6.3 Add9 &amp; Add11 Chord Tricks
            </h3>
            <p>One added note can transform a basic triad.</p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300 mb-2">
                  Add9
                </p>
                <p className="text-xs">
                  Pretty, dreamy, and emotional. Great for pop, R&amp;B, and
                  ambient textures.
                </p>
                <div className="mt-3 aspect-video w-full">
                  <iframe
                    src="https://www.youtube.com/embed/n7wxfmMjFmU"
                    className="h-full w-full rounded-xl"
                    title="Add9 chord tricks"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300 mb-2">
                  Add11
                </p>
                <p className="text-xs">
                  Indie, emotional, and modern tension. Perfect for alt-pop and
                  filmic harmony.
                </p>
                <div className="mt-3 aspect-video w-full">
                  <iframe
                    src="https://www.youtube.com/embed/x6E95rUfy8c?start=56"
                    className="h-full w-full rounded-xl"
                    title="Add11 chord tricks"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 6.4 Polychords */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-100">
              6.4 Polychords (Stacked Triads)
            </h3>
            <p>
              Combine two simple shapes to create rich textures. Polychords are
              powerful but should be used sparingly.
            </p>
            <p className="text-xs font-semibold">Examples:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>C major + D major (super bright)</li>
              <li>A minor + G major (emotional)</li>
            </ul>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
              <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Watch • Polychords
              </div>
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/XPEKNPoD1WE"
                  className="h-full w-full rounded-b-2xl"
                  title="Polychords explained"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </section>
        </section>

        {/* 7. SOUND SELECTION FOR HARMONY */}
        <section className="space-y-6">
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 7
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              7. Sound Selection for Harmony
            </h2>
          </header>

          <p>
            Choosing the right harmonic sound is just as important as choosing
            the right chords. Pads, pianos, plucks, guitars, and synths each
            bring their own emotional tone and genre identity.
          </p>

          <div className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Interactive • Harmony Sound Palette
            </p>
            <p className="text-xs text-slate-300">
              Click a card to hear how different harmonic textures change the
              mood of the same progression.
            </p>

<div className="mt-3 flex flex-wrap justify-center gap-4">
  {harmonySoundCards.map((card) => (
    <div
      key={card.id}
      className={`flex w-full max-w-[260px] flex-col rounded-2xl border p-3 text-xs transition ${
        activeHarmonySound === card.id
          ? "border-emerald-400/70 bg-emerald-500/10"
          : "border-slate-800/80 bg-black/70 hover:border-emerald-500/40"
      }`}
    >
      <button
        type="button"
        onClick={() => handlePlayHarmonySample(card.id)}
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
        <p className="text-[11px] text-slate-300">{card.description}</p>
        <span className="mt-1 inline-flex items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-200">
          {activeHarmonySound === card.id ? "Stop Sample" : "Play Sample"}
        </span>
      </button>
      <audio
        id={`harmony-sound-audio-${card.id}`}
        src={card.sampleSrc}
        className="hidden"
      />
    </div>
  ))}
</div>

            <p className="text-[11px] text-slate-400">
              The same chord progression can feel nostalgic, aggressive, dreamy,
              or indie — just by changing the harmonic sound source.
            </p>
          </div>
        </section>

        {/* 8. HARMONY + BASS + MELODY */}
        <section className="space-y-6">
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 8
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              8. Harmony + Bass + Melody (Interlocking System)
            </h2>
          </header>

          <div className="grid gap-4 md:grid-cols-[minmax(0,1.5fr),minmax(0,1fr)] md:items-center">
            <div className="space-y-3">
              <p>
                Harmony does not exist in isolation — it interacts with the bass
                and melody to create a cohesive musical picture. Understanding
                this relationship makes arrangements feel tight, emotional, and
                intentional.
              </p>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <button
                type="button"
                onClick={() =>
                  handleZoom(
                    "/assets/music-production/harm-chord/images/interlocking.jpg",
                    "Interlocking relationship between bass, harmony, and melody"
                  )
                }
                className="block w-full"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/assets/music-production/harm-chord/images/interlocking.jpg"
                    alt="Harmony, bass, and melody interlocking"
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
              </button>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Bass, harmony, and melody should interlock like gears — not
                fight for the same space.
              </figcaption>
            </figure>
          </div>

          {/* 8.1 */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              8.1 Leave Space for Melody
            </h3>
            <p>
              Melody and harmony should feel like partners, not competitors.
              When the melody is busy — lots of movement, fast rhythms, or wide
              intervals — the harmony underneath needs to stay simple so the ear
              has a clear focal point.
            </p>
            <p>
              When the melody is sparse, the harmony can carry more of the
              emotional motion with richer chords, extensions, or more active
              rhythmic patterns. Great producers think in terms of balance: one
              element leads, the other supports.
            </p>
            <p>
              Too much motion in both creates clutter; too little leaves the
              track feeling empty.
            </p>
          </section>

          {/* 8.2 */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-100">
              8.2 Bass Shapes the Chords
            </h3>
            <p>
              The bass note doesn’t just support the chord — it often defines
              how the chord is interpreted. Changing the bass note can
              completely shift the emotional meaning of the same chord tones.
            </p>
            <p>
              Now that you have some chords over your bassline, consider
              adjusting the bass note.
            </p>
            <p className="text-xs font-semibold">Examples:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>
                C over Am → C major (even though the upper notes spell Am, your
                ear hears C as the root)
              </li>
              <li>
                A over F → Fmaj7 (a simple inversion becomes a lush, emotional
                voicing)
              </li>
            </ul>
            <p>
              Producers use this intentionally to add depth, movement, or
              tension without changing the chord shapes in the upper layers. The
              bass note quietly dictates the chord’s function — and therefore
              the mood.
            </p>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
              <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Watch • How Bass Reframes Harmony
              </div>
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/bjWlXFmcmlw"
                  className="h-full w-full rounded-b-2xl"
                  title="Bass shaping chord function"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </section>

          {/* 8.3 */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              8.3 Harmonic Layers
            </h3>
            <p>
              Professional arrangements rarely rely on a single chord source.
              Instead, they build harmony through layering, where each layer has
              a specific role:
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>
                <span className="font-semibold">Primary layer</span> — the main
                chord instrument (keys, synths, guitar, pads).
              </li>
              <li>
                <span className="font-semibold">Secondary color</span> — elements
                that add rhythmic or tonal interest, like plucks, arps, or
                guitar lines.
              </li>
              <li>
                <span className="font-semibold">Ambient glue</span> — textures,
                reversed pads, filtered noise, or subtle sound design that fills
                space without drawing attention.
              </li>
            </ul>
            <p>
              The goal is depth, not density. Layers should enhance the harmonic
              picture while maintaining clarity. When done well, the listener
              feels the richness without consciously noticing each piece.
            </p>
          </section>
        </section>

        {/* 9. COMMON HARMONIC PROBLEMS */}
        <section className="space-y-6">
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 9
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              9. Common Harmonic Problems (And Solutions)
            </h2>
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="text-xs font-semibold text-emerald-200">
                “My chords sound boring.”
              </p>
              <p className="mt-1 text-[11px] text-slate-300">Try adding:</p>
              <ul className="ml-4 mt-1 list-disc space-y-1 text-xs">
                <li>Add9</li>
                <li>Sus2</li>
                <li>Inversions</li>
                <li>Open voicings</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="text-xs font-semibold text-emerald-200">
                “My hook doesn’t lift.”
              </p>
              <p className="mt-1 text-[11px] text-slate-300">Try:</p>
              <ul className="ml-4 mt-1 list-disc space-y-1 text-xs">
                <li>Changing the first chord of the hook</li>
                <li>Increasing harmonic rhythm</li>
                <li>Adding 7ths or 9ths</li>
                <li>Changing bass movement</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="text-xs font-semibold text-emerald-200">
                “My mix is muddy.”
              </p>
              <p className="mt-1 text-[11px] text-slate-300">Common causes:</p>
              <ul className="ml-4 mt-1 list-disc space-y-1 text-xs">
                <li>Too many low-mid harmonic layers</li>
                <li>Bass competing with chord lows</li>
                <li>Chords voiced too low</li>
              </ul>
              <p className="mt-2 text-[11px] text-slate-300">Fix:</p>
              <ul className="ml-4 mt-1 list-disc space-y-1 text-xs">
                <li>Lift harmony up an octave</li>
                <li>Thin out overlapping layers</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="text-xs font-semibold text-emerald-200">
                “My chords don’t fit my melody.”
              </p>
              <p className="mt-1 text-[11px] text-slate-300">Check:</p>
              <ul className="ml-4 mt-1 list-disc space-y-1 text-xs">
                <li>Are you in the same scale?</li>
                <li>Do melody landing notes match chord tones?</li>
                <li>Does the bass support the harmonic intention?</li>
              </ul>
            </div>
          </div>
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

          <p>Now you’ll build the harmonic foundation of your song.</p>
          <p>This week you will:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Choose your verse chord progression</li>
            <li>Choose your hook progression</li>
            <li>Optionally create a pre-chorus pattern</li>
            <li>Record them into your DAW</li>
            <li>Adjust voicings</li>
            <li>Choose harmonic sound layers</li>
            <li>Lock your bass + harmony relationship</li>
          </ul>

          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-50">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Project Checklist • Harmonic Backbone
            </p>
            <ul className="mt-2 ml-4 list-disc space-y-1">
              <li>Write and record a verse progression in your DAW.</li>
              <li>Write and record a contrasting hook progression.</li>
              <li>Add a pre-chorus pattern if your song needs a lift.</li>
              <li>Refine chord voicings for smooth movement.</li>
              <li>Experiment with at least two different harmonic sound layers.</li>
              <li>Check that bass and harmony feel locked emotionally.</li>
            </ul>
          </div>
        </section>

        {/* 11. HOMEWORK */}
        <section className="space-y-6">
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 11
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              11. Homework: Harmony Development
            </h2>
          </header>

          <p>Due Sunday by midnight.</p>

          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-50">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Homework • Harmony Development
            </p>

            <div className="mt-3 space-y-4">
              <div>
                <p className="mb-1 font-semibold text-emerald-100">
                  Submit the following:
                </p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Verse chord progression</li>
                  <li>Hook chord progression</li>
                  <li>Optional pre-chorus progression</li>
                  <li>MIDI or audio stems for your harmony layers</li>
                </ul>
              </div>

              <div>
                <p className="mb-1 font-semibold text-emerald-100">
                  Short Reflection
                </p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>What emotion were you aiming for?</li>
                  <li>Why did you choose these chords?</li>
                  <li>What changed from verse to hook?</li>
                  <li>
                    How did your harmonic choices support the melody and bass?
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
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 px-4 py-8"
        >
          <div
            className="relative max-h-full w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-full w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={zoomedImage.src}
                alt={zoomedImage.alt}
                className="max-h-[80vh] w-full rounded-2xl object-contain"
              />
            </div>
            <p className="mt-2 text-center text-[11px] text-slate-300">
              {zoomedImage.alt}
            </p>
          </div>
        </button>
      )}
    </div>
  );
}
