import type { Metadata } from "next";
import InteractivePractice from "./InteractivePractice";

export const metadata: Metadata = { title: "تمرین تعاملی" };

export default function InteractivePracticePage() {
  return <InteractivePractice />;
}
