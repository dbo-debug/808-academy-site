"use client";
import { ReactNode, createContext } from "react";

/** Placeholder context so consumers can read/write later */
export const HighlightContext = createContext<null>(null);

type Props = {
  children: ReactNode;
  courseSlug?: string;
  lessonId?: string;
};

export default function HighlightProvider({ children }: Props) {
  return <HighlightContext.Provider value={null}>{children}</HighlightContext.Provider>;
}
