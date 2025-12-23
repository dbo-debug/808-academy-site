// src/app/students/components/ProgressTracker.tsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { lessons } from "../music-production/data/lessons";

export default function ProgressTracker({ course }: { course: string }) {
  const [doneCount, setDoneCount] = useState(0);
  const [err, setErr] = useState<string | null>(null);
  type ProgressRow = { lesson_id: string; completed: boolean };

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
      const completedSet = new Set<string>(progress.filter((p) => p.completed).map((p) => p.lesson_id));
      setDoneCount(completedSet.size);
    })();
  }, [course]);

  const total = lessons.length;
  const pct = Math.round((doneCount / Math.max(1, total)) * 100);

  return (
    <div className="w-full">
      <div className="text-sm text-white/60 mb-1">Progress — {doneCount}/{total}</div>
      <div className="h-2 w-full rounded bg-white/10 overflow-hidden">
        <div className="h-full bg-cyan-400" style={{ width: `${pct}%` }} />
      </div>
      {err && <div className="mt-1 text-xs text-amber-300">{err}</div>}
    </div>
  );
}
