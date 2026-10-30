"use client";

import { useState } from "react";
import { Button, IconButton, Snackbar, Tooltip } from "@mui/material";
import FavoriteBorderRounded from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRounded from "@mui/icons-material/FavoriteRounded";
import { toggleCourseFavorite, useCourseFavorites } from "@/lib/course-favorites";

export default function FavoriteCourseButton({ courseId, title, compact = false }: { courseId: string; title: string; compact?: boolean }) {
  const favorites = useCourseFavorites();
  const active = favorites.includes(courseId);
  const [error, setError] = useState(false);
  const label = `${active ? "حذف از" : "افزودن به"} علاقه‌مندی‌ها: ${title}`;
  function toggle() { try { toggleCourseFavorite(courseId); } catch { setError(true); } }
  const icon = active ? <FavoriteRounded sx={{ fontSize: 22 }} /> : <FavoriteBorderRounded sx={{ fontSize: 22 }} />;
  return <>
    {compact ? <Tooltip title={label}><IconButton aria-label={label} aria-pressed={active} onClick={toggle} sx={{ width: 40, height: 40, bgcolor: "#fffffff0", color: active ? "#f05476" : "#56749d", boxShadow: "0 3px 12px #16315320", "&:hover": { bgcolor: "#fff" } }}>{icon}</IconButton></Tooltip> : <Button variant="outlined" aria-label={label} aria-pressed={active} onClick={toggle} sx={{ gap: 1, minHeight: 48, borderRadius: "11px", borderColor: active ? "#ffceda" : "#cbdfff", color: active ? "#e94870" : "#42628f", bgcolor: active ? "#fff5f8" : "#fff" }}>{icon}{active ? "در علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}</Button>}
    <Snackbar open={error} onClose={() => setError(false)} autoHideDuration={5000} message="ذخیره نشد؛ دسترسی مرورگر به حافظه را بررسی کن." />
  </>;
}
