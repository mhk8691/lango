"use client";

import { useId } from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import ExerciseFrame from "../shared/ExerciseFrame";
import ExerciseOptions from "../shared/ExerciseOptions";
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

  return (
    <ExerciseFrame questionNumber={questionNumber} totalQuestions={totalQuestions} hasAnswer={answered} onNext={onNext} onPrevious={onPrevious} onExit={onExit} progressColor="warning">
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
          <Box sx={{ gridArea: "options", minWidth: 0 }}>
            <ExerciseOptions options={question.options} selectedOptionId={selectedOptionId} onSelect={onSelect} questionId={`${id}-question`} feedbackId={`${id}-feedback`} correctOptionId={question.correctOptionId} revealAnswer={answered} locked={answered} />
          </Box>
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

    </ExerciseFrame>
  );
}
