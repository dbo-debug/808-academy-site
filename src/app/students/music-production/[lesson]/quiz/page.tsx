"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Quiz from "@/app/students/components/Quiz";
import { COURSE_SLUG, getMpLessonByLessonId } from "@/lib/musicProductionLessons";

export default function LessonQuizPage() {
  const params = useParams<{ lesson: string }>();
  const router = useRouter();

  const lesson_id = Array.isArray(params.lesson) ? params.lesson[0] : params.lesson;
  const lesson = useMemo(() => getMpLessonByLessonId(lesson_id), [lesson_id]);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">
            Quiz • {lesson?.label ?? "Lesson"}
          </p>
          <h1 className="text-3xl font-semibold">
            {lesson?.title ?? "Lesson Quiz"}
          </h1>
          <p className="text-sm text-white/70">
            10 questions • Pass at 70% • Unlimited attempts • Highest score counts
          </p>
        </div>

        {/* Guard: invalid lesson param */}
        {!lesson ? (
          <div className="rounded-2xl border border-amber-400/40 bg-amber-400/10 p-5 text-sm text-amber-100">
            <div className="font-semibold">Unknown lesson</div>
            <div className="mt-1 text-white/70">
              Lesson id: <span className="text-white/90">{lesson_id}</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                className="rounded-full border border-white/20 px-4 py-2 text-xs hover:bg-white/10"
                onClick={() => router.push("/students")}
              >
                Back to Lounge
              </button>
              <Link
                className="rounded-full border border-white/20 px-4 py-2 text-xs hover:bg-white/10"
                href="/ebook/music-production"
              >
                View Ebook
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Quiz */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Quiz
                quizId={lesson.quiz_id}     // UUID from Supabase quizzes.id
                courseSlug={COURSE_SLUG}    // "music-production"
                lessonId={lesson.lesson_id} // "mp-ch1-daw-signal-flow"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <button
                className="rounded-full border border-white/20 px-4 py-2 text-xs hover:bg-white/10"
                onClick={() => router.push("/students")}
              >
                Back to Lounge
              </button>

              <Link
                className="rounded-full border border-white/20 px-4 py-2 text-xs hover:bg-white/10"
                href={`/ebook/music-production/chapters/${lesson.chapter_slug}`}
              >
                Review chapter
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
