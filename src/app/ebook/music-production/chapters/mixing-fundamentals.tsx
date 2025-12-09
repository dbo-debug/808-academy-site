/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

type ZoomedImage = {
  src: string;
  alt: string;
} | null;

export default function MixingFundamentalsChapter() {
  const [zoomedImage, setZoomedImage] = useState<ZoomedImage>(null);
  const [activeSample, setActiveSample] = useState<string | null>(null);
  const sampleAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleZoom = (src: string, alt: string) => {
    setZoomedImage({ src, alt });
  };

  const closeZoom = () => setZoomedImage(null);

  const playSample = (src: string) => {
    try {
      if (sampleAudioRef.current) {
        sampleAudioRef.current.pause();
      }
      const audio = new Audio(src);
      sampleAudioRef.current = audio;
      setActiveSample(src);
      audio.onended = () => setActiveSample((current) =>
        current === src ? null : current
      );
      void audio.play().catch(() => {});
    } catch {
      // ignore playback errors
    }
  };

  const reverbSamples = [
    {
      title: "Plate",
      desc: "Bright, smooth, dense — a classic choice for vocals.",
      src: "/assets/music-production/mixing/samples/reverb-plate.mp3",
    },
    {
      title: "Room",
      desc: "Natural, small, intimate — feels like a band in a room.",
      src: "/assets/music-production/mixing/samples/reverb-room.mp3",
    },
    {
      title: "Hall",
      desc: "Large, lush, cinematic — perfect for emotional moments.",
      src: "/assets/music-production/mixing/samples/reverb-hall.mp3",
    },
  ];

  const delaySamples = [
    {
      title: "Slapback",
      desc: "Thickens rap and pop vocals without obvious echoes.",
      src: "/assets/music-production/mixing/samples/delay-slap.mp3",
    },
    {
      title: "Quarter Note",
      desc: "Adds space and groove that locks to the tempo.",
      src: "/assets/music-production/mixing/samples/delay-quarter.mp3",
    },
    {
      title: "Dotted Eighth",
      desc: "Creates rhythmic movement around the beat.",
      src: "/assets/music-production/mixing/samples/delay-dotted.mp3",
    },
    {
      title: "Long Tail",
      desc: "Use sparingly for dramatic words and emotional phrases.",
      src: "/assets/music-production/mixing/samples/delay-long.mp3",
    },
  ];

  return (
    <div className="relative">
      <article className="space-y-10 text-sm text-slate-200">
        {/* HERO */}
        <section className="space-y-6">
          <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-black/80">
            <div className="absolute inset-0">
              <Image
                src="/assets/music-production/mixing/images/mixing-bkgrnd.jpg"
                alt="Mix engineer at a console"
                width={1600}
                height={1000}
                priority
                className="h-full w-full object-cover brightness-[0.32]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/40" />
            </div>

            <div className="relative z-10 flex flex-col justify-between gap-4 p-5 sm:p-7 md:p-10">
              <div className="space-y-2">
                <p className="inline-flex items-center rounded-full border border-emerald-500/40 bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                  Chapter 8
                </p>
                <h1 className="text-3xl font-semibold text-emerald-50 sm:text-4xl">
                  Mixing Fundamentals
                </h1>
                <p className="max-w-2xl text-sm text-emerald-100/90 sm:text-base">
                  Shaping your track into a balanced, emotional record with EQ,
                  compression, space, and automation.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-start">
                <aside className="rounded-2xl border border-slate-800/80 bg-black/70 p-4 text-xs text-slate-200 backdrop-blur">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Chapter Map
                  </p>
                  <ol className="mt-3 ml-4 list-decimal space-y-1.5 text-left">
                    <li>Introduction: What Mixing Really Is</li>
                    <li>Session Preparation &amp; Organization</li>
                    <li>The Rough Balance (The Heart of Mixing)</li>
                    <li>EQ Basics — Tone Shaping 101</li>
                    <li>Compression Basics — Controlling Dynamics</li>
                    <li>Understanding Space: Reverb, Delay &amp; Depth</li>
                    <li>Bus Processing &amp; Group Control</li>
                    <li>Automation — Bringing the Mix to Life</li>
                    <li>Mixing the Low End</li>
                    <li>Mix Translation: Making It Sound Good Everywhere</li>
                    <li>Putting It All Together — Your Mix Workflow</li>
                    <li>Homework — Mix Your Track</li>
                  </ol>
                </aside>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800/80 bg-black/70 p-3 text-xs text-slate-200 backdrop-blur">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      You&apos;ll Learn
                    </p>
                    <ul className="mt-1 ml-3 list-disc space-y-1">
                      <li>Session prep &amp; routing</li>
                      <li>EQ &amp; compression fundamentals</li>
                      <li>Space with reverb &amp; delay</li>
                      <li>Bus processing &amp; automation</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs text-emerald-50 backdrop-blur">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                      Big Idea
                    </p>
                    <p className="mt-1">
                      Mixing is storytelling with levels, tone, and space. Every
                      move should push emotion forward — not just technical polish.
                    </p>
                  </div>
                </div>
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
          <section className="grid gap-6 md:grid-cols-[minmax(0,1.2fr),minmax(0,1.4fr)] md:items-center">
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
                <div className="overflow-hidden rounded-xl border border-slate-800/70 bg-black">
                  <img
                    src="/assets/music-production/mixing/images/folders.png"
                    alt="Folder routing example"
                    className="block h-auto w-full object-contain"
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

          <div className="grid gap-6 md:grid-cols-[minmax(0,1.25fr),minmax(0,1fr)] md:items-start">
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

            <div className="grid gap-4 md:grid-cols-[minmax(0,1.2fr),minmax(0,0.9fr)] md:items-start">
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

              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    title: "Removing Mud",
                    body:
                      "The “mud zone” lives roughly between 200–500 Hz. A small dip here can bring clarity to almost any track.",
                  },
                  {
                    title: "Controlling Harshness",
                    body:
                      "Harshness usually shows up around 2–5 kHz. A gentle dip can soften unpleasant edges, especially on vocals and synths.",
                  },
                  {
                    title: "Adding Air",
                    body:
                      "A gentle boost above 10 kHz can create sparkle, sheen, and openness — especially on vocals, cymbals, and pads.",
                  },
                  {
                    title: "Subtract First",
                    body:
                      "Subtracting problem frequencies generally sounds more natural than boosting. Cut before you add.",
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-3 text-xs"
                  >
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                      {card.title}
                    </p>
                    <p>{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4.6 EQ for Different Elements */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-100">
              4.6 EQ for Different Elements
            </h3>
            <p className="text-xs text-slate-300">
              Use these as starting points, then trust your ears and the song.
            </p>

            <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)] md:items-start">
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    title: "Vocals",
                    img: "/assets/music-production/mixing/images/vocals.jpg",
                    desc:
                      "HPF, remove mud, tame harshness, then add a bit of air if needed.",
                  },
                  {
                    title: "Drums",
                    img: "/assets/music-production/mixing/images/drums.jpg",
                    desc:
                      "Shape punch and brightness. Let the kick and snare lead, clean up low-mid mud.",
                  },
                  {
                    title: "Synths & Pads",
                    img: "/assets/music-production/mixing/images/synth.jpg",
                    desc:
                      "Carve space around the vocal. High-pass generously and remove clashing mids.",
                  },
                  {
                    title: "Bass",
                    img: "/assets/music-production/mixing/images/bass.jpg",
                    desc:
                      "Control low-mid mud, define the fundamental, and keep it out of the vocal’s way.",
                  },
                ].map((card) => (
                  <figure
                    key={card.title}
                    className="flex flex-col gap-2 rounded-2xl border border-slate-800/80 bg-black/80 p-3"
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={card.img}
                        alt={card.title}
                        fill
                        className="rounded-xl object-cover"
                      />
                    </div>
                    <figcaption className="text-[11px] font-semibold text-emerald-100">
                      {card.title}
                    </figcaption>
                    <p className="text-[11px] text-slate-300">{card.desc}</p>
                  </figure>
                ))}
              </div>

              <div className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Kick &amp; Low End
                </p>
                <p className="text-xs text-slate-300">
                  Boost lows for weight, dip boxiness, and shape the click for
                  clarity in the mix. Keep the kick and bass out of each other’s
                  way with small EQ moves and sidechain if needed.
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Midrange Clarity
                </p>
                <p className="text-xs text-slate-300">
                  Reduce mud (200–500 Hz) and harshness (2–5 kHz) before boosting
                  highs. Small, intentional cuts keep the mix open.
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Air &amp; Presence
                </p>
                <p className="text-xs text-slate-300">
                  Add gentle air above 10 kHz on vocals and cymbals for sparkle.
                  Don’t over-brighten; reference against your favorite mixes.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
              <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Tutorial • EQ Basics
              </div>
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/VIDEO_ID_EQ"
                  title="EQ basics tutorial"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
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

          <div className="grid gap-6 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)] md:items-start">
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

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
            <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Tutorial • Compression Basics
            </div>
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/VIDEO_ID_COMPRESSION"
                title="Compression basics tutorial"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
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
              {reverbSamples.map((card) => (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => playSample(card.src)}
                  className={`text-left transition ${activeSample === card.src ? "border-emerald-500/70 bg-emerald-500/10" : "bg-slate-950/80"} rounded-2xl border border-slate-800/80 p-4 hover:border-emerald-400/60`}
                >
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    {card.title}
                  </p>
                  <p className="text-xs text-slate-200">{card.desc}</p>
                  <p className="mt-2 text-[11px] text-emerald-200">
                    {activeSample === card.src ? "Playing…" : "Tap to hear example"}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* 6.2 Delay Types */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-100">
              6.2 Delay Types
            </h3>
            <div className="grid gap-4 md:grid-cols-4">
              {delaySamples.map((card) => (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => playSample(card.src)}
                  className={`text-left transition ${activeSample === card.src ? "border-emerald-500/70 bg-emerald-500/10" : "bg-slate-950/80"} rounded-2xl border border-slate-800/80 p-4 hover:border-emerald-400/60`}
                >
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    {card.title}
                  </p>
                  <p className="text-xs text-slate-200">{card.desc}</p>
                  <p className="mt-2 text-[11px] text-emerald-200">
                    {activeSample === card.src ? "Playing…" : "Tap to hear example"}
                  </p>
                </button>
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
                <div className="overflow-hidden rounded-xl border border-slate-800/70 bg-black">
                  <img
                    src="/assets/music-production/mixing/images/automation.png"
                    alt="Automation curves"
                    className="block h-auto w-full object-contain"
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
