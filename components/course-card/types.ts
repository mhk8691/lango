export type CourseLevel = "Pre-A1" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type CourseCardProps = {
  /** Enables the shared favorite button when a stable course ID is supplied. */
  courseId?: string;
  title: string;
  levelLabel: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Completion percentage, clamped to 0–100. */
  progress: number;
  href: string;
  actionLabel?: string;
};

export type Course = CourseCardProps & {
  id: string;
  levels: readonly CourseLevel[];
};
