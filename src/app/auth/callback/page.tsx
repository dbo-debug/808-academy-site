// src/app/auth/callback/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      try {
        const url = new URL(window.location.href);

        // 1) Newer Supabase flow: ?code=...
        const code = url.searchParams.get("code");
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
          router.replace("/students");
          return;
        }

        // 2) Hash-token flow: #access_token=...
        // Let supabase-js read the hash and populate the session on first call.
        const { data: s1 } = await supabase.auth.getSession();
        if (s1.session) {
          router.replace("/students");
          return;
        }

        // Give it a beat to process the hash, then check again
        setTimeout(async () => {
          const { data: s2 } = await supabase.auth.getSession();
          router.replace(s2.session ? "/students/lounge" : "/auth/signin");
        }, 400);
      } catch {
        router.replace("/auth/signin");
      }
    };

    run();
  }, [router]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white/80 flex items-center justify-center">
      Signing you in…
    </div>
  );
}
