import type { ExerciseOption } from "../shared/types";

export type SentenceCompletionQuestion = {
  id: string;
  instruction?: string;
  image: { src: string; alt: string };
  sentence: { before: string; after: string };
  options: readonly [ExerciseOption, ExerciseOption, ExerciseOption, ExerciseOption];
  correctOptionId: string;
  explanation?: string;
};

export type SentenceCompletionExerciseProps = {
  /** Hides practice feedback/navigation when hosted by the shared exam runner. */
  examMode?: boolean;
  question: Omit<SentenceCompletionQuestion, "correctOptionId"> & { correctOptionId?: string };
  questionNumber: number;
  totalQuestions: number;
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  onExit?: () => void;
};
