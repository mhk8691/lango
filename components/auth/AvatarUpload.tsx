"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { Avatar, Box, ButtonBase, CircularProgress, Stack, Typography } from "@mui/material";
import AddAPhotoRounded from "@mui/icons-material/AddAPhotoRounded";
import PersonOutlineRounded from "@mui/icons-material/PersonOutlineRounded";

async function prepareAvatar(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const image = new window.Image();
    image.src = url;
    await image.decode();
    if (image.width * image.height > 40000000) throw new Error("عکس انتخابی بیش از حد بزرگه؛ یک عکس کوچک‌تر انتخاب کن.");
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 384;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("این مرورگر امکان آماده‌سازی عکس رو نداره.");
    const size = Math.min(image.width, image.height);
    context.drawImage(image, (image.width - size) / 2, (image.height - size) / 2, size, size, 0, 0, 384, 384);
    return canvas.toDataURL("image/webp", 0.85);
  } finally { URL.revokeObjectURL(url); }
}

export default function AvatarUpload({ value, onChange, error, onBusyChange }: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  onBusyChange?: (busy: boolean) => void;
}) {
  const input = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [uploadError, setUploadError] = useState("");
  async function select(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploadError("");
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return setUploadError("عکس باید با فرمت JPG، PNG یا WebP باشه.");
    if (file.size > 5 * 1024 * 1024) return setUploadError("حجم عکس باید کمتر از ۵ مگابایت باشه.");
    setBusy(true);
    onBusyChange?.(true);
    try { onChange(await prepareAvatar(file)); }
    catch (issue) { setUploadError(issue instanceof Error ? issue.message : "عکس باز نشد؛ یک عکس دیگه انتخاب کن."); }
    finally { setBusy(false); onBusyChange?.(false); }
  }
  return (
    <Stack spacing={1} sx={{ alignItems: "center", mb: 3 }}>
      <input ref={input} hidden type="file" accept="image/jpeg,image/png,image/webp" aria-label="انتخاب عکس پروفایل" onChange={select} />
      <ButtonBase disabled={busy} onClick={() => input.current?.click()} aria-label={value ? "تغییر عکس پروفایل" : "انتخاب عکس پروفایل"} sx={{ borderRadius: "50%", position: "relative", p: 0.5, border: "2px dashed", borderColor: error || uploadError ? "error.main" : "#b8d7ff", "&.Mui-focusVisible": { outline: "3px solid #168bff", outlineOffset: 4 } }}>
        <Avatar src={value || undefined} alt="عکس پروفایل شما" sx={{ width: 82, height: 82, bgcolor: "#eef6ff", color: "#8db5e7" }}>{busy ? <CircularProgress size={24} /> : <PersonOutlineRounded sx={{ fontSize: 43 }} />}</Avatar>
        <Box sx={{ position: "absolute", bottom: 0, left: 0, width: 29, height: 29, borderRadius: "50%", bgcolor: "primary.main", border: "3px solid white", display: "grid", placeItems: "center", color: "white" }}><AddAPhotoRounded sx={{ fontSize: 14 }} /></Box>
      </ButtonBase>
      <Typography sx={{ fontSize: 11.5, color: uploadError || error ? "error.main" : "#91a0b8", textAlign: "center" }} role={uploadError || error ? "alert" : undefined}>{uploadError || error || "یه عکس برای پروفایلت انتخاب کن"}</Typography>
    </Stack>
  );
}
