import type { Metadata } from "next";
import Favorites from "@/components/favorites/Favorites";
import { sampleCourses } from "../course/data";

export const metadata: Metadata = { title: "علاقه‌مندی‌ها" };

export default function FavoritesPage() {
  return <Favorites courses={sampleCourses} />;
}
