// src/app/auth/callback/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    let cancelled = false;

    const go = (path: string) => {
      if (!cancelled) router.replace(path);
    };

    const run = async () => {
      try {
        // If you pass ?next=/somewhere, honor it.
        // Default: go straight to the lounge entry point.
        const next = searchParams.get("next") || "/students";

        // 1) PKCE / code flow (most common with modern Supabase)
        const code = searchParams.get("code");
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
          go(next);
          return;
        }

        // 2) Hash/token flow fallback (older links)
        // Give supabase a moment to ingest the URL fragment and store session.
        for (let i = 0; i < 6; i++) {
          const { data } = await supabase.auth.getSession();
          if (data.session) {
            go(next);
            return;
          }
          await new Promise((r) => setTimeout(r, 250));
        }

        // No session established → send to sign in
        go("/auth/signin?error=missing_session");
      } catch {
        go("/auth/signin?error=callback_failed");
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white/80 flex items-center justify-center px-6">
      Signing you in…
    </div>
  );
}
