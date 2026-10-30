"use client";

import Link from "next/link";
import { Alert, Button, Chip, Stack, Typography } from "@mui/material";
import TestResult from "@/components/test-result";
import type { ExamResult } from "./types";

export default function ExamResultView({ result, demo, onExit }: { result: ExamResult; demo?: boolean; onExit: () => void }) {
  const stats = [
    ["پاسخ‌های کامل", `${result.answeredCount.toLocaleString("fa-IR")} از ${result.questionCount.toLocaleString("fa-IR")}`],
    ...(result.objectiveCount > 0 ? [["پاسخ صحیح خودکار", `${result.correctCount.toLocaleString("fa-IR")} از ${result.objectiveCount.toLocaleString("fa-IR")}`]] : []),
    ["نیازمند ارزیابی نوشته یا صدا", result.pendingReviewCount.toLocaleString("fa-IR")],
  ];
  return <TestResult
    result={{ score: result.score, message: "پاسخ‌های شما ثبت شد", skills: result.skills ?? [] }}
    title="نتیجهٔ آزمون شما" scoreLabel="درصد پاسخ صحیح در سؤال‌های خودکار"
    onBack={onExit} backLabel="بازگشت به آزمون‌ها"
    actions={<Stack spacing={1.25}><Button component={Link} href="/learning-path" variant="contained" sx={{ minHeight: 48 }}>مشاهدهٔ مسیر یادگیری</Button><Button onClick={onExit}>بازگشت به آزمون‌ها</Button></Stack>}
  >
    <Typography sx={{ color: "#6d86a8", lineHeight: 2.2, fontSize: 13, mt: 2.5 }}>{result.message}</Typography>
    {result.estimatedLevel && <Chip label={`سطح تمرینی پیشنهادی: ${result.estimatedLevel}`} sx={{ mt: 2, color: "#1676d5", bgcolor: "#e5f1ff" }} />}
    <Stack component="dl" spacing={1.5} sx={{ my: 3 }}>{stats.map(([label, value]) => <Stack key={label} direction="row" sx={{ justifyContent: "space-between", gap: 1 }}><Typography component="dt" sx={{ fontSize: 12, color: "#7289a7" }}>{label}</Typography><Typography component="dd" sx={{ m: 0, fontSize: 13, fontWeight: 700, color: "#345879" }}>{value}</Typography></Stack>)}</Stack>
    {demo && <Alert severity="warning" sx={{ fontSize: 12 }}>این برآورد آموزشی و غیررسمی است. ارزیابی تخصصی نوشته و صدا و تعیین سطح معتبر به بک‌اند نیاز دارد؛ در این نسخه فایل‌ها ارسال یا نگهداری دائمی نمی‌شوند.</Alert>}
  </TestResult>;
}
