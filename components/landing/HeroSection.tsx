"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import HeadphonesRounded from "@mui/icons-material/HeadphonesRounded";
import ChatOutlined from "@mui/icons-material/ChatOutlined";
import MenuBookOutlined from "@mui/icons-material/MenuBookOutlined";
import ArticleOutlined from "@mui/icons-material/ArticleOutlined";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import BoltRounded from "@mui/icons-material/BoltRounded";
import Link from "@/components/AppLink";
import Modal from "@/components/Modal";
import { landingContainer, blueButton, sectionDescription } from "./styles";

const skills = [{ title: "Listening", Icon: HeadphonesRounded, color: "#ff6d91" }, { title: "Speaking", Icon: ChatOutlined, color: "#ffb63e" }, { title: "Grammar", Icon: MenuBookOutlined, color: "#9c66ff" }, { title: "Vocabulary", Icon: ArticleOutlined, color: "#0ac7a4" }];
export default function HeroSection() {
  const [videoOpen, setVideoOpen] = useState(false);
  const video = useRef<HTMLVideoElement | null>(null);
  function closeVideo() { video.current?.pause(); setVideoOpen(false); }
  return <Box component="section" id="home" sx={{ ...landingContainer, scrollMarginTop: 100, pt: { xs: 3, md: 1 }, pb: { xs: 3, md: 1 }, display: "grid", gridTemplateColumns: { xs: "minmax(0,1fr)", md: "minmax(0,0.95fr) minmax(0,1.05fr)" }, alignItems: "center", gap: { xs: 2, md: 1 }, direction: "ltr" }}>
    <Box dir="rtl" sx={{ position: "relative", zIndex: 1, py: { xs: 1, md: 4 }, textAlign: { xs: "center", md: "right" }, order: { xs: 0, md: 0 } }}>
      <Typography sx={{ color: "#4d628a", fontSize: { xs: 13, sm: 15 }, mb: 1.5 }}>همراه تو در یادگیری زبان انگلیسی</Typography>
      <Typography component="h1" sx={{ color: "#091849", fontWeight: 800, fontSize: { xs: 37, sm: 51, lg: 58 }, letterSpacing: "-1.7px", lineHeight: 1.55 }}>انگلیسی را<br /><Box component="span" sx={{ color: "#0867ff" }}>آسان، لذت‌بخش</Box><br />و ماندگار یاد بگیر</Typography>
      <Typography sx={{ ...sectionDescription, fontSize: { xs: 14, md: 16 }, maxWidth: 510, mt: 1.5, mx: { xs: "auto", md: 0 } }}>با لنگو، مسیر یادگیری انگلیسی متناسب با سطح، هدف و سبک زندگی خودت را تجربه کن. از اولین قدم تا پیشرفت‌های بزرگ، همراه تو هستیم.</Typography>
      <Stack direction={{ xs: "column", sm: "row" }} sx={{ gap: 1.5, mt: 3, justifyContent: { xs: "center", md: "flex-start" } }}><Button component={Link} href="/onboarding" variant="contained" sx={{ ...blueButton, minHeight: 51, px: 4 }}>شروع یادگیری رایگان</Button><Button variant="outlined" onClick={() => setVideoOpen(true)} sx={{ borderRadius: 8, px: 2.5, minHeight: 51, fontWeight: 700, color: "#0867ff", borderColor: "#76aaff", gap: 1.25 }}><Box sx={{ width: 32, height: 32, bgcolor: "#0867ff", borderRadius: "50%", color: "white", display: "grid", placeItems: "center" }}><PlayArrowRounded sx={{ fontSize: 23 }} /></Box>تماشای ویدیو</Button></Stack>
      <Stack direction="row" sx={{ mt: 3.5, gap: { xs: 1, sm: 2 }, alignItems: "center", justifyContent: "space-between", maxWidth: 480, mx: { xs: "auto", md: 0 }, direction: "ltr" }}>{[{ value: "۶ نوع", label: "تمرین متنوع", Icon: GroupsRounded, color: "#1685ff", bg: "#eaf4ff" }, { value: "۷ سطح", label: "مسیر یادگیری", Icon: AutoStoriesRounded, color: "#9163ef", bg: "#f0eaff" }, { value: "هر روز", label: "یک قدم رو به جلو", Icon: BoltRounded, color: "#ffb52c", bg: "#fff6df" }].map(item => <Stack key={item.value} direction="row" sx={{ alignItems: "center", gap: 1, minWidth: 0 }}><Box sx={{ width: { xs: 34, sm: 42 }, height: { xs: 34, sm: 42 }, bgcolor: item.bg, color: item.color, borderRadius: "50%", display: "grid", placeItems: "center", flexShrink: 0 }}><item.Icon sx={{ fontSize: 24 }} /></Box><Box dir="rtl"><Typography sx={{ color: "#172a53", fontSize: { xs: 14, sm: 18 }, fontWeight: 800 }}>{item.value}</Typography><Typography sx={{ color: "#8b9ab5", fontSize: { xs: 9, sm: 11 }, mt: 0.25 }}>{item.label}</Typography></Box></Stack>)}</Stack>
    </Box>
    <Box sx={{ minWidth: 0, position: "relative", alignSelf: "stretch", minHeight: { xs: 350, sm: 490, md: 610 }, mx: { xs: -2, sm: 0 }, maskImage: "linear-gradient(to bottom,black 91%,transparent)" }}>
      <Image src="/images/landing/hero-learner.png" alt="زبان‌آموز با روسری آبی، هدفون و تبلت در فضای روشن مطالعه" fill preload sizes="(max-width: 899px) 100vw, 650px" style={{ objectFit: "cover", objectPosition: "55% center" }} />
      <Box aria-hidden="true" sx={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,#f6faff 0%,transparent 17%,transparent 95%,#f6faff)", pointerEvents: "none" }} />
      <Typography lang="en" aria-hidden="true" sx={{ display: { xs: "none", sm: "block" }, position: "absolute", left: "1%", top: "13%", fontFamily: "cursive", fontSize: 21, color: "#142854", transform: "rotate(-9deg)", lineHeight: 1.15 }}>Better<br />English.<br />Brighter<br />you!</Typography>
      <Stack aria-hidden="true" spacing={1.5} sx={{ position: "absolute", right: { xs: "4%", md: "1%" }, top: { xs: "12%", md: "20%" }, width: { xs: 126, sm: 158 } }}>{skills.map((skill, index) => <Paper key={skill.title} elevation={0} sx={{ display: "flex", alignItems: "center", gap: 1.25, p: { xs: 1.25, sm: 1.5 }, borderRadius: "15px", bgcolor: "#fffffff2", transform: `rotate(${index % 2 ? 7 : 9}deg)`, boxShadow: "0 10px 25px #16355c12" }}><Box sx={{ width: 34, height: 34, display: "grid", placeItems: "center", color: "white", bgcolor: skill.color, borderRadius: "10px", flexShrink: 0 }}><skill.Icon sx={{ fontSize: 22 }} /></Box><Typography lang="en" sx={{ color: "#1b2d54", fontSize: { xs: 12, sm: 14 }, fontWeight: 600 }}>{skill.title}</Typography></Paper>)}</Stack>
    </Box>
    <Modal open={videoOpen} onClose={closeVideo} title="نگاهی به تجربهٔ یادگیری لنگو" maxWidth="md" actions={<Button component={Link} href="/dashboard/lesson" onClick={closeVideo}>مشاهدهٔ درس نمونه</Button>}><Box component="video" ref={video} controls playsInline preload="metadata" poster="/images/lessons/tutor.png" aria-label="پیش‌نمایش تصویری لنگو" sx={{ width: "100%", display: "block", borderRadius: 3 }}><source src="/video/lessons/preview.mp4" type="video/mp4" /></Box><Typography sx={{ color: "#879ab6", fontSize: 11, mt: 1.5, lineHeight: 2 }}>پیش‌نمایش تصویری نمونه و بی‌صدا؛ ویدیوی معرفی اصلی بعداً جایگزین می‌شود.</Typography></Modal>
  </Box>;
}
