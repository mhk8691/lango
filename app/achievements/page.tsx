import type { Metadata } from "next";
import Achievements from "@/components/achievements/Achievements";
import { sampleAchievements } from "@/components/achievements/data";

export const metadata: Metadata = { title: "دستاوردها" };

export default function AchievementsPage() {
  return <Achievements items={sampleAchievements} />;
}
