"use client";

import { useMemo, useSyncExternalStore } from "react";

const KEY = "lango.favorite-courses";
const EVENT = "lango:course-favorites-change";
const getServerSnapshot = () => null;
function getSnapshot() {
  try { return localStorage.getItem(KEY); } catch { return null; }
}
function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(EVENT, listener);
  return () => { window.removeEventListener("storage", listener); window.removeEventListener(EVENT, listener); };
}
function parse(raw: string | null): string[] {
  try {
    const value: unknown = JSON.parse(raw ?? "[]");
    return Array.isArray(value) ? [...new Set(value.filter((id): id is string => typeof id === "string"))] : [];
  } catch { return []; }
}
export function useCourseFavorites() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return useMemo(() => parse(raw), [raw]);
}
export function toggleCourseFavorite(id: string) {
  // Read the latest snapshot so rapid changes and other tabs don't use stale state.
  const current = parse(localStorage.getItem(KEY));
  const next = current.includes(id) ? current.filter(item => item !== id) : [...current, id];
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(EVENT));
}
