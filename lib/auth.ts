export const PHONE_DRAFT_KEY = "lango.auth.phone";
export const PROFILE_KEY = "lango.profile";

export type BirthDate = { year: number; month: number; day: number };
export type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: BirthDate;
  avatar: string;
};

export function normalizeDigits(value: string) {
  return value.replace(/[۰-۹٠-٩]/g, (digit) => String(digit.charCodeAt(0) - (digit >= "۰" ? 1776 : 1632)));
}

export function normalizePhone(value: string) {
  let phone = normalizeDigits(value).replace(/\D/g, "");
  if (phone.startsWith("0098")) phone = `0${phone.slice(4)}`;
  else if (phone.startsWith("98")) phone = `0${phone.slice(2)}`;
  else if (phone.length === 10 && phone.startsWith("9")) phone = `0${phone}`;
  return phone;
}

export function isValidPhone(value: string) {
  return /^09\d{9}$/.test(normalizePhone(value));
}

const persianDate = new Intl.DateTimeFormat("en-u-ca-persian", {
  year: "numeric", month: "numeric", day: "numeric", timeZone: "Asia/Tehran",
});

export function getPersianDate(date = new Date()): BirthDate {
  const parts = persianDate.formatToParts(date);
  const part = (type: string) => Number(parts.find((item) => item.type === type)?.value);
  return { year: part("year"), month: part("month"), day: part("day") };
}

export function daysInPersianMonth(year: number, month: number) {
  if (month <= 6) return 31;
  if (month <= 11) return 30;
  // March 20 is Esfand 30 in a Persian leap year, otherwise Farvardin 1.
  const endOfYear = getPersianDate(new Date(Date.UTC(year + 622, 2, 20, 8)));
  return endOfYear.year === year && endOfYear.month === 12 && endOfYear.day === 30 ? 30 : 29;
}

export function isValidBirthDate(date: BirthDate, now = new Date()) {
  const today = getPersianDate(now);
  if (![date.year, date.month, date.day].every(Number.isInteger)) return false;
  if (date.year < 1300 || date.year > today.year || date.month < 1 || date.month > 12) return false;
  if (date.day < 1 || date.day > daysInPersianMonth(date.year, date.month)) return false;
  return date.year * 10000 + date.month * 100 + date.day <= today.year * 10000 + today.month * 100 + today.day;
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function parseProfile(raw: string | null): Profile | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") return null;
    if (![data.firstName, data.lastName, data.email, data.phone, data.avatar].every((value) => typeof value === "string")) return null;
    if (!data.birthDate || !isValidBirthDate(data.birthDate) || !isValidPhone(data.phone) || !isValidEmail(data.email)) return null;
    return data as Profile;
  } catch { return null; }
}
