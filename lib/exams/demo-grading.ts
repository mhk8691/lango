// DEMO ONLY: production answer keys and grading must live on the backend.
import { isCorrectOrder } from "@/components/exercises/drag-and-drop/order-utils";
import { isCompleteAnswer } from "@/components/exam/exam-utils";
import type { ExamAttempt, ExamDefinition, ExamResult } from "@/components/exam/types";

export const placementDemoKey: Record<string, string | readonly string[]> = {
  "grammar-1": "studies", "listen-1": "restaurant", "sentence-1": "between",
  "order-1": ["i", "go", "to", "school"], "grammar-2": "would", "listen-2": "half",
  "sentence-2": "left", "order-2": ["i-first", "think", "i-second", "can", "do", "it"],
};
export function gradeDemoExam(definition: ExamDefinition, attempt: ExamAttempt, key: Record<string, string | readonly string[]>): ExamResult {
  if (attempt.examId !== definition.id || attempt.version !== definition.version) throw new Error("Exam version mismatch");
  const validIds = new Set(definition.questions.map(question => question.id));
  const responseIds = attempt.answers.map(answer => answer.questionId);
  if (new Set(responseIds).size !== responseIds.length || responseIds.some(id => !validIds.has(id))) throw new Error("Invalid answer IDs");
  const answers = new Map(attempt.answers.map(item => [item.questionId, item.answer]));
  const skillScores = new Map<ExamDefinition["questions"][number]["skill"], { total: number; correct: number }>();
  let correctCount = 0, objectiveCount = 0, answeredObjective = 0, answeredCount = 0, pendingReviewCount = 0;
  for (const question of definition.questions) {
    const answer = answers.get(question.id);
    const complete = isCompleteAnswer(question, answer);
    if (complete) answeredCount++;
    if (question.kind === "writing" || question.kind === "speaking") { if (complete) pendingReviewCount++; continue; }
    objectiveCount++;
    const skill = skillScores.get(question.skill) ?? { total: 0, correct: 0 };
    skill.total++;
    skillScores.set(question.skill, skill);
    const correct = key[question.id];
    if (!correct) throw new Error("Missing demo grading key");
    if (!complete || !answer) continue;
    answeredObjective++;
    if (question.kind === "drag-and-drop" && answer.kind === "order" && typeof correct !== "string") {
      if (isCorrectOrder(question.content.tokens, answer.tokenIds, correct)) { correctCount++; skill.correct++; }
    } else if (answer.kind === "choice" && typeof correct === "string" && answer.optionId === correct) { correctCount++; skill.correct++; }
  }
  const score = answeredObjective ? Math.round(correctCount / Math.max(1, objectiveCount) * 100) : null;
  return {
    skills: [...skillScores].map(([id, value]) => ({ id, score: Math.round(value.correct / value.total * 100) })),
    score, correctCount, objectiveCount, answeredCount, questionCount: definition.questions.length, pendingReviewCount,
    message: pendingReviewCount ? "پاسخ‌ها ثبت شدند. نمرهٔ نمایش‌داده‌شده فقط مربوط به سؤال‌های خودکار است؛ ارزیابی نوشته و صدا در این نسخه فعال نیست." : "نتیجه فقط بر اساس سؤال‌های خودکار است. پاسخ‌های نوشته و صدا در این نوبت کامل ثبت نشده‌اند.",
    estimatedLevel: definition.id === "placement" && score !== null && answeredObjective === objectiveCount ? score < 50 ? "A1" : score < 80 ? "A2" : "B1" : undefined,
  };
}
