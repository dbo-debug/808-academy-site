// src/app/membership/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import MembershipCheckoutButton from "./MembershipCheckoutButton";

export const metadata: Metadata = {
  title: "Membership | The 808 Academy",
  description:
    "Join the 808 Academy membership for sample packs, presets, events, Discord access, remix contests, and more.",
};

const PERKS = [
  "Access to 808 sample packs + presets",
  "Member-only plugin + gear discounts",
  "Live mix events + Q&A sessions",
  "Produce With The Pros sessions",
  "Private Discord access + practice sessions",
  "Unlimited remix contest entries (win cash + features)",
  "Sync submission opportunities",
  "Ongoing drops and member-only perks",
];

export default function MembershipPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="border-b border-white/10 bg-gradient-to-b from-purple-500/15 via-black to-black">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-300/80">
            808 Membership
          </p>

          <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Plug into the <span className="text-fuchsia-300">808 ecosystem</span>.
          </h1>

          <p className="mt-4 max-w-2xl text-sm text-white/70 sm:text-base">
            Monthly membership for producers who want a home base: packs, presets,
            live events, discounts, Discord, contests, and ongoing drops.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <MembershipCheckoutButton />

            <Link
              href="mailto:support@the808academy.com?subject=Membership%20Question"
              className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white/80 transition hover:border-fuchsia-300/70 hover:text-fuchsia-200"
            >
              Ask a question
            </Link>
          </div>

          <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-white/40">
            $15/month • Cancel anytime
          </p>
        </div>
      </section>

      {/* What you get */}
      <section className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold sm:text-2xl">What you get</h2>

          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {PERKS.map((perk) => (
              <li key={perk} className="flex gap-2">
                <span className="mt-[5px] h-[6px] w-[6px] rounded-full bg-fuchsia-300" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <MembershipCheckoutButton />
          </div>
        </div>
      </section>

      {/* Fit with cohorts/tutoring */}
      <section className="bg-gradient-to-b from-black via-black to-fuchsia-500/10">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold sm:text-2xl">
            How membership fits with cohorts & tutoring
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-3 text-sm">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                Membership
              </p>
              <p className="mt-2 text-xs text-white/75">
                Your ongoing home base: packs, events, Discord, discounts, contests,
                sync submissions, and member drops.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                Cohort
              </p>
              <p className="mt-2 text-xs text-white/75">
                A focused 4-week live program with homework + feedback. Cohorts sit
                on top of membership.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                Tutoring
              </p>
              <p className="mt-2 text-xs text-white/75">
                Deep 1:1 coaching for a custom gameplan: production, mixing, workflow,
                and accountability.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
