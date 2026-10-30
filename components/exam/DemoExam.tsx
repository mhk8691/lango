"use client";

import { useSearchParams } from "next/navigation";
import { useAppRouter as useRouter } from "@/components/AppLink";
import ExamRunner from "./ExamRunner";
import { gradeDemoExam, placementDemoKey } from "@/lib/exams/demo-grading";
import type { ExamDefinition, ExamSubmit } from "./types";

export default function DemoExam({ definition }: { definition: ExamDefinition }) {
  const router = useRouter();
  const search = useSearchParams();
  const level = search.get("level");
  const initialLevel = level && ["A1", "A2", "B1", "B2", "C1", "C2"].includes(level) ? level : undefined;
  const submit: ExamSubmit = async (attempt, { signal }) => {
    signal.throwIfAborted();
    // Replace this adapter with an API call using examAttemptFormData(attempt).
    const result = gradeDemoExam(definition, attempt, placementDemoKey);
    signal.throwIfAborted();
    return result;
  };
  return <ExamRunner definition={definition} initialLevel={initialLevel} onSubmit={submit} onExit={() => router.push("/tests")} />;
}
