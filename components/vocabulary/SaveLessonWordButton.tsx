"use client";

import { useState } from "react";
import { IconButton, Snackbar, Tooltip } from "@mui/material";
import FavoriteBorderRounded from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRounded from "@mui/icons-material/FavoriteRounded";
import { toggleLessonWord, useVocabulary } from "@/lib/vocabulary-store";
import { lessonWordId, type LessonWordInput } from "@/lib/vocabulary";

export default function SaveLessonWordButton({ word }: { word: LessonWordInput }) {
  const entries = useVocabulary();
  const saved = entries.some(entry => entry.id === lessonWordId(word));
  const [error, setError] = useState(false);
  const label = `${saved ? "حذف از" : "افزودن به"} علاقه‌مندی‌ها: ${word.word}`;
  return <><Tooltip title={label}><IconButton aria-label={label} aria-pressed={saved} onClick={() => { try { toggleLessonWord(word); } catch { setError(true); } }} sx={{ width: 36, height: 36, color: saved ? "#f05476" : "#7f99bc", bgcolor: saved ? "#fff0f5" : "#f1f7ff", borderRadius: "11px" }}>{saved ? <FavoriteRounded sx={{ fontSize: 20 }} /> : <FavoriteBorderRounded sx={{ fontSize: 20 }} />}</IconButton></Tooltip><Snackbar open={error} onClose={() => setError(false)} autoHideDuration={5000} message="ذخیره نشد؛ دسترسی مرورگر به حافظه را بررسی کن." /></>;
}
