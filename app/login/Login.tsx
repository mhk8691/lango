"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Alert, Box, Button, IconButton, InputAdornment, Stack, Tab, Tabs, Typography } from "@mui/material";
import VisibilityRounded from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRounded from "@mui/icons-material/VisibilityOffRounded";
import SmsRounded from "@mui/icons-material/SmsRounded";
import LockOutlined from "@mui/icons-material/LockOutlined";
import AuthShell from "@/components/auth/AuthShell";
import PhoneField from "@/components/auth/PhoneField";
import FormField from "@/components/auth/FormField";
import OtpInput from "@/components/auth/OtpInput";
import { isValidPhone, normalizePhone } from "@/lib/auth";
import { saveDraftPhone } from "@/lib/profile-store";

export default function Login() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "verify">("phone");
  const [method, setMethod] = useState<"sms" | "password">("sms");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [errors, setErrors] = useState<{ phone?: string; password?: string; code?: string }>({});
  const [remaining, setRemaining] = useState(120);
  const deadline = useRef(0);

  useEffect(() => {
    if (step !== "verify") return;
    const interval = window.setInterval(() => setRemaining(Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000))), 250);
    return () => window.clearInterval(interval);
  }, [step]);

  function openProfile() {
    // Temporary frontend flow: both methods always go to profile completion.
    // No password/OTP is persisted and no authentication claim is made here.
    saveDraftPhone(normalizePhone(phone));
    setPassword("");
    router.push("/complete-profile");
  }
  function sendCode() {
    setCode(Array(6).fill(""));
    setErrors({});
    deadline.current = Date.now() + 120000;
    setRemaining(120);
    setStep("verify");
  }
  function submitPhone(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = {
      phone: isValidPhone(phone) ? undefined : "یک شماره موبایل معتبر وارد کن.",
      password: method === "password" && password.length < 8 ? "رمز عبور باید حداقل ۸ کاراکتر داشته باشه." : undefined,
    };
    setErrors(nextErrors);
    if (nextErrors.phone || nextErrors.password) return;
    setPhone(normalizePhone(phone));
    if (method === "sms") sendCode();
    else openProfile();
  }
  function submitCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (code.some((digit) => !/^\d$/.test(digit))) return setErrors({ code: "کد شش‌رقمی رو کامل وارد کن." });
    if (remaining === 0) return setErrors({ code: "زمان کد تموم شده؛ دوباره درخواست کد بده." });
    openProfile();
  }
  const timer = `${Math.floor(remaining / 60).toLocaleString("fa-IR", { minimumIntegerDigits: 2 })}:${(remaining % 60).toLocaleString("fa-IR", { minimumIntegerDigits: 2 })}`;

  return (
    <AuthShell
      step={step === "verify" ? 2 : 1}
      title={step === "verify" ? "کد تأیید" : "ورود یا ثبت‌نام"}
      description={step === "verify" ? <>کد تأیید شمارهٔ <Box component="b" dir="ltr" sx={{ display: "inline-block", color: "#334a72" }}>{normalizePhone(phone)}</Box> رو وارد کن.</> : "خوش اومدی! با شماره موبایلت شروع کن."}
      onBack={() => { if (step === "verify") { setStep("phone"); setErrors({}); } else router.push("/onboarding"); }}
    >
      {step === "phone" ? (
        <Box component="form" noValidate onSubmit={submitPhone} sx={{ minHeight: { xs: 350, md: 330 }, display: "flex", flexDirection: "column" }}>
          <Tabs value={method} onChange={(_, value: "sms" | "password") => { setMethod(value); setErrors({}); setPassword(""); }} variant="fullWidth" aria-label="روش ورود" sx={{ mb: 3, minHeight: 44, bgcolor: "#f1f6fc", borderRadius: 2, p: 0.5, "& .MuiTabs-indicator": { display: "none" }, "& .MuiTab-root": { minWidth: 0, minHeight: 40, borderRadius: 1.5, fontSize: 12.5, color: "#8490a8", gap: 1 }, "& .Mui-selected": { bgcolor: "#fff", color: "#1676ee", boxShadow: "0 2px 8px #18395b0a" } }}>
            <Tab value="sms" icon={<SmsRounded sx={{ fontSize: 17 }} />} iconPosition="start" label="ورود با پیامک" />
            <Tab value="password" icon={<LockOutlined sx={{ fontSize: 17 }} />} iconPosition="start" label="ورود با رمز عبور" />
          </Tabs>
          <Stack spacing={2.5}>
            <PhoneField value={phone} onChange={(value) => { setPhone(value); setErrors((previous) => ({ ...previous, phone: undefined })); }} error={errors.phone} autoFocus />
            {method === "password" && (
              <FormField label="رمز عبور" name="password" required value={password} type={showPassword ? "text" : "password"} onChange={(event) => setPassword(event.target.value)} error={Boolean(errors.password)} helperText={errors.password} placeholder="رمز عبورت رو وارد کن" slotProps={{ htmlInput: { autoComplete: "current-password" }, input: { endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"} size="small">{showPassword ? <VisibilityOffRounded fontSize="small" /> : <VisibilityRounded fontSize="small" />}</IconButton></InputAdornment> } }} />
            )}
          </Stack>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, minHeight: 49, background: "linear-gradient(180deg,#2287ff,#0760ff)" }}>{method === "sms" ? "دریافت کد تأیید" : "ورود"}</Button>
          {method === "password" && <Button onClick={() => { setMethod("sms"); setErrors({}); setPassword(""); }} sx={{ mt: 1, fontSize: 12, fontWeight: 500 }}>رمزت رو یادت نیست؟ با پیامک وارد شو</Button>}
          <Typography sx={{ mt: "auto", pt: 5, textAlign: "center", color: "#97a3b7", fontSize: 11.5, lineHeight: 2 }}>اولین باره اینجایی؟ بعد از تأیید شماره،<br />پروفایلت رو با هم می‌سازیم.</Typography>
        </Box>
      ) : (
        <Box component="form" noValidate onSubmit={submitCode} sx={{ minHeight: { xs: 350, md: 330 }, display: "flex", flexDirection: "column" }}>
          <Button onClick={() => { setStep("phone"); setErrors({}); }} size="small" sx={{ alignSelf: "center", mb: 3, fontSize: 12 }}>ویرایش شماره موبایل</Button>
          <OtpInput value={code} onChange={(value) => { setCode(value); setErrors({}); }} error={Boolean(errors.code)} />
          {errors.code && <Alert id="otp-error" severity="error" sx={{ mt: 2, fontSize: 12 }}>{errors.code}</Alert>}
          <Typography component="div" role="timer" aria-label="زمان باقی‌مانده برای ارسال مجدد" sx={{ textAlign: "center", my: 2.5, color: "#7d8eae", fontSize: 15 }}><span dir="ltr">{timer}</span></Typography>
          <Button type="submit" variant="contained" fullWidth sx={{ minHeight: 49, background: "linear-gradient(180deg,#2287ff,#0760ff)" }}>تأیید و ادامه</Button>
          <Box sx={{ textAlign: "center", mt: "auto", pt: 4 }}>
            <Typography sx={{ fontSize: 12, color: "#97a3b7", mb: 0.5 }}>کد رو دریافت نکردی؟</Typography>
            <Button disabled={remaining > 0} onClick={sendCode} sx={{ fontSize: 13, "&.Mui-disabled": { bgcolor: "transparent" } }}>ارسال مجدد کد</Button>
          </Box>
        </Box>
      )}
    </AuthShell>
  );
}
