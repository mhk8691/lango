"use client";

import { useId, useState } from "react";
import Link from "@/components/AppLink";
import { Box, Button, Chip, Container, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import BookmarkBorderRounded from "@mui/icons-material/BookmarkBorderRounded";
import FavoriteBorderRounded from "@mui/icons-material/FavoriteBorderRounded";
import CourseCard, { type Course } from "@/components/course-card";
import { useVocabulary } from "@/lib/vocabulary-store";
import WordGrid from "@/components/vocabulary/WordGrid";
import { useCourseFavorites } from "@/lib/course-favorites";

const categories = [
  { id: "all", label: "همه" }, { id: "courses", label: "دوره‌ها" },
  { id: "lessons", label: "درس‌ها" }, { id: "videos", label: "ویدیوها" },
  { id: "articles", label: "مقالات" }, { id: "exercises", label: "تمرین‌ها" },
  { id: "words", label: "واژگان" }, { id: "tests", label: "آزمون‌ها" },
] as const;
type Category = typeof categories[number]["id"];

export default function Favorites({ courses }: { courses: readonly Course[] }) {
  const id = useId();
  const favorites = useCourseFavorites();
  const [category, setCategory] = useState<Category>("all");
  const savedWords = useVocabulary().filter(entry => entry.kind === "saved");
  const visibleWords = category === "all" || category === "words" ? savedWords : [];
  const savedCourses = courses.filter(course => favorites.includes(course.id));
  const visible = category === "all" || category === "courses" ? savedCourses : [];
  return <Box component="main" sx={{ minHeight: "100dvh", bgcolor: "#f4f9ff", py: { xs: 2, sm: 4, md: 5 } }}>
    <Container maxWidth={false} sx={{ maxWidth: 1240, px: { xs: 2, sm: 3, md: 4 } }}>
      <Stack component="header" sx={{ mb: { xs: 3, md: 4 }, gap: 1.25 }}>
        <Stack direction="row" sx={{ alignItems: "center", gap: 1.5 }}><Typography component="h1" sx={{ fontSize: { xs: 29, sm: 36, md: 42 }, fontWeight: 800, color: "#102452", lineHeight: 1.6 }}>علاقه‌مندی‌ها</Typography><Chip label={`${(savedCourses.length + savedWords.length).toLocaleString("fa-IR")} مورد`} sx={{ bgcolor: "#e6f0ff", color: "#3176cc", fontSize: 11 }} /></Stack>
        <Typography sx={{ color: "#6a80a7", fontSize: { xs: 13, sm: 16 }, lineHeight: 2 }}>دوره‌ها و محتوای مورد علاقه‌ات را اینجا نگه دار و هر وقت خواستی به یادگیری برگرد.</Typography>
      </Stack>
      <Tabs value={category} onChange={(_, value: Category) => setCategory(value)} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile aria-label="دسته‌بندی علاقه‌مندی‌ها" sx={{ mb: { xs: 2.5, md: 3 }, minHeight: 48, "& .MuiTabs-indicator": { display: "none" }, "& .MuiTabs-list": { gap: 0.75 }, "& .MuiTab-root": { flex: 1, minWidth: { xs: 78, md: 100 }, minHeight: 46, px: 1.5, border: "1px solid #dfeafa", borderRadius: "11px", color: "#637da7", fontSize: { xs: 12, sm: 14 }, bgcolor: "#fff", fontWeight: 500 }, "& .MuiTab-root.Mui-selected": { color: "#fff", bgcolor: "#0876ff", borderColor: "#0876ff", boxShadow: "0 4px 12px #0876ff1a" } }}>
        {categories.map(item => <Tab key={item.id} value={item.id} label={item.label} id={`${id}-tab-${item.id}`} aria-controls={`${id}-panel`} />)}
      </Tabs>
      <Box role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${category}`}>
        {visible.length > 0 || visibleWords.length > 0 ? <>{visible.length > 0 && <Box component="ul" aria-label="فهرست علاقه‌مندی‌ها" sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0,1fr)", sm: "repeat(2,minmax(0,1fr))", md: "repeat(3,minmax(0,1fr))" }, "@media (min-width: 400px) and (max-width: 599px)": { gridTemplateColumns: "repeat(2,minmax(0,1fr))" }, gap: { xs: 2, md: 2.5 }, m: 0, p: 0, listStyle: "none" }}>
          {visible.map(course => <Box component="li" key={course.id} sx={{ minWidth: 0 }}><CourseCard {...course} courseId={course.id} /></Box>)}
        </Box>}{visibleWords.length > 0 && <Box sx={{ mt: visible.length ? 3 : 0 }}>{category === "all" && <Typography component="h2" sx={{ fontWeight: 700, color: "#36577f", fontSize: 20, mb: 2 }}>واژگان ذخیره‌شده</Typography>}<WordGrid words={visibleWords} /></Box>}</> : <Paper elevation={0} sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 1.5, px: 2, py: { xs: 5, md: 7 }, border: "1px solid #e0ebfa", borderRadius: "15px", bgcolor: "#ffffffa8" }}>
          <Box sx={{ width: 64, height: 64, display: "grid", placeItems: "center", borderRadius: "20px", bgcolor: "#edf5ff", color: "#6c99d1", mb: 0.5 }}><FavoriteBorderRounded sx={{ fontSize: 32 }} /></Box>
          <Typography component="h2" sx={{ fontWeight: 700, color: "#304e7b", fontSize: { xs: 17, sm: 21 } }}>{category === "all" ? "هنوز چیزی ذخیره نکرده‌ای" : `هنوز موردی در بخش «${categories.find(item => item.id === category)?.label}» ذخیره نشده`}</Typography>
          <Typography sx={{ maxWidth: 500, color: "#8095b5", fontSize: 13, lineHeight: 2 }}>برای ذخیرهٔ دوره یا واژه، روی قلب کارت دوره یا قلب کنار واژه در درس بزن. محتوای ذخیره‌شده در همین مرورگر در دسترس می‌ماند.</Typography>
          {category !== "all" && savedCourses.length + savedWords.length > 0 && <Button onClick={() => setCategory("all")} sx={{ fontSize: 13 }}>مشاهدهٔ همهٔ علاقه‌مندی‌ها</Button>}
        </Paper>}
      </Box>
      <Paper component="section" aria-labelledby="save-more-title" elevation={0} sx={{ mt: { xs: 3, md: 4 }, border: "1px solid #d8e7ff", borderRadius: "15px", px: { xs: 2, sm: 4 }, py: { xs: 3.5, md: 5 }, textAlign: "center", background: "linear-gradient(120deg,#edf5ff,#f8fbff)", display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
        <BookmarkBorderRounded sx={{ color: "#6887b2", fontSize: 35 }} />
        <Typography component="h2" id="save-more-title" sx={{ fontWeight: 800, color: "#163563", fontSize: { xs: 19, sm: 23 } }}>محتوای بیشتری ذخیره کنید</Typography>
        <Typography sx={{ color: "#7c91b2", fontSize: 13, lineHeight: 2, maxWidth: 580 }}>دوره‌های دلخواهت را پیدا کن و با ذخیره کردن آن‌ها، مسیر یادگیری خودت را بساز.</Typography>
        <Button component={Link} href="/course" variant="contained" sx={{ mt: 0.5, minHeight: 46, px: 4, fontWeight: 700, borderRadius: "10px" }}>دنبال کردن درس‌ها</Button>
      </Paper>
    </Container>
  </Box>;
}
