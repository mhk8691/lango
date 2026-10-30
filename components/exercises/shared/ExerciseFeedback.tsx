import { Box, Typography } from "@mui/material";

export type ExerciseFeedbackProps = {
  id: string;
  correct: boolean | null;
  correctAnswer?: string;
  explanation?: string;
};

export default function ExerciseFeedback({ id, correct, correctAnswer, explanation }: ExerciseFeedbackProps) {
  const answered = correct !== null;
  return (
    <Box id={id} role="status" aria-live="polite" aria-atomic="true" sx={{
      minHeight: 48, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      textAlign: "center", mt: 2.5, px: 1.5, py: 1.25, borderRadius: "9px",
      bgcolor: !answered ? "#f1f6fc" : correct ? "#e1f8ef" : "#fff0f2",
      color: !answered ? "#8090aa" : correct ? "#129574" : "#c95265",
    }}>
      <Typography sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: answered ? 600 : 400 }}>
        {!answered ? "گزینهٔ درست را انتخاب کنید." : correct ? "آفرین! پاسخ درست است." : <>پاسخ درست نیست.{correctAnswer && <> گزینهٔ صحیح: <bdi lang="en">{correctAnswer}</bdi></>}</>}
      </Typography>
      {answered && explanation && <Typography sx={{ fontSize: { xs: 11, sm: 12 }, mt: 0.5, lineHeight: 1.8 }}>{explanation}</Typography>}
    </Box>
  );
}
