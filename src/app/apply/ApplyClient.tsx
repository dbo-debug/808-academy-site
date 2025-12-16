"use client";

import * as React from "react";

type Program = "Course" | "Tutoring" | "Membership";
type ClassTime = "12PM" | "6PM";
type TutoringPackage = "block4" | "single";
type CohortMode = "demo" | "paid";

type SubmitState =
  | { ok: false; message: string }
  | { ok: true; message: string }
  | null;

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

function getParam(key: string) {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(key);
}

function normalizeProgram(raw: string | null): Program {
  if (raw === "Tutoring") return "Tutoring";
  if (raw === "Membership") return "Membership";
  return "Course";
}

function normalizeCohort(raw: string | null): CohortMode {
  // default is ALWAYS paid unless explicitly demo
  return raw === "demo" ? "demo" : "paid";
}

export default function ApplyClient() {
  // contact
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  // address (optional)
  const [street, setStreet] = React.useState("");
  const [city, setCity] = React.useState("");
  const [stateRegion, setStateRegion] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");
  const [country, setCountry] = React.useState("United States");

  // program details
  const [program, setProgram] = React.useState<Program>("Course");
  const [course, setCourse] = React.useState("Music Production");
  const [tutoringSubject, setTutoringSubject] = React.useState("");
  const [tutoringPackage, setTutoringPackage] =
    React.useState<TutoringPackage>("block4");
  const [daw, setDaw] = React.useState("Pro Tools");

  // Cohort mode: paid by default, demo only when URL explicitly sets cohort=demo
  const [cohortMode, setCohortMode] = React.useState<CohortMode>("paid");

  // class time selection
  const [classTime, setClassTime] = React.useState<ClassTime>("12PM");

  // background
  const [experience, setExperience] = React.useState("Beginner");
  const [goals, setGoals] = React.useState("");

  // socials (optional)
  const [instagram, setInstagram] = React.useState("");
  const [tiktok, setTiktok] = React.useState("");
  const [youtube, setYoutube] = React.useState("");
  const [soundcloud, setSoundcloud] = React.useState("");
  const [discord, setDiscord] = React.useState("");

  // consents
  const [consentEmail, setConsentEmail] = React.useState(true);
  const [consentSMS, setConsentSMS] = React.useState(false);

  // ui
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState<SubmitState>(null);

  // Read incoming params once (supports: /apply?program=Course&course=music-production&cohort=demo)
  React.useEffect(() => {
    const p = normalizeProgram(getParam("program"));
    setProgram(p);

    const c = getParam("course");
    if (c) {
      // keep the "slug" if you pass it (music-production), or a label if you pass that
      setCourse(c);
    }

    const ct = getParam("classTime");
    if (ct === "12PM" || ct === "6PM") setClassTime(ct);

    const cohort = normalizeCohort(getParam("cohort"));
    setCohortMode(cohort);

    // tutoring defaults to block4 if switching
    if (p === "Tutoring") setTutoringPackage("block4");
  }, []);

  // When switching to Tutoring, default to the 4-session block
  React.useEffect(() => {
    if (program === "Tutoring") setTutoringPackage("block4");
  }, [program]);

  function validate(): string | null {
    if (!firstName.trim()) return "Please enter your first name.";
    if (!lastName.trim()) return "Please enter your last name.";
    if (!email.trim()) return "Please enter your email.";
    if (!phone.trim()) return "Please enter your phone number.";

    if (program === "Course" && !course) return "Please select a course.";
    if (program === "Tutoring" && !tutoringSubject.trim())
      return "Please describe what you’d like help with.";

    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(null);

    const errMsg = validate();
    if (errMsg) {
      setSubmitted({ ok: false, message: errMsg });
      return;
    }

    const payload = {
      firstName,
      lastName,
      email,
      phone,
      program,
      course: program === "Course" ? course : null,
      tutoringSubject: program === "Tutoring" ? tutoringSubject : null,
      daw,
      experience,
      goals,
      consentEmail,
      consentSMS,

      // class time
      classTime: program === "Course" ? classTime : null,

      // normalized address object
      address: {
        address1: street || undefined,
        city: city || undefined,
        region: stateRegion || undefined,
        postalCode: postalCode || undefined,
        country: country || undefined,
      },

      // socials
      instagram,
      tiktok,
      youtube,
      soundcloud,
      discord,
    };

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
      return "Application failed.";
    };

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && (data?.ok ?? true)) {
        const next = new URL("/apply/schedule", window.location.origin);

        next.searchParams.set("program", program);

        // ONLY free when cohort=demo is present. Default is paid.
        if (program === "Course") {
          next.searchParams.set("course", course);
          next.searchParams.set("classTime", classTime);

          if (cohortMode === "demo") {
            next.searchParams.set("cohort", "demo");
          }
        }

        if (program === "Tutoring") {
          next.searchParams.set("tutoringPackage", tutoringPackage);
        }
const cohort = new URLSearchParams(window.location.search).get("cohort");
if (cohort === "demo") next.searchParams.set("cohort", "demo");

        window.location.href = next.toString();
      } else {
        throw new Error(data?.error || "Something went wrong.");
      }
    } catch (err: unknown) {
      setSubmitted({ ok: false, message: getErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  }

  const label = (text: string) => (
    <span className="block text-sm font-medium text-gray-200 mb-1">{text}</span>
  );

  const inputClass =
    "w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-teal-400";

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 text-white">
      <Stepper current={1} />

      <h1 className="text-4xl font-bebas tracking-wide mb-2">Apply Now</h1>
      <p className="text-gray-300 mb-8">
        Step 1: Pick your program and class time. Next you’ll schedule a{" "}
        <span className="text-white">30-minute onboarding call</span>, then
        complete secure payment.
      </p>

      {submitted && !submitted.ok && (
        <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-200">
          {submitted.message}
        </div>
      )}

      <form onSubmit={onSubmit} className="grid gap-8">
        {/* Personal */}
        <section className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              {label("First name")}
              <input
                className={inputClass}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              {label("Last name")}
              <input
                className={inputClass}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              {label("Email")}
              <input
                type="email"
                className={inputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              {label("Phone")}
              <input
                className={inputClass}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Program */}
        <section className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Program</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              {label("Choose a program")}
              <select
                className={inputClass}
                value={program}
                onChange={(e) => setProgram(e.target.value as Program)}
              >
                <option value="Course">Course (cohort)</option>
                <option value="Tutoring">Tutoring (1:1)</option>
                <option value="Membership">Membership (monthly)</option>
              </select>

              {program === "Course" && cohortMode === "demo" && (
                <div className="mt-2 text-xs text-teal-200">
                  You’re applying via the <span className="font-semibold">free demo cohort</span>.
                </div>
              )}
            </div>

            {program === "Course" ? (
              <div className="md:col-span-2 grid md:grid-cols-2 gap-4">
                <div>
                  {label("Course")}
                  <select
                    className={inputClass}
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                  >
                    <option>Music Production</option>
                    <option>Mixing</option>
                    <option>Remixing</option>
                    <option>Mastering</option>
                  </select>
                  <div className="mt-2 text-xs text-white/50">
                    Mixing / Remixing / Mastering are coming soon.
                  </div>
                </div>

                <div>
                  {label("Class time (test cohort)")}
                  <select
                    className={inputClass}
                    value={classTime}
                    onChange={(e) => setClassTime(e.target.value as ClassTime)}
                  >
                    <option value="12PM">Mon & Wed — 12:00pm to 1:30pm</option>
                    <option value="6PM">Mon & Wed — 6:00pm to 7:30pm</option>
                  </select>
                  <div className="mt-2 text-xs text-white/50">
                    You’re choosing your class time now. Next step is a 30-minute onboarding call.
                  </div>
                </div>
              </div>
            ) : program === "Tutoring" ? (
              <div className="md:col-span-2 grid md:grid-cols-2 gap-4">
                <div>
                  {label("Tutoring option")}
                  <select
                    className={inputClass}
                    value={tutoringPackage}
                    onChange={(e) =>
                      setTutoringPackage(e.target.value as TutoringPackage)
                    }
                  >
                    <option value="block4">4-session block — $139 (best value)</option>
                    <option value="single">Single session — $49</option>
                  </select>
                  <div className="mt-2 text-xs text-white/50">
                    You’ll schedule your first session next, then checkout to confirm.
                  </div>
                </div>

                <div>
                  {label("Tutoring subject / goals")}
                  <input
                    className={inputClass}
                    placeholder="e.g., vocal tuning, arrangement, mix feedback…"
                    value={tutoringSubject}
                    onChange={(e) => setTutoringSubject(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div className="md:col-span-2">
                {label("Membership note")}
                <div className="rounded-lg border border-white/10 bg-black/30 p-3 text-sm text-white/70">
                  Membership unlocks the Student Lounge, remix contests, member drops, and discounts.
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              {label("DAW")}
              <select
                className={inputClass}
                value={daw}
                onChange={(e) => setDaw(e.target.value)}
              >
                <option>Pro Tools</option>
                <option>FL Studio</option>
                <option>Logic Pro</option>
                <option>Ableton Live</option>
                <option>Studio One</option>
                <option>Reason</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              {label("Experience level")}
              <select
                className={inputClass}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <div>
              {label("Goals")}
              <input
                className={inputClass}
                placeholder="What do you want to achieve?"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Socials */}
        <section className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Socials (optional)</h2>
          <p className="text-sm text-white/70">
            If you share your work online, drop your handles so we can tag you when it makes sense.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              {label("Instagram")}
              <input
                className={inputClass}
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="@yourhandle"
              />
            </div>
            <div>
              {label("TikTok")}
              <input
                className={inputClass}
                value={tiktok}
                onChange={(e) => setTiktok(e.target.value)}
                placeholder="@yourhandle"
              />
            </div>
            <div>
              {label("YouTube")}
              <input
                className={inputClass}
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                placeholder="channel link"
              />
            </div>
            <div>
              {label("SoundCloud")}
              <input
                className={inputClass}
                value={soundcloud}
                onChange={(e) => setSoundcloud(e.target.value)}
                placeholder="profile link"
              />
            </div>
            <div className="md:col-span-2">
              {label("Discord (optional)")}
              <input
                className={inputClass}
                value={discord}
                onChange={(e) => setDiscord(e.target.value)}
                placeholder="username (optional)"
              />
            </div>
          </div>
        </section>

        {/* Address */}
        <section className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Address (optional)</h2>
          <p className="text-sm text-white/70">
            Not required for enrollment. Helps us with future physical drops or merch fulfillment.
          </p>

          <div className="grid gap-4">
            <div>
              {label("Street")}
              <input
                className={inputClass}
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                {label("City")}
                <input
                  className={inputClass}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                {label("State / Region")}
                <input
                  className={inputClass}
                  value={stateRegion}
                  onChange={(e) => setStateRegion(e.target.value)}
                />
              </div>
              <div>
                {label("Postal code")}
                <input
                  className={inputClass}
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>
            <div className="max-w-md">
              {label("Country")}
              <input
                className={inputClass}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Consents */}
        <section className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Stay in the loop</h2>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="size-4 accent-teal-400"
              checked={consentEmail}
              onChange={(e) => setConsentEmail(e.target.checked)}
            />
            <span className="text-sm text-gray-300">
              I agree to receive emails about my application and course updates.
            </span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="size-4 accent-teal-400"
              checked={consentSMS}
              onChange={(e) => setConsentSMS(e.target.checked)}
            />
            <span className="text-sm text-gray-300">
              I agree to receive SMS reminders about sessions and schedules.
            </span>
          </label>
        </section>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-teal-400 px-6 py-3 font-semibold text-black hover:bg-teal-300 disabled:opacity-60"
          >
            {loading ? "Submitting…" : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
}
