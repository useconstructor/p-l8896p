# Umbral Arquitectura

Spanish editorial website for an explicitly fictional residential architecture studio. Next.js App Router, TypeScript, Tailwind, accessible Radix project dialogs, Zod validation and server actions.

## Run

`npm install`, `npm run build`, `npm run start`.
Configure `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` on the server. No credentials are sent to the browser. Without these variables, the workspace uses a persistent local libSQL file (`umbral.local.db`) for development and testing; it is ignored by git and is not suitable for deployment persistence. Set `NEXT_PUBLIC_SITE_URL` for production social metadata.

Projects are seeded atomically once using a persistent initialization marker. Seeds are explicitly fictional proposals; photographs are visual references, not documentation of the proposals. The database stores project metadata and enquiry records. Enquiries have server validation, a honeypot, transactional idempotency and a limit of five saved enquiries per connection per hour. No automatic inquiry deletion or retention period is configured. No enquiry read endpoint or email delivery is provided.

`npm run lint` and `npx playwright test` verify the application against a production server. Tests query persisted enquiries on the server and remove their own test records. See QA.md for results and limitations.

The architectural reference photographs were downloaded from Unsplash (image IDs in seed asset source notes below). The supplied video is rendered as 180 extracted frames in a progressive canvas enhancement, with a static fallback and reduced motion support.

Photo sources:

- Hero: https://images.unsplash.com/photo-1600585154340-be6161a56a0c
- Patio: https://images.unsplash.com/photo-1600607687920-4e2a09cf159d
- Interior: https://images.unsplash.com/photo-1600210492486-724fe5c67fb0
- Material reference: https://images.unsplash.com/photo-1600607687939-ce8a6c25118c

## Reference design update

Additional `editorial-*.jpg` images are photographic crops from the user-supplied design mockup:
https://vabacntbfcwhgkjqajcw.supabase.co/storage/v1/object/public/screenshots/projects/P-L8896P/design-mockup.png
They are explicitly displayed as visual references for fictional proposals. An additive `concept-gallery-v2` initialization marker inserts the fourth concept without changing stored projects or inquiries.
