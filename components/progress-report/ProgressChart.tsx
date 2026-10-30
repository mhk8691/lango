"use client";

import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Box, Typography } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { chartGeometry, nearestPointIndex, peakIndex } from "./chart-utils";
import useChartSize from "./useChartSize";
import type { ProgressPoint } from "./types";

export default function ProgressChart({ points, periodLabel }: { points: readonly ProgressPoint[]; periodLabel: string }) {
  const id = `progress-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const { ref, width: measuredWidth, height: measuredHeight } = useChartSize();
  const width = measuredWidth || 600;
  const height = measuredHeight || 280;
  const [pinned, setPinned] = useState(() => peakIndex(points));
  const [hovered, setHovered] = useState<number | null>(null);
  const pointRefs = useRef<(SVGGElement | null)[]>([]);
  const selectedIndex = Math.max(0, Math.min(points.length - 1, pinned));
  const activeIndex = Math.max(0, Math.min(points.length - 1, hovered ?? selectedIndex));
  const geometry = chartGeometry(points, width, height);
  const active = geometry.coordinates[activeIndex];
  const labelSize = width < 420 ? 10 : 12;
  const tooltipText = active ? Math.round(active.value).toLocaleString("fa-IR") : "";
  const tooltipWidth = tooltipText.length > 2 ? 44 : 36;
  const tooltipX = active ? Math.max(2, Math.min(width - tooltipWidth - 2, active.x - tooltipWidth / 2)) : 0;
  const tooltipY = active ? Math.max(2, active.y - 38) : 0;

  function pointerIndex(event: PointerEvent<SVGSVGElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / Math.max(1, bounds.width) * width;
    return nearestPointIndex(x, geometry.left, geometry.plotWidth, points.length);
  }
  function select(index: number) { setPinned(index); setHovered(null); }
  function keyDown(event: KeyboardEvent<SVGGElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = Math.min(points.length - 1, index + 1);
    else if (event.key === "ArrowLeft") next = Math.max(0, index - 1);
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = points.length - 1;
    else if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    select(next);
    pointRefs.current[next]?.focus();
  }

  return (
    <Box component="figure" sx={{ m: 0, minWidth: 0 }}>
      <Box ref={ref} sx={{ width: "100%", height: { xs: 245, sm: 290, md: 330 }, minWidth: 0 }}>
        {!points.length ? <Box sx={{ height: "100%", display: "grid", placeItems: "center" }}><Typography sx={{ color: "text.secondary", fontSize: 13 }}>هنوز داده‌ای برای این بازه ثبت نشده است.</Typography></Box> : (
          <svg
            role="group" aria-label={`نمودار درصد پیشرفت ${periodLabel}`} aria-describedby={`${id}-description`}
            viewBox={`0 0 ${width} ${height}`} width="100%" height="100%"
            onPointerMove={(event) => { if (event.pointerType !== "touch") setHovered(pointerIndex(event)); }}
            onPointerLeave={() => setHovered(null)}
            onPointerDown={(event) => { if (event.button === 0) select(pointerIndex(event)); }}
            style={{ display: "block", direction: "ltr", fontFamily: "var(--font-lango)", opacity: measuredWidth ? 1 : 0 }}
          >
            <title>{`درصد پیشرفت ${periodLabel}`}</title>
            <defs><linearGradient id={`${id}-area`} x1="0" y1={geometry.top} x2="0" y2={geometry.bottom} gradientUnits="userSpaceOnUse"><stop stopColor="#c6e6ff" stopOpacity=".78" /><stop offset="1" stopColor="#f5fbff" stopOpacity=".16" /></linearGradient></defs>
            {[0, 20, 40, 60, 80, 100].map((tick) => {
              const y = geometry.bottom - tick / 100 * geometry.plotHeight;
              return <g key={tick} aria-hidden="true"><line x1={geometry.left} x2={width - geometry.right} y1={y} y2={y} stroke="#edf3fb" /><text x={geometry.left - 10} y={y + 3.5} textAnchor="end" fontSize={labelSize} fill="#91a5c5">{tick.toLocaleString("fa-IR")}</text></g>;
            })}
            {geometry.coordinates.map((point, index) => <g key={index} aria-hidden="true"><line x1={point.x} x2={point.x} y1={geometry.top} y2={geometry.bottom} stroke="#edf3fb" /><text data-x-axis-label={index} x={point.x} y={geometry.bottom + 25} textAnchor="middle" fontSize={labelSize} fill="#91a5c5">{width < 420 ? point.shortLabel ?? point.label : point.label}</text></g>)}
            <path d={geometry.area} fill={`url(#${id}-area)`} aria-hidden="true" />
            <path d={geometry.line} fill="none" stroke="#1277ff" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" aria-hidden="true" />
            {active && <line x1={active.x} x2={active.x} y1={active.y} y2={geometry.bottom} stroke="#badbff" strokeDasharray="3 5" aria-hidden="true" />}
            {geometry.coordinates.map((point, index) => (
              <g key={index} ref={(element) => { pointRefs.current[index] = element; }} data-chart-point={index} role="button" tabIndex={index === selectedIndex ? 0 : -1} aria-label={`${point.label}: ${Math.round(point.value).toLocaleString("fa-IR")}٪ پیشرفت`} aria-pressed={index === selectedIndex} onFocus={() => setHovered(index)} onBlur={() => setHovered(null)} onKeyDown={(event) => keyDown(event, index)} onClick={() => select(index)} style={{ cursor: "pointer", outline: "none" }}>
                <circle cx={point.x} cy={point.y} r="16" fill="transparent" />
                {index === activeIndex && <circle cx={point.x} cy={point.y} r="8" fill="#ddecff" />}
                <circle cx={point.x} cy={point.y} r={index === activeIndex ? 4.2 : 3.2} fill="white" stroke="#1178ff" strokeWidth="1.8" />
              </g>
            ))}
            {active && <g data-chart-tooltip="true" aria-hidden="true" style={{ pointerEvents: "none" }}><rect x={tooltipX} y={tooltipY} width={tooltipWidth} height="25" rx="6" fill="#102353" /><path d={`M${active.x - 4},${tooltipY + 24} L${active.x},${tooltipY + 30} L${active.x + 4},${tooltipY + 24}Z`} fill="#102353" /><text x={tooltipX + tooltipWidth / 2} y={tooltipY + 17} textAnchor="middle" fill="white" fontSize="13" fontWeight="700">{tooltipText}</text></g>}
          </svg>
        )}
      </Box>
      <Box component="figcaption" id={`${id}-description`} sx={visuallyHidden}>درصد پیشرفت در بازهٔ {periodLabel}، از صفر تا صد. برای بررسی نقاط از کلیدهای چپ و راست، Home و End استفاده کنید. با لمس نمودار می‌توانید مقدار هر نقطه را ببینید.</Box>
    </Box>
  );
}
