import { Box, Button, Typography } from "@mui/material";
import FlagRounded from "@mui/icons-material/FlagRounded";
import PersonRounded from "@mui/icons-material/PersonRounded";
import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import Link from "@/components/AppLink";
import ProductMockup from "./ProductMockup";
import { landingContainer, sectionTitle, sectionDescription, sectionSpace } from "./styles";

const steps = [
  { title: "تعیین سطح", text: "اول، نقطهٔ شروع خودت را پیدا کن.", Icon: FlagRounded, color: "#0ecda0", href: "/dashboard/placement-test" },
  { title: "مسیر شخصی", text: "برای قدم بعدی، یک هدف انتخاب کن.", Icon: PersonRounded, color: "#269bff", href: "/dashboard/learning-path" },
  { title: "یادگیری", text: "با درس‌های متنوع، بیشتر یاد بگیر.", Icon: AutoStoriesRounded, color: "#a46bff", href: "/dashboard/courses" },
  { title: "تمرین و مرور", text: "با تکرار و تمرین، آموخته‌ها را ماندگار کن.", Icon: CheckCircleRounded, color: "#ffb03b", href: "/dashboard/exercises" },
];
export default function LearningJourneySection() {
  return <Box component="section" id="learning-path" sx={{ ...landingContainer, ...sectionSpace, display: "grid", gridTemplateColumns: { xs: "minmax(0,1fr)", md: "minmax(0,1fr) minmax(0,1fr)" }, gap: { xs: 4, md: 5 }, alignItems: "center", direction: "ltr" }}>
    <Box sx={{ order: { xs: 1, md: 0 } }}><ProductMockup /></Box>
    <Box dir="rtl" sx={{ minWidth: 0, textAlign: { xs: "center", md: "right" } }}><Typography component="h2" sx={sectionTitle}>مسیر یادگیری، مرحله‌به‌مرحله</Typography><Typography sx={{ ...sectionDescription, mt: 0.75 }}>با لنگو، از سطح مبتدی تا پیشرفته، قدم‌به‌قدم و هدفمند پیش برو.</Typography><Box sx={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: { xs: 0.5, sm: 1.5 }, mt: 4, direction: "ltr", "&:before": { content: '\"\"', position: "absolute", left: "10%", right: "10%", top: 28, borderTop: "2px dashed #b9d5ff" } }}>{steps.map(step => <Box component={Link} href={step.href} key={step.title} sx={{ position: "relative", textDecoration: "none", minWidth: 0, textAlign: "center", color: "inherit" }}><Box sx={{ width: { xs: 48, sm: 58 }, height: { xs: 48, sm: 58 }, display: "grid", placeItems: "center", mx: "auto", bgcolor: step.color, color: "#fff", borderRadius: "50%", border: "4px solid white", boxShadow: `0 5px 14px ${step.color}30`, mb: 1.5 }}><step.Icon sx={{ fontSize: 27 }} /></Box><Typography component="h3" dir="rtl" sx={{ fontSize: { xs: 11.5, sm: 14 }, color: "#20385e", fontWeight: 800, mb: 0.75 }}>{step.title}</Typography><Typography dir="rtl" sx={{ color: "#8b9bb5", fontSize: { xs: 10, sm: 12 }, lineHeight: 1.9 }}>{step.text}</Typography></Box>)}</Box><Button component={Link} href="/dashboard/learning-path" variant="outlined" sx={{ mt: 3, borderRadius: 8, gap: 1, fontSize: 12 }}>مشاهدهٔ مسیر یادگیری<ArrowBackRounded sx={{ fontSize: 17 }} /></Button></Box>
  </Box>;
}
