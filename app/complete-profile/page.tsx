import { Suspense } from "react";
import type { Metadata } from "next";
import { io } from "next/cache";
import { getPersianDate } from "@/lib/auth";
import CompleteProfile from "./CompleteProfile";

export const metadata: Metadata = { title: "تکمیل پروفایل" };
async function ProfileContent() {
  await io();
  return <CompleteProfile currentYear={getPersianDate().year} />;
}

export default function CompleteProfilePage() {
  return <Suspense fallback={<p style={{ textAlign: "center", padding: 32 }}>در حال آماده‌سازی فرم…</p>}><ProfileContent /></Suspense>;
}
