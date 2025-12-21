import React from "react";
import EbookReader from "../../EbookReader";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

type PageProps = {
  params: { chapter: string };
};

export default function ChapterSlugPage({ params }: PageProps) {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          zIndex: 9999,
          background: "black",
          color: "lime",
          padding: "6px",
          fontSize: "12px",
        }}
      >
        CHAPTER ROUTE: {params.chapter}
      </div>
      <EbookReader key={params.chapter} chapterIdParam={params.chapter} />
    </>
  );
}
