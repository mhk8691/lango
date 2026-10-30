import type { Metadata } from "next";
import SentenceCompletionPractice from "./SentenceCompletionPractice";

export const metadata: Metadata = { title: "تمرین تکمیل جمله" };

export default function SentenceCompletionPage() {
  return <SentenceCompletionPractice />;
}
