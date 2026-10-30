import type { Metadata } from "next";
import Courses from "@/components/course/Courses";
import { sampleCourses } from "./data";

export const metadata: Metadata = { title: "دوره‌های آموزش زبان انگلیسی" };

export default function CoursePage() {
  return <Courses courses={sampleCourses} />;
}
