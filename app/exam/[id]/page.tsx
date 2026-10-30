import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DemoExam from "@/components/exam/DemoExam";
import { examDefinitions } from "@/lib/exams/catalog";

export function generateStaticParams() { return examDefinitions.map(exam => ({ id: exam.id })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return { title: examDefinitions.find(exam => exam.id === id)?.title ?? "آزمون پیدا نشد" };
}
export default async function ExamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const definition = examDefinitions.find(exam => exam.id === id);
  if (!definition) notFound();
  return <Suspense fallback={<p>در حال آماده‌سازی آزمون…</p>}><DemoExam definition={definition} /></Suspense>;
}
