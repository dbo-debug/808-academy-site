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
  const router = useRouter();

  // ---- MAGIC LINK SIGN-IN ----
  const sendMagic = async () => {
    setMsg(null);

    // Use current site origin or fallback for SSR
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_SITE_URL!;

    // 👇 Redirect users directly to Student Lounge after magic link login
    const redirectTo = `${origin}/students/lounge`;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });

    if (error) return setMsg(error.message);
    setMsg("✅ Magic link sent! Check your email.");
  };

  // ---- EMAIL + PASSWORD SIGN-IN ----
  const signWithPassword = async () => {
    setMsg(null);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pwd,
    });
    if (error) return setMsg(error.message);
    if (data.user) router.push("/students/lounge"); // also redirect to lounge here
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h1 className="text-2xl font-semibold mb-2">Sign in</h1>
        <p className="text-white/60 mb-6">Access the 808 Academy student portal.</p>

        {/* Toggle mode */}
        <div className="mb-4 flex gap-2">
          <button
            className={`rounded-lg px-3 py-1.5 border ${
              mode === "magic"
                ? "border-cyan-400/40 text-cyan-300"
                : "border-white/10 text-white/70"
            }`}
            onClick={() => setMode("magic")}
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
          >
            Email & password
          </button>
        </div>

        {/* Email input */}
        <label className="block text-sm text-white/70 mb-1">Email</label>
        <input
          className="mb-3 w-full rounded-lg bg-black/40 border border-white/10 p-2 outline-none"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
        />

        {/* Password input (only in password mode) */}
        {mode === "password" && (
          <>
            <label className="block text-sm text-white/70 mb-1">Password</label>
            <input
              className="mb-4 w-full rounded-lg bg-black/40 border border-white/10 p-2 outline-none"
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="••••••••"
            />
          </>
        )}

        {/* Buttons */}
        {mode === "magic" ? (
          <button
            onClick={sendMagic}
            className="w-full rounded-lg border border-cyan-400/40 px-3 py-2 text-cyan-300 hover:bg-cyan-400/10"
          >
            Send magic link
          </button>
        ) : (
          <button
            onClick={signWithPassword}
            className="w-full rounded-lg border border-cyan-400/40 px-3 py-2 text-cyan-300 hover:bg-cyan-400/10"
          >
            Sign in
          </button>
        )}

        {/* Status message */}
        {msg && <p className="mt-3 text-sm text-white/70">{msg}</p>}
      </div>
    </div>
  );
}
