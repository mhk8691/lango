import type { Metadata } from "next";
import TestsDashboard from "@/components/tests-dashboard/TestsDashboard";

export const metadata: Metadata = { title: "آزمون‌های زبان" };

export default function TestsPage() {
  return <TestsDashboard />;
}
