import { Suspense } from "react";
import { io } from "next/cache";
import { getPersianDate } from "@/lib/auth";
import CompleteProfile from "@/app/complete-profile/CompleteProfile";

async function ProfileContent() {
  await io();
  return <CompleteProfile currentYear={getPersianDate().year} />;
}
export default function ProfileEditor() {
  return <Suspense fallback={<p style={{ textAlign: "center", padding: 32 }}>در حال آماده‌سازی فرم…</p>}><ProfileContent /></Suspense>;
}
