// src/app/apply/schedule/page.tsx
"use client";

/* eslint-disable react/no-unescaped-entities */
import * as React from "react";

type Program = "Course" | "Tutoring" | "Membership";

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
const CAL_ONBOARDING =
  "https://calendly.com/admin-the808academy/onboarding-call";
const CAL_INTRO = "https://calendly.com/admin-the808academy/30min";

// Tutoring packages (Calendly + Stripe)
const TUTORING_PACKAGES = [
  {
    key: "single",
    label: "Single session — $49",
    calendly:
      "https://calendly.com/admin-the808academy/tutoring-session",
    priceId: "price_1Sf1RRDgVrA91WNOa7F5WqUA",
    note: "Schedule your session now, then check out to confirm your booking.",
  },
  {
    key: "block4",
    label: "4-session block — $139 (best value)",
    calendly:
      "https://calendly.com/admin-the808academy/4-session-tutoring-block-first-session-booking",
    priceId: "price_1Sf1UEDgVrA91WNOJyDiAXnI",
    note: "Schedule your first session now. The next sessions are scheduled with your tutor at the end of each session.",
  },
] as const;

type TutoringPackageKey = (typeof TUTORING_PACKAGES)[number]["key"];

// Checkout helper:
// - For membership + cohort: use mode
// - For tutoring: pass priceId (generic payment)
async function startCheckout(params: {
  mode?: "demo" | "paid" | "membership" | "subscription";
  priceId?: string;
  source: string;
}) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...(params.mode ? { mode: params.mode } : {}),
      ...(params.priceId
        ? { priceId: params.priceId, quantity: 1 }
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

function getParam(name: string) {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(name);
}

export default function SchedulePage() {
  const [program, setProgram] = React.useState<Program>("Course");
  const [course, setCourse] = React.useState("Music Production");
  const [classTime, setClassTime] = React.useState<string | null>(null);

  // Cohort type selector (demo vs paid)
  const [cohortMode, setCohortMode] = React.useState<"demo" | "paid">("demo");

  // Tutoring package selector
  const [tutoringPackage, setTutoringPackage] =
    React.useState<TutoringPackageKey>("single");

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const raw = getParam("program") || "Course";
    const normalized: Program =
      raw === "Membership"
        ? "Membership"
        : raw === "Tutoring"
        ? "Tutoring"
        : "Course";

    setProgram(normalized);
    setCourse(getParam("course") || "Music Production");
    setClassTime(getParam("classTime"));
  }, []);

  const isCourse = program === "Course";
  const isTutoring = program === "Tutoring";
  const isMembership = program === "Membership";

  const tutoringConfig =
    TUTORING_PACKAGES.find((p) => p.key === tutoringPackage) ||
    TUTORING_PACKAGES[0];

  const headline = isMembership
    ? "Membership checkout"
    : isTutoring
    ? "Schedule your tutoring session"
    : "Schedule your 30-minute onboarding call";

  const subhead = isMembership
    ? "Membership goes straight to checkout."
    : isTutoring
    ? "Choose your tutoring option, schedule your time, then complete checkout to confirm."
    : "You already selected your class time. This call is to confirm goals, answer questions, and get you set up before checkout.";

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

            {/* COURSE: embed onboarding calendly */}
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

            {/* TUTORING: package selector + embed selected calendly */}
            {isTutoring && (
              <>
                <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-sm uppercase tracking-wide text-white/60">
                    Tutoring option
                  </div>
                  <div className="mt-2 grid gap-3 md:grid-cols-2">
                    <div>
                      <label className="block text-sm text-white/70 mb-2">
                        Choose package
                      </label>
                      <select
                        value={tutoringPackage}
                        onChange={(e) =>
                          setTutoringPackage(e.target.value as TutoringPackageKey)
                        }
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                      >
                        {TUTORING_PACKAGES.map((p) => (
                          <option key={p.key} value={p.key}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-white/60">
                      {tutoringConfig.note}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-white/10 bg-black">
                  <iframe
                    title="Tutoring Scheduler"
                    src={`${tutoringConfig.calendly}?hide_gdpr_banner=1`}
                    className="w-full"
                    style={{ height: "760px" }}
                  />
                </div>
              </>
            )}

            {/* MEMBERSHIP: no calendly */}
            {isMembership && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm text-white/70">
                  Click “Continue to Checkout” on the right to complete membership signup.
                </p>
              </div>
            )}

            {/* Always available: intro call */}
            <div className="mt-4 flex flex-wrap gap-3">
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
              Cohort classes run Mon & Wed at 12pm or 6pm (you choose one). Office hours are Fridays 10am–6pm.
            </p>
          </div>

          {/* RIGHT */}
          <aside className="rounded-2xl border border-white/10 bg-white/5 p-6 h-fit">
            <div className="text-sm text-gray-300 mb-2">Step 2 of 3</div>

            <div className="text-xl font-semibold mb-4">
              {isCourse ? "Confirm + checkout" : isTutoring ? "Confirm + checkout" : "Checkout"}
            </div>

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

                  <div>
                    <label className="block text-sm text-white/70 mb-2">
                      Cohort offering
                    </label>
                    <select
                      value={cohortMode}
                      onChange={(e) => setCohortMode(e.target.value as "demo" | "paid")}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                    >
                      <option value="demo">Free cohort (demo)</option>
                      <option value="paid">Paid cohort</option>
                    </select>
                    <p className="mt-2 text-xs text-white/50">
                      Schedule your onboarding call first, then continue to checkout.
                    </p>
                  </div>
                </>
              )}

              {isTutoring && (
                <>
                  <div className="flex justify-between gap-3">
                    <span className="text-white/50">Package</span>
                    <span className="text-white">
                      {tutoringPackage === "single" ? "Single ($49)" : "4-pack ($139)"}
                    </span>
                  </div>

                  <div className="rounded-lg border border-white/10 bg-black/30 p-3 text-xs text-white/60">
                    Schedule first, then checkout to confirm your session.
                  </div>
                </>
              )}
            </div>

            <div className="mt-6">
              <button
                type="button"
                disabled={loading}
                className="w-full rounded-full bg-teal-400 px-5 py-3 font-semibold text-black hover:bg-teal-300 transition disabled:opacity-60"
                onClick={async () => {
                  setLoading(true);
                  try {
                    if (isMembership) {
                      await startCheckout({
                        mode: "membership",
                        source: "apply_onboarding_membership",
                      });
                      return;
                    }

                    if (isTutoring) {
                      await startCheckout({
                        priceId: tutoringConfig.priceId,
                        source:
                          tutoringPackage === "single"
                            ? "apply_tutoring_single_after_calendly"
                            : "apply_tutoring_4pack_after_calendly",
                      });
                      return;
                    }

                    // Course cohort
                    await startCheckout({
                      mode: cohortMode === "paid" ? "paid" : "demo",
                      source:
                        cohortMode === "paid"
                          ? "apply_cohort_paid_after_onboarding"
                          : "apply_cohort_demo_after_onboarding",
                    });
                  } catch (e: any) {
                    alert(e?.message || "Could not start checkout.");
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                {loading ? "Starting checkout…" : "Continue to Checkout"}
              </button>

              <p className="mt-3 text-xs text-white/50">
                Tip: schedule first, then return here and complete checkout.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
