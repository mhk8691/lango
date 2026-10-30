"use client";

import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Box, Button, ButtonBase, Portal, Stack, Typography } from "@mui/material";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import CancelRounded from "@mui/icons-material/CancelRounded";
import { visuallyHidden } from "@mui/utils";
import ExerciseFrame from "../shared/ExerciseFrame";
import { insertToken, isCorrectOrder, moveToken, normalizeOrder } from "./order-utils";
import type { DragAndDropExerciseProps, WordToken } from "./types";

type Zone = "bank" | "answer";
type DragSession = { id: string; from: Zone; pointerId: number; startX: number; startY: number; active: boolean; element: HTMLElement };
type DragView = { id: string; from: Zone; x: number; y: number; over: Zone | null };

export default function DragAndDropExercise(props: DragAndDropExerciseProps) {
  return <WordSorter key={props.question.id} {...props} />;
}

function WordSorter({ examMode = false, question, value, onChange, questionNumber, totalQuestions, onNext, onPrevious, onExit }: DragAndDropExerciseProps) {
  const id = useId();
  const bankRef = useRef<HTMLDivElement | null>(null);
  const answerRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef<DragSession | null>(null);
  const [dragView, setDragView] = useState<DragView | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const order = normalizeOrder(question.tokens, value);
  const tokensById = new Map(question.tokens.map((token) => [token.id, token]));
  const answer = order.map((tokenId) => tokensById.get(tokenId)!);
  const complete = order.length === question.tokens.length;
  const correct = complete && isCorrectOrder(question.tokens, order, question.correctOrder ?? []);
  const draggedToken = dragView ? tokensById.get(dragView.id) : null;

  function focusToken(tokenId: string, zone: Zone) {
    requestAnimationFrame(() => {
      const root = zone === "answer" ? answerRef.current : bankRef.current;
      const button = Array.from(root?.querySelectorAll<HTMLButtonElement>("[data-token-id]") ?? []).find((element) => element.dataset.tokenId === tokenId);
      button?.focus();
    });
  }

  function update(next: string[], tokenId: string, zone: Zone, message: string) {
    onChange(next);
    setAnnouncement(message);
    focusToken(tokenId, zone);
  }

  function clickToken(token: WordToken, zone: Zone) {
    if (zone === "bank") update(insertToken(order, token.id, order.length), token.id, "answer", `کلمهٔ ${token.text} به جمله اضافه شد.`);
    else update(order.filter((tokenId) => tokenId !== token.id), token.id, "bank", `کلمهٔ ${token.text} از جمله برداشته شد.`);
  }

  function dropTarget(x: number, y: number, tokenId: string): { zone: Zone; index: number } | null {
    const target = document.elementFromPoint(x, y);
    if (!target) return null;
    if (answerRef.current?.contains(target)) {
      const items = Array.from(answerRef.current.querySelectorAll<HTMLElement>('[data-token-zone="answer"]')).filter((element) => element.dataset.tokenId !== tokenId);
      const index = items.findIndex((element) => {
        const rect = element.getBoundingClientRect();
        return y < rect.top || (y <= rect.bottom && x < rect.left + rect.width / 2);
      });
      return { zone: "answer", index: index === -1 ? items.length : index };
    }
    if (bankRef.current?.contains(target)) return { zone: "bank", index: 0 };
    return null;
  }

  function begin(event: PointerEvent<HTMLElement>, tokenId: string, from: Zone) {
    if (!event.isPrimary || event.button !== 0) return;
    drag.current = { id: tokenId, from, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, active: false, element: event.currentTarget };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function move(event: PointerEvent<HTMLElement>) {
    const session = drag.current;
    if (!session || session.pointerId !== event.pointerId) return;
    if (!session.active && Math.hypot(event.clientX - session.startX, event.clientY - session.startY) < 8) return;
    session.active = true;
    event.preventDefault();
    const target = dropTarget(event.clientX, event.clientY, session.id);
    setDragView({ id: session.id, from: session.from, x: event.clientX, y: event.clientY, over: target?.zone ?? null });
  }

  function release() {
    const session = drag.current;
    drag.current = null;
    setDragView(null);
    if (session?.element.hasPointerCapture(session.pointerId)) session.element.releasePointerCapture(session.pointerId);
  }

  function finish(event: PointerEvent<HTMLElement>) {
    const session = drag.current;
    if (!session || session.pointerId !== event.pointerId) return;
    const target = session.active ? dropTarget(event.clientX, event.clientY, session.id) : null;
    release();
    const token = tokensById.get(session.id)!;
    // Handle taps on pointer-up: mobile browsers may suppress a click after a drag.
    if (!session.active) { clickToken(token, session.from); return; }
    if (!target) return;
    if (target.zone === "answer") update(insertToken(order, token.id, target.index), token.id, "answer", `کلمهٔ ${token.text} در جمله قرار گرفت.`);
    else if (session.from === "answer") update(order.filter((tokenId) => tokenId !== token.id), token.id, "bank", `کلمهٔ ${token.text} از جمله برداشته شد.`);
  }

  function keyDown(event: KeyboardEvent<HTMLElement>, token: WordToken, zone: Zone) {
    if (event.key === "Escape" && drag.current) { event.preventDefault(); release(); return; }
    if (zone !== "answer") return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      update(moveToken(order, token.id, event.key === "ArrowLeft" ? -1 : 1), token.id, "answer", `جای کلمهٔ ${token.text} تغییر کرد.`);
    } else if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      update(order.filter((tokenId) => tokenId !== token.id), token.id, "bank", `کلمهٔ ${token.text} از جمله برداشته شد.`);
    }
  }

  function wordButton(token: WordToken, zone: Zone) {
    const used = zone === "bank" && order.includes(token.id);
    return (
      <ButtonBase
        key={token.id} disabled={used} draggable={false}
        data-token-id={token.id} data-token-zone={zone}
        aria-label={zone === "bank" ? `اضافه کردن کلمهٔ ${token.text}` : `حذف کلمهٔ ${token.text} از جمله`}
        aria-describedby={`${id}-keyboard`}
        onPointerDown={(event) => begin(event, token.id, zone)} onPointerMove={move} onPointerUp={finish}
        onPointerCancel={release}
        onLostPointerCapture={(event) => { if (drag.current?.pointerId === event.pointerId && drag.current.element === event.currentTarget) release(); }}
        onClick={(event) => { if (event.detail === 0) clickToken(token, zone); }} onKeyDown={(event) => keyDown(event, token, zone)}
        sx={{
          minWidth: 44, minHeight: 44, maxWidth: "100%", px: { xs: 1.25, sm: 1.75 }, py: 1,
          border: "1px solid", borderColor: zone === "bank" ? "#dce7f4" : "transparent", borderRadius: "8px",
          bgcolor: zone === "bank" ? "#fff" : "transparent", color: "#142354", fontWeight: 600,
          fontSize: { xs: 14, sm: 16 }, lineHeight: 1.5, overflowWrap: "anywhere", userSelect: "none", touchAction: "none",
          cursor: "grab", opacity: dragView?.id === token.id && dragView?.from === zone ? 0.4 : 1,
          "&:active": { cursor: "grabbing" }, "&:hover": { bgcolor: "#eaf3ff" },
          "&.Mui-disabled": { bgcolor: "#f3f7fc", color: "#bcc9dd" },
          "&.Mui-focusVisible": { outline: "2px solid #168bff", outlineOffset: 2 },
        }}
      ><Box component="span" lang="en">{token.text}</Box></ButtonBase>
    );
  }

  return (
    <ExerciseFrame embedded={examMode} questionNumber={questionNumber} totalQuestions={totalQuestions} hasAnswer={complete} onNext={onNext} onPrevious={onPrevious} onExit={onExit} progressColor="warning">
      <Box sx={{ p: { xs: 1, sm: 2, md: 3 }, borderRadius: "18px", bgcolor: "#fbfdff", border: "1px solid #edf3fa" }}>
        <Typography component="h2" dir="ltr" lang="en" sx={{ textAlign: "center", color: "#7585a3", fontSize: { xs: 13, sm: 16, md: 18 }, lineHeight: 1.8, fontWeight: 500, mb: 3 }}>
          {question.instruction ?? "Put the words in the correct order."}
        </Typography>
        <Box id={`${id}-keyboard`} sx={visuallyHidden}>با Enter یا Space کلمه را اضافه یا حذف کن. برای تغییر ترتیب کلمهٔ انتخاب‌شده در جمله، از کلیدهای چپ و راست استفاده کن. با Escape کشیدن را لغو کن.</Box>
        <Box ref={bankRef} role="group" aria-label="کلمه‌های قابل انتخاب" dir="ltr" sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 1, p: 1, minHeight: 70, border: "1px solid", borderColor: dragView?.over === "bank" ? "primary.main" : "#e7eef8", bgcolor: dragView?.over === "bank" ? "#edf5ff" : "#f9fcff", borderRadius: "11px" }}>
          {question.tokens.map((token) => wordButton(token, "bank"))}
        </Box>
        <Box ref={answerRef} role="group" aria-label="جملهٔ شما" aria-describedby={`${id}-keyboard`} dir="ltr" sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", alignContent: "center", justifyContent: "center", gap: 0.5, minHeight: { xs: 84, md: 104 }, mt: 3, p: 1.5, border: "1px solid", borderColor: dragView?.over === "answer" ? "primary.main" : "#cddff5", bgcolor: dragView?.over === "answer" ? "#e6f1ff" : "#f4f8fe", borderRadius: "11px" }}>
          {answer.length ? answer.map((token) => wordButton(token, "answer")) : <Typography dir="rtl" sx={{ fontSize: 12, color: "#9aaac3", pointerEvents: "none", textAlign: "center" }}>کلمه‌ها را اینجا قرار بده</Typography>}
        </Box>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", gap: 1, mt: 0.75 }}>
          <Typography sx={{ fontSize: 10.5, color: "#9aa7bd" }}>با کلیک هم می‌تونی کلمه‌ها رو بچینی.</Typography>
          <Button size="small" disabled={!order.length} onClick={() => { onChange([]); setAnnouncement("جمله پاک شد."); focusToken(question.tokens[0].id, "bank"); }} sx={{ flexShrink: 0, minWidth: 45, fontSize: 11, "&.Mui-disabled": { bgcolor: "transparent" } }}>از نو</Button>
        </Stack>
        {!examMode && <Stack role="status" aria-live="polite" aria-atomic="true" direction="row" spacing={1} sx={{ minHeight: 40, mt: 0.5, alignItems: "center", justifyContent: complete ? "flex-start" : "center", color: complete ? correct ? "#0aaa76" : "#d35f71" : "#99a6bd" }}>
          {complete && (correct ? <CheckCircleRounded sx={{ fontSize: 23, flexShrink: 0 }} /> : <CancelRounded sx={{ fontSize: 23, flexShrink: 0 }} />)}
          <Typography sx={{ fontSize: { xs: 11.5, sm: 13 } }}>{complete ? correct ? "آفرین! جمله درست است." : "ترتیب جمله درست نیست؛ کلمه‌ها را جابه‌جا کن." : "همهٔ کلمه‌ها را در جمله قرار بده."}</Typography>
        </Stack>}
        <Box role="status" aria-live="polite" aria-atomic="true" sx={visuallyHidden}>{announcement}</Box>
      </Box>
      {dragView && draggedToken && <Portal><Box aria-hidden="true" dir="ltr" style={{ left: Math.max(50, Math.min(window.innerWidth - 50, dragView.x)), top: Math.max(24, Math.min(window.innerHeight - 24, dragView.y)) }} sx={{ position: "fixed", transform: "translate(-50%, -50%)", zIndex: 1500, pointerEvents: "none", px: 2, py: 1.25, bgcolor: "white", color: "#126bdf", border: "1px solid #83baff", borderRadius: "9px", fontSize: 16, fontWeight: 700, boxShadow: "0 7px 24px #1371d833" }}>{draggedToken.text}</Box></Portal>}
    </ExerciseFrame>
  );
}
