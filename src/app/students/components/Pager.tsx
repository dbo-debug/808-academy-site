"use client";
import { ReactNode, useState } from "react";

type PagerProps = {
  /** Enable page-by-page UX; when false, renders children in a single scroll view */
  enabled?: boolean;
  /** Labels for the page pills / tabs */
  titles?: string[];
  /** One or more <Page> children */
  children: ReactNode | ReactNode[];
};

export default function Pager({ enabled = false, titles = [], children }: PagerProps) {
  const pages = Array.isArray(children) ? children : [children];
  const [i, setI] = useState(0);

  // Scroll mode (disabled): render everything in order
  if (!enabled) return <>{pages}</>;

  const canPrev = i > 0;
  const canNext = i < pages.length - 1;

  return (
    <div className="space-y-4">
      {titles.length ? (
        <div className="flex flex-wrap gap-2 text-sm">
          {titles.map((t, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`rounded-full px-3 py-1 border transition ${
                i === idx
                  ? "border-cyan-400/40 text-cyan-300"
                  : "border-white/10 text-white/60 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      ) : null}

      <div>{pages[i]}</div>

      <div className="flex items-center justify-between">
        <button
          disabled={!canPrev}
          onClick={() => setI((p) => Math.max(0, p - 1))}
          className="rounded-lg border border-white/10 px-3 py-1 disabled:opacity-40"
        >
          Previous
        </button>

        <div className="text-sm text-white/50">
          {i + 1} / {pages.length}
        </div>

        <button
          disabled={!canNext}
          onClick={() => setI((p) => Math.min(pages.length - 1, p + 1))}
          className="rounded-lg border border-white/10 px-3 py-1 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
