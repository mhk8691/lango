export type Achievement = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: "trophy" | "flame" | "lesson";
  unlocked: boolean;
};

// Sample achievements until learner progress is supplied by the backend.
export const sampleAchievements: readonly Achievement[] = [
  { id: "words-50", title: "۵۰ واژه", subtitle: "واژه‌های انگلیسی", description: "با یادگیری ۵۰ واژهٔ انگلیسی، اولین گنجینهٔ واژگانت را ساختی.", icon: "trophy", unlocked: true },
  { id: "streak-7", title: "۷ روز متوالی", subtitle: "مطالعهٔ منظم", description: "هفت روز پشت سر هم تمرین کردی و به مسیر یادگیری‌ات وفادار ماندی.", icon: "flame", unlocked: true },
  { id: "first-lesson", title: "اولین درس", subtitle: "پایان یک شروع", description: "اولین درس را به پایان رساندی؛ این نشان، یادگار اولین قدم توست.", icon: "lesson", unlocked: true },
  { id: "perfect-score", title: "امتیاز کامل", subtitle: "هنوز قفل است", description: "برای دریافت این نشان، یک تمرین را با امتیاز کامل به پایان برسان.", icon: "trophy", unlocked: false },
  { id: "words-100", title: "۱۰۰ درس", subtitle: "هنوز قفل است", description: "با به پایان رساندن ۱۰۰ درس، این دستاورد را دریافت می‌کنی.", icon: "lesson", unlocked: false },
  { id: "level-a2", title: "تکمیل سطح A2", subtitle: "هنوز قفل است", description: "تمام درس‌های سطح A2 را کامل کن تا این نشان برایت باز شود.", icon: "trophy", unlocked: false },
  { id: "streak-30", title: "۳۰ روز متوالی", subtitle: "هنوز قفل است", description: "۳۰ روز پیاپی تمرین کن و عادت یادگیری‌ات را ماندگار کن.", icon: "flame", unlocked: false },
  { id: "words-500", title: "۵۰۰ واژه", subtitle: "هنوز قفل است", description: "با یادگیری ۵۰۰ واژهٔ انگلیسی این نشان را دریافت می‌کنی.", icon: "trophy", unlocked: false },
  { id: "level-b1", title: "تکمیل سطح B1", subtitle: "هنوز قفل است", description: "با تکمیل درس‌های سطح B1، این دستاورد به مجموعه‌ات اضافه می‌شود.", icon: "lesson", unlocked: false },
];
