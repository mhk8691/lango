"use client";

import { useState } from "react";
import Link from "next/link";
import { Alert, Box, Button, Container, IconButton, Paper, Stack, Typography } from "@mui/material";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import AssessmentRounded from "@mui/icons-material/AssessmentRounded";
import DownloadRounded from "@mui/icons-material/DownloadRounded";
import Modal from "@/components/Modal";
import AnimatedScore from "./AnimatedScore";
import SkillProgress from "./SkillProgress";
import useAnimationReady from "./useAnimationReady";
import type { TestResultProps } from "./types";

export default function TestResult({ result, backHref = "/placement-test", onDownloadCertificate, onBack, backLabel = "بازگشت به آزمون تعیین سطح", title = "نتیجه آزمون", scoreLabel, children, actions }: TestResultProps) {
  const [showNotice, setShowNotice] = useState(false);
  const animationReady = useAnimationReady();
  return (
    <Box component="main" sx={{ minHeight: "100svh", display: "flex", alignItems: "center", py: { xs: 2, sm: 3, md: 4 }, background: "radial-gradient(ellipse at 15% 15%, #c7e5ff 0%, transparent 48%), radial-gradient(ellipse at 90% 85%, #c8e8ff 0%, transparent 45%), #9dcdff" }}>
      <Container maxWidth={false} sx={{ maxWidth: { xs: 480, sm: 580, md: 680, lg: 720 }, px: { xs: 1.5, sm: 3 } }}>
        <Paper elevation={0} sx={{ border: "5px solid #e7f3ff", borderRadius: { xs: "24px", md: "32px" }, px: { xs: 2.5, sm: 4, md: 5 }, pt: 2, pb: { xs: 2.5, sm: 3 }, boxShadow: "0 24px 80px #1a6cba20" }}>
          <Stack component="header" direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", color: "#13204f" }}><AssessmentRounded sx={{ fontSize: { xs: 20, sm: 23 } }} /><Typography component="h1" sx={{ fontWeight: 800, fontSize: { xs: 21, sm: 25 } }}>{title}</Typography></Stack>
            <IconButton {...(onBack ? { onClick: onBack } : { component: Link, href: backHref })} aria-label={backLabel} sx={{ color: "#19315d", width: 44, height: 44 }}><ArrowForwardRounded sx={{ fontSize: 20 }} /></IconButton>
          </Stack>
          {result.score !== null ? <AnimatedScore score={result.score} ready={animationReady} /> : <Alert severity="info" sx={{ my: 3 }}>پاسخ خودکار قابل نمره‌دهی ثبت نشده است.</Alert>}
          {scoreLabel && result.score !== null && <Typography sx={{ textAlign: "center", color: "#8194af", fontSize: 12, mb: 1.5 }}>{scoreLabel}</Typography>}
          <Typography sx={{ textAlign: "center", color: "#0bb875", fontSize: { xs: 20, sm: 22 }, fontWeight: 700, mt: 0.5, mb: 3 }}>{result.message}</Typography>
          {result.skills.length > 0 && <Stack component="section" aria-label="عملکرد در مهارت‌های زبان" spacing={1.25} sx={{ width: "100%", maxWidth: 520, mx: "auto" }}>
            {result.skills.map((skill, index) => <SkillProgress key={skill.id} skill={skill} index={index} ready={animationReady} />)}
          </Stack>}
          {children}
          <Box data-result-actions="true" sx={{ mt: 3 }}>
            {actions ?? <Button variant="contained" fullWidth onClick={() => { if (onDownloadCertificate) onDownloadCertificate(); else setShowNotice(true); }} sx={{ minHeight: 50, gap: 1, fontSize: 14, borderRadius: "12px", background: "linear-gradient(180deg,#2287ff,#0760ff)", boxShadow: "0 7px 18px #1673ff20" }}><DownloadRounded sx={{ fontSize: 20 }} />دریافت مدرک</Button>}
          </Box>
        </Paper>
      </Container>
      <Modal open={showNotice} onClose={() => setShowNotice(false)} title="دریافت مدرک" maxWidth="xs" actions={<Button onClick={() => setShowNotice(false)}>متوجه شدم</Button>}>
        <Typography sx={{ color: "text.secondary" }}>قابلیت دریافت مدرک به‌زودی در دسترس قرار می‌گیرد.</Typography>
      </Modal>
    </Box>
  );
}
