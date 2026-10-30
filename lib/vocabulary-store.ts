"use client";

import { useMemo, useSyncExternalStore } from "react";
import { lessonWordId, normalizeWord, parseVocabulary, wordInputError, type CustomWordInput, type LessonWordInput, type VocabularyEntry } from "./vocabulary";

const KEY = "lango.vocabulary";
const EVENT = "lango:vocabulary-change";
const serverSnapshot = () => null;
function snapshot() { try { return localStorage.getItem(KEY); } catch { return null; } }
function subscribe(listener: () => void) {
  window.addEventListener("storage", listener); window.addEventListener(EVENT, listener);
  return () => { window.removeEventListener("storage", listener); window.removeEventListener(EVENT, listener); };
}
export function useVocabulary() {
  const raw = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  return useMemo(() => parseVocabulary(raw), [raw]);
}
function read() { return parseVocabulary(localStorage.getItem(KEY)); }
function write(entries: VocabularyEntry[]) {
  localStorage.setItem(KEY, JSON.stringify(entries));
  window.dispatchEvent(new Event(EVENT));
}
export function toggleLessonWord(input: LessonWordInput) {
  const error = wordInputError(input); if (error) throw new Error(error);
  const entries = read(); const id = lessonWordId(input);
  const exists = entries.some(entry => entry.id === id);
  write(exists ? entries.filter(entry => entry.id !== id) : [{ ...input, word: input.word.trim(), meaning: input.meaning.trim(), id, kind: "saved" }, ...entries]);
  return !exists;
}
export function addCustomWord(input: CustomWordInput) {
  const error = wordInputError(input); if (error) return error;
  const entries = read();
  if (entries.some(entry => entry.kind === "custom" && normalizeWord(entry.word) === normalizeWord(input.word))) return "این واژه قبلاً به واژگان من اضافه شده است.";
  write([{ id: `custom:${crypto.randomUUID()}`, kind: "custom", word: input.word.trim(), meaning: input.meaning.trim(), example: input.example?.trim() || undefined }, ...entries]);
  return null;
}
export function removeVocabularyEntry(id: string) { write(read().filter(entry => entry.id !== id)); }
