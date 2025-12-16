// src/components/JoinDemoCohortButton.tsx
"use client";

import * as React from "react";
import Link from "next/link";

type JoinDemoCohortButtonProps = {
  label?: string;
  className?: string;
};

export function JoinDemoCohortButton({
  label = "Join Free Demo Cohort",
  className = "",
}: JoinDemoCohortButtonProps) {
  const href =
    "/apply?program=Course&course=" +
    encodeURIComponent("Music Production") +
    "&cohort=demo";

  return (
    <Link
      href={href}
      className={[
        "rounded-xl bg-[#00FFF7] px-6 py-3 font-semibold text-black transition hover:opacity-90",
        className,
      ].join(" ")}
    >
      {label}
    </Link>
  );
}
