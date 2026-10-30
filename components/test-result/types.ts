export type ResultSkillId = "listening" | "grammar" | "vocabulary" | "reading" | "writing" | "speaking";

export type SkillResult = {
  id: ResultSkillId;
  score: number;
};

export type TestResultData = {
  score: number;
  message: string;
  skills: readonly SkillResult[];
};

export type TestResultProps = {
  result: TestResultData;
  backHref?: string;
  onDownloadCertificate?: () => void;
};
