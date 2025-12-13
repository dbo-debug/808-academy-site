"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    // When user lands here from the email link, Supabase sets a recovery session.
    // This confirms they can update password.
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setReady(true);

      // Not strictly required, but helpful:
      // If they opened the page without a recovery link/session, show a hint.
      if (!data.session) {
        setMessage(
          "If you just clicked the reset link, give it a second. If this persists, request a new reset email."
        );
      }
    };

    init();
  }, []);

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

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setStatus("error");
        setMessage(error.message);
        return;
      }

      setStatus("success");
      setMessage("Password updated. You can sign in now.");

      // Optional: redirect after a beat
      setTimeout(() => router.push("/auth/signin"), 900);
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.message ?? "Something went wrong.");
    }
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
          />

          <button
            type="submit"
            disabled={!ready || status === "saving"}
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
