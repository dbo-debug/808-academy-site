"use client";

import React from "react";

export type AnnouncementItem = {
  id: string;
  title: string;
  body?: string | null;
  date?: string | null;
  pinned?: boolean | null;
};

function formatDate(date?: string | null) {
  if (!date) return null;
  const d = new Date(date);
  if (!Number.isFinite(d.getTime())) return null;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function Announcements({ items }: { items: AnnouncementItem[] }) {
  const sorted = [...items].sort((a, b) => {
    const ap = a.pinned ? 1 : 0;
    const bp = b.pinned ? 1 : 0;
    if (ap !== bp) return bp - ap; // pinned first

    const ad = a.date ? new Date(a.date).getTime() : 0;
    const bd = b.date ? new Date(b.date).getTime() : 0;
    return bd - ad; // newest first
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Announcements</h3>
          <p className="mt-0.5 text-xs text-white/50">
            Updates from 808 Academy — check back often.
          </p>
        </div>

        <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] text-white/60">
          {sorted.length} total
        </span>
      </div>

      <div className="space-y-3">
        {sorted.map((a) => {
          const dateLabel = formatDate(a.date);
          const body =
            (a.body ?? "").trim() ||
            "More details coming soon — keep an eye on the lounge for updates.";

          return (
            <div
              key={a.id}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/30 p-4 transition hover:border-white/20"
            >
              {/* subtle gradient accent */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="absolute -left-10 top-0 h-full w-40 bg-gradient-to-r from-cyan-400/15 to-transparent" />
              </div>

              <div className="relative flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {a.pinned ? (
                      <span className="rounded-full bg-[#00FFF7]/15 px-2 py-0.5 text-[11px] font-semibold text-[#00FFF7]">
                        Pinned
                      </span>
                    ) : null}

                    {dateLabel ? (
                      <span className="text-[11px] text-white/50">{dateLabel}</span>
                    ) : (
                      <span className="text-[11px] text-white/50">New</span>
                    )}
                  </div>

                  <div className="mt-1 truncate text-sm font-semibold">{a.title}</div>

                  <div className="mt-2 whitespace-pre-line text-sm text-white/70">
                    {body}
                  </div>
                </div>

                <div className="hidden shrink-0 sm:block">
                  <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 p-2">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-full w-full text-white/70"
                    >
                      <path
                        d="M7 8h10M7 12h10M7 16h7"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {sorted.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white/60">
            No announcements yet — check back soon.
          </div>
        ) : null}
      </div>
    </div>
  );
}
