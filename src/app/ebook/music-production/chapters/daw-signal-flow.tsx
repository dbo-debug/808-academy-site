"use client";

import React from "react";
import Image from "next/image";

type ZoomImageState = {
  src: string;
  alt: string;
} | null;

export default function DawSignalFlowChapter() {
  const [zoomImage, setZoomImage] = React.useState<ZoomImageState>(null);

  // Smooth scroll helper for the chapter map buttons
  const scrollToSection = (id: string) => {
    if (typeof document === "undefined") return;
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const ZoomableImage = ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => (
    <button
      type="button"
      className={`relative h-full w-full cursor-zoom-in ${className ?? ""}`}
      onClick={() => setZoomImage({ src, alt })}
      aria-label={`Zoom image: ${alt}`}
    >
      <Image src={src} alt={alt} fill className="rounded-xl object-contain" />
    </button>
  );

  return (
    <>
      {/* MAIN CONTENT */}
      <div className="space-y-10">
        {/* HERO / TITLE */}
        <section className="space-y-6">
          {/* Heading */}
          <header className="space-y-3">
            <p className="inline-flex items-center rounded-full border border-slate-600/60 bg-slate-900/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
              Chapter 1
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              DAW Signal Flow &amp; Session Setup
            </h2>
            <p className="max-w-2xl text-sm text-slate-200 sm:text-base">
              Before we talk plug-ins, templates, or track counts, you need a
              rock-solid mental map of how audio travels: from the microphone,
              to the console, into the interface and DAW, through plug-ins, and
              back out to the speakers. In other words:{" "}
              <span className="font-semibold text-emerald-300">
                signal flow
              </span>
              .
            </p>
          </header>

          {/* Card rows – tight layout like your mockup */}
          <div className="space-y-4">
            {/* Row 1: You'll Learn + Big Idea */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-xs text-slate-200">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  You&apos;ll Learn
                </p>
                <ul className="mt-2 space-y-1.5">
                  <li>• What &quot;signal flow&quot; really means</li>
                  <li>• Analog console vs DAW channel strip</li>
                  <li>• Inserts, sends, buses &amp; subgroups</li>
                  <li>• A/D &amp; D/A conversion basics</li>
                  <li>• Track types, I/O &amp; naming</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-50">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Big Idea
                </p>
                <p className="mt-2">
                  Once you understand signal flow, a &quot;complex&quot; session
                  becomes a bunch of simple paths stacked together. This chapter
                  is about making those paths feel obvious.
                </p>
              </div>
            </div>

            {/* Row 2: Neve console hero + compact chapter map */}
            <div className="grid gap-4 md:grid-cols-3 md:items-stretch">
              {/* Neve console image – big on the left (2/3 width on ≥ md) */}
              <figure className="md:col-span-2 rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <div className="relative h-60 w-full sm:h-72 md:h-80">
                  <ZoomableImage
                    src="/assets/music-production/daw-signal-flow/images/neve.jpg"
                    alt="Analog console with glowing VU meters"
                  />
                </div>
                <figcaption className="mt-2 text-[11px] text-slate-400">
                  Modern DAWs are modeled after consoles like this. If you
                  understand one channel strip here, you can understand your DAW.
                </figcaption>
              </figure>

              {/* Compact chapter map on the right – clickable */}
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-xs text-slate-200">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Chapter Map
                </p>
                <ol className="mt-2 space-y-1.5 text-left">
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollToSection("what-is-signal-flow")}
                      className="hover:text-emerald-300"
                    >
                      1. What Is Signal Flow?
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() =>
                        scrollToSection("analog-console-channel-strip")
                      }
                      className="hover:text-emerald-300"
                    >
                      2. Analog Console Channel Strip
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollToSection("di-vs-mic")}
                      className="hover:text-emerald-300"
                    >
                      3. DI vs Mic Paths
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollToSection("inserts-sends")}
                      className="hover:text-emerald-300"
                    >
                      4. Inserts, Sends, Subgroups &amp; Mix Bus
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollToSection("conversion")}
                      className="hover:text-emerald-300"
                    >
                      5. A/D &amp; D/A Conversion
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollToSection("daw-flow")}
                      className="hover:text-emerald-300"
                    >
                      6. DAW / Pro Tools Signal Flow
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollToSection("track-types")}
                      className="hover:text-emerald-300"
                    >
                      7. Track Types &amp; Naming
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollToSection("applied-practice")}
                      className="hover:text-emerald-300"
                    >
                      8. Applied Practice
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollToSection("summary")}
                      className="hover:text-emerald-300"
                    >
                      9. Summary &amp; Master Diagram
                    </button>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* 1. WHAT IS SIGNAL FLOW */}
        <section id="what-is-signal-flow" className="space-y-5">
          <h3 className="text-xl font-semibold tracking-tight text-slate-50">
            1. What Is Signal Flow?
          </h3>

          {/* Tight text + image split (space-saving layout) */}
          <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] md:items-center">
            <div className="space-y-3 text-sm text-slate-200">
              <div className="rounded-xl border border-slate-800/80 bg-slate-950/80 px-4 py-3 text-xs text-slate-200">
                <span className="font-mono text-[11px]">
                  Mic → Preamp → Interface → DAW → Plug-ins / Buses → Mix Bus →
                  Speakers
                </span>
              </div>
              <p>
                Signal flow is just the path a sound takes from the source to your
                ears. Any time audio behaves in a way you don&apos;t expect (no
                sound, distortion, reverb on everything), it&apos;s almost always a
                signal flow problem.
              </p>
              <p>
                Every system in audio is a chain of stages. Your job is to know
                what <em>should</em> happen at each stop and what to check when
                something goes wrong.
              </p>
              <p>
                Once you see your setup as a series of predictable steps,{" "}
                <span className="font-medium">
                  troubleshooting stops being random guessing
                </span>{" "}
                and becomes logical: follow the path, find the break.
              </p>
              <p className="text-xs text-slate-300">
                Throughout this chapter we&apos;ll keep coming back to this idea:
                audio always goes from{" "}
                <span className="font-semibold">somewhere</span>, through{" "}
                <span className="font-semibold">something</span>, to{" "}
                <span className="font-semibold">somewhere else</span>. If you can
                name those three for any signal, you&apos;re in control.
              </p>
            </div>

            {/* Correct analog signal diagram, tighter layout */}
            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative h-56 w-full sm:h-64">
                <ZoomableImage
                  src="/assets/music-production/daw-signal-flow/diagrams/analog-sig.jpg"
                  alt="Simplified mic to preamp to interface to DAW to speakers signal flow diagram"
                />
              </div>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Big picture: one clean path in, one clean path out. Everything
                else is detail.
              </figcaption>
            </figure>
          </div>

          {/* Watch box */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
            <div className="border-b border-slate-800/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Watch • Understanding Signal Flow
            </div>
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/_uZK8Zx7c4I"
                className="h-full w-full"
                title="Signal flow explained"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

{/* 2. ANALOG CONSOLE CHANNEL STRIP */}
<section
  id="analog-console-channel-strip"
  className="space-y-5 scroll-mt-24"
>
  <h2 className="text-xl font-semibold tracking-tight text-slate-50">
    2. Analog Console Channel Strip
  </h2>

  <p className="text-sm text-slate-200">
    Before DAWs, engineers learned signal flow on large-format analog
    consoles. Each vertical strip is one channel, and the layout repeats
    across the desk. Once you understand one strip from top to bottom, a
    DAW like Pro Tools stops being mysterious and just feels like a
    virtual console.
  </p>

  <p className="text-sm text-slate-200">
    The strip below is based on an{" "}
    <span className="font-medium">SSL 4000-series</span> console — a classic
    desk behind a huge amount of hit records. Nearly every modern DAW mixer
    is modeled on this basic idea: start at the input, shape and control the
    signal as it moves downward, then send it out to a bus or your mix.
  </p>

  {/* FIXED 3-COLUMN RESPONSIVE LAYOUT */}
  <div className="mt-6 grid gap-6 lg:grid-cols-3 lg:items-start">

    {/* LEFT COLUMN: STATIC SSL STRIP */}
    <figure className="rounded-2xl border border-slate-800/80 bg-black/90 p-4 mx-auto lg:mx-0">
      <div className="w-[260px] mx-auto">
        <Image
          src="/assets/music-production/daw-signal-flow/images/ssl-9000.jpg"
          alt="SSL 4000 analog console channel strip"
          width={180}
          height={1100}
          className="h-auto w-full rounded-xl"
        />
      </div>
    </figure>

    {/* MIDDLE COLUMN: ROADMAP */}
    <aside className="space-y-3 text-xs text-slate-200">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
        Channel Strip Roadmap
      </p>

      <div className="space-y-2">
        <div className="rounded-xl border border-slate-800/80 bg-slate-950/80 p-3">
          <p className="text-sm font-semibold text-slate-50">Input Section</p>
          <p className="mt-1 text-[11px] text-slate-300">
            Mic / line / tape input selector, pad, polarity (phase) flip, and a high-pass filter.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800/80 bg-slate-950/80 p-3">
          <p className="text-sm font-semibold text-slate-50">Preamp / Gain</p>
          <p className="mt-1 text-[11px] text-slate-300">
            Brings the incoming signal up to working level. Too low = noise. Too high = distortion.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800/80 bg-slate-950/80 p-3">
          <p className="text-sm font-semibold text-slate-50">Dynamics</p>
          <p className="mt-1 text-[11px] text-slate-300">
            Compression, gating, and expansion live here.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800/80 bg-slate-950/80 p-3">
          <p className="text-sm font-semibold text-slate-50">EQ Section</p>
          <p className="mt-1 text-[11px] text-slate-300">
            Multiple bands for carving, boosting, and tone shaping.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800/80 bg-slate-950/80 p-3">
          <p className="text-sm font-semibold text-slate-50">Sends / Cue Mixes</p>
          <p className="mt-1 text-[11px] text-slate-300">
            Sends feed reverbs, delays, headphones, and more.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800/80 bg-slate-950/80 p-3">
          <p className="text-sm font-semibold text-slate-50">Pan & Fader</p>
          <p className="mt-1 text-[11px] text-slate-300">
            Pan places the sound in the stereo field; the fader sets level.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800/80 bg-slate-950/80 p-3">
          <p className="text-sm font-semibold text-slate-50">Bus / Output Routing</p>
          <p className="mt-1 text-[11px] text-slate-300">
            Routes the channel to groups, mix bus, or interface.
          </p>
        </div>
      </div>
    </aside>

    {/* RIGHT COLUMN: TEXT + DAW VERSION */}
    <div className="space-y-4 text-sm text-slate-200">
      <p>
        The key idea is that the signal always travels{" "}
        <span className="font-medium">top → bottom</span>.
      </p>
      <p>
        When troubleshooting, engineers “walk down the strip” checking each
        stage in order.
      </p>
      <p>
        DAWs copy this exact layout — just in software instead of hardware.
      </p>

      <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs text-emerald-50">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
          DAW Version • Same Flow, Virtual Knobs
        </h3>

        <div className="mt-2 grid gap-3 sm:grid-cols-2 sm:items-center">
          <figure className="rounded-xl border border-emerald-500/40 bg-black/80 p-3">
            <div className="relative h-32 w-full">
              <Image
                src="/assets/music-production/daw-signal-flow/images/pt-ssl.jpg"
                alt="SSL-style channel strip plug-in"
                width={400}
                height={130}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
          </figure>

          <p>
            The Pro Tools mixer is just a digital version of this same strip — repeated 50 times.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
      
        {/* 3. DI VS MIC PATHS */}
        <section id="di-vs-mic" className="space-y-5">
          <h3 className="text-xl font-semibold tracking-tight text-slate-50">
            3. DI vs Mic Paths (Instrument Level vs Mic Level)
          </h3>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)]">
            <div className="space-y-3 text-sm text-slate-200">
              <p>
                Not every source hits the console the same way. A vocal mic, a bass
                guitar, and a synth all show up at different levels and impedances.
              </p>
              <p>
                A <span className="font-medium">DI (Direct Injection)</span> box
                converts a guitar or bass&apos;s high-impedance, unbalanced signal
                into a low-impedance, balanced signal that works well with long
                cables and mic preamps.
              </p>
              <p>
                DIs solve an impedance problem, preserve tone over long cable runs,
                and often let you split the signal so you can capture both a clean
                DI track and an amp or pedal chain. That dry track can later be
                re-amped through pedals, amps, or software without the player having
                to replay the part.
              </p>
              <p className="text-xs text-slate-300">
                Typical modern guitar session: one mic on the cab, one DI. You get
                the vibe <em>and</em> the safety net.
              </p>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative h-64 w-full">
                <ZoomableImage
                  src="/assets/music-production/daw-signal-flow/diagrams/di-diagram.jpg"
                  alt="Diagram of DI vs mic signal path for guitar"
                />
              </div>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Typical DI chain: Guitar → DI → Preamp → Interface → DAW. Mics
                usually go straight from mic → preamp.
              </figcaption>
            </figure>
          </div>

          <div className="grid gap-4 md:grid-cols-2 text-xs text-slate-200">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                When to Use a DI
              </p>
              <ul className="mt-2 space-y-1">
                <li>• Bass guitar into the interface</li>
                <li>• Clean DI for later re-amping</li>
                <li>• Long cable runs on stage</li>
                <li>• Keyboards / synths into the console</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                When to Use a Mic on an Amp
              </p>
              <ul className="mt-2 space-y-1">
                <li>• When the amp is part of the tone</li>
                <li>• For room / cabinet character</li>
                <li>• When the performer interacts with the room</li>
              </ul>
              <p className="mt-2 text-[11px] text-slate-300">
                Many modern sessions capture both: a close mic on the cab plus a
                clean DI as insurance.
              </p>
            </div>
          </div>
        </section>

        {/* 4. INSERTS, SENDS, SUBGROUPS & MIX BUS */}
        <section id="inserts-sends" className="space-y-5">
          <h3 className="text-xl font-semibold tracking-tight text-slate-50">
            4. Inserts, Sends, Subgroups &amp; Mix Bus
          </h3>

          {/* Inserts / Sends tight split */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)]">
            <div className="space-y-4 text-sm text-slate-200">
              <div>
                <h4 className="text-sm font-semibold text-slate-50">
                  Inserts: In-Line Processing
                </h4>
                <p className="mt-1 text-sm text-slate-300">
                  An insert sits directly in the signal path. 100% of the signal
                  passes through it, then continues down the chain. Compressors,
                  EQs, de-essers, noise gates, and many saturation plug-ins are most
                  often used as inserts.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-50">
                  Sends: Parallel / Shared Processing
                </h4>
                <p className="mt-1 text-sm text-slate-300">
                  A send creates a copy of the signal and routes it to another
                  destination at a level you choose. That copy is processed on an{" "}
                  <span className="font-medium">aux return</span> and then blended
                  back into the mix.
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  Classic examples: reverb and delay buses, headphone mixes, and
                  parallel compression.
                </p>
              </div>

              <p className="text-xs text-slate-300">
                Think of inserts as effects pedals wired in series, and sends as a
                side road that rejoins the main highway.
              </p>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative h-56 w-full">
                <ZoomableImage
                  src="/assets/music-production/daw-signal-flow/diagrams/insert-vs-send.jpg"
                  alt="Diagram comparing insert path and send/return path"
                />
              </div>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Insert path: the whole signal passes through the processor in
                series. Send path: a copy of the signal goes to a shared effect and
                is blended back in.
              </figcaption>
            </figure>
          </div>

          {/* Subgroups */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)]">
            <div className="space-y-3 text-sm text-slate-200">
              <h4 className="text-sm font-semibold text-slate-50">
                Subgroups &amp; Mix Bus
              </h4>
              <p>
                A <span className="font-medium">subgroup</span> (or bus) is a
                fader that controls multiple channels at once. Drums, background
                vocals, guitars — each can have its own subgroup for shared
                processing and level control.
              </p>
              <p>
                Subgroups are where glue compression, group EQ, and broad moves
                happen. They also make automation way easier: ride one fader instead
                of twelve.
              </p>
              <p className="text-xs text-slate-300">
                At the end of the chain, everything feeds the{" "}
                <span className="font-semibold">mix bus</span>. Treat that like the
                “master lens” for your entire record.
              </p>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative h-56 w-full">
                <ZoomableImage
                  src="/assets/music-production/daw-signal-flow/diagrams/sub-group-diagram.jpg"
                  alt="Subgroup routing diagram"
                />
              </div>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Multiple channels feeding a drum subgroup, then the mix bus. Same
                idea in hardware and in your DAW.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 5. A/D & D/A CONVERSION */}
        <section id="conversion" className="space-y-5">
          <h3 className="text-xl font-semibold tracking-tight text-slate-50">
            5. A/D &amp; D/A Conversion
          </h3>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr),minmax(0,1.2fr)] lg:items-start">
            {/* Left: digital diagrams stacked, scrollable on smaller screens */}
            <div className="space-y-3">
              <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <div className="relative h-28 w-full">
                  <ZoomableImage
                    src="/assets/music-production/daw-signal-flow/diagrams/digital/digital1.jpg"
                    alt="Sine wave entering digital system"
                  />
                </div>
              </figure>
              <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <div className="relative h-28 w-full">
                  <ZoomableImage
                    src="/assets/music-production/daw-signal-flow/diagrams/digital/digital2.jpg"
                    alt="Sine wave being sampled at discrete points"
                  />
                </div>
              </figure>
              <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <div className="relative h-28 w-full">
                  <ZoomableImage
                    src="/assets/music-production/daw-signal-flow/diagrams/digital/digital3.jpg"
                    alt="Sample points only view"
                  />
                </div>
              </figure>
              <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <div className="relative h-28 w-full">
                  <ZoomableImage
                    src="/assets/music-production/daw-signal-flow/diagrams/digital/digital4.jpg"
                    alt="Blocky reconstruction with few samples"
                  />
                </div>
              </figure>
              <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <div className="relative h-28 w-full">
                  <ZoomableImage
                    src="/assets/music-production/daw-signal-flow/diagrams/digital/digital5.jpg"
                    alt="Smooth waveform after interpolation"
                  />
                </div>
              </figure>
            </div>

            {/* Right: explanation + listening test */}
            <div className="space-y-4 text-sm text-slate-200">
              <p>
                Your converters are the doorway between the analog world and the
                digital one. <span className="font-medium">A/D</span> (analog to
                digital) conversion takes air pressure turned into voltage and
                measures it thousands of times per second.{" "}
                <span className="font-medium">D/A</span> (digital to analog)
                conversion turns those numbers back into voltage for your speakers
                or headphones.
              </p>
              <p>
                The <span className="font-medium">sample rate</span> is how many
                times per second your interface measures the waveform. The{" "}
                <span className="font-medium">bit depth</span> is how precisely it
                measures each sample.
              </p>
              <p className="text-xs text-slate-300">
                Higher sample rates and bit depths capture more detail, but also use
                more CPU and disk space. The goal is to choose a rate that&apos;s
                transparent <em>and</em> practical for the kind of work you do.
              </p>

              {/* Vocal sample comparison */}
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-50">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Listen • Sample Rate Comparison (Vocal)
                </p>
                <p className="mt-2">
                  These are the same short vocal phrase bounced at different sample
                  rates. Start at 48 kHz and work your way down. Listen for top-end
                  clarity, transient detail, and aliasing / artifacts.
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {[
                    { label: "48 kHz (reference)", file: "48khz.wav" },
                    { label: "32 kHz", file: "32khz.wav" },
                    { label: "24 kHz", file: "24khz.wav" },
                    { label: "16 kHz", file: "16khz.wav" },
                    { label: "11.025 kHz", file: "11.025khz.wav" },
                    { label: "8 kHz", file: "8khz.wav" },
                  ].map((s) => (
                    <div
                      key={s.file}
                      className="rounded-xl border border-emerald-500/30 bg-black/60 p-2"
                    >
                      <p className="text-[11px] font-semibold text-emerald-200">
                        {s.label}
                      </p>
                      <audio
                        className="mt-1 w-full"
                        controls
                        src={`/assets/music-production/daw-signal-flow/samples/${s.file}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. DAW / PRO TOOLS SIGNAL FLOW */}
        <section id="daw-flow" className="space-y-5">
          <h3 className="text-xl font-semibold tracking-tight text-slate-50">
            6. DAW / Pro Tools Signal Flow
          </h3>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)]">
            <div className="space-y-3 text-sm text-slate-200">
              <p>
                Now we connect everything: how audio moves from input, through your
                DAW, into plug-ins, buses, and the mix bus, and back out your
                interface to the speakers.
              </p>
              <p>
                The diagram on the right is your roadmap. Any time you&apos;re
                stuck, find where the signal should be, then trace the path until
                you find where it stops.
              </p>
              <p className="text-xs text-slate-300">
                Your homework later in the course will be to redraw a simplified
                version of this from memory. Once you can do that, routing will feel
                second-nature.
              </p>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative h-[420px] w-full">
                <ZoomableImage
                  src="/assets/music-production/daw-signal-flow/diagrams/daw-sig-flow.jpg"
                  alt="808 Academy Pro Tools signal flow master diagram"
                />
              </div>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Use this diagram as a roadmap when troubleshooting: follow the path
                until you find where signal stops.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 7. TRACK TYPES & NAMING */}
        <section id="track-types" className="space-y-5">
          <h3 className="text-xl font-semibold tracking-tight text-slate-50">
            7. Track Types &amp; Naming
          </h3>

          <div className="space-y-4 text-sm text-slate-200">
            <p>
              Track types are just different containers inside the same signal flow
              system. Once you know what each one is good at, building a session
              becomes as simple as choosing the right containers and labeling them
              clearly.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Watch • Pro Tools Track Types
            </p>
            <div className="mt-2 aspect-video w-full rounded-xl border border-slate-800/80 bg-black/80">
              <iframe
                src="https://www.youtube.com/embed/BBfKJHkFj0w"
                className="h-full w-full rounded-xl"
                title="Pro Tools track types overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* MIDI vs audio & naming examples, tighter layout */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr),minmax(0,1.2fr)]">
            <div className="space-y-4 text-xs text-slate-200">
              <div className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  MIDI vs Audio
                </p>
                <p className="mt-1">
                  Audio tracks store recorded sound: waveforms with tone, noise, and
                  dynamics. MIDI tracks store performance data: which note, how
                  hard, how long, which controller, etc.
                </p>
                <p className="mt-1">
                  MIDI needs an instrument (synth, sampler, drum plug-in) to turn
                  that data into sound. But from a routing perspective, once the
                  instrument is generating audio, it flows through the same inserts,
                  sends, and buses as a regular audio track.
                </p>
                <div className="mt-3 rounded-xl border border-slate-800/80 bg-slate-950/80 p-3">
                  <div className="relative h-40 w-full">
                    <ZoomableImage
                      src="/assets/music-production/daw-signal-flow/images/MIDI%20vs%20AUDIO.png"
                      alt="MIDI piano roll vs audio waveform comparison"
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-slate-400">
                    Audio shows up as waveforms. MIDI shows up as piano-roll note
                    blocks. Both flow through the same mix architecture.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-200">
              <div className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Track Naming: Help Future You
                </p>
                <p className="mt-1">
                  Clear naming makes every future decision easier — especially when
                  you reopen a session weeks later or collaborate with someone else.
                </p>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <figure className="rounded-xl border border-slate-800/80 bg-slate-950/80 p-3">
                    <div className="relative h-40 w-full">
                      <ZoomableImage
                        src="/assets/music-production/daw-signal-flow/images/naming-donts.png"
                        alt="Messy track naming example"
                      />
                    </div>
                    <figcaption className="mt-2 text-[11px] text-slate-400">
                      &quot;Audio 1, Audio 2, New Track 3&quot; — this gets
                      unmanageable fast.
                    </figcaption>
                  </figure>
                  <figure className="rounded-xl border border-slate-800/80 bg-slate-950/80 p-3">
                    <div className="relative h-40 w-full">
                      <ZoomableImage
                        src="/assets/music-production/daw-signal-flow/images/naming-dos.png"
                        alt="Clean track naming example"
                      />
                    </div>
                    <figcaption className="mt-2 text-[11px] text-slate-400">
                      Clear, consistent names (Kick_In, LV_Lead, GTR_Chorus_L) make
                      routing and editing effortless.
                    </figcaption>
                  </figure>
                </div>
              </div>

              {/* Pro Tools setup tutorial + checklist CTA */}
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Tutorial • Pro Tools Session Setup
                </p>
                <p className="mt-2 text-emerald-50">
                  In this walkthrough, we&apos;ll set Pro Tools preferences, key
                  commands, and default session layout so your system behaves like
                  the demos in this course.
                </p>
                <div className="mt-2 aspect-video w-full rounded-xl border border-emerald-500/30 bg-black/80">
                  <iframe
                    src="https://www.youtube.com/embed/5K_QP4O6h6I"
                    className="h-full w-full rounded-xl"
                    title="Pro Tools session setup tutorial"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="mt-3 rounded-xl border border-emerald-500/40 bg-black/70 p-3 text-[11px] text-emerald-50">
                  <p className="font-semibold">
                    Download • Pro Tools Setup Checklist (PDF)
                  </p>
                  <p className="mt-1 opacity-80">
                    When the downloads section is live, this bubble will link to a
                    printable checklist so you can mirror the exact settings used in
                    class.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. APPLIED PRACTICE (kept simple for now) */}
        <section id="applied-practice" className="space-y-4">
          <h3 className="text-xl font-semibold tracking-tight text-slate-50">
            8. Applied Practice
          </h3>
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-sm text-slate-200">
            <p>
              In class we&apos;ll walk through building a session from scratch:
              creating tracks, assigning I/O, building subgroups, and setting up
              headphone mixes. The goal is that you can close your eyes and still
              &quot;see&quot; where the audio is flowing.
            </p>
            <p className="mt-2 text-xs text-slate-300">
              You&apos;ll also get a troubleshooting worksheet that gives you
              real-world &quot;no sound&quot; scenarios to solve using signal-flow
              thinking.
            </p>
          </div>
        </section>

        {/* 9. SUMMARY */}
        <section id="summary" className="space-y-4">
          <h3 className="text-xl font-semibold tracking-tight text-slate-50">
            9. Summary &amp; Master Diagram
          </h3>
          <div className="space-y-3 text-sm text-slate-200">
            <p>
              Signal flow is the skeleton of every studio, from bedroom to
              world-class facility. Once you can describe how audio moves from{" "}
              <span className="font-medium">source → preamp → A/D → DAW → plug-ins
              / buses → mix bus → D/A → monitors</span>, everything else in this
              course will feel easier.
            </p>
            <p>
              Consoles and DAWs may look different on the surface, but under the
              hood they share the same building blocks: inputs, processing, sends,
              subgroups, and a mix bus. Learn those once and you can walk into almost
              any studio and feel at home.
            </p>
            <p className="text-xs text-slate-300">
              Later we&apos;ll hook this chapter up to a short quiz and a couple of
              interactive questions powered by Supabase so you can test yourself
              before moving on.
            </p>
          </div>

          <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
            <div className="relative h-[420px] w-full">
              <ZoomableImage
                src="/assets/music-production/daw-signal-flow/diagrams/daw-sig-flow.jpg"
                alt="Full DAW signal flow master diagram"
              />
            </div>
            <figcaption className="mt-2 text-[11px] text-slate-400">
              Keep this diagram handy while you work. When something breaks, walk
              the path until you find the missing link.
            </figcaption>
          </figure>
        </section>
      </div>

      {/* IMAGE ZOOM MODAL */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setZoomImage(null)}
        >
          <div className="relative h-full max-h-[90vh] w-full max-w-4xl">
            <Image
              src={zoomImage.src}
              alt={zoomImage.alt}
              fill
              className="object-contain"
            />
            <button
              type="button"
              onClick={() => setZoomImage(null)}
              className="absolute right-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-slate-100"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
