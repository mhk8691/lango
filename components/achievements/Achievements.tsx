"use client";

import { useState } from "react";
import Link from "@/components/AppLink";
import { Box, Button, ButtonBase, Container, IconButton, Paper, Stack, Typography } from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import Modal from "@/components/Modal";
import AchievementBadge from "./AchievementBadge";
import type { Achievement } from "./data";

export default function Achievements({ items }: { items: readonly Achievement[] }) {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<Achievement | null>(null);
  const visible = expanded ? items : items.slice(0, 6);
  return <Box component="main" data-dashboard-fill sx={{ minHeight: "100svh", display: "flex", alignItems: "center", py: { xs: 2, sm: 4, lg: 6 }, background: "radial-gradient(ellipse at 15% 15%, #c7e5ff 0%, transparent 48%), radial-gradient(ellipse at 90% 85%, #c8e8ff 0%, transparent 45%), #9dcdff" }}>
    <Container maxWidth={false} sx={{ maxWidth: { xs: 490, sm: 760, md: 1000 }, px: { xs: 1.5, sm: 3 } }}>
      <Paper elevation={0} sx={{ border: "5px solid #e7f3ff", borderRadius: { xs: "24px", md: "32px" }, px: { xs: 1.5, sm: 3, md: 4 }, pt: 1.5, pb: { xs: 2, md: 3 }, boxShadow: "0 24px 80px #1a6cba20", background: "linear-gradient(180deg,#fff,#fbfdff)" }}>
        <Stack component="header" direction="row" sx={{ justifyContent: "space-between", alignItems: "center", gap: 1, mb: { xs: 2, sm: 3 } }}>
          <Typography component="h1" sx={{ color: "#13204f", fontWeight: 800, fontSize: { xs: 19, sm: 26, md: 30 } }}>دستاوردها <Box component="span" lang="en" dir="ltr" sx={{ display: "inline-block", fontSize: { xs: 10, sm: 14 }, fontWeight: 600 }}>(Achievements)</Box></Typography>
          <IconButton component={Link} href="/home" aria-label="بازگشت به خانه" sx={{ width: 44, height: 44, flexShrink: 0, color: "#19315d" }}><ArrowBackRounded sx={{ fontSize: 20 }} /></IconButton>
        </Stack>
        <Box component="ul" id="achievement-list" aria-label="فهرست دستاوردها" sx={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: { xs: 1, sm: 2, md: 2.5 }, p: 0, m: 0, listStyle: "none" }}>
          {visible.map(achievement => <Box component="li" key={achievement.id} sx={{ minWidth: 0 }}>
            <ButtonBase onClick={() => setSelected(achievement)} aria-label={`${achievement.title}، ${achievement.unlocked ? "کسب‌شده" : "قفل‌شده"}`} sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", px: { xs: 0.4, sm: 1.5 }, py: { xs: 1.25, sm: 2.5, md: 3 }, border: "1px solid #e8f0fb", borderRadius: { xs: "13px", sm: "18px" }, bgcolor: achievement.unlocked ? "#fff" : "#f4f8fd", backgroundImage: achievement.unlocked ? "linear-gradient(160deg,#fff,#f9fcff)" : "none", "&:hover": { bgcolor: "#edf5ff" }, "&.Mui-focusVisible": { outline: "3px solid #7db6ff", outlineOffset: 3 } }}>
              <AchievementBadge achievement={achievement} />
              <Typography component="h2" sx={{ color: achievement.unlocked ? "#1a3266" : "#52678d", fontWeight: 800, fontSize: { xs: 10.5, sm: 15, md: 18 }, mt: 0.75, lineHeight: 1.9 }}>{achievement.title}</Typography>
              <Typography sx={{ color: "#8495b6", fontSize: { xs: 9, sm: 11, md: 12 }, mt: 0.4, lineHeight: 1.8 }}>{achievement.subtitle}</Typography>
            </ButtonBase>
          </Box>)}
        </Box>
        {items.length > 6 && <Button fullWidth aria-expanded={expanded} aria-controls="achievement-list" onClick={() => setExpanded(value => !value)} sx={{ mt: { xs: 2, sm: 3 }, minHeight: 46, color: "#0876ff", fontWeight: 700, borderRadius: "11px", bgcolor: "#f4f9ff", fontSize: { xs: 13, sm: 15 } }}>{expanded ? "نمایش کمتر" : "نمایش همه"}</Button>}
      </Paper>
    </Container>
    <Modal open={selected !== null} onClose={() => setSelected(null)} title={selected?.title ?? "جزئیات دستاورد"} maxWidth="xs" actions={<Button onClick={() => setSelected(null)}>بستن</Button>}>
      {selected && <Stack sx={{ alignItems: "center", gap: 2 }}><AchievementBadge achievement={selected} /><Typography sx={{ color: selected.unlocked ? "#00a96a" : "text.secondary", fontWeight: 700 }}>{selected.unlocked ? "این دستاورد را کسب کرده‌ای" : "این دستاورد هنوز قفل است"}</Typography><Typography sx={{ color: "text.secondary", lineHeight: 2.2, alignSelf: "stretch" }}>{selected.description}</Typography></Stack>}
    </Modal>
  </Box>;
}
