export type WordToken = { id: string; text: string };

export type DragAndDropQuestion = {
  id: string;
  instruction?: string;
  tokens: readonly [WordToken, ...WordToken[]];
  correctOrder: readonly string[];
};

export type DragAndDropExerciseProps = {
  question: DragAndDropQuestion;
  value: readonly string[];
  onChange: (order: string[]) => void;
  questionNumber: number;
  totalQuestions: number;
  onNext: () => void;
  onPrevious: () => void;
  onExit?: () => void;
};
