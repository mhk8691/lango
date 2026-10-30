"use client";

import { useRef, type KeyboardEvent } from "react";
import { Box, TextField } from "@mui/material";
import { normalizeDigits } from "@/lib/auth";

export default function OtpInput({ value, onChange, error }: {
  value: string[];
  onChange: (value: string[]) => void;
  error?: boolean;
}) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  function fill(raw: string, start: number) {
    const digits = normalizeDigits(raw).replace(/\D/g, "").slice(0, 6 - start);
    if (!digits) return;
    const next = [...value];
    [...digits].forEach((digit, index) => { next[start + index] = digit; });
    onChange(next);
    inputs.current[Math.min(start + digits.length, 5)]?.focus();
  }
  function handleKey(event: KeyboardEvent<HTMLDivElement>, index: number) {
    if (event.key === "Backspace") {
      event.preventDefault();
      const target = value[index] ? index : Math.max(0, index - 1);
      const next = [...value]; next[target] = "";
      onChange(next); inputs.current[target]?.focus();
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      inputs.current[Math.max(0, Math.min(5, index + (event.key === "ArrowRight" ? 1 : -1)))]?.focus();
    }
  }
  return (
    <Box dir="ltr" role="group" aria-label="کد تأیید شش‌رقمی" onPaste={(event) => { event.preventDefault(); fill(event.clipboardData.getData("text"), 0); }} sx={{ display: "grid", gridTemplateColumns: "repeat(6,minmax(0,1fr))", gap: { xs: 0.75, sm: 1 }, maxWidth: 380, mx: "auto" }}>
      {value.map((digit, index) => (
        <TextField
          key={index} value={digit} error={error} autoFocus={index === 0}
          inputRef={(input: HTMLInputElement | null) => { inputs.current[index] = input; }}
          onChange={(event) => {
            if (!event.target.value) { const next = [...value]; next[index] = ""; onChange(next); }
            else fill(event.target.value, index);
          }}
          onFocus={(event) => { (event.target as HTMLInputElement).select(); }}
          onKeyDown={(event) => handleKey(event, index)}
          slotProps={{ htmlInput: { "aria-label": `رقم ${index + 1} کد تأیید`, "aria-describedby": error ? "otp-error" : undefined, inputMode: "numeric", autoComplete: index === 0 ? "one-time-code" : "off", maxLength: 6, style: { textAlign: "center", padding: "15px 0", fontSize: 23, fontWeight: 500, direction: "ltr" } } }}
        />
      ))}
    </Box>
  );
}
