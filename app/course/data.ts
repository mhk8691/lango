import type { Course } from "@/components/course-card";

export const sampleCourses: readonly Course[] = [
  { id: "1", title: "English Starter", levelLabel: "Pre-A1", levels: ["Pre-A1", "A1"], description: "شروعی ساده برای یادگیری زبان", image: "/images/exercises/interactive/london-bank.png", imageAlt: "برج بیگ بن و ساختمان پارلمان لندن", progress: 12, href: "/course/1" },
  { id: "2", title: "Elementary", levelLabel: "A1 - A2", levels: ["A1", "A2"], description: "مهارت‌های پایه برای مکالمه", image: "/images/courses/london-bus.png", imageAlt: "اتوبوس دوطبقهٔ قرمز در خیابان لندن", progress: 18, href: "/course/2" },
  { id: "3", title: "Intermediate", levelLabel: "B1 - B2", levels: ["B1", "B2"], description: "تقویت مهارت‌های زبان انگلیسی", image: "/images/exercises/sentence-completion/street-park.png", imageAlt: "خیابانی با ساختمان‌های تاریخی و درختان سبز", progress: 8, href: "/course/3" },
];

export type CourseDetails = {
  overview: string;
  outcomes: readonly string[];
  chapters: readonly { title: string; lessons: readonly { title: string; preview?: boolean }[] }[];
};

export const courseDetails: Record<string, CourseDetails> = {
  "1": {
    overview: "از اولین واژه‌ها شروع کن و قدم‌به‌قدم برای مکالمه‌های روزمره آماده شو. این دوره برای کسانی طراحی شده که می‌خواهند پایهٔ زبان انگلیسی را با توضیح ساده، گفت‌وگو و تمرین بسازند.",
    outcomes: ["معرفی خود و احوال‌پرسی", "شناخت واژه‌های پرکاربرد", "ساخت جمله‌های کوتاه انگلیسی", "پرسیدن آدرس و شناخت مکان‌های شهر"],
    chapters: [
      { title: "اولین قدم‌ها", lessons: [{ title: "سلام و احوال‌پرسی" }, { title: "معرفی خود" }, { title: "اعداد و واژه‌های روزمره" }] },
      { title: "انگلیسی در زندگی روزمره", lessons: [{ title: "مکان‌های شهر", preview: true }, { title: "پرسیدن آدرس" }, { title: "مرور و تمرین" }] },
    ],
  },
  "2": {
    overview: "پایه‌های زبانت را محکم‌تر کن و در موقعیت‌های روزمره با اطمینان بیشتری صحبت کن. در این دوره روی واژگان کاربردی، جمله‌سازی و درک مکالمه‌های کوتاه تمرکز می‌کنیم.",
    outcomes: ["صحبت دربارهٔ برنامهٔ روزانه", "پرسیدن و دادن آدرس", "سفارش در کافه و رستوران", "درک مکالمه‌های کوتاه"],
    chapters: [
      { title: "مکالمه در شهر", lessons: [{ title: "مکان‌های شهر", preview: true }, { title: "مسیرها و نشانی‌ها" }, { title: "خرید و قیمت‌ها" }] },
      { title: "عادت‌های روزمره", lessons: [{ title: "برنامهٔ یک روز" }, { title: "در کافه" }, { title: "مرور و تمرین" }] },
    ],
  },
  "3": {
    overview: "از جمله‌های ساده فراتر برو و مهارت بیان نظرت را تقویت کن. این دوره برای گسترش دایرهٔ واژگان، درک مطلب و مکالمه در موقعیت‌های متنوع‌تر طراحی شده است.",
    outcomes: ["بیان نظر و توضیح دلیل", "درک متن‌های طولانی‌تر", "توصیف تجربه‌ها و برنامه‌ها", "استفاده از ساختارهای متنوع‌تر"],
    chapters: [
      { title: "ارتباط در موقعیت‌های واقعی", lessons: [{ title: "گفت‌وگو دربارهٔ تجربه‌ها" }, { title: "توصیف شهر و محله" }, { title: "مرور مکان‌های شهر", preview: true }] },
      { title: "گسترش مهارت‌ها", lessons: [{ title: "بیان نظر" }, { title: "روایت یک داستان" }, { title: "مرور و تمرین" }] },
    ],
  },
};
