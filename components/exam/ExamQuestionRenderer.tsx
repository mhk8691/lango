"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import InteractiveExercise from "@/components/exercises/interactive/InteractiveExercise";
import ListeningExercise from "@/components/exercises/listening/ListeningExercise";
import SentenceCompletionExercise from "@/components/exercises/sentence-completion/SentenceCompletionExercise";
import DragAndDropExercise from "@/components/exercises/drag-and-drop/DragAndDropExercise";
import WritingExercise from "@/components/exercises/writing/WritingExercise";
import SpeakingExercise from "@/components/exercises/speaking/SpeakingExercise";
import type { ExamAnswer, ExamQuestion } from "./types";

function SavedAudio({ blob }: { blob: Blob }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    const element = ref.current;
    const url = URL.createObjectURL(blob);
    if (element) element.src = url;
    return () => { element?.pause(); URL.revokeObjectURL(url); };
  }, [blob]);
  return <Box sx={{ mb: 2, p: 1.5, bgcolor: "#edf8f3", borderRadius: 2 }}><Typography sx={{ fontSize: 12, color: "#258365", mb: 1 }}>پاسخ صوتی ثبت‌شده؛ ضبط جدید جایگزین آن می‌شود.</Typography><Box component="audio" ref={ref} controls aria-label="پاسخ صوتی ثبت‌شده" sx={{ width: "100%" }} /></Box>;
}

export default function ExamQuestionRenderer({ question, answer, onChange, onBusyChange, index, total }: {
  question: ExamQuestion; answer?: ExamAnswer; onChange: (answer: ExamAnswer) => void; onBusyChange: (busy: boolean) => void; index: number; total: number;
}) {
  const [restoredBlob] = useState(() => answer?.kind === "speaking" ? answer.blob : null);
  const common = { examMode: true, questionNumber: index + 1, totalQuestions: total, onNext: () => {}, onPrevious: () => {} };
  const choice = { selectedOptionId: answer?.kind === "choice" ? answer.optionId : null, onSelect: (optionId: string) => onChange({ kind: "choice", optionId }) };
  switch (question.kind) {
    case "interactive": return <InteractiveExercise {...common} {...choice} question={question.content} />;
    case "listening": return <ListeningExercise {...common} {...choice} question={question.content} />;
    case "sentence-completion": return <SentenceCompletionExercise {...common} {...choice} question={question.content} />;
    case "drag-and-drop": return <DragAndDropExercise {...common} question={question.content} value={answer?.kind === "order" ? answer.tokenIds : []} onChange={tokenIds => onChange({ kind: "order", tokenIds })} />;
    case "writing": return <WritingExercise {...common} question={question.content} value={answer?.kind === "writing" ? answer.text : ""} onChange={text => onChange({ kind: "writing", text })} />;
    case "speaking": return <>{answer?.kind === "speaking" && answer.blob === restoredBlob && <SavedAudio blob={answer.blob} />}<SpeakingExercise question={question.content} maxDurationSeconds={question.maxDurationSeconds} onBusyChange={onBusyChange} onRecorded={recording => onChange({ kind: "speaking", blob: recording.blob, duration: recording.duration, mimeType: recording.mimeType })} /></>;
  }
}
