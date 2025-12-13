// src/app/students/profile/page.tsx
"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";

import { supabase } from "@/lib/supabase";
import AuthGuard from "../components/AuthGuard";

type Profile = {
  full_name: string | null;
  avatar_url: string | null;
  favorite_genre: string | null;
  primary_daw: string | null;
  goals: string | null;
  city: string | null;
  instagram_handle: string | null;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    avatar_url: null,
    favorite_genre: "",
    primary_daw: "",
    goals: "",
    city: "",
    instagram_handle: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      try {
        setLoading(true);
        setError(null);

        const { data: sessionData, error: sessionErr } =
          await supabase.auth.getSession();
        if (sessionErr || !sessionData.session?.user) {
          throw new Error("You must be signed in to edit your profile.");
        }

        const user = sessionData.session.user;

        const { data, error: fetchErr } = await supabase
          .from("profiles")
          .select(
            "full_name, avatar_url, favorite_genre, primary_daw, goals, city, instagram_handle"
          )
          .eq("id", user.id)
          .maybeSingle();

        if (fetchErr) throw fetchErr;

        if (!cancelled && data) {
          setProfile({
            full_name: data.full_name ?? "",
            avatar_url: data.avatar_url ?? null,
            favorite_genre: data.favorite_genre ?? "",
            primary_daw: data.primary_daw ?? "",
            goals: data.goals ?? "",
            city: data.city ?? "",
            instagram_handle: data.instagram_handle ?? "",
          });
        }
      } catch (err: any) {
        console.error("[profile] load error", err);
        if (!cancelled) {
          setError(err?.message ?? "Failed to load profile.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProfile();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSave() {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const { data: sessionData, error: sessionErr } =
        await supabase.auth.getSession();
      if (sessionErr || !sessionData.session?.user) {
        throw new Error("You must be signed in.");
      }
      const user = sessionData.session.user;

      const updates = {
        id: user.id,
        full_name: profile.full_name || null,
        avatar_url: profile.avatar_url || null,
        favorite_genre: profile.favorite_genre || null,
        primary_daw: profile.primary_daw || null,
        goals: profile.goals || null,
        city: profile.city || null,
        instagram_handle: profile.instagram_handle || null,
        updated_at: new Date().toISOString(),
      };

      const { error: upsertErr } = await supabase
        .from("profiles")
        .upsert(updates, { onConflict: "id" });

      if (upsertErr) throw upsertErr;

      setSuccess("Profile updated.");
    } catch (err: any) {
      console.error("[profile] save error", err);
      setError(err?.message ?? "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  }

  async function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);
      setError(null);
      setSuccess(null);

      const { data: sessionData, error: sessionErr } =
        await supabase.auth.getSession();
      if (sessionErr || !sessionData.session?.user) {
        throw new Error("You must be signed in.");
      }
      const user = sessionData.session.user;

      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;

      // upload to avatars bucket
      const { error: uploadErr } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true,
        });

      if (uploadErr) {
        console.error("[profile] avatar upload error", uploadErr);
        throw uploadErr;
      }

      const { data: publicData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const publicUrl = publicData.publicUrl;

      // save to profile
      const { error: upsertErr } = await supabase.from("profiles").upsert(
        {
          id: user.id,
          avatar_url: publicUrl,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

      if (upsertErr) throw upsertErr;

      setProfile((p) => ({ ...p, avatar_url: publicUrl }));
      setSuccess("Avatar updated.");
    } catch (err: any) {
      console.error("[profile] avatar error", err);
      setError(err?.message ?? "Failed to upload avatar.");
    } finally {
      setUploading(false);
      // reset file input so you can re-upload same file if needed
      e.target.value = "";
    }
  }

  const initials =
    profile.full_name?.trim()?.charAt(0).toUpperCase() || "S";

  return (
    <AuthGuard>
      <div className="relative min-h-screen bg-black text-white">
        <main className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
          <Link
            href="/students"
            className="text-xs text-white/60 hover:text-white/90"
          >
            ← Back to Lounge
          </Link>

          <header className="space-y-2">
            <h1 className="text-2xl font-semibold">Profile &amp; Avatar</h1>
            <p className="text-sm text-white/60">
              Update how you appear in the Student Lounge and future community
              features.
            </p>
          </header>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            {loading ? (
              <p className="text-sm text-white/60">Loading profile…</p>
            ) : (
              <>
                {error && (
                  <p className="mb-3 text-sm text-red-400">{error}</p>
                )}
                {success && (
                  <p className="mb-3 text-sm text-emerald-400">{success}</p>
                )}

                {/* Avatar row */}
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full bg-white/10">
                    {profile.avatar_url ? (
                      <Image
                        src={profile.avatar_url}
                        alt="Avatar"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-2xl font-semibold">
                        {initials}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-white/80">
                      This avatar shows in your Student Lounge and future
                      community features.
                    </p>

                    <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-white/20 px-4 py-2 text-xs font-medium text-white hover:border-[#00FFF7] hover:text-[#00FFF7]">
                      <span>{uploading ? "Uploading…" : "Upload new avatar"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                        disabled={uploading}
                      />
                    </label>
                  </div>
                </div>

                <hr className="my-6 border-white/10" />

                {/* Form fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                      Display Name
                    </label>
                    <input
                      type="text"
                      className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#00FFF7]"
                      value={profile.full_name ?? ""}
                      onChange={(e) =>
                        setProfile((p) => ({
                          ...p,
                          full_name: e.target.value,
                        }))
                      }
                      placeholder="Your name or artist name"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      This is how your name appears in the lounge.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                        Favorite Genre
                      </label>
                      <input
                        type="text"
                        className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#00FFF7]"
                        value={profile.favorite_genre ?? ""}
                        onChange={(e) =>
                          setProfile((p) => ({
                            ...p,
                            favorite_genre: e.target.value,
                          }))
                        }
                        placeholder="House, Trap, Pop, R&B…"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                        Primary DAW
                      </label>
                      <input
                        type="text"
                        className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#00FFF7]"
                        value={profile.primary_daw ?? ""}
                        onChange={(e) =>
                          setProfile((p) => ({
                            ...p,
                            primary_daw: e.target.value,
                          }))
                        }
                        placeholder="Ableton, FL Studio, Logic…"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                        City
                      </label>
                      <input
                        type="text"
                        className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#00FFF7]"
                        value={profile.city ?? ""}
                        onChange={(e) =>
                          setProfile((p) => ({
                            ...p,
                            city: e.target.value,
                          }))
                        }
                        placeholder="Los Angeles, London…"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                        Instagram
                      </label>
                      <input
                        type="text"
                        className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#00FFF7]"
                        value={profile.instagram_handle ?? ""}
                        onChange={(e) =>
                          setProfile((p) => ({
                            ...p,
                            instagram_handle: e.target.value,
                          }))
                        }
                        placeholder="@yourhandle (optional)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                      Goals
                    </label>
                    <textarea
                      className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#00FFF7]"
                      rows={4}
                      value={profile.goals ?? ""}
                      onChange={(e) =>
                        setProfile((p) => ({
                          ...p,
                          goals: e.target.value,
                        }))
                      }
                      placeholder="What do you want from music? Touring DJ, sync placements, better mixes…"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-xl bg-[#00FFF7] px-5 py-2 text-sm font-semibold text-black shadow-lg shadow-cyan-500/30 transition hover:scale-105 disabled:opacity-60"
                  >
                    {saving ? "Saving…" : "Save Changes"}
                  </button>
                </div>
              </>
            )}
          </section>
        </main>
      </div>
    </AuthGuard>
  );
}
