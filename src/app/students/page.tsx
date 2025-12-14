// src/app/students/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";

import { supabase } from "@/lib/supabase";

import AuthGuard from "./components/AuthGuard";
import Stat from "./components/Stat";
import Announcements from "./components/Announcements";
import CourseCard from "./components/CourseCard";

//
// ---------------------------
// Types
// ---------------------------
//

export type MembershipTier = "membership" | "tutoring" | "cohort";

export type LoungeResponse = {
  // ✅ new gate flags (from lounge API)
  hasLoungeAccess: boolean;
  hasCurriculumAccess: boolean;

  membershipTier: MembershipTier;
  displayName: string;
  avatarUrl: string | null;

  course: { slug: string; title: string };
  progress: {
    done: number;
    total: number;
    percent: number;
    currentLessonSlug?: string | null;
  };
  gpa: { percent: number };
  links: Array<{ label: string; href: string }>;
  announcements: Array<{
    id: string;
    title: string;
    body?: string;
    date?: string;
  }>;
};

type LoungeFetcherResult =
  | { ok: true; data: LoungeResponse }
  | {
      ok: false;
      status: number;
      error: string;
      data?: Partial<LoungeResponse>;
    };

// Fetcher that attaches the Supabase session token as Authorization
const loungeFetcher = async (url: string): Promise<LoungeFetcherResult> => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error("[students/page] getSession error in loungeFetcher", error);
    return { ok: false, status: 500, error: error.message };
  }

  const session = data.session;
  if (!session?.access_token) {
    return { ok: false, status: 401, error: "No Supabase session" };
  }

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${session.access_token}` },
  });

  // ✅ Treat 403 as “paywall state”, not a fatal error
  if (res.status === 403) {
    const j = await res.json().catch(() => ({} as any));
    return {
      ok: false,
      status: 403,
      error: j?.error || "No active membership or enrollment",
      data: {
        hasLoungeAccess: false,
        hasCurriculumAccess: false,
        // keep the UI stable even if server didn’t send these
        displayName: "Student",
        avatarUrl: null,
        membershipTier: "membership",
        course: { slug: "music-production", title: "Music Production" },
        progress: { done: 0, total: 10, percent: 0, currentLessonSlug: null },
        gpa: { percent: 0 },
        links: [],
        announcements: [],
      },
    };
  }

  // 401 should behave like auth problem
  if (res.status === 401) {
    const txt = await res.text().catch(() => "");
    return { ok: false, status: 401, error: txt || "Unauthorized" };
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error(
      "[students/page] loungeFetcher HTTP error",
      res.status,
      res.statusText,
      text
    );
    return { ok: false, status: res.status, error: `Lounge API error ${res.status}` };
  }

  const json = (await res.json()) as LoungeResponse;
  return { ok: true, data: json };
};

//
// ---------------------------
// ClaimEnrollmentsOnMount
// ---------------------------
//

function ClaimEnrollmentsOnMount() {
  useEffect(() => {
    let cancelled = false;

    async function run() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("[students/page] getSession error", error);
        return;
      }

      const session = data.session;
      if (!session?.access_token) return;

      try {
        const res = await fetch("/api/students/claim-enrollments", {
          method: "POST",
          headers: { Authorization: `Bearer ${session.access_token}` },
        });

        let json: unknown = null;
        try {
          json = await res.json();
        } catch {
          // ignore
        }

        if (!cancelled) {
          console.log("[students/page] claim-enrollments response", res.status, json);
        }
      } catch (err) {
        if (!cancelled) console.error("[students/page] claim-enrollments error", err);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

//
// ---------------------------
// Helpers
// ---------------------------
//

function formatPercent(value: number) {
  return value.toFixed(1);
}

// Lesson 0 (Foundations) + Lessons 1–8 + Final Unit
const OVERRIDE_TOTAL_LESSONS = 10;

const MUSIC_PROD_CHAPTER_SLUGS = [
  "sound-hearing",
  "daw-signal-flow",
  "pre-production",
  "verse-hook",
  "drum-production",
  "low-end-theory",
  "harmony-chords",
  "vocal-production",
  "mixing-fundamentals",
  "final-unit",
] as const;

//
// ---------------------------
// Header + Hero
// ---------------------------
//

function HeaderBar({ displayName = "Student" }: { displayName?: string }) {
  const initial = displayName?.charAt(0).toUpperCase() ?? "S";

  const doSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch {}
    window.location.href = "/auth/signin";
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="text-lg font-semibold tracking-wide">808 Academy — Students</div>

        <nav className="hidden gap-6 text-sm md:flex">
          <Link href="/students" className="hover:text-cyan-300">
            Dashboard
          </Link>
          <Link href="/ebook/music-production" className="hover:text-cyan-300">
            Course
          </Link>
          <Link href="/students/contests" className="hover:text-cyan-300">
            Remix Contests
          </Link>
          <Link href="/students/store/merch" className="hover:text-cyan-300">
            Store
          </Link>
          <Link href="/contact" className="hover:text-cyan-300">
            Support
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
            <span className="text-xs">{initial}</span>
          </div>

          <div className="hidden text-sm text-white/80 sm:block">{displayName}</div>

          <button
            type="button"
            onClick={doSignOut}
            className="text-xs text-white/60 hover:text-white/90"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}

function BannerCarousel() {
  const slides = [
    { id: 1, src: "/assets/lounge/banner/remix.jpg", href: "/students/contests/current" },
    { id: 2, src: "/assets/lounge/banner/feb-2.jpg", href: "/apply" },
    { id: 3, src: "/assets/lounge/banner/merch.jpg", href: "/students/store/merch" },
    { id: 4, src: "/assets/lounge/banner/plugs-gear.jpg", href: "/students/store/plugins" },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  const slide = slides[active];

  return (
    <section className="mb-8">
      <div className="relative rounded-3xl border border-white/10 bg-white/5">
        <Link href={slide.href}>
          <div className="relative w-full aspect-[30/9]">
            <Image key={slide.id} src={slide.src} alt="" fill priority className="object-contain p-2" />
          </div>
        </Link>

        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActive(i);
              }}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-6 bg-[#00FFF7]" : "w-3 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProfileCard({
  displayName,
  membershipLabel,
  avatarUrl,
}: {
  displayName: string;
  membershipLabel: string;
  avatarUrl: string | null;
}) {
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <section className="mb-10">
      <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:flex-row">
        <div className="flex items-center gap-5">
          <div className="relative h-20 w-20">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={displayName}
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-3xl">
                {initial}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold">{displayName}</h2>
            <p className="text-sm text-white/60">{membershipLabel}</p>
          </div>
        </div>

        <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:items-end">
          <Link
            href="/students/profile"
            className="rounded-lg border border-white/20 px-4 py-2 text-center text-xs hover:border-[#00FFF7] hover:text-[#00FFF7]"
          >
            Edit Profile
          </Link>

          <Link
            href="/auth/forgot"
            className="rounded-lg border border-white/20 px-4 py-2 text-center text-xs hover:border-[#00FFF7] hover:text-[#00FFF7]"
          >
            Reset password
          </Link>

          <button
            type="button"
            onClick={async () => {
              try {
                const { data } = await supabase.auth.getSession();
                const token = data.session?.access_token;
                if (!token) {
                  alert("Please sign in again.");
                  return;
                }

                const res = await fetch("/api/billing-portal", {
                  method: "POST",
                  headers: { Authorization: `Bearer ${token}` },
                });

                const json = await res.json().catch(() => ({}));
                if (!res.ok) throw new Error(json?.error || "Billing portal failed.");

                if (json?.url) window.location.href = json.url;
                else throw new Error("Missing billing portal URL.");
              } catch (e: any) {
                alert(e?.message || "Could not open billing portal.");
              }
            }}
            className="rounded-lg border border-white/20 px-4 py-2 text-center text-xs hover:border-[#00FFF7] hover:text-[#00FFF7]"
          >
            Manage billing
          </button>
        </div>
      </div>
    </section>
  );
}

//
// ---------------------------
// Paywall Panel
// ---------------------------
//

function PaywallCard({ message }: { message?: string }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-purple-500/20 via-black/40 to-cyan-500/20 p-6 backdrop-blur">
      <h2 className="text-xl font-semibold">Access required</h2>
      <p className="mt-2 text-sm text-white/70">
        {message ||
          "Your account is signed in, but it doesn’t have an active membership or enrollment yet."}
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/membership"
          className="rounded-xl bg-[#00FFF7] px-5 py-2 text-sm font-semibold text-black transition hover:scale-[1.02]"
        >
          Join Membership ($15/mo)
        </Link>

        <Link
          href="/tutoring"
          className="rounded-xl border border-white/20 px-5 py-2 text-sm text-white/80 transition hover:border-[#00FFF7] hover:text-[#00FFF7]"
        >
          Book Tutoring
        </Link>

        <Link
          href="/apply"
          className="rounded-xl border border-white/20 px-5 py-2 text-sm text-white/80 transition hover:border-[#00FFF7] hover:text-[#00FFF7]"
        >
          Join a Cohort
        </Link>
      </div>

      <p className="mt-4 text-xs text-white/50">
        Already paid? Try signing out and back in — or email{" "}
        <a className="underline decoration-dotted underline-offset-2" href="mailto:support@the808academy.com">
          support@the808academy.com
        </a>
        .
      </p>
    </section>
  );
}

//
// ---------------------------
// Dashboard Cards
// ---------------------------
//

function CourseProgressCard({
  courseTitle,
  landingHref,
  continueHref,
  done,
  percent,
}: {
  courseTitle: string;
  landingHref: string;
  continueHref: string;
  done: number;
  percent: string;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <h3 className="mb-4 text-lg font-semibold">Music Production Course</h3>

      <CourseCard
        c={{
          title: courseTitle,
          subtitle: "10 lessons",
          href: landingHref,
        }}
      />

      <div className="mt-5">
        <Link
          href={continueHref}
          className="inline-block rounded-xl bg-[#00FFF7] px-5 py-2 font-semibold text-black transition hover:scale-105"
        >
          Continue Course
        </Link>
      </div>

      <div className="mt-6">
        <div className="h-2 w-full rounded-full bg-white/10">
          <div className="h-full rounded-full bg-[#00FFF7]" style={{ width: `${percent}%` }} />
        </div>
        <p className="mt-2 text-xs text-white/60">
          {done} of 10 lessons complete • {percent}%
        </p>
      </div>
    </section>
  );
}

function HomeworkCard() {
  return (
    <section className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <h3 className="text-lg font-semibold">Homework Portal</h3>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm">
          Weekly homework is due Sunday at 11:59pm. Upload your stems, mixes, or project files here.
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Link
            href="/students/upload?type=homework"
            className="rounded-lg bg-[#00FFF7] px-4 py-2 text-sm font-semibold text-black transition hover:scale-105"
          >
            Submit Homework
          </Link>

          <Link
            href="/students/submissions"
            className="text-xs text-white/70 underline-offset-2 hover:text-[#00FFF7] hover:underline"
          >
            View all submissions
          </Link>
        </div>

        <p className="mt-2 text-xs text-white/60">
          Final project (Lesson 9) is due Friday at 11:59pm of Week 4.
        </p>
      </div>
    </section>
  );
}

function SyncLibraryCard() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <h3 className="mb-3 text-lg font-semibold">Sync Library Submissions</h3>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm">
          Have tracks you think are sync-ready? Submit them for the internal library and future opportunities.
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Link
            href="/students/upload?type=sync"
            className="rounded-lg border border-white/20 px-4 py-2 text-sm transition hover:border-[#00FFF7] hover:text-[#00FFF7]"
          >
            Submit for Sync Library
          </Link>

          <Link
            href="/students/submissions"
            className="text-xs text-white/70 underline-offset-2 hover:text-[#00FFF7] hover:underline"
          >
            View all submissions
          </Link>
        </div>

        <p className="mt-2 text-xs text-white/60">
          Use descriptive titles and notes so we know where each track fits.
        </p>
      </div>
    </section>
  );
}

function RemixContestCard() {
  return (
    <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-cyan-400/30 p-6 backdrop-blur">
      <h3 className="mb-3 text-lg font-semibold">Bi-Weekly Remix Contest</h3>
      <p className="text-sm">Flip the 808 Academy contest pack, submit, and win $100 + a feature.</p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/students/contests/current"
          className="rounded-lg bg-[#00FFF7] px-4 py-2 text-sm font-semibold text-black transition hover:scale-105"
        >
          Get Contest Pack
        </Link>
        <Link
          href="/students/upload?type=remix"
          className="rounded-lg border border-white/20 px-4 py-2 text-sm transition hover:border-[#00FFF7] hover:text-[#00FFF7]"
        >
          Submit Remix
        </Link>
        <Link
          href="/remix-contest"
          className="rounded-lg border border-white/20 px-4 py-2 text-sm transition hover:border-white/60 hover:text-white"
        >
          Contest details
        </Link>
      </div>

      <p className="mt-2 text-xs text-white/60">New brief drops every two weeks. Winners featured in class + socials.</p>
    </section>
  );
}

function StatsCard({
  gpa,
  done,
  percentString,
}: {
  gpa: string;
  done: number;
  percentString: string;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <h3 className="mb-4 text-lg font-semibold">Your Stats</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Stat label="GPA" value={`${gpa}%`} sub="In Good Standing" />
        <Stat label="Progress" value={`${done}/10`} sub={`${percentString}% complete`} />
        <Stat label="Streak" value="—" sub="Coming soon" />
      </div>
    </section>
  );
}

function QuickLinksCard() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>

      <div className="space-y-2 text-sm">
        <Link href="/students/store/merch" className="block rounded-lg px-3 py-2 transition hover:bg-white/5">
          808 Merch Store →
        </Link>

        <div className="flex items-center justify-between rounded-lg px-3 py-2 transition hover:bg-white/5">
          <Link href="/students/store/plugins" className="text-sm">
            Plugin Partner Store →
          </Link>
          <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs">Coming Soon</span>
        </div>

        <Link
          href="mailto:admin@the808academy.com?subject=Tech%20Support"
          className="block rounded-lg px-3 py-2 transition hover:bg-white/5"
        >
          Tech Support →
        </Link>

        <Link href="/tutoring" className="block rounded-lg px-3 py-2 transition hover:bg-white/5">
          Book Tutoring →
        </Link>

        <Link href="/tutoring" className="block rounded-lg px-3 py-2 transition hover:bg-white/5">
          Schedule Office Hours →
        </Link>

        <Link
          href="mailto:teacher@the808academy.com"
          className="block rounded-lg px-3 py-2 transition hover:bg-white/5"
        >
          Contact Teacher →
        </Link>
      </div>
    </section>
  );
}

function AnnouncementsCard({ items }: { items: any[] }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <h3 className="mb-4 text-lg font-semibold">Announcements</h3>

      {items.length > 0 ? (
        <Announcements items={items} />
      ) : (
        <p className="text-sm text-white/60">No announcements yet — check back soon.</p>
      )}
    </section>
  );
}

function StoreCard() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image src="/logo-808-cyan.svg" alt="808 Academy logo" width={103} height={103} />
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">
              808 Merch • Hoodies • Tees • Caps
            </p>
            <h3 className="text-lg font-semibold">Fresh 808 Academy Apparel</h3>
          </div>
        </div>

        <Link
          href="/students/store/merch"
          className="hidden rounded-xl bg-[#00FFF7] px-4 py-2 text-xs font-semibold text-black transition hover:scale-105 sm:inline-block"
        >
          Visit 808 Merch Store
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-black/40 p-3">
          <div className="relative mb-2 aspect-[3/4] w-full overflow-hidden rounded-xl bg-black/60">
            <Image
              src="/assets/lounge/store/merch/art-hoodie-mod.jpg"
              alt="808 Art Hoodie"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 200px"
            />
          </div>
          <p className="text-xs font-semibold">Art Hoodie</p>
          <p className="text-[11px] text-white/60">Statement piece • Limited run</p>
        </div>

        <div className="rounded-2xl bg-black/40 p-3">
          <div className="relative mb-2 aspect-[3/4] w-full overflow-hidden rounded-xl bg-black/60">
            <Image
              src="/assets/lounge/store/merch/white-t-mod.jpg"
              alt="White Logo Tee"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 200px"
            />
          </div>
          <p className="text-xs font-semibold">White Logo Tee</p>
          <p className="text-[11px] text-white/60">Clean front print • Everyday fit</p>
        </div>

        <div className="rounded-2xl bg-black/40 p-3">
          <div className="relative mb-2 aspect-[3/4] w-full overflow-hidden rounded-xl bg-black/60">
            <Image
              src="/assets/lounge/store/merch/cap-mod.jpg"
              alt="808 Dad Cap"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 200px"
            />
          </div>
          <p className="text-xs font-semibold">808 Dad Cap</p>
          <p className="text-[11px] text-white/60">Low-key flex • Adjustable</p>
        </div>
      </div>

      <div className="mt-5 sm:hidden">
        <Link
          href="/students/store/merch"
          className="inline-block w-full rounded-xl bg-[#00FFF7] px-4 py-2 text-center text-xs font-semibold text-black transition hover:scale-105"
        >
          Visit 808 Merch Store
        </Link>
      </div>
    </section>
  );
}

//
// ---------------------------
// MAIN COMPONENT
// ---------------------------
//

export default function StudentsHome() {
  const { data, error, isLoading } = useSWR<LoungeFetcherResult>(
    "/students/api/lounge",
    loungeFetcher
  );

  // Determine state from fetch result
  const lounge = useMemo(() => {
    if (!data) return null;
    if (data.ok) return data.data;
    return (data.data as LoungeResponse) ?? null;
  }, [data]);

  const paywalled = !!data && !data.ok && data.status === 403;

  const displayName = lounge?.displayName ?? "Student";
  const avatarUrl = lounge?.avatarUrl ?? null;

  const membership: MembershipTier = lounge?.membershipTier ?? "membership";

  const membershipLabel =
    membership === "cohort" ? "Cohort Member" : membership === "tutoring" ? "Tutoring Client" : "Lounge Member";

  const hasCurriculumAccess = lounge?.hasCurriculumAccess ?? false;

  // curriculum-only UI
  const showCourse = hasCurriculumAccess;
  const showStats = hasCurriculumAccess;
  const showHomework = membership === "cohort"; // HW only for cohort (your rule)

  // paid lounge UI (membership/tutoring/cohort)
  const showSyncLibrary = (lounge?.hasLoungeAccess ?? false) === true;

  const courseTitle = lounge?.course?.title ?? "Music Production";
  const done = lounge?.progress?.done ?? 0;

  const percent = (done / OVERRIDE_TOTAL_LESSONS) * 100;
  const percentString = formatPercent(percent);

  const gpaPct =
    lounge?.gpa?.percent !== undefined ? formatPercent(lounge.gpa.percent) : formatPercent(percent);

  const announcements = lounge?.announcements ?? [];

  const ebookLandingHref = "/ebook/music-production";
  const apiSlug = lounge?.progress?.currentLessonSlug ?? null;

  let lessonSlug: string | null = null;

  if (
    apiSlug &&
    MUSIC_PROD_CHAPTER_SLUGS.includes(apiSlug as (typeof MUSIC_PROD_CHAPTER_SLUGS)[number])
  ) {
    lessonSlug = apiSlug;
  } else if (done > 0) {
    const idx = Math.min(done, MUSIC_PROD_CHAPTER_SLUGS.length - 1);
    lessonSlug = MUSIC_PROD_CHAPTER_SLUGS[idx];
  }

  const continueHref = lessonSlug == null ? ebookLandingHref : `${ebookLandingHref}/chapters/${lessonSlug}`;

  return (
    <AuthGuard>
      <ClaimEnrollmentsOnMount />

      {/* Global background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <Image
          src="/assets/lounge/lounge-bkgrnd.jpg"
          alt="808 Academy lounge background"
          fill
          priority
          className="object-cover object-center brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/75 to-black/95" />
      </div>

      <div className="relative min-h-screen bg-black text-white">
        <HeaderBar displayName={displayName} />

        <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <BannerCarousel />

          {/* Loading */}
          {isLoading && (
            <p className="mt-6 text-xs text-white/40">Loading your dashboard…</p>
          )}

          {/* Paywall state */}
          {paywalled && (
            <div className="space-y-6">
              <ProfileCard displayName={displayName} membershipLabel="Signed in" avatarUrl={avatarUrl} />
              <PaywallCard message={!data.ok ? data.error : undefined} />
            </div>
          )}

          {/* Generic error (not paywall) */}
          {error && !paywalled && (
            <p className="mt-6 text-xs text-red-400">
              Couldn’t load lounge data. Please refresh.
            </p>
          )}

          {/* Normal lounge */}
          {!isLoading && !paywalled && lounge && (
            <>
              <ProfileCard displayName={displayName} membershipLabel={membershipLabel} avatarUrl={avatarUrl} />

              <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* LEFT */}
                <div className="space-y-6 lg:col-span-2">
                  {showCourse && (
                    <CourseProgressCard
                      courseTitle={courseTitle}
                      landingHref={ebookLandingHref}
                      continueHref={continueHref}
                      done={done}
                      percent={percentString}
                    />
                  )}

                  {showHomework && <HomeworkCard />}
                  {showSyncLibrary && <SyncLibraryCard />}
                  <RemixContestCard />
                </div>

                {/* RIGHT */}
                <div className="space-y-6">
                  {showStats && <StatsCard gpa={gpaPct} done={done} percentString={percentString} />}
                  <QuickLinksCard />
                  <AnnouncementsCard items={announcements} />
                </div>
              </div>

              {/* Full-width store card */}
              <div className="mt-6">
                <StoreCard />
              </div>
            </>
          )}
        </main>
      </div>
    </AuthGuard>
  );
}
