import type { ProgressReportData } from "@/components/progress-report";

// Preview data only: each range has its own series and summary metrics.
export const sampleProgress = {
  day: {
    points: [
      { label: "۶ صبح", shortLabel: "۶", value: 5 }, { label: "۹ صبح", shortLabel: "۹", value: 12 },
      { label: "۱۲ ظهر", shortLabel: "۱۲", value: 25 }, { label: "۱۵ عصر", shortLabel: "۱۵", value: 38 },
      { label: "۱۸ عصر", shortLabel: "۱۸", value: 45 }, { label: "۲۱ شب", shortLabel: "۲۱", value: 57 }, { label: "۲۴ شب", shortLabel: "۲۴", value: 66 },
    ], studyMinutes: 45, newWords: 18, streakDays: 12, growthPercent: 4,
  },
  week: {
    points: [
      { label: "شنبه", value: 22 }, { label: "یکشنبه", value: 42 }, { label: "دوشنبه", value: 35 },
      { label: "سه‌شنبه", value: 60 }, { label: "چهارشنبه", value: 62 }, { label: "پنجشنبه", value: 84 }, { label: "جمعه", value: 55 },
    ], studyMinutes: 1440, newWords: 480, streakDays: 12, growthPercent: 28,
  },
  month: {
    points: [
      { label: "روز ۱", shortLabel: "۱", value: 12 }, { label: "روز ۵", shortLabel: "۵", value: 23 }, { label: "روز ۱۰", shortLabel: "۱۰", value: 30 },
      { label: "روز ۱۵", shortLabel: "۱۵", value: 45 }, { label: "روز ۲۰", shortLabel: "۲۰", value: 53 }, { label: "روز ۲۵", shortLabel: "۲۵", value: 70 }, { label: "روز ۳۰", shortLabel: "۳۰", value: 84 },
    ], studyMinutes: 5400, newWords: 1920, streakDays: 12, growthPercent: 36,
  },
  all: {
    points: [
      { label: "فروردین", shortLabel: "فرو", value: 8 }, { label: "اردیبهشت", shortLabel: "ارد", value: 19 }, { label: "خرداد", shortLabel: "خرد", value: 32 },
      { label: "تیر", value: 48 }, { label: "مرداد", shortLabel: "مرد", value: 64 }, { label: "شهریور", shortLabel: "شهر", value: 73 }, { label: "مهر", value: 89 },
    ], studyMinutes: 9600, newWords: 3600, streakDays: 32, growthPercent: 46,
  },
} as const satisfies ProgressReportData;
