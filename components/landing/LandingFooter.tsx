"use client";

import { useState } from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import Apple from "@mui/icons-material/Apple";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import Instagram from "@mui/icons-material/Instagram";
import Telegram from "@mui/icons-material/Telegram";
import YouTube from "@mui/icons-material/YouTube";
import LinkedIn from "@mui/icons-material/LinkedIn";
import Logo from "@/components/Logo";
import Link from "@/components/AppLink";
import LandingInfoModal, { type InfoTopic } from "./LandingInfoModal";
import { landingContainer } from "./styles";

export default function LandingFooter() {
  const [topic, setTopic] = useState<InfoTopic | null>(null);
  return <Box component="footer" id="about" sx={{ bgcolor: "#fff", borderTop: "1px solid #e8f1fb", mt: 2, scrollMarginTop: 100 }}><Box sx={{ ...landingContainer, py: { xs: 4, md: 3.5 } }}><Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2,minmax(0,1fr))", md: "1.35fr .8fr .9fr 1.45fr 1fr" }, gap: { xs: 3.5, md: 3 }, direction: "ltr", alignItems: "start" }}>
    <Box dir="rtl" sx={{ gridColumn: { xs: "1 / -1", md: "auto" }, textAlign: { xs: "center", md: "left" } }}><Logo sx={{ width: 112 }} sizes="112px" /><Typography sx={{ color: "#8a9db7", fontSize: 11, lineHeight: 2, mt: 1 }}>همراه تو در یادگیری زبان انگلیسی</Typography></Box>
    <Stack dir="rtl" spacing={0.5}><Typography sx={{ color: "#29446d", fontSize: 13, fontWeight: 800, mb: 0.75 }}>محصولات</Typography>{[{ title: "دوره‌ها", href: "/dashboard/courses" }, { title: "مسیر یادگیری", href: "/dashboard/learning-path" }, { title: "تعیین سطح", href: "/dashboard/placement-test" }].map(item => <Button key={item.title} component={Link} href={item.href} size="small" sx={{ justifyContent: "flex-start", minWidth: 0, p: 0, minHeight: 27, fontSize: 11, color: "#8196b4" }}>{item.title}</Button>)}</Stack>
    <Stack dir="rtl" spacing={0.5}><Typography sx={{ color: "#29446d", fontSize: 13, fontWeight: 800, mb: 0.75 }}>لینک‌های سریع</Typography>{[{ title: "مقالات", value: "articles" }, { title: "درباره ما", value: "about" }, { title: "تماس با ما", value: "contact" }].map(item => <Button key={item.title} size="small" onClick={() => setTopic(item.value as InfoTopic)} sx={{ justifyContent: "flex-start", minWidth: 0, p: 0, minHeight: 27, fontSize: 11, color: "#8196b4" }}>{item.title}</Button>)}</Stack>
    <Box dir="rtl" sx={{ gridColumn: { xs: "1 / -1", md: "auto" } }}><Typography sx={{ color: "#29446d", fontSize: 13, fontWeight: 800, mb: 1.5 }}>لنگو، هر جا که هستی</Typography><Stack direction="row" sx={{ gap: 1, flexWrap: "wrap" }}>{[{ label: "App Store", Icon: Apple }, { label: "Google Play", Icon: PlayArrowRounded }].map(store => <Button key={store.label} onClick={() => setTopic("downloads")} aria-label={`${store.label}، به‌زودی`} sx={{ direction: "ltr", gap: 0.75, bgcolor: "#0d1520", color: "#fff", borderRadius: "8px", px: 1.25, minHeight: 43, "&:hover": { bgcolor: "#243750" } }}><store.Icon sx={{ fontSize: 24, color: store.label === "Google Play" ? "#58d6ac" : "white" }} /><Box sx={{ textAlign: "left" }}><Typography sx={{ fontSize: 8, color: "#bdc8d6" }}>به‌زودی</Typography><Typography lang="en" sx={{ fontSize: 12, fontWeight: 600, lineHeight: 1.2 }}>{store.label}</Typography></Box></Button>)}</Stack></Box>
    <Box dir="rtl"><Typography sx={{ color: "#8295af", fontSize: 12, mb: 1.25 }}>ما را دنبال کنید</Typography><Stack direction="row" sx={{ gap: 0.25 }}>{[{ label: "اینستاگرام", Icon: Instagram }, { label: "تلگرام", Icon: Telegram }, { label: "یوتیوب", Icon: YouTube }, { label: "لینکدین", Icon: LinkedIn }].map(item => <IconButton key={item.label} aria-label={item.label} onClick={() => setTopic("social")} sx={{ color: "#244268", width: 32, height: 32 }}><item.Icon sx={{ fontSize: 20 }} /></IconButton>)}</Stack></Box>
  </Box></Box><Box sx={{ borderTop: "1px solid #edf3fb", bgcolor: "#f5faff" }}><Stack direction={{ xs: "column", sm: "row" }} sx={{ ...landingContainer, py: 1.5, alignItems: "center", justifyContent: "space-between", gap: 1 }}><Typography sx={{ fontSize: 10, color: "#92a4bd" }}>© لنگو — تمامی حقوق محفوظ است.</Typography><Stack direction="row" sx={{ flexWrap: "wrap", justifyContent: "center", gap: 1 }}>{[{ title: "حریم خصوصی", value: "privacy" }, { title: "قوانین و مقررات", value: "terms" }, { title: "انتقادات و پیشنهادات", value: "contact" }].map(item => <Button key={item.value} onClick={() => setTopic(item.value as InfoTopic)} size="small" sx={{ color: "#8b9eb8", fontSize: 10, minHeight: 25, px: 0.75 }}>{item.title}</Button>)}</Stack></Stack></Box><LandingInfoModal topic={topic} onClose={() => setTopic(null)} /></Box>;
}
