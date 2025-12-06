/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Image from "next/image";

type ZoomedImage = {
  src: string;
  alt: string;
} | null;

export default function VocalProductionChapter() {
  const [zoomedImage, setZoomedImage] = useState<ZoomedImage>(null);

  const handleZoom = (src: string, alt: string) => {
    setZoomedImage({ src, alt });
  };

  const closeZoom = () => setZoomedImage(null);

  return (
    <div className="relative">
      <article className="space-y-10 text-sm text-slate-200">
        {/* HERO */}
        <section className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-black/80">
            <div className="relative h-52 w-full sm:h-64 md:h-72">
              <Image
                src="/assets/music-production/vocal-production/images/vocals-bkgrnd.jpg"
                alt="Vocalist recording in a studio"
                fill
                priority
                className="object-cover brightness-[0.4]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/70 to-black/95" />
              <div className="relative z-10 flex h-full flex-col justify-end gap-2 p-5 md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
                  Chapter 7
                </p>
                <h1 className="text-2xl font-semibold text-emerald-50 md:text-3xl">
                  VOCAL PRODUCTION
                </h1>
                <p className="text-[11px] text-emerald-100/80">
                  Capturing Emotion, Character &amp; Performance
                </p>
              </div>
            </div>
          </div>

          {/* 1. INTRODUCTION */}
          <section className="grid gap-6 md:grid-cols-[minmax(0,1.6fr),minmax(0,1fr)] md:items-start">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-emerald-50">
                1. Introduction: The Art of Vocal Production
              </h2>
              <p>
                Vocals are the center of most modern music. They carry the
                storytelling, vulnerability, character, and identity of the
                track. Whether you’re recording a singer, a rapper, or tracking
                your own voice, vocal production isn’t just about clean audio —
                it’s about capturing the right emotion.
              </p>
              <p>
                A great vocal take can elevate a beat into a song. A weak one
                can make even the best instrumental feel unfinished.
              </p>
              <p>
                This chapter gives you a modern producer’s toolkit for preparing,
                recording, shaping, layering, and organizing vocals so they feel
                professional, expressive, and compelling. You’ll learn practical
                workflows used in commercial studios, simplified techniques that
                work at home, and creative approaches for melody and lyric
                writing — even if you don’t consider yourself a vocalist.
              </p>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <button
                type="button"
                onClick={() =>
                  handleZoom(
                    "/assets/music-production/vocal-production/images/singer.jpg",
                    "Singer recording in the studio"
                  )
                }
                className="block w-full"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/assets/music-production/vocal-production/images/singer.jpg"
                    alt="Singer at a studio microphone"
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
              </button>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Vocal production is about capturing emotion, not just clean
                audio.
              </figcaption>
            </figure>
          </section>
        </section>

        {/* 2. PREPARING THE VOCALIST */}
        <section className="space-y-6">
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 2
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              2. Preparing the Vocalist
            </h2>
          </header>

          <p>
            Before you hit record, the goal is to create an environment where
            the vocalist feels comfortable, confident, and emotionally open. A
            relaxed vocalist performs better, faster, and with more honesty.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Creating Comfort &amp; Safety
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs">
                <li>Adjust lighting and vibe</li>
                <li>Provide water and breaks</li>
                <li>Encourage experimentation</li>
                <li>Remove pressure to “nail it” immediately</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Warmups (Simple, Producer-Friendly)
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs">
                <li>Gentle lip rolls</li>
                <li>Humming through their range</li>
                <li>Light scales (1–3–5–3–1)</li>
                <li>Avoid long, technical routines unless requested</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Lyric Prep
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs">
                <li>Print lyrics or have them on a screen</li>
                <li>Mark emphasis, breaths, and tricky transitions</li>
                <li>Discuss emotional intention for each section</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                The “2 Take Rule”
              </p>
              <p className="text-xs text-slate-300">
                An artist’s first two takes are often the most honest. Capture
                them, label them clearly, and never throw them away — even if
                they’re rough.
              </p>
            </div>
          </div>
        </section>


        {/* 3. MICROPHONES & TECHNIQUES */}
        <section className="space-y-6">
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 3
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              3. Microphones &amp; Techniques (Producer Edition)
            </h2>
          </header>

          <p>
            You don’t need to be a microphone scientist — just understand how
            mic choice, placement, and gain staging affect tone. These
            fundamentals help you get great sound with any gear.
          </p>

          <p>
            In this section you’ll learn the three main microphone families,
            how polar patterns shape what the mic “hears,” and how to position
            the mic in a non-treated room using shields and pop filters to get
            clean, pro-sounding vocals.
          </p>
        </section>

        {/* 3.1 MICROPHONE TYPES */}
        <section className="space-y-8">
          <h3 className="text-sm font-semibold text-emerald-100">
            3.1 Microphone Types
          </h3>

          {/* Condenser */}
          <div className="grid gap-6 md:grid-cols-2 md:items-start">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Condenser Microphones — Detailed, Bright, Modern
              </p>

              <p className="mt-3">
                Condenser mics are the go-to choice for capturing clarity and
                nuance. They’re extremely sensitive, picking up tiny details in
                a vocal performance — breath, texture, tone, and expressive
                nuances.
              </p>
              <p>
                Their bright, open top-end helps vocals sit clearly in dense
                modern mixes. Because of their sensitivity, they work best in
                treated rooms where reflections don’t color the sound.
              </p>
              <p>
                You’ll see condensers in almost every commercial vocal chain —
                from pop and R&amp;B to acoustic and indie sessions.
              </p>

              <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                <li>Classic studio choices: Neumann U87, AKG C414</li>
                <li>Home-studio options: Rode NT1, Audio-Technica AT2020</li>
                <li>
                  Great for: modern pop, R&amp;B, singer-songwriter, detailed
                  toplines
                </li>
              </ul>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3 md:max-w-sm md:ml-auto">
              <button
                type="button"
                onClick={() =>
                  handleZoom(
                    "/assets/music-production/vocal-production/diagrams/condenser.jpg",
                    "Condenser microphone diagram"
                  )
                }
                className="block w-full"
              >
                <div className="relative w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/music-production/vocal-production/diagrams/condenser.jpg"
                    alt="Condenser microphone"
                    className="mx-auto h-auto w-full max-h-80 rounded-xl object-contain"
                  />
                </div>
              </button>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Condensers capture detail and brightness — great for polished
                vocals.
              </figcaption>
            </figure>
          </div>

          {/* Dynamic */}
          <div className="grid gap-6 md:grid-cols-2 md:items-start">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Dynamic Microphones — Rugged, Upfront, Great for Rap
              </p>

              <p className="mt-3">
                Dynamic mics handle loud, aggressive, or energetic performances
                without distortion — perfect for rap, rock, and high-energy
                vocals.
              </p>
              <p>
                They naturally reject room noise, making them ideal in untreated
                rooms. Their tone is focused and mid-forward, cutting through
                dense beats even when the instrumental is busy.
              </p>
              <p className="text-xs text-slate-300">
                Because they’re less sensitive than condensers, they let you
                work comfortably in bedrooms, living rooms, and control rooms
                without capturing every reflection.
              </p>

              <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                <li>Studio staples: Shure SM7B, Electro-Voice RE20</li>
                <li>Live &amp; rehearsal workhorse: Shure SM58</li>
                <li>
                  Great for: rap, rock, shouty hooks, podcasts, untreated
                  spaces
                </li>
              </ul>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3 md:max-w-sm md:ml-auto">
              <button
                type="button"
                onClick={() =>
                  handleZoom(
                    "/assets/music-production/vocal-production/diagrams/dynamic.jpg",
                    "Dynamic microphone diagram"
                  )
                }
                className="block w-full"
              >
                <div className="relative w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/music-production/vocal-production/diagrams/dynamic.jpg"
                    alt="Dynamic microphone"
                    className="mx-auto h-auto w-full max-h-80 rounded-xl object-contain"
                  />
                </div>
              </button>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Dynamics are forgiving and focused — ideal for rap and loud
                performances.
              </figcaption>
            </figure>
          </div>

          {/* Ribbon */}
          <div className="grid gap-6 md:grid-cols-2 md:items-start">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Ribbon Microphones — Smooth, Vintage, Warm
              </p>

              <p className="mt-3">
                Ribbon mics deliver a silky, natural tone, gently rolling off
                harsh highs. They make vocals sound warm and polished without
                needing heavy EQ.
              </p>
              <p>
                Their figure-8 pattern adds natural ambience and depth,
                capturing the room in a musical way — perfect for intimate,
                character-driven songs.
              </p>
              <p className="text-xs text-slate-300">
                Ribbons are more fragile and usually need a clean preamp with
                plenty of gain, but the payoff is a rich, cinematic vocal tone.
              </p>

              <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                <li>Well-known models: Royer R-121, Coles 4038, AEA R84</li>
                <li>Great for: jazz, soul, indie, retro flavors, smooth top-end</li>
              </ul>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3 md:max-w-sm md:ml-auto">
              <button
                type="button"
                onClick={() =>
                  handleZoom(
                    "/assets/music-production/vocal-production/diagrams/ribbon.jpg",
                    "Ribbon microphone diagram"
                  )
                }
                className="block w-full"
              >
                <div className="relative w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/music-production/vocal-production/diagrams/ribbon.jpg"
                    alt="Ribbon microphone"
                    className="mx-auto h-auto w-full max-h-80 rounded-xl object-contain"
                  />
                </div>
              </button>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Ribbons give smooth, vintage tone with beautiful top-end
                softness.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 3.2 POLAR PATTERNS */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-emerald-100">
            3.2 Polar Patterns
          </h3>

          <div className="grid gap-4 md:grid-cols-2 md:items-start">
            <div className="space-y-2">
              <p>
                Polar patterns describe where a microphone is most sensitive.
                Choosing the right pattern helps you control room tone, bleed,
                and ambience.
              </p>
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  <span className="font-semibold">Cardioid</span>: default for
                  most vocals — focuses on what’s in front and rejects the rear.
                </li>
                <li>
                  <span className="font-semibold">Omni</span>: open and natural,
                  captures the whole room; great in beautiful spaces.
                </li>
                <li>
                  <span className="font-semibold">Figure-8</span>: captures
                  front and back, rejects the sides; useful for ambience or
                  duets.
                </li>
              </ul>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3 md:max-w-sm md:ml-auto">
              <button
                type="button"
                onClick={() =>
                  handleZoom(
                    "/assets/music-production/vocal-production/diagrams/polar-pattern.jpg",
                    "Microphone polar pattern diagram"
                  )
                }
                className="block w-full"
              >
                <div className="relative w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/music-production/vocal-production/diagrams/polar-pattern.jpg"
                    alt="Polar pattern diagram"
                    className="mx-auto h-auto w-full max-h-80 rounded-xl object-contain"
                  />
                </div>
              </button>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Polar patterns control how the mic hears the room around it.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 3.3 PLACEMENT, SHIELDS & POP FILTERS */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-emerald-100">
            3.3 Placement Techniques, Mic Shields &amp; Pop Filters
          </h3>

          <p>
            Mic placement shapes the tone of a vocal more than most people
            realize. Small changes in distance or angle can dramatically affect
            warmth, detail, and presence. In a non-treated room, placement also
            becomes a tool for controlling reflections and room tone — that’s
            where mic shields and pop filters shine.
          </p>

          {/* Distance & shield image */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-emerald-100">
                Distance &amp; Tone
              </p>
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  <span className="font-semibold">Airy tone (6–10")</span> — more
                  space and brightness. Great for pop and indie clarity.
                </li>
                <li>
                  <span className="font-semibold">
                    Warm &amp; intimate (3–5")
                  </span>{" "}
                  — fuller, richer low end. Perfect for R&amp;B and emotional
                  delivery.
                </li>
                <li>
                  <span className="font-semibold">
                    Aggressive rap (very close to a dynamic)
                  </span>{" "}
                  — maximum punch and presence, minimal room.
                </li>
                <li>
                  <span className="font-semibold">
                    Soft ballads (8–12", slightly above the mouth)
                  </span>{" "}
                  — natural dynamics, fewer plosives, more “open” sound.
                </li>
              </ul>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3 md:max-w-sm md:ml-auto">
              <button
                type="button"
                onClick={() =>
                  handleZoom(
                    "/assets/music-production/vocal-production/images/shield.jpg",
                    "Mic shield around a studio microphone"
                  )
                }
                className="block w-full"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/assets/music-production/vocal-production/images/shield.jpg"
                    alt="Mic shield"
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
              </button>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Mic shields act like a portable vocal booth, reducing room
                reflections.
              </figcaption>
            </figure>
          </div>

          {/* Shields vs pop filters */}
          <div className="grid gap-4 md:grid-cols-2 md:items-center">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-emerald-100">
                Mic Shields — Your Portable Vocal Booth
              </p>
              <p>
                Mic shields wrap around the microphone and block reflections
                from walls, ceilings, and gear — especially in untreated rooms.
                They don’t replace real acoustic treatment, but they massively
                reduce room coloration, making vocals cleaner and easier to mix.
              </p>
              <p>
                This is why so many major producers record vocals in the control
                room, not a booth. It keeps communication fast and creative
                while still capturing a polished sound.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-emerald-100">
                Pop Filters — Clean, Professional Vocal Tone
              </p>
              <p>
                Pop filters reduce plosive blasts (“P,” “B,” “T” sounds) that
                can overload the mic capsule, and they help maintain consistent
                distance.
              </p>
              <p className="text-xs">Two key benefits:</p>
              <ul className="ml-4 list-disc space-y-1 text-xs">
                <li>Cleaner recordings = less editing</li>
                <li>Less low-frequency rumble from plosives</li>
              </ul>
            </div>
          </div>

          {/* Pop filter image + why record in room */}
          <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3 md:max-w-sm md:mx-auto">
            <button
              type="button"
              onClick={() =>
                handleZoom(
                  "/assets/music-production/vocal-production/images/pop-filter.jpg",
                  "Pop filter in front of a microphone"
                )
              }
              className="block w-full"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/assets/music-production/vocal-production/images/pop-filter.jpg"
                  alt="Pop filter"
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
            </button>
            <figcaption className="mt-2 text-[11px] text-slate-400">
              Even a cheap pop filter instantly improves recordings in any
              studio.
            </figcaption>
          </figure>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-emerald-100">
              Why Many Producers Record in the Room
            </p>
            <p>
              Small vocal booths can sound too dead or boxy. A treated control
              room with a good shield and pop filter often gives a more natural,
              musical vocal sound.
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Artists feel more comfortable near the producer</li>
              <li>Communication is instant</li>
              <li>Takes feel more connected and emotional</li>
              <li>Less “booth isolation anxiety” for newer artists</li>
            </ul>
            <p>
              This workflow sits behind countless iconic records — simple gear
              used well in a comfortable room.
            </p>
          </div>
        </section>

        {/* 4. VOCAL CHAIN */}
        <section className="space-y-6">
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 4
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              4. The Vocal Chain (Clean, Trap &amp; Hybrid Workflows)
            </h2>
          </header>

          <p>
            Your vocal chain shapes how the artist hears themselves — which
            dramatically affects performance. Keep it simple and low-latency so
            the vocalist feels connected to the track.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                4.1 Essential Clean Vocal Chain
              </p>
              <p className="text-xs text-slate-300">
                Minimal, clean, and versatile for almost any genre:
              </p>
              <ul className="ml-4 mt-1 list-disc space-y-1 text-xs">
                <li>High-pass filter</li>
                <li>Light compression (2–4 dB gain reduction)</li>
                <li>Subtle EQ shaping</li>
                <li>Optional light saturation</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                4.2 Headphone Mix Setup
              </p>
              <ul className="ml-4 mt-1 list-disc space-y-1 text-xs">
                <li>Slightly louder vocal than the beat</li>
                <li>Low-latency monitoring path</li>
                <li>Small reverb/delay only in the headphones</li>
                <li>No harshness or piercing sibilance</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                4.4 Monitoring FX (Not Printed)
              </p>
              <p className="text-xs text-slate-300">
                Use these only for inspiration during tracking — not baked into
                the audio:
              </p>
              <ul className="ml-4 mt-1 list-disc space-y-1 text-xs">
                <li>Reverb</li>
                <li>Delay / slapback</li>
                <li>Short echo or doubler</li>
              </ul>
            </div>
          </div>

          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-100">
              4.3 Trap &amp; Melodic Rap “Live Auto-Tune” Chain
            </h3>

            <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] md:items-start">
              <div className="space-y-2">
                <p>
                  In modern hip-hop, melodic rap, trap, and a lot of R&amp;B,
                  artists expect Auto-Tune in their headphones and often want it
                  printed. They perform into the tuning — the sound is part of
                  the style.
                </p>
                <p className="text-xs font-semibold text-emerald-100">
                  Typical real-world chain:
                </p>
                <ul className="ml-4 list-disc space-y-1 text-xs">
                  <li>Auto-Tune or real-time pitch correction</li>
                  <li>Set key &amp; scale</li>
                  <li>Retune Speed: 0–12 ms</li>
                  <li>Humanize: 0–30%</li>
                  <li>Low Flex-Tune, low-latency mode ON</li>
                  <li>High-pass filter</li>
                  <li>Fast compression</li>
                  <li>Optional mild saturation or de-essing</li>
                </ul>
                <p className="text-xs font-semibold text-emerald-100">
                  Latency tips:
                </p>
                <ul className="ml-4 list-disc space-y-1 text-xs">
                  <li>32–64 sample buffer size</li>
                  <li>Avoid heavy or look-ahead plugins</li>
                  <li>Use your DAW’s low-latency monitoring mode</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
                <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Tutorial • Building a Vocal Chain
                </div>
                <div className="aspect-video w-full">
                  <video
                    className="h-full w-full rounded-b-2xl"
                    controls
                    src="/assets/music-production/vocal-production/tutorials/vocal-chain.mp4"
                  />
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* 5. VOCAL RECORDING TECHNIQUES */}
        <section className="space-y-6">
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 5
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              5. Vocal Recording Techniques
            </h2>
          </header>

          <p>
            Recording modern vocals is about capturing multiple layers that form
            a cohesive performance. These foundational strategies give you a
            professional workflow from day one.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                The Core Takes
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs">
                <li>Lead vocal</li>
                <li>Doubles (tight or loose)</li>
                <li>Ad-libs</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Lead Strategy
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs">
                <li>Capture 3–6 full takes</li>
                <li>Get emotion early, before fatigue</li>
                <li>Punch for precision — never at the cost of emotion</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Double Strategy
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs">
                <li>Tight doubles for crisp pop/trap layers</li>
                <li>Loose doubles for width, vibe, and character</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Ad-Libs &amp; Punching
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs">
                <li>Ad-libs: free-flow, character-driven improvisation</li>
                <li>Record multiple passes, pick best moments</li>
                <li>For punches, include pre-roll and punch slightly before the mistake</li>
                <li>Keep phrasing continuous so it composes smoothly</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
            <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Tutorial • Vocal Recording Workflow
            </div>
            <div className="aspect-video w-full">
              <video
                className="h-full w-full rounded-b-2xl"
                controls
                src="/assets/music-production/vocal-production/tutorials/vocal-recording.mp4"
              />
            </div>
          </div>
        </section>

{/* 6. LYRICS & MELODY DEVELOPMENT */}
<section className="space-y-8">
  <header className="space-y-2">
    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
      Section 6
    </p>
    <h2 className="text-lg font-semibold text-emerald-50">
      6. Lyrics &amp; Melody Development
    </h2>
    <p>
      Writing lyrics and melodies is often the hardest part for new producers —
      but it doesn’t have to be. These workflows break the process into simple,
      repeatable steps that work even if you don’t consider yourself a singer.
    </p>
  </header>

  {/* 6.1 THE “MUMBLE TRACK” METHOD */}
  <section className="grid gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1.3fr)] md:items-start">
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-emerald-100">
        6.1 The “Mumble Track” Method
      </h3>
      <p className="text-xs text-slate-300">
        Used by top-liners everywhere to discover melodies without pressure:
      </p>
      <ul className="ml-4 list-disc space-y-1">
        <li>Loop the beat</li>
        <li>Hum or mumble vowel sounds</li>
        <li>Explore rhythm and pitch shapes</li>
        <li>Record 5–10 passes</li>
        <li>Listen back and mark favorite moments</li>
        <li>Replace vowel sounds with real words</li>
        <li>Melody first → lyrics second</li>
      </ul>
    </div>

    <figure className="overflow-hidden rounded-2xl border border-slate-800/80 bg-black/80">
      <div className="border-b border-slate-800/80 bg-slate-900/70 px-4 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
          Watch · Mumble Track Demo
        </p>
      </div>
      <div className="relative aspect-video w-full">
        {/* Use the same YouTube video you already had for this section */}
        <iframe
          src="https://www.youtube.com/embed/VIDEO_ID_61"
          title="Mumble track demo"
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </figure>
  </section>

  {/* 6.2 MELODY-FIRST WORKFLOW (MEDIA LEFT, TEXT RIGHT) */}
  <section className="grid gap-6 md:grid-cols-[minmax(0,1.3fr),minmax(0,1.4fr)] md:items-start">
    <figure className="overflow-hidden rounded-2xl border border-slate-800/80 bg-black/80 md:order-1">
      <div className="border-b border-slate-800/80 bg-slate-900/70 px-4 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
          Watch · Melody-First Writing
        </p>
      </div>
      <div className="relative aspect-video w-full">
        {/* Use the same melody-writing YouTube video you already had */}
        <iframe
          src="https://www.youtube.com/embed/VIDEO_ID_62"
          title="How to write a vocal melody"
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </figure>

    <div className="space-y-3 md:order-2">
      <h3 className="text-sm font-semibold text-emerald-100">
        6.2 Melody-First Workflow
      </h3>
      <p>
        Melody-first means you focus on the shape and rhythm of the vocal line
        before worrying about perfect lyrics. This keeps ideas musical and
        prevents “diary entry over a beat” syndrome.
      </p>
      <p className="text-xs text-slate-300">Rules of thumb for strong melodies:</p>
      <ul className="ml-4 list-disc space-y-1">
        <li>Hooks use simple, repeatable shapes</li>
        <li>Verses can explore more movement</li>
        <li>Repetition = catchiness</li>
        <li>Contrast between sections makes songs memorable</li>
      </ul>
    </div>
  </section>

  {/* 6.3 RHYTHM-FIRST WORKFLOW (TEXT LEFT, MEDIA RIGHT) */}
  <section className="grid gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1.3fr)] md:items-start">
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-emerald-100">
        6.3 Rhythm-First Workflow (Rap &amp; Melodic Trap)
      </h3>
      <p>
        Perfect for rappers and melodic trap writers who think in flows before
        notes. You treat the voice almost like a drum part, then layer pitch on
        top if you want.
      </p>
      <ul className="ml-4 list-disc space-y-1">
        <li>Tap rhythms with your hands or voice</li>
        <li>Speak cadences and flows over the beat</li>
        <li>Create “vocal groove” patterns that lock with the drums</li>
        <li>Add pitch later — or keep it mostly spoken</li>
      </ul>
    </div>

    <figure className="overflow-hidden rounded-2xl border border-slate-800/80 bg-black/80">
      <div className="border-b border-slate-800/80 bg-slate-900/70 px-4 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
          Watch · Rhythm-First Writing
        </p>
      </div>
      <div className="relative aspect-video w-full">
        {/* Use the same rhythm-writing YouTube video you already had */}
        <iframe
          src="https://www.youtube.com/embed/VIDEO_ID_63"
          title="Rhythm-first songwriting"
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </figure>
  </section>

  {/* 6.4 LYRIC BRAINSTORMING (MEDIA LEFT, TEXT RIGHT) */}
  <section className="grid gap-6 md:grid-cols-[minmax(0,1.3fr),minmax(0,1.4fr)] md:items-start">
    <figure className="overflow-hidden rounded-2xl border border-slate-800/80 bg-black/80 md:order-1">
      <div className="border-b border-slate-800/80 bg-slate-900/70 px-4 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
          Watch · Lyric Brainstorming
        </p>
      </div>
      <div className="relative aspect-video w-full">
        {/* Use the same lyric-brainstorming YouTube video you already had */}
        <iframe
          src="https://www.youtube.com/embed/VIDEO_ID_64"
          title="Lyric brainstorming exercises"
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </figure>

    <div className="space-y-3 md:order-2">
      <h3 className="text-sm font-semibold text-emerald-100">
        6.4 Lyric Brainstorming (Zero Pressure)
      </h3>
      <p>
        Treat brainstorming like sketching — lots of ideas, no judgment. You’re
        collecting raw material, not writing the final poem.
      </p>
      <ul className="ml-4 list-disc space-y-1">
        <li>Make lists of emotions, images, and phrases</li>
        <li>Add sensory details and contradictions</li>
        <li>Pull from personal notes, journals, and interesting words</li>
        <li>Circle the ideas with the strongest emotional pull</li>
      </ul>
    </div>
  </section>

  {/* --- Your 6.5 section (if you have one) can stay here as-is --- */}

  {/* 6.6 AI-ASSISTED WRITING */}
  <section className="grid gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1.3fr)] md:items-start">
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-emerald-100">
        6.6 AI-Assisted Writing (Ethical, Creative, Helpful)
      </h3>
      <p>
        AI can be a powerful writing partner when you treat it like a
        collaborator, not a ghost-writer. Used well, it helps you move faster,
        explore options, and beat writer’s block — while you stay in control of
        the story and voice.
      </p>

      <p className="text-xs font-semibold text-emerald-100">Good ways to use AI:</p>
      <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
        <li>Lyric variations: ask for 5–10 alternate ways to say one idea</li>
        <li>Section rewrites: simplify or clarify a verse or pre-chorus</li>
        <li>Metaphor &amp; imagery: brainstorm visual ways to describe a feeling</li>
        <li>Rhyme &amp; phrasing: keep your rhythm but change the rhymes</li>
      </ul>

      <p className="text-xs font-semibold text-emerald-100">Keep it ethical &amp; real:</p>
      <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
        <li>Don’t imitate specific artists or real people</li>
        <li>Always rewrite AI output into your own voice</li>
        <li>Use it as a sketch tool — you decide what stays</li>
      </ul>
    </div>

    <figure className="overflow-hidden rounded-2xl border border-slate-800/80 bg-black/80">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src="/assets/music-production/vocal-production/images/ai-writing.jpg"
          alt="Producer collaborating with an AI assistant"
          fill
          className="object-cover"
        />
      </div>
    </figure>
  </section>

  {/* 6.7 AI VOICE TOOLS & CLONES */}
  <section className="grid gap-6 md:grid-cols-[minmax(0,1.3fr),minmax(0,1.4fr)] md:items-start">
    <figure className="overflow-hidden rounded-2xl border border-slate-800/80 bg-black/80 md:order-1">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src="/assets/music-production/vocal-production/images/ai-voice-lab.jpg"
          alt="Abstract AI vocal lab artwork"
          fill
          className="object-cover"
        />
      </div>
    </figure>

    <div className="space-y-3 md:order-2">
      <h3 className="text-sm font-semibold text-emerald-100">
        6.7 AI Voice Tools &amp; Clones (Optional / Experimental)
      </h3>
      <p>
        AI voice tools are evolving quickly — voice models, clones, and
        generative harmonies are everywhere. In this course we treat them as
        sketch tools, not replacements for real singers.
      </p>

      <p className="text-xs font-semibold text-emerald-100">
        Possible uses in a learning context:
      </p>
      <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
        <li>Scratch vocals before a singer cuts the final take</li>
        <li>Quick harmony ideas you’ll later re-record with a real voice</li>
        <li>Testing different vocal tones while writing (breathy, powerful, dark)</li>
      </ul>

      <p className="text-xs font-semibold text-emerald-100">
        Tools to explore (for homework / experiments):
      </p>
      <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
        <li>
          <span className="font-semibold">Kits.AI</span> – upload melodies and
          test different AI “singer” tones.
        </li>
        <li>
          <span className="font-semibold">Voicemod / real-time voice FX</span> –
          experiment with character voices and textures while writing.
        </li>
        <li>
          <span className="font-semibold">Pitch / tone tools in your DAW</span> –
          Flex Pitch, Melodyne, Auto-Tune, etc. for shaping performance, not
          cloning.
        </li>
      </ul>

      <p className="text-xs font-semibold text-emerald-100">Non-negotiable rules:</p>
      <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
        <li>Never clone a voice without clear permission</li>
        <li>Be honest about what is AI vs. real</li>
        <li>
          Treat AI vocals more like a synth or sound-design layer than a human
          performance
        </li>
      </ul>
    </div>
  </section>
</section>

        {/* 7. PERFORMANCE PSYCHOLOGY */}
        <section className="space-y-6">
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 7
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              7. Performance Psychology in Vocal Sessions
            </h2>
          </header>

          <p>
            A vocal session is as much about emotion and trust as it is about
            microphones and plugins. As the producer — even if you&apos;re
            self-producing — your job is to protect the vibe and keep the
            artist in a creative headspace.
          </p>

          {/* 7.1 */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              7.1 Mindset for Singers
            </h3>
            <ul className="ml-4 list-disc space-y-1">
              <li>
                Aim for <span className="font-semibold">emotion first</span>,
                then clarity.
              </li>
              <li>Treat takes as experiments, not pass/fail tests.</li>
              <li>Normalize mistakes — they&apos;re part of the process.</li>
              <li>Celebrate small wins: great phrases, lines, or moments.</li>
            </ul>
            <p className="text-xs font-semibold text-emerald-100">
              Helpful phrases:
            </p>
            <ul className="ml-4 list-disc space-y-1 text-xs">
              <li>&quot;That one had the emotion — let&apos;s get one more.&quot;</li>
              <li>
                &quot;Keep that same feeling, just lean a little closer to the
                mic.&quot;
              </li>
              <li>&quot;We&apos;re just exploring options, nothing has to be perfect.&quot;</li>
            </ul>
          </section>

          {/* 7.2 */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              7.2 Coaching Non-Singers &amp; Rappers
            </h3>
            <p>
              Many artists say, &quot;I&apos;m not really a singer.&quot; You can
              still capture powerful performances by reducing pressure and
              breaking the process into tiny steps.
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Record one line at a time or even half-lines.</li>
              <li>Let them speak phrases in rhythm before worrying about pitch.</li>
              <li>Use call-and-response: you sing or play it, they copy it.</li>
              <li>
                Focus on character, phrasing, and attitude more than perfect
                notes.
              </li>
            </ul>
          </section>

          {/* 7.3 */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              7.3 Body Language &amp; Taking Up Space
            </h3>
            <p>
              The body is part of the instrument. A stiff body usually equals a
              stiff vocal.
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Encourage grounded feet and open posture.</li>
              <li>Allow light movement, gestures, and dancing between phrases.</li>
              <li>
                Adjust the room: lighting, number of people, reverb in the
                headphones.
              </li>
            </ul>
          </section>
        </section>

        {/* 8. EDITING & COMPING */}
        <section className="space-y-6">
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 8
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              8. Editing &amp; Comping
            </h2>
          </header>

          <p>
            Comping is where raw takes become a single, intentional performance.
            The goal isn&apos;t to sand off all humanity — it&apos;s to choose
            the takes that best tell the story.
          </p>

          {/* 8.1 */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              8.1 Comping Philosophy
            </h3>
            <ul className="ml-4 list-disc space-y-1">
              <li>
                Start with phrases, not syllables — keep musical shapes intact.
              </li>
              <li>Let 1–2 emotional takes be the spine of the comp.</li>
              <li>Use surgical swaps only where something really bothers you.</li>
              <li>Listen with eyes closed to check if the arc feels natural.</li>
            </ul>
          </section>

          {/* 8.2 */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              8.2 Practical Comp Workflow
            </h3>
            <ul className="ml-4 list-disc space-y-1">
              <li>Label or star strong takes while recording.</li>
              <li>Build a rough comp quickly from your favourite passes.</li>
              <li>Refine line by line, then word by word only if needed.</li>
              <li>Crossfade edits so transitions are seamless.</li>
            </ul>
          </section>

          {/* 8.3 */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              8.3 Common Comping Mistakes
            </h3>
            <ul className="ml-4 list-disc space-y-1">
              <li>Over-comping until the performance feels robotic.</li>
              <li>Chasing tiny tuning issues instead of fixing the melody.</li>
              <li>Ignoring breaths, which makes edits feel unnatural.</li>
              <li>Forgetting that the &quot;messy but emotional&quot; take wins.</li>
            </ul>
          </section>
        </section>

        {/* 9. VOCAL LAYERING */}
        <section className="space-y-6">
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 9
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              9. Vocal Layering
            </h2>
          </header>

          <p>
            Layering gives modern vocals width, power, and depth without simply
            turning the lead up. Think in roles: lead, doubles, harmonies,
            textures.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                9.1 Lead Vocal
              </p>
              <p className="text-xs text-slate-300">
                The star of the show. Keep it centered, clear, and emotionally
                honest. Every other layer exists to support this performance.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                9.2 Doubles
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs">
                <li>Tight doubles for crisp, pop/trap precision.</li>
                <li>Looser doubles for width and grit.</li>
                <li>Use mostly in hooks and key lines, not entire verses.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                9.3 Harmonies
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs">
                <li>Start with 3rds above/below, then experiment.</li>
                <li>Use more harmonies in hooks, pre-choruses, and outros.</li>
                <li>Keep them supporting the lead — not competing with it.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                9.4 Ad-Libs &amp; Textures
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs">
                <li>Ad-libs react to or emphasize key lines.</li>
                <li>
                  Textures: whispers, octaves, vocoders, shouts layered for
                  character.
                </li>
                <li>Leave silence — not every bar needs a fill.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 10. INTRO TO VOCAL FX CHAINS */}
        <section className="space-y-6">
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 10
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              10. Intro to Vocal FX Chains
            </h2>
          </header>

          <p>
            We&apos;ll go deeper on mixing later. For now, you just need a clean,
            musical starting chain that lets your vocal feel intentional in a
            rough mix.
          </p>

          {/* 10.1 */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              10.1 Basic Serial Chain
            </h3>
            <ul className="ml-4 list-disc space-y-1">
              <li>High-pass EQ to remove rumble.</li>
              <li>Compression to keep levels steady and forward.</li>
              <li>De-esser to smooth harsh &quot;S&quot; and &quot;T&quot; sounds.</li>
              <li>Gentle tone EQ for brightness or warmth.</li>
              <li>Optional saturation for density and vibe.</li>
            </ul>
          </section>

          {/* 10.2 */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              10.2 Sends &amp; Parallels
            </h3>
            <p>
              Use sends instead of stacking every effect directly on the vocal
              track:
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Reverb sends for shared space across the mix.</li>
              <li>Delay sends for throw moments and groove.</li>
              <li>Parallel compression for energy without crushing the lead.</li>
            </ul>
          </section>

          {/* 10.3 */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              10.3 Creative FX Ideas
            </h3>
            <ul className="ml-4 list-disc space-y-1">
              <li>Throw delays on the last word of a phrase.</li>
              <li>Telephone / lo-fi filters for intros and breakdowns.</li>
              <li>Tuned or hard Auto-Tune as a deliberate stylistic effect.</li>
              <li>
                Vocoder or harmony FX to turn the voice into a synth-like pad.
              </li>
            </ul>
          </section>
        </section>

        {/* 11. PREPARING VOCALS FOR MIXING */}
        <section className="space-y-6">
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 11
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              11. Preparing Vocals for Mixing
            </h2>
          </header>

          <p>
            Before you or a mix engineer starts dialing in a final mix, prepping
            your vocals saves time and keeps the song feeling intentional.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="text-xs font-semibold text-emerald-200">
                Gain Leveling
              </p>
              <ul className="ml-4 mt-1 list-disc space-y-1 text-xs">
                <li>Use clip gain to tame extreme loud/soft moments.</li>
                <li>Aim for reasonably consistent levels into compressors.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="text-xs font-semibold text-emerald-200">
                Noise Cleanup
              </p>
              <ul className="ml-4 mt-1 list-disc space-y-1 text-xs">
                <li>Cut long silences and obvious headphone bleed.</li>
                <li>Fade region edges to avoid clicks and pops.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="text-xs font-semibold text-emerald-200">
                Organization
              </p>
              <ul className="ml-4 mt-1 list-disc space-y-1 text-xs">
                <li>Group tracks: Leads, Doubles, Harmonies, Ad-libs.</li>
                <li>Color-code and label clearly.</li>
                <li>
                  Commit comps and main tuning decisions before exporting.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="text-xs font-semibold text-emerald-200">
                Exporting Stems
              </p>
              <ul className="ml-4 mt-1 list-disc space-y-1 text-xs">
                <li>Export at 24-bit (or higher) with no clipping.</li>
                <li>Start all stems at the same bar/time.</li>
                <li>Include a rough mix so the vision is clear.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 12. APPLYING TO YOUR PROJECT TRACK */}
        <section className="space-y-6">
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 12
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              12. Applying This to Your Project Track
            </h2>
          </header>

          <p>
            This week, you&apos;ll turn your instrumental into a real song by
            finishing your vocal performance and production.
          </p>

          <ul className="ml-4 list-disc space-y-1">
            <li>Record a complete lead vocal for your track.</li>
            <li>Add at least one layer: doubles, harmonies, or ad-libs.</li>
            <li>Build a simple vocal chain for your rough mix.</li>
            <li>Do a basic comp of your favourite takes.</li>
            <li>Clean and organize your vocal session.</li>
          </ul>

          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-50">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Project Checklist • Vocal Blueprint
            </p>
            <ul className="mt-2 ml-4 list-disc space-y-1">
              <li>One main lead comp from start to finish.</li>
              <li>At least one supporting layer (double, harmony, or ad-libs).</li>
              <li>Rough-mix ready FX chain on the lead.</li>
              <li>Session organized for future mixing.</li>
            </ul>
          </div>
        </section>

        {/* 13. HOMEWORK */}
        <section className="space-y-6">
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 13
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              13. Homework: Vocal Performance &amp; Production
            </h2>
          </header>

          <p>Due Sunday by midnight.</p>

          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-50">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Homework • Vocal Performance &amp; Production
            </p>

            <div className="mt-3 space-y-4">
              <div>
                <p className="mb-1 font-semibold text-emerald-100">
                  Submit the following:
                </p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Final lead vocal comp for your track.</li>
                  <li>
                    At least one additional layer (double, harmony, or ad-libs).
                  </li>
                  <li>
                    A rough mix bounce with your vocal FX chain engaged (MP3 or
                    WAV).
                  </li>
                </ul>
              </div>

              <div>
                <p className="mb-1 font-semibold text-emerald-100">
                  Short Reflection
                </p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>What emotion were you aiming for with this vocal?</li>
                  <li>Which recording or coaching approach helped the most?</li>
                  <li>
                    What layering or FX choices made the biggest difference?
                  </li>
                  <li>
                    What would you like to try differently on the next song?
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
