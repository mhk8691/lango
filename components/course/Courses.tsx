"use client";

import Link from "@/components/AppLink";
import { useId, useState } from "react";
import { Box, Button, Container, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import CourseCard, { type Course, type CourseLevel } from "@/components/course-card";

import FavoriteBorderRounded from "@mui/icons-material/FavoriteBorderRounded";
import { useCourseFavorites } from "@/lib/course-favorites";

const levels = ["Pre-A1", "A1", "A2", "B1", "B2", "C1", "C2"] as const;

export default function Courses({ courses }: { courses: readonly Course[] }) {
  const id = useId();
  const [level, setLevel] = useState<CourseLevel | "all">("all");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const favorites = useCourseFavorites();
  const visible = courses.filter(course => (level === "all" || course.levels.includes(level)) && (!favoritesOnly || favorites.includes(course.id)));
  return <Box component="main" sx={{ minHeight: "100dvh", py: { xs: 2, sm: 4 }, background: "radial-gradient(ellipse at 15% 15%, #d6efff 0%, transparent 50%), #acd8ff" }}>
    <Container maxWidth={false} sx={{ maxWidth: 1220, px: { xs: 1, sm: 3 } }}>
      <Paper elevation={0} sx={{ minHeight: { xs: "calc(100dvh - 32px)", sm: "calc(100dvh - 64px)" }, border: "5px solid #e5f3ff", borderRadius: { xs: "22px", md: "30px" }, px: { xs: 1.5, sm: 3, md: 4 }, pt: { xs: 2, md: 3 }, pb: 3, background: "linear-gradient(180deg,#fff,#f9fcff)", boxShadow: "0 20px 65px #2d77ba1a" }}>
        <Typography component="h1" sx={{ fontSize: { xs: 23, sm: 30, md: 34 }, fontWeight: 800, textAlign: "center", color: "#122453", lineHeight: 1.8, mb: 2 }}>دوره‌های آموزش زبان انگلیسی</Typography>
        <Stack direction="row" sx={{ justifyContent: "flex-end", flexWrap: "wrap", gap: 1, mb: 2 }}><Button component={Link} href="/favorites" sx={{ fontSize: 12 }}>مشاهدهٔ علاقه‌مندی‌ها</Button><Button aria-pressed={favoritesOnly} onClick={() => setFavoritesOnly(value => !value)} variant={favoritesOnly ? "contained" : "outlined"} sx={{ gap: 1, borderRadius: 2, fontSize: 12 }}><FavoriteBorderRounded sx={{ fontSize: 18 }} />فقط علاقه‌مندی‌ها</Button></Stack>
        <Tabs value={level} onChange={(_, value: typeof level) => setLevel(value)} variant="scrollable" scrollButtons="auto" aria-label="فیلتر سطح دوره‌ها" sx={{ minHeight: 44, mb: { xs: 2, md: 3 }, "& .MuiTabs-list": { gap: { xs: 0.6, sm: 1 } }, "& .MuiTab-root": { flex: 1, minWidth: { xs: 47, sm: 64 }, minHeight: 42, px: 1, py: 1, bgcolor: "#f0f6ff", border: "1px solid #e2ecfa", borderRadius: "9px", fontSize: { xs: 11, sm: 13 }, color: "#304c7d", textTransform: "none" }, "& .Mui-selected": { color: "#0876ff", bgcolor: "#e7f2ff", borderColor: "#c7e0ff" }, "& .MuiTabs-indicator": { bgcolor: "#0876ff", borderRadius: 2 } }}>
          {["all", ...levels].map(item => <Tab key={item} id={`${id}-tab-${item}`} aria-controls={`${id}-panel`} value={item} label={item === "all" ? "همه" : <span dir="ltr" lang="en">{item}</span>} />)}
        </Tabs>
        <Box role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${level}`}>
          {visible.length ? <Box component="ul" aria-label="فهرست دوره‌ها" sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0,1fr)", sm: "repeat(2,minmax(0,1fr))", md: "repeat(3,minmax(0,1fr))" }, "@media (min-width: 400px) and (max-width: 599px)": { gridTemplateColumns: "repeat(2,minmax(0,1fr))" }, gap: { xs: 1.5, sm: 2, md: 2.5 }, listStyle: "none", m: 0, p: 0, direction: "ltr" }}>
            {visible.map(course => <Box key={course.id} component="li" dir="rtl" sx={{ minWidth: 0 }}><CourseCard {...course} courseId={course.id} /></Box>)}
          </Box> : <Box sx={{ py: 8, textAlign: "center" }}><Typography sx={{ color: "#758aab", mb: 2 }}>{favoritesOnly ? "دوره‌ای در علاقه‌مندی‌های این بخش نیست. با لمس قلب روی کارت‌ها، دوره‌های دلخواهت را ذخیره کن." : `هنوز دوره‌ای برای سطح ${level} اضافه نشده است.`}</Typography><Button onClick={() => { setLevel("all"); setFavoritesOnly(false); }}>مشاهدهٔ همهٔ دوره‌ها</Button></Box>}
        </Box>
      </Paper>
    </Container>
  </Box>;
}
