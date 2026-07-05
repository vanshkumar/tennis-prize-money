# Tennis Prize Money Economics

Static-first React + TypeScript + Vite dashboard for exploring tennis prize money alongside tournament revenue, profit, or surplus where reliable data exists.

Version `0.1.0` is a review-ready first release. The current unreleased data model renders a small sourced 2025 Grand Slam seed dataset with filters, a primary answer board for competition prize money as a percentage of revenue/profit, answerability coverage, source links, refresh status, and caveats. Revenue and profit/surplus percentages are intentionally unavailable until compatible tournament-level financial sources are added.

## Quickstart

From `tennis-prize-money/`:

```bash
npm install
npm run dev
```

The local dev server serves the dashboard with Vite. Deployed builds are configured for the GitHub Pages project subpath `/tennis-prize-money/`.

For a release-readiness check:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

If this shell does not have `node` or `npm` on `PATH`, the known working local Node path is:

```bash
PATH=/Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin:/usr/bin:/bin:/usr/sbin:/sbin /Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin/npm run test
```

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run build:refresh
npm run refresh:data
```

`npm run refresh:data` compiles the server-side refresh module, validates the current static JSON, optionally fetches a configured JSON manifest, merges validated source/record rows, and writes the static JSON outputs. See `docs/REFRESH_PIPELINE.md`.

## Project Shape

- `src/data/static/` contains dataset-level static JSON metadata.
- `src/data/raw/source-metadata/` contains source metadata JSON.
- `src/data/normalized/` contains normalized tournament economics records, including explicit prize-money scope and numerator-category metadata.
- `src/data/schemas.ts` validates the JSON contract at import time and rejects mock leakage in datasets labeled `real`.
- `src/lib/metricEngine.ts` contains calculation utilities and unavailable-reason handling. Financial ratios require a `competition_prize_money` numerator.
- `src/lib/dashboardMetrics.ts` contains dashboard formatting, filtering, primary-question view models, answerability coverage summaries, and visible caveat helpers.
- `src/lib/refreshClient.ts` contains browser-safe refresh dispatch helpers. It only reads public `VITE_` endpoint/doc URLs.
- `src/refresh/` contains the server-side refresh pipeline and source-adapter interfaces.
- `scripts/refresh-data.mjs` runs the server-side refresh CLI.
- `serverless/refresh-dispatch.mjs` is an optional external dispatch handler for separately hosted serverless runtimes.
- `src/test/` contains Vitest coverage for seed data provenance, validation hardening, filters, display helpers, unavailable states, refresh behavior, and calculation edge cases.
- `docs/` contains the architecture, data model, source inventory, caveats, refresh, deployment, future-work, task-log, and handoff documentation.

## Data Rules

- Do not fabricate real data.
- Keep mock/sample data visibly labeled in code, data, and UI if mock rows are introduced.
- Treat competition prize money, total player compensation/support, revenue, profit, surplus, expenses, and unavailable values as distinct concepts.
- Do not compute ratios when values are missing, nonpositive, semantically incompatible, not clean competition prize money, or in incompatible currencies.
- Real data must include source URL, publisher, source type, accessed date, confidence, and notes.
- Browser-triggered refresh is disabled until a safe external endpoint exists. Never put GitHub tokens or refresh passphrases in `VITE_` variables.

## v0.1 Limitations

- The seed covers 2025 men's singles competition-prize rows for the four Grand Slam tournaments, plus one US Open total-player-compensation context row.
- Total player compensation/support rows are not used as prize-money numerators in the primary revenue/profit answer.
- Roland Garros and US Open prize-money rows remain medium confidence until clearer official, parseable sources replace the secondary/cross-check paths.
- No compatible tournament-level revenue, profit, or surplus denominators are included.
- No FX conversion exists; cross-currency comparisons are not computed.
- The standalone repo deploys through `.github/workflows/deploy.yml`, which builds the Vite app and publishes `dist/` to GitHub Pages.
