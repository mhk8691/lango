"use client";

import { useId, type ReactNode } from "react";
import CloseRounded from "@mui/icons-material/CloseRounded";
import Dialog, { type DialogProps } from "@mui/material/Dialog";
import DialogActions, { type DialogActionsProps } from "@mui/material/DialogActions";
import DialogContent, { type DialogContentProps } from "@mui/material/DialogContent";
import DialogTitle, { type DialogTitleProps } from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";

export type ModalProps = Omit<DialogProps, "title" | "children" | "onClose"> & {
  title: ReactNode;
  children: ReactNode;
  onClose: () => void;
  actions?: ReactNode;
  showCloseButton?: boolean;
  titleProps?: DialogTitleProps;
  contentProps?: DialogContentProps;
  actionsProps?: DialogActionsProps;
};

/** Shared controlled modal. Dialog supplies focus trapping, portals and scroll locking. */
export default function Modal({
  title,
  children,
  actions,
  onClose,
  showCloseButton = true,
  fullWidth = true,
  maxWidth = "sm",
  scroll = "paper",
  titleProps,
  contentProps,
  actionsProps,
  ...dialogProps
}: ModalProps) {
  const generatedTitleId = useId();
  const titleId = titleProps?.id ?? generatedTitleId;

  return (
    <Dialog
      {...dialogProps}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      scroll={scroll}
      onClose={() => onClose()}
      aria-labelledby={dialogProps["aria-labelledby"] ?? titleId}
    >
      <DialogTitle {...titleProps} id={titleId} sx={[
        { px: showCloseButton ? 6 : 3, pt: 3 },
        ...(Array.isArray(titleProps?.sx) ? titleProps.sx : [titleProps?.sx]),
      ]}>
        {title}
      </DialogTitle>
      {showCloseButton && (
        <IconButton
          aria-label="بستن مودال"
          onClick={onClose}
          size="small"
          sx={{ position: "absolute", left: 12, top: 12, color: "text.secondary" }}
        >
          <CloseRounded fontSize="small" />
        </IconButton>
      )}
      <DialogContent {...contentProps}>{children}</DialogContent>
      {actions != null && (
        <DialogActions {...actionsProps} sx={[
          { px: 3, pb: 3, gap: 1 },
          ...(Array.isArray(actionsProps?.sx) ? actionsProps.sx : [actionsProps?.sx]),
        ]}>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
}
