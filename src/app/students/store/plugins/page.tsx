// src/app/students/store/plugins/page.tsx
import Link from "next/link";
import NotifyMeButton from "../../components/NotifyMeButton";

type PluginItem = {
  name: string;
  tag: string;
  blurb: string;
};

const PLUGIN_ITEMS: PluginItem[] = [
  {
    name: "EQ Bundle",
    tag: "Tone Shaping",
    blurb: "Clean, colored, and analog-style EQs for carving and sweetening.",
  },
  {
    name: "Compression Suite",
    tag: "Dynamics",
    blurb: "Bus comps, limiters, and character compressors for drums & mix bus.",
  },
  {
    name: "Reverb Collection",
    tag: "Space & Depth",
    blurb: "Plates, rooms, halls, and experimental spaces for modern mixes.",
  },
  {
    name: "Synth Pack",
    tag: "Sound Design",
    blurb: "Bread-and-butter synths plus modern engines for 808s and leads.",
  },
  {
    name: "Utility Tools",
    tag: "Workflow",
    blurb: "Meters, gain staging helpers, stereo tools, and more.",
  },
];

export default function PluginStorePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Hero */}
      <header className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00FFF7]">
              Plugin Store
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Plugin Deals for 808 Students
            </h1>
            <p className="mt-2 max-w-xl text-sm text-white/70">
              We&apos;re talking with plugin companies to set up student
              discounts and curated bundles tailored to this course.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/70">
              <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-yellow-400" />
              Coming Soon
            </span>
            <Link
              href="/students"
              className="text-xs text-white/70 hover:text-white/100"
            >
              ← Back to Lounge
            </Link>
          </div>
        </div>

        <div className="mt-4 inline-flex items-center rounded-full border border-white/10 bg-black/40 px-4 py-1 text-[11px] uppercase tracking-[0.16em] text-white/70">
          Curated bundles • Student pricing • Real-world tools
        </div>
      </header>

      {/* Grid of plugin concepts */}
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PLUGIN_ITEMS.map((item) => (
          <article
            key={item.name}
            className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-[#00FFF7]/70 hover:bg-white/10"
          >
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/60">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/80" />
                <span>{item.tag}</span>
              </div>

              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="mt-2 text-sm text-white/75">{item.blurb}</p>
              <p className="mt-2 text-[11px] text-white/50">
                We&apos;ll use your interest here to prioritize which partners
                to lock in first.
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <NotifyMeButton kind="plugin" item={item.name} />
              <span className="text-[11px] text-white/50">
                No purchase yet — interest only.
              </span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
