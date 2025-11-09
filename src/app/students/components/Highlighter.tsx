"use client";
import { ReactNode } from "react";

/** Minimal pass-through until we wire real highlight logic */
export default function Highlighter({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
