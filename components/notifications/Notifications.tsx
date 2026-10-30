"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Box, Button, Container, IconButton, List, ListItem, ListItemButton, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import NotificationsNoneRounded from "@mui/icons-material/NotificationsNoneRounded";
import Modal from "@/components/Modal";
import type { NotificationCategory, NotificationItem } from "./types";

const categories = [
  { id: "all", label: "همه" }, { id: "system", label: "سیستمی" },
  { id: "reminder", label: "یادآورها" }, { id: "message", label: "پیام‌ها" },
] as const;
const tones = {
  blue: { foreground: "#0877ff", background: "#e6f2ff" },
  purple: { foreground: "#9356ff", background: "#f0e9ff" },
  amber: { foreground: "#ffa600", background: "#fff4d9" },
};

export default function Notifications({ items }: { items: readonly NotificationItem[] }) {
  const id = useId();
  const [category, setCategory] = useState<NotificationCategory | "all">("all");
  const [selected, setSelected] = useState<NotificationItem | null>(null);
  const visible = category === "all" ? items : items.filter(item => item.category === category);
  return (
    <Box component="main" sx={{ minHeight: "100svh", display: "flex", alignItems: "center", py: { xs: 2, sm: 4, lg: 6 }, background: "radial-gradient(ellipse at 15% 15%, #c7e5ff 0%, transparent 48%), radial-gradient(ellipse at 90% 85%, #c8e8ff 0%, transparent 45%), #9dcdff" }}>
      <Container maxWidth={false} sx={{ maxWidth: { xs: 490, sm: 740, md: 960 }, px: { xs: 1.5, sm: 3 } }}>
        <Paper elevation={0} sx={{ minHeight: { xs: 450, sm: 540, md: 590 }, border: "5px solid #e7f3ff", borderRadius: { xs: "24px", md: "32px" }, px: { xs: 1.5, sm: 3, md: 4 }, pt: 1.5, pb: 3, background: "linear-gradient(180deg,#fff 65%,#fbfdff)", boxShadow: "0 24px 80px #1a6cba20" }}>
          <Stack component="header" direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography component="h1" sx={{ color: "#13204f", fontWeight: 800, fontSize: { xs: 21, sm: 26, md: 30 } }}>اعلان‌ها و پیام‌ها</Typography>
            <IconButton component={Link} href="/home" aria-label="بازگشت به خانه" sx={{ color: "#19315d", width: 44, height: 44 }}><ArrowBackRounded sx={{ fontSize: 20 }} /></IconButton>
          </Stack>
          <Tabs value={category} onChange={(_, value: typeof category) => setCategory(value)} variant="fullWidth" aria-label="دسته‌بندی اعلان‌ها" sx={{ minHeight: 44, "& .MuiTabs-indicator": { display: "none" }, "& .MuiTabs-list": { gap: { xs: 0.75, sm: 1.25 } }, "& .MuiTab-root": { minHeight: 42, minWidth: 0, px: 0.5, py: 1, borderRadius: "10px", border: "1px solid #e5efff", bgcolor: "#f0f5ff", color: "#586d94", fontWeight: 600, fontSize: { xs: 11.5, sm: 14 } }, "& .MuiTab-root.Mui-selected": { color: "#0674ff", bgcolor: "#dceeff", borderColor: "#cce5ff" } }}>
            {categories.map(item => <Tab key={item.id} value={item.id} id={`${id}-tab-${item.id}`} aria-controls={`${id}-panel-${item.id}`} label={item.label} />)}
          </Tabs>
          {categories.map(item => <Box key={item.id} role="tabpanel" hidden={category !== item.id} id={`${id}-panel-${item.id}`} aria-labelledby={`${id}-tab-${item.id}`} sx={{ mt: { xs: 1.5, sm: 2.5 } }}>
            {category === item.id && (visible.length ? <List disablePadding aria-label="فهرست اعلان‌ها">
              {visible.map(notification => {
                const tone = tones[notification.tone];
                return <ListItem key={notification.id} disablePadding sx={{ borderBottom: "1px solid #eef3fb", "&:last-child": { borderBottom: 0 } }}>
                  <ListItemButton onClick={() => setSelected(notification)} sx={{ px: { xs: 0.5, sm: 1.5 }, py: { xs: 1.7, sm: 2.2 }, gap: { xs: 1.25, sm: 2 }, borderRadius: 2, alignItems: "center", minWidth: 0 }}>
                    <Box aria-hidden="true" sx={{ width: { xs: 38, sm: 48 }, height: { xs: 38, sm: 48 }, flexShrink: 0, display: "grid", placeItems: "center", borderRadius: "11px", background: tone.background, color: tone.foreground }}><NotificationsNoneRounded sx={{ fontSize: { xs: 24, sm: 28 } }} /></Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography component="h2" sx={{ fontSize: { xs: 12.5, sm: 16 }, fontWeight: 700, color: "#344476", lineHeight: 1.9, overflowWrap: "anywhere" }}>{notification.title}</Typography>
                      <Typography sx={{ fontSize: { xs: 10, sm: 12 }, color: "#8392b3", mt: 0.25 }}>{categories.find(entry => entry.id === notification.category)?.label}</Typography>
                    </Box>
                    <Typography component="time" dateTime={notification.dateTime} sx={{ color: "#8796b4", fontSize: { xs: 10, sm: 12 }, flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>{notification.time}</Typography>
                  </ListItemButton>
                </ListItem>;
              })}
            </List> : <Stack sx={{ alignItems: "center", py: 7, gap: 1, color: "text.secondary" }}><NotificationsNoneRounded sx={{ fontSize: 40 }} /><Typography>اعلانی در این بخش وجود ندارد.</Typography></Stack>)}
          </Box>)}
        </Paper>
      </Container>
      <Modal open={selected !== null} onClose={() => setSelected(null)} title={selected?.title ?? "جزئیات اعلان"} maxWidth="sm" actions={<Button onClick={() => setSelected(null)}>بستن</Button>}>
        <Typography sx={{ lineHeight: 2.2, color: "text.secondary", overflowWrap: "anywhere" }}>{selected?.description}</Typography>
      </Modal>
    </Box>
  );
}
