export const dailyPlan = [
  { id: "words", title: "New Words — Places", minutes: 15, action: "شروع", href: "/dashboard/lesson", tone: "#fff0dc" },
  { id: "listening", title: "Listening Practice", minutes: 20, action: "ادامه", href: "/dashboard/exercises/listening", tone: "#eeebff" },
  { id: "grammar", title: "Grammar — Present Simple", minutes: 15, action: "شروع", href: "/dashboard/exam/grammar", tone: "#fff2dc" },
] as const;
export const weeklyActivity = {
  current: [{ label: "شنبه", hours: 2, lessons: 1 }, { label: "یکشنبه", hours: 3, lessons: 2 }, { label: "دوشنبه", hours: 3.2, lessons: 2 }, { label: "سه‌شنبه", hours: 2.4, lessons: 1 }, { label: "چهارشنبه", hours: 3.5, lessons: 3 }, { label: "پنجشنبه", hours: 2.4, lessons: 1 }, { label: "جمعه", hours: 4.2, lessons: 2 }],
  previous: [{ label: "شنبه", hours: 1.3, lessons: 1 }, { label: "یکشنبه", hours: 2, lessons: 1 }, { label: "دوشنبه", hours: 1.6, lessons: 1 }, { label: "سه‌شنبه", hours: 2.3, lessons: 2 }, { label: "چهارشنبه", hours: 2.6, lessons: 2 }, { label: "پنجشنبه", hours: 1.5, lessons: 1 }, { label: "جمعه", hours: 3, lessons: 2 }],
};
