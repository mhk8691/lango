export type SpeakingQuestion = {
  id: string;
  prompt: string;
  description: string;
};

export type SpeakingRecording = {
  blob: Blob;
  /** This object URL is released when the exercise unmounts or a new recording replaces it. */
  url: string;
  duration: number;
  mimeType: string;
  waveform?: readonly number[];
};

export type SpeakingExerciseProps = {
  question: SpeakingQuestion;
  maxDurationSeconds?: number;
  onBusyChange?: (busy: boolean) => void;
  onRecorded?: (recording: SpeakingRecording) => void;
  onContinue?: (recording: SpeakingRecording) => void;
  onExit?: () => void;
};
