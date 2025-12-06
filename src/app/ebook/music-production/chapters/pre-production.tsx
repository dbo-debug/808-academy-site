"use client";

import React from "react";
import Image from "next/image";

export default function PreProductionChapter() {
  const scrollToSection = (id: string) => {
    if (typeof document === "undefined") return;
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="space-y-10">
      {/* HERO / INTRO */}
      <section className="space-y-4">
        <p className="text-sm text-slate-200 sm:text-base">
          Chapter 2 — Creative Preparation for Modern Music Producers
        </p>

        {/* Hero layout: workspace + intro copy + chapter map */}
        <div className="grid gap-4 md:grid-cols-[minmax(0,1.1fr),minmax(0,1.1fr)]">
          {/* Left: images + quote + Rick Rubin */}
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <div className="relative h-40 w-full sm:h-44">
                  <Image
                    src="/assets/music-production/pre-production/images/desk.jpg"
                    alt="Minimalist creative workspace with clean desk, plant, light, and headphones"
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-[11px] text-slate-400">
                  A minimalist “creative workspace” photo (clean desk, plant,
                  light, headphones).
                </figcaption>
              </figure>

              <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <div className="relative h-40 w-full sm:h-44">
                  <Image
                    src="/assets/music-production/pre-production/diagrams/creative-diagram.jpg"
                    alt="Creative flow collage from mental space to inspiration, capture, and development"
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-[11px] text-slate-400">
                  A “Creative Flow Diagram”: mental space → inspiration →
                  capture → development.
                </figcaption>
              </figure>
            </div>

            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-50">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Big Idea
              </p>
              <p className="mt-2">
                Great producers don’t wait for inspiration to strike.
                <br />
                They prepare the environment where inspiration can thrive.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
              <div className="border-b border-slate-800/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Watch • Rick Rubin creativity interview
              </div>
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/36L9cYkHyZM"
                  className="h-full w-full rounded-b-2xl"
                  title="Rick Rubin creativity interview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Right: intro text + chapter map */}
          <div className="space-y-4 text-sm text-slate-200">
            <section id="introduction" className="space-y-3 scroll-mt-24">
              <h3 className="text-xl font-semibold tracking-tight text-slate-50">
                1. Introduction: Preparing the Creative Mind
              </h3>
              <p>
                Before any great track comes to life, there’s a quiet but
                powerful stage that happens long before you hit record or touch
                a plugin: pre-production. This is the phase where ideas are
                born, organized, shaped, and prepared so that when you finally
                sit down to produce, you’re not guessing — you’re executing with
                intention.
              </p>
              <p>
                In this chapter, you’ll learn how modern producers capture
                inspiration, gather reference material, explore sample sources
                responsibly, experiment with creative tools (including AI), and
                build repeatable workflows that make starting new songs faster
                and more consistent. You’ll also set up the foundational
                elements of your session — templates, labels, structure, sounds
                — so you always begin with clarity rather than chaos.
              </p>
              <p>This chapter teaches you how.</p>
            </section>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-xs text-slate-200">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Chapter Map
              </p>
              <ol className="mt-2 space-y-1.5 text-left">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("introduction")}
                    className="hover:text-emerald-300"
                  >
                    1. Introduction: Preparing the Creative Mind
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      scrollToSection("tracking-inspiration-everywhere")
                    }
                    className="hover:text-emerald-300"
                  >
                    2. Tracking Inspiration Everywhere
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("finding-inspiration")}
                    className="hover:text-emerald-300"
                  >
                    3. Finding Inspiration
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("modern-ai-tools")}
                    className="hover:text-emerald-300"
                  >
                    4. Modern AI Tools for Inspiration
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("production-brief")}
                    className="hover:text-emerald-300"
                  >
                    5. Shaping Your Vision: The Production Brief
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("session-template")}
                    className="hover:text-emerald-300"
                  >
                    6. Creating Your Foundation: The Session Template
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("song-structure")}
                    className="hover:text-emerald-300"
                  >
                    7. Understanding Song Structure
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("sound-palette")}
                    className="hover:text-emerald-300"
                  >
                    8. Choosing Your Initial Sound Palette
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      scrollToSection("homework-project-session")
                    }
                    className="hover:text-emerald-300"
                  >
                    9. Homework: Create Your Official Project Session
                  </button>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRACKING INSPIRATION EVERYWHERE */}
      <section
        id="tracking-inspiration-everywhere"
        className="space-y-5 scroll-mt-24"
      >
        <h3 className="text-xl font-semibold tracking-tight text-slate-50">
          2. Tracking Inspiration Everywhere
        </h3>

        {/* 2.1 Why Capturing Ideas Matters */}
        <section id="why-capturing-ideas-matters" className="space-y-3">
          <h4 className="text-lg font-semibold tracking-tight text-slate-50">
            2.1 Why Capturing Ideas Matters
          </h4>
          <p className="text-sm text-slate-200">
            Inspiration rarely appears when you’re sitting at your desk with
            perfect lighting and a blank session ready to go. It shows up while
            driving, showering, walking through a grocery store, or halfway
            asleep. The greatest enemy of creativity is the thought:
          </p>
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-3 text-sm text-slate-200">
            <p>“I’ll remember it later.”</p>
            <p>You won’t.</p>
            <p>No one does.</p>
          </div>
          <p className="text-sm text-slate-200">
            Every world-class songwriter and producer has a system for grabbing
            ideas the moment they surface. Not because the ideas are perfect,
            but because capturing them keeps the creative door open. A simple
            3-second melody hummed into your phone can become the hook to your
            next song.
          </p>
          <p className="text-sm font-medium text-emerald-200">
            Creativity rewards the prepared.
          </p>
        </section>

        {/* 2.2 Tools for Capturing Inspiration */}
        <section id="tools-for-capturing-inspiration" className="space-y-3">
          <h4 className="text-lg font-semibold tracking-tight text-slate-50">
            2.2 Tools for Capturing Inspiration
          </h4>

          <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)]">
            <div className="space-y-3 text-sm text-slate-200">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-xs text-slate-200">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  1. Voice Memos
                </p>
                <p className="mt-2">
                  Your phone is the most powerful creative tool you own. Use it
                  constantly. Capture melodies, rhythms, chord ideas, synth
                  textures you imagine, and even random sounds around you. Don’t
                  worry if it sounds messy. You&apos;re building a library of
                  sparks.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-xs text-slate-200">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  2. Notes App / Journals
                </p>
                <p className="mt-2">
                  Keep a living notepad of words, emotions, concepts, and story
                  ideas. Producers often underestimate the power of language in
                  shaping a song’s identity. A single phrase can define an
                  entire track.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-xs text-slate-200">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  3. Quick DAW Sketch Sessions
                </p>
                <p className="mt-2">
                  Set aside 10–15 minutes to open a blank session and improvise
                  freely. Don’t aim to make a song. Just explore. Many producers
                  create entire albums from their “sketch sessions folder.”
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-xs text-slate-200">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  4. Field Recordings
                </p>
                <p className="mt-2">
                  The hum of an air conditioner, a crosswalk beep, a friend
                  laughing, a train clacking—these are textures. These can
                  become percussion, ambience, or even instruments with a bit of
                  processing.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-xs text-slate-200">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  5. Inspiration Inbox Folder
                </p>
                <p className="mt-2">
                  Create a central folder on your computer called “Inspiration
                  Inbox.”
                </p>
                <p className="mt-1">
                  Place everything there—screenshots, links, loops, voice memos,
                  interesting synth patches, sample ideas. Don’t sort it.
                  Sorting comes later. Your only job is collection.
                </p>
              </div>

              <p className="text-sm text-slate-200">
                The moment you start capturing everything, your creative
                momentum doubles.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
                <div className="border-b border-slate-800/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Watch • Using Voice Memos for Song Ideas
                </div>
                <div className="aspect-video w-full">
                  <iframe
                    src="https://www.youtube.com/embed/9vdYda6NIXA"
                    className="h-full w-full rounded-b-2xl"
                    title="Voice memos for song ideas"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
                <div className="border-b border-slate-800/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Watch • Quick DAW Sketch Sessions
                </div>
                <div className="aspect-video w-full">
                  <iframe
                    src="https://www.youtube.com/embed/wE33K6hAPJA"
                    className="h-full w-full rounded-b-2xl"
                    title="Quick DAW sketch sessions"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* 3. FINDING INSPIRATION */}
      <section id="finding-inspiration" className="space-y-5 scroll-mt-24">
        <h3 className="text-xl font-semibold tracking-tight text-slate-50">
          3. Finding Inspiration
        </h3>

        {/* 3.1 Active vs Passive Listening */}
        <section id="active-vs-passive-listening" className="space-y-4">
          <h4 className="text-lg font-semibold tracking-tight text-slate-50">
            3.1 Active vs Passive Listening
          </h4>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] md:items-start">
            <div className="space-y-3 text-sm text-slate-200">
              <p>Most people consume music passively. Producers listen actively.</p>
              <p>When you listen actively, you ask:</p>
              <ul className="mt-1 space-y-1 pl-4 text-sm text-slate-200">
                <li>Why does this part feel good?</li>
                <li>What changed between the verse and chorus?</li>
                <li>How is the bass interacting with the drums?</li>
                <li>What textures are filling the space?</li>
                <li>Where is the tension? Where is the release?</li>
              </ul>
              <p className="text-sm text-slate-200">
                Active listening trains your instincts. You begin hearing the
                architecture behind the emotion. Once you understand the
                structure, you can recreate or reinvent it.
              </p>
            </div>

            <div className="space-y-4">
              <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <div className="relative h-40 w-full sm:h-48">
                  <Image
                    src="/assets/music-production/pre-production/images/active-passive.jpg"
                    alt="Illustration of active vs passive listening"
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-[11px] text-slate-400">
                  “How to listen like a producer”
                </figcaption>
              </figure>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
                <div className="border-b border-slate-800/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Watch • How to listen like a producer
                </div>
                <div className="aspect-video w-full">
                  <iframe
                    src="https://www.youtube.com/embed/JoPhNikNbTo"
                    className="h-full w-full rounded-b-2xl"
                    title="How to listen like a producer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3.2 Sampling & Its Legacy */}
        <section id="sampling-and-legacy" className="space-y-4">
          <h4 className="text-lg font-semibold tracking-tight text-slate-50">
            3.2 Sampling &amp; Its Legacy
          </h4>

          <div className="space-y-3 text-sm text-slate-200">
            <p>
              Sampling is the heartbeat of modern production. It began with DJs
              looping breaks on vinyl, then moved into early samplers like the
              MPC and the SP-1200. Hip-hop, house, electronic music, pop—entire
              genres were built from recontextualizing existing sounds. For a
              long time samples, loops, anything pre recorded was viewed as
              unoriginal material, cheating, etc. We live in an amazing time
              where that view has started to change. Using ANY tools around you
              to inspire and harness your own creativity is highly encouraged in
              this course!
            </p>
            <p>
              Sampling carries both creative power and responsibility.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-3 text-xs text-slate-200">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Pros:
                </p>
                <ul className="mt-1 space-y-1">
                  <li>Lightning-fast inspiration</li>
                  <li>Access to a universe of sounds</li>
                  <li>Texture and character already baked in</li>
                  <li>Cultural lineage and references</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-3 text-xs text-slate-200">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-300">
                  Cons:
                </p>
                <ul className="mt-1 space-y-1">
                  <li>Legal clearance issues</li>
                  <li>
                    Overused samples can make your track sound generic
                  </li>
                  <li>Easy shortcuts sometimes limit originality</li>
                </ul>
              </div>
            </div>

            <p>
              Sampling is neither good nor bad—it is a tool. How you use it
              defines your artistry.
            </p>
          </div>

          {/* Image + video side by side */}
          <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
            <figure className="md:w-5/12 rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/assets/music-production/pre-production/images/early-tools.jpg"
                  alt="Collage of classic sampling tools like turntables and samplers"
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Classic sampling gear: from turntables to hardware samplers.
              </figcaption>
            </figure>

            <div className="md:w-7/12 rounded-2xl border border-slate-800/80 bg-slate-950/80">
              <div className="border-b border-slate-800/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Watch • Sampling History &amp; Legacy
              </div>
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/-HZOdRaeXmA"
                  className="h-full w-full rounded-b-2xl"
                  title="Sampling legacy documentary"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Sampler museum */}
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-50">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Interactive Element • Clickable Sampler Museum
            </p>
            <p className="mt-2 text-emerald-50">
              Small grid where each sampler image plays an iconic sound when
              clicked.
            </p>

            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {/* 1. Fairlight CMI */}
              <div className="flex flex-col gap-2 rounded-xl border border-emerald-500/40 bg-black/70 p-3">
                <figure className="relative h-28 w-full">
                  <Image
                    src="/assets/music-production/pre-production/interactive/sampler-museum/images/fairlight-cmi.jpg"
                    alt="Fairlight CMI sampler"
                    fill
                    className="rounded-lg object-contain"
                  />
                </figure>
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold text-emerald-200">
                    🎛️ 1. Fairlight CMI (1979–1982)
                  </p>
                  <p className="text-[11px]">
                    Iconic Sound: ORCH5 (Orchestra Hit)
                  </p>
                  <p className="text-[11px] opacity-80">Associated With:</p>
                  <ul className="text-[11px] opacity-80">
                    <li>80s pop (Art of Noise, Peter Gabriel, Kate Bush, Prince)</li>
                    <li>Early digital synthesis</li>
                    <li>“Stabbing” orchestral hits</li>
                    <li>Cold, glassy digital tones</li>
                  </ul>
                  <audio
                    className="mt-1 w-full"
                    controls
                    src="/assets/music-production/pre-production/interactive/sampler-museum/samples/orch-5.wav"
                  />
                </div>
              </div>

              {/* 2. E-MU Emulator II */}
              <div className="flex flex-col gap-2 rounded-xl border border-emerald-500/40 bg-black/70 p-3">
                <figure className="relative h-28 w-full">
                  <Image
                    src="/assets/music-production/pre-production/interactive/sampler-museum/images/emu-emulator2.jpg"
                    alt="E-MU Emulator II sampler"
                    fill
                    className="rounded-lg object-contain"
                  />
                </figure>
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold text-emerald-200">
                    🎛️ 2. E-MU Emulator II (1984)
                  </p>
                  <p className="text-[11px]">
                    Iconic Sound: Shakuhachi Flute
                  </p>
                  <p className="text-[11px] opacity-80">Associated With:</p>
                  <ul className="text-[11px] opacity-80">
                    <li>80s synth-pop</li>
                    <li>New Wave</li>
                    <li>Depeche Mode, New Order</li>
                    <li>Lush but grainy 8-bit textures</li>
                  </ul>
                  <audio
                    className="mt-1 w-full"
                    controls
                    src="/assets/music-production/pre-production/interactive/sampler-museum/samples/shakuhachi-flute.wav"
                  />
                </div>
              </div>

              {/* 3. Akai MPC60 */}
              <div className="flex flex-col gap-2 rounded-xl border border-emerald-500/40 bg-black/70 p-3">
                <figure className="relative h-28 w-full">
                  <Image
                    src="/assets/music-production/pre-production/interactive/sampler-museum/images/mpc-60.jpeg"
                    alt="Akai MPC60 sampler"
                    fill
                    className="rounded-lg object-contain"
                  />
                </figure>
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold text-emerald-200">
                    🎛️ 3. Akai MPC60 (1988)
                  </p>
                  <p className="text-[11px]">
                    Iconic Sound: Boom-bap drums sampled from vinyl
                  </p>
                  <p className="text-[11px] opacity-80">Associated With:</p>
                  <ul className="text-[11px] opacity-80">
                    <li>Early hip-hop</li>
                    <li>Pete Rock, DJ Premier</li>
                    <li>The “swing” that made hip-hop feel human</li>
                    <li>Punchy 12-bit grit</li>
                  </ul>
                  <audio
                    className="mt-1 w-full"
                    controls
                    src="/assets/music-production/pre-production/interactive/sampler-museum/samples/mpc-60.mp3"
                  />
                </div>
              </div>

              {/* 4. E-MU SP-1200 */}
              <div className="flex flex-col gap-2 rounded-xl border border-emerald-500/40 bg-black/70 p-3">
                <figure className="relative h-28 w-full">
                  <Image
                    src="/assets/music-production/pre-production/interactive/sampler-museum/images/emu-sp1200.jpg"
                    alt="E-MU SP-1200 sampler"
                    fill
                    className="rounded-lg object-contain"
                  />
                </figure>
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold text-emerald-200">
                    🎛️ 4. E-MU SP-1200 (1987)
                  </p>
                  <p className="text-[11px]">
                    Iconic Sound: 12-bit gritty sample crunch / dusty drums
                  </p>
                  <p className="text-[11px] opacity-80">Associated With:</p>
                  <ul className="text-[11px] opacity-80">
                    <li>Golden Era hip-hop</li>
                    <li>Wu-Tang, Public Enemy, EPMD</li>
                    <li>
                      Chopped samples with that crispy top-end aliasing
                    </li>
                    <li>The sound of 90s beats</li>
                  </ul>
                  <audio
                    className="mt-1 w-full"
                    controls
                    src="/assets/music-production/pre-production/interactive/sampler-museum/samples/sp-1200.wav"
                  />
                </div>
              </div>

              {/* 5. Akai MPC3000 */}
              <div className="flex flex-col gap-2 rounded-xl border border-emerald-500/40 bg-black/70 p-3">
                <figure className="relative h-28 w-full">
                  <Image
                    src="/assets/music-production/pre-production/interactive/sampler-museum/images/mpc-3000.jpeg"
                    alt="Akai MPC3000 sampler"
                    fill
                    className="rounded-lg object-contain"
                  />
                </figure>
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold text-emerald-200">
                    🎛️ 5. Akai MPC3000 (1994)
                  </p>
                  <p className="text-[11px]">
                    Iconic Sound: Clean punchy drums / buttery swing
                  </p>
                  <p className="text-[11px] opacity-80">Associated With:</p>
                  <ul className="text-[11px] opacity-80">
                    <li>J Dilla</li>
                    <li>Dr. Dre</li>
                    <li>Timbaland</li>
                    <li>Neo-soul and modern hip-hop</li>
                    <li>Known for “that swing” and tight timing</li>
                  </ul>
                  <audio
                    className="mt-1 w-full"
                    controls
                    src="/assets/music-production/pre-production/interactive/sampler-museum/samples/mpc-3000.mp3"
                  />
                </div>
              </div>

              {/* 6. Roland SP-404 */}
              <div className="flex flex-col gap-2 rounded-xl border border-emerald-500/40 bg-black/70 p-3">
                <figure className="relative h-28 w-full">
                  <Image
                    src="/assets/music-production/pre-production/interactive/sampler-museum/images/sp-404.jpg"
                    alt="Roland SP-404 sampler"
                    fill
                    className="rounded-lg object-contain"
                  />
                </figure>
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold text-emerald-200">
                    🎛️ 6. Roland SP-404 (2005 → present)
                  </p>
                  <p className="text-[11px]">
                    Iconic Sound: Lo-fi resampling, vinyl sim, crunchy FX
                  </p>
                  <p className="text-[11px] opacity-80">Associated With:</p>
                  <ul className="text-[11px] opacity-80">
                    <li>Lo-fi hip-hop</li>
                    <li>Beat scene (LA), Dilla disciples</li>
                    <li>Stones Throw aesthetic</li>
                    <li>Live finger-drumming sets</li>
                  </ul>
                  <audio
                    className="mt-1 w-full"
                    controls
                    src="/assets/music-production/pre-production/interactive/sampler-museum/samples/sp-404.wav"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

 <div className="mt-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-50">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Interactive Element • Clickable Sampler Museum
            </p>
            <p className="mt-2 text-emerald-50">
              Small grid where each sampler image plays an iconic sound when
              clicked.
            </p>

            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {/* cards 1–6 unchanged from your current version */}
              {/* ... keep your existing sampler cards here ... */}
            </div>
          </div>
        </section>

        {/* 3.3 Modern Sample Libraries */}
        <section id="modern-sample-libraries" className="space-y-4">
          <h4 className="text-lg font-semibold tracking-tight text-slate-50">
            3.3 Modern Sample Libraries
          </h4>

          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="md:w-3/5 space-y-3 text-sm text-slate-200">
              <p>
                Platforms like Splice, Arcade, LoopCloud, and LANDR Samples have
                transformed how producers work. They offer a nearly infinite
                library of loops, one-shots, and textures.
              </p>
              <p>
                Splice is known for genre-defining sounds and its massive
                library.
                <br />
                Arcade is known for inspirational playability and
                micro-sampling.
                <br />
                LoopCloud excels in deep tagging and organization.
              </p>
              <p>
                Use these tools intentionally. A unique combination of samples
                can create an entirely new world. But downloading the same loop
                as 100,000 other producers rarely leads to a distinctive sound.
              </p>
            </div>

            <figure className="md:w-2/5 rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/assets/music-production/pre-production/images/capture-collage.jpg"
                  alt="Screenshot collage of modern sample libraries"
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Modern sample platforms like Splice, Arcade, and LoopCloud.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 3.4 Public Domain & Unique Source Material */}
        <section
          id="public-domain-unique-sources"
          className="space-y-4"
        >
          <h4 className="text-lg font-semibold tracking-tight text-slate-50">
            3.4 Public Domain &amp; Unique Source Material
          </h4>

          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="md:w-3/5 space-y-3 text-sm text-slate-200">
              <p>
                Some of the most interesting samples come from places no one
                else is digging:
              </p>
              <ul className="mt-1 space-y-1 pl-4">
                <li>Public domain films</li>
                <li>Old educational recordings</li>
                <li>Historical speeches</li>
                <li>Government archives</li>
                <li>Forgotten vinyl</li>
                <li>Free sound effect libraries</li>
              </ul>
              <p>
                These sources produce textures that feel authentic and
                unexpected.
              </p>
              <p>
                When sampling older or obscure material, ensure it’s truly
                public domain. If not, you may need to clear it. But for
                producers who love sonic archeology, this can become part of
                your identity.
              </p>
            </div>

            <figure className="md:w-2/5 rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/assets/music-production/pre-production/images/freesound.png"
                  alt="Screenshot of a free sound library website"
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Example of a free sound / public domain audio archive.
              </figcaption>
            </figure>
          </div>
        </section>

      {/* 4. MODERN AI TOOLS FOR INSPIRATION */}
      <section id="modern-ai-tools" className="space-y-5 scroll-mt-24">
        <h3 className="text-xl font-semibold tracking-tight text-slate-50">
          4. Modern AI Tools for Inspiration (Updated with Examples)
        </h3>

        <p className="text-sm text-slate-200">
          In the last few years, AI has become a powerful part of music
          production. When used thoughtfully, these tools enhance creativity —
          not replace it. AI is best treated as a collaborator that offers
          starting points, textures, and ideas you can transform into your own
          sound.
        </p>

        {/* 4.1 Idea Generation Tools */}
        <section id="ai-idea-generation" className="space-y-4">
          <h4 className="text-lg font-semibold tracking-tight text-slate-50">
            4.1 Idea Generation Tools (Melodies, Chords, Beats)
          </h4>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr),minmax(0,1.1fr)] md:items-center">
            <div className="space-y-3 text-sm text-slate-200">
              <p>AI can help spark ideas when you’re stuck by generating:</p>
              <ul className="mt-1 space-y-1 pl-4">
                <li>chord progressions</li>
                <li>melodies</li>
                <li>drum patterns</li>
                <li>counter-melodies</li>
                <li>rhythmic variations</li>
              </ul>
              <p className="text-sm text-slate-200">
                These tools are not meant to write songs for you — they simply
                help you break through creative blocks.
              </p>

              <p className="text-sm font-semibold text-slate-100">
                Examples:
              </p>
              <ul className="mt-1 space-y-1 pl-4 text-sm text-slate-200">
                <li>
                  Magenta Studio – generates melodies, rhythms, and variations
                  you can reshape.
                </li>
                <li>
                  BandLab SongStarter – creates beat/melody “seeds” you can
                  flip.
                </li>
                <li>
                  Oeksound Bloom AI – melodic exploration tool for ambient and
                  tonal ideas.
                </li>
                <li>
                  Udio / Suno Prompt Clips – generate inspiration loops,
                  textures, and harmonic ideas.
                </li>
              </ul>

              <p className="text-sm text-slate-200">
                The goal: never use AI outputs as-is — always modify them until
                they feel like your voice.
              </p>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative h-40 w-full sm:h-48">
                <Image
                  src="/assets/music-production/pre-production/images/suno.png"
                  alt="AI music idea generation interface example"
                  fill
                  className="rounded-xl object-contain"
                />
              </div>
            </figure>
          </div>
        </section>

        {/* 4.2 Stem Separation Tools */}
        <section id="ai-stem-separation" className="space-y-4">
          <h4 className="text-lg font-semibold tracking-tight text-slate-50">
            4.2 Stem Separation Tools (Vocals, Drums, Bass, Instruments)
          </h4>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr),minmax(0,1.1fr)] md:items-center">
            <div className="space-y-3 text-sm text-slate-200">
              <p>
                AI stem splitters allow you to isolate individual elements from
                a full song — vocals, drums, bass, guitar, synths — with
                surprising clarity.
              </p>
              <p className="text-sm text-slate-200">
                Producers use these tools to:
              </p>
              <ul className="mt-1 space-y-1 pl-4">
                <li>study mixes</li>
                <li>analyze drum grooves</li>
                <li>isolate harmonies</li>
                <li>flip samples responsibly</li>
                <li>understand arrangement choices</li>
                <li>practice mixing</li>
              </ul>
              <p className="text-sm font-semibold text-slate-100">
                Examples:
              </p>
              <ul className="mt-1 space-y-1 pl-4 text-sm text-slate-200">
                <li>
                  LALAL.ai – very clean, fast vocal and instrument separation.
                </li>
                <li>
                  RipX DeepRemix – advanced separation with editable layers.
                </li>
                <li>
                  Moises.ai – great for isolating vocals, drums, and practice
                  loops.
                </li>
                <li>
                  Spleeter – free and open-source stem extraction used by DJs
                  and remixers.
                </li>
              </ul>
              <p className="text-sm text-slate-200">
                AI stem splitting is a study tool and a creative playground.
              </p>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative h-40 w-full sm:h-48">
                <Image
                  src="/assets/music-production/pre-production/images/lalal.png"
                  alt="LALAL-style stem separation interface"
                  fill
                  className="rounded-xl object-contain"
                />
              </div>
            </figure>
          </div>
        </section>

        {/* 4.3 Text-to-Sound & AI Foley */}
        <section id="ai-text-to-sound" className="space-y-4">
          <h4 className="text-lg font-semibold tracking-tight text-slate-50">
            4.3 Text-to-Sound &amp; AI Foley (Generate Any Sound You Can
            Imagine)
          </h4>

          <div className="space-y-3 text-sm text-slate-200">
            <p>
              These tools can create sounds that don’t exist in the real world
              — futuristic textures, impossible Foley, or experimental tones
              you’d never record manually.
            </p>
            <p>Use them for:</p>
            <ul className="mt-1 space-y-1 pl-4">
              <li>ambient sound design</li>
              <li>cinematic effects</li>
              <li>strange percussive layers</li>
              <li>atmospheric beds</li>
              <li>transitions and risers</li>
              <li>unique ear candy</li>
            </ul>
            <p className="text-sm font-semibold text-slate-100">
              Examples:
            </p>
            <ul className="mt-1 space-y-1 pl-4 text-sm text-slate-200">
              <li>
                ElevenLabs Sound Effects – text-to-sound generation (metal,
                water, glass, environmental FX).
              </li>
              <li>
                Adobe Audition / Premiere Text-to-SFX – generate realistic foley
                instantly.
              </li>
              <li>
                Boom Library AI Foley Engine – creates footsteps, impacts,
                textures.
              </li>
              <li>
                Stable Audio – text-to-sound/music synthesis for abstract
                textures.
              </li>
            </ul>
            <p className="text-sm text-slate-200">
              Want “wind chimes made of glass underwater” or “a synth pad made
              from whispering leaves”?
              <br />
              AI can build it.
            </p>
          </div>
        </section>

        {/* 4.4 Ethical Use */}
        <section id="ai-ethics" className="space-y-4">
          <h4 className="text-lg font-semibold tracking-tight text-slate-50">
            4.4 Ethical Use (Your Fingerprint Matters Most)
          </h4>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr),minmax(0,1.1fr)] md:items-center">
            <div className="space-y-3 text-sm text-slate-200">
              <p>AI is a tool — not a replacement for your creativity.</p>
              <p className="text-sm text-slate-200">
                The rule is simple:
                <br />
                Use AI to assist your creativity, not to define it.
              </p>
              <ul className="mt-1 space-y-1 pl-4">
                <li>Don’t rely on AI to write full songs.</li>
                <li>Don’t imitate real artists’ voices.</li>
                <li>Always transform what AI gives you.</li>
                <li>Maintain your artistic fingerprint.</li>
              </ul>
              <p className="text-sm text-slate-200">
                The whole point of this course — and your musical growth — is to
                build a voice that sounds like you.
              </p>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative h-40 w-full sm:h-48">
                <Image
                  src="/assets/music-production/pre-production/diagrams/ai-pro-con.jpg"
                  alt="Diagram of pros and cons of AI in music production"
                  fill
                  className="rounded-xl object-contain"
                />
              </div>
            </figure>
          </div>
        </section>
      </section>

      {/* 5. SHAPING YOUR VISION: PRODUCTION BRIEF */}
      <section id="production-brief" className="space-y-5 scroll-mt-24">
        <h3 className="text-xl font-semibold tracking-tight text-slate-50">
          5. Shaping Your Vision: The Production Brief
        </h3>

        {/* Big image above section */}
        <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
          <div className="relative h-44 w-full sm:h-56">
            <Image
              src="/assets/music-production/pre-production/images/mood-collage.jpg"
              alt="Mood collage showing visual inspiration for a track"
              fill
              className="rounded-xl object-cover"
            />
          </div>
        </figure>

        <p className="text-sm text-slate-200">
          Before you build a track, you need a map.
          <br />
          A Production Brief is your compass—your creative direction for the
          song.
        </p>

        {/* 5.1 Define the Emotional Target */}
        <section id="define-emotional-target" className="space-y-4">
          <h4 className="text-lg font-semibold tracking-tight text-slate-50">
            5.1 Define the Emotional Target
          </h4>

          <div className="space-y-3 text-sm text-slate-200">
            <p>Ask yourself:</p>
            <ul className="mt-1 space-y-1 pl-4">
              <li>What emotion is this song trying to express?</li>
              <li>What energy should the listener feel?</li>
              <li>What imagery comes to mind?</li>
            </ul>
            <p className="text-sm text-slate-200">
              If you can describe the feeling clearly, you can produce toward
              it.
            </p>
          </div>
        </section>

        {/* 5.2 Choose Reference Tracks */}
        <section id="choose-reference-tracks" className="space-y-4">
          <h4 className="text-lg font-semibold tracking-tight text-slate-50">
            5.2 Choose Reference Tracks
          </h4>
          <p className="text-sm text-slate-200">
            Think of reference tracks as guideposts. You’re not copying the
            song—you’re studying its clarity:
          </p>
          <ul className="mt-1 space-y-1 pl-4 text-sm text-slate-200">
            <li>What do you love about it?</li>
            <li>How does the arrangement work?</li>
            <li>What sounds define its personality?</li>
            <li>What is the tempo? The groove? The atmosphere?</li>
          </ul>
          <p className="text-sm text-slate-200">
            A good reference track keeps your song aligned with your intention.
          </p>
        </section>

        {/* 5.3 Write Your Production Brief */}
        <section id="write-production-brief" className="space-y-4">
          <h4 className="text-lg font-semibold tracking-tight text-slate-50">
            5.3 Write Your Production Brief
          </h4>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1.3fr),minmax(0,1.1fr)]">
            <div className="space-y-3 text-sm text-slate-200">
              <p>Your brief should include:</p>
              <ul className="mt-1 space-y-1 pl-4">
                <li>Song Concept: What is this track about?</li>
                <li>
                  Style &amp; Influences: Which artists or genres inspire this?
                </li>
                <li>
                  Mood Adjectives: Dark, smooth, dreamy, aggressive, bright,
                  etc.
                </li>
                <li>Instrumentation: 808? Analog synths? Guitars?</li>
                <li>Tempo &amp; Key: Or at least a tempo range.</li>
                <li>
                  Arrangement Goals: Long intro? Fast hook? Repeating motif?
                </li>
                <li>
                  Mix Aesthetic: Clean and modern? Dirty and vintage? Wide and
                  airy?
                </li>
              </ul>
              <p className="text-sm text-slate-200">
                This document becomes your north star as you build the track.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-50">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Practice • Your Production Brief
              </p>
              <p className="mt-2">
                As you read, start drafting your own brief in a notes app or
                journal using the exact prompts above. You&apos;ll refine this
                for your homework at the end of the chapter.
              </p>
            </div>
          </div>
        </section>
      </section>

      {/* 6. SESSION TEMPLATE */}
      <section id="session-template" className="space-y-5 scroll-mt-24">
        <h3 className="text-xl font-semibold tracking-tight text-slate-50">
          6. Creating Your Foundation: The Session Template
        </h3>

        <p className="text-sm text-slate-200">
          A session template is like prepped ingredients for a chef—you start
          cooking sooner because the basics are ready.
        </p>

        <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr),minmax(0,1.1fr)]">
          <div className="space-y-3 text-sm text-slate-200">
            <p>Background image:</p>
            <p>
              public/assets/music-production/pre-production/images/templates.png
            </p>
            <p>
              public/assets/music-production/pre-production/images/templates-matter.png
            </p>
            <p className="text-sm font-semibold text-slate-100">
              A good template doesn’t constrain you—it frees you.
            </p>
          </div>

          <div className="space-y-3">
            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative h-40 w-full sm:h-48">
                <Image
                  src="/assets/music-production/pre-production/images/templates.png"
                  alt="Overview of DAW templates"
                  fill
                  className="rounded-xl object-contain"
                />
              </div>
            </figure>
            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative h-40 w-full sm:h-48">
                <Image
                  src="/assets/music-production/pre-production/images/templates-matter.png"
                  alt="Why templates matter for music production workflow"
                  fill
                  className="rounded-xl object-contain"
                />
              </div>
            </figure>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
          <div className="border-b border-slate-800/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Tutorial Video • Going Thru The 808 Templates
          </div>
          <div className="aspect-video w-full">
            <video
              className="h-full w-full rounded-b-2xl"
              controls
              src="/assets/music-production/pre-production/tutorials/templates.mp4"
            />
          </div>
        </div>
      </section>

      {/* 7. UNDERSTANDING SONG STRUCTURE */}
      <section id="song-structure" className="space-y-5 scroll-mt-24">
        <h3 className="text-xl font-semibold tracking-tight text-slate-50">
          7. Understanding Song Structure
        </h3>

        <p className="text-sm text-slate-200">
          Song structure is the invisible skeleton of music. Even the most
          experimental songs are built on tension and release, movement and
          rest, density and openness.
        </p>

        {/* 7.1 Common Arrangement Parts */}
        <section id="common-arrangement-parts" className="space-y-4">
          <h4 className="text-lg font-semibold tracking-tight text-slate-50">
            7.1 Common Arrangement Parts
          </h4>
          <ul className="space-y-1 pl-4 text-sm text-slate-200">
            <li>Intro – establishes mood</li>
            <li>Verse – tells the story</li>
            <li>Pre-Chorus – builds energy</li>
            <li>Hook/Chorus – emotional peak</li>
            <li>Post-Chorus – continuation or variation</li>
            <li>Bridge – contrast or lift</li>
            <li>Outro – release</li>
          </ul>
          <p className="text-sm text-slate-200">Every section has a purpose.</p>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
            <div className="border-b border-slate-800/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Tutorial Video • Song Breakdown
            </div>
            <div className="aspect-video w-full">
              <video
                className="h-full w-full rounded-b-2xl"
                controls
                src="/assets/music-production/pre-production/tutorials/song-breadown.mp4"
              />
            </div>
          </div>
        </section>

        {/* 7.2 Arrangement Theory */}
        <section id="arrangement-theory" className="space-y-4">
          <h4 className="text-lg font-semibold tracking-tight text-slate-50">
            7.2 Arrangement Theory
          </h4>
          <p className="text-sm text-slate-200">
            Think of arrangement as energy management.
            <br />
            Your song should move in waves:
          </p>
          <ul className="space-y-1 pl-4 text-sm text-slate-200">
            <li>Low energy → rising energy → peak → release</li>
            <li>Dense layers → sparse layers</li>
            <li>High pitch elements → low pitch elements</li>
            <li>Narrow stereo → wide stereo</li>
          </ul>
          <p className="text-sm text-slate-200">
            When you understand these patterns, producing becomes intentional
            instead of accidental.
          </p>
        </section>
      </section>

      {/* 8. CHOOSING YOUR INITIAL SOUND PALETTE */}
      <section id="sound-palette" className="space-y-5 scroll-mt-24">
        <h3 className="text-xl font-semibold tracking-tight text-slate-50">
          8. Choosing Your Initial Sound Palette
        </h3>

        <p className="text-sm text-slate-200">
          Your sound palette is the sonic DNA of your track.
        </p>

        {/* 8.1 Drum Sources */}
        <section id="drum-sources" className="space-y-4">
          <h4 className="text-lg font-semibold tracking-tight text-slate-50">
            8.1 Drum Sources
          </h4>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1.3fr),minmax(0,1.1fr)]">
            <div className="space-y-3 text-sm text-slate-200">
              <p>Explore options like:</p>
              <ul className="space-y-1 pl-4 text-sm text-slate-200">
                <li>808s for modern hip-hop and R&amp;B</li>
                <li>909s for house, techno, and pop</li>
                <li>
                  Acoustic drum samples for organic or hybrid production
                </li>
                <li>Loops for vibe and groove inspiration</li>
              </ul>
              <p className="text-sm text-slate-200">
                Choose samples that match your Production Brief’s emotional
                target.
              </p>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
                <div className="border-b border-slate-800/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Tutorial • Palette Setup
                </div>
                <div className="aspect-video w-full">
                  <video
                    className="h-full w-full rounded-b-2xl"
                    controls
                    src="/assets/music-production/pre-production/tutorials/palette-setup.mp4"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8.2 Instrument & Patch Selection */}
        <section id="instrument-patch-selection" className="space-y-4">
          <h4 className="text-lg font-semibold tracking-tight text-slate-50">
            8.2 Instrument &amp; Patch Selection
          </h4>
          <p className="text-sm text-slate-200">Consider:</p>
          <ul className="space-y-1 pl-4 text-sm text-slate-200">
            <li>Leads – melodies and motifs</li>
            <li>Pads – atmospheric support</li>
            <li>Plucks – rhythmic harmony</li>
            <li>Bass – foundation and movement</li>
            <li>Textures – noise, ambience, ear candy</li>
          </ul>
          <p className="text-sm text-slate-200">
            Picking the right combination of sounds creates identity.
          </p>
        </section>

        {/* 8.3 Build a Limited Palette */}
        <section id="build-limited-palette" className="space-y-4">
          <h4 className="text-lg font-semibold tracking-tight text-slate-50">
            8.3 Build a Limited Palette
          </h4>
          <p className="text-sm text-slate-200">
            Choose only 5–10 core sounds to start.
            <br />
            Limitation increases creativity. Too many choices kills momentum.
          </p>
        </section>
      </section>

      {/* 9. HOMEWORK */}
      <section
        id="homework-project-session"
        className="space-y-5 scroll-mt-24"
      >
        <h3 className="text-xl font-semibold tracking-tight text-slate-50">
          9. Homework: Create Your Official Project Session
        </h3>

        <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1.1fr)]">
          <div className="space-y-3 text-sm text-slate-200">
            <p>
              This is the foundation of the track you’ll build throughout the
              course.
            </p>
            <p>Your homework is to:</p>
            <ul className="space-y-1 pl-4 text-sm text-slate-200">
              <li>Write your Production Brief</li>
              <li>Choose one reference track</li>
              <li>Create a new Pro Tools session</li>
              <li>Set up:</li>
            </ul>
            <ul className="mt-1 space-y-1 pl-8 text-sm text-slate-200">
              <li>Track layout</li>
              <li>Color coding</li>
              <li>Routing</li>
              <li>Effects returns</li>
              <li>Arrangement markers (blank placeholders)</li>
            </ul>
            <ul className="mt-1 space-y-1 pl-4 text-sm text-slate-200">
              <li>Build your sound palette (5–10 sounds)</li>
              <li>Save the session — this becomes your long-term project</li>
              <li>
                Bring it to next class ready for Verse &amp; Hook Development
              </li>
            </ul>
            <p className="text-sm text-slate-200">
              This session becomes the central project for the entire course.
              Every lesson builds upon it.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-50">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Checklist • Official Project Session
            </p>
            <p className="mt-2">
              As you complete this homework, check off each bullet above in your
              DAW or notebook. This project session will carry through the rest
              of the course.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
