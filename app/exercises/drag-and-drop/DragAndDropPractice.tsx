"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import DragAndDropExercise from "@/components/exercises/drag-and-drop";
import { isCorrectOrder } from "@/components/exercises/drag-and-drop/order-utils";
import Modal from "@/components/Modal";
import { questions } from "./questions";

export default function DragAndDropPractice() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [finished, setFinished] = useState(false);
  const question = questions[active];
  const correctCount = questions.filter((item) => isCorrectOrder(item.tokens, answers[item.id] ?? [], item.correctOrder)).length;

  return (
    <Box component="main" sx={{ minHeight: "100svh", display: "flex", alignItems: "center", py: { xs: 2, sm: 4, lg: 6 }, background: "radial-gradient(ellipse at 15% 15%, #c7e5ff 0%, transparent 48%), radial-gradient(ellipse at 90% 85%, #c8e8ff 0%, transparent 45%), #9dcdff" }}>
      <Container maxWidth={false} sx={{ maxWidth: { xs: 490, sm: 680, md: 900 }, px: { xs: 1.5, sm: 3 } }}>
        <Typography component="h1" sx={{ fontSize: { xs: 21, sm: 25, md: 29 }, fontWeight: 800, color: "#13204f", textAlign: "center", mb: 2 }}>تمرین کشیدن و چیدن</Typography>
        <DragAndDropExercise
          question={question}
          questionNumber={active + 1}
          totalQuestions={questions.length}
          value={answers[question.id] ?? []}
          onChange={(order) => setAnswers((previous) => ({ ...previous, [question.id]: order }))}
          onNext={() => { if (active === questions.length - 1) setFinished(true); else setActive((current) => current + 1); }}
          onPrevious={() => setActive((current) => Math.max(0, current - 1))}
          onExit={() => router.push("/placement-test")}
        />
      </Container>
      <Modal open={finished} onClose={() => setFinished(false)} title="تمرین‌ها رو تموم کردی!" maxWidth="xs" actions={
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ width: "100%" }}>
          <Button variant="contained" fullWidth onClick={() => { setActive(0); setAnswers({}); setFinished(false); }}>تمرین دوباره</Button>
          <Button fullWidth onClick={() => router.push("/placement-test")}>بازگشت</Button>
        </Stack>
      }>
        <CheckCircleRounded sx={{ display: "block", mx: "auto", color: "success.main", fontSize: 48, mb: 2 }} />
        <Typography sx={{ textAlign: "center", color: "text.secondary" }}>از {questions.length.toLocaleString("fa-IR")} سؤال، به {correctCount.toLocaleString("fa-IR")} سؤال پاسخ درست دادی.</Typography>
      </Modal>
    </Box>
  );
}
