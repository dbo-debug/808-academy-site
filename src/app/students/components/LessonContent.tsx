// src/app/students/components/LessonContent.tsx
"use client";

import SoundHearingContent from "./SoundHearingContent";
import { useEffect, useRef, useState } from "react";
import Callout from "./Callout";
import Figure from "./Figure";

/* -------------------------------------------------------
   Lightweight local UI helpers so you don't need new files
   ------------------------------------------------------- */

function DiagramCard({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full rounded-xl" />
      {caption ? (
        <figcaption className="mt-2 text-sm text-white/70">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

function AudioPlay({ src, label }: { src: string; label?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      {label ? <div className="mb-2 text-sm text-white/80">{label}</div> : null}
      <audio controls className="w-full">
        <source src={src} />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

/** Very small WebAudio ADSR playground */
function InteractiveADSR() {
  const [a, setA] = useState(0.02);
  const [d, setD] = useState(0.2);
  const [s, setS] = useState(0.7);
  const [r, setR] = useState(0.4);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    return () => {
      ctxRef.current?.close().catch(() => {});
    };
  }, []);

  const trigger = async () => {
    if (!ctxRef.current) ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = ctxRef.current;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.value = 220;

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    // ADSR envelope
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(1, now + a);
    gain.gain.linearRampToValueAtTime(s, now + a + d);
    gain.gain.setValueAtTime(s, now + a + d + 0.3); // short hold
    gain.gain.linearRampToValueAtTime(0, now + a + d + 0.3 + r);

    osc.start(now);
    osc.stop(now + a + d + 0.3 + r + 0.05);
  };

  const Slider = ({
    label,
    value,
    onChange,
    min = 0,
    max = 2,
    step = 0.01,
  }: {
    label: string;
    value: number;
    onChange: (v: number) => void;
    min?: number;
    max?: number;
    step?: number;
  }) => (
    <label className="flex items-center gap-3 text-sm">
      <span className="w-10 text-white/70">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
      <span className="w-12 text-right tabular-nums text-white/60">
        {value.toFixed(2)}
      </span>
    </label>
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="mb-3 text-sm font-medium text-white/90">ADSR Playground</div>
      <div className="grid gap-2">
        <Slider label="A" value={a} onChange={setA} max={1} />
        <Slider label="D" value={d} onChange={setD} max={1.5} />
        <Slider label="S" value={s} onChange={setS} max={1} />
        <Slider label="R" value={r} onChange={setR} max={2} />
      </div>
      <button
        onClick={trigger}
        className="mt-4 rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-black hover:bg-cyan-300"
      >
        Play Note
      </button>
    </div>
  );
}

/** Simple stereo panner using WebAudio Oscillator + StereoPannerNode */
function StereoPanDemo() {
  const [pan, setPan] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const panRef = useRef<StereoPannerNode | null>(null);

  const start = async () => {
    if (!ctxRef.current) ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = ctxRef.current;

    const osc = ctx.createOscillator();
    const panner = ctx.createStereoPanner();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.value = 440;
    panner.pan.value = pan;
    gain.gain.value = 0.1; // gentle

    osc.connect(panner);
    panner.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    oscRef.current = osc;
    panRef.current = panner;
    setIsOn(true);
  };

  const stop = () => {
    oscRef.current?.stop();
    oscRef.current = null;
    setIsOn(false);
  };

  useEffect(() => {
    if (panRef.current) panRef.current.pan.value = pan;
  }, [pan]);

  useEffect(() => {
    return () => {
      try {
        oscRef.current?.stop();
        ctxRef.current?.close();
      } catch {}
    };
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="mb-2 text-sm font-medium text-white/90">Stereo Panner</div>
      <label className="flex items-center gap-3 text-sm">
        <span className="w-8 text-white/70">Pan</span>
        <input
          type="range"
          min={-1}
          max={1}
          step={0.01}
          value={pan}
          onChange={(e) => setPan(parseFloat(e.target.value))}
          className="w-full"
        />
        <span className="w-14 text-right tabular-nums text-white/60">{pan.toFixed(2)}</span>
      </label>
      <div className="mt-3 flex gap-2">
        {!isOn ? (
          <button onClick={start} className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-black hover:bg-cyan-300">
            Start
          </button>
        ) : (
          <button onClick={stop} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20">
            Stop
          </button>
        )}
      </div>
      <p className="mt-2 text-xs text-white/60">Tip: pan hard L/R and then bring it back to center.</p>
    </div>
  );
}

/* =======================================================================
   MAIN CONTENT
   ======================================================================= */

export default function LessonContent({ lessonId }: { lessonId: string }) {
  // ---------------------------
  // LESSON 0 — SOUND & HEARING
  // ---------------------------
if (lessonId === "sound-hearing") {
  return <SoundHearingContent />;
}
  // ---------------------------------------------
  // LESSON 1 — DAW SIGNAL FLOW & SESSION SETUP
  // ---------------------------------------------
  if (lessonId === "daw-signal-flow") {
    return (
      <div className="prose prose-invert max-w-none text-white/90">
        {/* INTRO */}
        <section id="intro" className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight">Lesson 1: DAW Signal Flow &amp; Session Setup</h2>
          <p className="first-letter:text-5xl first-letter:leading-[0.8] first-letter:float-left first-letter:mr-3 first-letter:font-semibold first-letter:text-cyan-300">
            Before we build music inside a DAW, we need the map. Every fader and plug-in exists because of
            the electrical signal path engineers designed long before computers. This lesson bridges that
            analog world to modern Pro Tools Studio 2024.
          </p>
        </section>

        {/* 1. ELECTRICITY & SIGNAL FLOW */}
        <section id="electricity" className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight">1. Electricity → Sound → Electricity Again</h2>
          <p>
            Sing into a mic → diaphragm moves → tiny voltage travels → preamp boosts → converters digitize →
            DAW processes → interface converts back → speakers move air. That’s the loop.
          </p>
          <Figure caption="Energy flow: Sound → Voltage → Digital → Voltage → Sound.">
            <div className="aspect-[16/9] w-full" />
          </Figure>
          <Callout title="Pro Tip" tone="info">Lost a signal? Ask: <em>Where is it in the path right now?</em></Callout>
        </section>

        {/* 2. ANALOG CONSOLE LOGIC */}
        <section id="console" className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight">2. From Console to DAW — The Blueprint</h2>
          <ul>
            <li><strong>Input</strong> (mic/line) → <strong>Inserts</strong> (processing) → <strong>Sends</strong> (parallel) → <strong>Fader</strong> → <strong>Bus/Output</strong>.</li>
          </ul>
          <Callout title="Think in flows">Signal moves top → bottom on every channel strip (input to output).</Callout>
        </section>

        {/* 3. PRO TOOLS BASICS */}
        <section id="protools" className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight">3. Inside Pro Tools Studio 2024</h2>
          <h3 className="mt-4">Track Types</h3>
          <ul>
            <li><strong>Audio</strong> (record/import), <strong>Aux</strong> (returns/routing), <strong>Instrument</strong> (VI + MIDI), <strong>Master Fader</strong> (output), <strong>Folder</strong> (organize/bus).</li>
          </ul>
          <h3 className="mt-4">Audio Engine</h3>
          <ul>
            <li><em>Setup → Playback Engine</em>: choose interface, 48 kHz / 24-bit, buffer 128–256 for tracking, 512–1024 for mixing.</li>
          </ul>
          <Callout title="Hands-On Setup" tone="info">
            New session <em>Signal Flow Practice</em> → 1 Audio (mono), 1 Aux (stereo reverb), 1 Master Fader. Arm, record a clap, confirm meters.
          </Callout>
        </section>

        {/* 4. GAIN STAGING */}
        <section id="gain" className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight">4. Gain Staging in Digital</h2>
          <p>0 VU ≈ +4 dBu ≈ −18 dBFS. Keep tracking peaks between −12 and −6 dBFS. Leave headroom.</p>
          <Callout title="Quick Check">Set preamp so peaks ≈ −12 dBFS; use Clip Gain/Trim before heavy processing.</Callout>
        </section>

        {/* 5. ROUTING */}
        <section id="routing" className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight">5. Routing &amp; Bussing</h2>
          <ul>
            <li><strong>Sends</strong> → copy signal to effects/cues; <strong>Busses</strong> → internal patch cables; <strong>Aux</strong> → effect returns; <strong>Master</strong> → final out.</li>
          </ul>
          <Callout title="Exercise" tone="info">Create Bus 1-2 “Verb” → D-Verb on Aux → send Audio to Verb at −10 dB → balance dry/wet.</Callout>
        </section>

        {/* 6. SESSION MGMT */}
        <section id="management" className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight">6. Session Management &amp; Organization</h2>
          <ul>
            <li>Dedicated “Audio Sessions” folder, versions (v1, v2…), weekly backups, colors/folders for groups.</li>
          </ul>
          <Callout title="Pro Habit" tone="success">No session is too small for good labeling.</Callout>
        </section>

        {/* LOOKING AHEAD */}
        <section id="next" className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight">7. Looking Ahead — From Setup to Creation</h2>
          <p>Next we shift to workflow that keeps you creating: system prep, templates, shortcuts, and habits.</p>
        </section>

        {/* REVIEW */}
        <section id="review" className="mb-4">
          <h2 className="text-2xl font-semibold tracking-tight">Review &amp; Knowledge Check</h2>
          <ul>
            <li>Energy path from mic to speakers</li>
            <li>Console sections → DAW mapping</li>
            <li>Track types & playback engine</li>
            <li>Gain staging targets</li>
            <li>Difference: send vs bus vs aux</li>
            <li>Labeling & versioning workflow</li>
          </ul>
        </section>
      </div>
    );
  }

  // --------------------------------
  // LESSON 2 — SETTING UP TO WORK
  // --------------------------------
  if (lessonId === "setup-to-work") {
    return (
      <div className="prose prose-invert max-w-none text-white/90">
        <section id="intro" className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight">Lesson 2: Setting Up to Work</h2>
          <p className="first-letter:text-5xl first-letter:leading-[0.8] first-letter:float-left first-letter:mr-3 first-letter:font-semibold first-letter:text-cyan-300">
            Creative momentum comes from eliminating friction: stable system, fast navigation, and a template that
            launches you straight into sound.
          </p>
        </section>

        <section id="system" className="mb-12">
          <h3>1) System Prep</h3>
          <ul>
            <li>Interface drivers/firmware up to date.</li>
            <li>Sample rate defaults (48 kHz / 24-bit).</li>
            <li>Low-latency tracking mode; buffer 128–256.</li>
          </ul>
          <Callout title="Housekeeping" tone="success">Disable OS sounds, set a dedicated “Audio Sessions” folder, enable autosave.</Callout>
        </section>

        <section id="template" className="mb-12">
          <h3>2) Session Template</h3>
          <ul>
            <li>Tracks: Drums bus, Bass, Keys, Guitars, Vox, FX returns, Print track.</li>
            <li>Color coding, I/O labels, named busses (VoxVerb, DrumPar, MixBus).</li>
          </ul>
          <Callout title="Do this" tone="info">Build a <em>Starter Template</em>, save as read-only; duplicate per song.</Callout>
        </section>

        <section id="shortcuts" className="mb-12">
          <h3>3) Navigation & Shortcuts</h3>
          <ul>
            <li>Zoom, selection, nudge/grid, memory locations, groups, playlists.</li>
          </ul>
        </section>

        <section id="review" className="mb-4">
          <h3>Review & Quick Check</h3>
          <ul>
            <li>What’s in your template and why?</li>
            <li>How do you switch between tracking/mixing buffers?</li>
            <li>Where do autosaves live?</li>
          </ul>
        </section>
      </div>
    );
  }

  // ---------------------------------------
  // LESSON 3 — VERSE / HOOK DEVELOPMENT
  // ---------------------------------------
  if (lessonId === "verse-hook") {
    return (
      <div className="prose prose-invert max-w-none text-white/90">
        <section id="intro" className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight">Lesson 3: Verse / Hook Development</h2>
          <p className="first-letter:text-5xl first-letter:leading-[0.8] first-letter:float-left first-letter:mr-3 first-letter:font-semibold first-letter:text-cyan-300">
            Hooks are memory in musical form. We’ll sketch motifs, find a chorus shape, and build verses that earn it.
          </p>
        </section>

        <section id="motif" className="mb-12">
          <h3>1) Motifs & Melodic Cells</h3>
          <ul>
            <li>3–5 note cells; rhythmic identity first, notes second.</li>
            <li>Call/response phrasing; repetition with small variation.</li>
          </ul>
          <Callout title="Exercise" tone="info">Improvise 10 one-bar motifs; pick 2 to develop.</Callout>
        </section>

        <section id="hook" className="mb-12">
          <h3>2) Hook Shapes</h3>
          <ul>
            <li>Lift on the chorus (range, density, lyric focus).</li>
            <li>Contrast with verses (register, chords, rhythm, texture).</li>
          </ul>
        </section>

        <section id="lyrics" className="mb-12">
          <h3>3) Lyrical Framing</h3>
          <ul>
            <li>Concept → title → hook line.</li>
            <li>Verse detail supports hook’s big idea.</li>
          </ul>
        </section>

        <section id="review" className="mb-4">
          <h3>Review & Assignment</h3>
          <ul>
            <li>Export a 60-sec sketch with one clear hook and verse contrast.</li>
          </ul>
        </section>
      </div>
    );
  }

  // ------------------------------
  // LESSON 4 — DRUM PRODUCTION
  // ------------------------------
  if (lessonId === "drum-production") {
    return (
      <div className="prose prose-invert max-w-none text-white/90">
        <section id="intro" className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight">Lesson 4: Drum Production</h2>
          <p className="first-letter:text-5xl first-letter:leading-[0.8] first-letter:float-left first-letter:mr-3 first-letter:font-semibold first-letter:text-cyan-300">
            Groove is the gravity of your track. We’ll design kicks/snares, program feel, and shape transient/space.
          </p>
        </section>

        <section id="sound" className="mb-12">
          <h3>1) Sound Design</h3>
          <ul>
            <li>Layering kicks/snares; transient vs body; tuning to key.</li>
            <li>Humanization: velocity curves, micro-timing, swing.</li>
          </ul>
        </section>

        <section id="processing" className="mb-12">
          <h3>2) Processing</h3>
          <ul>
            <li>EQ carve, parallel compression, saturation, clipper on drum bus.</li>
            <li>Room/plate verbs for cohesion; gated verbs for punch.</li>
          </ul>
          <Callout title="Exercise" tone="info">Build an 8-bar beat; export dry vs processed A/B.</Callout>
        </section>

        <section id="review" className="mb-4">
          <h3>Review & Upload</h3>
          <ul>
            <li>Upload your beat (WAV) + screenshot of routing.</li>
          </ul>
        </section>
      </div>
    );
  }

  // ------------------------------
  // LESSON 5 — LOW-END THEORY
  // ------------------------------
  if (lessonId === "low-end-theory") {
    return (
      <div className="prose prose-invert max-w-none text-white/90">
        <section id="intro" className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight">Lesson 5: Low-End Theory</h2>
          <p className="first-letter:text-5xl first-letter:leading-[0.8] first-letter:float-left first-letter:mr-3 first-letter:font-semibold first-letter:text-cyan-300">
            Bass is architecture. We’ll separate kick/sub roles, manage headroom, and make the low end translate.
          </p>
        </section>

        <section id="roles" className="mb-12">
          <h3>1) Roles & Ranges</h3>
          <ul>
            <li>Kick vs Bass: who owns 50–80 Hz? Complement, don’t fight.</li>
            <li>Octave strategies; sidechain for pocket not pump (unless stylistic).</li>
          </ul>
        </section>

        <section id="tools" className="mb-12">
          <h3>2) Tools</h3>
          <ul>
            <li>Sub-synth, HPF on non-bass instruments, dynamic EQ, multi-band comp.</li>
            <li>Mono up to ~120 Hz; check on small speakers and earbuds.</li>
          </ul>
          <Callout title="Exercise" tone="info">Render a 16-bar bass+kick loop; test on 3 systems; note translation issues.</Callout>
        </section>
      </div>
    );
  }

  // ---------------------------------------------
  // LESSON 6 — VOCAL RECORDING & PRODUCTION
  // ---------------------------------------------
  if (lessonId === "vocal-production") {
    return (
      <div className="prose prose-invert max-w-none text-white/90">
        <section id="intro" className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight">Lesson 6: Vocal Recording &amp; Production</h2>
          <p className="first-letter:text-5xl first-letter:leading-[0.8] first-letter:float-left first-letter:mr-3 first-letter:font-semibold first-letter:text-cyan-300">
            The vocal is the story. Capture it cleanly, then build the world around it.
          </p>
        </section>

        <section id="capture" className="mb-12">
          <h3>1) Capture</h3>
          <ul>
            <li>Mic choice/placement, pop filter, room control, headphone mix.</li>
            <li>Record multiple takes/playlists; leave headroom.</li>
          </ul>
        </section>

        <section id="edit" className="mb-12">
          <h3>2) Edit & Comp</h3>
          <ul>
            <li>Playlist comping, timing edits, breaths/noise cleanup.</li>
            <li>Tuning: gentle correction vs stylized effect.</li>
          </ul>
        </section>

        <section id="fx" className="mb-12">
          <h3>3) Production Moves</h3>
          <ul>
            <li>Doubles/ad-libs, delays for depth, plate/hall verbs, serial compression.</li>
          </ul>
          <Callout title="Upload">Bounce a 60-sec vocal showcase: dry, then produced.</Callout>
        </section>
      </div>
    );
  }

  // --------------------------------------
  // LESSON 7 — MIXING FUNDAMENTALS
  // --------------------------------------
  if (lessonId === "mixing-fundamentals") {
    return (
      <div className="prose prose-invert max-w-none text-white/90">
        <section id="intro" className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight">Lesson 7: Mixing Fundamentals</h2>
          <p className="first-letter:text-5xl first-letter:leading-[0.8] first-letter:float-left first-letter:mr-3 first-letter:font-semibold first-letter:text-cyan-300">
            Mixing is organized listening: balance, tone, dynamics, and space—checked across systems.
          </p>
        </section>

        <section id="balance" className="mb-12">
          <h3>1) Balance First</h3>
          <ul>
            <li>Static mix on faders/pans before plug-ins. Reference tracks early.</li>
          </ul>
        </section>

        <section id="tone" className="mb-12">
          <h3>2) Tone Shaping</h3>
          <ul>
            <li>Subtractive EQ for space, additive for vibe; sweep to find masking.</li>
          </ul>
        </section>

        <section id="dynamics" className="mb-12">
          <h3>3) Dynamics</h3>
          <ul>
            <li>Compression goals: control, color, glue. Serial vs parallel.</li>
          </ul>
        </section>

        <section id="space" className="mb-12">
          <h3>4) Space</h3>
          <ul>
            <li>Delays for depth, verbs for size; pre-delay to keep vocals forward.</li>
          </ul>
          <Callout title="Deliverable">Export a 90-sec rough mix and a notes list of 5 issues you still hear.</Callout>
        </section>
      </div>
    );
  }

  // ------------------------------------------
  // LESSON 8 — MASTERING & FINAL BOUNCE
  // ------------------------------------------
  if (lessonId === "mastering-bounce") {
    return (
      <div className="prose prose-invert max-w-none text-white/90">
        <section id="intro" className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight">Lesson 8: Mastering &amp; Final Bounce</h2>
          <p className="first-letter:text-5xl first-letter:leading-[0.8] first-letter:float-left first-letter:mr-3 first-letter:font-semibold first-letter:text-cyan-300">
            Mastering is quality control and translation at release level. We’ll get your mix ready for the world.
          </p>
        </section>

        <section id="prep" className="mb-12">
          <h3>1) Mix Prep</h3>
          <ul>
            <li>Headroom (peaks &lt; −1 dBFS), no clipping, clean fade/heads.</li>
          </ul>
        </section>

        <section id="chain" className="mb-12">
          <h3>2) Master Chain (light-handed)</h3>
          <ul>
            <li>Broad EQ, glue comp, limiter to target loudness. Avoid over-processing.</li>
          </ul>
        </section>

        <section id="delivery" className="mb-12">
          <h3>3) Delivery</h3>
          <ul>
            <li>WAV 24-bit / 44.1 or 48 kHz, MP3 for refs, -14 to -9 LUFS (genre-dependent).</li>
            <li>Export instrumental, acapella, performance versions if needed.</li>
          </ul>
          <Callout title="Final" tone="success">Upload your master and a QC checklist (format, loudness, clip check).</Callout>
        </section>
      </div>
    );
  }

  // ------------
  // FALLBACK
  // ------------
  return (
    <div className="text-white/60 italic">
      Lesson content coming soon for <span className="text-cyan-400">{lessonId}</span>.
    </div>
  );
}
