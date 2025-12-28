"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Props = {
  // optional: allow you to change copy later without editing component
  classHref?: string;
  remixHref?: string;
};

export default function HomeEntryOverlay({
  classHref = "/courses/music-production",
  remixHref = "/remix-contest",
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // show once per session
    try {
      const key = "808_home_overlay_seen";
      const seen = sessionStorage.getItem(key);
      if (!seen) {
        sessionStorage.setItem(key, "1");
        setOpen(true);
      }
    } catch {
      // if storage blocked, just don’t show
    }
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-6">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0b0f14]/90 backdrop-blur p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#00FFF7]">
              Welcome
            </div>
            <h3 className="mt-1 text-2xl font-semibold text-gray-100">
              Start here
            </h3>
            <p className="mt-2 text-gray-300">
              Pick your entry point — free live class or the remix contest.
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-gray-200 hover:bg-white/5"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Link
            href={classHref}
            className="rounded-xl bg-[#00FFF7] px-5 py-3 font-semibold text-black hover:opacity-90 transition text-center"
            onClick={() => setOpen(false)}
          >
            Free Live Class
          </Link>

          <Link
            href={remixHref}
            className="rounded-xl border border-white/20 px-5 py-3 font-semibold text-gray-100 hover:bg-white/10 transition text-center"
            onClick={() => setOpen(false)}
          >
            Remix Contest
          </Link>
        </div>

        <p className="mt-4 text-xs text-gray-400">
          Tip: DM <span className="text-gray-200 font-semibold">CLASS</span> or{" "}
          <span className="text-gray-200 font-semibold">REMIX</span> on Instagram
          if you want the quick links.
        </p>
      </div>
    </div>
  );
}
