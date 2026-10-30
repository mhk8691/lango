import type { ExerciseOption } from "../shared/types";

export type InteractiveOption = ExerciseOption;

export type InteractiveQuestion = {
  id: string;
  prompt: string;
  image?: { src: string; alt: string };
  options: readonly [InteractiveOption, InteractiveOption, InteractiveOption, InteractiveOption];
  correctOptionId: string;
  explanation?: string;
};

export type InteractiveExerciseProps = {
  /** Hides practice feedback/navigation when hosted by the shared exam runner. */
  examMode?: boolean;
  question: Omit<InteractiveQuestion, "correctOptionId"> & { correctOptionId?: string };
  questionNumber: number;
  totalQuestions: number;
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  onExit?: () => void;
};
