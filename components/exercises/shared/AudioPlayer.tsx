"use client";

import { useEffect, useRef, useState } from "react";
import { Alert, Box, Button, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import PauseRounded from "@mui/icons-material/PauseRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRounded from "@mui/icons-material/VolumeOffRounded";
import { clampAudioTime, formatAudioTime } from "./audio-utils";

export type AudioPlayerProps = {
  src: string;
  /** Normalized peaks measured from the source audio; omit for a plain seek track. */
  waveform?: readonly number[];
  label?: string;
  /** Real elapsed recording time when a recorded container has no duration metadata. */
  durationHint?: number;
};

export default function AudioPlayer(props: AudioPlayerProps) {
  // A new source remounts the player, clearing old playback state and pausing it.
  return <Player key={props.src} {...props} />;
}

function Player({ src, waveform, label = "فایل صوتی تمرین", durationHint = 0 }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastVolume = useRef(1);
  const [playing, setPlaying] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [duration, setDuration] = useState(Number.isFinite(durationHint) ? durationHint : 0);
  const [time, setTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState("");
  const progress = duration > 0 ? Math.min(1, time / duration) : 0;

  useEffect(() => {
    const audio = audioRef.current;
    let active = true;
    // Metadata can arrive before hydration attaches React's event handlers.
    // Read the real media state once after mounting as well as on later events.
    queueMicrotask(() => {
      if (!active || !audio) return;
      if (Number.isFinite(audio.duration) && audio.duration > 0) setDuration(audio.duration);
      setTime(audio.currentTime);
      setVolume(audio.volume);
      setMuted(audio.muted);
    });
    return () => { active = false; audio?.pause(); };
  }, []);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) { audio.pause(); return; }
    setError("");
    if (audio.error) audio.load();
    if (audio.ended) audio.currentTime = 0;
    try { await audio.play(); }
    catch (issue) {
      if (audioRef.current !== audio || (issue instanceof DOMException && issue.name === "AbortError")) return;
      setWaiting(false);
      setPlaying(false);
      setError("صدا پخش نشد. اتصال و تنظیمات صدای دستگاه رو بررسی کن و دوباره تلاش کن.");
    }
  }

  function updateDuration() {
    const value = audioRef.current?.duration;
    if (value && Number.isFinite(value)) setDuration(value);
  }

  function seek(value: number) {
    const audio = audioRef.current;
    if (!audio || !duration || audio.readyState < 1) return;
    audio.currentTime = clampAudioTime(value, duration);
    setTime(audio.currentTime);
  }

  function changeVolume(value: number) {
    const audio = audioRef.current;
    if (!audio) return;
    if (value > 0) lastVolume.current = value;
    audio.volume = value;
    audio.muted = value === 0;
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.muted || audio.volume === 0) {
      if (audio.volume === 0) audio.volume = lastVolume.current;
      audio.muted = false;
    } else audio.muted = true;
  }

  return (
    <Box>
      <audio
        ref={audioRef} src={src} preload="metadata" aria-label={label}
        onLoadedMetadata={updateDuration} onDurationChange={updateDuration}
        onTimeUpdate={() => setTime(audioRef.current?.currentTime ?? 0)}
        onPlay={() => setPlaying(true)}
        onPlaying={() => { setWaiting(false); setPlaying(true); }}
        onPause={() => { setPlaying(false); setWaiting(false); }}
        onWaiting={() => setWaiting(true)} onCanPlay={() => setWaiting(false)}
        onEnded={() => { setPlaying(false); setWaiting(false); setTime(Number.isFinite(audioRef.current?.duration) ? audioRef.current?.duration ?? duration : duration); }}
        onVolumeChange={() => { setVolume(audioRef.current?.volume ?? 1); setMuted(audioRef.current?.muted ?? false); }}
        onError={() => { setPlaying(false); setWaiting(false); setError("فایل صوتی در دسترس نیست. دوباره تلاش کن."); }}
      />
      <Box dir="ltr" sx={{ bgcolor: "#eef7ff", borderRadius: "15px", px: { xs: 1, sm: 2 }, py: 1.25 }}>
        <Stack direction="row" sx={{ alignItems: "center", gap: { xs: 0.5, sm: 1.5 } }}>
          <IconButton onClick={togglePlayback} aria-label={playing ? "توقف پخش صدا" : "پخش صدا"} sx={{ width: 44, height: 44, flexShrink: 0, bgcolor: "#1176ff", color: "white", borderRadius: "50%", "&:hover": { bgcolor: "#0760ed" } }}>
            {waiting ? <CircularProgress size={22} sx={{ color: "white" }} /> : playing ? <PauseRounded sx={{ fontSize: 29 }} /> : <PlayArrowRounded sx={{ fontSize: 31 }} />}
          </IconButton>
          <Box sx={{ flex: 1, minWidth: 0, height: 48, position: "relative", borderRadius: 1, "&:has(input:focus-visible)": { outline: "2px solid #168bff", outlineOffset: 2 } }}>
            {waveform?.length ? (
              <svg viewBox={`0 0 ${waveform.length * 5} 48`} preserveAspectRatio="none" aria-hidden="true" style={{ width: "100%", height: "100%", display: "block" }}>
                {waveform.map((peak, index) => {
                  const height = 4 + Math.max(0, Math.min(1, peak)) * 36;
                  return <rect key={index} x={index * 5 + 1} y={(48 - height) / 2} width={2.2} height={height} rx={1.1} fill={index / waveform.length < progress ? "#0872ff" : "#9bcaff"} />;
                })}
              </svg>
            ) : <Box sx={{ position: "absolute", top: 21, width: "100%", height: 6, borderRadius: 2, bgcolor: "#cde4ff", overflow: "hidden" }}><Box sx={{ width: `${progress * 100}%`, height: "100%", bgcolor: "#0872ff" }} /></Box>}
            <Box component="input" type="range" min={0} max={duration || 1} step={0.05} value={clampAudioTime(time, duration)} disabled={!duration} onChange={(event) => seek(Number(event.target.value))} aria-label="موقعیت پخش فایل صوتی" aria-valuetext={`${formatAudioTime(time)} از ${formatAudioTime(duration)}`} sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, m: 0, cursor: duration ? "pointer" : "default" }} />
          </Box>
          <IconButton onClick={toggleMute} aria-label={muted || volume === 0 ? "وصل کردن صدا" : "بی‌صدا کردن"} sx={{ width: 44, height: 44, flexShrink: 0, borderRadius: "50%", bgcolor: "#e0f0ff", color: "#187aff" }}>
            {muted || volume === 0 ? <VolumeOffRounded sx={{ fontSize: 22 }} /> : <VolumeUpRounded sx={{ fontSize: 22 }} />}
          </IconButton>
        </Stack>
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", gap: 1, px: 0.5, mt: 0.25 }}>
          <Typography component="span" sx={{ color: "#7a91b1", fontSize: 11, fontVariantNumeric: "tabular-nums" }}>{formatAudioTime(time)} / {duration ? formatAudioTime(duration) : "--:--"}</Typography>
          <Box component="input" type="range" min={0} max={1} step={0.05} value={muted ? 0 : volume} onChange={(event) => changeVolume(Number(event.target.value))} aria-label="بلندی صدا" sx={{ width: { xs: 65, sm: 90 }, height: 20, m: 0, accentColor: "#1677ff", cursor: "pointer" }} />
        </Stack>
      </Box>
      {error && <Alert severity="error" sx={{ mt: 1.5, fontSize: 12 }} action={<Button size="small" onClick={togglePlayback}>تلاش مجدد</Button>}>{error}</Alert>}
    </Box>
  );
}
