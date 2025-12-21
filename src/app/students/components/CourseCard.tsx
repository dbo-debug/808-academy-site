// src/app/students/components/CourseCard.tsx
"use client";
import Link from "next/link";

export type CourseSummary = {
  slug?: string;
  title: string;
  total?: number;
  completed?: number;
  percent?: number;
  subtitle?: string;
  href?: string; // optional explicit link override
};

export default function CourseCard({ c }: { c: CourseSummary }) {
  const href =
    c.href ??
    (c.slug === "music-production"
      ? "/ebook/music-production"
      : c.slug
      ? `/students/${c.slug}`
      : "#");

  const percent = c.percent ?? 0;
  const total = c.total ?? 0;
  const completed = c.completed ?? 0;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:bg-white/[0.04] transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{c.title}</h3>
          {c.subtitle ? (
            <p className="text-sm text-white/60 mt-1">{c.subtitle}</p>
          ) : (
            total > 0 && (
              <p className="text-sm text-white/60 mt-1">
                {completed}/{total} lessons • {percent}%
              </p>
            )
          )}
        </div>
        <Link
          href={href}
          className="rounded-lg border border-cyan-400/40 px-3 py-1.5 text-cyan-300 hover:bg-cyan-400/10"
        >
          Open
        </Link>
      </div>

      {/* Progress bar — only if total > 0 */}
      {total > 0 && (
        <div className="mt-4 h-2 w-full rounded bg-white/10 overflow-hidden">
          <div
            className="h-full bg-cyan-400 transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
      )}
    </div>
  );
}
