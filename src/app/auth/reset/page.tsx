// src/app/auth/reset/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const [pwd, setPwd] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // If the user arrived from the email link correctly,
    // Supabase will have a recovery session.
    supabase.auth.getSession().then(({ data }) => {
      setReady(!!data.session);
    });
  }, []);

  const updatePassword = async () => {
    setMsg(null);
    if (!pwd) {
      setMsg("Enter a new password.");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({ password: pwd });
      if (error) setMsg(error.message);
      else {
        setMsg("Password updated. Redirecting…");
        router.push("/students");
      }
    } catch (e: any) {
      setMsg(e?.message || "Could not update password.");
    } finally {
      setLoading(false);
    }
  };

  if (!ready) {
    return (
      <div className="min-h-screen bg-neutral-950 text-gray-100 flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h1 className="text-2xl font-semibold mb-2">Reset password</h1>
          <p className="text-white/60">
            This reset link isn’t active anymore. Please request a new one.
          </p>
          <div className="mt-5">
            <Link className="text-white/80 underline underline-offset-2" href="/auth/forgot">
              Request a new reset link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h1 className="text-2xl font-semibold mb-2">Set a new password</h1>
        <p className="text-white/60 mb-6">Choose something secure and memorable.</p>

        <label className="block text-sm text-white/70 mb-1">New password</label>
        <input
          className="mb-4 w-full rounded-lg bg-black/40 border border-white/10 p-2 outline-none"
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="New password"
          autoComplete="new-password"
        />

        <button
          onClick={updatePassword}
          disabled={loading}
          className={`w-full rounded-lg border border-cyan-400/40 px-3 py-2 text-cyan-300 hover:bg-cyan-400/10 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          type="button"
        >
          {loading ? "Updating…" : "Update password"}
        </button>

        {msg && <p className="mt-3 text-sm text-white/70">{msg}</p>}
      </div>
    </div>
  );
}
