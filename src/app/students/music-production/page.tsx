// src/app/students/music-production/page.tsx
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function MPCourseRedirectPage() {
  redirect("/ebook/music-production");
}
