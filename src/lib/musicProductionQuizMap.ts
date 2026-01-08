// src/lib/musicProductionQuizMap.ts
import { COURSE_SLUG, MP_LESSONS, MpChapterSlug } from "@/lib/musicProductionLessons";

export type MpQuizMapEntry = {
  chapterSlug: MpChapterSlug;
  lessonId: string;
  quizId: string;
  courseSlug: string;
};

export const MUSIC_PRODUCTION_QUIZ_MAP: Record<MpChapterSlug, MpQuizMapEntry> = MP_LESSONS.reduce(
  (acc, lesson) => {
    acc[lesson.chapter_slug] = {
      chapterSlug: lesson.chapter_slug,
      lessonId: lesson.lesson_id,
      quizId: lesson.quiz_id,
      courseSlug: COURSE_SLUG,
    };
    return acc;
  },
  {} as Record<MpChapterSlug, MpQuizMapEntry>
);

export function getQuizEntryForChapter(chapterSlug: MpChapterSlug) {
  return MUSIC_PRODUCTION_QUIZ_MAP[chapterSlug] ?? null;
}
