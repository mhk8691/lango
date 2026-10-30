"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Alert, Avatar, Box, Button, Container, FormControl, FormControlLabel, IconButton, List, ListItem, ListItemButton, MenuItem, Paper, Select, Stack, Switch, Typography } from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import PersonOutlineRounded from "@mui/icons-material/PersonOutlineRounded";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import ShieldOutlined from "@mui/icons-material/ShieldOutlined";
import NotificationsNoneRounded from "@mui/icons-material/NotificationsNoneRounded";
import LanguageRounded from "@mui/icons-material/LanguageRounded";
import VerifiedUserOutlined from "@mui/icons-material/VerifiedUserOutlined";
import HelpOutlineRounded from "@mui/icons-material/HelpOutlineRounded";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import Modal from "@/components/Modal";
import { useProfile } from "@/lib/profile-store";
import { PHONE_DRAFT_KEY, PROFILE_KEY } from "@/lib/auth";

type Panel = "learning" | "devices" | "language" | "privacy" | "support" | "logout";
const rows = [
  { label: "اطلاعات شخصی", icon: PersonOutlineRounded, href: "/complete-profile" },
  { label: "تنظیمات یادگیری", icon: SettingsOutlined, panel: "learning" },
  { label: "مدیریت دستگاه‌ها", icon: ShieldOutlined, panel: "devices" },
  { label: "اعلان‌ها و پیام‌ها", icon: NotificationsNoneRounded, href: "/notifications" },
  { label: "زبان اپلیکیشن", icon: LanguageRounded, panel: "language" },
  { label: "حریم خصوصی", icon: VerifiedUserOutlined, panel: "privacy" },
  { label: "راهنما و پشتیبانی", icon: HelpOutlineRounded, panel: "support" },
  { label: "خروج از حساب", icon: LogoutRounded, panel: "logout" },
] as const;
const PREFERENCES_KEY = "lango.learning-preferences";

