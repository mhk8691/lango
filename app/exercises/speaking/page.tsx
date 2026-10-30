import type { Metadata } from "next";
import SpeakingPractice from "./SpeakingPractice";

export const metadata: Metadata = { title: "تمرین مکالمه" };

export default function SpeakingPracticePage() {
  return <SpeakingPractice />;
}
