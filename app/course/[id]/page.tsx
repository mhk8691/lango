import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseDetail from "@/components/course-detail/CourseDetail";
import { courseDetails, sampleCourses } from "../data";

export function generateStaticParams() {
  return sampleCourses.map(course => ({ id: course.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const course = sampleCourses.find(item => item.id === id);
  return { title: course ? `دورهٔ ${course.title}` : "دوره پیدا نشد" };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = sampleCourses.find(item => item.id === id);
  const details = courseDetails[id];
  if (!course || !details) notFound();
  return <CourseDetail course={course} details={details} />;
}
