"use client";

import { useState } from "react";
import { Alert, Box, Button, Chip, IconButton, Paper, Stack, Typography } from "@mui/material";
import FavoriteRounded from "@mui/icons-material/FavoriteRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import Modal from "@/components/Modal";
import { removeVocabularyEntry } from "@/lib/vocabulary-store";
import type { VocabularyEntry } from "@/lib/vocabulary";

export default function WordGrid({ words }: { words: readonly VocabularyEntry[] }) {
  const [removing, setRemoving] = useState<VocabularyEntry | null>(null);
  const [error, setError] = useState("");
  function remove() { if (!removing) return; try { removeVocabularyEntry(removing.id); setRemoving(null); setError(""); } catch { setError("حذف نشد؛ دسترسی مرورگر به حافظه را بررسی کن."); } }
  return <><Box component="ul" aria-label="فهرست واژگان" sx={{ p: 0, m: 0, listStyle: "none", display: "grid", gridTemplateColumns: { xs: "minmax(0,1fr)", sm: "repeat(2,minmax(0,1fr))", lg: "repeat(3,minmax(0,1fr))" }, gap: 2 }}>{words.map(entry => <Box component="li" key={entry.id} sx={{ minWidth: 0 }}><Paper component="article" elevation={0} sx={{ p: 2.5, height: "100%", border: "1px solid #e1ecfb", borderRadius: "17px", bgcolor: "#fff", display: "flex", flexDirection: "column" }}>
    <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", gap: 1, mb: 2 }}><Chip label={entry.kind === "saved" ? "واژهٔ ذخیره‌شده" : "واژهٔ من"} size="small" sx={{ fontSize: 10, color: entry.kind === "saved" ? "#1983d1" : "#8960c3", bgcolor: entry.kind === "saved" ? "#e9f5ff" : "#f2ebff" }} /><IconButton aria-label={`${entry.kind === "saved" ? "حذف از علاقه‌مندی‌ها" : "حذف واژه"}: ${entry.word}`} onClick={() => { setError(""); setRemoving(entry); }} sx={{ width: 38, height: 38, color: entry.kind === "saved" ? "#ef6a89" : "#8398b6" }}>{entry.kind === "saved" ? <FavoriteRounded sx={{ fontSize: 21 }} /> : <DeleteOutlineRounded sx={{ fontSize: 21 }} />}</IconButton></Stack>
    <Typography component="h2" lang="en" dir="ltr" sx={{ color: "#23456d", fontSize: 23, fontWeight: 700, textAlign: "left", overflowWrap: "anywhere" }}>{entry.word}</Typography><Typography sx={{ color: "#6c86a8", fontSize: 14, lineHeight: 2, mt: 1, overflowWrap: "anywhere" }}>{entry.meaning}</Typography>
    {entry.example && <Typography lang="en" dir="ltr" sx={{ mt: 2, p: 1.25, borderRadius: 2, bgcolor: "#f5f9ff", color: "#8a9db8", fontSize: 12, lineHeight: 1.9, textAlign: "left", overflowWrap: "anywhere" }}>{entry.example}</Typography>}
    {entry.lesson && <Typography sx={{ pt: 2, mt: "auto", color: "#99a9bf", fontSize: 11, lineHeight: 2 }}>از درس {entry.lesson.title}</Typography>}
  </Paper></Box>)}</Box><Modal open={removing !== null} onClose={() => setRemoving(null)} title="حذف واژه" maxWidth="xs" actions={<><Button onClick={() => setRemoving(null)}>انصراف</Button><Button color="error" onClick={remove}>حذف</Button></>}><Typography sx={{ color: "text.secondary", lineHeight: 2 }}>واژهٔ <bdi lang="en">{removing?.word}</bdi> از {removing?.kind === "saved" ? "واژگان ذخیره‌شده" : "واژگان من"} حذف شود؟</Typography>{error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}</Modal></>;
}
