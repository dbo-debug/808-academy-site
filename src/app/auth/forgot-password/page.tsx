"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const sendReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      // Use the current origin so Preview builds send Preview links,
      // and Production sends Production links.
      const origin =
        typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

      const redirectTo = `${origin.replace(/\/$/, "")}/auth/reset-password`;

      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo,
      });

      if (error) {
        setStatus("error");
        setMessage(error.message);
        return;
      }

      setStatus("sent");
      setMessage("If that email exists in our system, you’ll receive a reset link shortly.");
    } catch (err: unknown) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong sending the reset email.");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/50">
            Account
          </p>
          <h1 className="mt-2 text-3xl font-semibold">Reset your password</h1>
          <p className="mt-2 text-sm text-white/70">
            Enter the email you used to sign up. We’ll send a reset link.
          </p>
        </div>

        <form
          onSubmit={sendReset}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
        >
          <label className="block text-xs font-semibold text-white/70">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#00FFF7]"
            placeholder="you@example.com"
            autoComplete="email"
          />

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-4 w-full rounded-xl bg-[#00FFF7] px-4 py-3 text-sm font-semibold text-black transition hover:scale-[1.01] disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send reset link"}
          </button>

          {/* Privacy-safe message (don’t confirm if an email exists) */}
          {status === "sent" && (
            <p className="mt-3 text-xs text-white/70">
              {message}
            </p>
          )}

          {status === "error" && message && (
            <p className="mt-3 text-xs text-red-300">{message}</p>
          )}
        </form>

        <div className="text-sm text-white/70">
          <Link className="underline-offset-4 hover:underline" href="/auth/signin">
            Back to sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
