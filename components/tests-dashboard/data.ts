export const categories = [
  { id: "all", label: "همهٔ آزمون‌ها" }, { id: "placement", label: "تعیین سطح" },
  { id: "vocabulary", label: "واژگان" }, { id: "grammar", label: "گرامر" },
  { id: "listening", label: "شنیداری" }, { id: "reading", label: "خواندن" },
  { id: "writing", label: "نوشتن" }, { id: "speaking", label: "مکالمه" },
] as const;
export type TestCategory = typeof categories[number]["id"];
export type TestIcon = "placement" | "listening" | "reading" | "vocabulary" | "speaking" | "writing" | "grammar" | "mock" | "certificate";
export type TestItem = { id: TestIcon; category: TestCategory; title: string; description: string; duration: string; format: string; href?: string; recommended?: boolean };
export const tests: readonly TestItem[] = [
  { id: "placement", category: "placement", title: "آزمون تعیین سطح", description: "سطح زبانت را بسنج و مسیر مناسب یادگیری را پیدا کن.", duration: "بدون محدودیت", format: "۱۰ سؤال", href: "/placement-test", recommended: true },
  { id: "listening", category: "listening", title: "آزمون مهارت شنیداری", description: "درک شنیداری خود را با فایل‌های صوتی واقعی تقویت کن.", duration: "بدون محدودیت", format: "۲ سؤال", href: "/exam/listening" },
  { id: "reading", category: "reading", title: "آزمون مهارت خواندن", description: "درک مطلب و سرعت خواندن خود را بسنج.", duration: "بدون محدودیت", format: "۱ سؤال", href: "/exam/reading" },
  { id: "writing", category: "writing", title: "آزمون مهارت نوشتن", description: "توانایی نوشتن خود را با موضوعات کاربردی ارزیابی کن.", duration: "بدون محدودیت", format: "۱ سؤال", href: "/exam/writing" },
  { id: "speaking", category: "speaking", title: "آزمون مهارت مکالمه", description: "برای تمرین بیان و تلفظ، صدایت را ضبط و بازپخش کن.", duration: "بدون محدودیت", format: "۱ سؤال", href: "/exam/speaking" },
  { id: "vocabulary", category: "vocabulary", title: "آزمون واژگان", description: "دامنهٔ واژگان خود را در موقعیت‌های مختلف بسنج.", duration: "بدون محدودیت", format: "۲ سؤال", href: "/exam/vocabulary" },
  { id: "grammar", category: "grammar", title: "آزمون گرامر", description: "دانش گرامری خود را با جمله‌سازی و تمرین مرور کن.", duration: "بدون محدودیت", format: "۳ سؤال", href: "/exam/grammar" },
  { id: "mock", category: "placement", title: "آزمون شبیه‌سازی IELTS", description: "آمادگی برای ساختار و مهارت‌های آزمون آیلتس.", duration: "۶۰ دقیقه", format: "۴ بخش" },
  { id: "certificate", category: "placement", title: "آزمون دریافت مدرک", description: "ارزیابی نهایی و دریافت گواهی پس از تکمیل دوره.", duration: "۴۵ دقیقه", format: "ارزیابی نهایی" },
];
export const skills = [
  { id: "listening", label: "شنیداری", value: 75, color: "#25c78c" },
  { id: "reading", label: "خواندن", value: 68, color: "#229eff" },
  { id: "writing", label: "نوشتن", value: 58, color: "#ffbe57" },
  { id: "speaking", label: "مکالمه", value: 65, color: "#a35bff" },
  { id: "grammar", label: "گرامر", value: 72, color: "#ff618e" },
  { id: "vocabulary", label: "واژگان", value: 60, color: "#0867ff" },
] as const;
export const recentResults = [
  { id: "r1", title: "آزمون تعیین سطح", icon: "placement", score: 84, date: "۱۴۰۵/۰۸/۰۸", detail: "A2 - Elementary" },
  { id: "r2", title: "آزمون واژگان", icon: "vocabulary", score: 76, date: "۱۴۰۵/۰۷/۲۱", detail: "امتیاز ۷۶ از ۱۰۰" },
  { id: "r3", title: "آزمون شنیداری", icon: "listening", score: 85, date: "۱۴۰۵/۰۷/۱۰", detail: "۳۴ از ۴۰ پاسخ درست" },
  { id: "r4", title: "آزمون گرامر", icon: "grammar", score: 70, date: "۱۴۰۵/۰۶/۲۵", detail: "۲۸ از ۴۰ پاسخ درست" },
  { id: "r5", title: "آزمون خواندن", icon: "reading", score: 80, date: "۱۴۰۵/۰۶/۱۸", detail: "۱۶ از ۲۰ پاسخ درست" },
  { id: "r6", title: "آزمون نوشتن", icon: "writing", score: 58, date: "۱۴۰۵/۰۶/۰۵", detail: "نیاز به تمرین بیشتر" },
] as const;
export type RecentResult = typeof recentResults[number];
