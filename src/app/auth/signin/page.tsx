// src/app/auth/signin/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [mode, setMode] = useState<"magic" | "password">("magic");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const siteUrl =
    (typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_SITE_URL
      : process.env.NEXT_PUBLIC_SITE_URL) || // prefer env when present
    (typeof window !== "undefined" ? window.location.origin : "");

  const redirectTo = `${siteUrl}/auth/callback`;

  const sendMagic = async () => {
    setMsg(null);
    if (!email) {
      setMsg("Please enter your email.");
      return;
    }
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo },
      });
      if (error) {
        setMsg(error.message);
      } else {
        setMsg("Magic link sent! Check your email.");
      }
    } catch (e: any) {
      setMsg(e?.message || "Something went wrong sending the magic link.");
    } finally {
      setLoading(false);
    }
  };

  const signWithPassword = async () => {
    setMsg(null);
    if (!email || !pwd) {
      setMsg("Please enter your email and password.");
      return;
    }
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pwd,
      });
      if (error) {
        setMsg(error.message);
      } else if (data.user) {
        router.push("/students");
      } else {
        setMsg("Unable to sign in. Please try again.");
      }
    } catch (e: any) {
      setMsg(e?.message || "Sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h1 className="text-2xl font-semibold mb-2">Sign in</h1>
        <p className="text-white/60 mb-6">Access the 808 Academy student portal.</p>

        <div className="mb-4 flex gap-2">
          <button
            className={`rounded-lg px-3 py-1.5 border ${
              mode === "magic"
                ? "border-cyan-400/40 text-cyan-300"
                : "border-white/10 text-white/70"
            }`}
            onClick={() => setMode("magic")}
            type="button"
          >
            Magic link
          </button>
          <button
            className={`rounded-lg px-3 py-1.5 border ${
              mode === "password"
                ? "border-cyan-400/40 text-cyan-300"
                : "border-white/10 text-white/70"
            }`}
            onClick={() => setMode("password")}
            type="button"
          >
            Email & password
          </button>
        </div>

        <label className="block text-sm text-white/70 mb-1">Email</label>
        <input
          className="mb-3 w-full rounded-lg bg-black/40 border border-white/10 p-2 outline-none"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          autoComplete="email"
        />

        {mode === "password" && (
          <>
            <label className="block text-sm text-white/70 mb-1">Password</label>
            <input
              className="mb-4 w-full rounded-lg bg-black/40 border border-white/10 p-2 outline-none"
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </>
        )}

        {mode === "magic" ? (
          <button
            onClick={sendMagic}
            disabled={loading}
            className={`w-full rounded-lg border border-cyan-400/40 px-3 py-2 text-cyan-300 hover:bg-cyan-400/10 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            type="button"
          >
            {loading ? "Sending…" : "Send magic link"}
          </button>
        ) : (
          <button
            onClick={signWithPassword}
            disabled={loading}
            className={`w-full rounded-lg border border-cyan-400/40 px-3 py-2 text-cyan-300 hover:bg-cyan-400/10 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            type="button"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        )}

        {msg && <p className="mt-3 text-sm text-white/70">{msg}</p>}

        {/* Dev helper: shows where magic link will return */}
        <p className="mt-4 text-xs text-white/40">
          Redirect target: <span className="text-white/60">{redirectTo}</span>
        </p>
      </div>
    </div>
  );
}
