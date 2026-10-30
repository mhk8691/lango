"use client";

import { useId } from "react";
import { Box, Stack, Typography } from "@mui/material";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import CancelRounded from "@mui/icons-material/CancelRounded";
import type { ExerciseOption } from "./types";

export type ExerciseOptionsProps = {
  options: readonly ExerciseOption[];
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
  questionId: string;
  feedbackId?: string;
  correctOptionId?: string;
  revealAnswer?: boolean;
  locked?: boolean;
};

export default function ExerciseOptions({ options, selectedOptionId, onSelect, questionId, feedbackId, correctOptionId, revealAnswer = false, locked = false }: ExerciseOptionsProps) {
  const id = useId();
  return (
    <Stack role="radiogroup" dir="ltr" aria-labelledby={questionId} aria-describedby={feedbackId} spacing={1} sx={{ minWidth: 0 }}>
      {options.map((option) => {
        const selected = selectedOptionId === option.id;
        const showCorrect = revealAnswer && option.id === correctOptionId;
        const showIncorrect = revealAnswer && selected && option.id !== correctOptionId;
        const color = showCorrect ? "#08ad73" : showIncorrect ? "#e65568" : selected ? "#1677ff" : "#31436d";
        return (
          <Box component="label" key={option.id} sx={{
            position: "relative", display: "flex", alignItems: "center", gap: { xs: 1, sm: 1.5 },
            minHeight: { xs: 45, sm: 50, md: 56 }, px: { xs: 1, sm: 1.5 }, py: 0.75,
            border: "1px solid", borderColor: showCorrect ? "#14bd83" : showIncorrect ? "#ef6a77" : selected ? "#9dc5ff" : "#dce7f4",
            bgcolor: showCorrect ? "#ddf8ed" : showIncorrect ? "#fff0f2" : selected ? "#e8f2ff" : "#fff", borderRadius: "9px",
            color, cursor: locked ? "default" : "pointer",
            "&:hover": { borderColor: locked ? undefined : "primary.main" },
            "&:has(input:focus-visible)": { outline: "2px solid", outlineColor: "primary.main", outlineOffset: 3 },
          }}>
            <Box component="input" type="radio" name={`${id}-answer`} value={option.id} checked={selected} disabled={locked} onChange={() => onSelect(option.id)} sx={{ position: "absolute", inset: 0, opacity: 0, m: 0, width: "100%", height: "100%", cursor: "inherit" }} />
            {showIncorrect ? <CancelRounded sx={{ color, fontSize: 21, flexShrink: 0 }} /> : selected || showCorrect ? <CheckCircleRounded sx={{ color, fontSize: 21, flexShrink: 0 }} /> : <Box aria-hidden="true" sx={{ width: 18, height: 18, border: "1.5px solid #c5d5ec", borderRadius: "50%", flexShrink: 0 }} />}
            <Typography component="span" lang="en" sx={{ fontSize: { xs: 14, sm: 16 }, lineHeight: 1.6, overflowWrap: "anywhere" }}>{option.text}</Typography>
          </Box>
        );
      })}
    </Stack>
  );
}
