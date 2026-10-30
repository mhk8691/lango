export const recordingMimeTypes = [
  "audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus",
] as const;

export function getRecordingExtension(mimeType: string) {
  if (mimeType.includes("mp4")) return "m4a";
  if (mimeType.includes("ogg")) return "ogg";
  if (mimeType.includes("wav")) return "wav";
  return "webm";
}

export function getMicrophoneError(error: unknown) {
  const name = error && typeof error === "object" && "name" in error ? error.name : "";
  switch (name) {
    case "NotAllowedError":
    case "PermissionDeniedError":
      return "دسترسی به میکروفون داده نشد. دسترسی میکروفون را در تنظیمات مرورگر فعال کن و دوباره تلاش کن.";
    case "NotFoundError":
    case "DevicesNotFoundError":
      return "میکروفونی پیدا نشد. اتصال میکروفون دستگاهت را بررسی کن.";
    case "NotReadableError":
    case "TrackStartError":
      return "میکروفون در دسترس نیست؛ ممکن است برنامهٔ دیگری از آن استفاده کند.";
    case "SecurityError":
      return "برای استفاده از میکروفون، صفحه را با اتصال امن HTTPS باز کن.";
    default:
      return "ضبط صدا انجام نشد. میکروفونت را بررسی کن و دوباره تلاش کن.";
  }
}

export function normalizeRecordingPeaks(peaks: readonly number[], bins = 64) {
  if (!peaks.length) return undefined;
  const count = Math.min(peaks.length, bins);
  const values = Array.from({ length: count }, (_, index) => {
    const chunk = peaks.slice(Math.floor(index * peaks.length / count), Math.floor((index + 1) * peaks.length / count));
    return Math.max(...chunk);
  });
  const max = Math.max(...values);
  return values.map((value) => max > 0 ? value / max : 0);
}
