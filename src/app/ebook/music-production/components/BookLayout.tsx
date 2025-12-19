import React, { ReactNode } from "react";
import Link from "next/link";
import type { ChapterMeta } from "../page";

type BookLayoutProps = {
  children: ReactNode;
  chapters: ChapterMeta[];
  currentChapterId: ChapterMeta["id"];
};

const BookLayout: React.FC<BookLayoutProps> = ({
  children,
  chapters,
  currentChapterId,
}) => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-black via-slate-950 to-black text-slate-100">
      <main className="mx-auto flex max-w-7xl scroll-smooth flex-col gap-0 px-4 pb-16 pt-8 sm:px-6 lg:flex-row lg:gap-10 lg:px-8 lg:pt-12">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/70 px-4 py-3 shadow-sm lg:hidden">
          <div className="text-sm font-semibold text-slate-50">
            Music Production — Ebook
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <Link
              href="/students"
              className="inline-flex items-center rounded-full border border-slate-700/70 px-3 py-1 font-semibold text-slate-200 transition hover:border-emerald-500/60 hover:text-emerald-200"
            >
              ← Back to Lounge
            </Link>
            <Link
              href="/ebook/music-production"
              className="inline-flex items-center rounded-full border border-emerald-500/60 px-3 py-1 font-semibold text-emerald-200 transition hover:border-emerald-400 hover:text-emerald-50"
            >
              All Chapters
            </Link>
          </div>
        </div>
        {/* Left TOC (desktop) */}
        <aside className="mb-8 hidden w-full shrink-0 lg:sticky lg:top-8 lg:block lg:max-w-xs">
          <nav className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur">
            <div className="mb-4 flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                  The 808 Academy
                </p>
                <h2 className="text-sm font-medium text-slate-50">
                  Music Production
                </h2>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                  Ebook
                </span>
                <Link
                  href="/students"
                  className="text-[11px] font-semibold text-slate-300 underline-offset-4 hover:text-emerald-200 hover:underline"
                >
                  ← Back to Lounge
                </Link>
              </div>
            </div>

            <ul className="space-y-1 text-sm">
              {chapters.map((chapter) => {
                const isActive = chapter.id === currentChapterId;
                return (
                  <li key={chapter.id}>
                    <Link
                      href={`/ebook/music-production/chapters/${chapter.id}`}
                      scroll
                      className={[
                        "flex flex-col rounded-xl px-3 py-2 transition",
                        "hover:bg-slate-900/80 hover:text-slate-50",
                        isActive
                          ? "border border-emerald-500/60 bg-slate-900/90 text-slate-50 shadow-[0_0_18px_rgba(16,185,129,0.25)]"
                          : "border border-transparent text-slate-300",
                      ].join(" ")}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                          {chapter.label}
                        </span>
                        {chapter.isPreLesson && (
                          <span className="rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                            Pre-class
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 text-[13px] font-medium">
                        {chapter.title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <div className="flex-1">
          <div className="mb-4 hidden items-center justify-between gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/70 px-4 py-3 lg:flex">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Music Production — Ebook
              </p>
              <p className="text-sm text-slate-200">Navigate chapters or jump back.</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Link
                href="/students"
                className="inline-flex items-center rounded-full border border-slate-700/80 px-3 py-1.5 font-semibold text-slate-200 transition hover:border-emerald-500/60 hover:text-emerald-200"
              >
                ← Back to Lounge
              </Link>
              <Link
                href="/ebook/music-production"
                className="inline-flex items-center rounded-full border border-emerald-500/60 bg-emerald-500/10 px-3 py-1.5 font-semibold text-emerald-200 transition hover:border-emerald-400 hover:text-emerald-50"
              >
                All Chapters
              </Link>
            </div>
          </div>

          {/* Top TOC (mobile) */}
          <div className="mb-6 lg:hidden">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                  The 808 Academy
                </p>
                <h1 className="text-base font-semibold text-slate-50">
                  Music Production — Ebook
                </h1>
              </div>
            </div>

            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1 pt-1">
              {chapters.map((chapter) => {
                const isActive = chapter.id === currentChapterId;
                return (
                  <Link
                    key={chapter.id}
                    href={`/ebook/music-production/chapters/${chapter.id}`}
                    scroll
                    className={[
                      "whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition",
                      "hover:border-emerald-400/60 hover:text-emerald-300",
                      isActive
                        ? "border-emerald-500/70 bg-slate-900/90 text-emerald-200 shadow-[0_0_16px_rgba(16,185,129,0.4)]"
                        : "border-slate-700 bg-slate-950/70 text-slate-300",
                    ].join(" ")}
                  >
                    {chapter.label.replace("Chapter ", "Ch. ")}
                    {" • "}
                    {chapter.isPreLesson ? "Pre" : chapter.title}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Main content card */}
          <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-b from-slate-950/90 via-slate-950 to-black/95 p-5 shadow-[0_0_35px_rgba(0,0,0,0.9)] sm:p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookLayout;
