// src/app/students/components/PromoBar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Banner = {
  id: string;
  label: string;
  sub?: string;
  href: string;
  tone?: "cyan" | "purple" | "green" | "rose";
};

const tones: Record<NonNullable<Banner["tone"]>, string> = {
  cyan: "from-cyan-500/20 to-cyan-400/10 border-cyan-400/30",
  purple: "from-purple-500/20 to-purple-400/10 border-purple-400/30",
  green: "from-emerald-500/20 to-emerald-400/10 border-emerald-400/30",
  rose: "from-rose-500/20 to-rose-400/10 border-rose-400/30",
};

export default function PromoBar({
  items = [
    { id: "mp", label: "Music Production", sub: "Start or resume your course →", href: "/ebook/music-production", tone: "cyan" },
    { id: "events", label: "Live Events", sub: "Weekly Q&A and guest producers", href: "/students/lounge/events", tone: "purple" },
    { id: "plugins", label: "Plugin Deals (Soon)", sub: "Student discounts on your favorite tools", href: "/students/store/plugins", tone: "green" },
    { id: "merch", label: "Student Merch (Soon)", sub: "Hoodies, tees, hats, stickers", href: "/students/store/merch", tone: "rose" },
  ],
  rotateMs = 7000,
}: { items?: Banner[]; rotateMs?: number }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), rotateMs);
    return () => clearInterval(t);
  }, [items.length, rotateMs]);

  const it = items[idx];
  const tone = tones[it.tone ?? "cyan"];

  return (
    <div className={`rounded-2xl border bg-gradient-to-r ${tone} p-4`}>
      <Link href={it.href} className="block">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm uppercase tracking-wider text-white/70">Featured</div>
            <div className="text-lg font-semibold">{it.label}</div>
            {it.sub && <div className="text-white/70">{it.sub}</div>}
          </div>
          <div className="shrink-0 rounded-lg border border-white/20 px-3 py-1.5 text-white/80 hover:bg-white/10">
            Learn more →
          </div>
        </div>
      </Link>
    </div>
  );
}
