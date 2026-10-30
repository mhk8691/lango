"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Avatar, Box, Drawer, IconButton, List, ListItem, ListItemButton, Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import DashboardOutlined from "@mui/icons-material/DashboardOutlined";
import MapOutlined from "@mui/icons-material/MapOutlined";
import ViewInArOutlined from "@mui/icons-material/ViewInArOutlined";
import QuizOutlined from "@mui/icons-material/QuizOutlined";
import ConfirmationNumberOutlined from "@mui/icons-material/ConfirmationNumberOutlined";
import LocalLibraryOutlined from "@mui/icons-material/LocalLibraryOutlined";
import RecordVoiceOverOutlined from "@mui/icons-material/RecordVoiceOverOutlined";
import SpellcheckOutlined from "@mui/icons-material/SpellcheckOutlined";
import InsertChartOutlined from "@mui/icons-material/InsertChartOutlined";
import FavoriteBorderRounded from "@mui/icons-material/FavoriteBorderRounded";
import WorkspacePremiumOutlined from "@mui/icons-material/WorkspacePremiumOutlined";
import NotificationsNoneRounded from "@mui/icons-material/NotificationsNoneRounded";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import PersonOutlineRounded from "@mui/icons-material/PersonOutlineRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import Logo from "@/components/Logo";
import RtlProvider from "@mui/system/RtlProvider";
import AppLink from "@/components/AppLink";
import { useProfile } from "@/lib/profile-store";
import DashboardNavbar from "./DashboardNavbar";
import { activeDashboardItem, dashboardItems } from "./routes";

