import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeDigits, normalizePhone, isValidPhone, isValidBirthDate,
  daysInPersianMonth, getPersianDate, isValidEmail, parseProfile,
} from '../lib/auth.ts';

test('Iranian mobile numbers accept Persian/Arabic digits and international prefixes', () => {
  for (const value of ['۰۹۱۲۳۴۵۶۷۸۹', '٠٩١٢٣٤٥٦٧٨٩', '912 345 6789', '+98 912-345-6789', '00989123456789']) {
    assert.equal(normalizePhone(value), '09123456789');
    assert.equal(isValidPhone(value), true);
  }
  assert.equal(normalizeDigits('کد: ۱۲٣۴٥۶'), 'کد: 123456');
  for (const value of ['', '02112345678', '0912345', '091234567890', '+9719123456789']) assert.equal(isValidPhone(value), false);
});

test('Persian calendar validates leap years, month boundaries and future births', () => {
  const now = new Date('2026-10-30T09:00:00Z');
  assert.deepEqual(getPersianDate(now), { year: 1405, month: 8, day: 8 });
  assert.equal(daysInPersianMonth(1403, 12), 30);
  assert.equal(daysInPersianMonth(1404, 12), 29);
  assert.equal(isValidBirthDate({ year: 1403, month: 12, day: 30 }, now), true);
  assert.equal(isValidBirthDate({ year: 1404, month: 12, day: 30 }, now), false);
  assert.equal(isValidBirthDate({ year: 1380, month: 7, day: 31 }, now), false);
  assert.equal(isValidBirthDate({ year: 1405, month: 8, day: 8 }, now), true);
  assert.equal(isValidBirthDate({ year: 1405, month: 8, day: 9 }, now), false);
  assert.equal(isValidBirthDate({ year: 0, month: 0, day: 0 }, now), false);
  assert.equal(isValidBirthDate({ year: 1380, month: 1.5, day: 2 }, now), false);
});

test('Email and persisted profile data reject incomplete or corrupted input', () => {
  assert.equal(isValidEmail(' name@example.com '), true);
  for (const email of ['name', 'name@', '@example.com', 'name@example', 'name @example.com']) assert.equal(isValidEmail(email), false);
  assert.equal(parseProfile(null), null);
  assert.equal(parseProfile('{broken'), null);
  assert.equal(parseProfile('{}'), null);
  assert.equal(parseProfile('null'), null);
  const profile = { firstName: 'سارا', lastName: 'احمدی', phone: '09123456789', email: 'sara@example.com', birthDate: { year: 1380, month: 6, day: 31 }, avatar: 'data:image/webp;base64,example' };
  assert.deepEqual(parseProfile(JSON.stringify(profile)), profile);
  assert.equal(parseProfile(JSON.stringify({ ...profile, birthDate: { year: 1380, month: 7, day: 31 } })), null);
  assert.equal(parseProfile(JSON.stringify({ ...profile, phone: '123' })), null);
});
