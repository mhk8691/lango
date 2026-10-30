"use client";

import { useState } from "react";
import { Box, Button, Drawer, IconButton, List, ListItemButton, Stack, TextField, Typography } from "@mui/material";
import MenuRounded from "@mui/icons-material/MenuRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import RtlProvider from "@mui/system/RtlProvider";
import Link from "@/components/AppLink";
import Logo from "@/components/Logo";
import Modal from "@/components/Modal";
import LandingInfoModal, { type InfoTopic } from "./LandingInfoModal";
import { landingContainer, blueButton } from "./styles";

const links = [{ title: "خانه", href: "/dashboard" }, { title: "دوره‌ها", href: "/dashboard/courses" }, { title: "ویژگی‌ها", href: "/#features" }, { title: "چرا لنگو", href: "/#why-lango" }, { title: "قیمت‌ها", href: "/dashboard/subscription" }];
export default function LandingHeader() {
  const [menu, setMenu] = useState(false);
  const [topic, setTopic] = useState<InfoTopic | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const results = [...links, { title: "مسیر یادگیری", href: "/dashboard/learning-path" }, { title: "آزمون تعیین سطح", href: "/dashboard/placement-test" }, { title: "واژگان", href: "/dashboard/vocabulary" }, { title: "تمرین شنیداری", href: "/dashboard/exercises/listening" }, { title: "تمرین مکالمه", href: "/dashboard/exercises/speaking" }].filter(item => item.title.includes(query.trim()));
  const openTopic = (value: InfoTopic) => { setMenu(false); setTopic(value); };
  return <>
    <Box component="header" sx={{ position: "sticky", top: 0, zIndex: 1100, bgcolor: "#f9fcfff2", borderBottom: "1px solid #eaf2fc" }}><Stack direction="row" sx={{ ...landingContainer, alignItems: "center", justifyContent: "space-between", gap: { xs: 1, md: 3 }, py: 1.5 }}>
      <Box component={Link} href="/" aria-label="لنگو، صفحه اصلی" sx={{ lineHeight: 0 }}><Logo preload sx={{ width: { xs: 96, sm: 112 } }} sizes="112px" /></Box>
      <Stack component="nav" aria-label="ناوبری صفحه اصلی" direction="row" sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center", gap: 0.5 }}>{links.map((item, index) => <Button component={Link} href={item.href} key={item.title} sx={{ fontSize: 12, color: index === 0 ? "#0867ff" : "#22365b", minWidth: 0, px: 1.5, borderRadius: 8, bgcolor: index === 0 ? "#eaf3ff" : "transparent" }}>{item.title}</Button>)}<Button onClick={() => openTopic("articles")} sx={{ fontSize: 12, color: "#22365b", minWidth: 0 }}>مقالات</Button><Button onClick={() => openTopic("about")} sx={{ fontSize: 12, color: "#22365b", minWidth: 0 }}>درباره ما</Button></Stack>
      <Stack direction="row" sx={{ alignItems: "center", gap: { xs: 0.5, sm: 1 } }}><IconButton aria-label="جست‌وجو در لنگو" onClick={() => setSearchOpen(true)} sx={{ width: 36, height: 36, bgcolor: "#eaf2ff", color: "#264978" }}><SearchRounded sx={{ fontSize: 19 }} /></IconButton><Button component={Link} href="/login" variant="outlined" sx={{ minWidth: 55, fontSize: 12, borderRadius: 8, minHeight: 36, px: 1.75, color: "#213c65" }}>ورود</Button><Button component={Link} href="/onboarding" variant="contained" sx={{ ...blueButton, display: { xs: "none", sm: "inline-flex" }, minHeight: 37, px: 2.25, fontSize: 12 }}>شروع یادگیری</Button><IconButton aria-label="باز کردن منوی لندینگ" onClick={() => setMenu(true)} sx={{ display: { lg: "none" }, color: "#28466b" }}><MenuRounded /></IconButton></Stack>
    </Stack></Box>
    <RtlProvider value={false}><Drawer anchor="right" open={menu} onClose={() => setMenu(false)} slotProps={{ paper: { sx: { width: 280, maxWidth: "90vw", p: 2.5 }, "aria-label": "منوی لندینگ" } }}><Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 3 }}><Logo sx={{ width: 110 }} /><IconButton aria-label="بستن منوی لندینگ" onClick={() => setMenu(false)}><CloseRounded /></IconButton></Stack><List dir="rtl">{links.map(item => <ListItemButton key={item.title} component={Link} href={item.href} onClick={() => setMenu(false)} sx={{ borderRadius: 2, minHeight: 48, color: "#385578" }}>{item.title}</ListItemButton>)}<ListItemButton onClick={() => openTopic("articles")}>مقالات</ListItemButton><ListItemButton onClick={() => openTopic("about")}>درباره ما</ListItemButton></List><Button component={Link} href="/onboarding" variant="contained" sx={blueButton}>شروع یادگیری</Button></Drawer></RtlProvider>
    <Modal open={searchOpen} onClose={() => setSearchOpen(false)} title="جست‌وجو در لنگو" maxWidth="sm"><TextField autoFocus fullWidth label="چه چیزی می‌خواهی یاد بگیری؟" value={query} onChange={event => setQuery(event.target.value)} /><Stack sx={{ mt: 2, gap: 0.75 }}>{results.length ? results.map(item => <Button component={Link} href={item.href} key={item.title} onClick={() => setSearchOpen(false)} sx={{ justifyContent: "flex-start", minHeight: 44, color: "#45678d", bgcolor: "#f5f9ff" }}>{item.title}</Button>) : <Typography sx={{ color: "#8498b2", py: 2 }}>نتیجه‌ای پیدا نشد.</Typography>}</Stack></Modal>
    <LandingInfoModal topic={topic} onClose={() => setTopic(null)} />
  </>;
}
