# Dashboard

The `/dashboard` layout owns one persistent sidebar and a responsive mobile drawer. The catch-all section route renders the existing page components; it does not copy their UI. Course details, lessons, practice screens, exam definitions, results and profile editing are included as nested routes.

`AppLink` and `useAppRouter` resolve known internal destinations through the central dashboard path mapping. Real hrefs support new tabs, keyboard activation and browser history. Application links always resolve to canonical `/dashboard` destinations, including links from the login flow. Authentication and onboarding remain public routes. Legacy application URLs permanently redirect to their new paths, preserving query strings; duplicate standalone route pages have been removed. Add route aliases and sidebar metadata in `routes.ts` when adding sections.

Achievements and notifications were added with user approval. The library has an honest empty state because no standalone library content exists yet. Speaking uses the existing recording exam; automated AI assessment remains unavailable until backend integration.

The mobile drawer locally disables MUI's logical anchor inversion so its physical left edge and Slide transition match. The document and Persian text retain their RTL direction.

The overview includes a shared sticky navigation bar, real search over routes/courses/exams/saved vocabulary, notifications, a sample daily-plan dialog, recommended courses, recent achievements and an interactive weekly chart. The navbar is part of the dashboard layout and remains present on every nested route. Statistics and planning data are explicitly marked as samples.
