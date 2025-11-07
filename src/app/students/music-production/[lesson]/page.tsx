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

type Search = { [key: string]: string | string[] | undefined };
type Params = { lesson: string };

export default async function LessonPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lesson } = await params;

  const current = lessonById(lesson);
  if (!current) return notFound();

  const normalizedResources =
    (current.resources ?? []).map((r: any) => ({
      name: r.name ?? r.label,
      url: r.url ?? r.href,
    })) ?? [];

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

  return (
    <div className="space-y-8">
      {current.videoUrl ? (
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <MediaPlayer src={current.videoUrl} />
        </div>
      ) : null}

      <BookShell title={current.title} subtitle={current.description} toc={toc}>
        <LessonContent lessonId={current.id} />
        <ResourceDownloads resources={normalizedResources} />

        {current.quizId ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <Quiz quizId={current.quizId} />
          </div>
        ) : null}

        <div className="mt-8 flex items-center justify-between">
          <LessonNavigation prev={current.prev} next={current.next} />
          <MarkCompleteButton lessonId={current.id} course="music-production" />
        </div>
      </BookShell>
    </div>
  );
}
