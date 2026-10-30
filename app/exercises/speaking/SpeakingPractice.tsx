"use client";

import { useRouter } from "next/navigation";
import { Box, Container, Typography } from "@mui/material";
import SpeakingExercise from "@/components/exercises/speaking";

const question = {
  id: "introduce-yourself",
  prompt: "Introduce yourself.",
  description: "Tell us your name and where you are from.",
};

export default function SpeakingPractice() {
  const router = useRouter();
  return (
    <Box component="main" sx={{ minHeight: "100svh", display: "flex", alignItems: "center", py: { xs: 2, sm: 4, lg: 6 }, background: "radial-gradient(ellipse at 15% 15%, #c7e5ff 0%, transparent 48%), radial-gradient(ellipse at 90% 85%, #c8e8ff 0%, transparent 45%), #9dcdff" }}>
      <Container maxWidth={false} sx={{ maxWidth: { xs: 490, sm: 600, md: 680 }, px: { xs: 1.5, sm: 3 } }}>
        <Typography component="h1" sx={{ fontSize: { xs: 21, sm: 25, md: 29 }, fontWeight: 800, color: "#13204f", textAlign: "center", mb: 2 }}>تمرین مکالمه (صوت)</Typography>
        <SpeakingExercise question={question} onExit={() => router.push("/placement-test")} />
      </Container>
    </Box>
  );
}
