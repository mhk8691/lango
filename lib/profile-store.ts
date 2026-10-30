"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { PHONE_DRAFT_KEY, PROFILE_KEY, parseProfile, type Profile } from "./auth";

const CHANGE_EVENT = "lango:profile-change";
function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(CHANGE_EVENT, listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(CHANGE_EVENT, listener);
  };
}
const serverSnapshot = () => null;

function useStoredValue(key: string, session = false) {
  const snapshot = useCallback(() => {
    try { return (session ? window.sessionStorage : window.localStorage).getItem(key); }
    catch { return null; }
  }, [key, session]);
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}

export function useProfile() {
  const raw = useStoredValue(PROFILE_KEY);
  return useMemo(() => parseProfile(raw), [raw]);
}
export function useDraftPhone() { return useStoredValue(PHONE_DRAFT_KEY, true) ?? ""; }
export function saveDraftPhone(phone: string) {
  try { sessionStorage.setItem(PHONE_DRAFT_KEY, phone); window.dispatchEvent(new Event(CHANGE_EVENT)); }
  catch { /* Navigation still works when session storage is unavailable. */ }
}
export function saveProfile(profile: Profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  try { sessionStorage.removeItem(PHONE_DRAFT_KEY); } catch { /* Optional draft cleanup. */ }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
