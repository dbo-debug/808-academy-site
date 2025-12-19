import React from "react";
import Link from "next/link";
import type { ChapterMeta } from "../page";

type ChapterNavProps = {
  chapters: ChapterMeta[];
  currentChapterId: ChapterMeta["id"];
};

const ChapterNav: React.FC<ChapterNavProps> = ({
  chapters,
  currentChapterId,
}) => {
  const index = chapters.findIndex((c) => c.id === currentChapterId);
  const prev = index > 0 ? chapters[index - 1] : undefined;
  const next =
    index < chapters.length - 1 ? chapters[index + 1] : undefined;

  const makeHref = (chapter: ChapterMeta) =>
    `/ebook/music-production/chapters/${chapter.id}`;

  return (
    <nav
      aria-label="Chapter navigation"
      className="mt-8 flex flex-col gap-4 border-t border-slate-800/70 pt-6"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/students"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700/80 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-emerald-500/60 hover:text-emerald-100 sm:w-auto"
        >
          ← Back to Lounge
        </Link>
        <Link
          href="/ebook/music-production"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:border-emerald-400 hover:text-emerald-50 sm:w-auto"
        >
          All Chapters
        </Link>
      </div>

      {/* Previous / Next buttons */}
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:gap-4">
        {/* Previous */}
        {prev ? (
          <Link
            href={makeHref(prev)}
            className="group inline-flex flex-1 items-center gap-2 rounded-2xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-left text-sm text-slate-200 shadow-sm transition hover:border-emerald-500/60 hover:bg-slate-900/80 hover:text-emerald-200"
          >
            <span className="text-lg leading-none">←</span>
            <span className="flex flex-col">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Previous
              </span>
              <span className="text-[13px] font-medium">
                {prev.label}: {prev.title}
              </span>
            </span>
          </Link>
        ) : (
          <div className="inline-flex flex-1 items-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/40 px-4 py-3 text-xs text-slate-400">
            <span className="text-lg leading-none">◎</span>
            <span>
              You&apos;re at the beginning of the{" "}
              <span className="font-semibold text-slate-100">
                Music Production
              </span>{" "}
              ebook.
            </span>
          </div>
        )}

        {/* Next */}
        {next ? (
          <Link
            href={makeHref(next)}
            className="group inline-flex flex-1 items-center justify-end gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-right text-sm text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.28)] transition hover:border-emerald-400 hover:bg-emerald-500/15 hover:text-emerald-50"
          >
            <span className="flex flex-col">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-300/90">
                Next up
              </span>
              <span className="text-[13px] font-medium">
                {next.label}: {next.title}
              </span>
            </span>
            <span className="text-lg leading-none group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        ) : (
          <div className="inline-flex flex-1 items-center justify-end gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-right text-xs text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.28)]">
            <span className="text-lg leading-none">★</span>
            <span>
              You&apos;ve reached the end of the core chapters. Time to apply
              this in real sessions.
            </span>
          </div>
        )}
      </div>

      {/* Back to top (anchor only, no JS) */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <a
          href="#top"
          className="inline-flex items-center gap-1 rounded-full border border-slate-700/80 bg-slate-950/70 px-3 py-1 font-medium text-slate-300 transition hover:border-emerald-500/60 hover:bg-slate-900 hover:text-emerald-200"
        >
          ↑ Back to top
        </a>
        <Link
          href="/ebook/music-production"
          className="inline-flex items-center gap-1 rounded-full border border-slate-700/80 bg-slate-950/70 px-3 py-1 font-medium text-slate-300 transition hover:border-emerald-500/60 hover:bg-slate-900 hover:text-emerald-200"
        >
          Chapter list
        </Link>
      </div>
    </nav>
  );
};

export default ChapterNav;
