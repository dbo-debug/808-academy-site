/* eslint-disable @next/next/no-img-element */
"use client";

// Source content from CHAPTER 4 — DRUM PRODUCTION & GROOVE

import React, { useRef, useState } from "react";
import Image from "next/image";

type ZoomedImage = {
  src: string;
  alt: string;
} | null;

type SubdivisionKey =
  | "whole"
  | "half"
  | "quarter"
  | "eighth"
  | "sixteenth"
  | "quarterTriplet"
  | "dottedQuarter";

type GrooveMode = "quantized" | "humanized";
type VerseHookTab = "verse" | "hook";
type CleanDirtyTab = "clean" | "dirty";

const chapterSections: { id: string; label: string }[] = [
  { id: "introduction", label: "1. Introduction" },
  { id: "understanding-groove", label: "2. Understanding Groove" },
  { id: "essential-drum-components", label: "3. Essential Drum Components" },
  {
    id: "drum-programming-fundamentals",
    label: "4. Drum Programming Fundamentals",
  },
  {
    id: "quantization-swing-humanization",
    label: "5. Quantization, Swing & Humanization",
  },
  { id: "verse-vs-hook-drums", label: "6. Verse vs Hook Drums" },
  { id: "sound-selection", label: "7. Sound Selection" },
  { id: "working-with-drum-loops", label: "8. Working With Drum Loops" },
  {
    id: "drum-arrangement-transitions",
    label: "9. Drum Arrangement & Transitions",
  },
  {
    id: "applying-to-project-track",
    label: "10. Applying This to Your Project Track",
  },
  { id: "homework", label: "11. Homework" },
];

