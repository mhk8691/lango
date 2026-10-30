import type { SentenceCompletionQuestion } from "@/components/exercises/sentence-completion";

const image = {
  src: "/images/exercises/sentence-completion/street-park.png",
  alt: "پارکی با درختان سبز؛ بانک در سمت چپ و کافه در سمت راست آن قرار دارد",
};

export const questions: SentenceCompletionQuestion[] = [
  {
    id: "park-between-buildings", image,
    sentence: { before: "There is a park", after: "the bank and the café." },
    options: [{ id: "between", text: "between" }, { id: "next", text: "next" }, { id: "behind", text: "behind" }, { id: "front", text: "in front" }],
    correctOptionId: "between",
    explanation: "برای چیزی که میان دو مکان قرار دارد، از between استفاده می‌کنیم.",
  },
  {
    id: "bank-on-the-left", image,
    sentence: { before: "The bank is on the", after: "side of the picture." },
    options: [{ id: "right", text: "right" }, { id: "middle", text: "middle" }, { id: "left", text: "left" }, { id: "inside", text: "inside" }],
    correctOptionId: "left",
    explanation: "بانک در سمت چپ تصویر قرار دارد؛ left یعنی چپ.",
  },
  {
    id: "trees-in-the-park", image,
    sentence: { before: "You can see green", after: "in the park." },
    options: [{ id: "cars", text: "cars" }, { id: "trees", text: "trees" }, { id: "boats", text: "boats" }, { id: "planes", text: "planes" }],
    correctOptionId: "trees",
    explanation: "در پارک درخت‌های سبز می‌بینیم؛ trees یعنی درخت‌ها.",
  },
];
