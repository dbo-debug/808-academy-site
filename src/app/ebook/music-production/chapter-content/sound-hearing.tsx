"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

type ZoomImageState = {
  src: string;
  alt: string;
} | null;

export default function SoundHearingChapter() {
  const [zoomImage, setZoomImage] = React.useState<ZoomImageState>(null);

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

  // Helper for sine-wave filenames (16k + 10k special cases)
  const getSinePath = (hz: string) => {
    if (hz === "10000") {
      return "/assets/music-production/sound-hearing/sinewave-samples/10000HZ-SigGen_02-01.mp3";
    }
    if (hz === "16000") {
      return "/assets/music-production/sound-hearing/sinewave-samples/16000HZ-SigGen_02-01.mp3";
    }
    return `/assets/music-production/sound-hearing/sinewave-samples/${hz}HZ-SigGen_01-01.mp3`;
  };

  return (
    <>
      <div id="top" className="space-y-12">
        {/* HERO / TITLE PAGE */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-950 via-black to-slate-950">
          {/* Background video */}
          <div className="pointer-events-none absolute inset-0 opacity-35">
            <video
              className="h-full w-full object-cover"
              src="/assets/music-production/sound-hearing/images/sound-bkgrnd.jpg"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          </div>

          {/* Foreground content */}
          <div className="relative z-10 space-y-8 p-6 sm:p-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-3">
                <p className="inline-flex items-center rounded-full border border-emerald-500/40 bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                  Pre-Class • Sound &amp; Hearing Fundamentals
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                  Sound &amp; Hearing Fundamentals
                </h2>
                <p className="max-w-2xl text-sm text-slate-200 sm:text-base">
                  Before you tweak a single plug-in, you need to understand the air
                  around you, how vibration becomes sound, how your ears decode it,
                  and how your brain decides what to pay attention to. This
                  pre-lesson is your launchpad for everything in Music Production.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-50 md:max-w-xs">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Big Idea
                </p>
                <p className="mt-2">
                  Sound is just moving air. Learn how it behaves and how your ears
                  perceive it so every production decision is intentional.
                </p>
                <p className="mt-3 text-[11px] text-emerald-200">
                  Complete every Listen/Watch box before Week 1.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-800/80 bg-black/70 p-4 text-xs text-slate-200 backdrop-blur">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Chapter Map
                </p>
                <p className="mt-2 text-[12px] text-slate-300">
                  Jump to any section as you work through this pre-class lesson.
                </p>
                <ul className="mt-3 space-y-1.5">
                  <li>
                    <a href="#intro-air" className="hover:text-emerald-300">
                      Intro — The Air Around You
                    </a>
                  </li>
                  <li>
                    <a href="#what-is-sound" className="hover:text-emerald-300">
                      1. What Is Sound?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#waveform-characteristics"
                      className="hover:text-emerald-300"
                    >
                      2. Waveform Characteristics
                    </a>
                  </li>
                  <li>
                    <a href="#timbre-harmonics" className="hover:text-emerald-300">
                      3. Timbre &amp; Harmonics
                    </a>
                  </li>
                  <li>
                    <a href="#how-we-hear" className="hover:text-emerald-300">
                      4. How We Hear
                    </a>
                  </li>
                  <li>
                    <a href="#psychoacoustics" className="hover:text-emerald-300">
                      5. Psychoacoustics
                    </a>
                  </li>
                  <li>
                    <a href="#stereo-imaging" className="hover:text-emerald-300">
                      6. Stereo Imaging &amp; Space
                    </a>
                  </li>
                  <li>
                    <a href="#review" className="hover:text-emerald-300">
                      7. Review &amp; Knowledge Check
                    </a>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-xs text-slate-200 backdrop-blur">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  You&apos;ll Learn
                </p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  <ul className="ml-4 list-disc space-y-1">
                    <li>What sound actually is</li>
                    <li>Waveform &amp; frequency basics</li>
                    <li>How the ear &amp; cochlea work</li>
                    <li>Psychoacoustics &amp; masking</li>
                  </ul>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>Protecting your ears</li>
                    <li>Stereo imaging &amp; space</li>
                    <li>Critical listening habits</li>
                    <li>How to apply this before Week 1</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO: THE AIR AROUND YOU */}
        <section id="intro-air" className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight text-slate-50">
            Introduction: The Air Around You
          </h2>
          <div className="space-y-3 text-sm text-slate-200">
            <p>
              In this lesson, we will take a look at the physics of sound. We will
              understand how sound travels through air, how our ears receive sound,
              and how our brains interpret the sounds we are receiving. Understanding
              this will help us build a foundation for how we can manipulate audio
              and create an experience, balance, and blend with the instruments that
              we are mixing.
            </p>
            <p>
              Before we talk about sound, let&apos;s start with the air itself.
              You&apos;re surrounded by billions of tiny air molecules bouncing off
              everything around you. This invisible ocean is called{" "}
              <span className="font-medium">atmospheric pressure</span> — steady,
              but never still.
            </p>
            <p>
              When something vibrates — a vocal cord, guitar string, or speaker
              cone — it pushes and pulls against these air molecules, creating
              alternating regions of{" "}
              <span className="font-medium">compressions</span> (high pressure
              regions) and <span className="font-medium">rarefactions</span> (low
              pressure regions). Those changes in pressure move outward as waves:
              <span className="font-semibold"> sound</span>.
            </p>
          </div>

          {/* Watch box */}
          <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/80">
            <div className="border-b border-slate-800/80 bg-slate-900/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Watch • Speaker vibrating &amp; air molecules
            </div>
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/feFBAt5IBZg"
                className="h-full w-full"
                title="Speaker vibration and air motion"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:items-center">
            <figure className="flex h-full flex-col rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative h-full w-full min-h-[220px] aspect-[16/10]">
                <ZoomableImage
                  src="/assets/music-production/sound-hearing/diagrams/speaker-soundwave-diagram.jpg"
                  alt="Speaker creating high and low pressure regions in the air"
                  className="rounded-xl"
                />
              </div>
              <figcaption className="mt-2 text-center text-[11px] text-slate-400">
                A vibrating speaker cone creates alternating high-pressure
                (compression) and low-pressure (rarefaction) regions that travel
                through the air.
              </figcaption>
            </figure>
            <div className="flex h-full flex-col rounded-2xl border border-slate-800/80 bg-slate-950/80 p-5 text-sm text-slate-200 space-y-3">
              <h3 className="text-sm font-semibold text-slate-50">
                Compression vs. Rarefaction
              </h3>
              <p className="leading-relaxed text-slate-200">
                Any sound wave is just air pressure going up and down over time:
                high-pressure regions called{" "}
                <span className="font-semibold text-emerald-300">compressions</span>{" "}
                and low-pressure regions called{" "}
                <span className="font-semibold text-emerald-300">rarefactions</span>.
                As these regions move away from the source, they form the waveform
                you&apos;ll see inside your DAW.
              </p>
              <p className="leading-relaxed text-slate-200">
                You’ll lock this in with the Foundations quiz in the Student Lounge.
              </p>
            </div>
          </div>
        </section>

        {/* 1. WHAT IS SOUND */}
        <section id="what-is-sound" className="space-y-5">
          <h2 className="text-xl font-semibold tracking-tight text-slate-50">
            1. What Is Sound?
          </h2>

          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex-1 space-y-3 text-sm text-slate-200">
              <p>
                Sound is made possible through the vibrations of an object displacing
                the air molecules around it. When we talk, our vocal cords vibrate
                together at high speed, creating constantly changing patterns of air
                pressure.
              </p>
              <p>
                In the same way, instruments create sound by vibrating strings,
                skins, columns of air, or physical bodies. Those vibrations travel
                through the air to your ears, where they&apos;re converted into
                electrical signals your brain can understand.
              </p>
              <p>
                On a graph, these changing pressure regions appear as a{" "}
                <span className="font-medium">sound wave</span> — a curve that
                rises where the air is more compressed and falls where the air is
                less dense. Most of the time, the complex waves you see in a DAW are
                made of many simple waves combined.
              </p>
            </div>

            <figure className="flex-1 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-3">
              <div className="relative h-56 w-full">
                <ZoomableImage
                  src="/assets/music-production/sound-hearing/diagrams/waveform-diagram.jpg"
                  alt="Basic waveform diagram showing high and low pressure regions"
                />
              </div>
              <figcaption className="mt-2 text-xs text-slate-300">
                A basic waveform: peaks represent higher pressure (compression), and
                valleys represent lower pressure (rarefaction) over time.
              </figcaption>
            </figure>
          </div>

          <div className="mt-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-50">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Watch • Vocal cords in slow motion
            </h3>
            <p className="mt-1">
              We usually never see our vocal cords, but they&apos;re the original
              oscillators in most modern music. This slow-motion video shows them
              vibrating as air passes through:
            </p>
            <div className="mt-2 aspect-video w-full rounded-xl border border-emerald-500/30 bg-black/60">
              <iframe
                src="https://www.youtube.com/embed/wYnPA7IXFIU"
                className="h-full w-full rounded-xl"
                title="Vocal cords in motion"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* 2. WAVEFORM CHARACTERISTICS */}
        <section id="waveform-characteristics" className="space-y-5">
          <h2 className="text-xl font-semibold tracking-tight text-slate-50">
            2. Waveform Characteristics
          </h2>
          <p className="text-sm text-slate-200">
            A <span className="font-medium">waveform</span> is the graphic
            representation of the amplitude of a sound pressure wave over a period
            of time. Because sound waves happen over time, we call them{" "}
            <span className="font-medium">periodic</span>. In mathematics, a
            periodic function repeats its values in regular intervals or periods.
          </p>
          <p className="text-sm text-slate-200">
            As an engineer or producer, you&apos;ll learn how to manipulate various
            waveform characteristics using different tools and software. Everything
            you do to a waveform changes the way it sounds. Here are the core
            characteristics you&apos;ll work with all the time:
          </p>

          {/* Amplitude + Frequency */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 flex flex-col">
              <h3 className="text-sm font-semibold text-slate-50">
                Amplitude (dB) → Perceived Loudness
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Amplitude is a measurement of the intensity of the waveform&apos;s
                high- and low-pressure regions. We measure amplitude in{" "}
                <span className="font-medium">decibels (dB)</span>.
              </p>
              <p className="mt-2 text-sm text-slate-300">Amplitude can be viewed from:</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-xs text-slate-300">
                <li>
                  An acoustic standpoint —{" "}
                  <span className="font-medium">SPL (Sound Pressure Level)</span>.
                </li>
                <li>
                  An electrical standpoint — signal level (voltage) measured in dB.
                </li>
              </ul>
              <figure className="mt-3 flex-1 rounded-xl border border-slate-800/80 bg-black/60 p-3">
                <div className="relative h-full min-h-[9rem] w-full">
                  <ZoomableImage
                    src="/assets/music-production/sound-hearing/diagrams/history-of-db-diagram.png"
                    alt="Diagram explaining the history and meaning of decibels"
                  />
                </div>
                <figcaption className="mt-1 text-[11px] text-slate-400">
                  Decibels are logarithmic — small changes at the top of the scale
                  can mean huge jumps in energy.
                </figcaption>
              </figure>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 flex flex-col">
              <h3 className="text-sm font-semibold text-slate-50">
                Frequency (Hz) → Perceived Pitch
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Frequency is what we perceive as{" "}
                <span className="font-medium">pitch</span> — how high or low a sound
                feels. Every sound wave moves through cycles of pressure: one region
                of compression followed by one of rarefaction. The number of
                complete cycles that occur in one second is the frequency, measured
                in <span className="font-medium">Hertz (Hz)</span>.
              </p>
              <figure className="mt-3 flex-1 rounded-xl border border-slate-800/80 bg-black/60 p-3">
                <div className="relative h-full min-h-[9rem] w-full">
                  <ZoomableImage
                    src="/assets/music-production/sound-hearing/diagrams/frequency-diagram.png"
                    alt="Frequency diagram showing cycles per second"
                  />
                </div>
                <figcaption className="mt-1 text-[11px] text-slate-400">
                  Higher frequency → more cycles per second → higher perceived pitch.
                </figcaption>
              </figure>
              <p className="mt-2 text-xs text-slate-300">
                A higher frequency means more cycles per second, producing a higher
                pitched sound like a violin or hi-hat. Fewer cycles per second
                create a lower-pitched sound, like a bass guitar or kick drum.
              </p>
              <div className="mt-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs text-emerald-50">
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Watch • Understanding frequency
                </h4>
                <div className="mt-2 aspect-video w-full rounded-lg border border-emerald-500/30 bg-black/60">
                  <iframe
                    src="https://www.youtube.com/embed/Axx8WfxQDkk"
                    className="h-full w-full rounded-lg"
                    title="Frequency demonstration"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Wavelength & Velocity */}
          <div className="grid gap-6 md:grid-cols-2 md:items-start">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 flex flex-col">
              <h3 className="text-sm font-semibold text-slate-50">
                2.1 Wavelength → Physical Size of the Tone
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                The <span className="font-medium">wavelength</span> of a waveform is
                the physical distance between the beginning and end of one cycle.
                Wavelength depends on frequency:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-300">
                <li>Higher frequency → shorter wavelength.</li>
                <li>Lower frequency → longer wavelength.</li>
              </ul>
              <p className="mt-2 text-xs text-slate-300">
                In acoustics, this matters because large, low-frequency waves travel
                around obstacles more easily than short, high-frequency waves.
              </p>
              <figure className="mt-3 flex-1 rounded-xl border border-slate-800/80 bg-black/60 p-3">
                <div className="relative h-56 w-full">
                  <ZoomableImage
                    src="/assets/music-production/sound-hearing/diagrams/wavelength-diagram.png"
                    alt="Diagram comparing short and long wavelengths"
                  />
                </div>
                <figcaption className="mt-1 text-[11px] text-slate-400">
                  Long wavelengths (low frequencies) are physically large and can
                  bend around objects; short wavelengths are more directional.
                </figcaption>
              </figure>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 flex flex-col">
              <h3 className="text-sm font-semibold text-slate-50">
                2.2 Velocity → Speed Through a Medium
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                <span className="font-medium">Velocity</span> refers to the speed at
                which a sound wave travels through a medium. In air at sea level
                around 68°F (20°C), the speed of sound is roughly{" "}
                <span className="font-medium">343 m/s</span> (~761 mph), but it
                varies with temperature and air conditions.
              </p>
              <p className="mt-2 text-sm text-slate-300">
                When an object moves faster than the speed of sound, the pressure
                waves it creates pile up and merge into a single shock wave —
                producing a <span className="font-medium">sonic boom</span>.
              </p>
              <div className="mt-3 flex-1 rounded-xl border border-slate-800/80 bg-black/60 p-3 text-xs text-slate-300">
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Watch • Sonic boom in action
                </h4>
                <div className="mt-2 aspect-video w-full rounded-lg border border-slate-800/80 bg-black/80">
                  <iframe
                    src="https://www.youtube.com/embed/JO4_VHM69oI"
                    className="h-full w-full rounded-lg"
                    title="Sonic boom demonstration"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Phase */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
            <h3 className="text-sm font-semibold text-slate-50">
              Phase → Where a Wave Is in Its Cycle
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              <span className="font-medium">Phase</span> describes where a sound
              wave is in its cycle at any moment — at the start of a compression,
              the midpoint, or the start of a rarefaction.
            </p>
            <p className="mt-2 text-sm text-slate-300">
              When two or more sound waves interact, their phase relationship
              determines how they combine:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-300">
              <li>
                <span className="font-medium">In phase</span> (peaks and troughs
                aligned) → they reinforce each other → louder.
              </li>
              <li>
                <span className="font-medium">Out of phase</span> (peaks aligned
                with troughs) → they cancel each other → quieter or even silent.
              </li>
            </ul>

            <div className="mt-3 grid gap-4 md:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)]">
              <div className="rounded-xl border border-slate-800/80 bg-black/60 p-3 text-xs text-slate-300">
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Tutorial • Phase Cancellation
                </h4>
                <p className="mt-1">
                  Phase issues show up everywhere in recording and mixing: overhead
                  mics vs. close mics, layered kicks, parallel processing, live
                  setups, and more.
                </p>
                <video
                  className="mt-2 h-40 w-full rounded-lg border border-slate-800/80 object-cover"
                  src="/assets/music-production/sound-hearing/tutorial-lesson/phase.mp4"
                  controls
                />
              </div>
              <aside className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs text-emerald-50">
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Pro Tip • Mic placement &amp; phase
                </h4>
                <p className="mt-1">
                  Moving a microphone even a few centimeters can change phase
                  relationships and radically shift tone. If your drums, guitars, or
                  vocals feel hollow or thin, check phase before reaching for EQ.
                </p>
              </aside>
            </div>
          </div>
        </section>

        {/* 3. TIMBRE & HARMONICS */}
        <section id="timbre-harmonics" className="space-y-5">
          <h2 className="text-xl font-semibold tracking-tight text-slate-50">
            3. Timbre &amp; Harmonics
          </h2>
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex-1 space-y-3 text-sm text-slate-200">
              <p>
                Frequency is directly related to pitch. But what separates a violin
                playing A 440 Hz from a tuba playing the same note? That difference
                is <span className="font-medium">timbre</span>.
              </p>
              <p>
                Timbre is the harmonic content and frequency fingerprint that
                differentiates one instrument from another. A pure sine wave
                contains only a single frequency. Most real instruments contain a
                mixture of:
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-xs text-slate-300">
                <li>
                  The <span className="font-medium">fundamental</span> frequency
                </li>
                <li>
                  <span className="font-medium">Overtones &amp; harmonics</span>
                </li>
                <li>Resonances from the instrument&apos;s body and materials</li>
                <li>The way the sound is excited (bowed, plucked, blown, struck)</li>
              </ul>
              <p className="text-sm text-slate-200">
                These factors are what separate a piano playing F♯ from a violin
                playing F♯, even at the same pitch and level.
              </p>
            </div>

            <figure className="flex-1 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-3">
              <div className="relative h-56 w-full">
                <ZoomableImage
                  src="/assets/music-production/sound-hearing/images/violin.png"
                  alt="Violin illustration showing body and strings"
                />
              </div>
              <figcaption className="mt-2 text-xs text-slate-300">
                A violin&apos;s tone comes from vibrating strings, the bridge, and
                the resonant wooden body all working together.
              </figcaption>
            </figure>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800/80 bg-black/80 p-4 text-sm text-slate-200">
              <h3 className="text-sm font-semibold text-slate-50">
                Listen: Sine wave vs. Violin
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                First, listen to a pure sine wave melody — a single frequency at a
                time with no harmonics:
              </p>
              <div className="mt-2 rounded-xl border border-slate-800/80 bg-slate-950/90 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Sample • Sine Wave Melody
                </p>
                <audio
                  className="mt-2 w-full"
                  controls
                  src="/assets/music-production/sound-hearing/samples/sinewave.mp3"
                />
              </div>
              <p className="mt-3 text-xs text-slate-300">
                Now listen to the same melody played on a violin:
              </p>
              <div className="mt-2 rounded-xl border border-slate-800/80 bg-slate-950/90 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Sample • Violin Melody
                </p>
                <audio
                  className="mt-2 w-full"
                  controls
                  src="/assets/music-production/sound-hearing/samples/violin.mp3"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-50">
              <h3 className="text-sm font-semibold text-emerald-100">
                Tutorial • Analyzing Harmonics
              </h3>
              <p className="mt-2">
                In this tutorial, we place both melodies on a frequency spectrum
                analyzer. The sine wave shows a single peak at the fundamental
                frequency. The violin shows the fundamental plus multiple harmonic
                peaks that define its timbre.
              </p>
              <video
                className="mt-3 h-40 w-full rounded-lg border border-emerald-500/40 object-cover"
                src="/assets/music-production/sound-hearing/tutorial-lesson/violin-vs-sinewave.mp4"
                controls
              />
              <p className="mt-2">
                As a producer, learning to{" "}
                <span className="font-semibold">see</span> what you&apos;re hearing
                helps you make better EQ and sound-selection decisions.
              </p>
            </div>
          </div>
        </section>

        {/* 4. HOW WE HEAR */}
        <section id="how-we-hear" className="space-y-5">
          <h2 className="text-xl font-semibold tracking-tight text-slate-50">
            4. How We Hear
          </h2>

          <div className="space-y-3 text-sm text-slate-200">
            <p>
              The human body is miraculous. Right now, dozens of systems are working
              in parallel: your digestive system, lungs, heart, muscles, nervous
              system, and more. Your brain is processing what you see, assigning
              meaning to these words, regulating your body, and letting you focus on
              this page.
            </p>
            <p>
              Within all of that, your ears quietly take on a critical role:
              detecting and interpreting sound. As a music professional, your ears
              are one of your most valuable tools.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/80">
            <div className="border-b border-slate-800/80 bg-slate-900/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Watch • How your ears work
            </div>
            <div className="aspect-[16/9] w-full max-h-[420px]">
              <iframe
                src="https://www.youtube.com/embed/RxdFP31QYAg?start=74"
                className="h-full w-full"
                title="How hearing works"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex-1 space-y-3 text-sm text-slate-200">
              <p>
                Understanding how your ears work will help you balance mixes, create
                depth, and avoid pushing your music (and your hearing) beyond
                natural limits.
              </p>
              <p>
                The ears are made of several small but powerful structures that
                convert moving air into electrical signals:
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-xs text-slate-300">
                <li>Outer ear (pinna &amp; ear canal)</li>
                <li>Middle ear (eardrum and three tiny bones)</li>
                <li>Inner ear (cochlea and hair cells)</li>
                <li>Auditory nerve → brain</li>
              </ul>
            </div>
            <figure className="flex-1 rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative h-64 w-full">
                <ZoomableImage
                  src="/assets/music-production/sound-hearing/images/hearing.png"
                  alt="Illustration of the human ear and hearing pathway"
                />
              </div>
              <figcaption className="mt-2 text-xs text-slate-300">
                The outer, middle, and inner ear work together to transform air
                pressure changes into neural signals.
              </figcaption>
            </figure>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-xs text-slate-200">
              <h3 className="text-sm font-semibold text-slate-50">Pinna (Outer Ear)</h3>
              <p className="mt-2">
                The pinna (Latin for &quot;feather&quot;) is the visible outer ear.
                It helps localize sound and filters certain frequencies because of
                its shape.
              </p>
              <p className="mt-2">
                Sound localization depends on distance, direction, timing, and
                amplitude differences between your ears. The pinna shapes incoming
                sound, creating subtle phase and level cues your brain uses to locate
                sound sources.
              </p>
              <figure className="mt-3 rounded-xl border border-slate-800/80 bg-black/60 p-3">
                <div className="relative h-24 w-full">
                  <ZoomableImage
                    src="/assets/music-production/sound-hearing/diagrams/outer-ear-diagram.png"
                    alt="Outer ear diagram showing pinna and ear canal"
                  />
                </div>
              </figure>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-xs text-slate-200">
              <h3 className="text-sm font-semibold text-slate-50">
                Tympanic Membrane &amp; Ossicles
              </h3>
              <p className="mt-2">
                Sound travels down the ear canal and hits the{" "}
                <span className="font-medium">tympanic membrane</span> (eardrum),
                causing it to vibrate. Damage here can cause hearing loss.
              </p>
              <p className="mt-2">
                Attached to the eardrum are three tiny bones — the malleus (hammer),
                incus (anvil), and stapes (stirrup). They work like a tiny
                lever/amplifier system, transmitting and boosting the vibrations
                toward the inner ear.
              </p>
              <figure className="mt-3 rounded-xl border border-slate-800/80 bg-black/60 p-3">
                <div className="relative h-24 w-full">
                  <ZoomableImage
                    src="/assets/music-production/sound-hearing/diagrams/incus-malleus-diagram.png"
                    alt="Diagram of malleus and incus"
                  />
                </div>
              </figure>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-xs text-slate-200">
              <h3 className="text-sm font-semibold text-slate-50">Cochlea</h3>
              <p className="mt-2">
                The <span className="font-medium">cochlea</span> is a coiled,
                fluid-filled organ lined with tiny hair cells that respond to
                different frequencies. As vibrations enter the cochlea, specific hair
                cells move and send signals along the auditory nerve to the brain.
              </p>
              <figure className="mt-3 rounded-xl border border-slate-800/80 bg-black/60 p-3">
                <div className="relative h-24 w-full">
                  <ZoomableImage
                    src="/assets/music-production/sound-hearing/diagrams/cochlea-diagram.png"
                    alt="Cochlea diagram"
                  />
                </div>
              </figure>
              <div className="mt-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Watch • Inside the cochlea
                </p>
                <div className="mt-2 aspect-video w-full rounded-lg border border-emerald-500/30 bg-black/60">
                  <iframe
                    src="https://www.youtube.com/embed/r-c5GpoD8wI"
                    className="h-full w-full rounded-lg"
                    title="How the cochlea works"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:items-center">
            <figure className="flex h-full flex-col rounded-2xl border border-slate-800/80 bg-slate-950/80 p-3">
              <div className="relative h-full w-full min-h-[240px] aspect-[3/4]">
                <ZoomableImage
                  src="/assets/music-production/sound-hearing/diagrams/real-world-Dbs.png"
                  alt="Real world dB levels diagram"
                  className="rounded-xl"
                />
              </div>
              <figcaption className="mt-2 text-center text-[11px] text-slate-400">
                Real-world SPL examples. Long exposure to high dB levels speeds up
                hearing loss.
              </figcaption>
            </figure>
            <div className="flex h-full flex-col gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-sm sm:text-base text-emerald-50 leading-relaxed">
              <h3 className="text-sm font-semibold text-emerald-100">
                Protect Your Ears!
              </h3>
              <p>
                The cochlea&apos;s hair cells vibrate with different frequencies,
                but they can be permanently damaged or destroyed by high sound
                pressure levels. Once they&apos;re gone, they don&apos;t grow back.
              </p>
              <p>
                Many people experience a random ringing in their ears (tinnitus) at
                some point. That can be a sign of hair cell stress or damage.
              </p>
              <p className="mb-1">
                As an audio engineer or producer, your ears are a{" "}
                <span className="font-semibold">non-replaceable asset</span>. Use
                ear protection at loud events, keep your monitoring levels
                reasonable, and take breaks.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-sm text-slate-200">
            <h3 className="text-sm font-semibold text-slate-50">
              Interactive Listening: Hearing Range Test
            </h3>
            <p className="mt-2 text-xs text-slate-300">
              Play each sine wave sample one at a time and notice where your hearing
              starts and stops. Natural hearing loss occurs as we age — especially
              in the high frequencies.
            </p>
            <p className="mt-1 text-[11px] text-slate-400">
              Note: Small speakers (phone, tablet, laptop) may not reproduce
              frequencies below ~150 Hz, so you might not hear 60 Hz even if your
              hearing is fine.
            </p>

            <div className="mt-3 grid gap-2 text-xs text-slate-200 sm:grid-cols-3">
              {[
                "60",
                "150",
                "500",
                "1500",
                "4000",
                "10000",
                "15000",
                "16000",
                "17000",
                "18000",
                "19000",
                "20000",
              ].map((hz) => (
                <div
                  key={hz}
                  className="rounded-xl border border-slate-800/80 bg-black/70 p-2"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {hz} Hz Sine
                  </p>
                  <audio className="mt-1 w-full" controls src={getSinePath(hz)} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. PSYCHOACOUSTICS */}
        <section id="psychoacoustics" className="space-y-5">
          <h2 className="text-xl font-semibold tracking-tight text-slate-50">
            5. Psychoacoustics — How We Perceive Sound
          </h2>
          <div className="space-y-3 text-sm text-slate-200">
            <p>
              Your brain is the final stage in the signal chain. It decides what you
              actually hear, what you ignore, and how loud or bright something
              feels. <span className="font-medium">Psychoacoustics</span> is the
              study of how we perceive sound.
            </p>
            <p>
              Our ears and brain evolved for survival, not for mixing records.
              Certain quirks in our perception can work for or against you as a
              producer.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 space-y-3">
            <div className="grid gap-4 md:grid-cols-2 md:items-center">
              <figure className="flex h-full flex-col rounded-2xl border border-slate-800/80 bg-black/80 p-3">
                <div className="relative h-full w-full min-h-[220px] aspect-[4/3]">
                  <ZoomableImage
                    src="/assets/music-production/sound-hearing/diagrams/fletcher-munson-curve-diagram.png"
                    alt="Fletcher–Munson equal loudness contours diagram"
                    className="rounded-xl"
                  />
                </div>
                <figcaption className="mt-2 text-center text-[11px] text-slate-400">
                  Equal loudness contours: our ears are most sensitive in the 2–5 kHz
                  range where speech lives.
                </figcaption>
              </figure>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5 text-sm sm:text-base text-emerald-50 leading-relaxed">
                <h3 className="text-sm font-semibold text-emerald-100">
                  Fletcher–Munson Curves
                </h3>
                <p>
                  In 1933, Harvey Fletcher and Wilden A. Munson measured how humans
                  perceive loudness at different frequencies and levels. They found
                  that our ears do not respond equally across the spectrum.
                </p>
                <p>
                  At lower listening levels, we perceive mids more clearly than
                  extreme lows and highs. As volume goes up, lows and highs feel
                  relatively louder.
                </p>
                <p className="mb-1">
                  This means the{" "}
                  <span className="font-medium">
                    same mix will feel different at different playback volumes
                  </span>
                  .
                </p>
              </div>
            </div>
            <aside className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs text-emerald-50">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Pro Tip • Mix at moderate volume
              </h4>
              <p className="mt-1">
                If you only mix loud, you might over-boost lows and highs to keep
                the mix exciting at that level — which can fall apart at normal
                listening volume. Aim to do most of your work at a comfortable,
                moderate level.
              </p>
            </aside>
          </div>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
            <h3 className="text-sm font-semibold text-slate-50">Masking</h3>
            <div className="mt-3 grid gap-4 md:grid-cols-2 md:items-center">
              <div className="grid gap-3 rounded-xl border border-slate-800/80 bg-black/80 p-3">
                <figure className="relative h-44 w-full">
                  <ZoomableImage
                    src="/assets/music-production/sound-hearing/images/bird.png"
                    alt="Bird singing"
                  />
                </figure>
                <figure className="relative h-44 w-full">
                  <ZoomableImage
                    src="/assets/music-production/sound-hearing/images/jackhammer.png"
                    alt="Jackhammer drowning out quiet sound"
                  />
                </figure>
              </div>

              <div className="flex h-full flex-col gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5 text-sm sm:text-base text-emerald-50 leading-relaxed">
                <p>
                  Auditory <span className="font-medium">masking</span> happens when
                  one sound makes another sound harder to hear. A loud jackhammer can
                  make a nearby bird’s song effectively disappear — even though the
                  bird is still singing.
                </p>
                <p>
                  In survival terms, this is useful: if there’s a lion roaring, you
                  need that information more than subtle background noises. In
                  mixing, masking is why two instruments with similar frequencies
                  clash and make each other harder to distinguish.
                </p>
                <p className="mb-1">
                  To reduce masking, separate parts by frequency, panning, dynamics,
                  and arrangement: carve EQ space, use sidechain ducking, adjust
                  levels, and avoid stacking too many elements in the same octave or
                  rhythm.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
            <h3 className="text-sm font-semibold text-slate-50">Acoustic Beats</h3>
            <div className="mt-2 grid gap-4 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)]">
              <div className="space-y-2 text-sm text-slate-200">
                <p>
                  Acoustic beats happen when two tones are close in frequency. Their
                  waveforms drift in and out of alignment, creating a pulsing or
                  “whooshing” effect.
                </p>
                <p className="text-xs text-slate-300">
                  When tuning a guitar by ear, you listen for these beats. As both
                  strings get closer in pitch, the beats slow down. When the beats
                  disappear entirely, they’re in tune.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800/80 bg-black/80 p-3 text-xs text-slate-200">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Tutorial • Acoustic Beats
                </p>
                <video
                  className="mt-2 h-40 w-full rounded-lg border border-slate-800/80 object-cover"
                  src="/assets/music-production/sound-hearing/tutorial-lesson/acoustic-beats.mp4"
                  controls
                />
                <p className="mt-2">
                  Beats appear whenever similar tones overlap — oscillators, stacked
                  vocals, layered synths, guitars, and more.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. STEREO IMAGING & SPACE */}
        <section id="stereo-imaging" className="space-y-5">
          <h2 className="text-xl font-semibold tracking-tight text-slate-50">
            6. Stereo Imaging &amp; Space
          </h2>
          <div className="space-y-3 text-sm text-slate-200">
            <p>
              Early recordings were mono—one mic, one channel. Musicians physically
              moved closer or farther to balance levels. While intimate, mono
              recordings lack width and spatial depth.
            </p>
            <p>
              Stereo uses two channels (left and right), letting us place sounds in
              a three-dimensional field. This creates width, depth, and immersion.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1.3fr),minmax(0,1.05fr)] md:items-start">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 flex flex-col">
              <h3 className="text-sm font-semibold text-slate-50">
                Stereo Image &amp; Depth
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                The <span className="font-medium">stereo image</span> is the perceived
                space between the left and right speakers. You can:
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-xs text-slate-300">
                <li>Pan sounds left/right for separation</li>
                <li>Use reverb and delay to create depth</li>
                <li>Create contrast between foreground and background elements</li>
              </ul>

              <div className="mt-3 grid gap-3 text-xs sm:grid-cols-2">
                <div className="rounded-xl border border-slate-800/80 bg-black/80 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Sample • Mono
                  </p>
                  <audio
                    className="mt-1 w-full"
                    controls
                    src="/assets/music-production/sound-hearing/samples/mono.mp3"
                  />
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-black/80 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Sample • Stereo
                  </p>
                  <audio
                    className="mt-1 w-full"
                    controls
                    src="/assets/music-production/sound-hearing/samples/stereo.mp3"
                  />
                </div>
              </div>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative mx-auto h-[24rem] w-full max-w-5xl">
                <ZoomableImage
                  src="/assets/music-production/sound-hearing/images/stereo-imaging.png"
                  alt="Stereo imaging diagram showing left-right placement"
                />
              </div>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Stereo imaging positions elements across the left–right field to
                create width, depth, and spatial movement.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 7. REVIEW & KNOWLEDGE CHECK */}
        <section id="review" className="space-y-5">
          <h2 className="text-xl font-semibold tracking-tight text-slate-50">
            7. Review &amp; Knowledge Check
          </h2>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
            <h3 className="text-sm font-semibold text-slate-50">
              Big Ideas to Take With You
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-200">
              <li>Atmospheric pressure → compression &amp; rarefaction → sound</li>
              <li>
                Waveform characteristics: amplitude, frequency, wavelength, velocity,
                and phase.
              </li>
              <li>
                Timbre = an instrument’s unique frequency fingerprint — what makes
                each sound distinct.
              </li>
              <li>
                Ear mechanics: pinna → eardrum → ossicles → cochlea → auditory nerve.
              </li>
              <li>Psychoacoustics: loudness perception, masking, acoustic beats.</li>
              <li>Stereo imaging: width, depth, spatial placement.</li>
            </ul>
          </div>

          {/* QUIZ CTA (replaces broken drag/drop) */}
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5">
            <h3 className="text-sm font-semibold text-emerald-100">
              Knowledge Check
            </h3>
            <p className="mt-2 text-sm text-emerald-50/90">
              Take the Foundations quiz in the Student Lounge. Unlimited attempts —
              highest score counts.
            </p>
            <Link
              href="/students/music-production/mp-foundations/quiz"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-[#00FFF7] px-5 py-2 text-sm font-semibold text-black hover:translate-y-[1px]"
            >
              Take the Quiz
            </Link>
          </div>
        </section>
      </div>

      {/* ZOOM MODAL */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-4 -right-4 bg-slate-900 text-white rounded-full p-2 text-sm border border-slate-700"
              onClick={() => setZoomImage(null)}
              type="button"
            >
              ✕
            </button>
            <Image
              src={zoomImage.src}
              alt={zoomImage.alt}
              width={1800}
              height={1200}
              className="rounded-xl object-contain w-full h-auto"
            />
          </div>
        </div>
      )}
    </>
  );
}
