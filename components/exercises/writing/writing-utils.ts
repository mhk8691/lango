// Unicode words, including contractions such as "o'clock" or "don't".
const wordPattern = new RegExp("[\\p{L}\\p{N}]+(?:['’][\\p{L}\\p{N}]+)*", "gu");

export function countWritingWords(text: string) {
  return text.match(wordPattern)?.length ?? 0;
}
