"use client";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
};

export default function DiagramCard({ src, alt, caption, className }: Props) {
  return (
    <figure
      className={
        "overflow-hidden rounded-2xl border border-white/10 bg-black " +
        (className || "")
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="block h-auto w-full object-contain bg-black"
      />
      {caption ? (
        <figcaption className="border-t border-white/10 p-3 text-center text-sm text-white/70">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
