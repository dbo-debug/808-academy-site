// src/app/auth/reset-password/page.tsx
"use client";

export const dynamic = "force-dynamic";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function parseHashTokens() {
  // Supports: #access_token=...&refresh_token=...&type=recovery
  if (typeof window === "undefined") return null;
  const hash = window.location.hash || "";
  if (!hash.startsWith("#")) return null;

  const params = new URLSearchParams(hash.slice(1));
  const access_token = params.get("access_token");
  const refresh_token = params.get("refresh_token");

  if (!access_token || !refresh_token) return null;
  return { access_token, refresh_token };
}

function ResetInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const code = useMemo(() => searchParams.get("code"), [searchParams]);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      setReady(false);
      setStatus("idle");
      setMessage("");

      try {
        // 1) If PKCE flow: ?code=...
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            if (!cancelled) {
              setStatus("error");
              setMessage(error.message);
              setReady(true);
            }
            return;
          }
        } else {
          // 2) If hash-token flow: #access_token=...&refresh_token=...
          const hashTokens = parseHashTokens();
          if (hashTokens) {
            const { error } = await supabase.auth.setSession(hashTokens);
            if (error) {
              if (!cancelled) {
                setStatus("error");
                setMessage(error.message);
                setReady(true);
              }
              return;
            }

            // Optional: clean up the hash so refresh/copy-paste doesn’t keep reprocessing
            try {
              window.history.replaceState(null, "", window.location.pathname + window.location.search);
            } catch {}
          }
        }

        // 3) Confirm we have a session
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          if (!cancelled) {
            setStatus("error");
            setMessage(error.message);
            setReady(true);
          }
          return;
        }

        if (!data.session) {
          if (!cancelled) {
            setStatus("error");
            setMessage("Session missing. Please request a new reset link and try again.");
            setReady(true);
          }
          return;
        }

        if (!cancelled) setReady(true);
      } catch (e: unknown) {
        if (!cancelled) {
          setStatus("error");
          setMessage(e instanceof Error ? e.message : "Unexpected error");
          setReady(true);
        }
      }
    };

    init();
    return () => {
      cancelled = true;
    };
  }, [code]);

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    setMessage("");

    // Match what your UI is telling users (and what Supabase often enforces)
    if (password.length < 8) {
      setStatus("error");
      setMessage("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }

    // Update password
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      // IMPORTANT: do NOT lock the form; let them retry immediately
      setStatus("error");
      setMessage(error.message);
      return;
    }

    // Claim enrollment/membership immediately to avoid “7 minute” lounge mismatch
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if (token) {
        await fetch("/api/students/claim-enrollments", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => {});
      }
    } catch {}

    setStatus("success");
    setMessage("Password updated. Taking you to the Lounge…");
    setTimeout(() => router.push("/students"), 600);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/50">
            Account
          </p>
          <h1 className="mt-2 text-3xl font-semibold">Set a new password</h1>
          <p className="mt-2 text-sm text-white/70">
            Choose a new password for your account.
          </p>
        </div>

        <form
          onSubmit={updatePassword}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
        >
          <label className="block text-xs font-semibold text-white/70">New password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#00FFF7]"
            placeholder="••••••••"
            disabled={!ready || status === "saving"}
          />
          <p className="mt-2 text-[11px] text-white/50">
            Minimum 8 characters.
          </p>

          <label className="mt-4 block text-xs font-semibold text-white/70">Confirm password</label>
          <input
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#00FFF7]"
            placeholder="••••••••"
            disabled={!ready || status === "saving" || status === "success"}
          />

          <button
  type="submit"
  disabled={!ready || status === "saving"}
  className="mt-5 w-full rounded-xl bg-[#00FFF7] px-4 py-3 text-sm font-semibold text-black transition hover:scale-[1.01] disabled:opacity-60"
>
  {status === "saving" ? "Saving…" : "Update password"}
</button>

          <div className="mt-4 flex items-center justify-between text-xs text-white/60">
            <Link className="hover:text-white" href="/auth/forgot-password">
              Request a new reset link
            </Link>
            <Link className="hover:text-white" href="/auth/signin">
              Back to sign in
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-950 text-white/80 flex items-center justify-center">
          Loading…
        </div>
      }
    >
      <ResetInner />
    </Suspense>
  );
}
