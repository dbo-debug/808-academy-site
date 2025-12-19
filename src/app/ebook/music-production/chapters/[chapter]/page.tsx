import React from "react";
import EbookReader from "../../EbookReader";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

type PageProps = {
  params: { chapter: string };
};

export default function ChapterSlugPage({ params }: PageProps) {
  return <EbookReader chapterIdParam={params.chapter} />;
}

