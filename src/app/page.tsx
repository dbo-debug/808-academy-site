/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { JoinDemoCohortButton } from "../components/JoinDemoCohortButton";
import HomeEntryOverlay from "../components/HomeEntryOverlay";

/**
 * Home / Landing
 * - White logo, left-justified hero, dark overlay on /main.jpg
 * - Courses (4 cards)
 * - Choose Your Path (pricing: Courses / Tutoring / Membership)
 */
export default function HomePage() {
  return (
    <main className="text-gray-100">
      {/* ---------- ENTRY OVERLAY (shows once per session) ---------- */}
      <HomeEntryOverlay
        classHref="/courses/music-production"
        remixHref="/remix-contest"
      />

      {/* ---------- HERO ---------- */}
      <section
        className="relative min-h-[88vh] flex items-center"
        style={{
          backgroundImage: "url('/main.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          {/* White logo */}
          <img
            src="/logo-808-white.svg"
            alt="The 808 Academy Logo"
            className="h-64 w-auto mb-8 drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          />

          <h1 className="max-w-3xl text-left text-5xl md:text-6xl font-semibold leading-tight">
            Learn to produce, mix, master, and release{" "}
            <span className="text-[#00FFF7]">radio-ready</span> music from your
            home studio.
          </h1>

          <p className="mt-6 max-w-2xl text-left text-lg text-gray-300">
            Structured courses, 1:1 tutoring, and VIP mentorship from working
            engineers — 100% online, with templates, checklists, and replays
            included.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/courses"
              className="rounded-xl bg-[#00FFF7] px-6 py-3 font-semibold text-black hover:opacity-90 transition"
            >
              View Courses
            </Link>

            <Link
              href="/apply"
              className="rounded-xl border border-white/30 px-6 py-3 font-semibold hover:bg-white/10 transition"
            >
              Apply Now
            </Link>

            {/* NEW: explain what the free class/cohort is BEFORE application */}
            <Link
              href="/courses/music-production"
              className="rounded-xl border border-white/30 px-6 py-3 font-semibold hover:bg-white/10 transition"
            >
              Free Class Details
            </Link>

            {/* NEW: remix contest entry point */}
            <Link
              href="/remix-contest"
              className="rounded-xl border border-white/30 px-6 py-3 font-semibold hover:bg-white/10 transition"
            >
              Remix Contest
            </Link>

            {/* KEEP: this is likely what triggers demo/free cohort behavior + free Stripe product */}
            <JoinDemoCohortButton label="Join Free Demo Cohort" />
          </div>

          {/* Optional tiny helper text (keeps intent clear; remove if you want it cleaner) */}
          <p className="mt-4 max-w-2xl text-left text-sm text-gray-400">
            Tip: “Free Class Details” explains the program. “Join Free Demo
            Cohort” takes you straight to the demo cohort application.
          </p>
        </div>
      </section>

      {/* ---------- OUR COURSES ---------- */}
      <section id="courses" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-4xl font-semibold text-center md:text-left">
            Our Courses
          </h2>
          <p className="mt-3 text-center md:text-left text-gray-300">
            Learn from working engineers with a polished, release-ready
            curriculum.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {/* Card 1 */}
            <CourseCard
              title="Music Production"
              tag="Production"
              blurb="From sketch to finished demo. Song structure, drums, synths, vocals, and arrangement."
              href="/courses/music-production"
              image="/MusicProduction.png"
            />
            {/* Card 2 */}
            <CourseCard
              title="Remixing"
              tag="Creative"
              blurb="Creative remix techniques — tempo mapping, vocal chopping, re-harmonization, and dynamic reworks."
              href="/courses/remixing"
              image="/Remixing.png"
            />
            {/* Card 3 */}
            <CourseCard
              title="Mixing"
              tag="Engineering"
              blurb="Low-end glue, vocal priority, depth, and loudness. Workflows that translate on every system."
              href="/courses/mixing"
              image="/Mixing.png"
            />
            {/* Card 4 */}
            <CourseCard
              title="Mastering"
              tag="Finishing"
              blurb="Finalize your track for streaming or club — tone, dynamics, loudness targets, and deliverables."
              href="/courses/mastering"
              image="/Mastering.png"
            />
          </div>
        </div>
      </section>

      {/* ---------- CHOOSE YOUR PATH / PRICING ---------- */}
      <section id="pricing" className="py-20 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="md:flex md:items-end md:justify-between">
            <div>
              <h2 className="text-4xl font-semibold">Choose your path</h2>
              <p className="mt-3 max-w-2xl text-gray-300">
                Three ways to learn — join a cohort, book one-on-one time, or
                get the full VIP treatment with private sessions and priority
                support.
              </p>
            </div>
            <Link
              href="/apply"
              className="mt-6 md:mt-0 rounded-xl bg-[#00FFF7] px-6 py-3 font-semibold text-black hover:opacity-90 transition"
            >
              Apply Now
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Courses */}
            <PricingCard
              name="Courses"
              price="$399"
              cadence="per 4-week cohort"
              bullets={[
                "Live, streamer-style classroom (2x per week, 90 min each)",
                "Structured curriculum from fundamentals to release-ready tracks",
                "Weekly homework with detailed feedback and revisions",
                "15–30 min live office hours for direct questions and troubleshooting",
                "Real-world workflows for production, arrangement, and mixing",
                "Replays, templates, project files, and curated sample packs",
                "Accountability, deadlines, and progress tracking to keep you moving",
              ]}
              image="/courses.jpg"
              ctaLabel="View Cohorts"
              href="/apply"
            />

            {/* Tutoring */}
            <PricingCard
              name="Tutoring"
              price="$49"
              cadence="per 55-min session"
              bullets={[
                "1:1 screen-share sessions with a working producer/engineer",
                "Hands-on help inside your actual DAW and projects",
                "Open-topic coaching: production, mixing, mastering, workflow",
                "Fix stuck tracks, bad habits, and creative blocks in real time",
                "Personalized feedback tailored to your goals and skill level",
                "Add-on support for course students who want extra guidance",
                "Custom 4-week crash courses available on request",
              ]}
              image="/tutoring.jpg"
              ctaLabel="Book Tutoring"
              href="/tutoring"
            />

            {/* Membership */}
            <PricingCard
              name="Membership"
              price="$15"
              cadence="per month"
              bullets={[
                "Access to 808 sample packs and presets",
                "Member-only plugin and gear discounts",
                "Live mix events and Q&A sessions",
                "Produce With The Pros style sessions",
                "Private Discord access and practice sessions",
                "Unlimited entries to 808 remix contests",
                "Sync submission opportunities and more",
              ]}
              image="/vip.png"
              ctaLabel="Explore Membership"
              href="/membership"
            />
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-3xl font-semibold">
                Ready to make radio-ready records?
              </h3>
              <p className="mt-3 text-gray-300">
                Join a cohort, book 1:1 time, or go VIP. We’ll meet you where
                you are and get your music over the finish line.
              </p>
            </div>
            <div className="flex gap-4 md:justify-end">
              <Link
                href="/courses"
                className="rounded-xl border border-white/30 px-6 py-3 font-semibold hover:bg-white/10 transition"
              >
                Explore Courses
              </Link>
              <Link
                href="/apply"
                className="rounded-xl bg-[#00FFF7] px-6 py-3 font-semibold text-black hover:opacity-90 transition"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* -------------------- Small components -------------------- */

type CourseCardProps = {
  title: string;
  tag: string;
  blurb: string;
  href: string;
  image: string;
};

function CourseCard({ title, tag, blurb, href, image }: CourseCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
    >
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-90"
      />
      <div className="p-5">
        <div className="text-xs uppercase tracking-widest text-[#00FFF7]">
          {tag}
        </div>
        <h3 className="mt-1 text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-gray-300">{blurb}</p>
        <div className="mt-4 text-[#00FFF7] font-semibold">Learn More →</div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-white/20" />
    </Link>
  );
}

type PricingCardProps = {
  name: string;
  price: string;
  cadence: string;
  bullets: string[];
  image: string;
  ctaLabel: string;
  href: string;
};

function PricingCard({
  name,
  price,
  cadence,
  bullets,
  image,
  ctaLabel,
  href,
}: PricingCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
      <div
        className="h-40 w-full bg-cover bg-center"
        style={{ backgroundImage: "url('" + image + "')" }}
        aria-hidden
      />
      <div className="p-6">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <div className="mt-2 flex items-baseline gap-2">
          <div className="text-3xl font-bold">{price}</div>
          <div className="text-sm text-gray-300">{cadence}</div>
        </div>
        <ul className="mt-4 space-y-2 text-gray-300">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00FFF7]" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <Link
          href={href}
          className="mt-6 inline-block rounded-xl bg-[#00FFF7] px-5 py-2.5 font-semibold text-black hover:opacity-90 transition"
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}
