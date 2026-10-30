"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import Logo from "@/components/Logo";
import Modal from "@/components/Modal";
import { useProfile } from "@/lib/profile-store";

export default function Home() {
  const profile = useProfile();
  const [showAccount, setShowAccount] = useState(false);
  const details = profile ? [
    ["نام و نام خانوادگی", `${profile.firstName} ${profile.lastName}`],
    ["ایمیل", profile.email], ["شماره موبایل", profile.phone],
    ["تاریخ تولد", `${profile.birthDate.year}/${profile.birthDate.month}/${profile.birthDate.day}`],
  ] : [];
  return (
    <Box component="main" sx={{ minHeight: "100svh", bgcolor: "#f3f8ff", py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">
        <Stack component="header" direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 5 }}>
          <Logo />
          {profile ? <Button onClick={() => setShowAccount(true)} sx={{ gap: 1.5, color: "text.primary" }}><Avatar src={profile.avatar} alt={`${profile.firstName} ${profile.lastName}`} sx={{ width: 38, height: 38 }} /><Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>حساب من</Box></Button> : <Button component={Link} href="/login" variant="contained">ورود به لنگو</Button>}
        </Stack>
        <Paper elevation={0} sx={{ p: { xs: 3, sm: 5, md: 7 }, borderRadius: { xs: 3, md: 5 }, background: "linear-gradient(120deg,#fff,#e7f3ff)", border: "1px solid #e0edfc" }}>
          {profile && <Typography sx={{ display: "flex", alignItems: "center", gap: 1, color: "success.main", fontSize: 13, mb: 2 }}><CheckCircleRounded sx={{ fontSize: 19 }} />پروفایلت آماده‌ست</Typography>}
          <Typography component="h1" sx={{ fontWeight: 800, color: "#13204f", fontSize: { xs: 27, md: 40 }, lineHeight: 1.8 }}>{profile ? `سلام ${profile.firstName}، خوش اومدی!` : "به لنگو خوش اومدی!"}</Typography>
          <Typography sx={{ color: "text.secondary", mt: 1.5, mb: 4, maxWidth: 530, lineHeight: 2 }}>این‌جا شروع مسیر یادگیری توئه؛ هر روز یه قدم کوچیک، به دنیایی بزرگ‌تر.</Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ flexWrap: "wrap" }}>
            <Button component={Link} href={profile ? "/complete-profile" : "/login"} variant="contained" sx={{ minHeight: 48 }}>{profile ? "ویرایش پروفایل" : "شروع کنیم"}</Button>
            <Button component={Link} href="/progress" variant="outlined">گزارش پیشرفت</Button>
            <Button component={Link} href="/notifications" variant="outlined">اعلان‌ها و پیام‌ها</Button>
            <Button component={Link} href="/onboarding" endIcon={<ArrowBackRounded sx={{ mr: 1 }} />}>مرور معرفی لنگو</Button>
          </Stack>
        </Paper>
      </Container>
      <Modal open={showAccount} onClose={() => setShowAccount(false)} title="اطلاعات حساب" maxWidth="xs" actions={<Button component={Link} href="/complete-profile" onClick={() => setShowAccount(false)}>ویرایش پروفایل</Button>}>
        <Stack component="dl" spacing={2} sx={{ m: 0 }}>
          {details.map(([label, value]) => <Box key={label}><Typography component="dt" sx={{ color: "text.secondary", fontSize: 12 }}>{label}</Typography><Typography component="dd" sx={{ m: 0, overflowWrap: "anywhere" }}>{value}</Typography></Box>)}
        </Stack>
      </Modal>
    </Box>
  );
}
