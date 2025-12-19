import MusicProductionEbookPage, {
  ChapterId,
  isChapterId,
} from "../../page";

type PageProps = {
  params: { chapter: string };
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function ChapterSlugPage({ params, searchParams }: PageProps) {
  const slug = params.chapter;

  if (!isChapterId(slug)) {
    // Render a friendly not-found inside the existing layout
    return (
      <MusicProductionEbookPage
        searchParams={{ ...searchParams, chapter: slug }}
      />
    );
  }

  // Preserve any extra search params while enforcing the slug
  const mergedSearchParams = { ...searchParams, chapter: slug as ChapterId };

  // Re-use the main ebook page to avoid duplicate markup/styles
  return (
    <MusicProductionEbookPage searchParams={mergedSearchParams} />
  );
}
