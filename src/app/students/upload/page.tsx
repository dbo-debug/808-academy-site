// src/app/students/upload/page.tsx
"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { supabase } from "@/lib/supabase";
import AuthGuard from "../components/AuthGuard";

type Kind = "homework" | "sync" | "remix";

const KIND_LABELS: Record<Kind, string> = {
  homework: "Homework",
  sync: "Sync Library",
  remix: "Remix Contest",
};

const LESSON_OPTIONS = [
  { slug: "sound-hearing", label: "Pre-Lesson · Sound & Hearing" },
  { slug: "daw-signal-flow", label: "Lesson 1 · DAW & Signal Flow" },
  { slug: "pre-production", label: "Lesson 2 · Pre-Production" },
  { slug: "verse-hook", label: "Lesson 3 · Verse & Hook" },
  { slug: "drum-production", label: "Lesson 4 · Drum Production" },
  { slug: "low-end-theory", label: "Lesson 5 · Low-End Theory" },
  { slug: "harmony-chords", label: "Lesson 6 · Harmony & Chords" },
  { slug: "vocal-production", label: "Lesson 7 · Vocal Production" },
  { slug: "mixing-fundamentals", label: "Lesson 8 · Mixing Fundamentals" },
  { slug: "final-unit", label: "Lesson 9 · Final Unit / Project" },
];

export default function UploadPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Allow ?type=remix / ?type=sync / ?type=homework to pre-select
  const initialKindParam = (searchParams.get("type") || "").toLowerCase();
  const initialKind: Kind =
    initialKindParam === "sync" || initialKindParam === "remix"
      ? (initialKindParam as Kind)
      : "homework";

  const [kind, setKind] = useState<Kind>(initialKind);
  const [lessonSlug, setLessonSlug] = useState<string>("sound-hearing");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title.trim()) {
      setError("Please add a title for this submission.");
      return;
    }

    if (!url.trim()) {
      setError("Please paste a link to your file (Drive, Dropbox, etc.).");
      return;
    }

    if (kind === "homework" && !lessonSlug) {
      setError("Please pick which lesson this homework is for.");
      return;
    }

    // 🔐 get Supabase access token for Authorization header
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      console.error("[upload] getSession error", sessionError);
      setError("Could not read your session. Please sign in again.");
      return;
    }

    const accessToken = sessionData.session?.access_token;
    if (!accessToken) {
      setError("You must be signed in to submit work.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/students/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // 👈 matches route.ts
        },
        body: JSON.stringify({
          kind,
          title: title.trim(),
          url: url.trim(), // 👈 backend expects 'url'
          notes: notes.trim() || null,
          courseSlug: "music-production",
          lessonSlug: kind === "homework" ? lessonSlug : undefined,
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        console.error("[upload] submission error", res.status, json);
        setError(
          json?.error ||
            "Could not save your submission. Please try again in a moment."
        );
        return;
      }

      setSuccess("Submission received! Redirecting to Your Submissions…");
      setTitle("");
      setUrl("");
      setNotes("");

      if (kind !== "homework") {
        setLessonSlug("sound-hearing");
      }

      // short delay then go to history page
      setTimeout(() => {
        router.push("/students/submissions");
      }, 800);
    } catch (err: unknown) {
      console.error("[upload] submit error", err);
      setError("Unexpected error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const kindDescription =
    kind === "homework"
      ? "Weekly assignments tied to specific lessons."
      : kind === "sync"
      ? "Tracks you’d like considered for the internal sync library."
      : "Entries for the current 808 Academy remix contest.";

  const showLessonSelect = kind === "homework";

  return (
    <AuthGuard>
      {/* Background to stay on-brand with lounge */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />
      </div>

      <div className="relative min-h-screen bg-black text-white">
        <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            href="/students"
            className="mb-6 inline-flex items-center gap-2 text-xs text-white/60 hover:text-white"
          >
            <span>←</span>
            <span>Back to Lounge</span>
          </Link>

          <header className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight">
              Submit Your Work
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Homework, sync tracks, and remix entries all live here. Paste a
              link to your file (Google Drive, Dropbox, etc.) and we’ll handle
              the rest.
            </p>
          </header>

          {/* TYPE SELECTOR */}
          <section className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
              Submission Type
            </h2>

            <div className="grid gap-3 sm:grid-cols-3">
              {(["homework", "sync", "remix"] as Kind[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setKind(k)}
                  className={`flex flex-col items-start rounded-xl border px-3 py-3 text-left text-xs transition ${
                    kind === k
                      ? "border-[#00FFF7] bg-black/70 shadow-[0_0_0_1px_rgba(0,255,247,0.4)]"
                      : "border-white/15 bg-black/40 hover:border-white/40"
                  }`}
                >
                  <span className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                    {KIND_LABELS[k]}
                  </span>
                  <span className="text-[11px] text-white/60">
                    {k === "homework" &&
                      "Weekly lesson assignments and class tasks."}
                    {k === "sync" &&
                      "Finished tracks you want considered for sync."}
                    {k === "remix" &&
                      "Your flip of the current remix contest track."}
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-3 text-xs text-white/60">{kindDescription}</p>
          </section>

          {/* FORM CARD */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <form onSubmit={handleSubmit} className="space-y-5">
              {showLessonSelect && (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/80">
                    Lesson<span className="ml-1 text-[#00FFF7]">*</span>
                  </label>
                  <select
                    className="w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2 text-sm outline-none ring-0 focus:border-[#00FFF7]"
                    value={lessonSlug}
                    onChange={(e) => setLessonSlug(e.target.value)}
                  >
                    {LESSON_OPTIONS.map((lesson) => (
                      <option key={lesson.slug} value={lesson.slug}>
                        {lesson.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-white/50">
                    Choose which lesson this homework belongs to.
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-medium text-white/80">
                  Title<span className="ml-1 text-[#00FFF7]">*</span>
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2 text-sm outline-none ring-0 focus:border-[#00FFF7]"
                  placeholder={
                    kind === "homework"
                      ? "Lesson 3 – Drum Pattern Homework"
                      : kind === "sync"
                      ? "New track – Midnight Drive"
                      : "808 Anthem Remix"
                  }
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-white/80">
                  Link<span className="ml-1 text-[#00FFF7]">*</span>
                </label>
                <input
                  type="url"
                  className="w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2 text-sm outline-none ring-0 focus:border-[#00FFF7]"
                  placeholder="https://drive.google.com/your-file-link"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <p className="text-[11px] text-white/50">
                  Paste a shareable link (Google Drive, Dropbox, etc.). Make
                  sure permissions allow viewing.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-white/80">
                  Notes (optional)
                </label>
                <textarea
                  className="min-h-[80px] w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2 text-sm outline-none ring-0 focus:border-[#00FFF7]"
                  placeholder={
                    kind === "remix"
                      ? "Anything you want me to listen for in this remix…"
                      : "Context, questions, or anything else we should know…"
                  }
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              {error && (
                <p className="text-xs font-medium text-red-400">{error}</p>
              )}
              {success && (
                <p className="text-xs font-medium text-emerald-400">
                  {success}
                </p>
              )}

              <div className="flex items-center justify-between pt-2">
                <div className="text-[11px] text-white/50">
                  Submissions will appear on{" "}
                  <Link
                    href="/students/submissions"
                    className="text-[#00FFF7] underline-offset-2 hover:underline"
                  >
                    Your Submissions
                  </Link>
                  .
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-[#00FFF7] px-5 py-2 text-sm font-semibold text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Submitting…" : "Submit"}
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </AuthGuard>
  );
}
