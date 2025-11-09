"use client";
import { ReactNode } from "react";

type PageProps = {
  /** Optional heading shown above the content and used for aria-label */
  title?: string;
  children: ReactNode;
};

export default function Page({ title, children }: PageProps) {
  return (
    <section aria-label={title ?? undefined} className="space-y-4">
      {title ? <h2 className="text-xl font-semibold">{title}</h2> : null}
      {children}
    </section>
  );
}
