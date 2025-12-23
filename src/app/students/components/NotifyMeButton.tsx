// src/app/students/components/NotifyMeButton.tsx
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NotifyMeButton({ kind, item }: { kind: string; item: string }) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [msg, setMsg] = useState<string | null>(null);

  const submit = async () => {
    setMsg(null);
    setStatus("saving");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setStatus("error");
        setMsg("Please sign in first.");
        return;
      }
      const res = await fetch("/students/api/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ kind, item }),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMsg(json?.error || "Could not save");
        return;
      }
      setStatus("saved");
      setMsg("You’re on the list. We’ll email you when it’s live.");
    } catch (e: unknown) {
      setStatus("error");
      setMsg(e instanceof Error ? e.message : "Could not save");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={submit}
        disabled={status === "saving" || status === "saved"}
        className={`rounded-lg border px-3 py-1.5 ${
          status === "saved"
            ? "border-green-400/40 bg-green-400/10 text-green-300"
            : "border-cyan-400/40 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20"
        } disabled:opacity-60`}
      >
        {status === "saving" ? "Saving…" : status === "saved" ? "Saved ✓" : "Notify me"}
      </button>
      {msg && <span className={`text-sm ${status === "error" ? "text-amber-300" : "text-white/70"}`}>{msg}</span>}
    </div>
  );
}
