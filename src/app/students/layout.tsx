// src/app/students/layout.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import AuthGuard from "./components/AuthGuard";
import { supabase } from "@/lib/supabase";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

function SignOut() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      router.push("/auth/signin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handle}
      disabled={loading}
      className="rounded-lg border border-white/10 px-3 py-1.5 text-white/80 hover:bg-white/[0.06] disabled:opacity-60"
    >
      {loading ? "Signing out…" : "Sign out"}
    </button>
  );
}

function StudentHeader({ email }: { email: string | null }) {
  const pathname = usePathname();

  const links = useMemo(
    () => [
      { href: "/students", label: "Dashboard" },
      { href: "/students/store", label: "Store" },
      { href: "/students/music-production", label: "Course" },
      { href: "/students/profile", label: "Profile" },
    ],
    []
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="text-lg font-semibold tracking-wide">
            <span className="text-cyan-400">808</span> Academy · <span className="text-purple-300">Students</span>
          </div>
          {email ? (
            <span className="hidden text-xs text-white/60 sm:inline">Signed in as {email}</span>
          ) : null}
        </div>

        <div className="flex flex-1 items-center justify-between gap-3 sm:flex-none">
          <nav className="no-scrollbar -mx-2 flex flex-1 items-center gap-1 overflow-x-auto sm:mx-0 sm:flex-none">
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "whitespace-nowrap rounded-lg px-3 py-1.5 text-sm transition",
                    active
                      ? "bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
                      : "text-white/70 hover:text-white hover:bg-white/[0.06]",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:ml-2">
            <SignOut />
          </div>
        </div>
      </div>
    </header>
  );
}

export default function StudentsLayout({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (mounted) setEmail(session?.user?.email ?? null);
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setEmail(session?.user?.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <AuthGuard>
      {/* isolate = clean stacking context so nothing from the public site blocks clicks */}
      <div className="isolate min-h-screen bg-neutral-950 text-gray-100">
        <StudentHeader email={email} />
        <main className="pointer-events-auto relative z-10 mx-auto max-w-6xl px-6 py-8">{children}</main>
      </div>
    </AuthGuard>
  );
}
