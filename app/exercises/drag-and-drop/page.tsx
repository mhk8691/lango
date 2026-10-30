import type { Metadata } from "next";
import DragAndDropPractice from "./DragAndDropPractice";

export const metadata: Metadata = { title: "تمرین کشیدن و چیدن" };

export default function DragAndDropPracticePage() {
  return <DragAndDropPractice />;
}
