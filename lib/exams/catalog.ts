import type { ExamDefinition, ExamQuestion } from "@/components/exam/types";
import { placementDemo } from "./placement-demo";

const skillTests: { id: string; title: string; skill: ExamQuestion["skill"] }[] = [
  { id: "listening", title: "آزمون شنیداری", skill: "listening" },
  { id: "reading", title: "آزمون خواندن", skill: "reading" },
  { id: "vocabulary", title: "آزمون واژگان", skill: "vocabulary" },
  { id: "grammar", title: "آزمون گرامر", skill: "grammar" },
  { id: "writing", title: "آزمون نوشتن", skill: "writing" },
  { id: "speaking", title: "آزمون مکالمه", skill: "speaking" },
];
/** Swap this local catalog for an API definition loader without changing the runner. */
export const examDefinitions: readonly ExamDefinition[] = [placementDemo, ...skillTests.map(test => ({
  id: test.id, version: "1", title: test.title, demo: true,
  description: "آزمون تمرینی نمونه؛ پاسخ‌ها را مرور کن و در پایان ثبت کن.",
  questions: placementDemo.questions.filter(question => question.skill === test.skill),
}))];
