import Image from "next/image";
import Link from "next/link";
import { Box, ButtonBase, Typography } from "@mui/material";
import CheckRounded from "@mui/icons-material/CheckRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import LockOutlined from "@mui/icons-material/LockOutlined";

export type LessonStatus = "completed" | "current" | "locked";
export default function PathLessonCard({ title, number, image, status }: { title: string; number: number; image: string; status: LessonStatus }) {
  const locked = status === "locked";
  const Icon = locked ? LockOutlined : status === "completed" ? CheckRounded : PlayArrowRounded;
  const statusLabel = locked ? "قفل‌شده" : status === "completed" ? "تکمیل‌شده" : "درس جاری";
  const content = <>
    <Box sx={{ position: "relative", width: "100%", aspectRatio: "1.5", borderRadius: "9px", overflow: "hidden", bgcolor: "#e4effd" }}>
      <Image src={image} alt="" fill sizes="(max-width: 599px) 40vw, (max-width: 899px) 21vw, 210px" style={{ objectFit: "cover", opacity: locked ? 0.32 : 1 }} />
      <Box sx={{ position: "absolute", top: 5, right: 5, display: "grid", placeItems: "center", width: 25, height: 25, borderRadius: "50%", border: "2px solid white", bgcolor: locked ? "#91a9cb" : status === "completed" ? "#00c58a" : "#087bff", color: "white" }}><Icon sx={{ fontSize: 16 }} /></Box>
    </Box>
    <Typography sx={{ fontSize: 10, color: "#8196b7", mt: 1 }}>درس {number.toLocaleString("fa-IR")}</Typography>
    <Typography component="h3" sx={{ fontSize: { xs: 11, sm: 12, md: 13 }, fontWeight: 700, color: locked ? "#8ca1be" : "#294573", lineHeight: 1.9, textAlign: "center" }}>{title}</Typography>
    {status === "current" && <Typography sx={{ color: "#087bff", fontSize: 10, mt: 0.5 }}>ادامهٔ یادگیری</Typography>}
  </>;
  const sx = { display: "flex", flexDirection: "column", width: "100%", height: "100%", p: 0.75, pb: 1.25, border: status === "current" ? "2px solid #168bff" : "1px solid #e3edfb", borderRadius: "13px", bgcolor: locked ? "#f4f8fe" : "#fff", boxShadow: status === "current" ? "0 6px 16px #168bff17" : "none", "&.Mui-focusVisible": { outline: "3px solid #79b4ff", outlineOffset: 3 } };
  return locked ? <Box aria-label={`${title}، ${statusLabel}`} aria-disabled="true" sx={sx}>{content}</Box> : <ButtonBase component={Link} href="/lesson" aria-label={`${title}، ${statusLabel}`} aria-current={status === "current" ? "step" : undefined} sx={sx}>{content}</ButtonBase>;
}
