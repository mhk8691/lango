import { Box, Typography } from "@mui/material";
import { studyTime } from "./chart-utils";
import type { ProgressSnapshot } from "./types";

export default function ProgressMetrics({ snapshot }: { snapshot: ProgressSnapshot }) {
  const study = studyTime(snapshot.studyMinutes);
  const metrics = [
    { id: "study", value: study.value, label: study.label },
    { id: "words", value: snapshot.newWords, label: "واژه جدید" },
    { id: "streak", value: snapshot.streakDays, label: "روز تمرین پی‌درپی" },
    { id: "growth", value: snapshot.growthPercent, label: "درصد رشد یادگیری" },
  ];
  return (
    <Box component="dl" aria-label="خلاصهٔ آمار پیشرفت" sx={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: { xs: 0.75, sm: 1.5 }, m: 0 }}>
      {metrics.map((metric) => <Box key={metric.id} data-progress-metric={metric.id} sx={{ minWidth: 0, bgcolor: "#fcfeff", border: "1px solid #e2edfa", borderRadius: "12px", px: { xs: 0.5, sm: 1.5 }, py: { xs: 1.5, sm: 2 }, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Typography component="dt" sx={{ order: 2, color: "#7c8ca8", fontSize: { xs: 9.5, sm: 12 }, lineHeight: 1.8, mt: 0.5 }}>{metric.label}</Typography>
        <Typography component="dd" sx={{ order: 1, m: 0, color: "#13204f", fontSize: { xs: 22, sm: 28, md: 32 }, fontWeight: 800, lineHeight: 1.4 }}><bdi>{(Number.isFinite(metric.value) ? metric.value : 0).toLocaleString("fa-IR", { maximumFractionDigits: 1 })}</bdi></Typography>
      </Box>)}
    </Box>
  );
}
