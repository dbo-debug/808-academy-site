// src/lib/musicProductionLessons.ts

export type MpChapterSlug =
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

export type MpLesson = {
  lesson_id: string; // canonical id for student routes + progress + quiz_attempts
  chapter_slug: MpChapterSlug; // existing ebook slug
  title: string;
  label: string; // "Pre-Lesson", "Chapter 1", etc.
  description?: string;
  isPreLesson?: boolean;
  quiz_id: string; // Supabase quizzes.id (uuid string)
};

export const COURSE_SLUG = "music-production";

export const MP_LESSONS: MpLesson[] = [
  {
    lesson_id: "mp-foundations",
    chapter_slug: "sound-hearing",
    title: "Sound & Hearing Fundamentals",
    label: "Pre-Lesson",
    description:
      "What sound is, how hearing works, and how to protect your ears as a producer.",
    isPreLesson: true,
    quiz_id: "c7d63e11-854d-4b0c-a922-1ec956043668",
  },
  {
    lesson_id: "mp-ch1-daw-signal-flow",
    chapter_slug: "daw-signal-flow",
    title: "DAW Signal Flow",
    label: "Chapter 1",
    description:
      "Understand how audio moves through your DAW and how to set up clean, efficient sessions.",
    quiz_id: "0316ca91-29ad-4253-9162-808f82ac77a6",
  },
  {
    lesson_id: "mp-ch2-pre-production",
    chapter_slug: "pre-production",
    title: "Pre-Production: Inspiration, Sources & Session Setup",
    label: "Chapter 2",
    description:
      "Inspiration systems, references, creative sources, and session setup workflows.",
    quiz_id: "8365743b-bb3b-404b-9485-9d2e46849337",
  },
  {
    lesson_id: "mp-ch3-verse-hook",
    chapter_slug: "verse-hook",
    title: "Verse & Hook Development",
    label: "Chapter 3",
    description:
      "Build compelling song sections, from topline and chords to arrangement and dynamics.",
    quiz_id: "fe07505c-055c-4c46-a49a-69520ee9cfbd",
  },
  {
    lesson_id: "mp-ch4-drum-production",
    chapter_slug: "drum-production",
    title: "Drum Production",
    label: "Chapter 4",
    description:
      "Drum programming, sound selection, groove, and swing across multiple genres.",
    quiz_id: "e7ff3f4a-ec3c-4f6a-90fb-7b14af956667",
  },
  {
    lesson_id: "mp-ch5-low-end-theory",
    chapter_slug: "low-end-theory",
    title: "Low End Theory",
    label: "Chapter 5",
    description:
      "Build clear, powerful bass and sub that translates on real speakers and headphones.",
    quiz_id: "c68d96ac-a07b-4a43-86ca-a9eb62a0d35a",
  },
  {
    lesson_id: "mp-ch6-harmony-chords",
    chapter_slug: "harmony-chords",
    title: "Harmony & Chord Progressions",
    label: "Chapter 6",
    description:
      "Understand why chords feel the way they do and how to create intentional progressions.",
    quiz_id: "1efeff85-9ea7-4f95-a9ad-106c483841b6",
  },
  {
    lesson_id: "mp-ch7-vocal-production",
    chapter_slug: "vocal-production",
    title: "Vocal Production",
    label: "Chapter 7",
    description:
      "From tracking and takes to tuning and creative effects for modern vocals.",
    quiz_id: "60562687-d9f9-4fac-a1f4-6c60fd77dfce",
  },
  {
    lesson_id: "mp-ch8-mixing-fundamentals",
    chapter_slug: "mixing-fundamentals",
    title: "Mixing Fundamentals",
    label: "Chapter 8",
    description:
      "EQ, compression, space, and balance — the core building blocks of a modern mix.",
    quiz_id: "5cdc856e-98df-4462-8b5d-67a99bca50cb",
  },
  {
    lesson_id: "mp-final-unit",
    chapter_slug: "final-unit",
    title: "Finalize Mix & Deliverables",
    label: "Final Unit",
    description:
      "Mastering, loudness, exporting, and delivery for streaming and professional release.",
    quiz_id: "85d39d6b-2dc1-4320-a9e3-839cb5a87daa",
  },
];

// Helpers
export function getMpLessonByLessonId(lesson_id: string) {
  return MP_LESSONS.find((l) => l.lesson_id === lesson_id) ?? null;
}

export function getMpLessonByChapterSlug(chapter_slug: MpChapterSlug) {
  return MP_LESSONS.find((l) => l.chapter_slug === chapter_slug) ?? null;
}
