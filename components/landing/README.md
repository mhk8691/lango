# Lango landing page

`app/page.tsx` composes the header, hero, features, learning journey, courses, reasons/testimonials, pricing and footer as separate components. Interactive state is local to the header, hero video, testimonials and footer; the other sections are server-rendered.

Primary actions connect to onboarding and the existing dashboard routes. Course-level links preselect the catalog filter. Pricing uses the same `lib/subscription-plans.ts` data as the subscription screen and preselects the chosen plan. The preview video, testimonials and prices are explicitly presented as demo content; mobile-store and social destinations explain their availability rather than linking to invented accounts.

The hero artwork is a generated project asset in `public/images/landing`. Product-device previews and supporting illustrations are code-native so their labels stay crisp at different sizes. Shared layout tokens live in `styles.ts`.
