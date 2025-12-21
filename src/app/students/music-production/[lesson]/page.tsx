// src/app/students/music-production/[lesson]/page.tsx
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function LessonRedirectPage() {
  redirect("/ebook/music-production");
}
