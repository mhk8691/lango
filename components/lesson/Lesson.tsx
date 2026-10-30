"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Alert, Box, Button, Chip, Container, IconButton, Paper, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import StopRounded from "@mui/icons-material/StopRounded";
import { lessons } from "./data";

const tabs = ["گفت‌وگو", "تمرین‌ها", "واژگان", "گرامر", "شنیداری", "تکالیف"];

export default function Lesson() {
  const id = useId();
  const [index, setIndex] = useState(1);
  const [tab, setTab] = useState(0);
  const [speaking, setSpeaking] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [videoError, setVideoError] = useState(false);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [showTranslation, setShowTranslation] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lesson = lessons[index];
  useEffect(() => () => { window.speechSynthesis?.cancel(); }, []);
  function stopSpeech() {
    speechRef.current = null;
    window.speechSynthesis?.cancel();
    setSpeaking(null);
  }
  function speak(key: string, text: string) {
    if (!("speechSynthesis" in window)) { setError("این مرورگر از خواندن متن پشتیبانی نمی‌کند."); return; }
    const stopping = speaking === key;
    stopSpeech();
    if (stopping) return;
    videoRef.current?.pause();
    setError("");
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    const voice = window.speechSynthesis.getVoices().find(item => item.lang === "en-US") ?? window.speechSynthesis.getVoices().find(item => item.lang.startsWith("en"));
    if (voice) utterance.voice = voice;
    const done = () => { if (speechRef.current === utterance) { speechRef.current = null; setSpeaking(null); } };
    utterance.onend = done;
    utterance.onerror = event => { if (speechRef.current !== utterance) return; done(); if (event.error !== "canceled" && event.error !== "interrupted") setError("صدا پخش نشد؛ صداهای انگلیسی و تنظیمات مرورگر را بررسی کن."); };
    speechRef.current = utterance;
    setSpeaking(key);
    window.speechSynthesis.speak(utterance);
  }
  function navigate(next: number) { stopSpeech(); setIndex(next); setTab(0); setError(""); setShowTranslation(false); setVideoError(false); }
  function audioButton(key: string, text: string, label: string) {
    return <IconButton aria-label={speaking === key ? `توقف ${label}` : `پخش ${label}`} aria-pressed={speaking === key} onClick={() => speak(key, text)} sx={{ width: 32, height: 32, flexShrink: 0, color: "#0876ff", bgcolor: speaking === key ? "#cfe5ff" : "#edf6ff", borderRadius: "11px" }}>{speaking === key ? <StopRounded sx={{ fontSize: 18 }} /> : <VolumeUpRounded sx={{ fontSize: 18 }} />}</IconButton>;
  }
  return <Box component="main" sx={{ minHeight: "100dvh", display: "flex", py: { xs: 1, sm: 3, lg: 4 }, background: "radial-gradient(ellipse at 15% 15%, #d1edff 0%, transparent 48%), #a9d6ff" }}>
    <Container maxWidth={false} sx={{ display: "flex", maxWidth: { xs: 540, sm: 850, lg: 1240 }, px: { xs: 1, sm: 3 } }}>
      <Paper elevation={0} sx={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, overflow: "hidden", border: "5px solid #e8f5ff", borderRadius: { xs: "19px", md: "28px" }, bgcolor: "#fff", boxShadow: "0 20px 65px #2d77ba1a" }}>
        <Stack component="header" direction="row" sx={{ alignItems: "center", justifyContent: "space-between", gap: 1, px: { xs: 0.5, sm: 2 }, py: 1 }}>
          <Chip label="انگلیسی" color="primary" sx={{ fontSize: { xs: 11, sm: 12 }, height: 29 }} />
          <IconButton component={Link} href="/home" aria-label="بازگشت به خانه" sx={{ color: "#29456f", width: 36, height: 36 }}><ArrowBackRounded sx={{ fontSize: 19 }} /></IconButton>
        </Stack>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, alignItems: "stretch" }}>
          <Box sx={{ px: { xs: 1, sm: 2 }, pt: { lg: 1 }, minWidth: 0 }}>
            <Box sx={{ position: "relative", borderRadius: "12px", overflow: "hidden", bgcolor: "#162436", aspectRatio: "16 / 9", direction: "ltr" }}>
              <Box key={lesson.id} component="video" ref={videoRef} controls playsInline preload="metadata" poster="/images/lessons/tutor.png" aria-label={`پیش‌نمایش ویدئوی ${lesson.title}`} onPlay={stopSpeech} onError={() => setVideoError(true)} sx={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}><source src="/video/lessons/preview.mp4" type="video/mp4" /></Box>
              <Box sx={{ pointerEvents: "none", position: "absolute", left: 0, top: 0, bottom: 48, width: "51%", display: "flex", alignItems: "center", pl: { xs: 1.5, sm: 3 }, background: "linear-gradient(90deg,#081321a8,transparent)" }}><Typography component="h1" lang="en" sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: 23, sm: 36, lg: 33 }, lineHeight: 1.2, maxWidth: 160, textAlign: "left", textShadow: "0 2px 12px #0008" }}>{lesson.title}</Typography></Box>
            </Box>
            <Typography sx={{ color: "#8b9ab3", fontSize: 10, mt: 0.75, mb: { xs: 0.75, lg: 2 } }}>پیش‌نمایش تصویری نمونه و بی‌صدا • فایل اصلی درس هنوز اضافه نشده است</Typography>
            {videoError && <Alert severity="error">ویدئو بارگذاری نشد. صفحه را دوباره باز کن.</Alert>}
            <Typography sx={{ display: { xs: "none", lg: "block" }, fontWeight: 700, color: "#233f71", fontSize: 19, mt: 2 }}>{lesson.subtitle}</Typography>
          </Box>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Tabs value={tab} onChange={(_, value: number) => { stopSpeech(); setTab(value); setError(""); }} variant="fullWidth" aria-label="بخش‌های درس" sx={{ minHeight: 46, borderBottom: "1px solid #e7f1fc", "& .MuiTab-root": { px: 0.4, minWidth: 0, minHeight: 46, fontSize: { xs: 10, sm: 12 }, fontWeight: 600, color: "#65789b" }, "& .Mui-selected": { color: "#0876ff" } }}>
              {tabs.map((label, i) => <Tab key={label} label={label} id={`${id}-tab-${i}`} aria-controls={`${id}-panel-${i}`} />)}
            </Tabs>
            {tabs.map((label, i) => <Box key={label} role="tabpanel" hidden={tab !== i} id={`${id}-panel-${i}`} aria-labelledby={`${id}-tab-${i}`} sx={{ px: { xs: 1.5, sm: 3 }, py: { xs: 2, sm: 3 }, minHeight: { xs: 220, lg: 330 } }}>
              {tab === i && <>
                {i === 0 && <Stack spacing={1.25}>
                  {lesson.dialogue.map((line, n) => <Stack key={line.text} direction="row" dir="ltr" sx={{ alignItems: "flex-start", gap: 1 }}>
                    {audioButton(`line-${n}`, line.text, `جملهٔ ${n + 1}`)}
                    <Box sx={{ flex: 1, minWidth: 0, pt: 0.5 }}><Typography lang="en" sx={{ fontSize: { xs: 12, sm: 14 }, lineHeight: 1.8, color: "#233e70", textAlign: "left" }}><Box component="strong" sx={{ mr: 0.8 }}>{line.speaker}:</Box>{line.text}</Typography>{showTranslation && <Typography dir="rtl" sx={{ color: "#8192ad", fontSize: 11, mt: 0.5, textAlign: "right" }}>{line.translation}</Typography>}</Box>
                  </Stack>)}
                  <Button size="small" onClick={() => setShowTranslation(value => !value)} aria-pressed={showTranslation} sx={{ alignSelf: "flex-start", fontSize: 11 }}>{showTranslation ? "پنهان کردن ترجمه" : "نمایش ترجمه"}</Button>
                </Stack>}
                {i === 1 && <Stack spacing={1.5}><Typography sx={{ color: "#314d7c", fontSize: 14 }}>آموخته‌های این درس را تمرین کن.</Typography><Button component={Link} href="/exercises/interactive" variant="outlined">تمرین چهارگزینه‌ای</Button><Button component={Link} href="/exercises/sentence-completion" variant="outlined">تکمیل جمله</Button><Button component={Link} href="/exercises/speaking" variant="outlined">تمرین مکالمه</Button></Stack>}
                {i === 2 && <Stack component="dl" spacing={2} sx={{ m: 0 }}>{lesson.words.map((word, n) => <Stack key={word.word} direction="row" sx={{ alignItems: "center", justifyContent: "space-between", gap: 1, borderBottom: "1px solid #eff4fc", pb: 1 }}><Typography component="dd" sx={{ m: 0, color: "#7b8da9", fontSize: 13 }}>{word.meaning}</Typography><Stack direction="row" sx={{ alignItems: "center", gap: 1 }}><Typography component="dt" dir="ltr" lang="en" sx={{ color: "#203d71", fontWeight: 600 }}>{word.word}</Typography>{audioButton(`word-${n}`, word.word, word.word)}</Stack></Stack>)}</Stack>}
                {i === 3 && <Typography sx={{ color: "#536b92", fontSize: 14, lineHeight: 2.4 }}>{lesson.grammar}</Typography>}
                {i === 4 && <Stack spacing={2}><Typography sx={{ color: "#536b92", fontSize: 14, lineHeight: 2 }}>به گفت‌وگوی کامل گوش کن، سپس جمله‌ها را با صدای بلند تکرار کن.</Typography><Button variant="outlined" onClick={() => speak("full", lesson.dialogue.map(line => line.text).join(" "))}>{speaking === "full" ? "توقف گفت‌وگو" : "پخش گفت‌وگوی کامل"}</Button><Typography sx={{ color: "#8b9ab3", fontSize: 11 }}>خواندن متن با صدای انگلیسی مرورگر؛ دسترسی به صدا به مرورگر و دستگاه بستگی دارد.</Typography></Stack>}
                {i === 5 && <Stack spacing={2}><Typography sx={{ fontSize: 14, color: "#536b92", lineHeight: 2 }}>{lesson.homework}</Typography><TextField multiline minRows={4} fullWidth label="پاسخ انگلیسی تو" value={drafts[lesson.id] ?? ""} onChange={event => setDrafts(previous => ({ ...previous, [lesson.id]: event.target.value }))} slotProps={{ htmlInput: { dir: "ltr", lang: "en", maxLength: 2000, style: { textAlign: "left" } } }} /><Typography sx={{ color: "#8b9ab3", fontSize: 11 }}>پاسخ تا زمان باز بودن صفحه نگه داشته می‌شود؛ ارسال به مدرس هنوز فعال نیست.</Typography></Stack>}
                {error && <Alert severity="warning" sx={{ mt: 2 }}>{error}</Alert>}
              </>}
            </Box>)}
          </Box>
        </Box>
        <Stack component="nav" aria-label="جابه‌جایی بین درس‌ها" direction="row" sx={{ mt: "auto", flexShrink: 0, gap: 1.5, px: { xs: 1.5, sm: 3 }, py: 2, borderTop: "1px solid #e7f1fc", bgcolor: "#f7fbff" }}>
          <Button fullWidth variant="contained" disabled={index === lessons.length - 1} onClick={() => navigate(index + 1)} sx={{ minHeight: 46, borderRadius: "10px", gap: 1 }}>درس بعدی<ArrowForwardRounded sx={{ fontSize: 19 }} /></Button>
          <Button fullWidth variant="outlined" disabled={index === 0} onClick={() => navigate(index - 1)} sx={{ minHeight: 46, borderRadius: "10px", gap: 1 }}><ArrowBackRounded sx={{ fontSize: 19 }} />درس قبلی</Button>
        </Stack>
      </Paper>
    </Container>
  </Box>;
}
