// src/app/vip/page.tsx
import { redirect } from "next/navigation";

export default function VipRedirectPage() {
  redirect("/membership");
}
