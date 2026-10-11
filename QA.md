# Verification results

Verified against the production build on 11 October 2026.

- `npm run build` and `npm run lint` passed.
- Seven Playwright integration tests cover category filtering, URL history, keyboard modals, image navigation, shared-link reload, missing projects, API errors and retries, empty categories, form validation, submission errors and retries, exact database persistence after reload, server validation, idempotency, honeypot protection, rate limiting, and the modal consultation link.
- Responsive screenshots reviewed at 1440, 768 and 390 pixels, with no horizontal overflow. Gallery photos load successfully. Mobile menu focus, Escape handling and reduced motion access to the form are verified.
- Inquiry test records are explicitly labelled and deleted after verification.
- `npm audit --omit=dev`: zero production vulnerabilities.

## Persistence limitation

TURSO_DATABASE_URL and TURSO_AUTH_TOKEN are absent from this workspace. Persistence tests use the existing persistent local libSQL development fallback through the same client and SQL. Hosted Turso remains unverified and requires server environment configuration. No credentials are exposed to the browser.

## Design and preservation

The supplied mockup provides the architectural photographic references. The hero, four-card project gallery, studio section and service bento grid follow its ivory, charcoal and terracotta design. All project descriptions remain explicitly conceptual. Existing records and schema are preserved; an idempotent migration adds one clearly fictional project without replacing existing records. The original process, video/canvas interaction, inquiry server action and privacy page remain available.

No business address, staff, award, review, price, founding date or real contact details were introduced. Email delivery is not implemented or promised. Existing retention behavior remains documented on the privacy page.
