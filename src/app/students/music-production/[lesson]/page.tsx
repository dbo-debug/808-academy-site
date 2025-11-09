// src/app/students/music-production/[lesson]/page.tsx
import { notFound } from "next/navigation";
import { lessonById } from "../data/lessons";
import MediaPlayer from "../../components/MediaPlayer";
import ResourceDownloads from "../../components/ResourceDownloads";
import LessonNavigation from "../../components/LessonNavigation";
import MarkCompleteButton from "../../components/MarkCompleteButton";
import LessonContent from "../../components/LessonContent";
import Quiz from "../../components/Quiz";
import BookShell from "../../components/BookShell";
import HighlightProvider from "../../components/HighlightProvider";
import Highlighter from "../../components/Highlighter";
import Pager from "../../components/Pager";
import Page from "../../components/Page";

type Params = { lesson: string };

export default async function LessonPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lesson } = await params;
  const current = lessonById(lesson);
  if (!current) return notFound();

  // Normalize resources: accept {label, href} OR {name, url}
  const normalizedResources =
    (current.resources ?? []).map((r: any) => ({
      name: r.name ?? r.label,
      url: r.url ?? r.href,
    })) ?? [];

  // table of contents (for BookShell sidebar)
  const toc =
    current.id === "sound-hearing"
      ? [
          { id: "intro", label: "Introduction" },
          { id: "what-is-sound", label: "What is Sound?" },
          { id: "waveform", label: "Waveform Characteristics" },
          { id: "loudness", label: "Loudness, Timbre & Envelopes" },
          { id: "hearing", label: "How We Hear" },
          { id: "psycho", label: "Psychoacoustics" },
          { id: "stereo", label: "Stereo & Space" },
          { id: "review", label: "Review & Quiz" },
        ]
      : current.id === "daw-signal-flow"
      ? [
          { id: "intro", label: "Lesson Intro" },
          { id: "electricity", label: "Electricity → Sound" },
          { id: "console", label: "Console → DAW" },
          { id: "protools", label: "Pro Tools 2024 Basics" },
          { id: "gain", label: "Gain Staging" },
          { id: "routing", label: "Routing & Bussing" },
          { id: "management", label: "Session Management" },
          { id: "next", label: "Looking Ahead" },
          { id: "review", label: "Review" },
        ]
      : [];

  // We expose a tiny “mode” toggle via query (?mode=pages) so you can demo quickly.
  // Default: scroll; set mode=pages to enable page feel. Later we can add a UI toggle in BookShell.
  const enablePages = false; // change to true to enforce page mode by default

  return (
    <div className="space-y-8">
      {/* Optional media page first, if present */}
      <BookShell title={current.title} subtitle={current.description} toc={toc}>
        <HighlightProvider courseSlug="music-production" lessonId={current.id}>
          <Pager
            enabled={enablePages}
            titles={[
              "Overview",
              ...(current.videoUrl ? ["Lesson Video"] : []),
              "Lesson Content",
              ...(normalizedResources.length ? ["Resources"] : []),
              ...(current.quizId ? ["Quiz"] : []),
              "Finish",
            ]}
          >
            {/* Page 1: Overview / header */}
            <Page>
              <header className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h1 className="text-2xl font-semibold">{current.title}</h1>
                {current.description && (
                  <p className="mt-2 text-white/70">{current.description}</p>
                )}
              </header>
            </Page>

            {/* Page 2: Video (only if present) */}
            {current.videoUrl ? (
              <Page title="Lesson Video">
                <div className="rounded-2xl border border-white/10 overflow-hidden">
                  <MediaPlayer src={current.videoUrl} />
                </div>
              </Page>
            ) : null}

            {/* Page 3: Lesson content (highlightable) */}
            <Page title="Lesson">
              <Highlighter>
                <LessonContent lessonId={current.id} />
              </Highlighter>
            </Page>

            {/* Page 4: Downloads (if any) */}
            {normalizedResources.length ? (
              <Page title="Downloads">
                <ResourceDownloads resources={normalizedResources} />
              </Page>
            ) : null}

            {/* Page 5: Quiz (if any) */}
            {current.quizId ? (
              <Page title="Knowledge Check">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <Quiz quizId={current.quizId} />
                </div>
              </Page>
            ) : null}

            {/* Page 6: Finish */}
            <Page title="Complete Lesson">
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <LessonNavigation prev={current.prev} next={current.next} />
                <MarkCompleteButton lessonId={current.id} course="music-production" />
              </div>
            </Page>
          </Pager>
        </HighlightProvider>
      </BookShell>
    </div>
  );
}
