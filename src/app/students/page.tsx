// src/app/students/page.tsx
"use client";

import useSWR from "swr";
import Link from "next/link";

import Stat from "./components/Stat";
import Announcements from "./components/Announcements";
import CourseCard from "./components/CourseCard";

type LoungeResponse = {
  course: { slug: string; title: string };
  progress: { done: number; total: number; percent: number };
  gpa: { percent: number };
  links: Array<{ label: string; href: string }>;
  announcements: Array<{ id: string; title: string; body: string; date: string }>;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function StudentsHome() {
  const { data, error, isLoading } = useSWR<LoungeResponse>(
    "/students/api/lounge",
    fetcher
  );

  const courseSlug = data?.course?.slug ?? "music-production";
  const courseTitle = data?.course?.title ?? "Music Production";

  const done = data?.progress?.done ?? 0;
  const total = data?.progress?.total ?? 8;
  const percent = data?.progress?.percent ?? Math.round((done / Math.max(total, 1)) * 100);
  const gpaPct = data?.gpa?.percent ?? percent;

  const links = data?.links ?? [
    { label: "Student Discord", href: "/students/discord" },
    { label: "Contact Teacher", href: "mailto:teacher@the808academy.com" },
    { label: "Tech Support", href: "mailto:support@the808academy.com" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Student Lounge</h1>
            <p className="text-white/60">
              Welcome back. Continue your course or review resources below.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/students/${courseSlug}`}
              className="rounded-lg border border-cyan-400/40 px-3 py-2 text-cyan-300 hover:bg-cyan-400/10"
            >
              Continue Course
            </Link>
            <Link
              href="/apply"
              className="rounded-lg border border-white/10 px-3 py-2 text-white/80 hover:bg-white/5"
            >
              Book Tutoring
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat label="GPA" value={`${gpaPct}%`} sub="In Good Standing" />
          <Stat label="Progress" value={`${done} / ${total}`} sub={`${percent}% complete`} />
          <Stat label="Streak" value="—" sub="Keep it going" />
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left: Course + Links */}
          <div className="space-y-6 lg:col-span-2">
            {/* Current Course */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <h2 className="mb-3 text-lg font-semibold">Your Course</h2>
              <CourseCard
                c={{
                  title: courseTitle,
                  subtitle: `${total} lessons`,
                  href: `/students/${courseSlug}`,
                }}
              />
            </div>

            {/* Helpful Links */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <h2 className="mb-3 text-lg font-semibold">Quick Links</h2>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-cyan-300 hover:underline"
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Announcements */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <h2 className="mb-3 text-lg font-semibold">Announcements</h2>
              <Announcements items={data?.announcements ?? []} />
            </div>
          </div>
        </div>

        {/* Loading / error states */}
        {isLoading && (
          <p className="mt-6 text-sm text-white/60">Loading your dashboard…</p>
        )}
        {error && (
          <p className="mt-6 text-sm text-red-400">
            Couldn’t load lounge data. Try refresh or check your session.
          </p>
        )}
      </div>
    </div>
  );
}
