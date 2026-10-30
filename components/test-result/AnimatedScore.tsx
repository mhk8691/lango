"use client";

import { useEffect, useId, useRef } from "react";
import { Box, Typography } from "@mui/material";

export default function AnimatedScore({ score, ready }: { score: number; ready: boolean }) {
  const id = `result-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const firstRef = useRef<HTMLDivElement | null>(null);
  const secondRef = useRef<HTMLDivElement | null>(null);
  const tipRef = useRef<HTMLDivElement | null>(null);
  const value = Number.isFinite(score) ? Math.min(100, Math.max(0, score)) : 0;
  const angle = value * 3.6;
  const firstAngle = Math.min(180, angle);
  const secondAngle = Math.max(0, angle - 180);

  useEffect(() => {
    const first = firstRef.current;
    const second = secondRef.current;
    const tip = tipRef.current;
    if (!ready || !first || !second || !tip) return;
    const elements = [first, second, tip];
    const targets = [firstAngle, secondAngle, angle];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let active = true;
    let animations: Animation[] = [];
    function finish() {
      if (!active) return;
      elements.forEach((element, index) => {
        element.style.transform = `rotate(${targets[index]}deg)`;
        element.style.willChange = "auto";
      });
      animations.forEach((animation) => animation.cancel());
    }
    if (reducedMotion.matches || !first.animate) finish();
    else {
      // Static semicircles rotate on compositor layers. No per-frame SVG stroke
      // changes, blur filters, layout reads, or React state updates are needed.
      const frames = Array.from({ length: 61 }, (_, index) => {
        const time = index / 60;
        const progress = time * time * (3 - 2 * time);
        const current = angle * progress;
        return [Math.min(180, current), Math.max(0, current - 180), current];
      });
      animations = elements.map((element, index) => {
        element.style.willChange = "transform";
        return element.animate(frames.map((frame, offset) => ({ transform: `rotate(${frame[index]}deg)`, offset: offset / 60 })), { duration: 1400, easing: "linear", fill: "both" });
      });
      void Promise.all(animations.map((animation) => animation.finished)).then(finish).catch(() => {});
    }
    const preferenceChanged = () => { if (reducedMotion.matches) finish(); };
    reducedMotion.addEventListener("change", preferenceChanged);
    return () => {
      active = false;
      animations.forEach((animation) => animation.cancel());
      elements.forEach((element) => { element.style.willChange = "auto"; });
      reducedMotion.removeEventListener("change", preferenceChanged);
    };
  }, [ready, angle, firstAngle, secondAngle]);

  const layerStyle = (target: number) => ({
    position: "absolute" as const, inset: 0, transform: "rotate(0deg)", transformOrigin: "50% 50%",
    "@media (prefers-reduced-motion: reduce)": { transform: `rotate(${target}deg)` },
  });
  const gradient = (suffix: string, rotation = 0) => (
    <linearGradient id={`${id}-${suffix}`} x1="195" y1="32" x2="44" y2="208" gradientUnits="userSpaceOnUse" gradientTransform={`rotate(${-rotation} 120 120)`}><stop stopColor="#10cd83" /><stop offset="1" stopColor="#00afc5" /></linearGradient>
  );

  return (
    <Box role="progressbar" aria-label="امتیاز کل آزمون" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} aria-valuetext={`${Math.round(value).toLocaleString("fa-IR")} از ۱۰۰`} sx={{ position: "relative", width: { xs: 172, sm: 192, md: 208 }, aspectRatio: "1", mx: "auto" }}>
      <svg viewBox="0 0 240 240" aria-hidden="true" style={{ width: "100%", height: "100%", display: "block" }}><circle cx="120" cy="120" r="88" fill="none" stroke="#e5effb" strokeWidth="12" /></svg>
      <Box aria-hidden="true" sx={{ position: "absolute", inset: 0, clipPath: "inset(0 0 0 50%)" }}>
        <Box ref={firstRef} data-score-layer="first" sx={layerStyle(firstAngle)}>
          <svg viewBox="0 0 240 240" style={{ width: "100%", height: "100%", display: "block" }}><defs>{gradient("first", firstAngle)}</defs><path d="M120 32 A88 88 0 0 0 120 208" fill="none" stroke={`url(#${id}-first)`} strokeWidth="12" /></svg>
        </Box>
      </Box>
      <Box aria-hidden="true" sx={{ position: "absolute", inset: 0, clipPath: "inset(0 50% 0 0)" }}>
        <Box ref={secondRef} data-score-layer="second" sx={layerStyle(secondAngle)}>
          <svg viewBox="0 0 240 240" style={{ width: "100%", height: "100%", display: "block" }}><defs>{gradient("second", secondAngle)}</defs><path d="M120 32 A88 88 0 0 1 120 208" fill="none" stroke={`url(#${id}-second)`} strokeWidth="12" /></svg>
        </Box>
      </Box>
      {value > 0 && <svg viewBox="0 0 240 240" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}><defs>{gradient("start")}</defs><circle cx="120" cy="32" r="6" fill={`url(#${id}-start)`} /></svg>}
      <Box ref={tipRef} data-score-layer="tip" aria-hidden="true" sx={{ ...layerStyle(angle), pointerEvents: "none", visibility: value > 0 ? "visible" : "hidden" }}>
        <Box sx={{ position: "absolute", left: "50%", top: "13.333333%", width: "5%", height: "5%", transform: "translate(-50%, -50%)", borderRadius: "50%", bgcolor: "#05bba6" }} />
      </Box>
      <Box aria-hidden="true" sx={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pt: 1 }}>
        <Typography component="span" sx={{ color: "#13204f", fontWeight: 800, fontSize: { xs: 43, sm: 48, md: 53 }, lineHeight: 1.2 }}>{Math.round(value).toLocaleString("fa-IR")}</Typography>
        <Typography component="span" sx={{ color: "#8eacd0", fontSize: { xs: 12, sm: 13 }, mt: 0.75 }}>از ۱۰۰</Typography>
      </Box>
    </Box>
  );
}
