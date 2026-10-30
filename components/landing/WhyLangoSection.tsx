import { Box, Paper, Typography } from "@mui/material";
import WorkspacePremiumRounded from "@mui/icons-material/WorkspacePremiumRounded";
import DevicesRounded from "@mui/icons-material/DevicesRounded";
import FavoriteRounded from "@mui/icons-material/FavoriteRounded";
import HeadphonesRounded from "@mui/icons-material/HeadphonesRounded";
import SettingsRounded from "@mui/icons-material/SettingsRounded";
import TestimonialsCarousel from "./TestimonialsCarousel";
import { landingContainer, sectionTitle, sectionDescription, sectionSpace } from "./styles";

const reasons = [
  { title: "قدم‌های روشن", text: "یک مسیر مشخص برای شروع و ادامه", Icon: WorkspacePremiumRounded, color: "#f3aa28", bg: "#fff6de" },
  { title: "همراه در هر دستگاه", text: "در موبایل، تبلت و کامپیوتر", Icon: DevicesRounded, color: "#258eff", bg: "#e9f4ff" },
  { title: "واژه‌های دلخواه تو", text: "ذخیره و مرور واژه‌های شخصی", Icon: FavoriteRounded, color: "#f86184", bg: "#fff0f4" },
  { title: "تمرین در هر زمان", text: "یادگیری با ریتم زندگی خودت", Icon: HeadphonesRounded, color: "#1dc29d", bg: "#e5fbf1" },
  { title: "سنجش مهارت‌ها", text: "آزمون و تمرین برای قدم بعدی", Icon: SettingsRounded, color: "#a168f4", bg: "#f3ebff" },
];
export default function WhyLangoSection() {
  return <Box component="section" id="why-lango" sx={{ ...landingContainer, ...sectionSpace, display: "grid", gridTemplateColumns: { xs: "minmax(0,1fr)", lg: "minmax(0,2.2fr) minmax(0,1fr)" }, gap: { xs: 4, md: 3 }, alignItems: "center", direction: "ltr" }}><Box dir="rtl" sx={{ minWidth: 0, textAlign: "center" }}><Typography component="h2" sx={sectionTitle}>چرا لنگو؟</Typography><Typography sx={{ ...sectionDescription, mb: 2.5 }}>یادگیری متفاوت، کاربردی و هماهنگ با زندگی تو</Typography><Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2,minmax(0,1fr))", sm: "repeat(3,minmax(0,1fr))", md: "repeat(5,minmax(0,1fr))" }, gap: 1.25, direction: "ltr" }}>{reasons.map(reason => <Paper key={reason.title} elevation={0} sx={{ p: { xs: 2, md: 1.5 }, border: "1px solid #e7effb", borderRadius: "16px", bgcolor: "#fff", minWidth: 0 }}><Box sx={{ width: 42, height: 42, display: "grid", placeItems: "center", borderRadius: "14px", mx: "auto", bgcolor: reason.bg, color: reason.color, mb: 1 }}><reason.Icon sx={{ fontSize: 27 }} /></Box><Typography component="h3" dir="rtl" sx={{ fontSize: 11.5, color: "#28446d", fontWeight: 800, lineHeight: 1.9 }}>{reason.title}</Typography><Typography dir="rtl" sx={{ fontSize: 9.5, color: "#92a1ba", lineHeight: 1.9, mt: 0.5 }}>{reason.text}</Typography></Paper>)}</Box></Box><Box dir="rtl" sx={{ minWidth: 0 }}><TestimonialsCarousel /></Box></Box>;
}
