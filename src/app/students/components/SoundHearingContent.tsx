"use client";

import Figure from "./Figure";
import Callout from "./Callout";
import MediaPlayer from "./MediaPlayer";

export default function SoundHearingContent() {
  return (
    <div className="prose prose-invert max-w-none text-white/90">
      {/* TITLE / HERO */}
      <section id="title" className="mb-12">
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/30">
          <video
            className="w-full h-auto"
            src="/assets/sound-hearing/sound-is-vibration-animations/speaker-vibration.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">
          Sound &amp; Hearing Fundamentals
        </h1>
        <p className="text-white/70">
          Pre-class: the air around you, waveform basics, hearing.
        </p>
      </section>

      {/* INTRO */}
      <section id="intro" className="mb-12">
        <h2 className="text-2xl font-semibold tracking-tight">Introduction: The Air Around You</h2>
        <p>
          You’re surrounded by billions of tiny air molecules bouncing off everything around you.
          This invisible ocean is <strong>atmospheric pressure</strong>—steady, but never still. When
          something vibrates—a vocal cord, guitar string, or speaker cone—it pushes and pulls the air,
          creating alternating regions of <strong>compression</strong> (high pressure) and{" "}
          <strong>rarefaction</strong> (low pressure). Those pressure changes move outward as waves:
          <strong> sound</strong>.
        </p>

        <div className="my-6 rounded-2xl overflow-hidden border border-white/10">
          <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/feFBAt5IBZg"
            title="Air molecules & atmospheric pressure"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <Callout title="Try this" tone="info">
          Interactive Image (coming soon): drag “Compression” tags onto the dense parts of the graphic,
          and “Rarefaction” onto the sparse parts.
        </Callout>
      </section>

      {/* 1. WHAT IS SOUND */}
      <section id="what-is-sound" className="mb-12">
        <h2 className="text-2xl font-semibold tracking-tight">1. What Is Sound?</h2>
        <p>
          Sound happens when vibrating objects displace the air around them. For speech,{" "}
          <strong>vocal cords</strong> vibrate together at high speed:
        </p>

        <div className="my-6 rounded-2xl overflow-hidden border border-white/10">
          <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/wYnPA7IXFIU"
            title="Vocal cords stroboscopy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <Figure caption="Vibration displaces air: the guitar body resonates and amplifies.">
          <img
            src="/assets/sound-hearing/images/guitar-string.jpg"
            alt="Guitar string vibration"
            className="rounded-xl border border-white/10"
          />
        </Figure>
      </section>

      {/* 2. WAVEFORM CHARACTERISTICS */}
      <section id="waveform" className="mb-12">
        <h2 className="text-2xl font-semibold tracking-tight">2. Waveform Characteristics</h2>

        <h3 className="mt-6 text-xl font-semibold">Amplitude (dB) → Loudness</h3>
        <p>
          Amplitude is the intensity of high/low pressure regions. We measure it in decibels (acoustic{" "}
          <em>SPL</em> or electrical voltage reference).
        </p>
        <Figure caption="History of dB (reference contexts)">
          <img
            src="/assets/music-production/sound-hearing/images/history-of-db-diagram.png"
            alt="dB diagram"
            className="rounded-xl border border-white/10"
          />
        </Figure>

        <h3 className="mt-6 text-xl font-semibold">Frequency (Hz) → Pitch</h3>
        <p>
          Frequency is cycles per second—what we perceive as pitch. One cycle is one compression +
          one rarefaction.
        </p>
        <Figure caption="Frequency ↔ perceived pitch">
          <img
            src="/assets/music-production/sound-hearing/images/frequency-diagram.png"
            alt="Frequency diagram"
            className="rounded-xl border border-white/10"
          />
        </Figure>
        <div className="my-6 rounded-2xl overflow-hidden border border-white/10">
          <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/Axx8WfxQDkk?start=12"
            title="Frequency explained"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <h3 className="mt-6 text-xl font-semibold">Wavelength → Distance per Cycle</h3>
        <p>
          Higher frequency → shorter wavelength; lower frequency → longer wavelength (wraps around
          obstacles better).
        </p>
        <Figure caption="Wavelength vs frequency">
          <img
            src="/assets/music-production/images/wavelength-diagram.png"
            alt="Wavelength diagram"
            className="rounded-xl border border-white/10"
          />
        </Figure>

        <h3 className="mt-6 text-xl font-semibold">Velocity → Speed through Air</h3>
        <p>
          Speed of sound depends on temperature (≈761 mph at 68°F at sea level). The classic example:
          <strong> sonic boom</strong>.
        </p>
        <div className="my-6 rounded-2xl overflow-hidden border border-white/10">
          <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/JO4_VHM69oI"
            title="Sonic boom"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <h3 className="mt-6 text-xl font-semibold">Phase → How Waves Combine</h3>
        <p>
          In-phase waves reinforce; out-of-phase waves cancel (comb-filtering, thinness, or silence).
          Move a mic a few cm and the tone changes.
        </p>
        <Figure caption="Phase cancellation tutorial">
          <MediaPlayer src="/assets/music-production/tutorial/lesson/phase-cancellation.mp4" />
        </Figure>
      </section>

      {/* 3. TIMBRE & HARMONICS */}
      <section id="timbre" className="mb-12">
        <h2 className="text-2xl font-semibold tracking-tight">3. Timbre &amp; Harmonics</h2>
        <p>
          Timbre is the harmonic fingerprint that lets us tell a violin and a tuba apart on the same
          pitch. A sine wave is a single frequency; real instruments add overtones.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="rounded-2xl border border-white/10 p-4">
            <p className="mb-2 text-sm text-white/70">Sine wave</p>
            <audio controls className="w-full">
              <source src="/assets/music-production/samples/sinewave.mp3" type="audio/mpeg" />
            </audio>
          </div>
          <div className="rounded-2xl border border-white/10 p-4">
            <p className="mb-2 text-sm text-white/70">Violin melody</p>
            <audio controls className="w-full">
              <source src="/assets/music-production/samples/violin.mp3" type="audio/mpeg" />
            </audio>
          </div>
        </div>

        <Figure caption="Violin: bow–string friction excites the resonant body">
          <img
            src="/assets/music-production/sound-hearing/images/violin.png"
            alt="Violin"
            className="rounded-xl border border-white/10"
          />
        </Figure>

        <Figure caption="Harmonic content on a spectrum analyzer (tutorial)">
          <MediaPlayer src="/assets/music-production/sound-hearing/tutorial-lesson/violin-melodies.mp4" />
        </Figure>
      </section>

      {/* 4. HOW WE HEAR */}
      <section id="hearing" className="mb-12">
        <h2 className="text-2xl font-semibold tracking-tight">4. How We Hear</h2>

        <div className="my-6 rounded-2xl overflow-hidden border border-white/10">
          <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/RxdFP31QYAg?start=74"
            title="How the ear works"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <Figure caption="Outer ear / canal / eardrum pathway">
          <img
            src="/assets/music-production/sound-hearing/diagrams/outer-ear-diagram.png"
            alt="Outer ear diagram"
            className="rounded-xl border border-white/10"
          />
        </Figure>

        <Figure caption="Ossicles: malleus (hammer), incus (anvil), stapes (stirrup)">
          <img
            src="/assets/music-production/sound-hearing/diagrams/incus-malleus-diagram.png"
            alt="Ear bones diagram"
            className="rounded-xl border border-white/10"
          />
        </Figure>

        <Figure caption="Cochlea: frequency-mapped hair cells → neural impulses">
          <img
            src="/assets/music-production/sound-hearing/diagrams/cochlea-diagram.png"
            alt="Cochlea diagram"
            className="rounded-xl border border-white/10"
          />
        </Figure>

        <div className="my-6 rounded-2xl overflow-hidden border border-white/10">
          <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/r-c5GpoD8wI"
            title="Inside the cochlea"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <Callout title="Protect Your Ears!" tone="warn">
          Hair cells don’t regenerate. Long, loud exposure accelerates loss—use musician’s plugs, moderate
          SPL, and take breaks.
        </Callout>

        <Figure caption="Real-world dB ranges">
          <img
            src="/assets/music-production/sound-hearing/diagrams/real-world-Dbs.png"
            alt="Real-world dB chart"
            className="rounded-xl border border-white/10"
          />
        </Figure>

        <h3 className="mt-6 text-xl font-semibold">Interactive: Hearing Test</h3>
        <p className="text-white/70">
          Play each tone; note the highest you can hear. (Some phones/laptops won’t reproduce very low
          bass.)
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {[
            "60HZ","150HZ","500HZ","1500HZ","4000HZ","10000HZ",
            "15000HZ","16000HZ","17000HZ","18000HZ","19000HZ","20000HZ",
          ].map((hz) => (
            <div key={hz} className="rounded-xl border border-white/10 p-3">
              <p className="mb-2 text-sm text-white/70">{hz}</p>
              <audio controls className="w-full">
                <source
                  src={`/assets/music-production/sound-hearing/sinewave-samples/${hz}-SigGen_01-01.mp3`}
                  type="audio/mpeg"
                />
              </audio>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PSYCHOACOUSTICS */}
      <section id="psycho" className="mb-12">
        <h2 className="text-2xl font-semibold tracking-tight">5. Psychoacoustics — How We Perceive Sound</h2>

        <h3 className="mt-6 text-xl font-semibold">Equal-Loudness (Fletcher–Munson)</h3>
        <Figure caption="We’re most sensitive around 2–5 kHz; lows/highs feel softer at low level.">
          <img
            src="/assets/music-production/sound-hearing/diagrams/fletcher-munson-curve-diagram.png"
            alt="Equal loudness curves"
            className="rounded-xl border border-white/10"
          />
        </Figure>

        <h3 className="mt-6 text-xl font-semibold">Masking</h3>
        <p>
          Louder content can hide quieter content in nearby bands. Use arrangement, panning, subtractive EQ,
          and dynamics to create space.
        </p>

        <h3 className="mt-6 text-xl font-semibold">Acoustic Beats</h3>
        <Figure caption="Two close frequencies produce a pulsing beat—handy for tuning and phase checks.">
          <MediaPlayer src="/assets/music-production/sound-hearing/tutorial-lesson/acoustic-beats.mp4" />
        </Figure>
      </section>

      {/* 6. STEREO IMAGING */}
      <section id="stereo" className="mb-12">
        <h2 className="text-2xl font-semibold tracking-tight">6. Stereo Imaging &amp; Space</h2>
        <Figure caption="From mono → stereo: depth, placement, and translation">
          <img
            src="/assets/music-production/sound-hearing/images/stereo-imaging.png"
            alt="Stereo imaging"
            className="rounded-xl border border-white/10"
          />
        </Figure>

        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="rounded-2xl border border-white/10 p-4">
            <p className="mb-2 text-sm text-white/70">Stereo sample</p>
            <audio controls className="w-full">
              <source src="/assets/music-production/sound-hearing/samples/stereo.mp3" type="audio/mpeg" />
            </audio>
          </div>
          <div className="rounded-2xl border border-white/10 p-4">
            <p className="mb-2 text-sm text-white/70">Mono sample</p>
            <audio controls className="w-full">
              <source src="/assets/music-production/sound-hearing/samples/mono.mp3" type="audio/mpeg" />
            </audio>
          </div>
        </div>
      </section>

      {/* 7. REVIEW */}
      <section id="review" className="mb-4">
        <h2 className="text-2xl font-semibold tracking-tight">7. Review &amp; Knowledge Check</h2>
        <ul>
          <li>Atmospheric pressure → compression/rarefaction → sound</li>
          <li>Waveform characteristics (amplitude, frequency, wavelength, velocity, phase)</li>
          <li>Timbre &amp; harmonics</li>
          <li>Ear mechanics &amp; hearing protection</li>
          <li>Psychoacoustics (equal-loudness, masking, beats)</li>
          <li>Stereo imaging &amp; translation</li>
        </ul>

        <Callout title="Quiz" tone="success">
          10-question knowledge check (coming next). We’ll wire it to Supabase so you can track results.
        </Callout>

        <Callout title="Interactive Image (Preview)" tone="info">
          <img
            src="/assets/sound-hearing/interactive-images/sh-interactive.jpg"
            alt="Compression vs Rarefaction interactive"
            className="rounded-xl border border-white/10"
          />
          <p className="mt-2 text-sm text-white/70">
            Drag/Drop labeling will be added in the next pass.
          </p>
        </Callout>
      </section>
    </div>
  );
}
