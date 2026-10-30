"use client";

import { useId, useState } from "react";
import { Box, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { weeklyActivity } from "./overview-data";

export default function WeeklyChart() {
  const id = `weekly-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const [period, setPeriod] = useState<"current" | "previous">("current");
  const [active, setActive] = useState(4);
  const points = weeklyActivity[period];
  const selected = points[active];
  const fa = (value: number) => value.toLocaleString("fa-IR", { maximumFractionDigits: 1 });
  return <Paper component="section" elevation={0} sx={{ p: 2.25, borderRadius: "16px", border: "1px solid #e4eefb" }}><Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", gap: 1, mb: 2 }}><Typography component="h2" sx={{ fontSize: 20, fontWeight: 800, color: "#19345e" }}>آمار هفتگی</Typography><TextField select size="small" label="بازهٔ آمار" value={period} onChange={e => setPeriod(e.target.value as typeof period)} sx={{ width: 110, "& .MuiOutlinedInput-root": { fontSize: 11, borderRadius: 2 } }}><MenuItem value="current">هفتهٔ جاری</MenuItem><MenuItem value="previous">هفتهٔ قبل</MenuItem></TextField></Stack>
    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 2, mb: 1 }}>{[{ label: "زمان یادگیری (ساعت)", color: "#168bff" }, { label: "درس‌های تکمیل‌شده", color: "#42d8d9" }].map(item => <Stack key={item.label} direction="row" sx={{ alignItems: "center", gap: 0.75 }}><Box sx={{ width: 9, height: 9, bgcolor: item.color, borderRadius: "50%" }} /><Typography sx={{ fontSize: 10, color: "#8a9db7" }}>{item.label}</Typography></Stack>)}</Stack>
    <Box component="svg" viewBox="0 0 340 245" role="group" aria-label="نمودار هفتگی زمان یادگیری و درس‌های تکمیل‌شده" sx={{ width: "100%", display: "block", direction: "ltr", overflow: "visible" }}>
      <defs><linearGradient id={`${id}-blue`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#39a6ff" /><stop offset="1" stopColor="#087aff" /></linearGradient><linearGradient id={`${id}-aqua`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#70ece9" /><stop offset="1" stopColor="#2ccfd7" /></linearGradient></defs>
      {[0, 1, 2, 3, 4, 5].map(value => <g key={value}><line x1="28" x2="330" y1={206 - value * 32} y2={206 - value * 32} stroke="#eaf1fb" /><text x="17" y={209 - value * 32} textAnchor="middle" fontSize="10" fill="#9aacbf">{fa(value)}</text></g>)}
      {points.map((point, index) => {
        const x = 40 + index * 43;
        return <g key={point.label} role="button" tabIndex={0} aria-label={`${point.label}: ${fa(point.hours)} ساعت، ${fa(point.lessons)} درس`} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} style={{ cursor: "pointer", outline: "none" }}><rect x={x - 11} y="43" width="36" height="166" fill={active === index ? "#f5faff" : "transparent"} rx="4" /><rect x={x - 7} y={206 - point.lessons * 32} width="10" height={point.lessons * 32} rx="4" fill={`url(#${id}-aqua)`} /><rect x={x + 7} y={206 - point.hours * 32} width="10" height={point.hours * 32} rx="4" fill={`url(#${id}-blue)`} /><text x={x + 5} y="228" textAnchor="middle" fontSize="9" fill="#879cb9">{point.label}</text></g>;
      })}
      <g aria-hidden="true" transform={`translate(${Math.min(255, Math.max(28, 40 + active * 43 - 32))},${Math.max(1, 206 - Math.max(selected.hours, selected.lessons) * 32 - 46)})`}><rect width="72" height="39" rx="8" fill="#253a5b" /><text x="36" y="16" textAnchor="middle" fontSize="10" fill="#fff">{fa(selected.hours)} ساعت</text><text x="36" y="30" textAnchor="middle" fontSize="9" fill="#cfdbef">{fa(selected.lessons)} درس</text></g>
    </Box>
  </Paper>;
}
