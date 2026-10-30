import type { ProgressPoint } from "./types";

export function progressValue(value: number) {
  return Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0;
}

export function peakIndex(points: readonly ProgressPoint[]) {
  if (!points.length) return 0;
  return points.reduce((best, point, index) => progressValue(point.value) > progressValue(points[best].value) ? index : best, 0);
}

export function chartGeometry(points: readonly ProgressPoint[], width: number, height: number) {
  const left = width < 420 ? 34 : 44;
  const right = 18;
  const top = 40;
  const bottom = height - 40;
  const plotWidth = Math.max(1, width - left - right);
  const plotHeight = Math.max(1, bottom - top);
  const coordinates = points.map((point, index) => ({
    ...point, value: progressValue(point.value),
    x: left + (points.length === 1 ? 0.5 : index / Math.max(1, points.length - 1)) * plotWidth,
    y: bottom - progressValue(point.value) / 100 * plotHeight,
  }));
  const line = coordinates.map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`).join(" ");
  const area = coordinates.length ? `${line} L${coordinates[coordinates.length - 1].x},${bottom} L${coordinates[0].x},${bottom} Z` : "";
  return { left, right, top, bottom, plotWidth, plotHeight, coordinates, line, area };
}

export function nearestPointIndex(x: number, left: number, plotWidth: number, count: number) {
  if (count <= 1) return 0;
  return Math.max(0, Math.min(count - 1, Math.round((x - left) / Math.max(1, plotWidth) * (count - 1))));
}

export function studyTime(minutes: number) {
  const safe = Number.isFinite(minutes) ? Math.max(0, minutes) : 0;
  return safe < 60
    ? { value: Math.round(safe), label: "دقیقه مطالعه" }
    : { value: Math.round(safe / 60 * 10) / 10, label: "ساعت مطالعه" };
}
