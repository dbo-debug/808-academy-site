import React from "react";
import BookLayout from "./components/BookLayout";
import ChapterNav from "./components/ChapterNav";
export const dynamic = "force-dynamic";

import SoundHearingChapter from "./chapters/sound-hearing";
import DawSignalFlowChapter from "./chapters/daw-signal-flow";
import PreProductionChapter from "./chapters/pre-production";
import VerseHookChapter from "./chapters/verse-hook";
import DrumProductionChapter from "./chapters/drum-production";
import LowEndTheoryChapter from "./chapters/low-end-theory";
import HarmonyChordsChapter from "./chapters/harmony-chords";
import VocalProductionChapter from "./chapters/vocal-production";
import MixingFundamentalsChapter from "./chapters/mixing-fundamentals";
import FinalUnitChapter from "./chapters/final-unit";

export type ChapterId =
  | "sound-hearing"
  | "daw-signal-flow"
  | "pre-production"
  | "verse-hook"
  | "drum-production"
  | "low-end-theory"
  | "harmony-chords"
  | "vocal-production"
  | "mixing-fundamentals"
  | "final-unit";

export type ChapterMeta = {
  id: ChapterId;
  title: string;
  label: string;
  description?: string;
  isPreLesson?: boolean;
};

export const CHAPTERS: ChapterMeta[] = [
  {
    id: "sound-hearing",
    title: "Sound & Hearing Fundamentals",
    label: "Pre-Lesson",
    description:
      "What sound is, how hearing works, and how to protect your ears as a producer.",
    isPreLesson: true,
  },
  {
    id: "daw-signal-flow",
    title: "DAW Signal Flow",
    label: "Chapter 1",
    description:
      "Understand how audio moves through your DAW and how to set up clean, efficient sessions.",
  },
  {
    id: "pre-production",
    title: "PRE PRODUCTION: Inspiration, Sources & Session Setup",
    label: "Chapter 2",
    description:
      "Inspiration systems, references, creative sources, and session setup workflows.",
  },
  {
    id: "verse-hook",
    title: "Verse & Hook Development",
    label: "Chapter 3",
    description:
      "Build compelling song sections, from topline and chords to arrangement and dynamics.",
  },
  {
    id: "drum-production",
    title: "Drum Production",
    label: "Chapter 4",
    description:
      "Drum programming, sound selection, groove, and swing across multiple genres.",
  },
  {
    id: "low-end-theory",
    title: "Low End Theory",
    label: "Chapter 5",
    description:
      "Build clear, powerful bass and sub that translates on real speakers and headphones.",
  },
  {
    id: "harmony-chords",
    title: "Harmony & Chord Progressions",
    label: "Chapter 6",
    description:
      "Understand why chords feel the way they do and how to create intentional progressions.",
  },
  {
    id: "vocal-production",
    title: "Vocal Production",
    label: "Chapter 7",
    description:
      "From tracking and takes to tuning and creative effects for modern vocals.",
  },
  {
    id: "mixing-fundamentals",
    title: "Mixing Fundamentals",
    label: "Chapter 8",
    description:
      "EQ, compression, space, and balance — the core building blocks of a modern mix.",
  },
  {
    id: "final-unit",
    title: "Finalize Mix & Deliverables",
    label: "Final Unit",
    description:
      "Mastering, loudness, exporting, and delivery for streaming and professional release.",
  },
];

// Next.js app router style: searchParams are just strings/string[]
type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
  params?: { chapter?: string };
};

// Helper to safely narrow to our ChapterId union
export function isChapterId(value: unknown): value is ChapterId {
  if (typeof value !== "string") return false;
  return CHAPTERS.some((c) => c.id === value);
}

export default function MusicProductionEbookPage({ params }: PageProps) {
  const chapterParam =
    typeof params?.chapter === "string" ? params.chapter : undefined;

  const invalidChapterParam =
    chapterParam && !isChapterId(chapterParam) ? chapterParam : null;

  const currentChapterId: ChapterId = isChapterId(chapterParam)
    ? chapterParam
    : "sound-hearing";

  const currentChapterIndex = CHAPTERS.findIndex(
    (c) => c.id === currentChapterId
  );
  const currentChapter = CHAPTERS[currentChapterIndex] ?? CHAPTERS[0];

  const renderChapter = () => {
    switch (currentChapterId) {
      case "sound-hearing":
        return <SoundHearingChapter />;
      case "daw-signal-flow":
        return <DawSignalFlowChapter />;
      case "pre-production":
        return <PreProductionChapter />;
      case "verse-hook":
        return <VerseHookChapter />;
      case "drum-production":
        return <DrumProductionChapter />;
      case "low-end-theory":
        return <LowEndTheoryChapter />;
      case "harmony-chords":
        return <HarmonyChordsChapter />;
      case "vocal-production":
        return <VocalProductionChapter />;
      case "mixing-fundamentals":
        return <MixingFundamentalsChapter />;
      case "final-unit":
        return <FinalUnitChapter />;
      default:
        return null;
    }
  };

  return (
    <BookLayout chapters={CHAPTERS} currentChapterId={currentChapterId}>
      <article
        className="space-y-10 break-words"
        id="top"
        key={currentChapterId}
      >
        {invalidChapterParam && (
          <div className="rounded-2xl border border-amber-500/50 bg-amber-500/10 p-4 text-sm text-amber-100">
            <p className="font-semibold">
              Chapter “{invalidChapterParam}” was not found.
            </p>
            <p className="mt-1">
              Use the chapter list to jump to an available chapter or return to
              the lounge.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href="/ebook/music-production"
                className="inline-flex items-center rounded-full border border-amber-400/60 px-3 py-1 text-xs font-semibold text-amber-50 transition hover:border-emerald-400 hover:text-emerald-100"
              >
                View all chapters
              </a>
              <a
                href="/students"
                className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-100 transition hover:border-emerald-400 hover:text-emerald-100"
              >
                Back to Lounge
              </a>
            </div>
          </div>
        )}

        <header className="space-y-2">
          {currentChapter.isPreLesson && (
            <p className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
              Pre-Class Foundation
            </p>
          )}
          {!currentChapter.isPreLesson && (
            <p className="inline-flex items-center rounded-full border border-slate-600/60 bg-slate-900/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
              {currentChapter.label}
            </p>
          )}
          <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
            {currentChapter.title}
          </h1>
          {currentChapter.description && (
            <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
              {currentChapter.description}
            </p>
          )}
        </header>

        <div className="prose prose-invert prose-slate max-w-none prose-headings:scroll-mt-24 prose-headings:break-words prose-a:text-emerald-400 prose-a:underline-offset-4 prose-img:mx-auto prose-img:rounded-2xl prose-video:rounded-2xl hover:prose-a:underline">
          {renderChapter()}
        </div>

        <ChapterNav chapters={CHAPTERS} currentChapterId={currentChapterId} />
      </article>
    </BookLayout>
  );
}
