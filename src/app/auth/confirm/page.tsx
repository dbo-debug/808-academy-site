"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [msg, setMsg] = useState("Confirming your access…");

  useEffect(() => {
    const run = async () => {
      const token_hash = searchParams.get("token_hash");
      const type = searchParams.get("type"); // should be "invite"
      const next = searchParams.get("next") || "/students";

      if (!token_hash || !type) {
        setMsg("Missing confirmation token. Please use the link from your email.");
        setTimeout(() => router.replace("/auth/signin?error=missing_token"), 900);
        return;
      }

      const { error } = await supabase.auth.verifyOtp({
        type: type as any,
        token_hash,
      });

      if (error) {
        setMsg("That link is invalid or expired. Please request a new one.");
        setTimeout(() => router.replace("/auth/signin?error=invalid_or_expired"), 1200);
        return;
      }

      setMsg("Confirmed. Redirecting…");
      router.replace(next);
    };

    run();
  }, [router, searchParams]);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex max-w-md flex-col gap-4 px-4 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/50">
          808 Academy
        </p>
        <h1 className="text-2xl font-semibold">Activating your account</h1>
        <p className="text-sm text-white/70">{msg}</p>
      </div>
    </main>
  );
}
