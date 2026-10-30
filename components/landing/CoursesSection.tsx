import Image from "next/image";
import { Box, Paper, Typography } from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import Link from "@/components/AppLink";
import { GlobeIllustration } from "./LandingIllustrations";
import { landingContainer, sectionTitle, sectionDescription, sectionSpace } from "./styles";

const levels = [
  { id: "A1", label: "مقدماتی", image: "/images/exercises/interactive/london-bank.png" },
  { id: "A2", label: "پایه", image: "/images/exercises/sentence-completion/street-park.png" },
  { id: "B1", label: "متوسط", image: "/images/courses/london-bus.png" },
  { id: "B2", label: "متوسط به بالا", image: "/images/exercises/interactive/london-bank.png" },
  { id: "C1", label: "پیشرفته", image: "/images/exercises/sentence-completion/street-park.png" },
  { id: "C2", label: "حرفه‌ای", image: "/images/courses/london-bus.png" },
];
export default function CoursesSection() {
  return <Box component="section" id="courses" sx={{ ...landingContainer, ...sectionSpace, display: "grid", gridTemplateColumns: { xs: "minmax(0,1fr)", lg: "minmax(0,2.15fr) minmax(0,1fr)" }, gap: 3, alignItems: "center", direction: "ltr" }}>
    <Box dir="rtl" sx={{ minWidth: 0, textAlign: "center" }}><Typography component="h2" sx={sectionTitle}>دوره‌های آموزشی لنگو</Typography><Typography sx={{ ...sectionDescription, mb: 2.5 }}>از اولین واژه‌ها تا قدم‌های پیشرفته، مسیرت را انتخاب کن.</Typography><Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2,minmax(0,1fr))", sm: "repeat(3,minmax(0,1fr))", md: "repeat(6,minmax(0,1fr))" }, gap: { xs: 1.5, md: 1.25 }, direction: "ltr" }}>{levels.map(level => <Paper component={Link} href={`/dashboard/courses?level=${level.id}`} key={level.id} elevation={0} aria-label={`مشاهدهٔ دوره‌های سطح ${level.id}`} sx={{ minWidth: 0, p: 0.75, pb: 1.5, borderRadius: "14px", border: "1px solid #e2edfc", bgcolor: "#fff", textDecoration: "none", boxShadow: "0 6px 15px #81b0df0e", transition: "transform 160ms,border-color 160ms", "&:hover": { transform: "translateY(-4px)", borderColor: "#84b8ff" }, "@media (prefers-reduced-motion: reduce)": { transition: "none" } }}><Box sx={{ position: "relative", aspectRatio: "1.35", overflow: "hidden", borderRadius: "9px", mb: 1 }}><Image src={level.image} alt={`نمای شهر لندن، دورهٔ ${level.id}`} fill sizes="(max-width: 599px) 43vw, (max-width: 899px) 28vw, 150px" style={{ objectFit: "cover" }} /></Box><Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 0.5 }}><Typography lang="en" sx={{ fontSize: 19, fontWeight: 800, color: "#18325b" }}>{level.id}</Typography><Box sx={{ width: 22, height: 22, border: "1px solid #e6f0ff", borderRadius: "50%", display: "grid", placeItems: "center", color: "#2587ff" }}><ArrowBackRounded sx={{ fontSize: 12, transform: "rotate(180deg)" }} /></Box></Box><Typography dir="rtl" sx={{ color: "#8498b5", fontSize: 10, mt: 0.5 }}>{level.label}</Typography></Paper>)}</Box></Box>
    <Paper elevation={0} sx={{ bgcolor: "#e1efff", borderRadius: "38px", p: 2.5, display: "grid", gridTemplateColumns: "minmax(0,1.05fr) minmax(0,1fr)", alignItems: "center", direction: "ltr", minHeight: 210, background: "linear-gradient(120deg,#e9f5ff,#d9eaff)", overflow: "hidden" }}><GlobeIllustration /><Box dir="rtl"><Typography component="h3" sx={{ fontWeight: 800, color: "#16315d", fontSize: 20, lineHeight: 1.8 }}>انگلیسی را در<br />دنیای واقعی تجربه کن</Typography><Typography sx={{ color: "#7891b1", fontSize: 11.5, lineHeight: 2, mt: 1 }}>با موضوعات کاربردی و موقعیت‌های روزمره، برای سفر، زندگی و گفت‌وگو آماده شو.</Typography></Box></Paper>
  </Box>;
}
