import React from "react";
import BookLayout from "./components/BookLayout";
import ChapterNav from "./components/ChapterNav";

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

const CHAPTERS: ChapterMeta[] = [
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
};

// Helper to safely narrow to our ChapterId union
function isChapterId(value: unknown): value is ChapterId {
  if (typeof value !== "string") return false;
  return CHAPTERS.some((c) => c.id === value);
}

export default function MusicProductionEbookPage({ searchParams }: PageProps) {
  const rawChapterParam = searchParams?.chapter;

  const chapterParam =
    typeof rawChapterParam === "string" ? rawChapterParam : undefined;

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
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-50">
              {currentChapter.title}
            </h2>
            <p className="text-slate-300">
              This chapter is coming soon. Check back later — for now, start
              with{" "}
              <a
                href="/ebook/music-production"
                className="font-medium text-emerald-400 underline-offset-4 hover:underline"
              >
                Sound &amp; Hearing Fundamentals
              </a>
              .
            </p>
          </div>
        );
    }
  };

  return (
    <BookLayout chapters={CHAPTERS} currentChapterId={currentChapterId}>
      <article className="space-y-10">
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

        <div className="prose prose-invert prose-slate max-w-none prose-headings:scroll-mt-24 prose-a:text-emerald-400 prose-a:underline-offset-4 hover:prose-a:underline">
          {renderChapter()}
        </div>

        <ChapterNav chapters={CHAPTERS} currentChapterId={currentChapterId} />
      </article>
    </BookLayout>
  );
}
