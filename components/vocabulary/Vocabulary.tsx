"use client";

import { useId, useState, type FormEvent } from "react";
import { Alert, Box, Button, Container, Paper, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import AddRounded from "@mui/icons-material/AddRounded";
import TranslateRounded from "@mui/icons-material/TranslateRounded";
import Link from "@/components/AppLink";
import { addCustomWord, useVocabulary } from "@/lib/vocabulary-store";
import WordGrid from "./WordGrid";

const categories = [{ id: "all", label: "همه" }, { id: "saved", label: "واژگان ذخیره شده" }, { id: "custom", label: "واژگان من" }] as const;
type Category = typeof categories[number]["id"];
export default function Vocabulary() {
  const id = useId();
  const entries = useVocabulary();
  const [category, setCategory] = useState<Category>("all");
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const visible = entries.filter(entry => category === "all" || entry.kind === category);
  function submit(event: FormEvent) {
    event.preventDefault(); setNotice("");
    try {
      const issue = addCustomWord({ word, meaning, example });
      if (issue) { setError(issue); return; }
      setError(""); setNotice("واژه به واژگان من اضافه شد."); setWord(""); setMeaning(""); setExample(""); setCategory("custom");
    } catch { setError("واژه ذخیره نشد؛ دسترسی مرورگر به حافظه را بررسی کن."); }
  }
  return <Box component="main" sx={{ minHeight: "100dvh", bgcolor: "#f4f9ff", py: { xs: 2, sm: 4 } }}><Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
    <Stack component="header" sx={{ gap: 1, mb: 3 }}><Typography component="h1" sx={{ fontSize: { xs: 28, md: 35 }, color: "#17375f", fontWeight: 800 }}>واژگان</Typography><Typography sx={{ color: "#7d94b4", fontSize: 14, lineHeight: 2 }}>واژه‌های درس‌ها را ذخیره کن و واژگان شخصی خودت را بساز.</Typography></Stack>
    <Paper component="section" aria-labelledby={`${id}-add-title`} elevation={0} sx={{ p: { xs: 2, sm: 3 }, mb: 3, border: "1px solid #dfeafa", borderRadius: "19px", bgcolor: "#fff" }}>
      <Typography component="h2" id={`${id}-add-title`} sx={{ fontSize: 19, fontWeight: 700, color: "#31567f", mb: 0.75 }}>افزودن واژهٔ شخصی</Typography><Typography sx={{ color: "#94a5bc", fontSize: 12, lineHeight: 2, mb: 2.5 }}>یک واژه یا عبارت انگلیسی، معنی آن و در صورت تمایل یک مثال وارد کن.</Typography>
      <Box component="form" noValidate onSubmit={submit} sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0,1fr)", sm: "repeat(2,minmax(0,1fr))" }, gap: 2 }}>
        <TextField label="واژه یا عبارت انگلیسی" value={word} onChange={e => { setWord(e.target.value); setNotice(""); setError(""); }} required fullWidth slotProps={{ htmlInput: { maxLength: 80, dir: "ltr", lang: "en", style: { textAlign: "left" } } }} />
        <TextField label="معنی فارسی" value={meaning} onChange={e => { setMeaning(e.target.value); setNotice(""); setError(""); }} required fullWidth slotProps={{ htmlInput: { maxLength: 160 } }} />
        <TextField label="مثال انگلیسی (اختیاری)" value={example} onChange={e => { setExample(e.target.value); setNotice(""); }} fullWidth sx={{ gridColumn: "1 / -1" }} slotProps={{ htmlInput: { maxLength: 300, dir: "ltr", lang: "en", style: { textAlign: "left" } } }} />
        <Button type="submit" variant="contained" sx={{ justifySelf: "start", gap: 1, minHeight: 44, px: 3, borderRadius: "10px" }}><AddRounded sx={{ fontSize: 20 }} />افزودن واژه</Button>
      </Box>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}{notice && <Alert severity="success" role="status" sx={{ mt: 2 }}>{notice}</Alert>}
    </Paper>
    <Tabs value={category} onChange={(_, next: Category) => setCategory(next)} variant="fullWidth" aria-label="دسته‌بندی واژگان" sx={{ mb: 2.5, minHeight: 48, "& .MuiTabs-list": { gap: 0.75 }, "& .MuiTabs-indicator": { display: "none" }, "& .MuiTab-root": { minWidth: 0, minHeight: 47, border: "1px solid #dfebfa", borderRadius: "10px", px: 0.5, bgcolor: "#fff", color: "#748cae", fontSize: { xs: 11, sm: 14 } }, "& .MuiTab-root.Mui-selected": { bgcolor: "#168bff", color: "#fff", borderColor: "#168bff" } }}>
      {categories.map(item => <Tab key={item.id} value={item.id} id={`${id}-tab-${item.id}`} aria-controls={`${id}-panel`} aria-label={item.label} label={`${item.label} (${entries.filter(entry => item.id === "all" || entry.kind === item.id).length.toLocaleString("fa-IR")})`} />)}
    </Tabs>
    <Box role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${category}`}>
      {visible.length ? <WordGrid words={visible} /> : <Paper elevation={0} sx={{ textAlign: "center", py: 6, px: 2, border: "1px solid #e0ebfa", borderRadius: "18px" }}><TranslateRounded sx={{ fontSize: 45, color: "#91b3de", mb: 1.5 }} /><Typography component="h2" sx={{ color: "#59799f", fontSize: 19, fontWeight: 700 }}>{category === "custom" ? "هنوز واژه‌ای به واژگان من اضافه نکرده‌ای" : category === "saved" ? "هنوز واژه‌ای از درس‌ها ذخیره نکرده‌ای" : "هنوز واژه‌ای اضافه نشده"}</Typography><Typography sx={{ color: "#94a6bf", fontSize: 13, lineHeight: 2, mt: 1, mb: 2 }}>از فرم بالا واژه اضافه کن یا در بخش واژه‌های درس، روی قلب کنار واژه بزن.</Typography><Button component={Link} href="/lesson" variant="outlined">رفتن به درس</Button></Paper>}
    </Box>
    <Typography sx={{ fontSize: 11, color: "#99a9bf", lineHeight: 2, mt: 2 }}>واژه‌ها فعلاً در همین مرورگر ذخیره می‌شوند.</Typography>
  </Container></Box>;
}
