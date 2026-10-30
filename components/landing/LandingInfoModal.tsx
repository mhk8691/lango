"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import Modal from "@/components/Modal";
import Link from "@/components/AppLink";

export type InfoTopic = "about" | "articles" | "privacy" | "terms" | "contact" | "downloads" | "social";
const titles: Record<InfoTopic, string> = { about: "دربارهٔ لنگو", articles: "یادداشت‌های یادگیری", privacy: "حریم خصوصی", terms: "راهنمای استفاده", contact: "ارتباط با لنگو", downloads: "لنگو در کنار شما", social: "شبکه‌های اجتماعی لنگو" };
export default function LandingInfoModal({ topic, onClose }: { topic: InfoTopic | null; onClose: () => void }) {
  return <Modal open={topic !== null} onClose={onClose} title={topic ? titles[topic] : "لنگو"} actions={<Button onClick={onClose}>بستن</Button>}><Stack spacing={2} sx={{ "& p": { lineHeight: 2.2, color: "#6c7f9c", fontSize: 14 } }}>
    {topic === "about" && <><Typography>لنگو، یک همراه برای یادگیری انگلیسی است؛ از پیدا کردن سطح شروع تا تمرین شنیداری، مکالمه، نوشتن و مرور واژه‌ها. هدف ما این است که قدم‌های کوچک یادگیری، بخشی از زندگی روزمره شوند.</Typography><Button component={Link} href="/onboarding" onClick={onClose}>آشنایی با لنگو</Button></>}
    {topic === "articles" && [{ title: "هر روز کم، اما پیوسته", text: "یک زمان کوتاه و مشخص برای تمرین انتخاب کن. مرور چند واژه و گوش دادن به یک گفت‌وگوی کوتاه، شروع خوبی برای ساختن یک عادت است." }, { title: "واژه را در جمله یاد بگیر", text: "کنار معنی هر واژه، یک مثال بنویس. در لنگو می‌توانی واژه‌های درس را ذخیره کنی یا واژه‌های شخصی خودت را همراه با مثال اضافه کنی." }, { title: "صدای خودت را دوباره بشنو", text: "یک معرفی کوتاه ضبط کن، آن را گوش بده و بار دیگر امتحان کن. تمرین تکراریِ جمله‌های ساده کمک می‌کند با اطمینان بیشتری صحبت کنی." }].map(item => <Box key={item.title}><Typography component="h3" sx={{ color: "#233e68", fontWeight: 700, mb: 0.5 }}>{item.title}</Typography><Typography>{item.text}</Typography></Box>)}
    {topic === "privacy" && <Typography>در نسخهٔ فعلی، اطلاعات پروفایل، علاقه‌مندی‌ها و واژه‌های شخصی در حافظهٔ مرورگر نگهداری می‌شوند. میکروفون فقط هنگام شروع تمرین و با اجازهٔ تو فعال می‌شود. پاسخ‌های صوتی آزمون در همین صفحه نگهداری می‌شوند و در نسخهٔ نمایشی به سرور ارسال نمی‌شوند.</Typography>}
    {topic === "terms" && <Typography>این نسخه برای تجربهٔ رابط و تمرین‌های آموزشی آماده شده است. نتایج تعیین سطح غیررسمی‌اند و قیمت‌های اشتراک نمایشی هستند. پرداخت، صدور مدرک و ارزیابی تخصصی هوش مصنوعی پس از اتصال سرویس‌های مربوط فعال می‌شوند.</Typography>}
    {topic === "contact" && <><Typography>راه ارتباطی رسمی تیم لنگو هنوز به این نسخه اضافه نشده است. برای مرور راهنمای موجود، می‌توانی به بخش تنظیمات اپ بروی.</Typography><Button component={Link} href="/dashboard/settings" onClick={onClose}>راهنما و تنظیمات</Button></>}
    {(topic === "downloads" || topic === "social") && <><Typography>{topic === "downloads" ? "نسخهٔ وب همین حالا در موبایل، تبلت و کامپیوتر قابل استفاده است. لینک رسمی اپ‌استور و گوگل‌پلی پس از انتشار اپلیکیشن اضافه می‌شود." : "آدرس کانال‌های رسمی لنگو هنوز اضافه نشده است. تا آن زمان، مسیر یادگیری‌ات را از نسخهٔ وب شروع کن."}</Typography><Button component={Link} href="/onboarding" onClick={onClose} variant="contained">شروع با نسخهٔ وب</Button></>}
  </Stack></Modal>;
}
