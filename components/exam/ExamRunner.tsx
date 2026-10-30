"use client";

import { useEffect, useRef, useState } from "react";
import { Alert, Box, Button, Chip, CircularProgress, Container, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import Modal from "@/components/Modal";
import ExamResultView from "./ExamResultView";
import ExamQuestionRenderer from "./ExamQuestionRenderer";
import { completeAnswers, definitionError, isCompleteAnswer } from "./exam-utils";
import type { ExamAnswers, ExamResult, ExamRunnerProps } from "./types";

const labels = { interactive: "چهارگزینه‌ای", listening: "شنیداری", "sentence-completion": "تکمیل جمله", "drag-and-drop": "چیدن کلمات", writing: "نوشتاری", speaking: "مکالمهٔ صوتی" };
export default function ExamRunner(props: ExamRunnerProps) {
  const error = definitionError(props.definition);
  if (error) return <Container sx={{ py: 5 }}><Alert severity="error">{error}</Alert><Button onClick={props.onExit}>بازگشت</Button></Container>;
  return <ExamSession key={`${props.definition.id}:${props.definition.version}`} {...props} />;
}
function ExamSession({ definition, onSubmit, onExit, initialLevel }: ExamRunnerProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<ExamAnswers>({});
  const [review, setReview] = useState(false);
  const [exit, setExit] = useState(false);
  const [busy, setBusy] = useState(false);
  const [speakingBusy, setSpeakingBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ExamResult | null>(null);
  const [startedAt] = useState(() => new Date().toISOString());
  const submissionId = useRef<string | null>(null);
  const request = useRef<AbortController | null>(null);
  const heading = useRef<HTMLHeadingElement | null>(null);
  const question = definition.questions[index];
  const complete = completeAnswers(definition, answers);
  const missing = definition.questions.filter(item => !isCompleteAnswer(item, answers[item.id]));
  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => {
    if (result || !Object.keys(answers).length) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [answers, result]);
  function navigate(next: number) {
    if (busy || speakingBusy) return;
    setIndex(next); setError("");
    requestAnimationFrame(() => { heading.current?.focus({ preventScroll: true }); heading.current?.scrollIntoView({ block: "nearest" }); });
  }
  async function submit() {
    if (busy || request.current || !complete.length) return;
    const controller = new AbortController();
    request.current = controller;
    submissionId.current ??= crypto.randomUUID();
    setBusy(true); setError("");
    try {
      const response = await onSubmit({ examId: definition.id, version: definition.version, submissionId: submissionId.current, startedAt, submittedAt: new Date().toISOString(), initialLevel, answers: complete }, { signal: controller.signal });
      if (!controller.signal.aborted) { setResult(response); setReview(false); }
    } catch {
      if (!controller.signal.aborted) setError("پاسخ‌ها ارسال نشدند. چیزی پاک نشده؛ دوباره تلاش کن.");
    } finally {
      if (request.current === controller && !controller.signal.aborted) { setBusy(false); request.current = null; }
    }
  }
  if (result) return <ExamResultView result={result} demo={definition.demo} onExit={onExit} />;
  return <Box component="main" sx={{ minHeight: "100dvh", bgcolor: "#edf6ff", py: { xs: 2, sm: 4 } }}>
    <Container maxWidth="lg" sx={{ px: { xs: 1.5, sm: 3 } }}>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", gap: 2, mb: 1.5 }}><Box><Typography component="h1" sx={{ fontSize: { xs: 22, sm: 30 }, fontWeight: 800, color: "#18365e" }}>{definition.title}</Typography><Typography sx={{ fontSize: 12, color: "#8295b0", lineHeight: 2, mt: 0.5 }}>{definition.description}</Typography></Box><Button disabled={busy || speakingBusy} onClick={() => setExit(true)} sx={{ flexShrink: 0 }}>خروج</Button></Stack>
      {definition.demo && <Alert severity="info" sx={{ mb: 2, fontSize: 12 }}>نسخهٔ تمرینی آزمون؛ پاسخ درست حین آزمون نمایش داده نمی‌شود. نوشته و صدا برای ارزیابی تخصصی نگه داشته می‌شوند و فعلاً نمرهٔ خودکار ندارند.</Alert>}
      {initialLevel && <Typography sx={{ mb: 1.5, color: "#7289a9", fontSize: 12 }}>سطح خوداظهاری: <bdi>{initialLevel}</bdi> • سطح انتخابی پاسخ درست یا نمره را تغییر نمی‌دهد.</Typography>}
      <Stack direction="row" sx={{ justifyContent: "space-between", gap: 2, mb: 1 }}><Typography sx={{ fontSize: 12, color: "#627fa1" }}>پاسخ‌های کامل</Typography><Typography sx={{ fontSize: 12, color: "#1680e8", fontWeight: 700 }}>{complete.length.toLocaleString("fa-IR")} از {definition.questions.length.toLocaleString("fa-IR")}</Typography></Stack>
      <LinearProgress variant="determinate" value={complete.length / definition.questions.length * 100} aria-label="پیشرفت پاسخ‌گویی آزمون" sx={{ height: 7, borderRadius: 5, mb: 2.5, "& .MuiLinearProgress-bar": { transition: "none" } }} />
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0,1fr)", md: "minmax(0,1fr) 230px" }, gap: 2.5, alignItems: "start" }}>
        <Paper elevation={0} sx={{ minWidth: 0, p: { xs: 1.5, sm: 3 }, border: "1px solid #dceafd", borderRadius: "22px" }}>
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", gap: 1, mb: 2 }}><Typography ref={heading} tabIndex={-1} component="h2" sx={{ fontWeight: 700, color: "#294973", fontSize: 17, outline: "none" }}>سؤال {(index + 1).toLocaleString("fa-IR")} از {definition.questions.length.toLocaleString("fa-IR")}</Typography><Chip label={labels[question.kind]} size="small" sx={{ bgcolor: "#e8f2ff", color: "#337dc7", fontSize: 11 }} /></Stack>
          <ExamQuestionRenderer key={question.id} question={question} answer={answers[question.id]} onChange={answer => { submissionId.current = null; setAnswers(previous => ({ ...previous, [question.id]: answer })); }} onBusyChange={setSpeakingBusy} index={index} total={definition.questions.length} />
          <Stack direction="row" sx={{ gap: 1.25, mt: 3 }}><Button fullWidth variant="contained" disabled={busy || speakingBusy} onClick={() => index === definition.questions.length - 1 ? setReview(true) : navigate(index + 1)} sx={{ minHeight: 46 }}>{index === definition.questions.length - 1 ? "مرور و پایان آزمون" : "سؤال بعدی"}</Button><Button fullWidth variant="outlined" disabled={index === 0 || busy || speakingBusy} onClick={() => navigate(index - 1)} sx={{ minHeight: 46 }}>سؤال قبلی</Button></Stack>
          {speakingBusy && <Typography role="status" sx={{ color: "#9b7f48", fontSize: 12, mt: 1.5 }}>برای جابه‌جایی، ابتدا ضبط صدا را متوقف یا لغو کن.</Typography>}
        </Paper>
        <Paper component="nav" aria-label="فهرست سؤال‌های آزمون" elevation={0} sx={{ p: 2, border: "1px solid #dceafd", borderRadius: "18px" }}><Typography sx={{ fontSize: 14, fontWeight: 700, color: "#36567d", mb: 1.5 }}>سؤال‌های آزمون</Typography><Box sx={{ display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr))", gap: 0.75 }}>{definition.questions.map((item, i) => <Button key={item.id} aria-label={`رفتن به سؤال ${i + 1}، ${isCompleteAnswer(item, answers[item.id]) ? "پاسخ داده‌شده" : "بی‌پاسخ یا ناقص"}`} aria-current={index === i ? "step" : undefined} disabled={busy || speakingBusy} onClick={() => navigate(i)} sx={{ minWidth: 0, minHeight: 39, p: 0.5, bgcolor: index === i ? "#168bff" : isCompleteAnswer(item, answers[item.id]) ? "#e4f6ec" : "#f1f5fb", color: index === i ? "#fff" : isCompleteAnswer(item, answers[item.id]) ? "#299565" : "#8397b3", border: "1px solid", borderColor: index === i ? "#168bff" : "transparent", borderRadius: 2, "&:hover": { bgcolor: index === i ? "#0875ec" : "#deebff" } }}>{(i + 1).toLocaleString("fa-IR")}</Button>)}</Box><Typography sx={{ fontSize: 11, color: "#8296b2", lineHeight: 2, my: 2 }}>می‌توانی برگردی و پاسخ‌ها را تغییر بدهی. پاسخ‌های ناقص در ثبت نهایی، بی‌پاسخ محسوب می‌شوند. با خروج یا بستن صفحه، پاسخ‌های ثبت‌نشده از دست می‌روند.</Typography><Button fullWidth variant="outlined" disabled={busy || speakingBusy} onClick={() => setReview(true)}>مرور پاسخ‌ها</Button></Paper>
      </Box>
      <Modal open={review} onClose={() => { if (!busy) { setReview(false); setError(""); } }} title="مرور و ثبت آزمون" showCloseButton={!busy} actions={<><Button disabled={busy} onClick={() => setReview(false)}>ادامهٔ آزمون</Button><Button variant="contained" disabled={busy || !complete.length} onClick={submit} aria-busy={busy}>{busy ? <CircularProgress size={20} /> : "ثبت نهایی پاسخ‌ها"}</Button></>}>
        <Stack spacing={2}><Typography sx={{ color: "#536f94", lineHeight: 2 }}>{complete.length.toLocaleString("fa-IR")} پاسخ کامل از {definition.questions.length.toLocaleString("fa-IR")} سؤال آمادهٔ ثبت است. پس از ثبت، امکان تغییر پاسخ وجود ندارد.</Typography>{missing.length > 0 && <><Alert severity="warning" sx={{ fontSize: 12 }}>{missing.length.toLocaleString("fa-IR")} سؤال بی‌پاسخ یا ناقص است. این پاسخ‌ها ارسال نمی‌شوند و سؤال‌های نمره‌دارِ بی‌پاسخ، نمرهٔ صفر می‌گیرند.</Alert><Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.75 }}>{missing.map(item => <Button key={item.id} disabled={busy} size="small" onClick={() => { setReview(false); navigate(definition.questions.indexOf(item)); }}>سؤال {(definition.questions.indexOf(item) + 1).toLocaleString("fa-IR")}</Button>)}</Stack></>}{!complete.length && <Typography sx={{ fontSize: 12, color: "#8c9cb4" }}>برای ثبت، حداقل یک سؤال را کامل پاسخ بده.</Typography>}{error && <Alert severity="error">{error}</Alert>}</Stack>
      </Modal>
      <Modal open={exit} onClose={() => setExit(false)} title="خروج از آزمون" maxWidth="xs" actions={<><Button onClick={() => setExit(false)}>ادامهٔ آزمون</Button><Button color="error" onClick={onExit}>خروج و حذف پاسخ‌ها</Button></>}><Typography sx={{ color: "text.secondary", lineHeight: 2 }}>پاسخ‌ها هنوز ثبت نهایی نشده‌اند. با خروج، پاسخ‌های این نوبت و صدای ضبط‌شده از دست می‌روند.</Typography></Modal>
    </Container>
  </Box>;
}
