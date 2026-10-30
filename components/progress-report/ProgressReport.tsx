"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Box, Container, IconButton, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import ProgressChart from "./ProgressChart";
import ProgressMetrics from "./ProgressMetrics";
import type { ProgressPeriod, ProgressReportProps } from "./types";

const periods = [
  { id: "day", label: "روزانه" }, { id: "week", label: "هفتگی" },
  { id: "month", label: "ماهانه" }, { id: "all", label: "کل زمان" },
] as const;

export default function ProgressReport({ report, initialPeriod = "week", backHref = "/home" }: ProgressReportProps) {
  const id = useId();
  const [period, setPeriod] = useState<ProgressPeriod>(initialPeriod);
  return (
    <Box component="main" sx={{ minHeight: "100svh", display: "flex", alignItems: "center", py: { xs: 2, sm: 4, lg: 6 }, background: "radial-gradient(ellipse at 15% 15%, #c7e5ff 0%, transparent 48%), radial-gradient(ellipse at 90% 85%, #c8e8ff 0%, transparent 45%), #9dcdff" }}>
      <Container maxWidth={false} sx={{ maxWidth: { xs: 490, sm: 740, md: 1000, lg: 1160 }, px: { xs: 1.5, sm: 3 } }}>
        <Paper elevation={0} sx={{ border: "5px solid #e7f3ff", borderRadius: { xs: "24px", md: "32px" }, px: { xs: 2, sm: 3, md: 5 }, pt: 2, pb: { xs: 2.5, sm: 3, md: 4 }, boxShadow: "0 24px 80px #1a6cba20" }}>
          <Stack component="header" direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography component="h1" sx={{ color: "#13204f", fontWeight: 800, fontSize: { xs: 22, sm: 26, md: 30 } }}>گزارش پیشرفت</Typography>
            <IconButton component={Link} href={backHref} aria-label="بازگشت به خانه" sx={{ color: "#19315d", width: 44, height: 44 }}><ArrowForwardRounded sx={{ fontSize: 20 }} /></IconButton>
          </Stack>
          <Tabs value={period} onChange={(_, next: ProgressPeriod) => setPeriod(next)} variant="fullWidth" aria-label="بازهٔ زمانی گزارش" sx={{ minHeight: 44, "& .MuiTabs-indicator": { display: "none" }, "& .MuiTabs-list": { gap: { xs: 0.75, sm: 1.25 } }, "& .MuiTab-root": { minHeight: 42, minWidth: 0, px: 0.5, py: 1, borderRadius: "10px", border: "1px solid transparent", bgcolor: "#edf4ff", color: "#667b9f", fontWeight: 500, fontSize: { xs: 11.5, sm: 14 } }, "& .MuiTab-root[data-period=all]": { bgcolor: "white", borderColor: "#dce9fc" }, "& .MuiTab-root.Mui-selected": { background: "linear-gradient(180deg,#2287ff,#0760ff)", color: "white", borderColor: "#1677ff" } }}>
            {periods.map((item) => <Tab key={item.id} data-period={item.id} value={item.id} id={`${id}-tab-${item.id}`} aria-controls={`${id}-panel-${item.id}`} label={item.label} />)}
          </Tabs>
          {periods.map((item) => <Box key={item.id} role="tabpanel" hidden={period !== item.id} id={`${id}-panel-${item.id}`} aria-labelledby={`${id}-tab-${item.id}`} sx={{ mt: { xs: 1, sm: 2 } }}>
            {period === item.id && <>
              <ProgressChart key={item.id} points={report[item.id].points} periodLabel={item.label} />
              <ProgressMetrics snapshot={report[item.id]} />
            </>}
          </Box>)}
        </Paper>
      </Container>
    </Box>
  );
}
