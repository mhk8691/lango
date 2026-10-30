import type { TestResultData } from "@/components/test-result";

// Design-preview data only. Real assessment results can be passed to TestResult later.
export const sampleResult = {
  score: 84,
  message: "عملکرد عالی!",
  skills: [
    { id: "listening", score: 88 },
    { id: "grammar", score: 76 },
    { id: "vocabulary", score: 90 },
    { id: "reading", score: 82 },
    { id: "writing", score: 80 },
  ],
} as const satisfies TestResultData;
