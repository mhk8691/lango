import type { InteractiveQuestion } from "@/components/exercises/interactive";

// Sample practice content, separate from the reusable exercise and future placement test.
export const questions: InteractiveQuestion[] = [
  {
    id: "near-my-house",
    prompt: "There is a _____ near my house.",
    image: { src: "/images/exercises/interactive/london-bank.png", alt: "ساختمان بانک در خیابانی در لندن" },
    options: [{ id: "parks", text: "parks" }, { id: "bank", text: "bank" }, { id: "banks", text: "banks" }, { id: "bankes", text: "bankes" }],
    correctOptionId: "bank",
    explanation: "بعد از a از اسم مفرد استفاده می‌کنیم.",
  },
  {
    id: "every-morning",
    prompt: "She _____ English every morning.",
    options: [{ id: "study", text: "study" }, { id: "studying", text: "studying" }, { id: "studies", text: "studies" }, { id: "studied", text: "studied" }],
    correctOptionId: "studies",
    explanation: "در زمان حال ساده، برای she به فعل s یا es اضافه می‌کنیم.",
  },
  {
    id: "right-now",
    prompt: "They _____ playing football right now.",
    options: [{ id: "is", text: "is" }, { id: "are", text: "are" }, { id: "am", text: "am" }, { id: "be", text: "be" }],
    correctOptionId: "are",
    explanation: "در زمان حال استمراری، همراه they از are استفاده می‌کنیم.",
  },
];
