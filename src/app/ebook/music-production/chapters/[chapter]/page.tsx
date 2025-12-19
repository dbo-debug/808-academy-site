export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

import MusicProductionEbookPage from "../../page";

type PageProps = {
  params: { chapter: string };
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function ChapterSlugPage({ params, searchParams }: PageProps) {
  return (
    <MusicProductionEbookPage
      key={params.chapter}
      params={{ chapter: params.chapter }}
      searchParams={searchParams}
    />
  );
}
