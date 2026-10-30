import type { ExerciseOption } from "../shared/types";

export type ListeningQuestion = {
  id: string;
  prompt: string;
  audio: { src: string; waveform?: readonly number[] };
  options: readonly [ExerciseOption, ExerciseOption, ExerciseOption, ExerciseOption];
  correctOptionId: string;
};

export type ListeningExerciseProps = {
  question: ListeningQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  onExit?: () => void;
};
