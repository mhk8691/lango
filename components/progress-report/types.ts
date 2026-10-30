export type ProgressPeriod = "day" | "week" | "month" | "all";

export type ProgressPoint = {
  label: string;
  shortLabel?: string;
  value: number;
};

export type ProgressSnapshot = {
  points: readonly ProgressPoint[];
  studyMinutes: number;
  newWords: number;
  streakDays: number;
  growthPercent: number;
};

export type ProgressReportData = Record<ProgressPeriod, ProgressSnapshot>;

export type ProgressReportProps = {
  report: ProgressReportData;
  initialPeriod?: ProgressPeriod;
  backHref?: string;
};
