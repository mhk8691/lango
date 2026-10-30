import type { ListeningQuestion } from "@/components/exercises/listening";
import { waveforms } from "./waveforms";

export const questions: ListeningQuestion[] = [
  {
    id: "restaurant",
    prompt: "Where is the man going?",
    audio: { src: "/audio/listening/restaurant.mp3", waveform: waveforms.restaurant },
    options: [{ id: "bank", text: "To the bank" }, { id: "restaurant", text: "To the restaurant" }, { id: "hospital", text: "To the hospital" }, { id: "park", text: "To the park" }],
    correctOptionId: "restaurant",
  },
  {
    id: "train-time",
    prompt: "What time does the train leave?",
    audio: { src: "/audio/listening/train-time.mp3", waveform: waveforms["train-time"] },
    options: [{ id: "nine", text: "At nine o’clock" }, { id: "quarter", text: "At a quarter past nine" }, { id: "half", text: "At half past nine" }, { id: "ten", text: "At ten o’clock" }],
    correctOptionId: "half",
  },
  {
    id: "coffee-order",
    prompt: "What does the customer want to drink?",
    audio: { src: "/audio/listening/coffee-order.mp3", waveform: waveforms["coffee-order"] },
    options: [{ id: "tea", text: "A cup of tea" }, { id: "juice", text: "A glass of orange juice" }, { id: "coffee", text: "A cup of coffee" }, { id: "water", text: "A bottle of water" }],
    correctOptionId: "coffee",
  },
];
