"use client";

import { InputAdornment, Typography } from "@mui/material";
import FormField from "./FormField";
import { isValidPhone, normalizePhone } from "@/lib/auth";

export default function PhoneField({ value, onChange, error, autoFocus = false, readOnly = false }: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
}) {
  return (
    <FormField
      label="شماره موبایل" name="phone" type="tel" required autoFocus={autoFocus}
      value={isValidPhone(value) ? normalizePhone(value).slice(1) : value} onChange={(event) => onChange(event.target.value)}
      placeholder="912 345 6789" error={Boolean(error)} helperText={error}
      slotProps={{
        input: { readOnly, dir: "ltr", startAdornment: <InputAdornment position="start"><Typography component="span" sx={{ fontSize: 13, borderRight: "1px solid #e3eaf5", pr: 1.5, mr: 1.5, color: "#34476e" }}>+98</Typography></InputAdornment> },
        htmlInput: { dir: "ltr", inputMode: "tel", autoComplete: "tel-national", maxLength: 20, style: { textAlign: "left" } },
      }}
    />
  );
}
