import type { InteractiveQuestion } from "@/components/exercises/interactive/types";
import type { ListeningQuestion } from "@/components/exercises/listening/types";
import type { SentenceCompletionQuestion } from "@/components/exercises/sentence-completion/types";
import type { DragAndDropQuestion } from "@/components/exercises/drag-and-drop/types";
import type { WritingQuestion } from "@/components/exercises/writing/types";
import type { SpeakingQuestion } from "@/components/exercises/speaking/types";

type Base = { id: string; skill: "grammar" | "vocabulary" | "reading" | "listening" | "writing" | "speaking" };
/** Public question DTOs deliberately contain no grading keys. */
export type ExamQuestion = Base & (
  | { kind: "interactive"; content: Omit<InteractiveQuestion, "correctOptionId" | "explanation"> }
  | { kind: "listening"; content: Omit<ListeningQuestion, "correctOptionId"> }
  | { kind: "sentence-completion"; content: Omit<SentenceCompletionQuestion, "correctOptionId" | "explanation"> }
  | { kind: "drag-and-drop"; content: Omit<DragAndDropQuestion, "correctOrder"> }
  | { kind: "writing"; content: WritingQuestion }
  | { kind: "speaking"; content: SpeakingQuestion; maxDurationSeconds?: number }
);
export type ExamDefinition = { id: string; version: string; title: string; description: string; questions: readonly ExamQuestion[]; demo?: boolean };
export type ExamAnswer =
  | { kind: "choice"; optionId: string }
  | { kind: "order"; tokenIds: readonly string[] }
  | { kind: "writing"; text: string }
  | { kind: "speaking"; blob: Blob; duration: number; mimeType: string };
export type ExamAnswers = Record<string, ExamAnswer | undefined>;
export type ExamAttempt = {
  examId: string;
  version: string;
  submissionId: string;
  startedAt: string;
  submittedAt: string;
  initialLevel?: string;
  answers: readonly { questionId: string; answer: ExamAnswer }[];
};
export type ExamResult = {
  skills?: readonly import("@/components/test-result/types").SkillResult[];
  score: number | null;
  correctCount: number;
  objectiveCount: number;
  answeredCount: number;
  questionCount: number;
  pendingReviewCount: number;
  message: string;
  estimatedLevel?: string;
};
export type ExamSubmit = (attempt: ExamAttempt, context: { signal: AbortSignal }) => Promise<ExamResult>;
export type ExamRunnerProps = { definition: ExamDefinition; onSubmit: ExamSubmit; onExit: () => void; initialLevel?: string };
