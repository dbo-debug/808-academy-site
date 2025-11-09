// src/app/students/page.tsx
"use client";

import useSWR from "swr";
import Link from "next/link";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Stat from "../components/Stat";
import Announcements from "../components/Announcements";
import CourseCard from "../components/CourseCard";
import NotifyMeButton from "../components/NotifyMeButton";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load");
  return res.json();
};

export default function StudentLoungePage() {
  const router = useRouter();
  const { data, error } = useSWR("/students/api/lounge", fetcher);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) router.replace("/auth/signin");
    };
    checkAuth();
  }, [router]);

  if (error)
    return (
      <div className="min-h-screen grid place-items-center text-red-400">
        Failed to load dashboard.
      </div>
    );

  if (!data)
    return (
      <div className="min-h-screen grid place-items-center text-white/70">
        Loading Lounge...
      </div>
    );

  const { course, progress, gpa, links, announcements } = data;

  return (
    <main className="min-h-screen bg-neutral-950 text-white px-6 py-10 space-y-12">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Student Lounge</h1>
        <p className="text-white/60 mt-2">
          Welcome back! Here’s your progress overview and quick links.
        </p>
      </header>

      {/* Stats Row */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Stat label="Progress" value={`${progress.percent}%`} tone="info" />
        <Stat label="GPA" value={`${gpa.percent}%`} tone="success" />
        <Stat
          label="Standing"
          value={progress.percent >= 70 ? "Good" : "At Risk"}
          tone={progress.percent >= 70 ? "success" : "warn"}
        />
      </div>

      {/* Active Course */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Current Course</h2>
        <CourseCard
          title={course.title}
          subtitle={`${progress.done} of ${progress.total} lessons complete`}
          href={`/students/music-production/${course.slug}`}
        />
      </section>

      {/* Announcements */}
      <section className="mt-12">
        <Announcements list={announcements} />
      </section>

      {/* Quick Links */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link: any) => (
            <Link
              key={link.href}
              href={link.href}
              className="block border border-white/10 bg-white/[0.03] rounded-xl p-4 hover:bg-white/[0.06] transition"
            >
              <p className="text-cyan-300 font-medium">{link.label}</p>
            </Link>
          ))}
          <NotifyMeButton />
        </div>
      </section>
    </main>
  );
}
