import type { Metadata } from "next";
import Lesson from "@/components/lesson/Lesson";

export const metadata: Metadata = { title: "درس زبان" };

export default function LessonPage() {
  return <Lesson />;
}
