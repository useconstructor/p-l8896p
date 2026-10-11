# Verification results

Verified against the production build on 11 October 2026.

- `npm run build` and `npm run lint` passed.
- Seven Playwright integration tests cover category filtering, URL history, keyboard modals, image navigation, shared-link reload, missing projects, API errors and retries, empty categories, form validation, submission errors and retries, exact database persistence after reload, server validation, idempotency, honeypot protection, rate limiting, and the modal consultation link.
- Responsive screenshots reviewed at 1440, 768 and 390 pixels, with no horizontal overflow. Gallery photos load successfully. Mobile menu focus, Escape handling and reduced motion access to the form are verified.
- Inquiry test records are explicitly labelled and deleted after verification.
- `npm audit --omit=dev`: 0 production vulnerabilities reported; detailed audit saved outside the repository.

## Persistence limitation

TURSO_DATABASE_URL and TURSO_AUTH_TOKEN are absent from this workspace. Persistence tests use the existing persistent local libSQL development fallback through the same client and SQL. Hosted Turso remains unverified and requires server environment configuration. No credentials are exposed to the browser.

## Design and preservation

The supplied mockup provides the architectural photographic references. The hero, four-card project gallery, studio section and service bento grid follow its ivory, charcoal and terracotta design. All project descriptions remain explicitly conceptual. Existing records and schema are preserved; an idempotent migration adds one clearly fictional project without replacing existing records. The original process, video/canvas interaction, inquiry server action and privacy page remain available.

No business address, staff, award, review, price, founding date or real contact details were introduced. Email delivery is not implemented or promised. Automatic inquiry deletion has been removed. The privacy page states that no automatic deletion or retention period is configured.

## Focused readability and conservation verification

The polish build and lint passed, followed by all seven existing Playwright acceptance tests against isolated local SQLite. Computed typography checks at 1440, 768 and 390 confirm descriptive text and inputs at 16px and no visible text below 12px, no horizontal overflow or clipped service tiles, and the hero caption contained inside its photo. Desktop, tablet and mobile screenshots were visually reviewed. Additional checks verified modal description typography, privacy-page overflow, reduced-motion static canvas and disabled transitions, and preservation of a 2020 inquiry through a server restart and a new submission. Only labelled test records in the isolated test database were removed. Detailed notes are saved at `/tmp/quality-notes.json`.
