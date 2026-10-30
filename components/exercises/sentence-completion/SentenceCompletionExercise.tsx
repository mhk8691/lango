"use client";

import { useId } from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import ExerciseFrame from "../shared/ExerciseFrame";
import ExerciseOptions from "../shared/ExerciseOptions";
import ExerciseFeedback from "../shared/ExerciseFeedback";
import type { SentenceCompletionExerciseProps } from "./types";

export default function SentenceCompletionExercise({ question, questionNumber, totalQuestions, selectedOptionId, onSelect, onNext, onPrevious, onExit }: SentenceCompletionExerciseProps) {
  const id = useId();
  const selected = question.options.find((option) => option.id === selectedOptionId);
  const answered = Boolean(selected);
  const correct = selectedOptionId === question.correctOptionId;
  const correctOption = question.options.find((option) => option.id === question.correctOptionId);

  return (
    <ExerciseFrame questionNumber={questionNumber} totalQuestions={totalQuestions} hasAnswer={answered} onNext={onNext} onPrevious={onPrevious} onExit={onExit} progressColor="warning">
      <Box sx={{ p: { xs: 1, sm: 2, md: 3 }, borderRadius: "18px", bgcolor: "#fbfdff", border: "1px solid #edf3fa" }}>
        <Typography dir="ltr" lang="en" sx={{ textAlign: "center", color: "#7585a3", fontSize: { xs: 12, sm: 14, md: 15 }, lineHeight: 1.8, mb: 2 }}>
          {question.instruction ?? "Look at the picture and complete the sentence."}
        </Typography>
        <Box sx={{ position: "relative", width: "100%", maxWidth: { xs: 230, sm: 310, md: 370 }, aspectRatio: "3 / 2", overflow: "hidden", borderRadius: "12px", mx: "auto", bgcolor: "#e7f3ff" }}>
          <Image src={question.image.src} alt={question.image.alt} fill sizes="(max-width: 599px) 230px, (max-width: 899px) 310px, 370px" style={{ objectFit: "cover" }} />
        </Box>
        <Typography
          id={`${id}-sentence`} component="h2" dir="ltr" lang="en"
          aria-label={`${question.sentence.before} ${selected?.text ?? "blank"} ${question.sentence.after}`}
          sx={{ textAlign: "center", color: "#142354", fontSize: { xs: 14, sm: 17, md: 20 }, fontWeight: 500, lineHeight: 2, mt: 1.5, mb: 2 }}
        >
          {question.sentence.before}{" "}
          <Box component="span" sx={{ display: "inline-block", minWidth: { xs: 45, sm: 64 }, px: 0.5, borderBottom: "1px solid", borderColor: !answered ? "#94a7c8" : correct ? "#15ad7d" : "#df6073", color: !answered ? "inherit" : correct ? "#099668" : "#cf5265", fontWeight: answered ? 700 : 400 }}>{selected?.text ?? "_____"}</Box>
          {" "}{question.sentence.after}
        </Typography>
        <ExerciseOptions options={question.options} selectedOptionId={selectedOptionId} onSelect={onSelect} questionId={`${id}-sentence`} feedbackId={`${id}-feedback`} correctOptionId={question.correctOptionId} revealAnswer={answered} locked={answered} />
        <ExerciseFeedback id={`${id}-feedback`} correct={answered ? correct : null} correctAnswer={correctOption?.text} explanation={question.explanation} />
      </Box>
    </ExerciseFrame>
  );
}
