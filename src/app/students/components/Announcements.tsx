// src/app/students/components/Announcements.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export type AnnouncementItem = {
  id: string;
  title: string;
  body?: string | null;
  date?: string | null;
  pinned?: boolean | null;
};

function safeDateLabel(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  if (!Number.isFinite(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

// Converts literal "\n" sequences into real newlines, and trims
function normalizeBody(body?: string | null) {
  if (!body) return "";
  return body.replace(/\\n/g, "\n").trim();
}

export default function Announcements({ items }: { items: AnnouncementItem[] }) {
  const slides = useMemo(() => (Array.isArray(items) ? items : []), [items]);
  const [active, setActive] = useState(0);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const total = slides.length;

  // keep active index valid if list changes
  useEffect(() => {
    if (total === 0) setActive(0);
    else if (active > total - 1) setActive(total - 1);
  }, [total, active]);

  const goTo = (idx: number) => {
    if (!scrollerRef.current || total === 0) return;
    const next = Math.max(0, Math.min(idx, total - 1));
    setActive(next);

    const child = scrollerRef.current.children.item(next) as HTMLElement | null;
    child?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">Announcements</h3>
          <p className="text-xs text-white/50">Updates from 808 Academy — check back often.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded-full border border-white/10 bg-black/30 px-2 py-1 text-[11px] text-white/70">
            {total} total
          </div>

          <button
            type="button"
            onClick={prev}
            disabled={active <= 0}
            className="rounded-lg border border-white/15 bg-black/30 px-2 py-1 text-xs text-white/70 transition hover:border-white/30 hover:text-white disabled:opacity-40"
            aria-label="Previous announcement"
          >
            ←
          </button>

          <button
            type="button"
            onClick={next}
            disabled={active >= total - 1}
            className="rounded-lg border border-white/15 bg-black/30 px-2 py-1 text-xs text-white/70 transition hover:border-white/30 hover:text-white disabled:opacity-40"
            aria-label="Next announcement"
          >
            →
          </button>
        </div>
      </div>

      {total === 0 ? (
        <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/60">
          No announcements yet — check back soon.
        </div>
      ) : (
        <>
          {/* HORIZONTAL SLIDER */}
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onScroll={() => {
              const el = scrollerRef.current;
              if (!el) return;

              const children = Array.from(el.children) as HTMLElement[];
              if (children.length === 0) return;

              const left = el.scrollLeft;
              let bestIdx = 0;
              let bestDist = Number.POSITIVE_INFINITY;

              children.forEach((c, idx) => {
                const dist = Math.abs(c.offsetLeft - left);
                if (dist < bestDist) {
                  bestDist = dist;
                  bestIdx = idx;
                }
              });

              if (bestIdx !== active) setActive(bestIdx);
            }}
          >
            {slides.map((a) => {
              const dateLabel = safeDateLabel(a.date ?? null);
              const pinned = a.pinned === true;
              const body = normalizeBody(a.body);

              return (
                <article
                  key={a.id}
                  className="min-w-[280px] max-w-[280px] snap-start rounded-2xl border border-white/10 bg-black/25 p-4"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-[11px] text-white/60">
                      {pinned ? (
                        <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-white/70">
                          Pinned
                        </span>
                      ) : null}
                      <span>{dateLabel || "—"}</span>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/60">
                      #{a.id.slice(0, 4)}
                    </div>
                  </div>

                  <h4 className="text-sm font-semibold leading-snug">{a.title}</h4>

                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-white/70">
                    {body || "Details coming soon."}
                  </p>
                </article>
              );
            })}
          </div>

          {/* DOTS */}
          <div className="mt-3 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-[#00FFF7]" : "w-3 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to announcement ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
