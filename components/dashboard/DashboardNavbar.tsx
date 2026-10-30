"use client";

import { useMemo, useState } from "react";
import { Autocomplete, Avatar, Badge, Box, Button, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import MenuRounded from "@mui/icons-material/MenuRounded";
import NotificationsNoneRounded from "@mui/icons-material/NotificationsNoneRounded";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import PersonOutlineRounded from "@mui/icons-material/PersonOutlineRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import Link, { useAppRouter } from "@/components/AppLink";
import { useProfile } from "@/lib/profile-store";
import { useVocabulary } from "@/lib/vocabulary-store";
import { sampleCourses } from "@/app/course/data";
import { sampleNotifications } from "@/app/notifications/sample-notifications";
import { examDefinitions } from "@/lib/exams/catalog";
import { dashboardItems } from "./routes";
import { DailyPlanDialog } from "./DailyPlan";

export default function DashboardNavbar({ onMenuOpen }: { onMenuOpen: () => void }) {
  const router = useAppRouter();
  const profile = useProfile();
  const words = useVocabulary();
  const [planOpen, setPlanOpen] = useState(false);
  const [search, setSearch] = useState("");
  const options = useMemo(() => [
    ...dashboardItems.map(item => ({ id: item.id, label: item.label, href: item.href, group: "بخش‌ها" })),
    ...sampleCourses.map(course => ({ id: `course-${course.id}`, label: `${course.title} — ${course.description}`, href: course.href, group: "دوره‌ها" })),
    ...examDefinitions.map(exam => ({ id: `exam-${exam.id}`, label: exam.title, href: `/dashboard/exam/${exam.id}`, group: "آزمون‌ها" })),
    ...words.map(word => ({ id: word.id, label: `${word.word} — ${word.meaning}`, href: "/dashboard/vocabulary", group: "واژگان" })),
  ], [words]);
  return <>
    <Paper component="header" aria-label="نوار بالای داشبورد" elevation={0} sx={{ position: "sticky", top: 0, zIndex: 1100, mb: 2, px: { xs: 1.25, sm: 2 }, py: 1.25, borderRadius: "16px", border: "1px solid #e5eefb", bgcolor: "#fff", display: "grid", gridTemplateColumns: { xs: "minmax(0,1fr)", sm: "minmax(0,1fr) auto" }, alignItems: "center", gap: { xs: 1, sm: 2 }, direction: "ltr" }}>
      <Box sx={{ minWidth: 0, gridRow: { xs: 2, sm: 1 } }} dir="rtl"><Autocomplete options={options} getOptionLabel={option => option.label} getOptionKey={option => option.id} groupBy={option => option.group} value={null} inputValue={search} onInputChange={(_, value) => setSearch(value)} onChange={(_, option) => { if (option) { router.push(option.href); setSearch(""); } }} noOptionsText="نتیجه‌ای پیدا نشد" clearText="پاک کردن" openText="نمایش نتایج" closeText="بستن نتایج" size="small" renderInput={params => <TextField {...params} label="جست‌وجو در داشبورد" placeholder="درس، دوره، آزمون یا واژه…" slotProps={{ ...params.slotProps, input: { ...params.slotProps.input, startAdornment: <SearchRounded sx={{ color: "#91a8c4", fontSize: 20, mx: 0.5 }} /> } }} />} sx={{ maxWidth: { sm: 680 }, "& .MuiOutlinedInput-root": { bgcolor: "#f5f9ff", borderRadius: "12px" }, "& fieldset": { borderColor: "#edf3fc" }, "& input": { fontSize: 12 }, "& label": { fontSize: 12 } }} /></Box>
      <Stack direction="row" sx={{ direction: "rtl", gridColumn: { sm: 2 }, gridRow: 1, alignItems: "center", justifyContent: "space-between", gap: { xs: 1, sm: 2 } }}>
        <Stack direction="row" sx={{ alignItems: "center", gap: { xs: 1, sm: 2 } }}><IconButton component={Link} href="/dashboard/settings" aria-label="پروفایل و تنظیمات" sx={{ p: 0.25 }}><Avatar src={profile?.avatar || undefined} alt={profile ? `${profile.firstName} ${profile.lastName}` : "پروفایل"} sx={{ width: 36, height: 36, bgcolor: "#edf3fc", color: "#93a9c4" }}><PersonOutlineRounded /></Avatar></IconButton><Button onClick={() => setPlanOpen(true)} variant="outlined" sx={{ gap: 0.75, whiteSpace: "nowrap", minHeight: 37, borderRadius: "10px", fontSize: 11, px: 1.25, borderColor: "#d5e6ff" }}><CalendarMonthOutlined sx={{ fontSize: 18 }} />برنامهٔ امروز</Button><IconButton component={Link} href="/dashboard/notifications" aria-label="اعلان‌ها و پیام‌ها"><Badge badgeContent={sampleNotifications.length} color="error" sx={{ "& .MuiBadge-badge": { fontSize: 9, minWidth: 16, height: 16 } }}><NotificationsNoneRounded sx={{ color: "#7187aa" }} /></Badge></IconButton></Stack>
        <Stack direction="row" sx={{ display: { lg: "none" }, alignItems: "center", gap: 0.25 }}><Typography sx={{ fontSize: 12, color: "#5d789e" }}>لنگو</Typography><IconButton onClick={onMenuOpen} aria-label="باز کردن منوی داشبورد"><MenuRounded /></IconButton></Stack>
      </Stack>
    </Paper>
    <DailyPlanDialog open={planOpen} onClose={() => setPlanOpen(false)} />
  </>;
}
