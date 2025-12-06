/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Image from "next/image";

type ZoomedImage = {
  src: string;
  alt: string;
} | null;

export default function MixingFundamentalsChapter() {
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
                src="/assets/music-production/mixing/images/mixing-bkgrnd.jpg"
                alt="Mix engineer at a console"
                fill
                priority
                className="object-cover brightness-[0.35]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/70 to-black/95" />
              <div className="relative z-10 flex h-full flex-col justify-end gap-2 p-5 md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
                  Chapter 8
                </p>
                <h1 className="text-2xl font-semibold text-emerald-50 md:text-3xl">
                  MIXING FUNDAMENTALS
                </h1>
                <p className="text-[11px] text-emerald-100/80">
                  Shaping Your Track Into a Professional, Balanced Record
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 1. INTRODUCTION */}
        <section className="space-y-6">
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 1
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              1. Introduction: What Mixing Really Is
            </h2>
          </header>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1.6fr),minmax(0,1.2fr)] md:items-start">
            <div className="space-y-3">
              <p>
                Mixing is the art of shaping all the individual elements of your
                song — vocals, drums, bass, instruments, and FX — so they work
                together as one emotional experience. A great mix doesn’t just
                sound good; it feels good. It guides the listener’s ear,
                highlights the most important moments, and supports the emotion
                behind your song.
              </p>
              <p>
                Mixing is not mastering, and it’s not sound design. It’s the
                stage where everything you’ve created gets balanced, polished,
                and sculpted into something intentional.
              </p>
              <p className="text-xs text-slate-300">
                Think of it like this:
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                <li>Writing is your idea.</li>
                <li>Production is your arrangement and sonic palette.</li>
                <li>Vocal production is your emotional performance.</li>
                <li>Mixing is the glue that locks it all together.</li>
              </ul>
              <p>
                In this chapter, we’ll walk through the fundamental concepts
                behind mixing—gain staging, balancing, panning, EQ, compression,
                space, bus processing, automation—and show you how to apply them
                to the track you’ve been building throughout the course.
              </p>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <button
                type="button"
                onClick={() =>
                  handleZoom(
                    "/assets/music-production/mixing/images/ssl-mixing.jpg",
                    "Engineer mixing on an SSL console"
                  )
                }
                className="block w-full"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/assets/music-production/mixing/images/ssl-mixing.jpg"
                    alt="SSL mixing console"
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
              </button>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Mixing is where all your ideas get shaped into a finished record.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 2. SESSION PREPARATION & ORGANIZATION */}
        <section className="space-y-6">
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 2
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              2. Session Preparation &amp; Organization
            </h2>
          </header>

          <p>
            Before any mixing can happen, your session needs to be clean and
            organized. Most professional mixers spend 10–20% of their time
            simply making sure the session is structured correctly. Organization
            saves time, reduces confusion, and helps you stay focused on
            creativity rather than logistics.
          </p>

          {/* 2.1 Track Naming & Color Coding */}
          <section className="grid gap-6 md:grid-cols-[minmax(0,1.6fr),minmax(0,1.2fr)] md:items-center">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-emerald-100">
                2.1 Track Naming &amp; Color Coding
              </h3>
              <p>
                Give every track a clear, simple name so you always know what
                you’re looking at — especially when you come back to a session
                days later.
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                <li>Kick</li>
                <li>Snare Top</li>
                <li>808 Sub</li>
                <li>Lead Vocal</li>
                <li>Harmony L / Harmony R</li>
                <li>Pad Main</li>
              </ul>
              <p className="text-xs text-slate-300">
                Group by color so your eye can instantly find what you need:
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                <li>Drums = one color</li>
                <li>Bass = another</li>
                <li>Vocals = another</li>
                <li>Instruments = their own families</li>
              </ul>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <button
                type="button"
                onClick={() =>
                  handleZoom(
                    "/assets/music-production/mixing/images/track-names.png",
                    "DAW session with organized track names"
                  )
                }
                className="block w-full"
              >
                <div className="relative aspect-[4/3] w-full">
                  <img
                    src="/assets/music-production/mixing/images/track-names.png"
                    alt="Track naming example"
                    className="h-auto w-full rounded-xl object-contain"
                  />
                </div>
              </button>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Clean names and colors make big sessions feel manageable.
              </figcaption>
            </figure>
          </section>

          {/* 2.2 Routing & Foldering */}
          <section className="grid gap-6 md:grid-cols-[minmax(0,1.3fr),minmax(0,1.5fr)] md:items-center">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-emerald-100">
                2.2 Routing &amp; Foldering
              </h3>
              <p>
                Create folders and buses so related sounds move together. This
                makes processing easier and gives your mix structure.
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                <li>Drum Bus</li>
                <li>Vocal Bus</li>
                <li>FX Bus</li>
                <li>Instrument Bus</li>
              </ul>
              <p>
                All major elements should flow into logical groups — you’ll be
                able to shape the whole drum kit or full vocal stack with just a
                few moves.
              </p>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <button
                type="button"
                onClick={() =>
                  handleZoom(
                    "/assets/music-production/mixing/images/folders.png",
                    "Folder and bus routing in a DAW"
                  )
                }
                className="block w-full"
              >
                <div className="relative aspect-[4/3] w-full">
                  <img
                    src="/assets/music-production/mixing/images/folders.png"
                    alt="Folder routing example"
                    className="h-auto w-full rounded-xl object-contain"
                  />
                </div>
              </button>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Folder tracks and buses keep complex mixes under control.
              </figcaption>
            </figure>
          </section>

          {/* 2.3 / 2.4 Cleaning & Gain Staging */}
          <section className="grid gap-6 md:grid-cols-2 md:items-start">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-emerald-100">
                2.3 Cleaning Noise &amp; Artifacts
              </h3>
              <ul className="ml-4 list-disc space-y-1">
                <li>Cut empty space between clips.</li>
                <li>Remove clicks, pops, headphone bleed, and unwanted breaths.</li>
                <li>Create clean crossfades so edits are invisible.</li>
              </ul>

              <h3 className="pt-2 text-sm font-semibold text-emerald-100">
                2.4 Gain Staging
              </h3>
              <p>
                Gain staging is the foundation of every good mix. The idea is
                simple:
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                <li>Pull clip gain down so tracks peak around –12 to –6 dB.</li>
                <li>Avoid clipping your plugins or buses.</li>
                <li>Leave headroom for processing and mastering.</li>
              </ul>
              <p>
                When your gain staging is clean, everything else becomes easier.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
              <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Tutorial • All Group Clip Gain
              </div>
              <div className="aspect-video w-full">
                <video
                  className="h-full w-full rounded-b-2xl"
                  controls
                  src="/assets/music-production/mixing/tutorials/gain-stage.mp4"
                />
              </div>
            </div>
          </section>
        </section>

        {/* 3. THE ROUGH BALANCE */}
        <section className="space-y-6">
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 3
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              3. The Rough Balance (The Heart of Mixing)
            </h2>
          </header>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr),minmax(0,1.3fr)] md:items-start">
            <div className="space-y-4">
              <p>
                The rough balance is the most important part of the mix. If your
                fader and panning balance is strong, your mix will already sound
                60–70% finished before you touch a plugin.
              </p>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-emerald-100">
                  3.1 Start With Every Fader Down
                </h3>
                <p>
                  Begin from silence. Bring in one element at a time, starting
                  with the core of the song.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-emerald-100">
                  3.2 Build From the Foundation
                </h3>
                <p className="text-xs text-slate-300">
                  Most modern mixes start with:
                </p>
                <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                  <li>Drums</li>
                  <li>Bass</li>
                  <li>Vocals</li>
                </ul>
                <p className="text-xs text-slate-300">
                  Then bring in instruments, pads and textures, FX, background
                  vocals, risers, and transitions.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-emerald-100">
                  3.3 Emotional Balance
                </h3>
                <p>
                  Ask yourself:
                </p>
                <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                  <li>What should the listener focus on right now?</li>
                  <li>What emotion do I want this section to convey?</li>
                  <li>Does the mix feel too crowded or too empty?</li>
                </ul>
                <p>Balance is emotional, not just technical.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-emerald-100">
                  3.4 Panning Basics
                </h3>
                <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                  <li>Keep core elements centered: kick, snare, bass, lead vocal.</li>
                  <li>Spread supporting elements left and right.</li>
                  <li>Use symmetry for clean, wide mixes.</li>
                  <li>Use asymmetry for character and personality.</li>
                </ul>
                <p>
                  Panning helps you avoid EQ problems by giving each sound its
                  own space.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
              <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Tutorial • Building a Rough Mix
              </div>
              <div className="aspect-video w-full">
                <video
                  className="h-full w-full rounded-b-2xl"
                  controls
                  src="/assets/music-production/mixing/tutorials/rough-mix.mp4"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. EQ BASICS — TONE SHAPING 101 */}
        <section className="space-y-6">
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 4
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              4. EQ Basics — Tone Shaping 101
            </h2>
          </header>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1.6fr),minmax(0,1.1fr)] md:items-start">
            <div className="space-y-3">
              <p>
                EQ (equalization) is one of your most powerful tools. It lets
                you shape tone, create clarity, remove muddiness, and help each
                instrument sit in its own frequency space.
              </p>

              <h3 className="text-sm font-semibold text-emerald-100">
                4.1 High-Pass Filters (HPF)
              </h3>
              <p>
                High-pass filters remove low-end rumble and clean up space for
                the kick and bass. Apply HPF to:
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                <li>Vocals</li>
                <li>Guitars</li>
                <li>Synths &amp; pads</li>
                <li>Overheads</li>
                <li>FX and atmospheric sounds</li>
              </ul>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <button
                type="button"
                onClick={() =>
                  handleZoom(
                    "/assets/music-production/mixing/images/EQ.png",
                    "EQ curve screenshot"
                  )
                }
                className="block w-full"
              >
                <div className="relative aspect-[4/3] w-full">
                  <img
                    src="/assets/music-production/mixing/images/EQ.png"
                    alt="EQ plugin interface"
                    className="h-auto w-full rounded-xl object-contain"
                  />
                </div>
              </button>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                EQ is about fitting all the sounds together, not solo perfection.
              </figcaption>
            </figure>
          </div>

          {/* EQ TIP CARDS */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Removing Mud
              </p>
              <p className="text-xs">
                The “mud zone” lives roughly between 200–500 Hz. A small dip
                here can bring clarity to almost any track.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Controlling Harshness
              </p>
              <p className="text-xs">
                Harshness usually shows up around 2–5 kHz. A gentle dip can
                soften unpleasant edges, especially on vocals and synths.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Adding Air
              </p>
              <p className="text-xs">
                A gentle boost above 10 kHz can create sparkle, sheen, and
                openness — especially on vocals, cymbals, and pads.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Subtractive First, Additive Last
              </p>
              <p className="text-xs">
                Subtracting problem frequencies generally sounds more natural
                than boosting. Cut before you add.
              </p>
            </div>
          </div>

          {/* 4.6 EQ for Different Elements */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              4.6 EQ for Different Elements
            </h3>
            <p className="text-xs text-slate-300">
              Use these as starting points, then trust your ears and the song.
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              {/* Vocals */}
              <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/assets/music-production/mixing/images/vocals.jpg"
                    alt="Singer in the studio"
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-[11px] font-semibold text-emerald-100">
                  Vocals
                </figcaption>
                <p className="mt-1 text-[11px] text-slate-300">
                  HPF, remove mud, tame harshness, then add a bit of air if
                  needed.
                </p>
              </figure>

              {/* Drums */}
              <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/assets/music-production/mixing/images/drums.jpg"
                    alt="Drum kit"
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-[11px] font-semibold text-emerald-100">
                  Drums
                </figcaption>
                <p className="mt-1 text-[11px] text-slate-300">
                  Shape punch and brightness. Let the kick and snare lead, clean
                  up low-mid mud.
                </p>
              </figure>

              {/* Synths / Pads */}
              <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/assets/music-production/mixing/images/synth.jpg"
                    alt="Synthesizer"
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-[11px] font-semibold text-emerald-100">
                  Synths &amp; Pads
                </figcaption>
                <p className="mt-1 text-[11px] text-slate-300">
                  Carve space around the vocal. High-pass generously and remove
                  clashing mids.
                </p>
              </figure>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Bass */}
              <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/assets/music-production/mixing/images/bass.jpg"
                    alt="Bass instrument"
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-[11px] font-semibold text-emerald-100">
                  Bass
                </figcaption>
                <p className="mt-1 text-[11px] text-slate-300">
                  Control low-mid mud, define the fundamental, and keep it out
                  of the vocal’s way.
                </p>
              </figure>

              {/* Kick */}
              <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/assets/music-production/mixing/images/kick.jpg"
                    alt="Kick drum"
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-[11px] font-semibold text-emerald-100">
                  Kick
                </figcaption>
                <p className="mt-1 text-[11px] text-slate-300">
                  Boost lows for weight, dip boxiness, and shape the click for
                  clarity in the mix.
                </p>
              </figure>
            </div>
          </section>
        </section>

        {/* 5. COMPRESSION BASICS */}
        <section className="space-y-6">
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 5
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              5. Compression Basics — Controlling Dynamics
            </h2>
          </header>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1.6fr),minmax(0,1.1fr)] md:items-start">
            <div className="space-y-3">
              <p>
                Compression controls dynamics — how loud or soft a sound is over
                time. It can add punch, control, sustain, smoothness, and
                character.
              </p>

              <h3 className="text-sm font-semibold text-emerald-100">
                5.1 What Compression Actually Does
              </h3>
              <p>
                Compression turns down the loud parts so you can turn up the
                whole signal. By reducing peaks and controlling dynamic swings,
                the vocal or instrument becomes more stable, more consistent,
                and easier to place in a mix.
              </p>
              <p className="text-xs text-slate-300">
                Good compression doesn’t flatten a performance; it supports it.
                It keeps quiet words audible, keeps loud moments under control,
                and lets the sound sit confidently in the track.
              </p>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <button
                type="button"
                onClick={() =>
                  handleZoom(
                    "/assets/music-production/mixing/images/compressor.jpg",
                    "Outboard compressor gear"
                  )
                }
                className="block w-full"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/assets/music-production/mixing/images/compressor.png"
                    alt="Compressor hardware"
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
              </button>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Compression shapes the feel and stability of your tracks.
              </figcaption>
            </figure>
          </div>

          {/* Compression diagram */}
          <section className="grid gap-6 md:grid-cols-2 md:items-center">
            <div className="space-y-3">
              <p>
                When a singer gets loud on certain words or soft on others, the
                performance can feel uneven. Compression smooths those
                differences so the vocal stays upfront and emotionally steady —
                without constant fader riding.
              </p>
              <p>
                In modern music—pop, hip-hop, R&amp;B, electronic—compression
                isn’t optional. It’s part of the sound.
              </p>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <button
                type="button"
                onClick={() =>
                  handleZoom(
                    "/assets/music-production/mixing/diagrams/compression.jpg",
                    "Compression diagram"
                  )
                }
                className="block w-full"
              >
                <div className="relative aspect-[4/3] w-full">
                  <img
                    src="/assets/music-production/mixing/diagrams/compression.jpg"
                    alt="Diagram of compression"
                    className="h-auto w-full rounded-xl object-contain"
                  />
                </div>
              </button>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Compression reduces peaks so you can raise the overall level.
              </figcaption>
            </figure>
          </section>

          {/* 5.2 / 5.3 / 5.4 */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                5.2 Attack &amp; Release
              </h3>
              <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                <li>Fast attack: smooth, controlled (rap vocals, bass).</li>
                <li>Slow attack: punchy (drums, aggressive vocals).</li>
                <li>Fast release: energetic and lively.</li>
                <li>Slow release: smooth and relaxed.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                5.3 Parallel Compression
              </h3>
              <p className="text-xs">
                Blend a heavily compressed duplicate with the original. You get
                power and density without crushing the dynamics. Great on drums,
                vocals, and bass.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                5.4 Compression by Element
              </h3>
              <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                <li>Vocals: medium attack/release for control.</li>
                <li>Drums: slower attack for punch.</li>
                <li>Bass: faster attack for consistency.</li>
                <li>Pads: light compression for glue.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
            <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Tutorial • New York Parallel Compression
            </div>
            <div className="aspect-video w-full">
              <video
                className="h-full w-full rounded-b-2xl"
                controls
                src="/assets/music-production/mixing/tutorials/ny-compression.mp4"
              />
            </div>
          </div>
        </section>

        {/* 6. UNDERSTANDING SPACE */}
        <section className="space-y-6">
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 6
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              6. Understanding Space: Reverb, Delay &amp; Depth
            </h2>
          </header>

          <p>
            Space creates emotion. A dry vocal feels intimate; a washed-out
            vocal feels dreamy and distant. Reverb and delay help shape the mood
            of your track.
          </p>

          {/* 6.1 Reverb Types */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              6.1 Reverb Types
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Plate",
                  desc: "Bright, smooth, and dense — a classic choice for vocals.",
                },
                {
                  title: "Room",
                  desc: "Natural, small, intimate — feels like a band in a room.",
                },
                {
                  title: "Hall",
                  desc: "Large, lush, cinematic — perfect for big, emotional moments.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4"
                >
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    {card.title}
                  </p>
                  <p className="text-xs">{card.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 6.2 Delay Types */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              6.2 Delay Types
            </h3>
            <div className="grid gap-4 md:grid-cols-4">
              {[
                {
                  title: "Slapback",
                  desc: "Thickens rap and pop vocals without sounding like an obvious echo.",
                },
                {
                  title: "Quarter Note",
                  desc: "Adds space and groove that locks to the tempo.",
                },
                {
                  title: "Dotted Eighth",
                  desc: "Creates rhythmic movement around the beat.",
                },
                {
                  title: "Long Tails",
                  desc: "Use sparingly for dramatic words and emotional phrases.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4"
                >
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    {card.title}
                  </p>
                  <p className="text-xs">{card.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 6.3 Pre-Delay */}
          <section className="grid gap-6 md:grid-cols-2 md:items-center">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-emerald-100">
                6.3 Pre-Delay
              </h3>
              <p>
                Pre-delay separates the vocal from the reverb tail. More
                pre-delay = clearer vocal, because the words arrive before the
                wash of ambience.
              </p>
              <p className="text-xs text-slate-300">
                Use short pre-delay for intimate, blended sounds and longer
                pre-delay when you want the vocal to stay up-front even with big
                reverb.
              </p>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <button
                type="button"
                onClick={() =>
                  handleZoom(
                    "/assets/music-production/mixing/diagrams/use-space.jpg",
                    "Diagram showing use of space in a mix"
                  )
                }
                className="block w-full"
              >
                <div className="relative aspect-[4/3] w-full">
                  <img
                    src="/assets/music-production/mixing/diagrams/use-space.jpg"
                    alt="Use of space diagram"
                    className="h-auto w-full rounded-xl object-contain"
                  />
                </div>
              </button>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Use space intentionally — not every sound needs big reverb.
              </figcaption>
            </figure>
          </section>
        </section>

        {/* 7. BUS PROCESSING & GROUP CONTROL */}
        <section className="space-y-6">
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 7
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              7. Bus Processing &amp; Group Control
            </h2>
          </header>

          <p>
            Bus processing allows you to shape groups of tracks at once,
            creating cohesion and glue. Instead of EQing ten vocal tracks
            separately, you can treat the vocal bus and move them all together.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                7.1 Why Use Buses?
              </h3>
              <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                <li>Fewer plugins and cleaner sessions.</li>
                <li>Unified tone shaping across a whole group.</li>
                <li>Easier automation and muting.</li>
                <li>Better CPU performance.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                7.2 Vocal Bus
              </h3>
              <p className="text-xs">
                Add light compression, subtle EQ, and gentle saturation. The
                goal is to make all vocal layers feel like one performance.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                7.3 Drum &amp; Instrument Buses
              </h3>
              <p className="text-xs">
                Use glue compression and slight distortion on drums for power.
                Group pads, keys, and guitars so you can shape their tone
                together.
              </p>
            </div>
          </div>
        </section>

        {/* 8. AUTOMATION */}
        <section className="space-y-6">
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 8
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              8. Automation — Bringing the Mix to Life
            </h2>
          </header>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1.6fr),minmax(0,1.1fr)] md:items-start">
            <div className="space-y-3">
              <p>
                Automation is what makes a mix breathe. Static mixes feel flat;
                dynamic mixes feel alive.
              </p>

              <h3 className="text-sm font-semibold text-emerald-100">
                8.1 Vocal Volume Riding
              </h3>
              <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                <li>Ride vocals up as phrases fade.</li>
                <li>Dip them slightly during ad-libs or dense sections.</li>
                <li>Keep the story and emotion clear at all times.</li>
              </ul>

              <h3 className="pt-2 text-sm font-semibold text-emerald-100">
                8.2 FX &amp; Contrast
              </h3>
              <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                <li>Add reverb throws or timed delays on key words.</li>
                <li>Dry verses → wet hooks for contrast.</li>
                <li>Narrow verses → wide hooks for impact.</li>
                <li>Quieter pre-chorus → louder hook.</li>
              </ul>

              <h3 className="pt-2 text-sm font-semibold text-emerald-100">
                8.4 Movement &amp; Interest
              </h3>
              <p className="text-xs text-slate-300">
                Pan sweeps, filter sweeps, and frequency automation add depth
                and motion. Use them to highlight transitions and keep long
                sections engaging.
              </p>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <button
                type="button"
                onClick={() =>
                  handleZoom(
                    "/assets/music-production/mixing/images/automation.png",
                    "Automation lanes in a DAW"
                  )
                }
                className="block w-full"
              >
                <div className="relative aspect-[4/3] w-full">
                  <img
                    src="/assets/music-production/mixing/images/automation.png"
                    alt="Automation curves"
                    className="h-auto w-full rounded-xl object-contain"
                  />
                </div>
              </button>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Automation is the secret sauce that makes tracks feel alive.
              </figcaption>
            </figure>
          </div>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
            <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Tutorial • Automation for Dynamics &amp; FX
            </div>
            <div className="aspect-video w-full">
              <video
                className="h-full w-full rounded-b-2xl"
                controls
                src="/assets/music-production/mixing/tutorials/automation.mp4"
              />
            </div>
          </div>
        </section>

        {/* 9. MIXING THE LOW END */}
        <section className="space-y-6">
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 9
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              9. Mixing the Low End
            </h2>
          </header>

          <p>
            Low end is the hardest part of mixing, but also the most satisfying
            when done right. Here are key concepts to keep your subs powerful
            and controlled.
          </p>

          <section className="grid gap-6 md:grid-cols-[minmax(0,1.6fr),minmax(0,1.1fr)] md:items-start">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-emerald-100">
                9.1 Kick &amp; Bass Relationship
              </h3>
              <p>
                Choose who owns the sub: kick or bass. Use EQ or sidechain to
                create space so they’re not fighting for the same frequencies.
              </p>

              <h3 className="pt-2 text-sm font-semibold text-emerald-100">
                9.3 Avoiding Low-End Mud
              </h3>
              <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                <li>Cut everything that doesn’t need sub energy.</li>
                <li>
                  Let bass and kick dominate below roughly 100–120 Hz, not pads
                  or FX.
                </li>
              </ul>

              <h3 className="pt-2 text-sm font-semibold text-emerald-100">
                9.4 Phase Alignment
              </h3>
              <p className="text-xs text-slate-300">
                Phase issues can cause weak low end. Flip polarity or nudge
                timing on overlapping lows (kick vs. bass, multi-mic drums) to
                regain punch.
              </p>

              <h3 className="pt-2 text-sm font-semibold text-emerald-100">
                9.5 Reference Your Mix
              </h3>
              <p className="text-xs text-slate-300">
                Always compare your low end to professional tracks in a similar
                style. Don’t guess — reference.
              </p>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <button
                type="button"
                onClick={() =>
                  handleZoom(
                    "/assets/music-production/mixing/diagrams/kick-bass-sc.jpg",
                    "Kick and bass sidechain diagram"
                  )
                }
                className="block w-full"
              >
                <div className="relative aspect-[4/3] w-full">
                  <img
                    src="/assets/music-production/mixing/diagrams/kick-bass-sc.jpg"
                    alt="Sidechain compression diagram"
                    className="h-auto w-full rounded-xl object-contain"
                  />
                </div>
              </button>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Sidechain compression: the kick ducks the bass slightly for
                clarity and punch.
              </figcaption>
            </figure>
          </section>
        </section>

        {/* 10. MIX TRANSLATION */}
        <section className="space-y-6">
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 10
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              10. Mix Translation: Making It Sound Good Everywhere
            </h2>
          </header>

          <div className="grid gap-6 md:grid-cols-2 md:items-start">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-emerald-100">
                10.1 Device Checks
              </h3>
              <p>
                Your mix needs to sound good on more than studio monitors. Test
                on:
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                <li>Headphones &amp; earbuds</li>
                <li>Laptop speakers</li>
                <li>Phone</li>
                <li>Car</li>
                <li>Studio monitors</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-emerald-100">
                10.2 Fixing Issues &amp; Room Limitations
              </h3>
              <p className="text-xs text-slate-300">
                If a problem shows up on multiple systems, fix it in the mix:
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                <li>Boomy = reduce low mids.</li>
                <li>Harsh = dip 2–5 kHz.</li>
                <li>Muddy = clean 200–400 Hz.</li>
              </ul>
              <p className="text-xs text-slate-300">
                Remember: your room lies, especially if it’s untreated. Trust
                references and multiple device checks more than any single
                speaker.
              </p>
            </div>
          </div>
        </section>

        {/* 11. MIX WORKFLOW CHECKLIST */}
        <section className="space-y-6">
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 11
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              11. Putting It All Together — Your Mix Workflow
            </h2>
          </header>

          <p>
            Here is the complete workflow you’ll use for your assignment. Follow
            this checklist every time you mix.
          </p>

          <ol className="ml-4 list-decimal space-y-1 text-xs text-slate-300">
            <li>Prepare the session.</li>
            <li>Gain stage everything.</li>
            <li>Build your rough balance.</li>
            <li>Pan your elements.</li>
            <li>Apply EQ.</li>
            <li>Apply compression.</li>
            <li>Add reverb &amp; delay.</li>
            <li>Create buses.</li>
            <li>Add automation.</li>
            <li>Check translation on multiple devices.</li>
            <li>Bounce the mix.</li>
          </ol>
        </section>

        {/* 12. HOMEWORK */}
        <section className="space-y-6">
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Section 12
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              12. Homework — Mix Your Track
            </h2>
          </header>

          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Due Sunday at Midnight
            </p>
            <p className="mt-2">
              Using the workflow in this chapter, mix the track you’ve been
              building throughout the course.
            </p>

            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold text-emerald-100">
                  Submit:
                </p>
                <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                  <li>Your full mixed stereo .wav</li>
                  <li>
                    Optional: stems if you want deeper feedback during office
                    hours
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold text-emerald-100">
                  Reflection Paragraph:
                </p>
                <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                  <li>What did you learn?</li>
                  <li>What changed the most during the mix?</li>
                  <li>What still feels challenging?</li>
                </ul>
              </div>
            </div>

            <p className="mt-4 text-xs text-emerald-200">
              ✔️ Chapter 8 complete. Your track is now almost finished — next
              step is final bounce, polish, and delivery.
            </p>
          </div>
        </section>
      </article>

      {/* ZOOM OVERLAY */}
      {zoomedImage && (
        <button
          type="button"
          onClick={closeZoom}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <div className="relative max-h-[90vh] max-w-4xl">
            <img
              src={zoomedImage.src}
              alt={zoomedImage.alt}
              className="max-h-[90vh] w-full rounded-2xl object-contain"
            />
          </div>
        </button>
      )}
    </div>
  );
}
