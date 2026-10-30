import type { Metadata } from "next";
import { Box } from "@mui/material";
import LandingHeader from "@/components/landing/LandingHeader";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import LearningJourneySection from "@/components/landing/LearningJourneySection";
import CoursesSection from "@/components/landing/CoursesSection";
import WhyLangoSection from "@/components/landing/WhyLangoSection";
import PricingSection from "@/components/landing/PricingSection";
import LandingFooter from "@/components/landing/LandingFooter";

export const metadata: Metadata = {
  title: "لنگو | یادگیری آسان و لذت‌بخش انگلیسی",
  description:
    "یادگیری انگلیسی با مسیر سطح‌بندی‌شده، تمرین‌های متنوع و مرور واژه‌ها؛ با لنگو قدم‌به‌قدم شروع کن.",
};

export default function LandingPage() {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        bgcolor: "#f6faff",
        backgroundImage:
          "radial-gradient(ellipse at 95% 36%,#e8f3ff 0%,transparent 30%),radial-gradient(ellipse at 4% 65%,#e2f0ff 0%,transparent 27%),linear-gradient(180deg,#fbfdff,#f4f9ff)",
        overflowX: "clip",
      }}
    >
      <LandingHeader />
      <Box component="main" aria-label="آموزش زبان انگلیسی با لنگو">
        <HeroSection />
        <FeaturesSection />
        <LearningJourneySection />
        <CoursesSection />
        <WhyLangoSection />
        <PricingSection />
      </Box>
      <LandingFooter />
    </Box>
  );
}
