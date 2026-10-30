"use client";

import type { ReactNode } from "react";
import { Button, IconButton, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";

type ExerciseFrameBaseProps = {
  children: ReactNode;
  questionNumber: number;
  totalQuestions: number;
  onExit?: () => void;
  progressColor?: "primary" | "warning";
};

export type ExerciseFrameProps = ExerciseFrameBaseProps & (
  | { actions?: never; hasAnswer: boolean; onNext: () => void; onPrevious: () => void }
  | { actions: Exclude<ReactNode, undefined>; hasAnswer?: never; onNext?: never; onPrevious?: never }
);

export default function ExerciseFrame({ children, questionNumber, totalQuestions, hasAnswer, onNext, onPrevious, onExit, progressColor = "primary", actions }: ExerciseFrameProps) {
  const progress = Math.min(100, Math.max(0, questionNumber / Math.max(totalQuestions, 1) * 100));
  return (
    <Paper elevation={0} sx={{ border: "4px solid #e7f3ff", borderRadius: { xs: "22px", md: "30px" }, p: { xs: 1.5, sm: 2.5, md: 3 }, boxShadow: "0 20px 64px #1a6cba18" }}>
      <Stack direction="row" sx={{ direction: "ltr", alignItems: "center", gap: { xs: 1.5, sm: 3 }, mb: { xs: 2, md: 3 } }}>
        <Typography dir="rtl" sx={{ fontSize: { xs: 12, sm: 14 }, whiteSpace: "nowrap", color: "#6f7d9a", bgcolor: "#f7faff", borderRadius: 8, px: 1.25, py: 0.5 }}>
          {questionNumber.toLocaleString("fa-IR")} از {totalQuestions.toLocaleString("fa-IR")}
        </Typography>
        <LinearProgress variant="determinate" value={progress} aria-label="پیشرفت تمرین" aria-valuetext={`سؤال ${questionNumber} از ${totalQuestions}`} sx={{ flex: 1, height: 7, bgcolor: "#e9eff8", "& .MuiLinearProgress-bar": { background: progressColor === "warning" ? "linear-gradient(90deg,#ffc86d,#e9a53b)" : "linear-gradient(90deg,#168bff,#0760ff)" } }} />
        {onExit && <IconButton onClick={onExit} aria-label="خروج از تمرین" size="small" sx={{ bgcolor: "#f1f5fa", color: "#36435e", width: 34, height: 34, borderRadius: "50%" }}><CloseRounded sx={{ fontSize: 17 }} /></IconButton>}
      </Stack>
      {children}
      {actions !== undefined ? <div style={{ marginTop: 16 }}>{actions}</div> : <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
        <Button variant="contained" fullWidth disabled={!hasAnswer} onClick={onNext} sx={{ minHeight: 47, fontSize: { xs: 12, sm: 14 }, background: hasAnswer ? "linear-gradient(180deg,#2287ff,#0760ff)" : undefined }}>{questionNumber === totalQuestions ? "پایان تمرین" : "سؤال بعدی"}</Button>
        <Button variant="outlined" fullWidth disabled={questionNumber <= 1} onClick={onPrevious} sx={{ minHeight: 47, fontSize: { xs: 12, sm: 14 }, borderColor: "#a8ccff", gap: 1, "&.Mui-disabled": { bgcolor: "transparent" } }}>سؤال قبلی <ArrowBackRounded sx={{ fontSize: 17 }} /></Button>
      </Stack>}
    </Paper>
  );
}
