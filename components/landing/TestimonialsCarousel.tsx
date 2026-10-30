"use client";

import { useState } from "react";
import Image from "next/image";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import FormatQuoteRounded from "@mui/icons-material/FormatQuoteRounded";
import StarRounded from "@mui/icons-material/StarRounded";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";

const stories = [
  { title: "یک شروع ساده", role: "زبان‌آموز در شروع مسیر", quote: "وقتی درس‌ها کوتاه و تمرین‌ها متنوع باشند، شروع یادگیری راحت‌تر می‌شود. هر روز یک قدم کوچک، انگیزهٔ قدم بعدی را می‌سازد.", image: "/images/lessons/tutor.png" },
  { title: "تمرین در زمان دلخواه", role: "زبان‌آموز با برنامهٔ روزانهٔ شلوغ", quote: "داشتن یک مسیر روشن و امکان مرور واژه‌ها در موبایل، کمک می‌کند یادگیری را بین کارهای روزمره جا بدهیم.", image: "/images/onboarding/listener.png" },
  { title: "از یادگیری تا گفت‌وگو", role: "زبان‌آموز علاقه‌مند به مکالمه", quote: "گوش دادن، ضبط صدا و دوباره تلاش کردن، تجربهٔ یادگیری را ملموس‌تر می‌کند؛ مخصوصاً وقتی می‌توانیم پیشرفت خودمان را ببینیم.", image: "/images/tests/student.png" },
];
export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const story = stories[index];
  return <Box component="section" aria-label="تجربه‌های نمونهٔ یادگیری" sx={{ position: "relative", px: 2 }}><Paper elevation={0} sx={{ borderRadius: "27px", border: "1px solid #e5eefb", p: 2.75, boxShadow: "0 12px 30px #83b3df12", bgcolor: "#fff" }}><Typography sx={{ color: "#9baac1", fontSize: 10, mb: 1 }}>نمایش نمونهٔ تجربهٔ یادگیری</Typography><Stack direction="row" sx={{ alignItems: "center", gap: 2 }}><Box sx={{ flex: 1, minWidth: 0 }}><FormatQuoteRounded sx={{ color: "#167aff", fontSize: 35, transform: "rotate(180deg)" }} /><Typography aria-live="polite" sx={{ color: "#6f86a8", fontSize: 12, lineHeight: 2.1 }}>{story.quote}</Typography><Stack direction="row" aria-hidden="true" sx={{ mt: 1, gap: 0.1 }}>{Array.from({ length: 5 }, (_, i) => <StarRounded key={i} sx={{ fontSize: 17, color: "#ffb22d" }} />)}</Stack></Box><Box sx={{ width: 86, textAlign: "center", flexShrink: 0 }}><Box sx={{ position: "relative", width: 78, height: 78, borderRadius: "50%", overflow: "hidden", mx: "auto", bgcolor: "#eef5ff", mb: 1 }}><Image src={story.image} alt="تصویر نمادین زبان‌آموز" fill sizes="78px" style={{ objectFit: "cover", objectPosition: "center 25%" }} /></Box><Typography sx={{ fontSize: 12, color: "#28466f", fontWeight: 800 }}>{story.title}</Typography><Typography sx={{ fontSize: 9, color: "#8ba0bc", lineHeight: 1.8, mt: 0.5 }}>{story.role}</Typography></Box></Stack><Stack direction="row" sx={{ justifyContent: "center", gap: 0.5, mt: 1.5 }}>{stories.map((item, i) => <IconButton key={item.title} aria-label={`نمایش تجربهٔ نمونه ${i + 1}`} aria-pressed={index === i} onClick={() => setIndex(i)} sx={{ p: 0.5, width: 21, height: 21 }}><Box sx={{ width: index === i ? 15 : 5, height: 5, bgcolor: index === i ? "#168bff" : "#d7e5f7", borderRadius: 4 }} /></IconButton>)}</Stack></Paper><IconButton aria-label="تجربهٔ قبلی" onClick={() => setIndex(previous => (previous - 1 + stories.length) % stories.length)} sx={{ position: "absolute", right: 0, top: "48%", bgcolor: "#fff", color: "#168bff", width: 31, height: 31, boxShadow: "0 3px 14px #7da9dc19" }}><ChevronRightRounded /></IconButton><IconButton aria-label="تجربهٔ بعدی" onClick={() => setIndex(previous => (previous + 1) % stories.length)} sx={{ position: "absolute", left: 0, top: "48%", bgcolor: "#fff", color: "#168bff", width: 31, height: 31, boxShadow: "0 3px 14px #7da9dc19" }}><ChevronLeftRounded /></IconButton></Box>;
}
