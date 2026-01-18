/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import JoinPlatformButton from "../components/JoinPlatformButton";

/**
 * Home / Landing (V2 direction)
 * - Membership-first platform positioning
 * - Keep existing hero visual + course cards + pricing layout
 * - Remove overlay + free cohort CTA
 */
export default function HomePage() {
  return (
    <main className="text-gray-100">
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

          <h1 className="max-w-4xl text-left text-5xl md:text-6xl font-semibold leading-tight">
            A Platform for Music People to{" "}
            <span className="text-[#00FFF7]">Learn</span>, Build, and Go Further
          </h1>

          <p className="mt-6 max-w-3xl text-left text-lg text-gray-300">
            The 808 Academy is a membership-based education platform for musicians,
            producers, engineers, and music lovers — combining structured
            learning, feedback, and real opportunities in one place.
          </p>

          <p className="mt-5 max-w-2xl text-left text-lg font-semibold text-white">
  Live teachers. Real feedback. No pre-recorded lessons.
</p>

          <p className="mt-3 max-w-2xl text-left text-sm text-gray-300/90 italic">
            Learn. Build. Collaborate. Create opportunities.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            {/* Primary: Membership */}
            <JoinPlatformButton />

            {/* Secondary: Browse what's inside */}
            <Link
              href="#membership"
              className="rounded-xl border border-white/30 px-6 py-3 font-semibold hover:bg-white/10 transition"
            >
              See what’s inside
            </Link>

            {/* Keep: Courses marketing */}
            <Link
              href="/courses"
              className="rounded-xl border border-white/30 px-6 py-3 font-semibold hover:bg-white/10 transition"
            >
              View Courses
            </Link>
          </div>

          <p className="mt-4 max-w-3xl text-left text-sm text-gray-400">
            Membership unlocks the Platform (Student Lounge, community, contests,
            submissions, resources, and more).
          </p>
        </div>
      </section>

      {/* ---------- OUR COURSES ---------- */}
      <section id="courses" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-4xl font-semibold text-center md:text-left">
            Courses Inside the Platform
          </h2>
          <p className="mt-3 text-center md:text-left text-gray-300">
            Structured education paths you can follow at your own pace — with
            cohorts and live experiences available as part of the platform.
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

      {/* ---------- MEMBERSHIP / PLATFORM INCLUDES ---------- */}
      <section id="membership" className="py-20 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="md:flex md:items-end md:justify-between">
            <div>
              <h2 className="text-4xl font-semibold">What you get as a member</h2>
              <p className="mt-3 max-w-2xl text-gray-300">
                Membership unlocks the Platform — education, community, creative
                challenges, and submissions — built to keep you moving.
              </p>
            </div>

            <div className="mt-6 md:mt-0">
              <JoinPlatformButton />
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <FeatureCard
              title="Structured Education"
              body="Courses and learning paths — starting with music production, expanding over time."
            />
            <FeatureCard
              title="Community + Collaboration"
              body="Discord for collabs, feedback, practice sessions, and course discussion."
            />
            <FeatureCard
              title="Creative Challenges"
              body="Remix contests and prompts designed to build skill, momentum, and consistency."
            />
            <FeatureCard
              title="Submissions + Opportunities"
              body="Submit original work for feedback and real sync-style opportunities."
            />
            <FeatureCard
              title="Member Resources"
              body="Samples, MIDI patterns, presets, and tools — curated for quality over clutter."
            />
            <FeatureCard
              title="Tools + Deals"
              body="Plugin deals and proprietary 808 Academy tools built for music creators."
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
                Membership is the foundation. Add cohorts for live structure or
                book 1:1 tutoring when you want hands-on help.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <JoinPlatformButton />
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Membership (PRIMARY) */}
            <PricingCard
              name="Platform Membership"
              price="$15"
              cadence="per month"
              bullets={[
                "Access to the Student Lounge (Platform hub)",
                "Private Discord (collabs, feedback, practice sessions)",
                "Unlimited remix contest entries",
                "Sync-style submission opportunities",
                "Member resources: samples, MIDI patterns, presets",
                "Tools + plugin deals (as released)",
              ]}
              image="/vip.png"
              ctaLabel="Join Platform"
              href="/membership"
            />

            {/* Cohorts (positioned as add-on path, not the entry point) */}
            <PricingCard
              name="Live Cohorts"
              price="Member access"
              cadence="inside the Platform"
              bullets={[
                "Live classroom experience when cohorts are running",
                "Structured curriculum + accountability",
                "Homework + feedback cycles",
                "Office hours and troubleshooting support",
                "Replays, templates, and project files",
                "Future: optional paid cohort upgrades",
              ]}
              image="/courses.jpg"
              ctaLabel="Explore Courses"
              href="/courses"
            />

            {/* Tutoring */}
            <PricingCard
              name="Tutoring"
              price="$49"
              cadence="per 55-min session"
              bullets={[
                "1:1 screen-share with a working producer/engineer",
                "Hands-on help inside your DAW and projects",
                "Production, mixing, mastering, workflow coaching",
                "Fix stuck tracks and creative blocks in real time",
                "Personalized feedback tailored to your goals",
                "Add-on support for members and cohort students",
              ]}
              image="/tutoring.jpg"
              ctaLabel="Book Tutoring"
              href="/tutoring"
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
                Ready to build real momentum?
              </h3>
              <p className="mt-3 text-gray-300">
                Join the Platform, explore the Lounge, and start learning,
                collaborating, and submitting work — all in one place.
              </p>
            </div>
            <div className="flex gap-4 md:justify-end items-center">
              <Link
                href="/courses"
                className="rounded-xl border border-white/30 px-6 py-3 font-semibold hover:bg-white/10 transition"
              >
                Explore Courses
              </Link>
              <JoinPlatformButton />
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

function FeatureCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-300">{body}</p>
    </div>
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
