// src/app/courses/page.tsx
import Link from "next/link";
import { COURSES } from "../../lib/courses";

export default function CoursesIndexPage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bebas text-white text-center mb-3">
          Courses
        </h1>
        <p className="text-center text-gray-300 mb-10">
          Structured, mentored programs built to take you from idea to release.
        </p>

        <div className="flex justify-center mb-10">
          <img
            src="/808logo.png"
            alt="The 808 Academy Logo"
            className="h-20 w-auto]"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {COURSES.map((c) => (
            <Link
              key={c.slug}
              href={`/courses/${c.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              <img
                src={c.heroImage}
                alt={c.title}
                className="h-52 w-full object-cover opacity-80 group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-5">
                <div className="text-xl font-semibold text-white mb-1">
                  {c.title}
                </div>
                <div className="text-sm text-gray-300">{c.tagline}</div>
                <button className="mt-4 px-4 py-2 bg-teal-400 text-black font-semibold rounded-full shadow-md hover:bg-teal-300 transition">
                  Learn More →
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
