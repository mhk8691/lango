import { questions as interactive } from "@/app/exercises/interactive/questions";
import { questions as listening } from "@/app/exercises/listening/questions";
import { questions as sentence } from "@/app/exercises/sentence-completion/questions";
import { questions as order } from "@/app/exercises/drag-and-drop/questions";
import type { ExamDefinition, ExamQuestion } from "@/components/exam/types";

function publicChoice<T extends { correctOptionId?: string; explanation?: string }>(question: T): Omit<T, "correctOptionId" | "explanation"> {
  const copy = { ...question };
  delete copy.correctOptionId;
  delete copy.explanation;
  return copy;
}
function publicOrder(question: typeof order[number]) {
  const { correctOrder, ...copy } = question;
  void correctOrder;
  return copy;
}
const questions: ExamQuestion[] = [
  { id: "grammar-1", kind: "interactive", skill: "grammar", content: publicChoice(interactive[1]) },
  { id: "listen-1", kind: "listening", skill: "listening", content: publicChoice(listening[0]) },
  { id: "sentence-1", kind: "sentence-completion", skill: "vocabulary", content: publicChoice(sentence[0]) },
  { id: "order-1", kind: "drag-and-drop", skill: "grammar", content: publicOrder(order[0]) },
  { id: "grammar-2", kind: "interactive", skill: "reading", content: { id: "conditional", prompt: "If I had more time, I _____ learn another language.", options: [{ id: "will", text: "will" }, { id: "would", text: "would" }, { id: "can", text: "can" }, { id: "am", text: "am" }] } },
  { id: "listen-2", kind: "listening", skill: "listening", content: publicChoice(listening[1]) },
  { id: "sentence-2", kind: "sentence-completion", skill: "vocabulary", content: publicChoice(sentence[1]) },
  { id: "order-2", kind: "drag-and-drop", skill: "grammar", content: publicOrder(order[2]) },
  { id: "writing-1", kind: "writing", skill: "writing", content: { id: "exam-writing", prompt: "Write a short paragraph about your daily routine and what you enjoy doing in your free time.", placeholder: "I usually start my day…", minWords: 10, maxWords: 100 } },
  { id: "speaking-1", kind: "speaking", skill: "speaking", maxDurationSeconds: 60, content: { id: "exam-speaking", prompt: "Introduce yourself.", description: "Tell us your name, where you are from, and why you want to learn English." } },
];
export const placementDemo: ExamDefinition = {
  id: "placement", version: "1", title: "آزمون تعیین سطح زبان", demo: true,
  description: "۱۰ سؤال از شش نوع تمرین؛ با امکان مرور و تغییر پاسخ‌ها پیش از ثبت نهایی.", questions,
};
