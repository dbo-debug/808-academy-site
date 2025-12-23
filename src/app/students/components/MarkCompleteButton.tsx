// src/app/students/components/MarkCompleteButton.tsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MarkCompleteButton({ lessonId, course }: { lessonId: string; course: string }) {
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  type ProgressRow = { lesson_id: string; completed: boolean };

  // On mount: check current completion
  useEffect(() => {
    (async () => {
      setErr(null);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const res = await fetch(`/students/api/progress?course_slug=${course}`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      const json = await res.json();
      if (!res.ok) {
        setErr(json?.error || "Failed to load progress");
        return;
      }
      const progress = Array.isArray(json?.progress) ? (json.progress as ProgressRow[]) : [];
      const completed = progress.some((p) => p.lesson_id === lessonId && p.completed);
      setDone(completed);
    })();
  }, [course, lessonId]);

  const handleClick = async () => {
    setSaving(true);
    setErr(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setErr("Not signed in");
        return;
      }
      const res = await fetch("/students/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ course_slug: course, lesson_id: lessonId, completed: true }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErr(json?.error || "Could not save progress");
        return;
      }
      setDone(true);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Could not save progress");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleClick}
        disabled={saving || done}
        className={`rounded-lg px-3 py-1.5 border ${
          done
            ? "border-green-400/40 text-green-300 bg-green-400/10"
            : "border-white/10 text-white/80 hover:bg-white/[0.06]"
        } disabled:opacity-60`}
      >
        {done ? "Completed ✓" : saving ? "Saving…" : "Mark Complete"}
      </button>
      {err && <span className="text-sm text-amber-300">{err}</span>}
    </div>
  );
}
