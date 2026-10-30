"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Alert, Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import Modal from "@/components/Modal";
import ExerciseFrame from "../shared/ExerciseFrame";
import { countWritingWords } from "./writing-utils";
import type { WritingExerciseProps, WritingFeedback } from "./types";

export default function WritingExercise(props: WritingExerciseProps) {
  return <Editor key={props.question.id} {...props} />;
}

function Editor({ examMode = false, question, value, onChange, questionNumber = 1, totalQuestions = 1, onExit, onReview }: WritingExerciseProps) {
  const id = useId();
  const request = useRef<AbortController | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  const count = countWritingWords(value);
  const maxWords = Math.max(1, question.maxWords ?? 100);
  const minWords = Math.min(maxWords, Math.max(1, question.minWords ?? 1));
  const overLimit = count > maxWords;
  const valid = count >= minWords && !overLimit;

  useEffect(() => () => { request.current?.abort(); }, []);

  function cancel() {
    request.current?.abort();
    request.current = null;
    setBusy(false);
  }

  async function review() {
    if (!valid || busy) return;
    if (!onReview) { setNotice(true); return; }
    const controller = new AbortController();
    request.current = controller;
    setBusy(true);
    setError("");
    try {
      const result = await onReview({ question, text: value.trim(), signal: controller.signal });
      if (!controller.signal.aborted) setFeedback(result);
    } catch {
      if (!controller.signal.aborted) setError("بررسی متن انجام نشد. دوباره تلاش کن؛ نوشته‌ات همچنان اینجاست.");
    } finally {
      if (request.current === controller && !controller.signal.aborted) {
        request.current = null;
        setBusy(false);
      }
    }
  }

  return (
    <>
      <ExerciseFrame embedded={examMode}
        questionNumber={questionNumber} totalQuestions={totalQuestions} progressColor="warning"
        onExit={onExit ? () => { cancel(); onExit(); } : undefined}
        actions={
          <Stack spacing={1}>
            <Button fullWidth disabled={!valid || busy} onClick={review} aria-busy={busy} sx={{
              minHeight: 50, gap: 1.5, borderRadius: "12px", bgcolor: "#e0eeff", color: "#146fff",
              fontSize: { xs: 12.5, sm: 14 }, boxShadow: "none", "&:hover": { bgcolor: "#d2e7ff" },
            }}>
              {busy ? <CircularProgress size={19} /> : <AutoAwesomeRounded sx={{ fontSize: 20 }} />}
              {busy ? "در حال بررسی نوشته…" : "بررسی با هوش مصنوعی"}
            </Button>
            {busy && <Button onClick={cancel} size="small">لغو بررسی</Button>}
          </Stack>
        }
      >
        <Box component="form" noValidate onSubmit={(event) => { event.preventDefault(); void review(); }}>
          <Typography id={`${id}-prompt`} component="h2" dir="ltr" lang="en" sx={{ color: "#45577c", fontSize: { xs: 13.5, sm: 16, md: 18 }, fontWeight: 500, lineHeight: 1.8, mb: 2 }}>
            {question.prompt}
          </Typography>
          <TextField
            id={`${id}-answer`} name="writing-answer" fullWidth multiline minRows={8} maxRows={14}
            value={value} onChange={(event) => { onChange(event.target.value); setError(""); }}
            placeholder={question.placeholder} disabled={busy} error={overLimit}
            slotProps={{
              htmlInput: { dir: "ltr", lang: "en", spellCheck: true, autoCapitalize: "sentences", "aria-labelledby": `${id}-prompt`, "aria-describedby": `${id}-count${overLimit ? ` ${id}-limit` : ""}` },
            }}
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: "9px", alignItems: "flex-start", bgcolor: "#fcfdff" },
              "& textarea": { textAlign: "left", lineHeight: 1.9, fontSize: { xs: 14, sm: 16 }, overflowWrap: "anywhere" },
              "& textarea::placeholder": { color: "#97a7c1", opacity: 1 },
            }}
          />
          <Stack direction="row" sx={{ direction: "ltr", justifyContent: "flex-end", alignItems: "center", gap: 0.75, pt: 1, minHeight: 32, color: overLimit ? "error.main" : "#8190ab" }}>
            <Typography id={`${id}-count`} component="output" aria-label="تعداد کلمات نوشته" dir="ltr" sx={{ fontSize: 12, fontVariantNumeric: "tabular-nums" }}>{count} / {maxWords}</Typography>
            <Typography component="span" sx={{ fontSize: 11 }}>کلمه</Typography>
          </Stack>
          {minWords > 1 && <Typography sx={{ fontSize: 11.5, color: "text.secondary", mt: 0.5 }}>حداقل {minWords.toLocaleString("fa-IR")} کلمه بنویس.</Typography>}
          {overLimit && <Typography id={`${id}-limit`} role="alert" sx={{ color: "error.main", fontSize: 12, mt: 0.5 }}>متنت بیشتر از {maxWords.toLocaleString("fa-IR")} کلمه شده؛ کمی کوتاه‌ترش کن.</Typography>}
          {error && <Alert severity="error" sx={{ mt: 1.5, fontSize: 12 }}>{error}</Alert>}
        </Box>
      </ExerciseFrame>
      <Modal open={notice} onClose={() => setNotice(false)} title="بررسی نوشته" maxWidth="xs" actions={<Button onClick={() => setNotice(false)}>بازگشت به نوشته</Button>}>
        <Typography sx={{ color: "text.secondary" }}>بررسی هوش مصنوعی به‌زودی در دسترس قرار می‌گیرد. نوشتهٔ شما در فرم باقی می‌ماند.</Typography>
      </Modal>
      <Modal open={feedback !== null} onClose={() => setFeedback(null)} title="بازخورد نوشته" maxWidth="sm" actions={<Button onClick={() => setFeedback(null)}>ویرایش نوشته</Button>}>
        {feedback && <Stack spacing={2}>
          <Typography sx={{ color: "text.secondary", whiteSpace: "pre-wrap" }}>{feedback.summary}</Typography>
          {feedback.correctedText && <Box><Typography sx={{ fontSize: 13, fontWeight: 700, mb: 1 }}>متن اصلاح‌شده</Typography><Typography dir="ltr" lang="en" sx={{ bgcolor: "#f2f7ff", p: 2, borderRadius: 2, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{feedback.correctedText}</Typography></Box>}
          {Boolean(feedback.suggestions?.length) && <Box component="ul" sx={{ m: 0, pr: 2.5 }}>{feedback.suggestions?.map((suggestion, index) => <Typography component="li" key={index} sx={{ fontSize: 13, color: "text.secondary", mb: 1 }}>{suggestion}</Typography>)}</Box>}
        </Stack>}
      </Modal>
    </>
  );
}
