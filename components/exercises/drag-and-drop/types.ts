export type WordToken = { id: string; text: string };

export type DragAndDropQuestion = {
  id: string;
  instruction?: string;
  tokens: readonly [WordToken, ...WordToken[]];
  correctOrder: readonly string[];
};

export type DragAndDropExerciseProps = {
  /** Hides practice feedback/navigation when hosted by the shared exam runner. */
  examMode?: boolean;
  question: Omit<DragAndDropQuestion, "correctOrder"> & { correctOrder?: readonly string[] };
  value: readonly string[];
  onChange: (order: string[]) => void;
  questionNumber: number;
  totalQuestions: number;
  onNext: () => void;
  onPrevious: () => void;
  onExit?: () => void;
};
