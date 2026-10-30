"use client";

import { useId } from "react";
import { Box, FormHelperText, Stack, Typography } from "@mui/material";
import { daysInPersianMonth } from "@/lib/auth";

export type BirthDateValue = { year: string; month: string; day: string };
const months = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];

export default function BirthDateField({ value, onChange, error, currentYear }: {
  value: BirthDateValue;
  onChange: (value: BirthDateValue) => void;
  error?: string;
  currentYear: number;
}) {
  const id = useId();
  const maxDay = value.month ? daysInPersianMonth(Number(value.year) || currentYear, Number(value.month)) : 31;
  function update(field: keyof BirthDateValue, nextValue: string) {
    const next = { ...value, [field]: nextValue };
    if (next.month && Number(next.day) > daysInPersianMonth(Number(next.year) || currentYear, Number(next.month))) next.day = "";
    onChange(next);
  }
  const selectSx = { width: "100%", minWidth: 0, height: 49, px: 1.25, border: "1px solid", borderColor: error ? "error.main" : "#dce5f0", borderRadius: "11px", bgcolor: "#fff", color: "#34476e", font: "inherit", fontSize: 13, outline: "none", "&:focus-visible": { borderColor: "primary.main", boxShadow: "0 0 0 2px #168bff22" } };
  return (
    <Stack spacing={0.75}>
      <Typography id={`${id}-label`} sx={{ color: "#647492", fontSize: 12.5, fontWeight: 500 }}>تاریخ تولد <Box component="span" sx={{ color: "#99a5b8", fontWeight: 400 }}>(شمسی)</Box> <span aria-hidden="true" style={{ color: "#ef6870" }}>*</span></Typography>
      <Box role="group" aria-labelledby={`${id}-label`} aria-describedby={error ? `${id}-error` : undefined} sx={{ display: "grid", gridTemplateColumns: "0.8fr 1.4fr 1fr", gap: 1 }}>
        <Box component="select" required name="birthDay" aria-label="روز تولد" aria-invalid={Boolean(error)} value={value.day} onChange={(event) => update("day", event.target.value)} sx={selectSx}><option value="">روز</option>{Array.from({ length: maxDay }, (_, index) => <option key={index + 1} value={index + 1}>{(index + 1).toLocaleString("fa-IR")}</option>)}</Box>
        <Box component="select" required name="birthMonth" aria-label="ماه تولد" aria-invalid={Boolean(error)} value={value.month} onChange={(event) => update("month", event.target.value)} sx={selectSx}><option value="">ماه</option>{months.map((month, index) => <option key={month} value={index + 1}>{month}</option>)}</Box>
        <Box component="select" required name="birthYear" aria-label="سال تولد" aria-invalid={Boolean(error)} value={value.year} onChange={(event) => update("year", event.target.value)} sx={selectSx}><option value="">سال</option>{Array.from({ length: currentYear - 1299 }, (_, index) => <option key={currentYear - index} value={currentYear - index}>{String(currentYear - index).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)])}</option>)}</Box>
      </Box>
      {error && <FormHelperText error id={`${id}-error`}>{error}</FormHelperText>}
    </Stack>
  );
}