const icons = { dashboard: DashboardOutlined, path: MapOutlined, courses: ViewInArOutlined, tests: QuizOutlined, exercises: ConfirmationNumberOutlined, library: LocalLibraryOutlined, speaking: RecordVoiceOverOutlined, vocabulary: SpellcheckOutlined, progress: InsertChartOutlined, favorites: FavoriteBorderRounded, achievements: WorkspacePremiumOutlined, notifications: NotificationsNoneRounded, subscription: Inventory2Outlined, settings: SettingsOutlined };
function Sidebar({ mobile, onNavigate }: { mobile?: boolean; onNavigate: () => void }) {
  const pathname = usePathname();
  const active = activeDashboardItem(pathname);
  const profile = useProfile();
  const name = profile ? `${profile.firstName} ${profile.lastName}`.trim() : "زبان‌آموز مهمان";
  return <Paper elevation={0} sx={{ height: "100%", minHeight: 0, display: "flex", flexDirection: "column", borderRadius: mobile ? 0 : "22px", border: mobile ? 0 : "1px solid #e4efff", background: "linear-gradient(165deg,#fff,#fbfdff)", px: 1.5, pt: 2.5, pb: 1.5 }}>
    <Stack direction="row" sx={{ alignItems: "center", justifyContent: "center", position: "relative", pb: 3, pt: 0.5, flexShrink: 0 }}><Box component={AppLink} href="/dashboard" onClick={onNavigate} aria-label="صفحهٔ اصلی داشبورد"><Logo sx={{ width: 156 }} sizes="156px" /></Box>{mobile && <IconButton aria-label="بستن منو" onClick={onNavigate} sx={{ position: "absolute", left: -2, top: -9 }}><CloseRounded sx={{ fontSize: 20 }} /></IconButton>}</Stack>
    <List component="nav" aria-label="منوی داشبورد" disablePadding sx={{ flex: 1, minHeight: 0, overflowY: "auto", scrollbarWidth: "thin", px: 0.25 }}>
      {dashboardItems.map(item => {
        const Icon = icons[item.icon];
        const selected = active === item.id;
        return <ListItem component="div" key={item.id} disablePadding sx={{ mb: 0.35 }}><ListItemButton component={AppLink} href={item.href} selected={selected} aria-current={selected ? "page" : undefined} onClick={onNavigate} sx={{ minHeight: 45, px: 1.5, py: 1, borderRadius: "10px", gap: 1.75, direction: "ltr", position: "relative", color: selected ? "#0876ff" : "#647aa3", "&.Mui-selected": { bgcolor: "#eef6ff", color: "#0876ff" }, "&.Mui-selected:before": { content: '""', position: "absolute", left: 0, top: 8, bottom: 8, width: 3, borderRadius: 3, bgcolor: "#168bff" }, "&.Mui-selected:hover": { bgcolor: "#e3f0ff" }, "&:hover": { bgcolor: "#f3f8ff" } }}><Icon sx={{ fontSize: 20, flexShrink: 0 }} /><Typography component="span" dir="rtl" sx={{ fontSize: 12.5, lineHeight: 1.8, fontWeight: selected ? 700 : 500, textAlign: "left" }}>{item.label}</Typography></ListItemButton></ListItem>;
      })}
    </List>
    <Box component={AppLink} href="/dashboard/subscription" onClick={onNavigate} sx={{ display: "flex", alignItems: "center", gap: 1.25, p: 1.5, mt: 1.5, border: "1px solid #f7e6c8", bgcolor: "#fff9ef", borderRadius: "13px", textDecoration: "none", flexShrink: 0, direction: "ltr" }}><WorkspacePremiumOutlined sx={{ color: "#efa930", fontSize: 30 }} /><Box dir="rtl"><Typography sx={{ color: "#bc8939", fontSize: 11 }}>اشتراک ویژه</Typography><Typography lang="en" sx={{ color: "#354e70", fontWeight: 700, fontSize: 13 }}>Premium</Typography></Box></Box>
    <Box component={AppLink} href="/dashboard/settings" onClick={onNavigate} aria-label="مشاهدهٔ پروفایل و تنظیمات" sx={{ mt: 2, p: 1.25, bgcolor: "#f0f7ff", borderRadius: "14px", textDecoration: "none", flexShrink: 0 }}><Stack direction="row" sx={{ direction: "ltr", alignItems: "center", gap: 1.25 }}><Avatar src={profile?.avatar || undefined} alt={name} sx={{ width: 44, height: 44, bgcolor: "#dceaff", color: "#7f9cc1" }}><PersonOutlineRounded /></Avatar><Box dir="rtl" sx={{ minWidth: 0, flex: 1 }}><Typography sx={{ color: "#2e4d7b", fontWeight: 700, fontSize: 12, overflowWrap: "anywhere" }}>{name}</Typography><Typography sx={{ color: "#8a9db9", fontSize: 10, mt: 0.5 }}>{profile ? "حساب زبان‌آموز" : "برای تکمیل پروفایل وارد شو"}</Typography></Box></Stack></Box>
  </Paper>;
}
export default function DashboardShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const desktop = useMediaQuery("(min-width:1200px)");
  return <Box dir="rtl" sx={{ minHeight: "100dvh", bgcolor: "#f1f7ff", display: "flex" }}>
    <Box component="a" href="#dashboard-content" sx={{ position: "fixed", top: 8, left: 8, zIndex: 1500, transform: "translateY(-200%)", bgcolor: "#fff", p: 1.5, borderRadius: 2, "&:focus": { transform: "none" } }}>رفتن به محتوای صفحه</Box>
    <Box component="aside" aria-label="سایدبار داشبورد" sx={{ display: { xs: "none", lg: "block" }, width: 240, p: 1, height: "100dvh", position: "sticky", top: 0, flexShrink: 0 }}><Sidebar onNavigate={() => {}} /></Box>
    {/* Drawer motion uses a physical right edge; Persian text retains its RTL direction. */}
    <RtlProvider value={false}><Drawer anchor="right" open={open && !desktop} onClose={() => setOpen(false)} sx={{ display: { lg: "none" } }} slotProps={{ paper: { id: "dashboard-mobile-navigation", "aria-label": "منوی داشبورد", sx: { width: 280, maxWidth: "calc(100vw - 32px)", height: "100dvh", bgcolor: "#fff" } } }}><Sidebar mobile onNavigate={() => setOpen(false)} /></Drawer></RtlProvider>
    <Box dir="rtl" sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, px: { xs: 1, sm: 2, xl: 2.5 }, pt: 1, pb: 2 }}>
      <DashboardNavbar onMenuOpen={() => setOpen(true)} />
      <Box id="dashboard-content" tabIndex={-1} sx={{ flex: 1, display: "flex", flexDirection: "column", outline: "none", "& > main[data-dashboard-fill]": { minHeight: 0, flex: 1, alignItems: "stretch" }, "& > main[data-dashboard-fill] > .MuiContainer-root": { flex: 1, display: "flex", minWidth: 0 }, "& > main[data-dashboard-fill] > .MuiContainer-root > .MuiPaper-root": { flex: 1, width: "100%", minWidth: 0 }, "& > main": { minHeight: "calc(100dvh - 110px)", background: "transparent", py: 0 }, "& > main > .MuiContainer-root": { maxWidth: "100%", px: 0 } }}>{children}</Box>
    </Box>
  </Box>;
}
