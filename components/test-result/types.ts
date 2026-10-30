import type { ReactNode } from "react";

export type ResultSkillId = "listening" | "grammar" | "vocabulary" | "reading" | "writing" | "speaking";

export type SkillResult = {
  id: ResultSkillId;
  score: number;
};

export type TestResultData = {
  score: number | null;
  message: string;
  skills: readonly SkillResult[];
};

export type TestResultProps = {
  result: TestResultData;
  backHref?: string;
  backLabel?: string;
  onBack?: () => void;
  title?: string;
  scoreLabel?: string;
  children?: ReactNode;
  actions?: ReactNode;
  onDownloadCertificate?: () => void;
};
