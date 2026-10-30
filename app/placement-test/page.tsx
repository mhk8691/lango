import type { Metadata } from "next";
import PlacementIntro from "./PlacementIntro";

export const metadata: Metadata = { title: "آزمون تعیین سطح" };

export default function PlacementTestPage() {
  return <PlacementIntro />;
}
