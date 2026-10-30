import type { Metadata } from "next";
import ProgressReport from "@/components/progress-report";
import { sampleProgress } from "./sample-progress";

export const metadata: Metadata = { title: "گزارش پیشرفت" };

export default function ProgressPage() {
  return <ProgressReport report={sampleProgress} />;
}
