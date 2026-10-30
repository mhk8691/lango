# Shared exam runner

`ExamRunner` renders an `ExamDefinition` using the existing six exercise components. `ExamResultView` maps the response into the shared `TestResult` component, including real skill percentages, nullable scores, extra review information and caller-owned actions. Writing and speaking are not assigned placeholder scores.
It does not import a question bank, answer key, router, or network endpoint.

- `definition`: versioned public question DTOs, without correct answers. Stable question IDs key the responses.
- `onSubmit(attempt, { signal })`: injected asynchronous service returning `ExamResult`. Rejection keeps all responses and offers retry. The same submission ID is reused on an unchanged retry; editing a response creates a new submission ID.
- `onExit`: caller-owned navigation.
- `initialLevel`: optional self-reported context; never a grading key.

For backend integration, load a definition on the route, replace `DemoExam` with an API adapter, and pass its submit function to `ExamRunner`. `examAttemptFormData(attempt)` encodes JSON metadata in `attempt` and real audio Blobs in named multipart fields referenced by `recordingField`. Pass the provided AbortSignal to fetch; let the browser set the multipart Content-Type. The backend must validate exam version, IDs, response formats and authorization, and deduplicate by submission ID. Keep grading keys and assessment rules on the server. Return scores and review status via `ExamResult`.

The catalog also connects the listening, reading, vocabulary, grammar, writing and speaking cards to the same runner with different definitions.

The placement demo has ten questions: two multiple-choice, two listening, two sentence-completion, two word-order, one writing and one speaking. Its client-side grading adapter is explicitly a demo; it is not secure assessment or validated CEFR placement. Unanswered objective questions receive zero. Written and recorded responses never receive invented scores; completed ones are marked pending review. The provisional A1–B1 suggestion is shown only when all eight objective questions have responses.

Responses and audio live in memory for the current page only. The UI warns before leaving. Microphone tracks and playback/object URLs are released on navigation or unmount; the recorded Blob remains available when revisiting a question. Partial/invalid responses are called out during review and omitted from submission. The demonstration adapter sends no data to a server and saves no permanent attempt. Independent practice screens keep their existing feedback and navigation; `examMode` suppresses those when embedded in an exam.
