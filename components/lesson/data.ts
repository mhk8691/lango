export const lessons = [
  {
    id: "introductions", title: "Meeting People", subtitle: "معرفی و آشنایی",
    dialogue: [
      { speaker: "A", text: "Hello! What is your name?", translation: "سلام! اسمت چیست؟" },
      { speaker: "B", text: "My name is Sara. Nice to meet you.", translation: "اسم من ساراست. از آشنایی با تو خوشوقتم." },
      { speaker: "A", text: "Where are you from?", translation: "اهل کجا هستی؟" },
      { speaker: "B", text: "I am from Iran.", translation: "من اهل ایران هستم." },
    ],
    words: [{ word: "name", meaning: "نام" }, { word: "meet", meaning: "ملاقات کردن" }, { word: "from", meaning: "از" }],
    grammar: "برای پرسیدن نام از What is your name? و برای پرسیدن مبدأ از Where are you from? استفاده می‌کنیم.",
    homework: "در سه جمله خودت را معرفی کن و بگو اهل کجا هستی.",
  },
  {
    id: "places", title: "Places in the City", subtitle: "مکان‌های شهر",
    dialogue: [
      { speaker: "A", text: "Excuse me, is there a bank near here?", translation: "ببخشید، این نزدیکی بانک هست؟" },
      { speaker: "B", text: "Yes, there’s a bank on Main Street.", translation: "بله، در خیابان اصلی یک بانک هست." },
      { speaker: "A", text: "How can I get there?", translation: "چطور می‌توانم به آنجا بروم؟" },
      { speaker: "B", text: "Go straight, then turn right.", translation: "مستقیم برو، سپس به راست بپیچ." },
    ],
    words: [{ word: "bank", meaning: "بانک" }, { word: "street", meaning: "خیابان" }, { word: "near", meaning: "نزدیک" }, { word: "turn right", meaning: "به راست پیچیدن" }],
    grammar: "برای پرسیدن دربارهٔ وجود یک مکان از Is there…? استفاده می‌کنیم. پاسخ مثبت با There is شروع می‌شود. برای دادن آدرس، فعل امری مانند Go straight یا Turn right به کار می‌رود.",
    homework: "مسیر خانه تا نزدیک‌ترین بانک را در سه جملهٔ انگلیسی بنویس.",
  },
  {
    id: "cafe", title: "At the Café", subtitle: "در کافه",
    dialogue: [
      { speaker: "A", text: "Can I have a coffee, please?", translation: "می‌توانم یک قهوه داشته باشم، لطفاً؟" },
      { speaker: "B", text: "Of course. Would you like some milk?", translation: "حتماً. کمی شیر می‌خواهید؟" },
      { speaker: "A", text: "Yes, please. How much is it?", translation: "بله، لطفاً. قیمتش چقدر است؟" },
      { speaker: "B", text: "It is three pounds.", translation: "سه پوند است." },
    ],
    words: [{ word: "coffee", meaning: "قهوه" }, { word: "milk", meaning: "شیر" }, { word: "please", meaning: "لطفاً" }],
    grammar: "برای یک درخواست مؤدبانه می‌توانیم از Can I have… please? استفاده کنیم. برای پرسیدن قیمت، How much is it? به کار می‌رود.",
    homework: "یک گفت‌وگوی کوتاه برای سفارش نوشیدنی در کافه بنویس.",
  },
] as const;
