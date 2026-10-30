"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { Box, Container, IconButton, Paper, Stack, Typography } from "@mui/material";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import Logo from "@/components/Logo";

export default function AuthShell({ children, title, description, step, onBack }: {
  children: ReactNode;
  title: string;
  description: ReactNode;
  step: 1 | 2 | 3;
  onBack: () => void;
}) {
  return (
    <Box component="main" sx={{ minHeight: "100svh", display: "flex", alignItems: "center", py: { xs: 2, sm: 4, lg: 6 }, background: "radial-gradient(ellipse at 15% 15%, #c7e5ff 0%, transparent 48%), radial-gradient(ellipse at 90% 85%, #c8e8ff 0%, transparent 45%), #9dcdff" }}>
      <Container maxWidth={false} sx={{ maxWidth: { xs: 490, md: 1000, lg: 1160 }, px: { xs: 1.5, sm: 3 } }}>
        <Paper elevation={0} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.05fr 1fr" }, border: "5px solid #e4f2ff", borderRadius: { xs: "25px", md: "34px" }, overflow: "hidden", boxShadow: "0 24px 80px #1a6cba20" }}>
          <Box sx={{ minWidth: 0, px: { xs: 2.5, sm: 4, lg: 5 }, py: 3 }}>
            <Stack component="header" direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: { xs: 3, md: 4 } }}>
              <Logo preload />
              <IconButton aria-label="بازگشت به مرحله قبل" onClick={onBack} sx={{ color: "#122353" }}><ArrowForwardRounded fontSize="small" /></IconButton>
            </Stack>
            <Stack direction="row" spacing={0.75} aria-label={`مرحله ${step} از ۳`} sx={{ width: 76, mx: "auto", mb: 3 }}>
              {[1, 2, 3].map((item) => <Box key={item} sx={{ height: 4, flex: 1, borderRadius: 2, bgcolor: item <= step ? "primary.main" : "#e5edf9" }} />)}
            </Stack>
            <Typography component="h1" sx={{ textAlign: "center", fontSize: { xs: 23, md: 26 }, color: "#13204f", fontWeight: 800 }}>{title}</Typography>
            <Typography component="div" sx={{ textAlign: "center", color: "#7b89a7", fontSize: 13, lineHeight: 2, mt: 1, mb: 3 }}>{description}</Typography>
            {children}
          </Box>
          <Box component="aside" sx={{ display: { xs: "none", md: "flex" }, flexDirection: "column", justifyContent: "center", alignItems: "center", px: 4, py: 6, background: "linear-gradient(145deg,#f0f8ff,#e5f2ff)", textAlign: "center" }}>
            <Box sx={{ bgcolor: "#fff", color: "#3986dc", borderRadius: 8, px: 2, py: 0.75, display: "flex", gap: 1, alignItems: "center", fontSize: 12 }}><AutoAwesomeRounded sx={{ fontSize: 16 }} />یه شروع تازه، به سبک خودت</Box>
            <Box sx={{ width: "100%", maxWidth: 360, aspectRatio: "1", position: "relative", my: 3 }}>
              <Image src="/images/onboarding/listener.png" alt="دختری با هدفون، آمادهٔ یادگیری زبان" fill sizes="(max-width: 899px) 1px, 360px" style={{ objectFit: "contain", borderRadius: "50%", mixBlendMode: "multiply" }} />
            </Box>
            <Typography sx={{ fontWeight: 800, fontSize: { md: 24, lg: 28 }, color: "#122353" }}>دنیای بزرگ‌تر،<br />با قدم‌های کوچیک تو.</Typography>
            <Typography sx={{ color: "#7b89a7", fontSize: 13, lineHeight: 2, maxWidth: 280, mt: 1.5 }}>با لنگو، یادگیری زبان تبدیل می‌شه به یه بخش دوست‌داشتنی از هر روزت.</Typography>
          </Box>
        </Paper>
        <Typography sx={{ textAlign: "center", mt: 2, color: "#426f9f", fontSize: 12 }}>هر روز یه قدم، به دنیایی بزرگ‌تر.</Typography>
      </Container>
    </Box>
  );
}
