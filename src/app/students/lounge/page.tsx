// src/app/students/lounge/page.tsx
"use client";

import AuthGuard from "@/app/students/components/AuthGuard";
import Link from "next/link";

export default function LoungePage() {
  return (
    <AuthGuard>
      <div className="min-h-[70vh] px-6 py-10 text-white">
        <h1 className="text-3xl font-semibold">Student Lounge</h1>
        <p className="mt-2 text-white/70">
          Welcome! Choose a course to continue.
        </p>

        <div className="mt-6 space-y-3">
          <Link
            className="inline-block rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 hover:bg-white/[0.06]"
            href="/students/music-production"
          >
            Music Production
          </Link>
          {/* add more course entry points as needed */}
        </div>
      </div>
    </AuthGuard>
  );
}
