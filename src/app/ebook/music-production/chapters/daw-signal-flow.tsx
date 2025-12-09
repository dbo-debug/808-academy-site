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
      className="relative h-full w-full cursor-zoom-in"
      onClick={() => setZoomImage({ src, alt })}
      aria-label={`Zoom image: ${alt}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`rounded-xl object-contain ${className ?? ""}`}
      />
    </button>
  );

  return (
    <>
      {/* MAIN CONTENT */}
      <div className="space-y-10">
        {/* HERO / TITLE */}
        <section className="space-y-6">
          <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-black/80">
            <div className="relative h-[28rem] w-full sm:h-[32rem]">
              <Image
                src="/assets/music-production/daw-signal-flow/images/neve.jpg"
                alt="Analog Neve console"
                fill
                priority
                className="object-cover brightness-[0.35]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/35" />
            </div>

            <div className="absolute inset-0 flex flex-col justify-center gap-8 p-6 sm:p-9 md:p-14">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-3">
                  <p className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-200">
                    Chapter 1
                  </p>
                  <h2 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                    DAW Signal Flow
                  </h2>
                  <p className="max-w-2xl text-sm text-slate-200 sm:text-base">
                    Build a mental map for how audio moves: mic → console →
                    interface → DAW → plug-ins → buses → speakers. Once you see the
                    path, every routing problem becomes solvable.
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-50 md:max-w-xs">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    Big Idea
                  </p>
                  <p className="mt-2">
                    Complex sessions are just simple signal paths stacked together.
                    Master the path once and you can troubleshoot anything.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 md:items-start md:pr-6">
                <aside className="rounded-2xl border border-slate-800/80 bg-black/70 p-4 text-xs text-slate-200 backdrop-blur">
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
                        onClick={() => scrollToSection("analog-console-channel-strip")}
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
                        8. Apply to Your Project
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => scrollToSection("summary")}
                        className="hover:text-emerald-300"
                      >
                        9. Homework &amp; Summary
                      </button>
                    </li>
                  </ol>
                </aside>

                <div className="rounded-2xl border border-slate-800/80 bg-black/70 p-4 text-xs text-slate-200 backdrop-blur">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    You&apos;ll Learn
                  </p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    <ul className="ml-4 list-disc space-y-1">
                      <li>Signal flow fundamentals</li>
                      <li>Console channel strip → DAW</li>
                      <li>Inserts, sends, buses, subgroups</li>
                      <li>A/D &amp; D/A conversion basics</li>
                    </ul>
                    <ul className="ml-4 list-disc space-y-1">
                      <li>Track types, I/O, and naming</li>
                      <li>Routing templates for speed</li>
                      <li>Troubleshooting paths</li>
                      <li>Building your project session</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 1. WHAT IS SIGNAL FLOW */}
        <section id="what-is-signal-flow" className="space-y-5">
          <h3 className="text-xl font-semibold tracking-tight text-slate-50">
            1. What Is Signal Flow?
          </h3>

          <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-start">
            {/* Text + path bubble right */}
            <div className="order-2 flex h-full flex-col gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-sm text-slate-200 md:order-2">
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

            {/* Large diagram left, fuller width */}
            <figure className="order-1 rounded-2xl border border-slate-800/80 bg-black/80 p-4 md:order-1">
              <div className="relative h-[36rem] w-full">
                <ZoomableImage
                  src="/assets/music-production/daw-signal-flow/diagrams/analog-sig.jpg"
                  alt="Simplified mic to preamp to interface to DAW to speakers signal flow diagram"
                />
              </div>
              <figcaption className="mt-3 text-center text-[11px] text-slate-400">
                Big picture: one clean path in, one clean path out. Everything else
                is detail.
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
                src="https://www.youtube.com/embed/_55VqPSSwV0"
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

  <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
    <figure className="rounded-2xl border border-slate-800/80 bg-black/90 p-4">
      <div className="relative mx-auto h-[900px] w-full max-w-4xl">
        <ZoomableImage
          src="/assets/music-production/daw-signal-flow/images/ssl-9000.jpg"
          alt="SSL 9000K analog console channel strip"
          className="object-cover"
        />
      </div>
      <figcaption className="mt-2 text-[11px] text-slate-400">
        SSL 9000K: labeled blocks for routing, gain, dynamics, EQ, sends, pan, and fader/output.
      </figcaption>
    </figure>

    <div className="flex h-full flex-col gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-sm text-slate-200">
      <p>
        Before DAWs, engineers learned signal flow on large-format analog consoles.
        Each vertical strip is one channel, and the layout repeats across the desk.
        Once you understand one strip from top to bottom, a DAW like Pro Tools
        stops being mysterious and just feels like a virtual console.
      </p>
      <p>
        This strip is based on an <span className="font-medium">SSL 9000K</span>
        — a classic desk behind a huge number of hit records. The labeled blocks
        show routing/input selection, gain, dynamics, EQ, sends/cues, pan, and
        fader/output.
      </p>
      <p>
        Routing sits near the top because that’s where you decide where the signal
        enters and where it can be sent. Processing blocks (dynamics, EQ, filters)
        live through the middle. The fader/output block controls level and where the
        channel feeds next (bus, interface, print track); it isn’t a “bus section”
        by itself.
      </p>
      <p>
        When troubleshooting, “walk down the strip” in order. If the signal
        disappears, you know exactly which stage to inspect. The digital mixer in
        your DAW mirrors this same path: one clean path in, one clean path out.
      </p>
      <p className="text-xs text-slate-300">
        Start at the top, shape and control the signal as it moves through each
        block, then feed the fader to the right destination. Once you recognize the
        order, every channel strip—hardware or software—feels predictable.
      </p>
    </div>
  </div>

  <div className="mt-6 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-50">
    <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
      DAW Version • Same Flow, Virtual Knobs
    </h3>
    <div className="mt-2 space-y-3">
      <figure className="rounded-xl border border-emerald-500/40 bg-black/80 p-2">
        <div className="relative w-full">
          <Image
            src="/assets/music-production/daw-signal-flow/images/pt-ssl.jpg"
            alt="SSL-style channel strip plug-in"
            width={1600}
            height={800}
            className="h-full w-full rounded-lg object-contain"
          />
        </div>
      </figure>
      <p className="text-sm">
        The Pro Tools mixer is just a digital version of this same strip — repeated
        50 times. Once you know the order on hardware, every DAW channel strip
        feels familiar.
      </p>
    </div>
  </div>
</section>
      
        {/* 3. DI VS MIC PATHS */}
        <section id="di-vs-mic" className="space-y-5">
          <h3 className="text-xl font-semibold tracking-tight text-slate-50">
            3. DI vs Mic Paths (Instrument Level vs Mic Level)
          </h3>

          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div className="space-y-3 text-sm text-slate-200 md:order-1">
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

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-2 md:order-2">
              <div className="relative h-[22rem] w-full">
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
              <p className="mt-3 text-[11px] text-slate-300">
                Many sessions capture both a close mic and a clean DI for safety and
                re-amping later.
              </p>
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
            </div>
          </div>
        </section>

        {/* 4. INSERTS, SENDS, SUBGROUPS & MIX BUS */}
        <section id="inserts-sends" className="space-y-5">
          <h3 className="text-xl font-semibold tracking-tight text-slate-50">
            4. Inserts, Sends, Subgroups &amp; Mix Bus
          </h3>

          {/* Inserts / Sends: image left, text right */}
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <figure className="order-1 rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative h-72 w-full">
                <ZoomableImage
                  src="/assets/music-production/daw-signal-flow/diagrams/insert-vs-send.jpg"
                  alt="Diagram explaining inserts versus sends"
                />
              </div>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Inserts: in-line. Sends: a copy to a return, blended back in.
              </figcaption>
            </figure>

            <div className="order-2 space-y-4 text-sm text-slate-200">
              <div>
                <h4 className="text-sm font-semibold text-slate-50">4.1 Inserts: In-Line Processing</h4>
                <p className="mt-1 text-sm text-slate-300">
                  An insert sits directly in the signal path. 100% of the signal passes through it, then continues down the chain. Compressors, EQs, de-essers, noise gates, and many saturation plug-ins are most often used as inserts.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-50">4.2 Sends: Parallel / Shared Processing</h4>
                <p className="mt-1 text-sm text-slate-300">
                  A send creates a copy of the signal and routes it to another destination at a level you choose. That copy is processed on an <span className="font-medium">aux return</span> and then blended back into the mix.
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  Classic examples: reverb and delay buses, headphone mixes, and parallel compression.
                </p>
              </div>

              <p className="text-xs text-slate-300">
                Think of inserts as effects pedals wired in series, and sends as a side road that rejoins the main highway.
              </p>
            </div>
          </div>

          {/* Subgroup + mix bus: text left, image right */}
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div className="order-1 space-y-3 text-sm text-slate-200">
              <h4 className="text-sm font-semibold text-slate-50">4.3 Subgroups &amp; Mix Bus</h4>
              <p>
                A <span className="font-medium">subgroup</span> (or bus) routes multiple channels to a shared fader. Drum bus, guitar bus, and vocal bus are common examples. This lets you compress, EQ, or automate a whole group at once.
              </p>
              <p>
                The <span className="font-medium">mix bus</span> is the final stereo (or surround) sum. Everything eventually passes through it—often hitting light compression or limiting for glue before export.
              </p>
              <p className="text-xs text-slate-300">
                In Pro Tools, use aux tracks for subgroups and the built-in Master Fader for the mix bus.
              </p>
            </div>

            <figure className="order-2 rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative h-64 w-full">
                <ZoomableImage
                  src="/assets/music-production/daw-signal-flow/diagrams/sub-group-diagram.jpg"
                  alt="Diagram showing subgroup and mix bus routing"
                />
              </div>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Subgroups combine related channels. Mix bus is the final stereo sum.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 5. A/D & D/A CONVERSION */}
        <section id="conversion" className="space-y-5">
          <h3 className="text-xl font-semibold tracking-tight text-slate-50">
            5. A/D &amp; D/A Conversion
          </h3>

          <div className="space-y-4">
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

            <div className="rounded-2xl border border-slate-800/80 bg-black/80 p-6">
              <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-6">
                {[
                  { src: "digital1.jpg", alt: "Sine wave entering digital system" },
                  { src: "digital2.jpg", alt: "Sine wave being sampled at discrete points" },
                  { src: "digital3.jpg", alt: "Sample points only view" },
                  { src: "digital4.jpg", alt: "Blocky reconstruction with few samples" },
                  { src: "digital5.jpg", alt: "Smooth waveform after interpolation" },
                ].map((img) => (
                  <figure
                    key={img.src}
                    className="rounded-xl border border-slate-800/80 bg-slate-950/80 p-4"
                  >
                    <div className="relative h-64 w-72 sm:h-72 sm:w-80">
                      <ZoomableImage
                        src={`/assets/music-production/daw-signal-flow/diagrams/digital/${img.src}`}
                        alt={img.alt}
                      />
                    </div>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. DAW / PRO TOOLS SIGNAL FLOW */}
        <section id="daw-flow" className="space-y-5">
          <h3 className="text-xl font-semibold tracking-tight text-slate-50">
            6. DAW / Pro Tools Signal Flow
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:items-stretch">
            <div>
              <div className="h-full rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-sm text-slate-200">
                <p>
                  Now we connect everything: how audio moves from input, through
                  your DAW, into plug-ins, buses, and the mix bus, and back out your
                  interface to the speakers. Every troubleshooting moment comes back
                  to this single chain: if something goes quiet or distorts, one
                  hop in the path is broken or misrouted.
                </p>
                <p className="mt-3">
                  The diagram on the right is your roadmap. Any time you&apos;re
                  stuck, find where the signal should be, then trace the path until
                  you find where it stops. Inputs feed channels, inserts process,
                  sends branch to effects, buses collect groups, and the mix bus
                  feeds your monitor path.
                </p>
                <p className="mt-3 text-xs text-slate-300">
                  Your homework later in the course will be to redraw a simplified
                  version of this from memory. Once you can do that, routing will
                  feel second-nature. Keep this mental checklist nearby and you can
                  solve nearly any DAW routing problem under pressure.
                </p>
              </div>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative h-full min-h-[620px] w-full">
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
                src="https://www.youtube.com/embed/ADHHEGI_S9Y"
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
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  <figure className="flex flex-col items-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-3">
                    <div className="relative h-[28rem] w-full max-w-[400px] sm:h-[30rem]">
                      <ZoomableImage
                        src="/assets/music-production/daw-signal-flow/images/naming-donts.png"
                        alt="Messy track naming example"
                        className="object-contain"
                      />
                    </div>
                    <figcaption className="mt-1 text-[11px] text-slate-400 text-center">
                      &quot;Audio 1, Audio 2, New Track 3&quot; — this gets
                      unmanageable fast.
                    </figcaption>
                  </figure>
                  <figure className="flex flex-col items-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-3">
                    <div className="relative h-[28rem] w-full max-w-[400px] sm:h-[30rem]">
                      <ZoomableImage
                        src="/assets/music-production/daw-signal-flow/images/naming-dos.png"
                        alt="Clean track naming example"
                        className="object-contain"
                      />
                    </div>
                    <figcaption className="mt-1 text-[11px] text-slate-400 text-center">
                      Clear, consistent names (Kick_In, LV_Lead, GTR_Chorus_L) make
                      routing and editing effortless.
                    </figcaption>
                  </figure>
                </div>
              </div>

              {/* Pro Tools setup tutorial */}
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
              </div>
            </div>
          </div>
        </section>

        {/* 8. APPLY TO YOUR PROJECT */}
        <section id="applied-practice" className="space-y-4">
          <h3 className="text-xl font-semibold tracking-tight text-slate-50">
            8. Apply to Your Project — Sound Palette &amp; Routing Plan
          </h3>
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-sm text-slate-200">
            <p>
              This week is about planning the session you&apos;ll build for the class
              project. Start assembling a <span className="font-semibold">sound palette</span>
              and a simple routing template you can reuse.
            </p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-slate-800/80 bg-black/80 p-3 text-xs">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Sound Palette (Exploration)
                </p>
                <ul className="mt-2 ml-4 list-disc space-y-1">
                  <li>Collect 10–15 drum, bass, and melodic sounds you love.</li>
                  <li>Tag 2–3 reference tracks for tone and space.</li>
                  <li>Note which sounds are mono vs. stereo and why.</li>
                  <li>Save presets/patches so you can recall them later.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-800/80 bg-black/80 p-3 text-xs">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Routing Template (Draft)
                </p>
                <ul className="mt-2 ml-4 list-disc space-y-1">
                  <li>Create buses: Drums, Music/Instr, FX, Vox (even if empty).</li>
                  <li>Label I/O clearly; color-code groups.</li>
                  <li>Add 2–3 go-to sends (plate verb, short delay, slap).</li>
                  <li>Save as a template for reuse in later chapters.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 9. HOMEWORK */}
        <section id="summary" className="space-y-4">
          <h3 className="text-xl font-semibold tracking-tight text-slate-50">
            9. Homework — Templates &amp; Sound Palette Prep
          </h3>
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-50">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Deliverables
            </p>
            <ul className="mt-2 ml-4 list-disc space-y-1 text-emerald-100">
              <li>One genre-specific template (session with buses, sends, I/O labeled).</li>
              <li>Optional: a second template in another genre to compare routing.</li>
              <li>A documented sound palette list with at least 10 core sounds.</li>
            </ul>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Notes
            </p>
            <ul className="mt-1 ml-4 list-disc space-y-1 text-emerald-100">
              <li>Keep templates simple: fewer tracks, clear groups, no plug-in bloat.</li>
              <li>Mark which sounds are “must use” vs. “maybe” for the project.</li>
              <li>Bring the template to the next chapter — we’ll build on it.</li>
            </ul>
            <p className="mt-3 text-xs text-emerald-100">
              Keep the master signal-flow diagram handy while you work. When something
              breaks, walk the path until you find the missing link.
            </p>
          </div>
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
