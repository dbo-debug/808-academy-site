/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Image from "next/image";

export default function FinalUnitChapter() {
  return (
    <div className="relative">
      <article className="space-y-10 text-sm text-slate-200">
        {/* HERO */}
        <section className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-900/40">
            <div className="flex flex-col justify-between gap-4 p-6 md:flex-row md:p-8">
              <div className="space-y-3 md:max-w-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
                  Final Unit
                </p>
                <h1 className="text-2xl font-semibold text-emerald-50 md:text-3xl">
                  Finishing Your Song: Mix Bounce, Stems &amp; Versions
                </h1>
                <p className="text-xs text-emerald-100/80">
                  This is where your project stops being a session file and
                  becomes a **professional deliverable** ready for artists,
                  labels, engineers, and the real world.
                </p>
              </div>

              <div className="relative hidden h-40 w-64 shrink-0 md:block">
                <Image
                  src="/assets/music-production/final-unit/images/final-unit-hero.jpg"
                  alt="Producer preparing final mix and stems"
                  fill
                  className="rounded-xl object-cover opacity-80"
                />
              </div>
            </div>
          </div>

          <p>
            By now you&apos;ve written, produced, recorded, and mixed your
            track. This last step is all about **exporting clean versions,
            stems, and a deliverables folder** that looks and feels like
            something a pro would send.
          </p>
        </section>

        {/* 2. MIX VERSIONS OVERVIEW */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-emerald-50">
            1. Mix Versions You&apos;ll Deliver
          </h2>
          <p>
            Finished songs almost never exist as just one file. Different
            versions are used for live shows, remixes, TV, sync, radio, social
            content, and mastering. You&apos;ll be bouncing these core versions:
          </p>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1.2fr)] md:items-start">
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Core Versions
                </p>
                <ul className="mt-2 ml-4 list-disc space-y-1">
                  <li>
                    <span className="font-semibold">Full Mix (Main)</span> – the
                    streaming/standard version.
                  </li>
                  <li>
                    <span className="font-semibold">Instrumental</span> – no
                    vocals; for performances, topliners, and sync.
                  </li>
                  <li>
                    <span className="font-semibold">A Cappella</span> – vocals
                    only, with or without FX.
                  </li>
                  <li>
                    <span className="font-semibold">
                      TV / Performance Mix
                    </span>{" "}
                    – no lead vocal, but keep backgrounds and ad-libs.
                  </li>
                  <li>
                    <span className="font-semibold">Clean Edit</span> – censored
                    lyrics for radio or brands.
                  </li>
                  <li>
                    <span className="font-semibold">Show Mix</span> – slightly
                    louder vocals for live shows/open mics.
                  </li>
                  <li>
                    <span className="font-semibold">Premaster Mix</span> – no
                    limiter, peaks around –6 to –3 dB, 24-bit WAV for mastering.
                  </li>
                </ul>
              </div>

              <p className="text-xs text-slate-300">
                These versions make your song flexible for shows, content, and
                future opportunities without having to reopen the session every
                time.
              </p>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/assets/music-production/final-unit/diagrams/mix-versions-grid.jpg"
                  alt="Diagram showing different final mix versions"
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                Think of your finished song as a small bundle of versions, not
                just one stereo file.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 3. EXPORT SETTINGS + TUTORIAL */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-emerald-50">
            2. Exporting Your Final Mix Correctly
          </h2>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1.2fr)] md:items-start">
            <div className="space-y-3">
              <p>
                A pro bounce isn&apos;t just &quot;File &gt; Export.&quot; You
                need **correct technical specs** so your track behaves in
                mastering, on streaming, and on stage.
              </p>
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  <span className="font-semibold">Sample rate</span>: export at
                  the same rate as your session (e.g.{" "}
                  <span className="font-semibold">48 kHz</span>).
                </li>
                <li>
                  <span className="font-semibold">Bit depth</span>: always{" "}
                  <span className="font-semibold">24-bit WAV</span>.
                </li>
                <li>
                  <span className="font-semibold">Headroom</span>: peaks around{" "}
                  <span className="font-semibold">–6 to –3 dB</span>, no
                  clipping, no normalization.
                </li>
                <li>
                  <span className="font-semibold">Render format</span>: stereo
                  interleaved WAV, not MP3 or AAC.
                </li>
                <li>
                  <span className="font-semibold">Tails</span>: always leave
                  1–2 seconds of reverb/delay tail so nothing gets chopped.
                </li>
              </ul>
            </div>

            {/* TUTORIAL CARD */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80">
              <div className="border-b border-slate-800/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Tutorial • Mix Bounce, Versions &amp; Stems Walkthrough
              </div>
              <div className="aspect-video w-full">
                <video
                  className="h-full w-full rounded-b-2xl"
                  controls
                  // Replace this path with your final screen-capture tutorial
                  src="/assets/music-production/final-unit/tutorials/mix-bounce-and-stems.mp4"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. STEMS */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-emerald-50">
            3. Creating Stems Like a Pro
          </h2>

          <p>
            Stems are grouped audio files that let remixers, engineers, live
            mixers, and collaborators rebuild your song without rebuilding your
            whole mix session.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Standard Stem Groups
              </p>
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  <span className="font-semibold">Drums</span> – all drums &amp;
                  percussion (kick/snare separate if requested).
                </li>
                <li>
                  <span className="font-semibold">Bass</span> – 808s, synth
                  bass, live bass.
                </li>
                <li>
                  <span className="font-semibold">Music</span> – keys, guitars,
                  synths, pads, melodies.
                </li>
                <li>
                  <span className="font-semibold">FX</span> – risers, sweeps,
                  drops, impacts.
                </li>
                <li>
                  <span className="font-semibold">Lead Vocal</span>
                </li>
                <li>
                  <span className="font-semibold">Vocal Doubles</span> &amp;{" "}
                  <span className="font-semibold">Harmonies</span>
                </li>
                <li>
                  <span className="font-semibold">Ad-libs</span>
                </li>
                <li>
                  <span className="font-semibold">Vocal FX Returns</span>{" "}
                  (optional) – reverb/delay buses printed as stems.
                </li>
              </ul>

              <p className="text-xs text-slate-300">
                Before printing: check fades, bounce MIDI to audio, and make
                sure sidechain or bus processing prints correctly.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Naming &amp; File Cleanliness
              </p>
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  Use <span className="font-semibold">SongName_StemType.wav</span>
                  : <span className="text-xs text-slate-300">
                    Example: <code>GLOW_UP_Drums.wav</code>
                  </span>
                </li>
                <li>No emojis, no random abbreviations, no “final-final”.</li>
                <li>Keep all stems the exact same length and start time.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. FILE ORGANIZATION */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-emerald-50">
            4. File Organization &amp; Version Control
          </h2>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1.3fr),minmax(0,1.3fr)] md:items-start">
            <div className="space-y-3">
              <p>
                Great producers have boringly clean folders. When someone opens
                your deliverables, they should immediately know where everything
                is.
              </p>

              <p className="text-xs font-semibold text-emerald-100">
                Recommended folder structure:
              </p>
              <pre className="overflow-x-auto rounded-xl bg-slate-950/80 p-3 text-[11px] leading-relaxed text-slate-200">
{`SongName/
  Final Mix/
  Premaster/
  Stems/
  Alternate Versions/
  Project Files/
  Notes/`}
              </pre>

              <p className="text-xs font-semibold text-emerald-100">
                Versioning (no more &quot;FINAL_final&quot;):
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                <li>
                  <code>SongName_Mix_v1</code>, <code>_v2</code>,{" "}
                  <code>_v3</code>…
                </li>
                <li>
                  or date based: <code>SongName_2025-11-17_mix</code>
                </li>
              </ul>
            </div>

            <figure className="rounded-2xl border border-slate-800/80 bg-black/80 p-3">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/assets/music-production/final-unit/diagrams/folder-structure.jpg"
                  alt="Organized folder structure for final deliverables"
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
              <figcaption className="mt-2 text-[11px] text-slate-400">
                A clear folder structure makes collaboration and future revisions
                painless.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 6. MASTERING PRIMER */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-emerald-50">
            5. Quick Mastering Primer (What You Actually Need to Know)
          </h2>
          <p>
            Mastering is its own discipline. You&apos;re not mastering in this
            course, but you **are** preparing a proper premaster for a future
            mastering engineer.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-emerald-100">
                What mastering does:
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                <li>Balances the final frequency spectrum</li>
                <li>Optimizes loudness for streaming</li>
                <li>Improves clarity and translation across systems</li>
                <li>Creates consistency across an EP or album</li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-emerald-100">
                What to send to mastering:
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                <li>24-bit WAV premaster</li>
                <li>Peaks around –6 to –3 dB, no clipping</li>
                <li>No brickwall limiter, no &quot;crush it&quot; on the 2-bus</li>
                <li>Same sample rate as your mix session</li>
              </ul>
              <p className="text-xs text-slate-400">
                If you want a loud version for friends, create a separate
                &quot;reference master&quot; session and keep it out of the
                official premaster folder.
              </p>
            </div>
          </div>
        </section>

        {/* 7. DELIVERABLES PACKAGE */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-emerald-50">
            6. Your Final Deliverables Folder (What You Submit)
          </h2>

          <p>
            For this unit you&apos;ll turn in a **zipped deliverables folder**
            that mirrors what a real client, label, or engineer would receive.
          </p>

          <div className="grid gap-4 md:grid-cols-2 md:items-start">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-emerald-100">
                6.1 Essential mixes:
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                <li>Final mix (24-bit WAV)</li>
                <li>Premaster mix (no limiter)</li>
                <li>Instrumental</li>
                <li>A cappella</li>
                <li>TV / Performance mix</li>
                <li>Clean version (if needed)</li>
                <li>Show mix option</li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-emerald-100">
                6.2 Stems &amp; README:
              </p>
              <ul className="ml-4 list-disc space-y-1 text-xs text-slate-300">
                <li>All core stems in a <code>Stems/</code> folder</li>
                <li>
                  A simple README text file with BPM, key, song title, artist
                  name, and any mix notes.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 8. SUBMISSION & CLOSING */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-emerald-50">
            7. Final Submission &amp; Wrap-Up
          </h2>

          <p className="text-xs font-semibold text-emerald-100">
            Deadline: Friday at Midnight
          </p>
          <p>
            This mirrors real-world label and client deadlines and gives
            instructors the weekend to review your work.
          </p>

          <ul className="ml-4 list-disc space-y-1">
            <li>Zipped deliverables folder</li>
            <li>Your final mixed track</li>
            <li>
              A short reflection:
              <ul className="ml-6 list-disc space-y-1 text-xs text-slate-300">
                <li>What changed from your rough mix?</li>
                <li>What did you learn in this process?</li>
                <li>Where did you improve the most?</li>
              </ul>
            </li>
          </ul>

          <div className="rounded-2xl border border-emerald-800/70 bg-emerald-950/40 p-4">
            <p className="text-sm font-semibold text-emerald-100">
              You finished a record.
            </p>
            <p className="mt-1 text-xs text-emerald-50/90">
              Most people never complete a full song. You moved from blank DAW
              session to finished, deliverable track — including vocals, mix,
              and pro exports. This unit is the bridge between{" "}
              <span className="italic">student</span> and{" "}
              <span className="italic">producer</span>.
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}
