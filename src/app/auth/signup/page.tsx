// src/app/auth/signup/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signUp = async () => {
    setMsg(null);
    if (!email || !pwd) {
      setMsg("Please enter your email and a password.");
      return;
    }

    try {
      setLoading(true);

      // If you have email confirmations ON in Supabase, this creates the user
      // but they may need to confirm before being fully active.
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pwd,
      });

      if (error) {
        setMsg(error.message);
        return;
      }

      // If confirmations are OFF, user/session may exist immediately:
      if (data.session?.access_token) {
        router.push("/students");
        return;
      }

      // If confirmations are ON, they’ll need to verify email:
      setMsg(
        "Account created. Check your email to confirm, then sign in."
      );
    } catch (e: any) {
      setMsg(e?.message || "Sign up failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h1 className="text-2xl font-semibold mb-2">Create account</h1>
        <p className="text-white/60 mb-6">
          Make your login — access is granted only if you have an active membership or enrollment.
        </p>

        <label className="block text-sm text-white/70 mb-1">Email</label>
        <input
          className="mb-3 w-full rounded-lg bg-black/40 border border-white/10 p-2 outline-none"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          autoComplete="email"
        />

        <label className="block text-sm text-white/70 mb-1">Password</label>
        <input
          className="mb-4 w-full rounded-lg bg-black/40 border border-white/10 p-2 outline-none"
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="Create a password"
          autoComplete="new-password"
        />

        <button
          onClick={signUp}
          disabled={loading}
          className={`w-full rounded-lg border border-cyan-400/40 px-3 py-2 text-cyan-300 hover:bg-cyan-400/10 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          type="button"
        >
          {loading ? "Creating…" : "Create account"}
        </button>

        {msg && <p className="mt-3 text-sm text-white/70">{msg}</p>}

        <div className="mt-5 text-xs text-white/50">
          Already have an account?{" "}
          <Link className="text-white/80 underline underline-offset-2" href="/auth/signin">
            Sign in
          </Link>
        </div>

        <div className="mt-2 text-xs text-white/50">
          Need access?{" "}
          <Link className="text-white/80 underline underline-offset-2" href="/membership">
            Join membership
          </Link>{" "}
          or{" "}
          <Link className="text-white/80 underline underline-offset-2" href="/apply">
            join a cohort
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