export default function ProfileSettings() {
  const profile = useProfile();
  const router = useRouter();
  const [panel, setPanel] = useState<Panel | null>(null);
  const [minutes, setMinutes] = useState(15);
  const [sound, setSound] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const name = profile ? `${profile.firstName} ${profile.lastName}`.trim() : "زبان‌آموز مهمان";
  const close = () => { setPanel(null); setError(""); setMessage(""); };
  function open(next: Panel) {
    setError(""); setMessage("");
    if (next === "learning") {
      setMinutes(15); setSound(true);
      try {
        const saved = JSON.parse(localStorage.getItem(PREFERENCES_KEY) ?? "null");
        if (saved && [5, 10, 15, 20, 30].includes(saved.minutes)) setMinutes(saved.minutes);
        if (typeof saved?.sound === "boolean") setSound(saved.sound);
      } catch { /* Defaults remain available when storage is unavailable. */ }
    }
    setPanel(next);
  }
  function savePreferences() {
    try { localStorage.setItem(PREFERENCES_KEY, JSON.stringify({ minutes, sound })); setMessage("ترجیحات در این مرورگر ذخیره شد."); setError(""); }
    catch { setError("ذخیره نشد؛ دسترسی مرورگر به حافظه را بررسی کن."); }
  }
  function logout() {
    try {
      localStorage.removeItem(PROFILE_KEY);
      sessionStorage.removeItem(PHONE_DRAFT_KEY);
      window.dispatchEvent(new Event("lango:profile-change"));
      router.replace("/login");
    } catch { setError("خروج انجام نشد؛ دوباره تلاش کن."); }
  }
  return <Box component="main" sx={{ minHeight: "100svh", display: "flex", alignItems: "center", py: { xs: 2, sm: 4, lg: 6 }, background: "radial-gradient(ellipse at 15% 15%, #c7e5ff 0%, transparent 48%), radial-gradient(ellipse at 90% 85%, #c8e8ff 0%, transparent 45%), #9dcdff" }}>
    <Container maxWidth={false} sx={{ maxWidth: { xs: 490, sm: 760, md: 1040 }, px: { xs: 1.5, sm: 3 } }}>
      <Paper elevation={0} sx={{ border: "5px solid #e7f3ff", borderRadius: { xs: "24px", md: "32px" }, px: { xs: 2, sm: 3, md: 4 }, pt: 1.5, pb: { xs: 2, md: 4 }, boxShadow: "0 24px 80px #1a6cba20", background: "linear-gradient(160deg,#fff,#f9fcff)" }}>
        <Stack component="header" direction="row" sx={{ justifyContent: "space-between", alignItems: "center", gap: 1, mb: 2 }}>
          <Typography component="h1" sx={{ color: "#13204f", fontWeight: 800, fontSize: { xs: 22, sm: 26, md: 30 } }}>پروفایل و تنظیمات</Typography>
          <IconButton component={Link} href="/home" aria-label="بازگشت به خانه" sx={{ width: 44, height: 44, color: "#19315d" }}><ArrowBackRounded sx={{ fontSize: 20 }} /></IconButton>
        </Stack>
        <Box sx={{ display: { md: "grid" }, gridTemplateColumns: "minmax(0,0.8fr) minmax(0,1.4fr)", gap: 4, alignItems: "start" }}>
          <Stack direction={{ xs: "row", md: "column" }} sx={{ alignItems: "center", justifyContent: { xs: "center", md: "flex-start" }, gap: { xs: 2, md: 2.5 }, py: { xs: 1, md: 4 }, px: { md: 2 }, mb: { xs: 2, md: 0 }, bgcolor: { md: "#f0f7ff" }, borderRadius: 4 }}>
            <Avatar src={profile?.avatar || undefined} alt={name} sx={{ width: { xs: 64, sm: 80, md: 104 }, height: { xs: 64, sm: 80, md: 104 }, bgcolor: "#e3efff", color: "#7d9ac2", border: "3px solid #e4f0ff" }}><PersonOutlineRounded sx={{ fontSize: 42 }} /></Avatar>
            <Stack sx={{ alignItems: { xs: "flex-start", md: "center" }, minWidth: 0, gap: 0.75 }}>
              <Typography sx={{ fontWeight: 800, color: "#203666", fontSize: { xs: 15, sm: 19 }, overflowWrap: "anywhere" }}>{name}</Typography>
              <Typography sx={{ color: "#7588ab", fontSize: 12 }}>سطح زبان هنوز تعیین نشده</Typography>
              <Button component={Link} href="/complete-profile" sx={{ bgcolor: "#dfedff", color: "#0b77fb", borderRadius: "9px", px: 2.5, py: 0.5, fontSize: 12 }}>ویرایش پروفایل</Button>
            </Stack>
          </Stack>
          <List disablePadding aria-label="تنظیمات حساب">
            {rows.map(row => <ListItem key={row.label} disablePadding sx={{ borderBottom: "1px solid #eaf1fb", "&:last-child": { borderBottom: 0 } }}>
              <ListItemButton {...("href" in row ? { component: Link, href: row.href } : { onClick: () => open(row.panel) })} sx={{ minHeight: { xs: 47, sm: 56 }, px: { xs: 0.5, sm: 1 }, gap: 1.5, borderRadius: 1.5, color: "#3c5181" }}>
                <row.icon sx={{ fontSize: 20, flexShrink: 0 }} />
                <Typography sx={{ flex: 1, fontSize: { xs: 12, sm: 14 }, fontWeight: 500 }}>{row.label}</Typography>
                <ChevronRightRounded sx={{ fontSize: 19 }} />
              </ListItemButton>
            </ListItem>)}
          </List>
        </Box>
      </Paper>
    </Container>
    <Modal open={panel !== null} onClose={close} title={rows.find(row => "panel" in row && row.panel === panel)?.label ?? "تنظیمات"} maxWidth="sm" actions={<>
      {panel === "learning" && <Button variant="contained" onClick={savePreferences}>ذخیره ترجیحات</Button>}
      {panel === "logout" && <Button color="error" onClick={logout}>بله، خارج می‌شوم</Button>}
      <Button onClick={close}>{panel === "logout" ? "انصراف" : "بستن"}</Button>
    </>}>
      <Stack spacing={2} sx={{ color: "text.secondary", "& p": { lineHeight: 2 } }}>
        {panel === "learning" && <>
          <FormControl fullWidth><Typography component="label" id="daily-goal-label" htmlFor="daily-goal" sx={{ mb: 1 }}>هدف روزانه</Typography><Select labelId="daily-goal-label" inputProps={{ id: "daily-goal" }} value={minutes} onChange={event => { setMinutes(Number(event.target.value)); setMessage(""); }}>{[5, 10, 15, 20, 30].map(value => <MenuItem key={value} value={value}>{value.toLocaleString("fa-IR")} دقیقه</MenuItem>)}</Select></FormControl>
          <FormControlLabel control={<Switch checked={sound} onChange={(_, checked) => { setSound(checked); setMessage(""); }} />} label="پخش صدای تمرین‌ها" />
          <Typography sx={{ fontSize: 13 }}>این ترجیحات فعلاً فقط در همین مرورگر ذخیره می‌شوند؛ اعمال آن‌ها در تمرین‌ها پس از اتصال تنظیمات یادگیری انجام می‌شود.</Typography>
        </>}
        {panel === "devices" && <><Typography sx={{ color: "text.primary", fontWeight: 700 }}>این مرورگر • دستگاه فعلی</Typography><Typography>نسخهٔ فعلی حساب آنلاین و نشست سرور ندارد. فهرست دستگاه‌های واردشده و امکان خروج از راه دور پس از اتصال بک‌اند فعال می‌شود.</Typography></>}
        {panel === "language" && <><Typography sx={{ color: "text.primary", fontWeight: 700 }}>فارسی • زبان فعلی اپلیکیشن</Typography><Typography>در حال حاضر رابط فارسی در دسترس است. محتوای آموزشی به زبان انگلیسی نمایش داده می‌شود.</Typography></>}
        {panel === "privacy" && <><Typography>اطلاعات پروفایل، عکس و ترجیحات این نسخه در حافظهٔ همین مرورگر نگهداری می‌شوند. خروج از حساب، پروفایل ذخیره‌شده و شمارهٔ موقت ورود را از این مرورگر حذف می‌کند.</Typography><Typography>دسترسی میکروفون هنگام استفاده از تمرین مکالمه، با اجازهٔ خودت درخواست می‌شود.</Typography></>}
        {panel === "support" && <><Typography>برای تغییر نام، عکس یا اطلاعات تماس، «ویرایش پروفایل» را انتخاب کن. پیام‌ها را می‌توانی در بخش «اعلان‌ها و پیام‌ها» ببینی.</Typography><Typography>پشتیبانی آنلاین هنوز متصل نشده است.</Typography><Button component={Link} href="/notifications">مشاهدهٔ اعلان‌ها و پیام‌ها</Button></>}
        {panel === "logout" && <Typography>از حساب خارج می‌شوی؟ اطلاعات پروفایل ذخیره‌شده در این مرورگر حذف می‌شود و به صفحهٔ ورود برمی‌گردی.</Typography>}
        {message && <Alert severity="success" role="status">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </Stack>
    </Modal>
  </Box>;
}
