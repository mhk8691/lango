export type InteractiveOption = {
  id: string;
  text: string;
};

export type InteractiveQuestion = {
  id: string;
  prompt: string;
  image?: { src: string; alt: string };
  options: readonly [InteractiveOption, InteractiveOption, InteractiveOption, InteractiveOption];
  correctOptionId: string;
  explanation?: string;
};

export type InteractiveExerciseProps = {
  question: InteractiveQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  onExit?: () => void;
};
