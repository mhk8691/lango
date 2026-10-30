"use client";

import { useId } from "react";
import { Alert, Box, Button, CircularProgress, IconButton, Paper, Stack, Typography } from "@mui/material";
import MicRounded from "@mui/icons-material/MicRounded";
import StopRounded from "@mui/icons-material/StopRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import DownloadRounded from "@mui/icons-material/DownloadRounded";
import AudioPlayer from "../shared/AudioPlayer";
import { formatAudioTime } from "../shared/audio-utils";
import { getRecordingExtension } from "./recording-utils";
import useAudioRecorder from "./useAudioRecorder";
import type { SpeakingExerciseProps } from "./types";

export default function SpeakingExercise(props: SpeakingExerciseProps) {
  return <Recorder key={props.question.id} {...props} />;
}

function Recorder({ question, maxDurationSeconds, onRecorded, onContinue, onExit }: SpeakingExerciseProps) {
  const id = useId();
  const { status, recording, elapsed, level, error, start, stop, cancel, maxDuration } = useAudioRecorder({ maxDurationSeconds, onRecorded });
  const isRecording = status === "recording";
  const pending = status === "requesting" || status === "processing";
  const busy = pending || isRecording;
  const canPreview = Boolean(recording) && !busy;
  const microphoneLabel = isRecording ? "توقف ضبط صدا" : pending ? "در حال آماده‌سازی میکروفون" : "شروع ضبط صدا";
  const statusMessage = status === "requesting" ? "اجازهٔ دسترسی به میکروفون را تأیید کن." : status === "processing" ? "در حال آماده‌سازی صدا…" : isRecording ? "در حال ضبط؛ برای توقف دوباره روی میکروفون بزن." : status === "recorded" ? "صدای شما ضبط شد." : "برای شروع، روی میکروفون بزنید.";

  return (
    <Paper elevation={0} sx={{ position: "relative", border: "4px solid #e7f3ff", borderRadius: { xs: "22px", md: "30px" }, px: { xs: 2.5, sm: 4, md: 6 }, py: { xs: 4, md: 5 }, boxShadow: "0 20px 64px #1a6cba18" }}>
      {onExit && <IconButton onClick={() => { cancel(); onExit(); }} aria-label="خروج از تمرین" size="small" sx={{ position: "absolute", left: 12, top: 12, color: "#7b89a7" }}><CloseRounded sx={{ fontSize: 19 }} /></IconButton>}
      <Typography component="h2" dir="ltr" lang="en" sx={{ textAlign: "center", color: "#12204f", fontSize: { xs: 18, sm: 22, md: 26 }, fontWeight: 700, mt: 1 }}>{question.prompt}</Typography>
      <Typography dir="ltr" lang="en" sx={{ textAlign: "center", color: "#7b89a7", fontSize: { xs: 12.5, sm: 14, md: 15 }, lineHeight: 1.8, mt: 0.75 }}>{question.description}</Typography>

      <Stack sx={{ alignItems: "center", mt: 3, mb: 2.5 }}>
        <Box sx={{
          width: { xs: 116, md: 140 }, height: { xs: 116, md: 140 }, borderRadius: "50%", bgcolor: "#e3efff", display: "grid", placeItems: "center",
          boxShadow: isRecording ? `0 0 0 ${5 + level * 18}px #d4e7ff88` : "none",
          transition: "box-shadow 120ms ease", "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        }}>
          <IconButton
            disabled={pending} onClick={isRecording ? stop : start}
            aria-label={microphoneLabel} aria-pressed={isRecording} aria-describedby={`${id}-status`}
            sx={{ width: "100%", height: "100%", borderRadius: "50%", color: isRecording ? "#ed6575" : "#0875ff", "&:hover": { bgcolor: "#d9e9ff" }, "&.Mui-focusVisible": { outline: "3px solid #168bff", outlineOffset: 5 }, "&.Mui-disabled": { bgcolor: "transparent" } }}
          >
            {pending ? <CircularProgress size={36} /> : isRecording ? <StopRounded sx={{ fontSize: { xs: 58, md: 70 } }} /> : <MicRounded sx={{ fontSize: { xs: 61, md: 76 } }} />}
          </IconButton>
        </Box>
        <Typography component="output" role="timer" aria-label="مدت ضبط" dir="ltr" sx={{ color: "#1677ff", fontSize: { xs: 16, md: 19 }, fontWeight: 500, fontVariantNumeric: "tabular-nums", mt: 2.5 }}>{formatAudioTime(elapsed).padStart(5, "0")}</Typography>
        <Typography sx={{ color: "#9ba8bc", fontSize: 11, mt: 0.5 }}>حداکثر زمان ضبط: <bdi>{formatAudioTime(maxDuration)}</bdi></Typography>
      </Stack>

      <Stack id={`${id}-status`} role="status" aria-live="polite" direction="row" spacing={1} sx={{
        alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: 42, px: 1.5, py: 1, borderRadius: 6,
        bgcolor: status === "recorded" ? "#e0f8ef" : isRecording ? "#fff1f3" : "#f3f7fd",
        color: status === "recorded" ? "#129574" : isRecording ? "#cd5b70" : "#8594ad",
      }}>
        {status === "recorded" && <CheckCircleRounded sx={{ fontSize: 19, color: "#0bb47c" }} />}
        <Typography sx={{ fontSize: { xs: 11.5, sm: 13 }, lineHeight: 1.8 }}>{statusMessage}</Typography>
      </Stack>
      {error && <Alert severity="error" sx={{ mt: 2, fontSize: 12 }}>{error}</Alert>}
      {canPreview && recording && (
        <Box sx={{ mt: 2.5 }}>
          <AudioPlayer src={recording.url} waveform={recording.waveform} durationHint={recording.duration} label="صدای ضبط‌شدهٔ شما" />
          <Box sx={{ textAlign: "center", mt: 0.5 }}>
            <Button component="a" href={recording.url} download={`lango-${question.id}.${getRecordingExtension(recording.mimeType)}`} size="small" sx={{ fontSize: 11.5, gap: 0.75, color: "#7b8faa" }}><DownloadRounded sx={{ fontSize: 16 }} />دانلود صدا</Button>
          </Box>
        </Box>
      )}
      <Button
        variant="outlined" fullWidth disabled={status === "processing"}
        onClick={status === "requesting" || isRecording ? cancel : start}
        sx={{ minHeight: 47, mt: 2.5, color: "#263b6a", borderColor: "#dce7f4", fontSize: { xs: 13, sm: 14 } }}
      >
        {status === "requesting" ? "لغو درخواست" : isRecording ? "لغو ضبط" : recording ? "ضبط مجدد" : error ? "تلاش مجدد" : "شروع ضبط"}
      </Button>
      {onContinue && recording && <Button fullWidth variant="contained" disabled={busy || status !== "recorded"} onClick={() => onContinue(recording)} sx={{ mt: 1.5, minHeight: 47 }}>ثبت صدا و ادامه</Button>}
    </Paper>
  );
}
