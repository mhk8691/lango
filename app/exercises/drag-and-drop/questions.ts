import type { DragAndDropQuestion } from "@/components/exercises/drag-and-drop";

export const questions: DragAndDropQuestion[] = [
  {
    id: "go-to-school",
    tokens: [{ id: "go", text: "go" }, { id: "i", text: "I" }, { id: "to", text: "to" }, { id: "school", text: "school" }],
    correctOrder: ["i", "go", "to", "school"],
  },
  {
    id: "studies-english",
    tokens: [{ id: "english", text: "English" }, { id: "every", text: "every" }, { id: "she", text: "She" }, { id: "studies", text: "studies" }, { id: "day", text: "day" }],
    correctOrder: ["she", "studies", "english", "every", "day"],
  },
  {
    id: "i-think-i-can",
    tokens: [{ id: "i-first", text: "I" }, { id: "can", text: "can" }, { id: "think", text: "think" }, { id: "it", text: "it" }, { id: "i-second", text: "I" }, { id: "do", text: "do" }],
    correctOrder: ["i-first", "think", "i-second", "can", "do", "it"],
  },
];
