"use client";

import { useState, type FormEvent } from "react";
import { useAppRouter as useRouter } from "@/components/AppLink";
import { Box, Button, Stack, Typography } from "@mui/material";
import AuthShell from "@/components/auth/AuthShell";
import AvatarUpload from "@/components/auth/AvatarUpload";
import BirthDateField, { type BirthDateValue } from "@/components/auth/BirthDateField";
import FormField from "@/components/auth/FormField";
import PhoneField from "@/components/auth/PhoneField";
import Modal from "@/components/Modal";
import { isValidBirthDate, isValidEmail, isValidPhone, normalizePhone, type Profile } from "@/lib/auth";
import { saveProfile, useDraftPhone, useProfile } from "@/lib/profile-store";

type Fields = { firstName: string; lastName: string; email: string; phone: string };
type Errors = Partial<Record<keyof Fields | "avatar" | "birthDate", string>>;

export default function CompleteProfile({ currentYear }: { currentYear: number }) {
  const router = useRouter();
  const saved = useProfile();
  const draftPhone = useDraftPhone();
  const stored = !draftPhone || saved?.phone === draftPhone ? saved : null;
  const [edits, setEdits] = useState<Partial<Fields>>({});
  const [avatarBusy, setAvatarBusy] = useState(false);
  const [avatarEdit, setAvatarEdit] = useState<string | null>(null);
  const [birthEdit, setBirthEdit] = useState<BirthDateValue | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [storageError, setStorageError] = useState(false);
  const values: Fields = {
    firstName: edits.firstName ?? stored?.firstName ?? "",
    lastName: edits.lastName ?? stored?.lastName ?? "",
    email: edits.email ?? stored?.email ?? "",
    phone: edits.phone ?? (draftPhone || stored?.phone || ""),
  };
  const avatar = avatarEdit ?? stored?.avatar ?? "";
  const birthDate: BirthDateValue = birthEdit ?? {
    year: stored ? String(stored.birthDate.year) : "",
    month: stored ? String(stored.birthDate.month) : "",
    day: stored ? String(stored.birthDate.day) : "",
  };
  function update(field: keyof Fields, value: string) {
    setEdits((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (avatarBusy) return;
    const date = { year: Number(birthDate.year), month: Number(birthDate.month), day: Number(birthDate.day) };
    const nextErrors: Errors = {};
    if (!avatar) nextErrors.avatar = "یک عکس برای پروفایلت انتخاب کن.";
    if (!values.firstName.trim()) nextErrors.firstName = "نامت رو وارد کن.";
    if (!values.lastName.trim()) nextErrors.lastName = "نام خانوادگی‌ات رو وارد کن.";
    if (!isValidEmail(values.email)) nextErrors.email = "یک آدرس ایمیل معتبر وارد کن.";
    if (!isValidPhone(values.phone)) nextErrors.phone = "یک شماره موبایل معتبر وارد کن.";
    if (!isValidBirthDate(date)) nextErrors.birthDate = "یک تاریخ تولد معتبر وارد کن؛ تاریخ نباید در آینده باشه.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const profile: Profile = {
      firstName: values.firstName.trim(), lastName: values.lastName.trim(),
      email: values.email.trim(), phone: normalizePhone(values.phone), birthDate: date, avatar,
    };
    try { saveProfile(profile); router.replace("/placement-test"); }
    catch { setStorageError(true); }
  }
  return (
    <AuthShell step={3} title="یه کم بیشتر بشناسیمت" description="پروفایلت رو کامل کن تا مسیرت رو با هم شروع کنیم." onBack={() => router.push("/login")}>
      <Box component="form" noValidate onSubmit={submit}>
        <AvatarUpload value={avatar} onBusyChange={setAvatarBusy} onChange={(value) => { setAvatarEdit(value); setErrors((previous) => ({ ...previous, avatar: undefined })); }} error={errors.avatar} />
        <Stack spacing={2}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
            <FormField label="نام" name="given-name" required autoComplete="given-name" value={values.firstName} onChange={(event) => update("firstName", event.target.value)} error={Boolean(errors.firstName)} helperText={errors.firstName} placeholder="نام شما" slotProps={{ htmlInput: { maxLength: 60 } }} />
            <FormField label="نام خانوادگی" name="family-name" required autoComplete="family-name" value={values.lastName} onChange={(event) => update("lastName", event.target.value)} error={Boolean(errors.lastName)} helperText={errors.lastName} placeholder="نام خانوادگی شما" slotProps={{ htmlInput: { maxLength: 80 } }} />
          </Box>
          <FormField label="ایمیل" name="email" type="email" required autoComplete="email" value={values.email} onChange={(event) => update("email", event.target.value)} error={Boolean(errors.email)} helperText={errors.email} placeholder="you@example.com" slotProps={{ htmlInput: { dir: "ltr", maxLength: 254, style: { textAlign: "left" } } }} />
          <Box>
            <PhoneField value={values.phone} onChange={(value) => update("phone", value)} error={errors.phone} readOnly={Boolean(draftPhone || stored?.phone)} />
            {(draftPhone || stored?.phone) && <Button size="small" onClick={() => router.push("/login")} sx={{ mt: 0.5, fontSize: 11.5 }}>ویرایش شماره موبایل</Button>}
          </Box>
          <BirthDateField currentYear={currentYear} value={birthDate} onChange={(value) => { setBirthEdit(value); setErrors((previous) => ({ ...previous, birthDate: undefined })); }} error={errors.birthDate} />
        </Stack>
        <Button type="submit" variant="contained" fullWidth disabled={avatarBusy} sx={{ mt: 3, mb: 1, minHeight: 49, background: "linear-gradient(180deg,#2287ff,#0760ff)" }}>{avatarBusy ? "در حال آماده‌سازی عکس…" : "ذخیره و ادامه"}</Button>
      </Box>
      <Modal open={storageError} onClose={() => setStorageError(false)} title="اطلاعات ذخیره نشد" maxWidth="xs" actions={<Button onClick={() => setStorageError(false)}>متوجه شدم</Button>}>
        <Typography sx={{ color: "text.secondary" }}>فضای ذخیره‌سازی مرورگر در دسترس نیست. دسترسی ذخیره‌سازی رو بررسی کن و دوباره تلاش کن؛ اطلاعات فرم همچنان اینجاست.</Typography>
      </Modal>
    </AuthShell>
  );
}
