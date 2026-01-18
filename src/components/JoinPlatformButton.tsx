"use client";

import Link from "next/link";

type Props = {
  className?: string;
  label?: string;
};

export default function JoinPlatformButton({
  className = "",
  label = "Join Platform — $15/mo",
}: Props) {
  return (
    <Link
      href="/apply?program=Membership"
      className={
        "inline-flex items-center justify-center rounded-xl bg-[#00FFF7] px-5 py-3 text-sm font-semibold text-black hover:opacity-90 transition " +
        className
      }
    >
      {label}
    </Link>
  );
}
