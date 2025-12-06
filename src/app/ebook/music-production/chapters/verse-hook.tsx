"use client";

import React from "react";
import Image from "next/image";

const scrollToSection = (id: string) => {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const sections = [
  { id: "intro-no-rules", label: "1" },
  { id: "understanding-hook", label: "2" },
  { id: "developing-verse", label: "3" },
  { id: "harmonic-foundation", label: "4" },
  { id: "arrangement-ab", label: "5" },
  { id: "contrast-sound-design", label: "6" },
  { id: "writing-in-session", label: "7" },
  { id: "loops-groove", label: "8" },
  { id: "homework", label: "9" },
];

const HOOK_TYPES = [
  {
    id: "melodic",
    name: "Melodic Hook",
    description:
      "A catchy vocal or instrumental melody that carries the identity of the song (ex: The Weeknd’s “Blinding Lights”).",
    whatToListenFor: [
      "Simple, singable melodic shape",
      "Repetition with slight variation",
      "Clear, memorable contour you can hum back",
    ],
    videoId: "4NRXx6U8ABQ",
  },
  {
    id: "rhythmic",
    name: "Rhythmic Hook",
    description:
      "A groove or pattern that stands out, even without a strong melody (ex: “Billie Jean” drum pattern).",
    whatToListenFor: [
      "Instantly recognizable drum or percussion pattern",
      "Strong sense of pocket and repetition",
      "You could tap it on a table and people would know the song",
    ],
    videoId: "Zi_XLOBDo_Y",
  },
  {
    id: "vocal-phrase",
    name: "Vocal Phrase Hook",
    description:
      "A short lyrical phrase repeated so often it becomes the hook (ex: “Work work, work, work, work”).",
    whatToListenFor: [
      "Very short, repeated lyric",
      "Rhythm of the words is as important as the notes",
      "Phrase becomes a catchphrase you remember after one listen",
    ],
    videoId: "HL1UzIK-flA",
  },
  {
    id: "instrumental",
    name: "Instrumental Motif",
    description:
      "A signature synth, guitar riff, or lead line that defines the track (ex: “Shape of You” marimba riff).",
    whatToListenFor: [
      "A single riff or pattern that repeats throughout",
      "Tone of the sound is iconic and recognizable",
      "Often plays in intros, hooks, and sometimes verses",
    ],
    videoId: "JGwWNGJdvx8",
  },
  {
    id: "production",
    name: "Production Hook",
    description:
      "A unique sound or processing trick that becomes the hook (ex: Skrillex’s vocal chops).",
    whatToListenFor: [
      "Unusual sound design or processing",
      "Hook is more about the timbre and texture than notes or lyrics",
      "You remember the sound itself as much as the musical idea",
    ],
    videoId: "nntGTK2Fhb0",
  },
];

export default function VerseHookChapter() {
  return (
    <article className="relative space-y-10 text-sm text-slate-200">
      {/* Background layer */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-950 to-black" />

      {/* Header */}
      <header className="space-y-6 rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6 shadow-lg shadow-black/40">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Chapter 3
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
              VERSE &amp; HOOK DEVELOPMENT: The core ideas for your track
            </h1>
            <p className="text-xs text-slate-300">
              Crafting the Core Ideas of Your Track
            </p>
          </div>

          {/* Big Idea card */}
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-50 md:max-w-xs">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Big Idea
            </p>
            <p className="mt-2">
              The hook is the destination; the verse is the road. Build
              whichever one you feel first.
            </p>
          </div>
        </div>

        {/* Chapter map + You’ll Learn */}
        <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1.1fr),minmax(0,1.3fr)]">
          {/* Chapter map */}
          <div className="rounded-2xl border border-slate-800/80 bg-black/60 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Chapter Map
            </p>
            <p className="mt-2 text-xs text-slate-300">
              Jump to any major section as you draft your verse and hook.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  className="rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-emerald-400 hover:text-emerald-200"
                >
                  Section {section.label}
                </button>
              ))}
            </div>
          </div>

          {/* You'll Learn card */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-xs text-slate-200">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              You&apos;ll Learn
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>By the end of this chapter, you’ll be able to:</li>
              <li>• Create a memorable hook motif</li>
              <li>• Develop a verse idea that supports the hook</li>
              <li>• Build your first A/B section in your project session</li>
              <li>• Use contrast to create dynamic movement</li>
              <li>• Start forming the emotional “center” of your track</li>
              <li>Your project track begins to come alive here.</li>
            </ul>
          </div>
        </div>
      </header>

      {/* 1. Introduction: There Are No Rules */}
      <section
        id="intro-no-rules"
        className="space-y-6 scroll-mt-24 rounded-3xl border border-slate-800/80 bg-slate-950/90 p-6"
      >
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] md:items-center">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-slate-50">
              1. Introduction: There Are No Rules
            </h2>
            <p>
              Every song begins differently. Some producers start with a melody
              they hum on the way to work. Some begin with a chord progression
              played on a keyboard. Many begin with drums—because rhythm is
              instinctive and immediately emotional.
            </p>
            <p>
              There is no correct order for building a song. There is no rule
              saying the verse must come before the hook or vice versa. There is
              only creation, and creation is not linear.
            </p>
            <p>
              In this chapter, we focus on verse and hook development because
              these two elements form the emotional and structural foundation of
              most modern tracks. But remember:
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>You are free to start wherever inspiration takes you.</li>
              <li>
                What we’re doing here is learning one building block at a time,
                so you have the tools to shape your track with intention.
              </li>
            </ul>
          </div>

          {/* Verse starting points hero image */}
          <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/assets/music-production/verse-hook/images/starting-points.jpg"
                alt="Producer sketching verse ideas with instruments and DAW"
                fill
                className="rounded-xl object-cover"
              />
            </div>
          </figure>
        </div>

        {/* Smaller No Rules graphic + intro YouTube */}
        <div className="grid gap-4 md:grid-cols-2 md:items-start">
          <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/assets/verse-hook/diagrams/no-rules-diagram.jpg"
                alt="Diagram illustrating that there is no single correct starting point for a song"
                fill
                className="rounded-xl object-cover"
              />
            </div>
          </figure>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
            <div className="border-b border-slate-800/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Watch • Verse &amp; Hook Development Overview
            </div>
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/25v_GWFcjNY"
                className="h-full w-full rounded-b-2xl"
                title="Verse & Hook Development Overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Understanding the Hook */}
      <section
        id="understanding-hook"
        className="space-y-6 scroll-mt-24 rounded-3xl border border-slate-800/80 bg-slate-950/90 p-6"
      >
        {/* 2.0 intro full width */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight text-slate-50">
            2. Understanding the Hook
          </h2>
          <p>
            The hook is the gravitational center of your song. It’s the part
            people sing in the shower, hum in the car, or play on repeat.
            Whether it’s a vocal line, an instrumental riff, or even a specific
            sound, the hook is the anchor of your music.
          </p>
        </div>

        {/* 2.1 + main hook explainer video side-by-side */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <section className="space-y-3 md:w-3/5">
            <h3 className="text-lg font-semibold tracking-tight text-slate-50">
              2.1 What Makes a Hook Effective
            </h3>
            <p>A great hook is:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Simple — easily remembered</li>
              <li>Clear — emotionally direct</li>
              <li>Repetitive — but not boring</li>
              <li>Recognizable — its shape or rhythm stands out</li>
              <li>Focused — one idea, not three</li>
            </ul>
            <p>
              Hooks work because they create familiarity. Repetition builds
              identity, and identity creates connection.
            </p>
          </section>

          <div className="md:w-2/5">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
              <div className="border-b border-slate-800/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Watch • What Is a Hook?
              </div>
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/tqPgVoQ0JpI"
                  className="h-full w-full rounded-b-2xl"
                  title="Understanding the hook in modern songs"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>

{/* 2.2 Types of Hooks – responsive grid, no horizontal scroll */}
<section className="space-y-4">
  <h3 className="text-lg font-semibold tracking-tight text-slate-50">
    2.2 Types of Hooks
  </h3>
  <p>
    Hooks come in many forms. Each of these can be the core of your track:
  </p>
  <p className="text-[11px] text-slate-400">
    Tap any card to study the hook type and watch a real-world example.
  </p>

  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    {HOOK_TYPES.map((type) => (
      <article
        key={type.id}
        className="rounded-2xl border border-slate-800/80 bg-slate-950/90 p-4 text-xs text-slate-200"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          {type.name}
        </p>
        <p className="mt-1 text-[12px] leading-relaxed">
          {type.description}
        </p>

        <div className="mt-3 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            What to Listen For
          </p>
          <ul className="mt-2 ml-4 list-disc space-y-1">
            {type.whatToListenFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-3 rounded-2xl border border-slate-800/80 bg-slate-950/80">
          <div className="border-b border-slate-800/80 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Watch • {type.name} Example
          </div>
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${type.videoId}`}
              className="h-full w-full rounded-b-2xl"
              title={`${type.name} example`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </article>
    ))}
  </div>

  <p>
    As you create your own hook, stay open to discovering which type emerges
    naturally.
  </p>
</section>

        {/* 2.3 Quick Techniques for Creating Hooks */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-slate-50">
            2.3 Quick Techniques for Creating Hooks
          </h3>
          <ol className="ml-4 list-decimal space-y-2">
            <li>
              <strong>Hum → Record → Translate</strong>
              <br />
              Don’t overthink it. Sing or hum the first thing that feels good.
              Record it immediately.
            </li>
            <li>
              <strong>Start with your Production Brief</strong>
              <br />
              Your brief contains emotional keywords—use them to guide the feel.
            </li>
            <li>
              <strong>Use your sound palette limitation</strong>
              <br />
              Constraint sparks creativity. Start with the sounds you selected
              in Chapter 1.
            </li>
            <li>
              <strong>Keep it short</strong>
              <br />
              A 1–2 bar motif is enough. Complexity comes later.
            </li>
          </ol>
        </section>

        {/* 2.4 Hook-First vs Verse-First */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-slate-50">
            2.4 Hook-First vs Verse-First
          </h3>
          <p>
            Many modern producers build the hook first because it defines the
            identity of the track. But starting with the verse can work too,
            especially if your concept or story comes first.
          </p>
          <p>
            Remember:
            <br />
            The hook is the destination; the verse is the road.
            <br />
            Build whichever one you feel first.
          </p>
        </section>
      </section>

      {/* 3. Developing the Verse */}
      <section
        id="developing-verse"
        className="space-y-6 scroll-mt-24 rounded-3xl border border-slate-800/80 bg-slate-950/90 p-6"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="space-y-3 md:w-3/5">
            <h2 className="text-xl font-semibold tracking-tight text-slate-50">
              3. Developing the Verse
            </h2>
            <p>
              If the hook is the emotional climax, the verse is the narrative.
              It invites the listener in, sets the mood, and slowly builds
              tension.
            </p>
          </div>

          <figure className="md:w-2/5 rounded-2xl border border-slate-800/80 bg-black/80 p-3">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/assets/music-production/verse-hook/images/verse.jpg"
                alt="Session view focused on building verse sections"
                fill
                className="rounded-xl object-cover"
              />
            </div>
          </figure>
        </div>

        {/* 3.1 Verse’s Purpose */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-slate-50">
            3.1 The Verse’s Purpose
          </h3>
          <p>The verse:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Introduces the world of your song</li>
            <li>Establishes the tone</li>
            <li>Creates space</li>
            <li>Leads toward the hook</li>
            <li>Provides contrast</li>
          </ul>
          <p>Without contrast, the hook cannot lift.</p>
        </section>

        {/* 3.2 Good Verse Idea */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-slate-50">
            3.2 What Makes a Good Verse Idea
          </h3>
          <p>Verses typically:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Use fewer notes</li>
            <li>Have a narrower melodic range</li>
            <li>Leave more rhythmic space</li>
            <li>Use fewer layers in the arrangement</li>
            <li>Build anticipation</li>
          </ul>
          <p>
            Think of the verse as a conversation—friendly, intimate, drawing you
            in.
          </p>
        </section>

        {/* 3.3 Verse Motif + video */}
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] md:items-start">
          <section className="space-y-3">
            <h3 className="text-lg font-semibold tracking-tight text-slate-50">
              3.3 Building a Verse Motif
            </h3>
            <p>
              Start simple. Sometimes a 2–note idea, a rhythmic phrase, or even
              a near-spoken line can define a verse.
            </p>
            <p>Consider:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>A repeating rhythmic pattern</li>
              <li>A low-energy melodic phrase</li>
              <li>A call-and-response motif</li>
              <li>An instrumental riff that complements the hook</li>
            </ul>
            <p>Verses don’t need fireworks—they need direction.</p>
          </section>

          <div className="space-y-2">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
              <div className="border-b border-slate-800/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Watch • Verse Motif &amp; Setup
              </div>
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/UsdPTA7p3WU"
                  className="h-full w-full rounded-b-2xl"
                  title="Building a verse motif"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3.4 Emotional Setup */}
        <section className="space-y-4">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="space-y-3 md:w-1/2">
              <h3 className="text-lg font-semibold tracking-tight text-slate-50">
                3.4 Emotional Setup
              </h3>
              <p>
                Even before lyrics exist, every section of a song carries an
                emotional intention. The verse is where that intention begins.
                Ask yourself: What feeling does this verse create? Is it
                reflective, dark, confident, intimate, mysterious, or calm? The
                verse usually sets the tone by introducing tension, mood, or
                atmosphere that naturally leads the listener toward the hook.
                This doesn’t have to be dramatic—sometimes the emotional setup
                is as subtle as a quieter drum groove, a sparse chord, or a more
                restrained melody.
              </p>
              <p>
                Producers shape emotion long before a singer steps into the
                booth. You can suggest mood through the choice of instruments,
                the density of the arrangement, the rhythm of the melody, or the
                contrast between harmony and space. Think of the verse as the
                “slow inhale” before the hook delivers the release. Your job at
                this stage is to create a musical environment that primes the
                listener—emotionally and sonically—for what’s coming next.
              </p>
            </div>

            <figure className="md:w-1/2 rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/assets/music-production/verse-hook/images/emo-setup.jpg"
                  alt="Visual mood board representing different emotional tones for verses"
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
            </figure>
          </div>
        </section>
      </section>

      {/* 4. Harmonic Foundation */}
      <section
        id="harmonic-foundation"
        className="space-y-6 scroll-mt-24 rounded-3xl border border-slate-800/80 bg-slate-950/90 p-6"
      >
        {/* Big hero image for harmony */}
        <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src="/assets/music-production/verse-hook/images/chord.jpg"
              alt="Hands playing chords on a keyboard and guitar, representing harmony"
              fill
              className="rounded-xl object-cover"
            />
          </div>
        </figure>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight text-slate-50">
            4. Harmonic Foundation
          </h2>
          <p>
            Harmony is simply the relationship between notes played together.
            When notes blend smoothly and feel stable, we call that consonance.
            When notes clash, create tension, or feel unstable, we call that
            dissonance. Both are essential tools — consonance gives the listener
            a sense of home and comfort, while dissonance creates movement,
            tension, and emotional pull. At this stage, you only need to
            recognize the difference and use your ear to decide what feels right
            for your verse and hook. We’ll explore harmony, chord progressions,
            tension, resolution, and emotional movement in much greater depth in
            Chapter 6: Harmony &amp; Chord Progressions. For now, keep it simple
            and rely on your intuition.
          </p>
        </div>

        {/* 4.1 + 4.2 side-by-side with images */}
        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          <section className="space-y-3">
            <h3 className="text-lg font-semibold tracking-tight text-slate-50">
              4.1 Hook Chords
            </h3>
            <p>Hook progressions tend to be:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>More energetic</li>
              <li>More emotionally expressive</li>
              <li>Often with clearer movement</li>
              <li>Using strong voice-leading that pulls the ear</li>
            </ul>
            <figure className="mt-3 rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/assets/music-production/verse-hook/images/gtr-chord.jpeg"
                  alt="Guitar player holding a chord voicing"
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
            </figure>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold tracking-tight text-slate-50">
              4.2 Verse Chords
            </h3>
            <p>Verses can be:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Simpler (maybe only 1–2 chords)</li>
              <li>Longer in duration</li>
              <li>Moodier or more open</li>
              <li>Less harmonically active</li>
            </ul>
            <p>This creates the contrast we need for the hook to “bloom.”</p>
            <figure className="mt-3 rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/assets/music-production/verse-hook/images/bass.jpeg"
                  alt="Bass player outlining the chord progression"
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
            </figure>
          </section>
        </div>

        {/* Tutorial label + video */}
        <div className="space-y-3">
          <p className="text-xs text-slate-300">Tutorial dissonance:</p>
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
            <div className="border-b border-slate-800/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Watch • Consonance vs Dissonance
            </div>
            <div className="aspect-video w-full">
              <video
                className="h-full w-full rounded-b-2xl"
                src="/assets/music-production/verse-hook/dissonance.mp4"
                controls
              />
            </div>
          </div>
        </div>

        {/* Looking Ahead */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-slate-50">
            Looking Ahead
          </h3>
          <p>
            Don’t worry if harmony still feels new or a little abstract — it’s
            supposed to. At this stage, you’re only choosing chords that support
            the emotion of your verse and hook. In Chapter 6 we’ll go much
            deeper into how chords work, why certain progressions feel the way
            they do, and how to build more intentional harmonic movement. For
            now, keep it simple, trust your ear, and stay focused on the
            emotional contrast between your verse and hook.
          </p>
        </section>

        {/* 4.3 Bassline Movement */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold tracking-tight text-slate-50">
            4.3 Bassline Movement
          </h3>
          <p>
            The bassline is one of the most powerful emotional tools in modern
            production. It anchors harmony, drives the groove, and creates the
            physical impact listeners feel in their bodies.
          </p>
          <p>
            In this chapter, we only scratch the surface of bass writing because
            Chapter 5 — Low End Theory is entirely dedicated to understanding
            bass, sub energy, 808 movement, saturation, harmonics, layering, and
            low-end arrangement.
          </p>
          <p>
            For now, focus on the role of the bass in the verse and hook.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 rounded-2xl border border-slate-800/80 bg-black/60 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Bass in the Hook
              </p>
              <p>Hooks often use basslines that:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Outline the chord progression with clarity</li>
                <li>Move more rhythmically or melodically</li>
                <li>Add energy or anticipation</li>
                <li>Reinforce the hook’s emotional climax</li>
              </ul>
              <p>These choices help the hook feel bigger and more open.</p>
            </div>

            <div className="space-y-2 rounded-2xl border border-slate-800/80 bg-black/60 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Bass in the Verse
              </p>
              <p>Verses typically use basslines that are:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Simpler</li>
                <li>More static (root-note focused)</li>
                <li>Less rhythmically active</li>
                <li>Supportive but not dominant</li>
              </ul>
              <p>This creates space, making the hook feel like a lift.</p>
            </div>
          </div>

          <p className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-xs">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Your Only Goal at This Stage
            </span>
            <br />
            <span className="mt-2 block">
              Treat the bass as a supporting character for now. Don’t worry
              about advanced movement, 808 slides, sub-harmonics, or
              layering—that’s what Chapter 5 is for. Right now, just give it
              some thought as you create, and if there&apos;s a loop or a melody
              you have in your head, choose a simple sound to sketch the idea
              down and keep it movin! We will tackle bass in detail in Ch. 5
            </span>
          </p>
        </section>
      </section>

      {/* 5. Arrangement: A/B Structure */}
      <section
        id="arrangement-ab"
        className="space-y-6 scroll-mt-24 rounded-3xl border border-slate-800/80 bg-slate-950/90 p-6"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="space-y-3 md:w-3/5">
            <h2 className="text-xl font-semibold tracking-tight text-slate-50">
              5. Arrangement: Understanding Verse vs. Hook (Your First A/B
              Structure)
            </h2>
            <p>
              Before you start building your own verse and hook, it’s important
              to understand how professional songs shape energy across sections.
              Most modern tracks rely on an A/B structure, where the A-section
              (Verse) sets the stage and the B-section (Hook) delivers the
              payoff.
            </p>
            <p>
              To produce effectively, you need to hear these differences clearly
              — and know how to create them yourself.
            </p>
          </div>

          <figure className="md:w-2/5 rounded-2xl border border-slate-800/80 bg-black/80 p-3">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/assets/music-production/verse-hook/images/arrangement.jpg"
                alt="Arrangement view in a DAW showing verse and hook sections labeled"
                fill
                className="rounded-xl object-cover"
              />
            </div>
          </figure>
        </div>

        {/* 5.1 Verse (A) */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-slate-50">
            5.1 Section A – The Verse (The Setup)
          </h3>
          <p>
            The verse introduces the emotional world of the song. It’s
            intentionally smaller so the hook has room to hit harder.
          </p>
          <p>Verses usually feel:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>More intimate</li>
            <li>Less layered</li>
            <li>More spacious or minimal</li>
            <li>Darker or more filtered</li>
            <li>Rhythmically simpler</li>
            <li>Focused on storytelling or mood</li>
          </ul>
          <p>
            Why? The verse pulls the listener in, creating tension or curiosity
            that the hook resolves.
          </p>
        </section>

        {/* 5.2 Hook (B) */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-slate-50">
            5.2 Section B – The Hook (The Payoff)
          </h3>
          <p>
            The hook is where the energy lifts. It should feel like the song
            suddenly widens, brightens, and opens up.
          </p>
          <p>Hooks typically feel:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Bigger and louder</li>
            <li>Brighter (more top-end, more harmonic content)</li>
            <li>Wider (stereo spread, layered pads, doubles)</li>
            <li>More percussive (additional drums or accents)</li>
            <li>More melodic (strong, memorable topline)</li>
            <li>More layered (leads, backing vocals, FX)</li>
            <li>Emotionally “open”</li>
          </ul>
          <p>
            Why? The hook is the emotional release — the moment listeners
            remember.
          </p>
        </section>

        {/* 5.3 Contrast strategies */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-slate-50">
            5.3 How Producers Create Contrast
          </h3>
          <p>
            Contrast isn&apos;t about doing “more” in the hook. It’s about doing
            different things between sections so the listener feels the shift.
          </p>
          <p>Common contrast strategies:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Remove drums in the verse → add full drums in the hook</li>
            <li>Low-pass filters in verse → open, bright sound in hook</li>
            <li>Mono or narrow verse → wide stereo hook</li>
            <li>Dark FX in verse → brighter FX in hook</li>
            <li>Sparse verse patterns → busy or energetic hook patterns</li>
            <li>Simple bass in verse → fuller or more active bass in hook</li>
            <li>Quiet atmospheres in verse → bigger pads or layers in hook</li>
          </ul>
          <p>
            This push-and-pull creates impact. Without contrast, the hook has
            nothing to stand out against.
          </p>
        </section>

        {/* 5.4 Listening Lab */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold tracking-tight text-slate-50">
            5.4 Listening Lab: Verse vs. Hook (Real Song Analysis)
          </h3>
          <p>
            To truly understand contrast, we’ll analyze five iconic songs across
            different genres. You’ll load them into your DAW, mark the verse and
            hook sections, and listen critically for differences in:
          </p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Energy</li>
            <li>Arrangement density</li>
            <li>Instrumentation</li>
            <li>Panning</li>
            <li>Harmonic movement</li>
            <li>Bass activity</li>
            <li>Drum complexity</li>
            <li>Melodic intensity</li>
            <li>FX usage</li>
            <li>Automation</li>
            <li>Width &amp; brightness</li>
          </ul>
          <p>Tutorial:</p>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
            <div className="border-b border-slate-800/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Watch • Hook vs Verse Examples
            </div>
            <div className="aspect-video w-full">
              <video
                className="h-full w-full rounded-b-2xl"
                src="/assets/music-production/verse-hook/tutorials/hook-verse-examples.mp4"
                controls
              />
            </div>
          </div>

          <p>
            This exercise builds your producer ear. Once you hear these
            differences in pro tracks, you’ll naturally apply them to your own.
          </p>
        </section>
      </section>

      {/* 6. Contrast Through Sound Design */}
      <section
        id="contrast-sound-design"
        className="space-y-6 scroll-mt-24 rounded-3xl border border-slate-800/80 bg-slate-950/90 p-6"
      >
        <h2 className="text-xl font-semibold tracking-tight text-slate-50">
          6. Contrast Through Sound Design
        </h2>

        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="space-y-4 md:w-3/5">
            <p>
              Before you write your verse or hook, it helps to prepare your
              sonic palette — the same way a painter lays out colors before
              beginning a canvas. Great producers don’t wait until the middle of
              the songwriting process to hunt for sounds; they set aside time
              for sound exploration sessions where they experiment, design,
              tweak, and organize materials they’ll draw from later.
            </p>
            <p>This is where you build your identity.</p>
            <p>
              Think of it as prepping a “sound shelf” for the track: synth
              patches, pads, bass tones, drum textures, transitions, fills, FX,
              risers, downlifters — everything you might reach for once
              inspiration hits.
            </p>
            <p>
              You’ll have accompanying tutorials showing how to do these in each
              major DAW.
            </p>
          </div>

          <div className="grid gap-3 md:w-2/5">
            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/assets/music-production/verse-hook/images/foley.jpg"
                  alt="Foley recording setup with everyday objects as sound sources"
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
            </figure>
            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/assets/music-production/verse-hook/images/sound-design.jpg"
                  alt="Sound design session in a DAW with multiple layers and effects"
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
            </figure>
          </div>
        </div>

        {/* 6.1 Palette */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-slate-50">
            6.1 Preparing Your Sonic Palette (Before Writing)
          </h3>
          <p>
            Before writing a melody, chord progression, verse, or hook, spend
            time:
          </p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Browsing presets and tweaking synths</li>
            <li>Layering pads or leads for tone-shaping</li>
            <li>Creating custom drum kits</li>
            <li>Preparing one-shot folders</li>
            <li>Loading samplers with interesting hits</li>
            <li>Testing 808s or bass patches</li>
            <li>Saving risers, impacts, uplifters &amp; downlifters</li>
            <li>Building transition FX</li>
            <li>Pre-mixing elements so writing feels fast</li>
            <li>Setting up buses for reverb, delay, and parallel FX</li>
          </ul>
          <p>
            This is your experimental session — no pressure, no songwriting.
            Just listening, shaping, and discovering.
          </p>
          <p>
            When you start writing, you’ll already have tools that spark ideas
            instead of slow you down.
          </p>
        </section>

        {/* 6.2 Hook sound choices */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-slate-50">
            6.2 Hook Sound Choices (Bigger, Brighter, Wider)
          </h3>
          <p>
            Hooks hit hardest when they feel like the energy expands. Since you
            already prepared sound options, now you can choose confidently.
          </p>
          <p>Great hook sounds often include:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Bright, expressive leads</li>
            <li>Layered pads for width</li>
            <li>Bolder or thicker bass</li>
            <li>Larger stereo imaging</li>
            <li>More harmonic content</li>
            <li>Stronger transients (bigger drums, punchier hits)</li>
            <li>Extra textures or ear candy layered subtly</li>
          </ul>
          <p>
            Your hook should feel like the moment where the track “blooms” — the
            payoff.
          </p>
        </section>

        {/* 6.3 Verse sound choices */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-slate-50">
            6.3 Verse Sound Choices (Smaller, Tighter, Focused)
          </h3>
          <p>Verses contrast the hook by pulling energy inward.</p>
          <p>Common verse sound strategies:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Low-passed or filtered synths</li>
            <li>Thinner or single-layer pads</li>
            <li>Simpler drum textures</li>
            <li>Quieter or minimal FX</li>
            <li>Mono or narrower panning</li>
            <li>More space between elements</li>
            <li>Subtle sound design instead of big gestures</li>
          </ul>
          <p>
            The verse sets the listener up for the impact of the hook — it’s the
            inhale before the drop.
          </p>
        </section>

        {/* 6.4 FX & Automation */}
        <section className="space-y-4">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="space-y-3 md:w-3/5">
              <h3 className="text-lg font-semibold tracking-tight text-slate-50">
                6.4 FX &amp; Automation (The Glue Between Sections)
              </h3>
              <p>
                Automation is where transitions truly come alive. This is how you
                move from verse → pre → hook smoothly and musically.
              </p>
              <p>Useful automation techniques:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Opening filters into the hook</li>
                <li>Increasing reverb or delay levels toward transitions</li>
                <li>Widener FX that grow across the section</li>
                <li>Volume swells and risers</li>
                <li>Pitch modulation for tension</li>
                <li>Downlifters into the verse to calm things down</li>
                <li>Sidechain intensity changes</li>
              </ul>
              <p>
                Think of automation as storytelling — it guides emotion without
                the listener realizing it.
              </p>
            </div>

            <figure className="md:w-2/5 rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/assets/music-production/verse-hook/images/automation.png"
                  alt="Automation lanes showing filters, volume, and FX changes between sections"
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
            </figure>
          </div>
        </section>
      </section>

      {/* 7. Writing Inside Your Project Session */}
      <section
        id="writing-in-session"
        className="space-y-6 scroll-mt-24 rounded-3xl border border-slate-800/80 bg-slate-950/90 p-6"
      >
        <h2 className="text-xl font-semibold tracking-tight text-slate-50">
          7. Writing Inside Your Project Session
        </h2>

        {/* 7.1 Start with the Hook */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-slate-50">
            7.1 Start With the Hook (If You Want)
          </h3>
          <p>Open your session and:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Pick your main sound</li>
            <li>Lay down a short motif</li>
            <li>Experiment with chords</li>
            <li>Try a rough rhythm track</li>
            <li>Add placeholder vocals or synth lines</li>
          </ul>
          <p>Keep your session messy. It’s fine.</p>
        </section>

        {/* 7.2 Build the Verse */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-slate-50">
            7.2 Build the Verse
          </h3>
          <p>Duplicate your hook → strip it back:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Remove layers</li>
            <li>Change chord rhythm</li>
            <li>Use fewer notes</li>
            <li>Reduce energy</li>
          </ul>
          <p>Simplicity = intentionality.</p>
        </section>

        {/* 7.3 Avoid Loop Hell */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-slate-50">
            7.3 Avoid Loop Hell
          </h3>
          <p>
            Producers often get trapped in an 8-bar loop, endlessly tweaking.
          </p>
          <p>Avoid this by:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Copying the 8 bars across the timeline</li>
            <li>Creating actual sections</li>
            <li>Automating differences</li>
            <li>Changing a drum pattern</li>
            <li>Muting elements between sections</li>
          </ul>
          <p>Songwriting is movement—not a static loop.</p>
        </section>
      </section>

      {/* 8. Using Loops to Find the Groove */}
      <section
        id="loops-groove"
        className="space-y-6 scroll-mt-24 rounded-3xl border border-slate-800/80 bg-slate-950/90 p-6"
      >
        <h2 className="text-xl font-semibold tracking-tight text-slate-50">
          8. Using Loops to Find the Groove (Lead-In to Drum Production)
        </h2>
        <p>
          Loops are tools. Not a cheat code, not a crutch — simply ingredients.
        </p>

        {/* 8.1 Loops as Inspiration */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-slate-50">
            8.1 Loops as Inspiration
          </h3>
          <p>Browse loops that match:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Your mood</li>
            <li>Your reference</li>
            <li>Your sound palette</li>
            <li>Your emotion</li>
          </ul>
          <p>Preview until something sparks movement.</p>
        </section>

        {/* 8.2 Loop-Based Workflow Example */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-slate-50">
            8.2 Loop-Based Workflow Example
          </h3>
          <p>Try:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Drop a drum loop → add chords → create hook idea or</li>
            <li>
              Find a melodic loop fragment → build bassline → derive drums later
            </li>
          </ul>
          <p>Loops accelerate creativity.</p>
        </section>

        {/* 8.3 Verse/Hook Contrast Using Loops */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-slate-50">
            8.3 Verse/Hook Contrast Using Loops
          </h3>
          <ul className="ml-4 list-disc space-y-1">
            <li>Use a busy loop in the hook</li>
            <li>Use a stripped-down version in the verse</li>
            <li>Chop the loop into stems (kick, snare, hats)</li>
            <li>Sequence variations for different sections</li>
          </ul>
          <p>Loops can shape the structure.</p>
          <p>Tutorial loops for the project:</p>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
            <div className="border-b border-slate-800/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Watch • Groove &amp; Loop Examples
            </div>
            <div className="aspect-video w-full">
              <video
                className="h-full w-full rounded-b-2xl"
                src="/assets/music-production/verse-hook/tutorials/groove-loops.mp4"
                controls
              />
            </div>
          </div>
        </section>

        {/* 8.4 Preparing for Next Chapter */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-slate-50">
            8.4 Preparing for Next Chapter
          </h3>
          <p>Next chapter: Drum Production You’ll learn:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Groove</li>
            <li>Pocket</li>
            <li>Drum programming</li>
            <li>Swing</li>
            <li>Energy shaping</li>
          </ul>
          <p>
            And you’ll refine the loop or build your own drums from scratch.
          </p>
        </section>
      </section>

      {/* 9. Homework */}
      <section
        id="homework"
        className="space-y-4 scroll-mt-24 rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-emerald-50"
      >
        <h2 className="text-xl font-semibold tracking-tight text-emerald-50">
          9. Homework: Create a Rough Verse + Hook
        </h2>
        <p>Your track officially begins here.</p>

        <section className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Assignment Checklist
          </p>
          <p>You must create:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>16-bar verse (we can expand later)</li>
            <li>8-bar hook</li>
            <li>Basic chord idea</li>
            <li>Hook motif</li>
            <li>Section labels</li>
            <li>Clear contrast between verse and hook</li>
          </ul>
        </section>

        <section className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Reflection Questions
          </p>
          <ul className="ml-4 list-disc space-y-1">
            <li>What emotion were you aiming for in the hook?</li>
            <li>How did the verse support it?</li>
            <li>What contrast techniques did you use?</li>
          </ul>
          <p>
            This will become the foundation for your entire end-of-course song.
          </p>
        </section>
      </section>
    </article>
  );
}
