import { countWritingWords } from "../exercises/writing/writing-utils";
import type { ExamAnswer, ExamAnswers, ExamAttempt, ExamDefinition, ExamQuestion } from "./types";

export function isCompleteAnswer(question: ExamQuestion, answer?: ExamAnswer): boolean {
  if (!answer) return false;
  switch (question.kind) {
    case "interactive": case "listening": case "sentence-completion":
      return answer.kind === "choice" && question.content.options.some(option => option.id === answer.optionId);
    case "drag-and-drop": {
      if (answer.kind !== "order") return false;
      const ids = question.content.tokens.map(token => token.id);
      return answer.tokenIds.length === ids.length && new Set(answer.tokenIds).size === ids.length && answer.tokenIds.every(id => ids.includes(id));
    }
    case "writing": {
      if (answer.kind !== "writing") return false;
      const count = countWritingWords(answer.text);
      return count >= (question.content.minWords ?? 1) && count <= (question.content.maxWords ?? 100);
    }
    case "speaking": return answer.kind === "speaking" && answer.blob.size > 0 && Number.isFinite(answer.duration) && answer.duration > 0 && answer.duration <= (question.maxDurationSeconds ?? 60) + 1;
  }
}
export function completeAnswers(definition: ExamDefinition, answers: ExamAnswers): ExamAttempt["answers"] {
  return definition.questions.flatMap(question => {
    const answer = answers[question.id];
    return answer && isCompleteAnswer(question, answer) ? [{ questionId: question.id, answer }] : [];
  });
}
export function definitionError(definition: ExamDefinition) {
  if (!definition.id || !definition.version || !definition.questions.length) return "اطلاعات آزمون کامل نیست.";
  const ids = definition.questions.map(question => question.id);
  if (ids.some(id => !id) || new Set(ids).size !== ids.length) return "شناسهٔ سؤال‌های آزمون معتبر نیست.";
  for (const q of definition.questions) {
    if (["interactive", "listening", "sentence-completion"].includes(q.kind) && "options" in q.content) {
      const options = q.content.options.map(option => option.id);
      if (options.length !== 4 || new Set(options).size !== options.length || options.some(id => !id)) return "گزینه‌های آزمون معتبر نیستند.";
    }
    if (q.kind === "drag-and-drop") {
      const tokens = q.content.tokens.map(token => token.id);
      if (!tokens.length || new Set(tokens).size !== tokens.length) return "کلمه‌های آزمون معتبر نیستند.";
    }
    if (q.kind === "writing" && (q.content.minWords ?? 1) > (q.content.maxWords ?? 100)) return "محدودیت متن آزمون معتبر نیست.";
  }
  return null;
}
/** Ready for fetch(..., {method: 'POST', body, signal}); do not set Content-Type manually. */
export function examAttemptFormData(attempt: ExamAttempt) {
  const form = new FormData();
  const answers = attempt.answers.map(({ questionId, answer }, index) => {
    if (answer.kind !== "speaking") return { questionId, answer };
    const field = `recording-${index}`;
    const extension = answer.mimeType.includes("mp4") ? "m4a" : answer.mimeType.includes("ogg") ? "ogg" : "webm";
    form.append(field, answer.blob, `${field}.${extension}`);
    return { questionId, answer: { kind: answer.kind, recordingField: field, duration: answer.duration, mimeType: answer.mimeType } };
  });
  form.append("attempt", JSON.stringify({ ...attempt, answers }));
  return form;
}
