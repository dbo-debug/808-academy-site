// src/app/students/submissions/page.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { format, isToday, isThisWeek, isThisMonth } from "date-fns";

import { supabase } from "@/lib/supabase";
import AuthGuard from "../components/AuthGuard";

type Submission = {
  id: string;
  user_id: string;
  user_email: string | null;
  user_name: string | null;
  kind: "homework" | "sync" | "remix";
  course_slug: string | null;
  lesson_slug: string | null;
  title: string | null;
  url: string | null;
  notes: string | null;
  created_at: string;
};

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  // Admin filters
  const [filterKind, setFilterKind] =
    useState<"all" | "homework" | "sync" | "remix">("all");
  const [filterDate, setFilterDate] =
    useState<"all" | "today" | "week" | "month">("all");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: sessionErr } = await supabase.auth.getSession();
        if (sessionErr || !data.session?.access_token) {
          setError("You must be signed in.");
          return;
        }

        // identify viewer (student vs admin)
        const { data: userData } = await supabase.auth.getUser();
        const viewerEmail = userData?.user?.email ?? null;
        if (!cancelled) setCurrentUserEmail(viewerEmail);

        const res = await fetch("/students/api/submissions", {
          headers: {
            Authorization: `Bearer ${data.session.access_token}`,
          },
        });

        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j?.error || "Failed to load submissions.");
        }

        const json = (await res.json()) as { submissions: Submission[] };
        if (!cancelled) setSubmissions(json.submissions ?? []);
      } catch (err: any) {
        console.error("[submissions page] load error", err);
        if (!cancelled) setError(err?.message ?? "Something went wrong.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const isAdmin =
    currentUserEmail === "admin@the808academy.com" ||
    currentUserEmail === "db101tr@gmail.com";

  // -----------------------------
  // 🔍 FILTERING LOGIC
  // -----------------------------
  const filtered = useMemo(() => {
    return submissions.filter((s) => {
      let pass = true;

      // kind filter
      if (filterKind !== "all" && s.kind !== filterKind) {
        pass = false;
      }

      const d = new Date(s.created_at);

      // date filter
      if (filterDate === "today" && !isToday(d)) pass = false;
      if (filterDate === "week" && !isThisWeek(d)) pass = false;
      if (filterDate === "month" && !isThisMonth(d)) pass = false;

      return pass;
    });
  }, [submissions, filterKind, filterDate]);

  return (
    <AuthGuard>
      <div className="relative min-h-screen bg-black text-white">
        <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-6">
          <div>
            <Link
              href="/students"
              className="text-xs text-white/60 hover:text-white/90"
            >
              ← Back to Lounge
            </Link>
          </div>

          <header className="space-y-2">
            <h1 className="text-2xl font-semibold">
              {isAdmin ? "Student Submissions" : "Your Submissions"}
            </h1>

            <p className="text-sm text-white/60">
              {isAdmin
                ? "All homework, sync, and remix submissions from enrolled students."
                : "Homework, sync, and remix submissions you’ve sent in."}
            </p>
          </header>

          {/* -------------------------------- */}
          {/* ADMIN FILTER BAR */}
          {/* -------------------------------- */}
          {isAdmin && (
            <div className="flex flex-wrap gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              {/* Type Filter */}
              <div>
                <label className="text-xs uppercase text-white/60">
                  Filter by Type
                </label>
                <select
                  className="mt-1 rounded-md bg-black/40 px-3 py-1 text-sm"
                  value={filterKind}
                  onChange={(e) =>
                    setFilterKind(e.target.value as any)
                  }
                >
                  <option value="all">All</option>
                  <option value="homework">Homework</option>
                  <option value="sync">Sync</option>
                  <option value="remix">Remix</option>
                </select>
              </div>

              {/* Date Filter */}
              <div>
                <label className="text-xs uppercase text-white/60">
                  Filter by Date
                </label>
                <select
                  className="mt-1 rounded-md bg-black/40 px-3 py-1 text-sm"
                  value={filterDate}
                  onChange={(e) =>
                    setFilterDate(e.target.value as any)
                  }
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>
          )}

          {/* -------------------------------- */}
          {/* SUBMISSIONS TABLE */}
          {/* -------------------------------- */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            {loading && (
              <p className="text-sm text-white/60">Loading submissions…</p>
            )}

            {error && <p className="text-sm text-red-400">{error}</p>}

            {!loading && !error && filtered.length === 0 && (
              <p className="text-sm text-white/60">No submissions found.</p>
            )}

            {!loading && !error && filtered.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="border-b border-white/10 text-xs uppercase tracking-[0.12em] text-white/50">
                    <tr>
                      <th className="py-2 pr-4">Date</th>
                      {isAdmin && <th className="py-2 pr-4">Student</th>}
                      <th className="py-2 pr-4">Type</th>
                      <th className="py-2 pr-4">Title</th>
                      <th className="py-2 pr-4">Lesson</th>
                      <th className="py-2 pr-4">Link</th>
                      <th className="py-2 pr-4">Notes</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filtered.map((s) => (
                      <tr
                        key={s.id}
                        className="border-b border-white/5 hover:bg-white/5"
                      >
                        <td className="py-2 pr-4 align-top text-xs text-white/70 whitespace-nowrap">
                          {format(new Date(s.created_at), "MMM d, yyyy HH:mm")}
                        </td>

                        {isAdmin && (
                          <td className="py-2 pr-4 align-top text-xs text-white/80 whitespace-nowrap">
                            <div className="flex flex-col">
                              <span>{s.user_name ?? "Student"}</span>
                              {s.user_email && (
                                <span className="text-[11px] text-white/50">
                                  {s.user_email}
                                </span>
                              )}
                            </div>
                          </td>
                        )}

                        <td className="py-2 pr-4 align-top text-xs capitalize text-white/80 whitespace-nowrap">
                          {s.kind}
                        </td>

                        <td className="py-2 pr-4 align-top text-xs text-white/80">
                          {s.title || "—"}
                        </td>

                        <td className="py-2 pr-4 align-top text-xs text-white/60 whitespace-nowrap">
                          {s.lesson_slug || "—"}
                        </td>

                        <td className="py-2 pr-4 align-top text-xs text-cyan-300 whitespace-nowrap">
                          {s.url ? (
                            <a
                              href={s.url}
                              target="_blank"
                              rel="noreferrer"
                              className="underline decoration-dotted underline-offset-2"
                            >
                              Open
                            </a>
                          ) : (
                            "—"
                          )}
                        </td>

                        <td className="py-2 pr-4 align-top text-xs text-white/70 max-w-xs">
                          <div className="line-clamp-3 whitespace-pre-wrap">
                            {s.notes || "—"}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>
      </div>
    </AuthGuard>
  );
}
