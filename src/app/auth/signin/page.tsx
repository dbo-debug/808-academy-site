// src/app/auth/signin/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setMsg(null);

    if (!email || !pwd) {
      setMsg("Please enter your email and password.");
      return;
    }

    const getErrorMessage = (error: unknown) => {
      if (error instanceof Error) return error.message;
      if (typeof error === "string") return error;
      if (
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof (error as { message: unknown }).message === "string"
      ) {
        return (error as { message: string }).message;
      }
      return "Sign-in failed.";
    };

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pwd,
      });

      if (error) {
        setMsg(error.message);
        return;
      }

      if (data.user) {
        router.push("/students");
        return;
      }

      setMsg("Unable to sign in. Please try again.");
    } catch (e: unknown) {
      setMsg(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h1 className="text-2xl font-semibold mb-2">Sign in</h1>
        <p className="text-white/60 mb-6">
          Access the 808 Academy student portal.
        </p>

        <label className="block text-sm text-white/70 mb-1">Email</label>
        <input
          className="mb-3 w-full rounded-lg bg-black/40 border border-white/10 p-2 outline-none focus:border-cyan-400/40"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          autoComplete="email"
        />

        <label className="block text-sm text-white/70 mb-1">Password</label>
        <input
          className="mb-2 w-full rounded-lg bg-black/40 border border-white/10 p-2 outline-none focus:border-cyan-400/40"
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
          onKeyDown={(e) => {
            if (e.key === "Enter") signIn();
          }}
        />

        <div className="mb-5 flex items-center justify-between">
          <Link
            href="/auth/forgot-password"
            className="text-xs text-white/60 hover:text-white/90"
          >
            Forgot password?
          </Link>

          {/* Optional: if you have a signup page */}
          <Link
            href="/auth/signup"
            className="text-xs text-cyan-300 hover:text-cyan-200"
          >
            Create account
          </Link>
        </div>

        <button
          onClick={signIn}
          disabled={loading}
          className={`w-full rounded-lg border border-cyan-400/40 px-3 py-2 text-cyan-300 hover:bg-cyan-400/10 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          type="button"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        {msg && <p className="mt-3 text-sm text-white/70">{msg}</p>}
      </div>
    </div>
  );
}
