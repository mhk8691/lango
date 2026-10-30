"use client";

import { useId } from "react";
import Image from "next/image";
import { Box, Button, IconButton, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import CancelRounded from "@mui/icons-material/CancelRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import type { InteractiveExerciseProps } from "./types";

export default function InteractiveExercise({
  question,
  questionNumber,
  totalQuestions,
  selectedOptionId,
  onSelect,
  onNext,
  onPrevious,
  onExit,
}: InteractiveExerciseProps) {
  const id = useId();
  const selectedOption = question.options.find((option) => option.id === selectedOptionId);
  const answered = Boolean(selectedOption);
  const correct = selectedOptionId === question.correctOptionId;
  const correctOption = question.options.find((option) => option.id === question.correctOptionId);
  const lastQuestion = questionNumber === totalQuestions;
  const progress = Math.min(100, Math.max(0, questionNumber / Math.max(totalQuestions, 1) * 100));

  return (
    <Paper elevation={0} sx={{ border: "4px solid #e7f3ff", borderRadius: { xs: "22px", md: "30px" }, p: { xs: 1.5, sm: 2.5, md: 3 }, boxShadow: "0 20px 64px #1a6cba18" }}>
      <Stack direction="row" sx={{ direction: "ltr", alignItems: "center", gap: { xs: 1.5, sm: 3 }, mb: { xs: 2, md: 3 } }}>
        <Typography dir="rtl" sx={{ fontSize: { xs: 12, sm: 14 }, whiteSpace: "nowrap", color: "#6f7d9a", bgcolor: "#f7faff", borderRadius: 8, px: 1.25, py: 0.5 }}>
          {questionNumber.toLocaleString("fa-IR")} از {totalQuestions.toLocaleString("fa-IR")}
        </Typography>
        <LinearProgress variant="determinate" value={progress} aria-label="پیشرفت تمرین" aria-valuetext={`سؤال ${questionNumber} از ${totalQuestions}`} sx={{ flex: 1, height: 7, bgcolor: "#f0f4fa", "& .MuiLinearProgress-bar": { background: "linear-gradient(90deg,#ffc86d,#e9a53b)" } }} />
        {onExit && <IconButton onClick={onExit} aria-label="خروج از تمرین" size="small" sx={{ bgcolor: "#f1f5fa", color: "#36435e", width: 34, height: 34, borderRadius: "50%" }}><CloseRounded sx={{ fontSize: 17 }} /></IconButton>}
      </Stack>

      <Box sx={{ p: { xs: 1.25, sm: 2, md: 3 }, borderRadius: "18px", bgcolor: "#fbfdff", border: "1px solid #edf3fa" }}>
        <Box dir="ltr" sx={{
          display: "grid",
          gridTemplateColumns: question.image ? { xs: "52px minmax(0,1fr)", sm: "82px minmax(0,1fr)", md: "116px minmax(0,1fr)" } : "minmax(0,1fr)",
          gridTemplateAreas: question.image ? '"image question" "image options"' : '"question" "options"',
          columnGap: { xs: 1.25, sm: 2.5, md: 3 }, rowGap: { xs: 1.5, md: 2 },
        }}>
          {question.image && (
            <Box sx={{ gridArea: "image", width: "100%", aspectRatio: "1", position: "relative", alignSelf: "start", overflow: "hidden", borderRadius: "10px", bgcolor: "#eaf4fc" }}>
              <Image src={question.image.src} alt={question.image.alt} fill sizes="(max-width: 599px) 52px, (max-width: 899px) 82px, 116px" style={{ objectFit: "cover" }} />
            </Box>
          )}
          <Typography id={`${id}-question`} component="h2" lang="en" sx={{ gridArea: "question", color: "#12204f", fontSize: { xs: 14, sm: 18, md: 21 }, fontWeight: 600, lineHeight: 1.8, overflowWrap: "anywhere" }}>
            {question.prompt}
          </Typography>
          <Stack role="radiogroup" aria-labelledby={`${id}-question`} aria-describedby={`${id}-feedback`} spacing={1} sx={{ gridArea: "options", minWidth: 0 }}>
            {question.options.map((option) => {
              const selected = selectedOptionId === option.id;
              const showCorrect = answered && option.id === question.correctOptionId;
              const showIncorrect = selected && !correct;
              return (
                <Box component="label" key={option.id} sx={{
                  position: "relative", display: "flex", alignItems: "center", gap: { xs: 1, sm: 1.5 },
                  minHeight: { xs: 45, sm: 50, md: 56 }, px: { xs: 1, sm: 1.5 }, py: 0.75,
                  border: "1px solid", borderColor: showCorrect ? "#14bd83" : showIncorrect ? "#ef6a77" : "#dce7f4",
                  bgcolor: showCorrect ? "#ddf8ed" : showIncorrect ? "#fff0f2" : "#fff", borderRadius: "9px",
                  color: "#31436d", cursor: answered ? "default" : "pointer",
                  "&:hover": { borderColor: answered ? undefined : "primary.main", bgcolor: answered ? undefined : "#f2f8ff" },
                  "&:has(input:focus-visible)": { outline: "2px solid", outlineColor: "primary.main", outlineOffset: 3 },
                }}>
                  <Box component="input" type="radio" name={`${id}-answer`} value={option.id} checked={selected} disabled={answered} onChange={() => onSelect(option.id)} sx={{ position: "absolute", inset: 0, opacity: 0, m: 0, width: "100%", height: "100%", cursor: "inherit" }} />
                  {showCorrect ? <CheckCircleRounded sx={{ color: "#08ad73", fontSize: 21, flexShrink: 0 }} /> : showIncorrect ? <CancelRounded sx={{ color: "#e65568", fontSize: 21, flexShrink: 0 }} /> : <Box aria-hidden="true" sx={{ width: 18, height: 18, border: "1.5px solid #c5d5ec", borderRadius: "50%", flexShrink: 0 }} />}
                  <Typography component="span" lang="en" sx={{ fontSize: { xs: 14, sm: 16 }, lineHeight: 1.6, overflowWrap: "anywhere" }}>{option.text}</Typography>
                </Box>
              );
            })}
          </Stack>
        </Box>

        <Box id={`${id}-feedback`} role="status" aria-live="polite" aria-atomic="true" sx={{
          minHeight: 48, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center", mt: 2.5, px: 1.5, py: 1.25, borderRadius: "9px",
          bgcolor: !answered ? "#f1f6fc" : correct ? "#e1f8ef" : "#fff0f2",
          color: !answered ? "#8090aa" : correct ? "#129574" : "#c95265",
        }}>
          <Typography sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: answered ? 600 : 400 }}>
            {!answered ? "گزینهٔ درست را انتخاب کنید." : correct ? "آفرین! پاسخ درست است." : <>پاسخ درست نیست. گزینهٔ صحیح: <bdi lang="en">{correctOption?.text}</bdi></>}
          </Typography>
          {answered && question.explanation && <Typography sx={{ fontSize: { xs: 11, sm: 12 }, mt: 0.5, lineHeight: 1.8 }}>{question.explanation}</Typography>}
        </Box>
      </Box>

      <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
        <Button variant="contained" fullWidth disabled={!answered} onClick={onNext} sx={{ minHeight: 47, fontSize: { xs: 12, sm: 14 }, background: answered ? "linear-gradient(180deg,#2287ff,#0760ff)" : undefined }}>{lastQuestion ? "پایان تمرین" : "سؤال بعدی"}</Button>
        <Button variant="outlined" fullWidth disabled={questionNumber <= 1} onClick={onPrevious} sx={{ minHeight: 47, fontSize: { xs: 12, sm: 14 }, borderColor: "#a8ccff", gap: 1, "&.Mui-disabled": { bgcolor: "transparent" } }}>سؤال قبلی <ArrowBackRounded sx={{ fontSize: 17 }} /></Button>
      </Stack>
    </Paper>
  );
}
