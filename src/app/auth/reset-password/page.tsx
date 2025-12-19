// src/app/auth/reset-password/page.tsx
"use client";

export const dynamic = "force-dynamic";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function ResetInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const init = async () => {
      // Some Supabase flows land with ?code=... (PKCE). Exchange it first.
      const code = searchParams.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          setReady(true);
          setStatus("error");
          setMessage(error.message);
          return;
        }
      }

      // After exchange (or hash flow), we should have a session
      const { data } = await supabase.auth.getSession();
      setReady(true);

      if (!data.session) {
        setStatus("error");
        setMessage(
          "Auth session missing. Please request a new reset link and try again."
        );
      }
    };

    init();
  }, [searchParams]);

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    setMessage("");

    if (password.length < 6) {
      setStatus("error");
      setMessage("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("success");
    setMessage("Password updated. Redirecting…");
    setTimeout(() => router.push("/students"), 900);
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
          <label className="block text-xs font-semibold text-white/70">
            New password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#00FFF7]"
            placeholder="••••••••"
            disabled={!ready || status === "saving"}
          />

          <label className="mt-4 block text-xs font-semibold text-white/70">
            Confirm password
          </label>
          <input
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#00FFF7]"
            placeholder="••••••••"
            disabled={!ready || status === "saving"}
          />

          <button
            type="submit"
            disabled={!ready || status === "saving" || status === "error"}
            className="mt-5 w-full rounded-xl bg-[#00FFF7] px-4 py-3 text-sm font-semibold text-black transition hover:scale-[1.01] disabled:opacity-60"
          >
            {status === "saving" ? "Saving…" : "Update password"}
          </button>

          {message && (
            <p
              className={`mt-3 text-xs ${
                status === "error" ? "text-red-300" : "text-white/70"
              }`}
            >
              {message}
            </p>
          )}

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
