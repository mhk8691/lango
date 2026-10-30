export const dashboardItems = [
  { id: "overview", label: "پیشخوان", href: "/dashboard", icon: "dashboard" },
  { id: "learning-path", label: "مسیر یادگیری", href: "/dashboard/learning-path", icon: "path" },
  { id: "courses", label: "دوره‌ها", href: "/dashboard/courses", icon: "courses" },
  { id: "tests", label: "آزمون‌ها", href: "/dashboard/tests", icon: "tests" },
  { id: "exercises", label: "تمرین‌ها", href: "/dashboard/exercises", icon: "exercises" },
  { id: "library", label: "کتابخانه", href: "/dashboard/library", icon: "library" },
  { id: "speaking", label: "آزمون مکالمه (AI)", href: "/dashboard/speaking", icon: "speaking" },
  { id: "vocabulary", label: "واژگان", href: "/dashboard/vocabulary", icon: "vocabulary" },
  { id: "progress", label: "گزارش پیشرفت", href: "/dashboard/progress", icon: "progress" },
  { id: "favorites", label: "علاقه‌مندی‌ها", href: "/dashboard/favorites", icon: "favorites" },
  { id: "achievements", label: "دستاوردها", href: "/dashboard/achievements", icon: "achievements" },
  { id: "notifications", label: "اعلان‌ها و پیام‌ها", href: "/dashboard/notifications", icon: "notifications" },
  { id: "subscription", label: "مدیریت اشتراک", href: "/dashboard/subscription", icon: "subscription" },
  { id: "settings", label: "تنظیمات", href: "/dashboard/settings", icon: "settings" },
] as const;
export const dashboardAliases = [
  ["/complete-profile", "/dashboard/profile/edit"],
  ["/placement-test", "/dashboard/placement-test"],
  ["/learning-path", "/dashboard/learning-path"],
  ["/notifications", "/dashboard/notifications"],
  ["/achievements", "/dashboard/achievements"],
  ["/subscription", "/dashboard/subscription"],
  ["/exercises", "/dashboard/exercises"],
  ["/vocabulary", "/dashboard/vocabulary"],
  ["/favorites", "/dashboard/favorites"],
  ["/progress", "/dashboard/progress"],
  ["/profile", "/dashboard/settings"],
  ["/course", "/dashboard/courses"],
  ["/lesson", "/dashboard/lesson"],
  ["/tests", "/dashboard/tests"],
  ["/exam", "/dashboard/exam"],
  ["/home", "/dashboard"],
] as const;
export function dashboardHref(href: string) {
  const path = href.split(/[?#]/)[0];
  const match = dashboardAliases.find(([from]) => path === from || path.startsWith(`${from}/`));
  return match ? `${match[1]}${href.slice(match[0].length)}` : href;
}
export function activeDashboardItem(path: string) {
  if (path.startsWith("/dashboard/exam/speaking")) return "speaking";
  if (path.startsWith("/dashboard/exam/") || path.startsWith("/dashboard/placement-test")) return "tests";
  if (path.startsWith("/dashboard/lesson")) return "courses";
  if (path.startsWith("/dashboard/profile/")) return "settings";
  return dashboardItems.find(item => item.href !== "/dashboard" && (path === item.href || path.startsWith(`${item.href}/`)))?.id ?? "overview";
}
