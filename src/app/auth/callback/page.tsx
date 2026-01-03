// src/app/auth/callback/page.tsx
"use client";

export const dynamic = "force-dynamic";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { EmailOtpType } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

/**
 * Supports legacy implicit flow links:
 *   /auth/callback#access_token=...&refresh_token=...&type=recovery
 */
function parseHashTokens() {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash || "";
  if (!hash.startsWith("#")) return null;

  const params = new URLSearchParams(hash.slice(1));
  const access_token = params.get("access_token");
  const refresh_token = params.get("refresh_token");

  if (!access_token || !refresh_token) return null;
  return { access_token, refresh_token };
}

/**
 * Safe redirect helper:
 * Only allow internal paths (starting with "/") to prevent open redirects.
 */
function safeNext(next: string | null | undefined) {
  if (!next) return null;
  if (next.startsWith("/")) return next;
  return null;
}

function CallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [msg, setMsg] = useState("Signing you in…");

  const code = useMemo(() => searchParams.get("code"), [searchParams]);
  const token_hash = useMemo(() => searchParams.get("token_hash"), [searchParams]);
  const rawType = useMemo(() => searchParams.get("type"), [searchParams]);
  const next = useMemo(() => safeNext(searchParams.get("next")), [searchParams]);

  useEffect(() => {
    let cancelled = false;

    const go = (path: string) => {
      if (!cancelled) router.replace(path);
    };

    const run = async () => {
      try {
        // -----------------------------
        // 0) If already have session, route immediately
        // -----------------------------
        const { data: existing } = await supabase.auth.getSession();
        if (existing.session) {
          go(next || "/students");
          return;
        }

        // -----------------------------
        // 1) PKCE flow: ?code=...
        // -----------------------------
        if (code) {
          setMsg("Exchanging code…");
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;

          go(next || "/students");
          return;
        }

        // -----------------------------
        // 2) OTP token_hash flow: ?token_hash=...&type=...
        //    (Supabase email templates commonly use this now)
        // -----------------------------
        if (token_hash && rawType) {
          setMsg("Verifying link…");

          const allowedTypes: EmailOtpType[] = [
            "signup",
            "invite",
            "magiclink",
            "recovery",
            "email_change",
          ];
          const type = allowedTypes.find((t) => t === rawType) ?? null;

          if (!type) {
            throw new Error("Invalid auth link type.");
          }

          const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
          });

          if (error) throw error;

          // After verifyOtp, a session should exist (or be created)
          const { data: afterOtp } = await supabase.auth.getSession();
          if (!afterOtp.session) {
            throw new Error("Session missing after verification. Please request a new link.");
          }

          // Smart defaults if next isn't provided
          const fallback =
            rawType === "recovery" ? "/auth/reset-password" : "/students";

          go(next || fallback);
          return;
        }

        // -----------------------------
        // 3) Legacy implicit flow: #access_token=...&refresh_token=...
        // -----------------------------
        const hashTokens = parseHashTokens();
        if (hashTokens) {
          setMsg("Setting session…");
          const { error } = await supabase.auth.setSession(hashTokens);
          if (error) throw error;

          // Clean hash so refresh doesn't re-run
          try {
            window.history.replaceState(
              null,
              "",
              window.location.pathname + window.location.search
            );
          } catch {}

          go(next || "/students");
          return;
        }

        // -----------------------------
        // 4) Last chance: wait briefly in case supabase-js is processing
        // -----------------------------
        setMsg("Finishing sign-in…");
        await new Promise((r) => setTimeout(r, 450));

        const { data: s2 } = await supabase.auth.getSession();
        if (s2.session) {
          go(next || "/students");
          return;
        }

        // Nothing worked
        go("/auth/signin?error=invalid_or_expired");
      } catch (err: any) {
        // Don't throw people to home; route with a clear error
        const message =
          typeof err?.message === "string" ? err.message : "invalid_or_expired";
        go(`/auth/signin?error=${encodeURIComponent(message)}`);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [router, code, token_hash, rawType, next]);

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
