"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Button, Container, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import Modal from "@/components/Modal";
import TestCard from "./TestCard";
import TestsSidebar from "./TestsSidebar";
import { categories, tests, type TestCategory } from "./data";

export default function TestsDashboard() {
  const id = useId();
  const [category, setCategory] = useState<TestCategory>("all");
  const [about, setAbout] = useState(false);
  const visible = tests.filter(test => category === "all" || test.category === category);
  return <Box component="main" sx={{ minHeight: "100dvh", bgcolor: "#f4f8ff", py: { xs: 1.5, sm: 2, lg: 3 } }}>
    <Container maxWidth={false} sx={{ maxWidth: 1660, px: { xs: 1.5, sm: 2, lg: 3 } }}>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0,1fr)", lg: "300px minmax(0,1fr)", xl: "340px minmax(0,1fr)" }, gap: 2.25, alignItems: "start" }}>
        <Box sx={{ minWidth: 0, gridColumn: { lg: 2 }, gridRow: { lg: 1 } }}>
          <Paper component="header" elevation={0} sx={{ position: "relative", overflow: "hidden", borderRadius: "22px", background: "linear-gradient(120deg,#b5d1ff,#e5f1ff 55%,#b8d3ff)", p: { xs: 2, sm: 3 }, mb: 2.25 }}>
            <Box aria-hidden="true" sx={{ position: "absolute", inset: 0, opacity: 0.3, background: "repeating-linear-gradient(140deg,transparent 0px,transparent 130px,#fff6 131px,#fff6 175px)" }} />
            <Box sx={{ position: "relative", display: "grid", gridTemplateColumns: { xs: "minmax(0,1fr)", md: "160px minmax(0,1fr) 145px", xl: "180px minmax(0,1fr) 195px" }, gap: { xs: 2.5, md: 2 }, alignItems: "center", minHeight: { md: 215 } }}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: "#fffffff0", borderRadius: "16px", textAlign: "center", gridColumn: { xs: 1, md: 1 }, gridRow: { xs: 2, md: 1 } }}><Typography sx={{ fontSize: 11, color: "#8093b1" }}>آخرین سطح شما</Typography><Typography sx={{ fontSize: 32, color: "#142c5b", fontWeight: 800, mt: 0.5 }}>A2</Typography><Typography lang="en" sx={{ fontSize: 14, color: "#4a6590", mb: 2 }}>Elementary</Typography><Button component={Link} href="/placement-test/results" variant="outlined" size="small" fullWidth sx={{ fontSize: 11, borderRadius: "10px", minHeight: 35 }}>مشاهده جزئیات</Button></Paper>
              <Box sx={{ minWidth: 0, gridColumn: { md: 2 }, gridRow: { xs: 1, md: 1 }, textAlign: { xs: "right", md: "center" } }}><Typography component="h1" sx={{ fontSize: { xs: 26, sm: 31, md: 26, xl: 31 }, color: "#112959", fontWeight: 800, lineHeight: 1.7 }}>آزمون بده، مسیرت رو بهتر بشناس!</Typography><Typography sx={{ fontSize: { xs: 13, sm: 14 }, color: "#5b77a1", lineHeight: 2, mt: 1 }}>مهارت‌های زبانت را بسنج، نقاط قوتت را پیدا کن و قدم بعدی یادگیری را آگاهانه بردار.</Typography><Stack direction="row" sx={{ flexWrap: "wrap", justifyContent: { xs: "flex-start", md: "center" }, gap: 1.5, mt: 2.5 }}><Button component={Link} href="/placement-test" variant="contained" sx={{ minHeight: 45, borderRadius: "11px", gap: 0.5, fontSize: 12 }}><PlayArrowRounded sx={{ fontSize: 20 }} />شروع آزمون تعیین سطح</Button><Button onClick={() => setAbout(true)} sx={{ fontSize: 12 }}>دربارهٔ آزمون‌ها</Button></Stack></Box>
              <Box sx={{ display: { xs: "none", md: "block" }, position: "relative", gridColumn: 3, gridRow: 1, height: 230, alignSelf: "end", mb: -3 }}><Image src="/images/tests/student.png" alt="زبان‌آموزی با تبلت و مداد در حال فکر کردن" fill priority sizes="200px" style={{ objectFit: "contain", objectPosition: "bottom" }} /></Box>
            </Box>
          </Paper>
          <Paper component="section" aria-labelledby="available-tests" elevation={0} sx={{ p: { xs: 1.5, sm: 2.5 }, border: "1px solid #e4edfa", borderRadius: "19px", bgcolor: "#ffffffc9" }}>
            <Typography component="h2" id="available-tests" sx={{ color: "#172e59", fontWeight: 800, fontSize: 23 }}>آزمون‌های موجود</Typography><Typography sx={{ color: "#8a9cb7", fontSize: 12, lineHeight: 2, mt: 0.5, mb: 2 }}>آزمون‌های متنوع برای سنجش مهارت‌ها و دریافت بازخورد</Typography>
            <Tabs value={category} onChange={(_, value: TestCategory) => setCategory(value)} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile aria-label="نوع آزمون" sx={{ minHeight: 42, mb: 2.25, "& .MuiTabs-list": { gap: 0.75 }, "& .MuiTabs-indicator": { display: "none" }, "& .MuiTab-root": { minWidth: 85, flex: 1, minHeight: 39, px: 1, py: 0.75, fontSize: 11, borderRadius: "9px", bgcolor: "#f0f5fd", color: "#7d92b2" }, "& .MuiTab-root.Mui-selected": { bgcolor: "#2f81ff", color: "#fff" } }}>
              {categories.map(item => <Tab key={item.id} value={item.id} label={item.label} id={`${id}-tab-${item.id}`} aria-controls={`${id}-panel`} />)}
            </Tabs>
            <Box role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${category}`}><Box component="ul" aria-label="فهرست آزمون‌ها" sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0,1fr)", sm: "repeat(2,minmax(0,1fr))", md: "repeat(3,minmax(0,1fr))", lg: "repeat(3,minmax(0,1fr))", xl: "repeat(3,minmax(0,1fr))" }, gap: 1.5, p: 0, m: 0, listStyle: "none" }}>{visible.map(test => <Box component="li" key={test.id} sx={{ minWidth: 0 }}><TestCard test={test} /></Box>)}</Box></Box>
          </Paper>
          <Typography sx={{ color: "#91a2bb", fontSize: 11, lineHeight: 2, mt: 1.5 }}>آمار و نتایج اخیر نمونه‌اند. آزمون‌های فعال از صفحهٔ مشترک آزمون استفاده می‌کنند؛ ارزیابی نوشته و صدا پس از اتصال بک‌اند فعال می‌شود.</Typography>
        </Box>
        <Box sx={{ minWidth: 0, gridColumn: { lg: 1 }, gridRow: { lg: 1 } }}><TestsSidebar /></Box>
      </Box>
    </Container>
    <Modal open={about} onClose={() => setAbout(false)} title="دربارهٔ آزمون‌ها" actions={<Button onClick={() => setAbout(false)}>متوجه شدم</Button>}><Stack spacing={2}><Typography sx={{ color: "text.secondary", lineHeight: 2.2 }}>از تعیین سطح شروع کن یا یک مهارت را برای تمرین انتخاب کن. تمرین‌های شنیداری، نوشتاری، مکالمه، واژگان و گرامر در نسخهٔ فعلی قابل استفاده‌اند.</Typography><Typography sx={{ color: "text.secondary", lineHeight: 2.2 }}>آمار این صفحه نمونه است. سنجش خودکار مکالمه، آزمون شبیه‌سازی آیلتس و صدور مدرک هنوز فعال نشده‌اند.</Typography></Stack></Modal>
  </Box>;
}
