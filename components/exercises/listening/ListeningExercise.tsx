"use client";

import { useId } from "react";
import { Box, Typography } from "@mui/material";
import ExerciseFrame from "../shared/ExerciseFrame";
import ExerciseOptions from "../shared/ExerciseOptions";
import AudioPlayer from "../shared/AudioPlayer";
import type { ListeningExerciseProps } from "./types";

export default function ListeningExercise({ examMode = false, question, questionNumber, totalQuestions, selectedOptionId, onSelect, onNext, onPrevious, onExit }: ListeningExerciseProps) {
  const id = useId();
  const answered = question.options.some((option) => option.id === selectedOptionId);
  return (
    <ExerciseFrame embedded={examMode} questionNumber={questionNumber} totalQuestions={totalQuestions} hasAnswer={answered} onNext={onNext} onPrevious={onPrevious} onExit={onExit}>
      <Box sx={{ p: { xs: 1, sm: 2, md: 3 }, borderRadius: "18px", bgcolor: "#fbfdff", border: "1px solid #edf3fa" }}>
        <AudioPlayer src={question.audio.src} waveform={question.audio.waveform} />
        <Typography id={`${id}-question`} component="h2" dir="ltr" lang="en" sx={{ color: "#12204f", fontSize: { xs: 15, sm: 19, md: 22 }, fontWeight: 600, lineHeight: 1.8, mt: { xs: 2, md: 3 }, mb: 1.5 }}>
          {question.prompt}
        </Typography>
        <ExerciseOptions options={question.options} selectedOptionId={selectedOptionId} onSelect={onSelect} questionId={`${id}-question`} />
      </Box>
    </ExerciseFrame>
  );
}