export default function DrumProductionChapter() {
  const [zoomedImage, setZoomedImage] = useState<ZoomedImage>(null);
  const [subdivision, setSubdivision] = useState<SubdivisionKey>("quarter");
  const subdivisionAudioRef = useRef<HTMLAudioElement | null>(null);
  const [grooveMode, setGrooveMode] = useState<GrooveMode>("quantized");
  const [verseHookTab, setVerseHookTab] = useState<VerseHookTab>("verse");
  const [cleanDirtyTab, setCleanDirtyTab] = useState<CleanDirtyTab>("clean");

  // Single audio player for clickable drum-kit regions
  const drumHitPlayerRef = useRef<HTMLAudioElement | null>(null);

  const subdivisionMap: Record<
    SubdivisionKey,
    { label: string; short: string; src: string }
  > = {
    whole: {
      label: "Whole Note",
      short: "1",
      src: "/assets/music-production/drum-production/samples/note-value/whole-note.mp3",
    },
    half: {
      label: "Half Note",
      short: "1/2",
      src: "/assets/music-production/drum-production/samples/note-value/half-note.mp3",
    },
    quarter: {
      label: "Quarter Note",
      short: "1/4",
      src: "/assets/music-production/drum-production/samples/note-value/quarter-note.mp3",
    },
    eighth: {
      label: "Eighth Note",
      short: "1/8",
      src: "/assets/music-production/drum-production/samples/note-value/eighth-note.mp3",
    },
    sixteenth: {
      label: "Sixteenth Note",
      short: "1/16",
      src: "/assets/music-production/drum-production/samples/note-value/sixteenth-note.mp3",
    },
    quarterTriplet: {
      label: "Quarter-Note Triplet",
      short: "♩♩♩",
      src: "/assets/music-production/drum-production/samples/note-value/quarter-triplet.mp3",
    },
    dottedQuarter: {
      label: "Dotted Quarter",
      short: "♩.",
      src: "/assets/music-production/drum-production/samples/note-value/dotted-quarter.mp3",
    },
  };

  const scrollToSection = (id: string) => {
    if (typeof document === "undefined") return;
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubdivisionChange = (key: SubdivisionKey) => {
    setSubdivision(key);
    if (subdivisionAudioRef.current) {
      subdivisionAudioRef.current.currentTime = 0;
      void subdivisionAudioRef.current.play().catch(() => {
        // ignore autoplay errors
      });
    }
  };

  const openZoom = (src: string, alt: string) => {
    setZoomedImage({ src, alt });
  };

  const closeZoom = () => {
    setZoomedImage(null);
  };

  const playDrumHit = (src: string) => {
    try {
      if (drumHitPlayerRef.current) {
        drumHitPlayerRef.current.pause();
      }
      const audio = new Audio(src);
      drumHitPlayerRef.current = audio;
      audio.currentTime = 0;
      void audio.play().catch(() => {
        // ignore gesture / autoplay issues
      });
    } catch {
      // ignore
    }
  };

  const currentSubdivision = subdivisionMap[subdivision];

  return (
    <div className="relative">
      <article className="relative space-y-10 text-sm text-slate-200">
        {/* 1. INTRODUCTION / HERO */}
        <section id="introduction" className="space-y-6 scroll-mt-24">
          {/* HERO: background image with overlaid title */}
          <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-black/80">
            <div className="relative h-52 w-full sm:h-64 md:h-72">
              <Image
                src="/assets/music-production/drum-production/images/drums-bkgrnd.jpg"
                alt="Modern drum kit in a studio"
                fill
                priority
                className="object-cover brightness-[0.4]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/70 to-black/95" />
              <div className="relative z-10 flex h-full flex-col justify-end gap-2 p-5 md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
                  Chapter 4
                </p>
                <h1 className="text-2xl font-semibold text-emerald-50 md:text-3xl">
                  DRUM PRODUCTION: Groove, rhythm &amp; energy
                </h1>
                <p className="text-[11px] text-emerald-100/80">
                  Rhythm, Pocket, Bounce, Feel, and the Engine of Modern Music
                </p>
              </div>
            </div>
          </div>

          {/* Intro text + side image + Big Idea with groove image */}
          <div className="grid gap-6 md:grid-cols-[minmax(0,1.7fr),minmax(0,1.1fr)] md:items-start">
            {/* LEFT: intro + big idea + outcomes */}
            <div className="space-y-4">
              <p>
                Drums are the heartbeat of modern music. Before the melody,
                before the chords, before any vocals are added, the drums often
                establish the emotional center of a track. Whether it’s the
                hypnotic pulse of trap hi-hats, the swagger of a boom-bap
                groove, the driving four-on-the-floor of house, or the loose,
                human swing of neo-soul — the drums define how the listener will
                feel the music in their body.
              </p>

              {/* Big Idea card with groove image beside text */}
              <div className="grid gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-50 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] md:items-center">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    Big Idea • Groove
                  </p>
                  <p className="mt-2">
                    This chapter teaches you one of the most valuable skills in
                    all of production:
                    <br />
                    how to create groove — the invisible force that makes a
                    track move.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    openZoom(
                      "/assets/music-production/drum-production/diagrams/groove.jpg",
                      "Diagram illustrating drum groove and movement"
                    )
                  }
                  className="block"
                >
                  <div className="relative h-28 w-full sm:h-32">
                    <Image
                      src="/assets/music-production/drum-production/diagrams/groove.jpg"
                      alt="Groove diagram"
                      fill
                      className="rounded-xl object-cover"
                    />
                  </div>
                </button>
              </div>

              <p>And here’s the first truth of this chapter:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Many producers start with drums.</li>
              </ul>
              <p>
                Even though we began the class by focusing on verse/hook
                structure, that doesn’t mean drums belong later in the workflow.
                There are no rules. You may find that a kick pattern gives you
                your hook idea, or that a crushed snare riff leads you to your
                verse melody.
              </p>

              <p className="font-semibold">
                By the end of this chapter, you’ll be able to:
              </p>
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-xs">
                <ul className="ml-4 list-disc space-y-1">
                  <li>Build drum patterns from scratch</li>
                  <li>Use quantization, swing, and humanization to shape feel</li>
                  <li>Understand time signatures and subdivisions</li>
                  <li>Create contrasting verse vs hook drum sections</li>
                  <li>Chop and customize loops</li>
                  <li>Add transitions and fills</li>
                  <li>Build the full drum foundation of your project track</li>
                </ul>
              </div>

              <p>Let’s begin with where groove comes from.</p>
            </div>

            {/* RIGHT: stacked images, textbook style */}
            <div className="space-y-4">
              <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3 text-xs">
                <button
                  type="button"
                  onClick={() =>
                    openZoom(
                      "/assets/music-production/drum-production/images/drum-program.jpg",
                      "Producer programming drums in a DAW"
                    )
                  }
                  className="block"
                >
                  <div className="relative h-40 w-full sm:h-48">
                    <Image
                      src="/assets/music-production/drum-production/images/drum-program.jpg"
                      alt="Programming drums in a DAW"
                      fill
                      className="rounded-xl object-cover"
                    />
                  </div>
                </button>
                <figcaption className="mt-2 text-[11px] text-slate-400">
                  Drums act as the emotional engine that drives the rest of the
                  production.
                </figcaption>
              </figure>

              <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3 text-xs">
                <button
                  type="button"
                  onClick={() =>
                    openZoom(
                      "/assets/music-production/drum-production/images/producer-listening.jpg",
                      "Producers listening critically to drums"
                    )
                  }
                  className="block"
                >
                  <div className="relative h-40 w-full sm:h-48">
                    <Image
                      src="/assets/music-production/drum-production/images/producer-listening.jpg"
                      alt="Producers listening to drum grooves"
                      fill
                      className="rounded-xl object-cover"
                    />
                  </div>
                </button>
                <figcaption className="mt-2 text-[11px] text-slate-400">
                  We&apos;ll move from basic patterns to full, expressive
                  grooves.
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Watch: Groove & Drums in Modern Production */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
            <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Watch • Groove &amp; Drums in Modern Production
            </div>
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/TwzJJaJmF6o"
                className="h-full w-full rounded-b-2xl"
                title="Groove & Drums in Modern Production"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Chapter Map */}
        <section className="scroll-mt-24">
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-xs">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Chapter Map
              </p>
              <p className="text-[11px] text-slate-500">
                Jump to any section of this chapter.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {chapterSections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-[11px] font-medium text-slate-100 transition hover:border-emerald-500/60 hover:bg-emerald-500/10"
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 2. UNDERSTANDING GROOVE */}
        <section
          id="understanding-groove"
          className="space-y-6 scroll-mt-24 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-5 md:p-7"
        >
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 2
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              2. Understanding Groove (The Human Element)
            </h2>
          </header>

          <p>
            Groove isn’t just rhythm — it’s emotion. It’s the physical reaction
            music creates: the head nod, the foot tap, the body sway. Groove is
            where music stops being theoretical and becomes alive.
          </p>

          {/* 2.1 Pocket vs Groove vs Bounce */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-100">
              2.1 Pocket vs Groove vs Bounce
            </h3>
            <p>
              These terms are often used interchangeably, but they each have a
              specific meaning:
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              {/* Pocket card */}
              <div className="rounded-2xl border border-slate-800/80 bg-black/60 p-4 text-xs">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Pocket
                </p>
                <p className="mt-2">
                  The relationship between rhythmic elements — how tightly or
                  loosely they “sit together.”
                </p>
                <div className="mt-3 rounded-xl border border-slate-800/80 bg-slate-950/80">
                  <div className="border-b border-slate-800/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Watch • Pocket
                  </div>
                  <div className="aspect-video w-full">
                    <iframe
                      src="https://www.youtube.com/embed/o6Jm3TVVcxg"
                      className="h-full w-full rounded-b-xl"
                      title="Pocket - Groove concept"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>

              {/* Groove card */}
              <div className="rounded-2xl border border-slate-800/80 bg-black/60 p-4 text-xs">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Groove
                </p>
                <p className="mt-2">
                  The repeating rhythmic pattern that defines movement.
                </p>
                <figure className="mt-3 rounded-xl border border-slate-800/80 bg-black/80 p-2">
                  <button
                    type="button"
                    onClick={() =>
                      openZoom(
                        "/assets/music-production/drum-production/images/disco.jpg",
                        "Disco groove on a drum kit"
                      )
                    }
                    className="block w-full"
                  >
                    <div className="relative w-full">
                      <img
                        src="/assets/music-production/drum-production/images/disco.jpg"
                        alt="Disco-style drum groove"
                        className="h-auto w-full rounded-lg object-cover"
                      />
                    </div>
                  </button>
                  <figcaption className="mt-1 text-[11px] text-slate-400">
                    A disco groove is a classic example of a repeating pattern
                    that makes people move.
                  </figcaption>
                </figure>
              </div>

              {/* Bounce card */}
              <div className="rounded-2xl border border-slate-800/80 bg-black/60 p-4 text-xs">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Bounce
                </p>
                <p className="mt-2">
                  The feel created by rhythm + energy + swing + timing.
                </p>
                <ul className="mt-3 ml-4 list-disc space-y-1">
                  <li>A track with pocket feels intentional.</li>
                  <li>A track with groove feels good.</li>
                  <li>A track with bounce feels addictive.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2.2 Simplicity Creates Feel */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-100">
              2.2 Simplicity Creates Feel
            </h3>
            <p>Many iconic drum patterns are shockingly minimal.</p>

            {/* Simplicity examples bubble with embedded videos */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/90 p-4 text-xs">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Simplicity Examples • Minimal Grooves
              </p>
              <p className="mt-2">
                Listen to how little is actually happening in the drums — and
                how strong the feel still is.
              </p>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {/* Seven Nation Army */}
                <div className="rounded-xl border border-slate-800/80 bg-black/80 p-3">
                  <p className="text-[11px] font-semibold text-slate-100">
                    “Seven Nation Army” – The White Stripes
                  </p>
                  <div className="mt-2 aspect-video w-full">
                    <iframe
                      src="https://www.youtube.com/embed/0J2QdDbelmY"
                      className="h-full w-full rounded-lg"
                      title="Seven Nation Army - minimal groove"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-slate-400">
                    Huge feel with a simple, driving pattern.
                  </p>
                </div>

                {/* No Role Modelz */}
                <div className="rounded-xl border border-slate-800/80 bg-black/80 p-3">
                  <p className="text-[11px] font-semibold text-slate-100">
                    “No Role Modelz” – J. Cole
                  </p>
                  <div className="mt-2 aspect-video w-full">
                    <iframe
                      src="https://www.youtube.com/embed/8HBcV0MtAQg"
                      className="h-full w-full rounded-lg"
                      title="No Role Modelz - minimal drums"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-slate-400">
                    Sparse drums leave space for the vocal and bass.
                  </p>
                </div>

                {/* In Da Club */}
                <div className="rounded-xl border border-slate-800/80 bg-black/80 p-3">
                  <p className="text-[11px] font-semibold text-slate-100">
                    “In Da Club” – 50 Cent
                  </p>
                  <div className="mt-2 aspect-video w-full">
                    <iframe
                      src="https://www.youtube.com/embed/5qm8PH4xAss"
                      className="h-full w-full rounded-lg"
                      title="In Da Club - simple groove"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-slate-400">
                    Tight, repetitive groove that feels instantly recognizable.
                  </p>
                </div>

                {/* Royals */}
                <div className="rounded-xl border border-slate-800/80 bg-black/80 p-3">
                  <p className="text-[11px] font-semibold text-slate-100">
                    “Royals” – Lorde
                  </p>
                  <div className="mt-2 aspect-video w-full">
                    <iframe
                      src="https://www.youtube.com/embed/nlcIKh6sBtc"
                      className="h-full w-full rounded-lg"
                      title="Royals - minimalist drums"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-slate-400">
                    Ultra-minimal drums that leave room for vocal attitude.
                  </p>
                </div>
              </div>

              <p className="mt-4">
                Because simplicity leaves space — for melody, vocals, emotion,
                and most importantly, movement.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] md:items-center">
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Listening Like a Producer
                </h4>
                <p>Analyze how grooves work:</p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Are the hats straight or swung?</li>
                  <li>Do the kicks feel early or late?</li>
                  <li>Are velocities varied?</li>
                  <li>Are ghost notes adding movement?</li>
                  <li>Does the groove push forward or sit back?</li>
                </ul>
                <p>
                  This awareness changes everything about your drum programming.
                </p>
              </div>

              <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <button
                  type="button"
                  onClick={() =>
                    openZoom(
                      "/assets/music-production/drum-production/images/critical-listening.jpg",
                      "Producer critically listening to a drum groove"
                    )
                  }
                  className="block w-full"
                >
                  <div className="relative w-full">
                    <img
                      src="/assets/music-production/drum-production/images/critical-listening.jpg"
                      alt="Critical listening to drum grooves"
                      className="h-auto w-full rounded-xl object-cover"
                    />
                  </div>
                </button>
                <figcaption className="mt-2 text-[11px] text-slate-400">
                  Train your ears to notice timing, dynamics, and feel.
                </figcaption>
              </figure>
            </div>
          </section>
        </section>

        {/* 3. ESSENTIAL DRUM COMPONENTS */}
        <section
          id="essential-drum-components"
          className="space-y-6 scroll-mt-24 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-5 md:p-7"
        >
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 3
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              3. Essential Drum Components
            </h2>
          </header>

          <p>
            Before programming, you need to understand the building blocks of
            your drum kit.
          </p>

          {/* Drum Kit Interactive */}
          <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1.1fr)] md:items-center">
            {/* Left: clickable drum kit image */}
            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative w-full overflow-hidden rounded-xl">
                <img
                  src="/assets/music-production/drum-production/images/drum-kit.jpg"
                  alt="Full drum kit"
                  className="h-auto w-full object-cover"
                />

                {/* Clickable hot zones */}
                {/* Crash (top-left cymbal) */}
                <button
                  type="button"
                  title="Crash cymbal — click to hear"
                  onClick={() =>
                    playDrumHit(
                      "/assets/music-production/drum-production/samples/crash.wav"
                    )
                  }
                  className="absolute left-[20%] top-[18%] h-[12%] w-[14%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/40 bg-emerald-400/0 hover:bg-emerald-400/10"
                />

                {/* Ride (top-right cymbal) */}
                <button
                  type="button"
                  title="Ride cymbal — click to hear"
                  onClick={() =>
                    playDrumHit(
                      "/assets/music-production/drum-production/samples/ride.wav"
                    )
                  }
                  className="absolute left-[78%] top-[18%] h-[13%] w-[16%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/40 bg-emerald-400/0 hover:bg-emerald-400/10"
                />

                {/* Hi-hat (far-left cymbal set) */}
                <button
                  type="button"
                  title="Hi-hat — click to hear closed hat"
                  onClick={() =>
                    playDrumHit(
                      "/assets/music-production/drum-production/samples/closed-hat.wav"
                    )
                  }
                  className="absolute left-[10%] top-[42%] h-[11%] w-[12%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/40 bg-emerald-400/0 hover:bg-emerald-400/10"
                />

                {/* Snare (center-left drum) */}
                <button
                  type="button"
                  title="Snare drum — click to hear"
                  onClick={() =>
                    playDrumHit(
                      "/assets/music-production/drum-production/samples/snare.wav"
                    )
                  }
                  className="absolute left-[38%] top-[56%] h-[14%] w-[16%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/40 bg-emerald-400/0 hover:bg-emerald-400/10"
                />

                {/* Kick (front center) */}
                <button
                  type="button"
                  title="Kick drum — click to hear"
                  onClick={() =>
                    playDrumHit(
                      "/assets/music-production/drum-production/samples/kick.wav"
                    )
                  }
                  className="absolute left-[50%] top-[78%] h-[16%] w-[18%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/40 bg-emerald-400/0 hover:bg-emerald-400/10"
                />

                {/* Hi tom */}
                <button
                  type="button"
                  title="Hi tom — click to hear"
                  onClick={() =>
                    playDrumHit(
                      "/assets/music-production/drum-production/samples/hi-tom.wav"
                    )
                  }
                  className="absolute left-[43%] top-[40%] h-[11%] w-[12%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/40 bg-emerald-400/0 hover:bg-emerald-400/10"
                />

                {/* Mid tom */}
                <button
                  type="button"
                  title="Mid tom — click to hear"
                  onClick={() =>
                    playDrumHit(
                      "/assets/music-production/drum-production/samples/mid-tom.wav"
                    )
                  }
                  className="absolute left-[57%] top-[42%] h-[11%] w-[12%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/40 bg-emerald-400/0 hover:bg-emerald-400/10"
                />

                {/* Floor tom */}
                <button
                  type="button"
                  title="Floor tom — click to hear"
                  onClick={() =>
                    playDrumHit(
                      "/assets/music-production/drum-production/samples/floor-tom.wav"
                    )
                  }
                  className="absolute left-[71%] top-[52%] h-[13%] w-[15%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/40 bg-emerald-400/0 hover:bg-emerald-400/10"
                />
              </div>

              <figcaption className="mt-2 text-[11px] text-slate-400">
                Hover to see which drum you&apos;re over (via tooltips), and
                click different parts of the kit to hear each sound — like
                playing drums with your mouse.
              </figcaption>
            </figure>

            {/* Right: description + audio examples grid */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/90 p-4 text-xs">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Interactive • Drum Kit Explorer
              </p>
              <p className="mt-2">
                This kit image is laid out like a real drum set. Each clickable
                zone on the photo is mapped to a drum sound so you can tap
                around and feel how the kit is arranged.
              </p>
              <p className="mt-2 text-[11px] text-slate-400">
                Below are direct audio examples for each core drum. Click play
                on any control to hear its tone in isolation.
              </p>

              <div className="mt-3 grid gap-2 md:grid-cols-2">
                {[
                  {
                    label: "Kick",
                    src: "/assets/music-production/drum-production/samples/kick.wav",
                  },
                  {
                    label: "Snare",
                    src: "/assets/music-production/drum-production/samples/snare.wav",
                  },
                  {
                    label: "Hi-hat (closed)",
                    src: "/assets/music-production/drum-production/samples/closed-hat.wav",
                  },
                  {
                    label: "Hi-hat (open)",
                    src: "/assets/music-production/drum-production/samples/open-hat.wav",
                  },
                  {
                    label: "Hi Tom",
                    src: "/assets/music-production/drum-production/samples/hi-tom.wav",
                  },
                  {
                    label: "Mid Tom",
                    src: "/assets/music-production/drum-production/samples/mid-tom.wav",
                  },
                  {
                    label: "Floor Tom",
                    src: "/assets/music-production/drum-production/samples/floor-tom.wav",
                  },
                  {
                    label: "Ride Cymbal",
                    src: "/assets/music-production/drum-production/samples/ride.wav",
                  },
                  {
                    label: "Crash Cymbal",
                    src: "/assets/music-production/drum-production/samples/crash.wav",
                  },
                ].map((sample) => (
                  <div
                    key={sample.label}
                    className="rounded-xl border border-slate-800/80 bg-black/70 p-2"
                  >
                    <p className="text-[11px] font-semibold text-slate-200">
                      {sample.label}
                    </p>
                    <audio className="mt-1 w-full" controls src={sample.src} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3.1 Kick Drum */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-100">
              3.1 Kick Drum
            </h3>
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="md:w-3/5 space-y-2">
                <p>The kick is the heartbeat:</p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Foundation</li>
                  <li>Weight</li>
                  <li>Drive</li>
                  <li>Emotion</li>
                </ul>
                <p>Kick length and tone shape the entire groove:</p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Long 808 = deep, sustained energy</li>
                  <li>Short punch = tight, aggressive vibe</li>
                </ul>
              </div>
              <figure className="md:w-2/5 rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <button
                  type="button"
                  onClick={() =>
                    openZoom(
                      "/assets/music-production/drum-production/images/kick-drum.jpg",
                      "Close-up of a kick drum"
                    )
                  }
                  className="block w-full"
                >
                  <div className="relative w-full">
                    <img
                      src="/assets/music-production/drum-production/images/kick-drum.jpg"
                      alt="Kick drum close-up"
                      className="h-auto w-full rounded-xl object-cover"
                    />
                  </div>
                </button>
                <figcaption className="mt-2 text-[11px] text-slate-400">
                  The kick anchors both the groove and the low end.
                </figcaption>
              </figure>
            </div>
          </section>

          {/* 3.2 Snare / Clap */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-100">
              3.2 Snare / Clap
            </h3>
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="md:w-3/5 space-y-2">
                <p>
                  The snare creates the backbeat (usually on 2 &amp; 4). Its
                  personality depends on tone:
                </p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Tight = pop / R&amp;B</li>
                  <li>Crunchy = hip-hop</li>
                  <li>Wide = EDM</li>
                  <li>Snappy = trap</li>
                </ul>
                <p>
                  Layering snares and claps is standard for modern production.
                </p>
              </div>
              <figure className="md:w-2/5 rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <button
                  type="button"
                  onClick={() =>
                    openZoom(
                      "/assets/music-production/drum-production/images/snare-drum.jpg",
                      "Snare drum close-up"
                    )
                  }
                  className="block w-full"
                >
                  <div className="relative w-full">
                    <img
                      src="/assets/music-production/drum-production/images/snare-drum.jpg"
                      alt="Snare drum"
                      className="h-auto w-full rounded-xl object-cover"
                    />
                  </div>
                </button>
                <figcaption className="mt-2 text-[11px] text-slate-400">
                  Different snares and claps change the attitude of your
                  backbeat.
                </figcaption>
              </figure>
            </div>
          </section>

          {/* 3.3 Hi-Hats & Percussion */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-100">
              3.3 Hi-Hats &amp; Percussion
            </h3>
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="md:w-3/5 space-y-2">
                <p>Hi-hats define feel:</p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>8ths = driving</li>
                  <li>16ths = energetic</li>
                  <li>Triplets = bouncy</li>
                  <li>Sparse = emotional</li>
                </ul>
                <p>Percussion adds color and motion:</p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Shakers</li>
                  <li>Rims</li>
                  <li>Bongos</li>
                  <li>Blocks</li>
                </ul>
              </div>
              <figure className="md:w-2/5 rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <button
                  type="button"
                  onClick={() =>
                    openZoom(
                      "/assets/music-production/drum-production/images/hi-hat.jpg",
                      "Hi-hat cymbals close-up"
                    )
                  }
                  className="block w-full"
                >
                  <div className="relative w-full">
                    <img
                      src="/assets/music-production/drum-production/images/hi-hat.jpg"
                      alt="Hi-hat cymbals"
                      className="h-auto w-full rounded-xl object-cover"
                    />
                  </div>
                </button>
                <figcaption className="mt-2 text-[11px] text-slate-400">
                  Hat patterns and articulation are a major source of groove.
                </figcaption>
              </figure>
            </div>
          </section>

          {/* 3.4 Cymbals & FX Drums */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-100">
              3.4 Cymbals &amp; FX Drums
            </h3>
            <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] md:items-center">
              <div className="space-y-2">
                <p>Essential for transitions:</p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Crashes</li>
                  <li>Reverse cymbals</li>
                  <li>Risers</li>
                  <li>FX hits</li>
                </ul>
                <p>These elements shape the energy arc between sections.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-2">
                  <button
                    type="button"
                    onClick={() =>
                      openZoom(
                        "/assets/music-production/drum-production/images/crash.jpg",
                        "Crash cymbal close-up"
                      )
                    }
                    className="block w-full"
                  >
                    <div className="relative w-full">
                      <img
                        src="/assets/music-production/drum-production/images/crash.jpg"
                        alt="Crash cymbal"
                        className="h-auto w-full rounded-lg object-cover"
                      />
                    </div>
                  </button>
                  <figcaption className="mt-1 text-[11px] text-slate-400">
                    Crash cymbals punctuate key moments.
                  </figcaption>
                </figure>
                <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-2">
                  <button
                    type="button"
                    onClick={() =>
                      openZoom(
                        "/assets/music-production/drum-production/images/ride.jpg",
                        "Ride cymbal close-up"
                      )
                    }
                    className="block w-full"
                  >
                    <div className="relative w-full">
                      <img
                        src="/assets/music-production/drum-production/images/ride.jpg"
                        alt="Ride cymbal"
                        className="h-auto w-full rounded-lg object-cover"
                      />
                    </div>
                  </button>
                  <figcaption className="mt-1 text-[11px] text-slate-400">
                    Rides can carry timekeeping in certain sections.
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* 3.5 Toms */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-100">
              3.5 Toms (Hi-Tom, Mid-Tom, Floor Tom)
            </h3>
            <div className="space-y-3">
              <p>
                Toms add weight, motion, and drama to your patterns. They’re the
                “storytelling drums” — used for fills, transitions, and adding
                movement across sections.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                  <button
                    type="button"
                    onClick={() =>
                      openZoom(
                        "/assets/music-production/drum-production/images/hi-tom.jpg",
                        "High tom drum"
                      )
                    }
                    className="block w-full"
                  >
                    <div className="relative w-full">
                      <img
                        src="/assets/music-production/drum-production/images/hi-tom.jpg"
                        alt="Hi tom"
                        className="h-auto w-full rounded-xl object-cover"
                      />
                    </div>
                  </button>
                  <figcaption className="mt-2 text-[11px] text-slate-400">
                    Hi-Tom
                  </figcaption>
                </figure>
                <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                  <button
                    type="button"
                    onClick={() =>
                      openZoom(
                        "/assets/music-production/drum-production/images/mid-tom.jpg",
                        "Mid tom drum"
                      )
                    }
                    className="block w-full"
                  >
                    <div className="relative w-full">
                      <img
                        src="/assets/music-production/drum-production/images/mid-tom.jpg"
                        alt="Mid tom"
                        className="h-auto w-full rounded-xl object-cover"
                      />
                    </div>
                  </button>
                  <figcaption className="mt-2 text-[11px] text-slate-400">
                    Mid-Tom
                  </figcaption>
                </figure>
                <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                  <button
                    type="button"
                    onClick={() =>
                      openZoom(
                        "/assets/music-production/drum-production/images/floor-tom.jpg",
                        "Floor tom drum"
                      )
                    }
                    className="block w-full"
                  >
                    <div className="relative w-full">
                      <img
                        src="/assets/music-production/drum-production/images/floor-tom.jpg"
                        alt="Floor tom"
                        className="h-auto w-full rounded-xl object-cover"
                      />
                    </div>
                  </button>
                  <figcaption className="mt-2 text-[11px] text-slate-400">
                    Floor Tom
                  </figcaption>
                </figure>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2 text-xs">
                  <p className="font-semibold">Hi-Tom</p>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>Higher pitch</li>
                    <li>Great for quick fills and call-and-response moments</li>
                    <li>Adds excitement without adding too much low-end</li>
                  </ul>
                </div>
                <div className="space-y-2 text-xs">
                  <p className="font-semibold">Mid-Tom</p>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>The versatile middle ground</li>
                    <li>
                      Works well in rhythmic fills and melodic drum phrases
                    </li>
                    <li>Adds body without overwhelming the mix</li>
                  </ul>
                </div>
                <div className="space-y-2 text-xs">
                  <p className="font-semibold">Floor Tom</p>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>Deep, heavy, cinematic</li>
                    <li>
                      Perfect for tribal rhythms, breakdowns, or building
                      tension
                    </li>
                    <li>Powerful for “tom-walk” pre-chorus builds</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/90 p-4 text-xs">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Production Tips
                </p>
                <ul className="mt-2 ml-4 list-disc space-y-1">
                  <li>
                    Use toms sparingly — they stand out the most when they’re
                    not overused.
                  </li>
                  <li>
                    Pan them to match real-world placement (hi-tom left → mid →
                    floor tom right).
                  </li>
                  <li>
                    Tight compression + short room reverb = modern punch.
                  </li>
                  <li>
                    Long room reverb = cinematic / atmospheric feel.
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </section>

        {/* 4. Drum Programming Fundamentals */}
        <section
          id="drum-programming-fundamentals"
          className="space-y-6 scroll-mt-24 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-5 md:p-7"
        >
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 4
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              4. Drum Programming Fundamentals
            </h2>
          </header>

          <p>
            Before we get into advanced groove techniques, every producer needs
            to know how to build a simple, clean, modern drum beat from scratch.
            This is the blueprint for almost every genre we’ll explore later.
            Whether you’re making trap, pop, R&amp;B, indie, EDM, or anything in
            between, the fundamentals are the same: establish a pulse, define
            the backbeat, add timekeeping, and then build variation. Think of
            this section as laying the concrete foundation—the part of the track
            everything else will sit on.
          </p>

          {/* 4.1 Start Simple */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-100">
              4.1 Start Simple
            </h3>
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="md:w-3/5 space-y-2">
                <p>Build with the “core four”:</p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Kick</li>
                  <li>Snare</li>
                  <li>Hi-hat</li>
                  <li>Percussion (optional)</li>
                </ul>
                <p>Add complexity only after the groove exists.</p>
              </div>
              <figure className="md:w-2/5 rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <button
                  type="button"
                  onClick={() =>
                    openZoom(
                      "/assets/music-production/drum-production/images/kis.jpg",
                      "Keep it simple drum pattern concept"
                    )
                  }
                  className="block w-full"
                >
                  <div className="relative w-full">
                    <img
                      src="/assets/music-production/drum-production/images/kis.jpg"
                      alt="Simple drum pattern concept"
                      className="h-auto w-full rounded-xl object-cover"
                    />
                  </div>
                </button>
                <figcaption className="mt-2 text-[11px] text-slate-400">
                  Start with a simple core pattern before adding layers.
                </figcaption>
              </figure>
            </div>
          </section>

          {/* 4.2 Rhythmic Subdivision */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-100">
              4.2 Rhythmic Subdivision
            </h3>
            <p>
              Rhythmic subdivision is the engine that drives the feel of your
              beat. It’s not just how fast notes occur, but how they divide time
              — and this division dramatically shapes the groove. Every beat can
              be broken into smaller units, and choosing which subdivision you
              lean on gives your music its character. Quarter notes feel steady
              and open, 8th notes add movement, 16th notes bring energy and
              momentum, and 32nds introduce rapid detail or tension. Triplets
              create swing, bounce, or a rolling feel, while dotted rhythms
              stretch phrases in a way that feels slightly unexpected or
              syncopated. Even choosing to stay sparse — leaving wide gaps
              between hits — can create a sense of space, swagger, or restraint.
              Understanding subdivisions helps you intentionally design the
              rhythmic personality of your verse, hook, or entire track.
            </p>

            <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] md:items-start">
              <div className="space-y-3">
                <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                  <button
                    type="button"
                    onClick={() =>
                      openZoom(
                        "/assets/music-production/drum-production/diagrams/notes.jpg",
                        "Diagram of rhythmic note values and subdivisions"
                      )
                    }
                    className="block w-full"
                  >
                    <div className="relative w-full">
                      <img
                        src="/assets/music-production/drum-production/diagrams/notes.jpg"
                        alt="Rhythmic subdivisions diagram"
                        className="h-auto w-full rounded-xl object-contain"
                      />
                    </div>
                  </button>
                  <figcaption className="mt-2 text-[11px] text-slate-400">
                    Visualizing how beats can be divided into different note
                    values.
                  </figcaption>
                </figure>
                <p>Each creates a different vibe:</p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>8ths → steady</li>
                  <li>16ths → energetic</li>
                  <li>Triplets → bouncy</li>
                  <li>Sparse → spacious</li>
                </ul>
              </div>

              <div className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-950/90 p-4 text-xs">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  INTERACTIVE: Subdivision Player
                </p>
                <p className="mt-2">
                  Students click on a small UI that looks like a digital player
                  has the note shape buttons and when you hover says what it is
                  whole note, half note, etc:
                </p>
                <ul className="mt-2 ml-4 list-disc space-y-1">
                  <li>Quarter</li>
                  <li>Eighth</li>
                  <li>Sixteenth</li>
                  <li>Triplet</li>
                  <li>…and hear the pattern.</li>
                </ul>
                <p className="mt-3 text-[11px] text-slate-400">
                  Click a note value below to load its example, then press play
                  on the audio player.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {(
                    [
                      "whole",
                      "half",
                      "quarter",
                      "eighth",
                      "sixteenth",
                      "quarterTriplet",
                      "dottedQuarter",
                    ] as SubdivisionKey[]
                  ).map((key) => {
                    const item = subdivisionMap[key];
                    const isActive = subdivision === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleSubdivisionChange(key)}
                        className={`rounded-full border px-3 py-1 text-[11px] font-medium transition ${
                          isActive
                            ? "border-emerald-500/70 bg-emerald-500/10 text-emerald-100"
                            : "border-slate-700 bg-slate-900/80 text-slate-200 hover:border-emerald-500/60 hover:bg-emerald-500/5"
                        }`}
                        title={item.label}
                      >
                        {item.short}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-3 rounded-xl border border-slate-800/80 bg-black/80 p-3">
                  <p className="text-[11px] font-semibold text-slate-200">
                    Current Selection: {currentSubdivision.label}
                  </p>
                  <audio
                    ref={subdivisionAudioRef}
                    className="mt-2 w-full"
                    controls
                    src={currentSubdivision.src}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 4.3 Time Signatures & Counting Feel */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-100">
              4.3 Time Signatures &amp; Counting Feel
            </h3>
            <div className="grid gap-6 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)] md:items-center">
              <div className="space-y-3">
                <p>
                  Time signatures describe how rhythm is organized. Most modern
                  music is in 4/4, but understanding other time signatures
                  expands rhythmic awareness and creativity.
                </p>
                <p className="font-semibold">Common Time Signatures</p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>4/4 — “Common time,” the standard</li>
                  <li>3/4 — Waltz feel, circular</li>
                  <li>6/8 — Rolling/swaying groove</li>
                  <li>5/4 — Off-kilter, hypnotic</li>
                  <li>7/4 / 7/8 — Progressive, angular</li>
                </ul>

                <p className="font-semibold">Why It Matters</p>
                <p>Producers should understand:</p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>How to count odd meters</li>
                  <li>How backbeats shift in unusual signatures</li>
                  <li>How subdivisions feel different depending on meter</li>
                  <li>Why some grooves feel “odd” (but cool)</li>
                </ul>
                <p>
                  You don’t need to write in odd time—just feel comfortable
                  recognizing it.
                </p>
              </div>
              <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <button
                  type="button"
                  onClick={() =>
                    openZoom(
                      "/assets/music-production/drum-production/images/time-sig.jpg",
                      "Diagram explaining time signatures"
                    )
                  }
                  className="block w-full"
                >
                  <div className="relative w-full">
                    <img
                      src="/assets/music-production/drum-production/images/time-sig.jpg"
                      alt="Time signatures visual"
                      className="h-auto w-full rounded-xl object-contain"
                    />
                  </div>
                </button>
                <figcaption className="mt-2 text-[11px] text-slate-400">
                  Time signatures change where the pulse and backbeat land.
                </figcaption>
              </figure>
            </div>
          </section>

          {/* 4.4 Building a Basic Beat */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-100">
              4.4 Building a Basic Beat
            </h3>
            <p>
              Before we move on to advanced tools, let’s create a solid
              foundation. A basic beat is a structural template — something
              simple enough to work across genres but strong enough to carry the
              groove. This is where we establish the “engine” of your track
              before adding character, detail, or embellishment.
            </p>
            <p className="font-semibold">Step-by-step:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Place the snare on 2 &amp; 4</li>
              <li>Add a simple kick pattern</li>
              <li>Add straight 8th-note hats</li>
              <li>Build small variations</li>
              <li>Adjust velocities</li>
              <li>Add swing (optional)</li>
              <li>Add one percussion element</li>
              <li>Refine</li>
            </ul>
            <p>A clean, modern beat is now in place.</p>

            <div className="rounded-2xl border border-slate-800/80 bg-black/80 p-3 text-xs">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Tutorial • Two-Bar Loop
              </p>
              <video
                className="mt-2 w-full rounded-xl"
                controls
                src="/assets/music-production/drum-production/tutorials/two-bar.mp4"
              />
            </div>
          </section>
        </section>

         {/* 5. Quantization, Swing & Humanization */}
        <section
          id="quantization-swing-humanization"
          className="space-y-6 scroll-mt-24 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-5 md:p-7"
        >
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 5
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              5. Quantization, Swing &amp; Humanization
            </h2>
          </header>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] md:items-center">
            <div className="space-y-3">
              <p>
                Once you know how to construct a basic beat, the next step is
                learning how to make it feel good. Two beats can be identical on
                paper yet feel completely different depending on how they’re
                quantized, swung, or humanized. These tools allow you to shape
                the emotional personality of your groove—whether you want it
                tight and robotic, loose and drunk, bouncy and modern, or
                anything in between.
              </p>
            </div>
            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <button
                type="button"
                onClick={() =>
                  openZoom(
                    "/assets/music-production/drum-production/images/pt-midi.jpg",
                    "MIDI drum pattern in a DAW piano roll"
                  )
                }
                className="block w-full"
              >
                <div className="relative w-full">
                  <img
                    src="/assets/music-production/drum-production/images/pt-midi.jpg"
                    alt="MIDI drum pattern in DAW"
                    className="h-auto w-full rounded-xl object-cover"
                  />
                </div>
              </button>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                The same pattern can feel radically different depending on
                timing and dynamics.
              </figcaption>
            </figure>
          </div>

          {/* 5.1 Quantization */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-100">
              5.1 Quantization
            </h3>
            <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] md:items-start">
              <div className="space-y-3">
                <p>
                  Aligns notes to the grid — but hard quantization can sound
                  robotic.
                </p>
                <p className="text-xs text-slate-400">
                  Visual interactive: pic of notes off the grid and a Q button
                  on the top. When you press the q button the notes snap into
                  place perfectly on the grid. We could have an h button that
                  moves it off the grid in a humanize way? Both the q and h
                  button have a hover bubble that says what they are when the
                  mouse cursor hovers over them.
                </p>

                <div className="rounded-2xl border border-slate-800/80 bg-slate-950/90 p-4 text-xs">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Interactive • Quantized vs Humanized
                  </p>
                  <p className="mt-2 text-[11px] text-slate-300">
                    Use the buttons below to switch between a perfectly
                    quantized idea and a more human version.
                  </p>
                  <div className="mt-3 flex gap-2">
                    {(
                      ["quantized", "humanized"] as GrooveMode[]
                    ).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setGrooveMode(mode)}
                        className={`rounded-full border px-3 py-1 text-[11px] font-medium transition ${
                          grooveMode === mode
                            ? "border-emerald-500/70 bg-emerald-500/10 text-emerald-100"
                            : "border-slate-700 bg-slate-900/80 text-slate-200 hover:border-emerald-500/60 hover:bg-emerald-500/5"
                        }`}
                        title={
                          mode === "quantized"
                            ? "Q = Quantize to grid"
                            : "H = Humanize"
                        }
                      >
                        {mode === "quantized" ? "Q • Quantized" : "H • Humanized"}
                      </button>
                    ))}
                  </div>

                  <div className="mt-3 rounded-xl border border-slate-800/80 bg-black/80 p-3 text-[11px]">
                    {grooveMode === "quantized" ? (
                      <ul className="ml-4 list-disc space-y-1">
                        <li>All hits snapped exactly to the grid.</li>
                        <li>Clean, machine-like feel.</li>
                        <li>Useful for electronic, techno, and tight pop.</li>
                      </ul>
                    ) : (
                      <ul className="ml-4 list-disc space-y-1">
                        <li>Small timing shifts around the grid.</li>
                        <li>More natural, human performance feel.</li>
                        <li>
                          Great for boom bap, neo-soul, and live-feeling beats.
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <button
                  type="button"
                  onClick={() =>
                    openZoom(
                      "/assets/music-production/drum-production/diagrams/hook-vs-verse-diagram.jpg",
                      "Diagram showing human vs robot timing"
                    )
                  }
                  className="block w-full"
                >
                  <div className="relative w-full">
                    <img
                      src="/assets/music-production/drum-production/diagrams/human-vs-robot.jpg"
                      alt="Human vs robot timing"
                      className="h-auto w-full rounded-xl object-contain"
                    />
                  </div>
                </button>
                <figcaption className="mt-2 text-[11px] text-slate-400">
                  Comparing perfectly quantized &quot;robot&quot; timing with
                  more human micro-shifts.
                </figcaption>
              </figure>
            </div>
          </section>

          {/* 5.2 Swing */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">5.2 Swing</h3>
            <p>Moves off-beats later to create bounce:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Trap = subtle swing</li>
              <li>Boom bap = heavy swing</li>
              <li>Neo-soul = swung triplets</li>
            </ul>
          </section>

          {/* 5.3 Humanization */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              5.3 Humanization
            </h3>
            <ul className="ml-4 list-disc space-y-1">
              <li>Velocity randomness</li>
              <li>Micro-timing shifts</li>
              <li>Ghost notes</li>
              <li>Imperfection</li>
            </ul>
          </section>

          {/* 5.4 Feel First */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              5.4 Feel First
            </h3>
            <p>A groove should feel good before it looks good.</p>

            <div className="rounded-2xl border border-slate-800/80 bg-black/80 p-3 text-xs">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Tutorial • Quantization, Swing, Human Feel
              </p>
              <video
                className="mt-2 w-full rounded-xl"
                controls
                src="/assets/music-production/drum-production/tutorials/q-s-human.mp4"
              />
            </div>
          </section>
        </section>

        {/* 6. Verse vs Hook Drum Patterns */}
        <section
          id="verse-vs-hook-drums"
          className="space-y-6 scroll-mt-24 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-5 md:p-7"
        >
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 6
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              6. Verse vs Hook Drum Patterns
            </h2>
          </header>

          <p>
            Just like melodic and harmonic elements change between the verse and
            the hook, your drums must also evolve to support the emotional arc
            of the song. A verse groove that is too busy will overwhelm your
            vocals or melody. A hook groove that is too simple won’t deliver
            impact. In this section, we’ll explore how drum programming shifts
            between these two core sections so you can create contrast, build
            energy, and make your arrangement feel intentional.
          </p>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/90 p-4 text-xs">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Interactive • Verse vs Hook Drums
            </p>
            <p className="mt-2 text-[11px] text-slate-300">
              Use the tabs to compare how verse and hook drum patterns differ.
            </p>

            <div className="mt-3 inline-flex rounded-full border border-slate-700 bg-slate-900/80 p-1 text-[11px]">
              {(["verse", "hook"] as VerseHookTab[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setVerseHookTab(tab)}
                  className={`rounded-full px-3 py-1 font-medium transition ${
                    verseHookTab === tab
                      ? "bg-emerald-500/20 text-emerald-100"
                      : "text-slate-300 hover:text-emerald-100"
                  }`}
                >
                  {tab === "verse" ? "Verse Drums" : "Hook Drums"}
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-slate-800/80 bg-black/80 p-3 text-xs">
              {verseHookTab === "verse" ? (
                <>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    6.1 Verse Drums
                  </h3>
                  <p className="mt-2">
                    Simplified patterns
                    <br />
                    Less hi-hat activity
                    <br />
                    Lower velocity
                    <br />
                    More space
                  </p>
                  <ul className="ml-4 mt-2 list-disc space-y-1">
                    <li>Simplified patterns</li>
                    <li>Less hi-hat activity</li>
                    <li>Lower velocity</li>
                    <li>More space</li>
                  </ul>
                </>
              ) : (
                <>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    6.2 Hook Drums
                  </h3>
                  <p className="mt-2">
                    More layers
                    <br />
                    More subdivisions
                    <br />
                    More velocity
                    <br />
                    More width
                  </p>
                  <ul className="ml-4 mt-2 list-disc space-y-1">
                    <li>More layers</li>
                    <li>More subdivisions</li>
                    <li>More velocity</li>
                    <li>More width</li>
                  </ul>
                </>
              )}
            </div>

            <div className="mt-3 text-[11px] text-slate-300">
              <p className="font-semibold">6.3 The A/B Relationship</p>
              <p className="mt-1">
                Verses set up tension.
                <br />
                Hooks release it.
              </p>
            </div>
          </div>
        </section>

        {/* 7. Sound Selection: Choosing Drum Tones */}
        <section
          id="sound-selection"
          className="space-y-6 scroll-mt-24 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-5 md:p-7"
        >
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 7
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              7. Sound Selection: Choosing Drum Tones
            </h2>
          </header>

          <p>
            Programming rhythms is only half the equation — the sound selection
            behind those rhythms completely transforms how your beat feels. The
            same pattern played with a dusty vinyl kick, a clean pop kick, or an
            808 sub-kick will produce three entirely different emotional
            landscapes. This section dives into the art of choosing drum tones
            that match your Production Brief, your reference tracks, and the
            identity you want your song to have.
          </p>

          {/* 7.1 Match Your Production Brief */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-100">
              7.1 Match Your Production Brief
            </h3>
            <ul className="ml-4 list-disc space-y-1">
              <li>Mood</li>
              <li>Genre</li>
              <li>Emotional tone</li>
            </ul>

            <div className="rounded-2xl border border-slate-800/80 bg-black/80 p-3 text-xs">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Tutorial • Drum Kits &amp; Sound Selection
              </p>
              <video
                className="mt-2 w-full rounded-xl"
                controls
                src="/assets/music-production/drum-production/tutorials/drum-kits.mp4"
              />
            </div>
          </section>

          {/* 7.2 Clean vs Dirty */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-100">
              7.2 Clean vs Dirty
            </h3>
            <p>
              When building your drum kit, one of the biggest decisions is
              whether your track needs clean drums or dirty drums. Clean drums
              are crisp, bright, and polished — great for Pop, Dance, and R&amp;B,
              where clarity and high-end shine matter. Dirty drums, on the
              other hand, have grit, saturation, texture, or even intentional
              imperfection. These work beautifully for Hip-Hop, Lo-fi, and
              Alternative, where warmth, character, and attitude are part of the
              vibe. Your production brief should guide you here: choose drum
              tones that match the emotional and stylistic world you&apos;re
              creating.
            </p>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/90 p-4 text-xs">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Interactive • Clean vs Dirty
              </p>
              <p className="mt-2 text-[11px] text-slate-300">
                Toggle between clean and dirty drum worlds.
              </p>
              <div className="mt-3 inline-flex rounded-full border border-slate-700 bg-slate-900/80 p-1">
                {(
                  ["clean", "dirty"] as CleanDirtyTab[]
                ).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setCleanDirtyTab(tab)}
                    className={`rounded-full px-3 py-1 text-[11px] font-medium transition ${
                      cleanDirtyTab === tab
                        ? "bg-emerald-500/20 text-emerald-100"
                        : "text-slate-300 hover:text-emerald-100"
                    }`}
                  >
                    {tab === "clean" ? "Clean Drums" : "Dirty Drums"}
                  </button>
                ))}
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-800/80 bg-black/80 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Clean
                  </p>
                  <ul className="mt-2 ml-4 list-disc space-y-1">
                    <li>Pop</li>
                    <li>Dance</li>
                    <li>R&amp;B</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-slate-800/80 bg-black/80 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Dirty
                  </p>
                  <ul className="mt-2 ml-4 list-disc space-y-1">
                    <li>Hip-hop</li>
                    <li>Lo-fi</li>
                    <li>Alternative</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 7.3 Layering */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              7.3 Layering
            </h3>
            <p>
              Layering drums isn&apos;t about adding random hits — it's about
              giving each sound a purpose. You might layer a kick for punch, add
              a second snare for width, blend extra percussion for texture, or
              combine unique hits to create your own signature identity.
              Thoughtful layering helps your kit feel fuller and more expressive
              without overcrowding the mix. The goal is to build a drum palette
              that supports your song’s energy while reflecting the personality
              of your production brief.
            </p>
          </section>
        </section>

        {/* 8. Working With Drum Loops */}
        <section
          id="working-with-drum-loops"
          className="space-y-6 scroll-mt-24 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-5 md:p-7"
        >
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 8
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              8. Working With Drum Loops
            </h2>
          </header>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] md:items-center">
            <div className="space-y-3">
              <p>
                Loops are one of the most powerful creative tools available to
                producers today. They can spark ideas, help define groove, or
                provide textures you wouldn’t normally reach for. But to use
                loops effectively, you need to know how to manipulate them,
                customize them, and integrate them into your track so they feel
                original. In this section, you’ll learn how loops function inside
                modern production workflows and how to transform them into
                something uniquely your own.
              </p>
            </div>
            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <button
                type="button"
                onClick={() =>
                  openZoom(
                    "/assets/music-production/drum-production/images/work-loops.jpg",
                    "Drum loop waveform in a DAW"
                  )
                }
                className="block w-full"
              >
                <div className="relative w-full">
                  <img
                    src="/assets/music-production/drum-production/images/work-loops.jpg"
                    alt="Drum loops in a DAW"
                    className="h-auto w-full rounded-xl object-cover"
                  />
                </div>
              </button>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Loops can be a starting point or a subtle layer in your groove.
              </figcaption>
            </figure>
          </div>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              8.1 Loops for Inspiration
            </h3>
            <p>They can build momentum instantly.</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              8.2 Loop Deconstruction
            </h3>
            <p>Split into:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Kick</li>
              <li>Snare</li>
              <li>Hats</li>
              <li>Perc</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              8.3 Make Loops Your Own
            </h3>
            <ul className="ml-4 list-disc space-y-1">
              <li>Chop</li>
              <li>Reverse</li>
              <li>Pitch shift</li>
              <li>Half-time</li>
              <li>Add your own percussion</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              8.4 Loop + MIDI Hybrid
            </h3>
            <p>Use loops as glue — MIDI as punch.</p>
          </section>
        </section>

        {/* 9. Drum Arrangement & Transitions */}
        <section
          id="drum-arrangement-transitions"
          className="space-y-6 scroll-mt-24 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-5 md:p-7"
        >
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 9
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              9. Drum Arrangement &amp; Transitions
            </h2>
          </header>

          <p>
            A great drum beat isn’t static — it changes, evolves, and breathes
            as the song progresses. Professional drum arrangement uses fills,
            transitions, drops, and automation to guide the listener through the
            emotional journey of your track. This section shows you how to add
            movement and life to your drums so your arrangement feels
            professional, dynamic, and engaging from start to finish.
          </p>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                src: "/assets/music-production/drum-production/images/chad-smith.jpg",
                alt: "Chad Smith playing drums",
                caption: "Chad Smith — Red Hot Chili Peppers",
              },
              {
                src: "/assets/music-production/drum-production/images/neil-peart.jpg",
                alt: "Neil Peart playing drums",
                caption: "Neil Peart — Rush",
              },
              {
                src: "/assets/music-production/drum-production/images/travis-barker.jpg",
                alt: "Travis Barker playing drums",
                caption: "Travis Barker — Blink-182",
              },
              {
                src: "/assets/music-production/drum-production/images/john-bonham.jpg",
                alt: "John Bonham playing drums",
                caption: "John Bonham — Led Zeppelin",
              },
            ].map((drummer) => (
              <figure
                key={drummer.caption}
                className="rounded-2xl border border-slate-800/80 bg-black/80 p-2"
              >
                <button
                  type="button"
                  onClick={() => openZoom(drummer.src, drummer.alt)}
                  className="block w-full"
                >
                  <div className="relative w-full">
                    <img
                      src={drummer.src}
                      alt={drummer.alt}
                      className="h-auto w-full rounded-xl object-cover"
                    />
                  </div>
                </button>
                <figcaption className="mt-2 text-center text-[11px] text-slate-300">
                  {drummer.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">9.1 Fills</h3>
            <ul className="ml-4 list-disc space-y-1">
              <li>Rolls</li>
              <li>Ramps</li>
              <li>Perc fills</li>
              <li>Tom fills</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              9.2 Dropping Elements
            </h3>
            <p>Silence builds anticipation.</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              9.3 Automation
            </h3>
            <p>Automate:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Filters</li>
              <li>Volume</li>
              <li>Reverb sends</li>
              <li>Delays</li>
              <li>Panning</li>
            </ul>
          </section>
        </section>

        {/* 10. Applying This to Your Project Track */}
        <section
          id="applying-to-project-track"
          className="space-y-6 scroll-mt-24 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-5 md:p-7"
        >
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 10
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              10. Applying This to Your Project Track
            </h2>
          </header>

          <p>
            Now that you understand groove, sound selection, loops, swing, and
            arrangement, it’s time to bring everything together. In this
            section, you’ll apply these concepts to your own project track,
            building the verse and hook drum patterns that will become the
            rhythmic engine of your song. The goal here isn’t perfection — it’s
            establishing the foundation your entire track will grow from in the
            chapters ahead.
          </p>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              10.1 Verse Patterns
            </h3>
            <p>Build a spacious, emotional groove.</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              10.2 Hook Patterns
            </h3>
            <p>Build an energetic, expansive groove.</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              10.3 Align Groove to Melody + Chords
            </h3>
            <p>Drums should support—not fight—your musical ideas.</p>
          </section>
        </section>

        {/* 11. Homework */}
        <section
          id="homework"
          className="space-y-6 scroll-mt-24 rounded-2xl border border-emerald-500/50 bg-emerald-500/10 p-5 text-xs text-emerald-50 md:p-7"
        >
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">
              Section 11
            </p>
            <h2 className="text-lg font-semibold">
              11. Homework: Drum Groove for Verse &amp; Hook
            </h2>
          </header>

          <p>
            Your homework for this chapter is where the concepts become real.
            You’ll program the full drum groove for both your verse and hook
            sections, apply contrast and dynamics, and export your work for
            feedback. This assignment sets the stage for the next chapter, where
            we dive into the low end and learn how bass and drums interact to
            create the true heartbeat of your track.
          </p>

          <div className="rounded-2xl border border-emerald-400/50 bg-black/40 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
              Deliverables
            </p>
            <ul className="mt-2 ml-4 list-disc space-y-1">
              <li>Verse drum pattern</li>
              <li>Hook drum pattern</li>
              <li>Solo drums bounce</li>
              <li>Full arrangement bounce</li>
              <li>Written reflection</li>
            </ul>
            <p className="mt-3">
              This becomes the rhythmic engine of your track moving forward.
            </p>
          </div>
        </section>
      </article>

      {/* Global Image Zoom Overlay */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={closeZoom}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeZoom}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/70 px-2 py-1 text-xs text-slate-200 hover:bg-black"
            >
              × Close
            </button>
            <div className="relative w-full">
              <img
                src={zoomedImage.src}
                alt={zoomedImage.alt}
                className="h-auto w-full rounded-xl object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
