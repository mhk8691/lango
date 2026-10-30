import { Box, Paper, Typography } from "@mui/material";
import LayersRounded from "@mui/icons-material/LayersRounded";
import TrackChangesRounded from "@mui/icons-material/TrackChangesRounded";
import ForumRounded from "@mui/icons-material/ForumRounded";
import BarChartRounded from "@mui/icons-material/BarChartRounded";
import { visuallyHidden } from "@mui/utils";
import { landingContainer } from "./styles";

const features = [
  { title: "محتوای سطح‌بندی‌شده", text: "از پایه تا پیشرفته، مسیرهای مشخصی برای قدم بعدی یادگیری‌ات پیدا کن.", Icon: LayersRounded, color: "#ff9148", bg: "#fff1e5" },
  { title: "مسیر متناسب با سطح شما", text: "با آزمون تعیین سطح شروع کن و مسیر یادگیری مناسب خودت را بشناس.", Icon: TrackChangesRounded, color: "#168bff", bg: "#e6f3ff" },
  { title: "آموزش تعاملی و جذاب", text: "تمرین‌های متنوع و موقعیت‌های واقعی، یادگیری را به تجربه‌ای زنده تبدیل می‌کنند.", Icon: ForumRounded, color: "#9b6bff", bg: "#f0e7ff" },
  { title: "پیشرفت قابل اندازه‌گیری", text: "با گزارش‌ها و نتیجهٔ تمرین‌ها، قدم‌های یادگیری‌ات را بهتر ببین.", Icon: BarChartRounded, color: "#18be83", bg: "#e4faef" },
];
export default function FeaturesSection() {
  return <Box component="section" id="features" aria-labelledby="landing-features-title" sx={{ ...landingContainer, py: { xs: 2, md: 3 }, scrollMarginTop: 100 }}><Typography component="h2" id="landing-features-title" sx={visuallyHidden}>ویژگی‌های لنگو</Typography><Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0,1fr)", sm: "repeat(2,minmax(0,1fr))", md: "repeat(4,minmax(0,1fr))" }, gap: 2 }}>{features.map(feature => <Paper component="article" key={feature.title} elevation={0} sx={{ p: { xs: 2.5, md: 2 }, textAlign: "center", border: "1px solid #e6effb", borderRadius: "22px", boxShadow: "0 12px 32px #8cbae411", background: "linear-gradient(160deg,#fff,#fbfdff)", transition: "transform 180ms", "&:hover": { transform: "translateY(-4px)" }, "@media (prefers-reduced-motion: reduce)": { transition: "none" } }}><Box sx={{ width: 53, height: 53, mx: "auto", display: "grid", placeItems: "center", borderRadius: "18px", bgcolor: feature.bg, color: feature.color, mb: 1.5 }}><feature.Icon sx={{ fontSize: 33, filter: `drop-shadow(0 3px 3px ${feature.color}25)` }} /></Box><Typography component="h3" sx={{ fontSize: { xs: 18, md: 16 }, fontWeight: 800, color: "#142650", lineHeight: 1.8 }}>{feature.title}</Typography><Typography sx={{ mt: 0.75, fontSize: 12.5, lineHeight: 2, color: "#8595b0" }}>{feature.text}</Typography></Paper>)}</Box></Box>;
}
