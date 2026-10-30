import Link from "next/link";
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import AccessTimeRounded from "@mui/icons-material/AccessTimeRounded";
import QuizOutlined from "@mui/icons-material/QuizOutlined";
import TestIcon from "./TestIcon";
import type { TestItem } from "./data";

export default function TestCard({ test }: { test: TestItem }) {
  return <Paper component="article" elevation={0} sx={{ display: "flex", flexDirection: "column", p: 2, height: "100%", minWidth: 0, border: test.recommended ? "1px solid #669eff" : "1px solid #e4edfa", borderRadius: "16px", bgcolor: "#fff" }}>
    <Stack direction="row" sx={{ alignItems: "flex-start", gap: 1.5, flex: 1 }}>
      <Box sx={{ flex: 1, minWidth: 0 }}><Typography component="h3" sx={{ fontSize: { xs: 16, lg: 15 }, fontWeight: 800, color: "#142954", lineHeight: 1.8 }}>{test.title}</Typography><Typography sx={{ mt: 1, fontSize: 12, lineHeight: 2, color: "#7b8eae" }}>{test.description}</Typography></Box>
      <Stack sx={{ alignItems: "center", gap: 1 }}>{test.recommended && <Chip label="پیشنهاد ویژه" size="small" sx={{ height: 24, bgcolor: "#fff0ce", color: "#d89026", fontSize: 10 }} />}<TestIcon id={test.id} /></Stack>
    </Stack>
    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1.5, color: "#7e91b1", mt: 2, mb: 1.5 }}><Stack direction="row" sx={{ alignItems: "center", gap: 0.5 }}><QuizOutlined sx={{ fontSize: 15 }} /><Typography sx={{ fontSize: 10 }}>{test.format}</Typography></Stack><Stack direction="row" sx={{ alignItems: "center", gap: 0.5 }}><AccessTimeRounded sx={{ fontSize: 15 }} /><Typography sx={{ fontSize: 10 }}>{test.duration}</Typography></Stack></Stack>
    {test.href ? <Button component={Link} href={test.href} variant="outlined" aria-label={`شروع ${test.title}`} sx={{ minHeight: 39, borderRadius: "10px", borderColor: "#b2d1ff", fontSize: 12 }}>{test.id === "placement" ? "شروع آزمون" : "شروع تمرین نمونه"}</Button> : <Button disabled variant="outlined" sx={{ minHeight: 39, borderRadius: "10px", fontSize: 12 }}>به‌زودی</Button>}
  </Paper>;
}
