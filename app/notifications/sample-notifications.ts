import type { NotificationItem } from "@/components/notifications/types";

// Demo content; replace with the notifications API when available.
export const sampleNotifications: NotificationItem[] = [
  { id: "new-lesson", category: "system", title: "درس جدید در دسترس است", description: "درس جدیدت آماده‌ست! امروز چند واژهٔ تازه یاد بگیر و یک قدم دیگر به هدفت نزدیک شو.", time: "۱۴:۲۱", dateTime: "2026-10-30T14:21:00+03:30", tone: "blue" },
  { id: "study-streak", category: "reminder", title: "۷ روز متوالی مطالعه", description: "آفرین! هفت روز پشت سر هم تمرین کردی. با یک تمرین کوتاه، زنجیرهٔ یادگیری‌ات را ادامه بده.", time: "۱۴:۱۴", dateTime: "2026-10-30T14:14:00+03:30", tone: "purple" },
  { id: "level-test", category: "system", title: "نتیجه آزمون سطح A2 آماده است", description: "نتیجهٔ آزمون تعیین سطح تو آماده است. می‌توانی نمره و عملکردت را در صفحهٔ نتیجهٔ آزمون ببینی.", time: "۱۴:۱۲", dateTime: "2026-10-30T14:12:00+03:30", tone: "purple" },
  { id: "weekly-summary", category: "message", title: "پیشنهاد درس براساس عملکرد شما", description: "با توجه به تمرین‌های اخیرت، پیشنهاد می‌کنیم امروز روی شنیداری و مرور واژه‌های جدید تمرکز کنی.", time: "۱۳:۵۵", dateTime: "2026-10-30T13:55:00+03:30", tone: "amber" },
  { id: "subscription", category: "message", title: "اشتراک شما تمدید شد", description: "این یک پیام نمایشی دربارهٔ تمدید اشتراک است؛ در نسخهٔ فعلی پرداخت یا تمدید واقعی انجام نمی‌شود.", time: "۱۳:۴۷", dateTime: "2026-10-30T13:47:00+03:30", tone: "blue" },
];
