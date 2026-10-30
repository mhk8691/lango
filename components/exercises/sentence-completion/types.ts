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
  question: SentenceCompletionQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  onExit?: () => void;
};
