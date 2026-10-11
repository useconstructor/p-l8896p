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

## Focused mobile services correction

Production build and lint passed. All seven existing Playwright tests passed against an isolated local libSQL database at /tmp/umbral-mobile-qa.db; hosted Turso could not be verified because credentials are absent. Existing application database code and records were left unchanged.

Full-page screenshots at 1440, 768 and 390px and focused service screenshots were visually reviewed. Measurements at 390 and 639px confirmed one column, automatic placement for every visible child, full-width cards, 4:3 photos and consistent 16px spacing without empty cells or clipping. At 640px the existing two-column layout remains, and at 768 and 1440px the original three- and five-column service compositions remain. Category filters use two equal columns below 640px and retain keyboard and pressed-state behavior. Form labels, helper text, footer and metadata are at least 14px; body text remains 16px. Muted text contrast was increased. No horizontal overflow was found at any checked width.

Screenshots: test-results/home-{1440,768,390}.png, test-results/services-{1440,768,390}.png and test-results/filters-390.png. Detailed computed layout evidence: /tmp/mobile-layout-verification.json.
