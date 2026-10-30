export type WritingQuestion = {
  id: string;
  prompt: string;
  placeholder?: string;
  minWords?: number;
  maxWords?: number;
};

export type WritingFeedback = {
  summary: string;
  correctedText?: string;
  suggestions?: readonly string[];
};

export type WritingExerciseProps = {
  /** Hides practice feedback/navigation when hosted by the shared exam runner. */
  examMode?: boolean;
  question: WritingQuestion;
  value: string;
  onChange: (value: string) => void;
  questionNumber?: number;
  totalQuestions?: number;
  onExit?: () => void;
  onReview?: (request: { question: WritingQuestion; text: string; signal: AbortSignal }) => Promise<WritingFeedback>;
};
