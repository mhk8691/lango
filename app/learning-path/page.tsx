import type { Metadata } from "next";
import LearningPath from "@/components/learning-path/LearningPath";

export const metadata: Metadata = { title: "مسیر یادگیری من" };

export default function LearningPathPage() {
  return <LearningPath />;
}
