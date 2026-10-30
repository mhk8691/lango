export type VocabularyEntry = {
  id: string;
  kind: "saved" | "custom";
  word: string;
  meaning: string;
  example?: string;
  lesson?: { id: string; title: string };
};
export type CustomWordInput = { word: string; meaning: string; example?: string };
export type LessonWordInput = CustomWordInput & { lesson: { id: string; title: string } };
export function normalizeWord(value: string) { return value.normalize("NFKC").trim().replace(/\s+/g, " ").toLocaleLowerCase("en"); }
export function wordInputError(input: CustomWordInput) {
  if (!input.word.trim() || !input.meaning.trim()) return "واژه و معنی آن را وارد کن.";
  if (input.word.trim().length > 80) return "واژه یا عبارت باید حداکثر ۸۰ نویسه باشد.";
  if (input.meaning.trim().length > 160) return "معنی باید حداکثر ۱۶۰ نویسه باشد.";
  if ((input.example?.trim().length ?? 0) > 300) return "مثال باید حداکثر ۳۰۰ نویسه باشد.";
  return null;
}
export function lessonWordId(input: LessonWordInput) { return `saved:${input.lesson.id}:${normalizeWord(input.word)}`; }
export function parseVocabulary(raw: string | null): VocabularyEntry[] {
  try {
    const data: unknown = JSON.parse(raw ?? "[]");
    if (!Array.isArray(data)) return [];
    const seen = new Set<string>();
    return data.filter((entry): entry is VocabularyEntry => {
      if (!entry || typeof entry !== "object" || typeof entry.id !== "string" || !entry.id || seen.has(entry.id)) return false;
      if (entry.kind !== "saved" && entry.kind !== "custom") return false;
      if (typeof entry.word !== "string" || typeof entry.meaning !== "string" || (entry.example !== undefined && typeof entry.example !== "string")) return false;
      if (wordInputError(entry)) return false;
      if (entry.lesson !== undefined && (!entry.lesson || typeof entry.lesson !== "object" || typeof entry.lesson.id !== "string" || typeof entry.lesson.title !== "string")) return false;
      if (entry.kind === "saved" && !entry.lesson) return false;
      seen.add(entry.id);
      return true;
    });
  } catch { return []; }
}
