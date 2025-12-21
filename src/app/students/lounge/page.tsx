// src/app/students/lounge/page.tsx
"use client";

import { useEffect } from "react";
import AuthGuard from "@/app/students/components/AuthGuard";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

function ClaimEnrollmentsOnMount() {
  useEffect(() => {
    let cancelled = false;

    async function run() {
      console.log("[lounge] claim-enrollments hook mounted");

      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("[lounge] getSession error", error);
        return;
      }

      const session = data.session;
      if (!session?.access_token) {
        console.log("[lounge] no session access_token, skipping claim");
        return;
      }

      try {
        // ✅ IMPORTANT: correct absolute path to the API route
        const res = await fetch("/api/students/claim-enrollments", {
          method: "POST",
          headers: {
            // ✅ Correct Bearer header
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        let json: unknown = null;
        try {
          json = await res.json();
        } catch {
          // ignore JSON parse errors
        }

        if (cancelled) return;

        console.log(
          "[lounge] claim-enrollments response",
          res.status,
          json
        );
      } catch (err) {
        if (cancelled) return;
        console.error("[lounge] claim-enrollments fetch error", err);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

export default function LoungePage() {
  return (
    <AuthGuard>
      {/* Auto-claim any pending enrollments for this logged-in user */}
      <ClaimEnrollmentsOnMount />

      <div className="min-h-[70vh] px-6 py-10 text-white">
        <h1 className="text-3xl font-semibold">Student Lounge</h1>
        <p className="mt-2 text-white/70">
          Welcome! Choose a course to continue.
        </p>

        <div className="mt-6 space-y-3">
          <Link
            className="inline-block rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 hover:bg-white/[0.06]"
            href="/ebook/music-production"
          >
            Music Production
          </Link>
          {/* add more course entry points as needed */}
        </div>
      </div>
    </AuthGuard>
  );
}
