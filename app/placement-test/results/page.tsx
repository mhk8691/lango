import type { Metadata } from "next";
import TestResult from "@/components/test-result";
import { sampleResult } from "./sample-result";

export const metadata: Metadata = { title: "نتیجه آزمون" };

export default function TestResultPage() {
  return <TestResult result={sampleResult} />;
}
