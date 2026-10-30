import type { Metadata } from "next";
import WritingPractice from "./WritingPractice";

export const metadata: Metadata = { title: "تمرین نوشتاری" };

export default function WritingPracticePage() {
  return <WritingPractice />;
}
