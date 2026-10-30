"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Button, Container, LinearProgress, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import FlagRounded from "@mui/icons-material/FlagRounded";
import CheckRounded from "@mui/icons-material/CheckRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import LockOutlined from "@mui/icons-material/LockOutlined";
import PathLessonCard from "./PathLessonCard";
import { demoCompletedLessons, demoCurrentLevel, pathLevels, pathUnits, type PathLevel } from "./data";

const images = ["/images/exercises/interactive/london-bank.png", "/images/courses/london-bus.png", "/images/exercises/sentence-completion/street-park.png", "/images/onboarding/learning.png"];

export default function LearningPath() {
  const id = useId();
  const [level, setLevel] = useState<PathLevel>(demoCurrentLevel);
  const current = pathLevels.find(item => item.id === demoCurrentLevel)!;
  const currentIndex = pathLevels.findIndex(item => item.id === demoCurrentLevel);
  const next = pathLevels[currentIndex + 1];
  const units = pathUnits[level];
  const total = pathUnits[demoCurrentLevel].reduce((count, unit) => count + unit.lessons.length, 0);
  const percent = Math.round(demoCompletedLessons / total * 100);
  const selectedIndex = pathLevels.findIndex(item => item.id === level);
  const completeCount = selectedIndex < currentIndex ? units.reduce((count, unit) => count + unit.lessons.length, 0) : selectedIndex === currentIndex ? demoCompletedLessons : 0;
  return <Box component="main" sx={{ minHeight: "100dvh", py: { xs: 2, sm: 3, md: 4 }, background: "radial-gradient(ellipse at 15% 15%, #d7efff 0%, transparent 50%), #e4f1ff" }}>
    <Container maxWidth={false} sx={{ maxWidth: 1280, px: { xs: 1.5, sm: 3 } }}>
      <Stack component="header" sx={{ gap: 0.5, mb: 3 }}><Typography component="h1" sx={{ fontSize: { xs: 27, sm: 35, md: 40 }, color: "#112654", fontWeight: 800 }}>مسیر یادگیری من</Typography><Typography sx={{ fontSize: { xs: 12, sm: 15 }, color: "#6a82a8", lineHeight: 2 }}>با تکمیل درس‌ها در مسیر خودت قدم‌به‌قدم پیش برو.</Typography></Stack>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0,1fr)", sm: "minmax(0,1fr) minmax(0,2fr)", lg: "minmax(0,0.8fr) minmax(0,1.8fr) minmax(0,1fr)" }, gap: 2, alignItems: "stretch", mb: 3 }}>
        <Paper elevation={0} sx={{ p: { xs: 2, md: 2.5 }, borderRadius: "19px", bgcolor: "#ffffffdf", display: "flex", flexDirection: "column", justifyContent: "center", gridColumn: { xs: 1, sm: 1 }, gridRow: { sm: 1 } }}><Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", gap: 1, mb: 1 }}><Box><Typography sx={{ color: "#203d68", fontSize: 13, fontWeight: 700 }}>هدف بعدی</Typography><Typography lang="en" dir="ltr" sx={{ textAlign: "right", fontSize: 27, fontWeight: 800, color: "#152c58" }}>{next.id} <Box component="span" sx={{ fontWeight: 400, fontSize: 12 }}>{next.english}</Box></Typography></Box><Box sx={{ bgcolor: "#fff0f2", color: "#ff536c", width: 45, height: 45, borderRadius: "50%", display: "grid", placeItems: "center" }}><FlagRounded sx={{ fontSize: 27 }} /></Box></Stack><Button component={Link} href="/lesson" sx={{ alignSelf: "flex-start", p: 0, gap: 1, fontSize: 12 }}>ادامهٔ مسیر<ArrowBackRounded sx={{ fontSize: 17 }} /></Button></Paper>
        <Paper elevation={0} sx={{ p: { xs: 2, md: 2.5 }, borderRadius: "19px", bgcolor: "#ffffffdf", display: "flex", alignItems: "center", gap: { xs: 1.5, md: 2.5 }, gridColumn: { sm: 2 }, gridRow: { sm: 1 }, minWidth: 0 }}><Box sx={{ flex: 1, minWidth: 0 }}><Typography sx={{ color: "#203d68", fontSize: 13, fontWeight: 700, mb: 0.5 }}>سطح فعلی شما</Typography><Typography lang="en" dir="ltr" sx={{ textAlign: "right", fontSize: { xs: 28, md: 33 }, fontWeight: 800, color: "#122953" }}>{current.id} <Box component="span" sx={{ fontSize: 13, fontWeight: 500 }}>{current.english}</Box></Typography><Stack direction="row" sx={{ alignItems: "center", gap: 1, mt: 1 }}><Typography sx={{ fontSize: 12, fontWeight: 700, color: "#2471cd" }}>{percent.toLocaleString("fa-IR")}٪</Typography><LinearProgress variant="determinate" value={percent} aria-label="پیشرفت سطح فعلی" sx={{ flex: 1, height: 8, borderRadius: 5, bgcolor: "#e0edff", "& .MuiLinearProgress-bar": { borderRadius: 5, bgcolor: "#087bff", transition: "none" } }} /></Stack><Typography sx={{ fontSize: 11, color: "#8196b4", mt: 0.75 }}>{demoCompletedLessons.toLocaleString("fa-IR")} درس از {total.toLocaleString("fa-IR")} درس</Typography></Box><Box sx={{ position: "relative", width: { xs: 78, md: 100 }, aspectRatio: "1", borderRadius: "12px", overflow: "hidden", flexShrink: 0 }}><Image src="/images/exercises/sentence-completion/street-park.png" alt="خیابانی در شهر" fill sizes="100px" style={{ objectFit: "cover" }} /></Box></Paper>
        <Box sx={{ display: { xs: "none", lg: "block" }, position: "relative", gridColumn: 3, gridRow: 1, minHeight: 170, borderRadius: "26px 60px 24px 50px", overflow: "hidden" }}><Image src="/images/exercises/interactive/london-bank.png" alt="برج بیگ بن در لندن" fill sizes="280px" style={{ objectFit: "cover" }} /></Box>
      </Box>
      <Tabs value={level} onChange={(_, value: PathLevel) => setLevel(value)} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile aria-label="سطح مسیر یادگیری" sx={{ bgcolor: "#ffffffd9", borderRadius: "16px", minHeight: 76, mb: 2.5, "& .MuiTabs-indicator": { display: "none" }, "& .MuiTab-root": { minWidth: { xs: 74, md: 100 }, flex: 1, minHeight: 76, py: 1, px: 1.5, color: "#274473", borderRadius: "14px", borderLeft: "1px solid #edf4fd", textTransform: "none" }, "& .MuiTab-root.Mui-selected": { bgcolor: "#087bff", color: "white", boxShadow: "0 6px 15px #168bff20" } }}>
        {pathLevels.map(item => <Tab key={item.id} value={item.id} id={`${id}-tab-${item.id}`} aria-controls={`${id}-panel`} label={<Stack sx={{ gap: 0.5 }}><Box component="span" dir="ltr" lang="en" sx={{ fontSize: 16, fontWeight: 800, whiteSpace: "nowrap" }}>{item.id}</Box><Box component="span" sx={{ fontSize: 11 }}>{item.label}</Box></Stack>} />)}
      </Tabs>
      <Box role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${level}`} sx={{ position: "relative", "&:before": { content: '""', position: "absolute", left: { xs: 13, sm: 17, md: 25 }, top: 24, bottom: 24, borderLeft: "2px dashed #97b6df" } }}>
        {units.map((unit, unitIndex) => {
          const start = units.slice(0, unitIndex).reduce((count, previous) => count + previous.lessons.length, 0);
          const completed = start + unit.lessons.length <= completeCount;
          const active = level === demoCurrentLevel && start <= completeCount && start + unit.lessons.length > completeCount;
          const Icon = completed ? CheckRounded : active ? PlayArrowRounded : LockOutlined;
          return <Box component="section" aria-labelledby={`${id}-unit-${unitIndex}`} key={`${level}-${unit.title}`} sx={{ position: "relative", display: "grid", gridTemplateColumns: { xs: "28px minmax(0,1fr)", sm: "36px minmax(0,1fr)", md: "36px 155px minmax(0,1fr)" }, columnGap: { xs: 0.75, sm: 1.5 }, rowGap: 1.5, py: 2, px: { xs: 0, md: 1 }, mb: 2, borderRadius: "18px", bgcolor: "#ffffff80", direction: "ltr" }}>
            <Box sx={{ gridColumn: 1, gridRow: "1 / 3", zIndex: 1, display: "grid", placeItems: "center", alignSelf: "start", mt: 0.5, width: { xs: 28, sm: 36 }, height: { xs: 28, sm: 36 }, bgcolor: completed ? "#00c58a" : active ? "#087bff" : "#8fa5c4", border: "3px solid #fff", borderRadius: "50%", color: "#fff" }}><Icon sx={{ fontSize: { xs: 17, sm: 21 } }} /></Box>
            <Box dir="rtl" sx={{ gridColumn: 2, minWidth: 0, px: { xs: 1, md: 0 }, textAlign: { xs: "right", md: "left" } }}><Typography component="h2" id={`${id}-unit-${unitIndex}`} sx={{ color: "#1d3965", fontSize: 16, fontWeight: 800 }}><Box component="span" dir="ltr" lang="en" sx={{ display: "inline-block" }}>Unit {unitIndex + 1}</Box></Typography><Typography sx={{ fontSize: 14, color: "#2c4873", fontWeight: 700, mt: 0.25 }}>{unit.title}</Typography><Typography sx={{ color: "#8397b4", fontSize: 11, mt: 0.5 }}>{unit.lessons.length.toLocaleString("fa-IR")} درس • {completed ? "تکمیل‌شده" : active ? "در حال یادگیری" : "قفل‌شده"}</Typography></Box>
            <Box component="ul" aria-label={`درس‌های ${unit.title}`} dir="ltr" sx={{ gridColumn: { xs: 2, md: 3 }, display: "grid", gridTemplateColumns: { xs: "repeat(2,minmax(0,1fr))", sm: "repeat(4,minmax(0,1fr))" }, gap: { xs: 1, md: 1.5 }, listStyle: "none", p: 0, m: 0, pr: { xs: 1, md: 0.5 } }}>
              {unit.lessons.map((title, lessonIndex) => {
                const position = start + lessonIndex;
                const status = position < completeCount ? "completed" : level === demoCurrentLevel && position === completeCount ? "current" : "locked";
                return <Box component="li" dir="rtl" key={title} sx={{ minWidth: 0 }}><PathLessonCard title={title} number={position + 1} image={images[lessonIndex % images.length]} status={status} /></Box>;
              })}
            </Box>
          </Box>;
        })}
      </Box>
      <Typography sx={{ fontSize: 11, color: "#8296b3", lineHeight: 2, mt: 1.5 }}>مسیر و پیشرفت فعلاً نمونه‌اند. درس‌های باز به صفحهٔ نمونهٔ درس وصل هستند؛ پیشرفت واقعی پس از اتصال بک‌اند نمایش داده می‌شود.</Typography>
    </Container>
  </Box>;
}
