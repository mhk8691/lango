"use client";

import { useId } from "react";
import { Stack, TextField, Typography, type TextFieldProps } from "@mui/material";

type FormFieldProps = Omit<TextFieldProps, "label"> & { label: string };

export default function FormField({ label, id, required, ...props }: FormFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  return (
    <Stack spacing={0.75}>
      <Typography component="label" htmlFor={fieldId} sx={{ color: "#647492", fontSize: 12.5, fontWeight: 500 }}>{label}{required && <span aria-hidden="true" style={{ color: "#ef6870" }}> *</span>}</Typography>
      <TextField {...props} id={fieldId} required={required} />
    </Stack>
  );
}
