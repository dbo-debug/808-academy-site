// src/app/students/components/Quiz.tsx
"use client";

import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import { supabase } from "@/lib/supabase";

type Props = {
  quizId: string; // Supabase quizzes.id (uuid string)
  courseSlug?: string; // default: "music-production"
  lessonId?: string; // canonical lesson id (e.g. "mp-ch1-daw-signal-flow")
};

type QuizQuestion = {
  id: string;
  order_index: number;
  type: "mcq";
  prompt: string;
  choices: string[]; // ["A) ...","B) ...","C) ...","D) ..."]
  difficulty?: string;
  tags?: string[];
};

type LatestAttempt = { score: number; max_score: number; passed?: boolean } | null;
type SelectedMap = Record<string, "A" | "B" | "C" | "D">;

const LETTERS = ["A", "B", "C", "D"] as const;

export default function Quiz({
  quizId,
  courseSlug = "music-production",
  lessonId = "",
}: Props) {
  const { mutate } = useSWRConfig();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [selected, setSelected] = useState<SelectedMap>({});
  const [loading, setLoading] = useState(true);

  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<null | { score: number; max: number; passed?: boolean }>(null);

  const [latest, setLatest] = useState<LatestAttempt>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setErr(null);
      setLoading(true);
      setSubmitted(false);
      setResult(null);
      setSelected({});

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setErr("Not signed in");
          setLoading(false);
          return;
        }

        // Latest attempt (optional)
        const latestRes = await fetch(
          `/students/api/quiz?course_slug=${courseSlug}&lesson_id=${lessonId}&quiz_id=${quizId}`,
          { headers: { Authorization: `Bearer ${session.access_token}` } }
        );
        const latestJson = await latestRes.json();
        if (latestRes.ok && latestJson?.latest) {
          setLatest({
            score: latestJson.latest.score,
            max_score: latestJson.latest.max_score,
            passed: latestJson.latest.passed,
          });
        } else {
          setLatest(null);
        }

        // Questions
        const qRes = await fetch(`/students/api/quiz?quiz_id=${quizId}`, {
          headers: { Authorization: `Bearer ${session.access_token}` },
        });
        const qJson = await qRes.json();
        if (!qRes.ok) throw new Error(qJson?.error || "Could not load quiz questions");

        const sorted = (qJson.questions || []).sort(
          (a: QuizQuestion, b: QuizQuestion) => a.order_index - b.order_index
        );
        setQuestions(sorted);
      } catch (e: unknown) {
        setErr(e instanceof Error ? e.message : "Could not load quiz");
      } finally {
        setLoading(false);
      }
    })();
  }, [courseSlug, lessonId, quizId]);

  const totalAnswered = Object.keys(selected).length;
  const allAnswered = questions.length > 0 && totalAnswered === questions.length;

  const submit = async () => {
    setErr(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return setErr("Not signed in");

      if (!allAnswered) return setErr("Answer all questions before submitting.");

      const answers = questions.map((q) => {
        const pick = selected[q.id];
        if (!pick) throw new Error("Missing answer selection.");
        return { question_id: q.id, selected_answer: pick };
      });

      const res = await fetch("/students/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          course_slug: courseSlug,
          lesson_id: lessonId,
          quiz_id: quizId,
          answers,
        }),
      });

      const json = await res.json();
      if (!res.ok) return setErr(json?.error || "Could not save quiz");

      setSubmitted(true);

      const max = json.max ?? questions.length;
      setResult({ score: json.score ?? 0, max, passed: json.passed });
      setLatest({ score: json.score ?? 0, max_score: max, passed: json.passed });
      void mutate("/students/api/lounge");
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Could not save quiz");
      setSubmitted(false);
    }
  };

  if (loading) {
    return <div className="text-white/60">Loading quiz…</div>;
  }

  if (err && !questions.length) {
    return <div className="text-amber-300 text-sm">{err}</div>;
  }

  if (!questions.length) {
    return <div className="text-white/60">Quiz coming soon.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold">Knowledge Check</h3>
        {latest ? (
          <div className="text-sm text-white/70">
            Last score:{" "}
            <span className="text-cyan-300">
              {latest.score}/{latest.max_score}
            </span>
            {typeof latest.passed === "boolean" ? (
              <span className="ml-2 text-xs text-white/50">
                ({latest.passed ? "passed" : "not passed"})
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

      <ol className="space-y-5">
        {questions.map((q, idx) => (
          <li key={q.id} className="rounded-xl border border-white/10 p-4 bg-white/[0.02]">
            <div className="mb-3 font-medium">
              {idx + 1}. {q.prompt}
            </div>

            <div className="grid gap-2">
              {LETTERS.map((letter) => {
                const choiceText =
                  q.choices?.find((c) => c.trim().startsWith(`${letter})`)) ?? `${letter})`;
                const isSelected = selected[q.id] === letter;

                return (
                  <button
                    key={letter}
                    onClick={() => !submitted && setSelected((prev) => ({ ...prev, [q.id]: letter }))}
                    className={`text-left rounded-lg border px-3 py-2
                      ${isSelected ? "border-cyan-400/40 bg-cyan-400/10" : "border-white/10 bg-transparent"}
                      ${submitted ? "cursor-default" : "hover:bg-white/[0.04]"}`}
                    disabled={submitted}
                  >
                    {choiceText}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap items-center gap-4">
        {!submitted ? (
          <button
            onClick={submit}
            disabled={!allAnswered}
            className={`rounded-lg border px-4 py-2
              ${allAnswered ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20" : "border-white/10 bg-white/[0.02] text-white/40 cursor-not-allowed"}`}
          >
            Submit
          </button>
        ) : (
          <div className="text-white/80">
            Score:{" "}
            <span className="text-cyan-300">
              {result?.score ?? 0}/{result?.max ?? questions.length}
            </span>
            {typeof result?.passed === "boolean" ? (
              <span className="ml-2 text-sm text-white/70">
                {result.passed ? "✅ Passed" : "🔁 Not passed yet"}
              </span>
            ) : null}
          </div>
        )}

        <div className="text-sm text-white/60">
          Answered {totalAnswered}/{questions.length}
        </div>

        {err && <div className="text-amber-300 text-sm">{err}</div>}
      </div>

      {submitted && (
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setResult(null);
            setSelected({});
            setErr(null);
          }}
          className="text-xs text-white/60 hover:text-white/80 underline underline-offset-4"
        >
          Retake
        </button>
      )}
    </div>
  );
}
