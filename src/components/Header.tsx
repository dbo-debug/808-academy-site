// src/components/Header.tsx
"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/#courses", label: "Courses" },
      { href: "/tutoring", label: "Tutoring" },
      { href: "/membership", label: "Membership" },
      { href: "/store", label: "Store" },
      { href: "/remix-contest", label: "Remix Contest" },
      { href: "/auth/signin", label: "Sign In" },
    ],
    []
  );

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  const NavLinks = ({ className = "" }: { className?: string }) => (
    <nav className={`flex flex-col gap-2 md:flex-row md:items-center md:gap-4 ${className}`}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => setOpen(false)}
          className={[
            "rounded-lg px-3 py-2 text-sm transition",
            isActive(link.href)
              ? "text-[#00FFF7] bg-white/5"
              : "text-white/80 hover:text-white hover:bg-white/5",
          ].join(" ")}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo-808-cyan.svg"
            alt="The 808 Academy"
            className="h-10 w-auto sm:h-12 hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden flex-1 items-center justify-end gap-6 md:flex">
          <NavLinks className="items-center" />

          {/* Single CTA */}
          <Link
            href="/apply"
            className="inline-flex items-center rounded-xl bg-[#00FFF7] px-4 py-2 text-sm font-semibold text-black transition hover:bg-white"
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 ring-1 ring-white/15 transition hover:bg-white/5 md:hidden"
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span className="text-lg leading-none">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile menu */}
      {open ? (
        <div className="border-t border-white/10 bg-black/80 px-4 pb-4 pt-2 backdrop-blur md:hidden">
          <NavLinks />
          <Link
            href="/apply"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-[#00FFF7] px-4 py-3 text-sm font-semibold text-black transition hover:bg-white"
          >
            Apply Now
          </Link>
        </div>
      ) : null}
    </header>
  );
}
