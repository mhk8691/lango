import Image from "next/image";
import Link from "next/link";
import { Box, Button, Card, LinearProgress, Stack, Typography } from "@mui/material";
import FavoriteCourseButton from "@/components/course/FavoriteCourseButton";
import type { CourseCardProps } from "./types";

export default function CourseCard({ courseId, title, levelLabel, description, image, imageAlt, progress, href, actionLabel = "مشاهدهٔ دوره" }: CourseCardProps) {
  const completion = Number.isFinite(progress) ? Math.min(100, Math.max(0, progress)) : 0;
  return <Card component="article" elevation={0} sx={{ height: "100%", display: "flex", flexDirection: "column", p: { xs: 1, md: 1.25 }, border: "1px solid #e2edfc", borderRadius: "15px", bgcolor: "#fff", boxShadow: "0 6px 18px #326ab20b" }}>
    <Box sx={{ position: "relative", width: "100%", aspectRatio: "1.15", overflow: "hidden", borderRadius: "10px", bgcolor: "#edf6ff" }}>
      <Image src={image} alt={imageAlt} fill sizes="(max-width: 399px) 90vw, (max-width: 899px) 45vw, 360px" style={{ objectFit: "cover" }} />
      {courseId && <Box sx={{ position: "absolute", top: 8, right: 8 }}><FavoriteCourseButton courseId={courseId} title={title} compact /></Box>}
    </Box>
    <Stack sx={{ alignItems: "center", flex: 1, minWidth: 0, pt: 1.75, px: { xs: 0.5, sm: 1 }, pb: 0.5 }}>
      <Typography component="h2" lang="en" dir="ltr" sx={{ textAlign: "center", fontSize: { xs: 19, sm: 20, md: 23 }, fontWeight: 800, color: "#102755", overflowWrap: "anywhere" }}>{title}</Typography>
      <Typography lang="en" dir="ltr" sx={{ mt: 0.5, color: "#49648f", fontSize: 13 }}>({levelLabel})</Typography>
      <Typography sx={{ color: "#8194b6", fontSize: { xs: 12, md: 13 }, lineHeight: 2, textAlign: "center", mt: 1 }}>{description}</Typography>
      <Box sx={{ width: "100%", mt: "auto", pt: 2, pb: 2.5 }}>
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", gap: 1, mb: 0.75 }}><Typography sx={{ fontSize: 11, color: "#607da9" }}>پیشرفت دوره</Typography><Typography sx={{ fontSize: 11, color: "#607da9" }}>{Math.round(completion).toLocaleString("fa-IR")}٪</Typography></Stack>
        <LinearProgress variant="determinate" value={completion} aria-label={`پیشرفت دورهٔ ${title}`} sx={{ height: 6, borderRadius: 6, bgcolor: "#e4efff", direction: "ltr", "& .MuiLinearProgress-bar": { bgcolor: "#ffb52c", borderRadius: 6, transition: "none" } }} />
      </Box>
      <Button component={Link} href={href} fullWidth variant="outlined" aria-label={`${actionLabel} ${title}`} sx={{ minHeight: 43, borderRadius: "9px", fontWeight: 700, fontSize: 13, borderColor: "#acd2ff", color: "#0876ff", bgcolor: "#fbfdff" }}>{actionLabel}</Button>
    </Stack>
  </Card>;
}
