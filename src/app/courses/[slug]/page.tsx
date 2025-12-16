import Link from "next/link";
import Image from "next/image";
import { COURSES } from "@/lib/courses";

type CoursePageProps = {
  params?: {
    slug?: string;
  };
};

export default function CoursePage({ params }: CoursePageProps) {
  const slug = params?.slug;

  const course = COURSES.find((c) => c.slug === slug);

  if (!course) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-2">Course not found</h1>
          <p className="text-gray-300 mb-6">
            We couldn’t find that course. Head back to see all available courses.
          </p>
          <Link
            href="/courses"
            className="inline-block rounded-full bg-teal-400 px-5 py-2 font-semibold text-black hover:bg-teal-300 transition"
          >
            View Courses
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-16 text-white">
      <section className="max-w-6xl mx-auto grid gap-10 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="mb-6">
            <Link href="/courses" className="text-sm text-teal-300 hover:underline">
              ← Back to Courses
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl font-bebas tracking-wide mb-2">
            {course.title}
          </h1>
          {course.tagline ? <p className="text-gray-300 mb-6">{course.tagline}</p> : null}

          {course.heroImage ? (
            <div className="relative w-full h-64 md:h-80 mb-8 overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={course.heroImage}
                alt={course.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : null}

          <div className="prose prose-invert max-w-none">
            <h2>What you’ll learn</h2>
            <ul>
              {Array.isArray(course.bullets) ? (
                course.bullets.map((b, i) => <li key={`${course.slug}-b-${i}`}>{b}</li>)
              ) : (
                <>
                  <li>Core concepts and repeatable workflows.</li>
                  <li>Hands-on techniques you can apply immediately.</li>
                  <li>Personalized feedback during the program.</li>
                </>
              )}
            </ul>
          </div>
        </div>

        <aside className="rounded-2xl border border-white/10 bg-white/5 p-6 h-fit">
          <div className="text-sm text-gray-300 mb-2">Enrollment</div>
          <div className="text-3xl font-semibold mb-4">
            {course.priceLabel
              ? course.priceLabel
              : typeof course.price === "number"
              ? `$${course.price.toLocaleString()}`
              : "TBA"}
          </div>

          <Link
            href={`/checkout?course=${encodeURIComponent(course.slug)}`}
            className="block text-center rounded-full bg-teal-400 px-5 py-3 font-semibold text-black hover:bg-teal-300 transition"
          >
            Enroll Now
          </Link>

          <div className="mt-6 text-sm text-gray-400">
            <p>
              Need help deciding?{" "}
              <Link href="/apply" className="text-teal-300 hover:underline">
                Apply
              </Link>{" "}
              and we’ll reach out.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
