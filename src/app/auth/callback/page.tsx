// src/app/auth/callback/page.tsx
"use client";

export const dynamic = "force-dynamic";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function CallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [msg, setMsg] = useState("Signing you in…");

  useEffect(() => {
    const run = async () => {
      try {
        // If Supabase is using the code flow, we’ll see ?code=...
        const code = searchParams.get("code");

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
          router.replace("/students");
          return;
        }

        // Otherwise, supabase-js may have read the hash token already
        const { data: s1 } = await supabase.auth.getSession();
        if (s1.session) {
          router.replace("/students");
          return;
        }

        // Give it a beat, then check again
        setMsg("Finishing sign-in…");
        setTimeout(async () => {
          const { data: s2 } = await supabase.auth.getSession();
          router.replace(s2.session ? "/students" : "/auth/signin");
        }, 400);
      } catch {
        router.replace("/auth/signin");
      }
    };

    run();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white/80 flex items-center justify-center">
      {msg}
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-950 text-white/80 flex items-center justify-center">
          Signing you in…
        </div>
      }
    >
      <CallbackInner />
    </Suspense>
  );
}
