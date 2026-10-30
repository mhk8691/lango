"use client";

import { useState } from "react";
import { useAppRouter as useRouter } from "@/components/AppLink";
import { Box, Container, Typography } from "@mui/material";
import WritingExercise from "@/components/exercises/writing";

const question = {
  id: "daily-routine",
  prompt: "Write a short paragraph about your daily routine.",
  placeholder: "I usually wake up at 7 o’clock.\nI brush my teeth and have breakfast.\nThen I go to school…",
  maxWords: 100,
};

export default function WritingPractice() {
  const router = useRouter();
  const [answer, setAnswer] = useState("");
  return (
    <Box component="main" sx={{ minHeight: "100svh", display: "flex", alignItems: "center", py: { xs: 2, sm: 4, lg: 6 }, background: "radial-gradient(ellipse at 15% 15%, #c7e5ff 0%, transparent 48%), radial-gradient(ellipse at 90% 85%, #c8e8ff 0%, transparent 45%), #9dcdff" }}>
      <Container maxWidth={false} sx={{ maxWidth: { xs: 490, sm: 660, md: 820 }, px: { xs: 1.5, sm: 3 } }}>
        <Typography component="h1" sx={{ fontSize: { xs: 21, sm: 25, md: 29 }, fontWeight: 800, color: "#13204f", textAlign: "center", mb: 2 }}>تمرین نوشتاری</Typography>
        <WritingExercise question={question} value={answer} onChange={setAnswer} onExit={() => router.push("/placement-test")} />
      </Container>
    </Box>
  );
}
