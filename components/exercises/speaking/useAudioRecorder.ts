"use client";

import { useEffect, useRef, useState } from "react";
import { getMicrophoneError, normalizeRecordingPeaks, recordingMimeTypes } from "./recording-utils";
import type { SpeakingRecording } from "./types";

type RecorderStatus = "idle" | "requesting" | "recording" | "processing" | "recorded" | "error";

export default function useAudioRecorder({ maxDurationSeconds = 60, onRecorded }: {
  maxDurationSeconds?: number;
  onRecorded?: (recording: SpeakingRecording) => void;
}) {
  const [status, setStatus] = useState<RecorderStatus>("idle");
  const [recording, setRecording] = useState<SpeakingRecording | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [level, setLevel] = useState(0);
  const [error, setError] = useState("");
  const statusRef = useRef<RecorderStatus>("idle");
  const operation = useRef(0);
  const mounted = useRef(false);
  const media = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const context = useRef<AudioContext | null>(null);
  const animation = useRef<number | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const objectUrl = useRef<string | null>(null);
  const startedAt = useRef(0);
  const stoppedAt = useRef(0);
  const maxDuration = Number.isFinite(maxDurationSeconds) && maxDurationSeconds > 0 ? maxDurationSeconds : 60;

  function releaseMicrophone() {
    if (animation.current !== null) cancelAnimationFrame(animation.current);
    if (timeout.current !== null) clearTimeout(timeout.current);
    animation.current = null;
    timeout.current = null;
    stream.current?.getTracks().forEach((track) => track.stop());
    stream.current = null;
    if (context.current && context.current.state !== "closed") void context.current.close().catch(() => {});
    context.current = null;
  }

  function discardActiveCapture() {
    const recorder = media.current;
    media.current = null;
    if (recorder) {
      recorder.ondataavailable = null;
      recorder.onstop = null;
      recorder.onerror = null;
      if (recorder.state !== "inactive") recorder.stop();
    }
    releaseMicrophone();
  }

  function phase(next: RecorderStatus) {
    statusRef.current = next;
    setStatus(next);
  }

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      operation.current += 1;
      discardActiveCapture();
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    };
    // The cleanup reads only stable refs and must run for the lifetime of this recorder.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function stop() {
    const recorder = media.current;
    if (!recorder || recorder.state !== "recording") return;
    stoppedAt.current = Math.min(maxDuration, (performance.now() - startedAt.current) / 1000);
    setElapsed(stoppedAt.current);
    phase("processing");
    recorder.stop();
    releaseMicrophone();
    setLevel(0);
  }

  function cancel() {
    operation.current += 1;
    discardActiveCapture();
    setError("");
    setLevel(0);
    setElapsed(recording?.duration ?? 0);
    phase(recording ? "recorded" : "idle");
  }

  async function start() {
    if (["requesting", "recording", "processing"].includes(statusRef.current)) return;
    if (!window.isSecureContext) {
      setError("برای دسترسی به میکروفون، این صفحه باید با اتصال امن HTTPS باز شود.");
      phase("error");
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      setError("مرورگر شما از ضبط صدا پشتیبانی نمی‌کند. با یک مرورگر به‌روز دوباره تلاش کن.");
      phase("error");
      return;
    }
    const token = ++operation.current;
    setError("");
    phase("requesting");
    try {
      const captured = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1 } });
      if (!mounted.current || token !== operation.current) {
        captured.getTracks().forEach((track) => track.stop());
        return;
      }
      stream.current = captured;
      const mimeType = recordingMimeTypes.find((type) => MediaRecorder.isTypeSupported(type));
      const recorder = new MediaRecorder(captured, mimeType ? { mimeType } : undefined);
      media.current = recorder;
      const chunks: Blob[] = [];
      const peaks: number[] = [];
      let analyser: AnalyserNode | null = null;
      let samples: Uint8Array<ArrayBuffer> | null = null;
      try {
        if (window.AudioContext) {
          const audioContext = new AudioContext();
          context.current = audioContext;
          analyser = audioContext.createAnalyser();
          analyser.fftSize = 256;
          samples = new Uint8Array(analyser.fftSize);
          audioContext.createMediaStreamSource(captured).connect(analyser);
          void audioContext.resume().catch(() => {});
        }
      } catch { /* Recording remains available if live level analysis is unsupported. */ }

      const fail = (message: string) => {
        if (!mounted.current || token !== operation.current) return;
        operation.current += 1;
        discardActiveCapture();
        setLevel(0);
        setError(message);
        phase("error");
      };
      recorder.ondataavailable = (event) => {
        if (token === operation.current && event.data.size > 0) chunks.push(event.data);
      };
      recorder.onerror = () => fail("ضبط صدا متوقف شد. میکروفونت را بررسی کن و دوباره تلاش کن.");
      captured.getAudioTracks().forEach((track) => track.addEventListener("ended", () => fail("ارتباط با میکروفون قطع شد. دوباره تلاش کن."), { once: true }));
      recorder.onstop = () => {
        if (!mounted.current || token !== operation.current) return;
        releaseMicrophone();
        media.current = null;
        const blob = new Blob(chunks, { type: recorder.mimeType || chunks[0]?.type || "audio/webm" });
        if (!blob.size) {
          setError("صدایی دریافت نشد؛ دوباره ضبط کن.");
          phase("error");
          return;
        }
        if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
        const result: SpeakingRecording = {
          blob, url: URL.createObjectURL(blob), mimeType: blob.type,
          duration: stoppedAt.current || (performance.now() - startedAt.current) / 1000,
          waveform: normalizeRecordingPeaks(peaks),
        };
        objectUrl.current = result.url;
        setRecording(result);
        setElapsed(result.duration);
        setLevel(0);
        phase("recorded");
        onRecorded?.(result);
      };
      stoppedAt.current = 0;
      startedAt.current = performance.now();
      recorder.start(250);
      setElapsed(0);
      phase("recording");
      let lastUpdate = 0;
      const tick = (now: number) => {
        if (!mounted.current || token !== operation.current || recorder.state !== "recording") return;
        if (now - lastUpdate >= 100) {
          setElapsed(Math.min(maxDuration, (now - startedAt.current) / 1000));
          if (analyser && samples) {
            analyser.getByteTimeDomainData(samples);
            const rms = Math.sqrt(samples.reduce((sum, value) => sum + ((value - 128) / 128) ** 2, 0) / samples.length);
            peaks.push(rms);
            setLevel(Math.min(1, rms * 6));
          }
          lastUpdate = now;
        }
        animation.current = requestAnimationFrame(tick);
      };
      animation.current = requestAnimationFrame(tick);
      timeout.current = setTimeout(stop, maxDuration * 1000);
    } catch (issue) {
      if (!mounted.current || token !== operation.current) return;
      discardActiveCapture();
      setError(getMicrophoneError(issue));
      phase("error");
    }
  }

  return { status, recording, elapsed, level, error, start, stop, cancel, maxDuration };
}
