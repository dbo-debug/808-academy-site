"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [ready, setReady] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        // IMPORTANT:
        // Recovery/invite links may arrive as:
        // - ?code=... (PKCE)  -> should be handled by /auth/callback, but we support it anyway
        // - #access_token=... (hash)
        //
        // We do NOT "guess" — we deterministically attempt:
        // 1) exchange code if present
        // 2) otherwise poll session briefly (hash ingestion can lag)
        const code = searchParams.get("code");
        if (code) {
          await supabase.auth.exchangeCodeForSession(code);
        }

        // Poll for session (handles hash flow + slow storage)
        for (let i = 0; i < 6; i++) {
          const { data } = await supabase.auth.getSession();
          if (data.session) {
            if (!cancelled) {
              setHasSession(true);
              setReady(true);
              setMessage("");
            }
            return;
          }
          await new Promise((r) => setTimeout(r, 250));
        }

        if (!cancelled) {
          setHasSession(false);
          setReady(true);
          setMessage("This reset link is invalid or expired. Please request a new one.");
        }
      } catch {
        if (!cancelled) {
          setHasSession(false);
          setReady(true);
          setMessage("This reset link is invalid or expired. Please request a new one.");
        }
      }
    };

    init();

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    setMessage("");

    if (!hasSession) {
      setStatus("error");
      setMessage("No active reset session. Please request a new reset link.");
      return;
    }

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

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setStatus("error");
        setMessage(error.message);
        return;
      }

      setStatus("success");
      setMessage("Password updated. Redirecting you to the Student Lounge…");
      setTimeout(() => router.push("/students"), 700);
    } catch (err: unknown) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  // Loading state
  if (!ready) {
    return (
      <main className="min-h-screen bg-black text-white">
        <div className="mx-auto flex max-w-md flex-col gap-4 px-4 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/50">
            Account
          </p>
          <h1 className="mt-2 text-3xl font-semibold">Set a new password</h1>
          <p className="mt-2 text-sm text-white/70">Loading your reset session…</p>
        </div>
      </main>
    );
  }

  // No session state
  if (!hasSession) {
    return (
      <main className="min-h-screen bg-black text-white">
        <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/50">
              Account
            </p>
            <h1 className="mt-2 text-3xl font-semibold">Reset link expired</h1>
            <p className="mt-2 text-sm text-white/70">
              {message || "This reset link is invalid or expired. Please request a new one."}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <Link
              className="block w-full rounded-xl bg-[#00FFF7] px-4 py-3 text-center text-sm font-semibold text-black transition hover:scale-[1.01]"
              href="/auth/forgot-password"
            >
              Request a new reset link
            </Link>

            <div className="mt-4 text-center text-xs text-white/60">
              <Link className="hover:text-white" href="/auth/signin">
                Back to sign in
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Has session state: show form
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
            autoComplete="new-password"
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
            autoComplete="new-password"
          />

          <button
            type="submit"
            disabled={status === "saving"}
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
