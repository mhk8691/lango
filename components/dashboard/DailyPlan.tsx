"use client";

import { useState } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeRounded from "@mui/icons-material/AccessTimeRounded";
import HeadphonesRounded from "@mui/icons-material/HeadphonesRounded";
import MenuBookOutlined from "@mui/icons-material/MenuBookOutlined";
import ArticleOutlined from "@mui/icons-material/ArticleOutlined";
import Link from "@/components/AppLink";
import Modal from "@/components/Modal";
import { dailyPlan } from "./overview-data";

function PlanItems() {
  return <Stack component="ol" spacing={1.25} sx={{ p: 0, m: 0, listStyle: "none" }}>{dailyPlan.map(item => {
    const Icon = item.id === "listening" ? HeadphonesRounded : item.id === "grammar" ? ArticleOutlined : MenuBookOutlined;
    return <Stack component="li" key={item.id} direction="row" sx={{ alignItems: "center", gap: 1, border: "1px solid #edf3fc", borderRadius: "12px", p: 1.25, minWidth: 0 }}><Button component={Link} href={item.href} variant={item.action === "شروع" ? "contained" : "outlined"} size="small" sx={{ minWidth: 58, minHeight: 35, flexShrink: 0, fontSize: 11 }}>{item.action}</Button><Box sx={{ flex: 1, minWidth: 0 }}><Typography lang="en" dir="ltr" sx={{ textAlign: "left", fontSize: 12, color: "#243d68", fontWeight: 600, overflowWrap: "anywhere" }}>{item.title}</Typography><Stack direction="row" sx={{ alignItems: "center", gap: 0.5, color: "#879ab7", mt: 0.5 }}><AccessTimeRounded sx={{ fontSize: 13 }} /><Typography sx={{ fontSize: 10 }}>{item.minutes.toLocaleString("fa-IR")} دقیقه</Typography></Stack></Box><Box sx={{ width: 38, height: 40, display: "grid", placeItems: "center", flexShrink: 0, bgcolor: item.tone, borderRadius: "10px", color: item.id === "listening" ? "#6482ed" : "#eda93a" }}><Icon sx={{ fontSize: 23 }} /></Box></Stack>;
  })}</Stack>;
}
export function DailyPlanDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <Modal open={open} onClose={onClose} title="برنامهٔ امروز" actions={<Button onClick={onClose}>بستن</Button>}><Typography sx={{ color: "#8a9bb4", fontSize: 12, mb: 2 }}>برنامهٔ پیشنهادی نمونه؛ برای شروع، یک فعالیت را انتخاب کن.</Typography><PlanItems /></Modal>;
}
export default function DailyPlanCard() {
  const [open, setOpen] = useState(false);
  return <Paper component="section" elevation={0} sx={{ p: 2.25, border: "1px solid #e4eefb", borderRadius: "16px" }}><Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 1 }}><Typography component="h2" sx={{ color: "#19345e", fontWeight: 800, fontSize: 20 }}>برنامهٔ امروز</Typography><CalendarMonthOutlined sx={{ color: "#46668e", fontSize: 21 }} /></Stack><Typography sx={{ color: "#8a9fbb", fontSize: 12, mb: 2 }}>۳ فعالیت پیشنهادی برای امروز</Typography><PlanItems /><Button fullWidth onClick={() => setOpen(true)} sx={{ mt: 2, minHeight: 40, borderRadius: "10px", bgcolor: "#edf5ff", color: "#1680f8", fontSize: 12 }}>مشاهدهٔ برنامهٔ کامل</Button><DailyPlanDialog open={open} onClose={() => setOpen(false)} /></Paper>;
}
