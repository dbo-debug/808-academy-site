// src/app/apply/schedule/page.tsx
"use client";

import * as React from "react";

type Program = "Course" | "Tutoring" | "Membership";
type TutoringPackage = "block4" | "single";
type CohortMode = "demo" | "paid";

function Stepper({ current }: { current: 1 | 2 | 3 }) {
  const steps = [
    { id: 1, label: "Application" },
    { id: 2, label: "Onboarding Call" },
    { id: 3, label: "Payment" },
  ] as const;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        {steps.map((s, i) => {
          const active = s.id === current;
          const done = s.id < current;
          return (
            <div key={s.id} className="flex items-center gap-3">
              <div
                className={[
                  "flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold",
                  active
                    ? "bg-teal-400 text-black border-teal-400"
                    : done
                    ? "bg-white/15 text-white border-white/20"
                    : "bg-white/5 text-white/60 border-white/10",
                ].join(" ")}
              >
                {s.id}
              </div>
              <div
                className={[
                  "text-sm",
                  active ? "text-teal-300" : done ? "text-white" : "text-white/60",
                ].join(" ")}
              >
                {s.label}
              </div>
              {i < steps.length - 1 && (
                <div className="mx-2 h-px w-10 bg-white/10" aria-hidden />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-2 text-xs uppercase tracking-wide text-white/50">
        Step {current} of 3
      </div>
    </div>
  );
}

// Calendly
const CAL_ONBOARDING = "https://calendly.com/admin-the808academy/onboarding-call";
const CAL_INTRO = "https://calendly.com/admin-the808academy/30min";

// Tutoring: Calendly + Stripe price IDs
const TUTORING: Record<
  TutoringPackage,
  {
    label: string;
    priceLabel: string;
    priceId: string;
    calendly: string;
    description: string;
    fineprint: string;
  }
> = {
  single: {
    label: "Single Session",
    priceLabel: "$49",
    priceId: "price_1Sf1RRDgVrA91WNOa7F5WqUA",
    calendly: "https://calendly.com/admin-the808academy/tutoring-session",
    description:
      "Perfect for mix feedback, a stuck track, vocal tuning, or one focused breakthrough.",
    fineprint: "You’ll schedule your session first, then checkout to confirm.",
  },
  block4: {
    label: "4-Session Block",
    priceLabel: "$139 (best value)",
    priceId: "price_1Sf1UEDgVrA91WNOJyDiAXnI",
    calendly:
      "https://calendly.com/admin-the808academy/4-session-tutoring-block-first-session-booking",
    description:
      "Best for real momentum. We set goals, track progress, and build results over a month.",
    fineprint:
      "Schedule your first session now. Future sessions are scheduled with your tutor at the end of each call.",
  },
};

// Checkout helper:
// - membership/cohort use mode
// - tutoring uses priceId (generic one-time payment branch in /api/checkout)
async function startCheckout(params: {
  mode?: "demo" | "paid" | "membership" | "subscription";
  priceId?: string;
  quantity?: number;
  source: string;
}) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...(params.mode ? { mode: params.mode } : {}),
      ...(params.priceId
        ? { priceId: params.priceId, quantity: params.quantity ?? 1 }
        : {}),
      source: params.source,
    }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json?.url) {
    throw new Error(json?.details || json?.error || "Checkout failed.");
  }
  window.location.href = json.url;
}

function getParam(key: string) {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(key);
}

function normalizeProgram(raw: string | null): Program {
  if (raw === "Membership") return "Membership";
  if (raw === "Tutoring") return "Tutoring";
  return "Course";
}

function normalizeCohort(raw: string | null): CohortMode {
  // default is ALWAYS paid unless explicitly demo
  return raw === "demo" ? "demo" : "paid";
}

function Card({
  title,
  subtitle,
  body,
  selected,
  onClick,
}: {
  title: string;
  subtitle: string;
  body: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "text-left w-full rounded-2xl border p-5 transition",
        selected
          ? "border-teal-400/70 bg-teal-400/10"
          : "border-white/10 bg-white/5 hover:bg-white/10",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-semibold text-white">{title}</div>
          <div className="mt-1 text-sm text-white/70">{body}</div>
        </div>

        <div className="shrink-0 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/80">
          {subtitle}
        </div>
      </div>

      {selected && <div className="mt-3 text-xs text-teal-200">Selected</div>}
    </button>
  );
}

export default function SchedulePage() {
  const [program, setProgram] = React.useState<Program>("Course");
  const [course, setCourse] = React.useState("Music Production");
  const [classTime, setClassTime] = React.useState<string | null>(null);

  // Cohort mode is derived ONLY from URL, never selectable
  const [cohortMode, setCohortMode] = React.useState<CohortMode>("paid");

  // tutoring package selector (defaults to block4 per your preference)
  const [tutoringPackage, setTutoringPackage] =
    React.useState<TutoringPackage>("block4");

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const normalized = normalizeProgram(getParam("program"));
    setProgram(normalized);

    const c = getParam("course");
    if (c) setCourse(c);

    const ct = getParam("classTime");
    if (ct) setClassTime(ct);

    const tp = getParam("tutoringPackage");
    if (tp === "single" || tp === "block4") setTutoringPackage(tp);

    // cohort gate:
    // - cohort=demo => free demo cohort
    // - else => paid cohort
    setCohortMode(normalizeCohort(getParam("cohort")));
  }, []);

  const isCourse = program === "Course";
  const isTutoring = program === "Tutoring";
  const isMembership = program === "Membership";

  const tutoring = TUTORING[tutoringPackage];

  const headline = isMembership
    ? "Membership checkout"
    : isTutoring
    ? "Tutoring — schedule first, then checkout"
    : cohortMode === "demo"
    ? "Free demo cohort — onboarding call"
    : "Paid cohort — onboarding call";

  const subhead = isMembership
    ? "Membership goes straight to checkout."
    : isTutoring
    ? "Choose your tutoring option, schedule your session, then complete checkout to confirm."
    : "You already picked your class time. This 30-minute onboarding call confirms goals, answers questions, and gets you set up before payment.";

  return (
    <main className="min-h-screen px-6 py-16 text-white">
      <section className="mx-auto w-full max-w-5xl">
        <Stepper current={2} />

        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
          {/* LEFT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bebas tracking-wide mb-2">
              {headline}
            </h1>
            <p className="text-gray-300 mb-6">{subhead}</p>

            {/* Tutoring: two cards + calendly embed */}
            {isTutoring && (
              <>
                <div className="grid gap-4 sm:grid-cols-2 mb-6">
                  <Card
                    title={TUTORING.block4.label}
                    subtitle={TUTORING.block4.priceLabel}
                    body={TUTORING.block4.description}
                    selected={tutoringPackage === "block4"}
                    onClick={() => setTutoringPackage("block4")}
                  />
                  <Card
                    title={TUTORING.single.label}
                    subtitle={TUTORING.single.priceLabel}
                    body={TUTORING.single.description}
                    selected={tutoringPackage === "single"}
                    onClick={() => setTutoringPackage("single")}
                  />
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/70 mb-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/50">
                    Next step
                  </div>
                  <div className="mt-1">{tutoring.fineprint}</div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-white/10 bg-black">
                  <iframe
                    title="Tutoring Scheduler"
                    src={`${tutoring.calendly}?hide_gdpr_banner=1`}
                    className="w-full"
                    style={{ height: "760px" }}
                  />
                </div>
              </>
            )}

            {/* Course: embed onboarding calendly */}
            {isCourse && (
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-black">
                <iframe
                  title="Onboarding Call"
                  src={`${CAL_ONBOARDING}?hide_gdpr_banner=1`}
                  className="w-full"
                  style={{ height: "760px" }}
                />
              </div>
            )}

            {/* Membership: simple note */}
            {isMembership && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm text-white/70">
                  Click “Continue to Checkout” on the right to complete membership signup.
                </p>
              </div>
            )}

            {/* Always available CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={CAL_INTRO}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15 transition border border-white/10"
              >
                Schedule a quick intro call (15 min)
              </a>

              <a
                href="/apply"
                className="rounded-full bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 transition border border-white/10"
              >
                ← Back to application
              </a>
            </div>

            <p className="text-xs text-white/50 mt-4">
              Cohort classes run Mon & Wed at 12pm or 6pm (you choose one). Office
              hours are Fridays 10am–6pm.
            </p>
          </div>

          {/* RIGHT */}
          <aside className="rounded-2xl border border-white/10 bg-white/5 p-6 h-fit">
            <div className="text-sm text-gray-300 mb-2">Step 2 of 3</div>
            <div className="text-xl font-semibold mb-4">Continue</div>

            <div className="space-y-3 text-sm text-white/75">
              <div className="flex justify-between gap-3">
                <span className="text-white/50">Program</span>
                <span className="text-white">{program}</span>
              </div>

              {isCourse && (
                <>
                  <div className="flex justify-between gap-3">
                    <span className="text-white/50">Course</span>
                    <span className="text-white">{course}</span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-white/50">Class time</span>
                    <span className="text-white">
                      {classTime ? classTime : "Not selected"}
                    </span>
                  </div>

                  <div className="rounded-lg border border-white/10 bg-black/30 p-3 text-xs text-white/60">
                    <div className="flex justify-between gap-3">
                      <span className="text-white/50">Cohort</span>
                      <span className="text-white">
                        {cohortMode === "demo" ? "Free demo cohort" : "Paid cohort"}
                      </span>
                    </div>
                    <div className="mt-2">
                      Schedule onboarding first, then checkout.
                    </div>
                  </div>
                </>
              )}

              {isTutoring && (
                <div className="rounded-lg border border-white/10 bg-black/30 p-3 text-xs text-white/60">
                  <div className="flex justify-between gap-3">
                    <span className="text-white/50">Selected</span>
                    <span className="text-white">
                      {tutoringPackage === "block4"
                        ? "4-session block"
                        : "Single session"}
                    </span>
                  </div>
                  <div className="mt-2">{tutoring.fineprint}</div>
                </div>
              )}
            </div>

            <div className="mt-6">
              <button
                type="button"
                disabled={loading}
                className="w-full rounded-full bg-teal-400 px-5 py-3 font-semibold text-black hover:bg-teal-300 transition disabled:opacity-60"
                onClick={async () => {
                  setLoading(true);

                  const getErrorMessage = (error: unknown) => {
                    if (error instanceof Error) return error.message;
                    if (
                      error &&
                      typeof error === "object" &&
                      "message" in error &&
                      typeof (error as { message: unknown }).message === "string"
                    ) {
                      return (error as { message: string }).message;
                    }
                    return "Could not start checkout.";
                  };

                  try {
                    if (isMembership) {
                      await startCheckout({
                        mode: "membership",
                        source: "apply_membership_checkout",
                      });
                      return;
                    }

                    if (isTutoring) {
                      await startCheckout({
                        priceId: tutoring.priceId,
                        quantity: 1,
                        source:
                          tutoringPackage === "block4"
                            ? "apply_tutoring_4pack_after_calendly"
                            : "apply_tutoring_single_after_calendly",
                      });
                      return;
                    }

                    // Course cohort — derived from URL ONLY
                    await startCheckout({
                      mode: cohortMode === "demo" ? "demo" : "paid",
                      source:
                        cohortMode === "demo"
                          ? "apply_cohort_demo_after_onboarding"
                          : "apply_cohort_paid_after_onboarding",
                    });
                  } catch (e: unknown) {
                    alert(getErrorMessage(e));
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                {loading ? "Starting checkout…" : "Continue to Checkout"}
              </button>

              <p className="mt-3 text-xs text-white/50">
                Tip: schedule first, then checkout to confirm.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
