# Tennis Prize Money Economics

Static-first React + TypeScript + Vite dashboard for exploring tennis prize money alongside tournament revenue, profit, or surplus where reliable data exists.

Version `0.1.0` is a review-ready first release. The current unreleased data model renders a small sourced Grand Slam seed dataset with filters, a primary answer board for competition prize money as a percentage of revenue/profit, answerability coverage, source links, refresh status, and caveats. The dataset now includes Australian Open 2025/2024/2023/2022/2021, Wimbledon 2026, and US Open 2025/2024 tournament-total competition prize money plus support-inclusive US Open and Roland Garros total-player-compensation context rows, while the first compatible primary-question rows remain Wimbledon 2025, 2024, 2023, and 2022 tournament-total competition prize money against AELTC Championships Ltd operating-company turnover and operating profit.

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
- `src/data/normalized/` contains normalized tournament economics records, including explicit prize-money scope, numerator-category metadata, Australian Open and US Open tournament-total numerator rows, Roland Garros and US Open total-player-compensation context rows, and compatible Wimbledon tournament-total financial denominator rows.
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

- The seed covers 2025 men's singles competition-prize rows for the four Grand Slam tournaments, Australian Open 2025/2024/2023/2022/2021, Wimbledon 2026/2025/2024/2023/2022, and US Open 2025/2024 tournament-total competition-prize rows, compatible Wimbledon operating-company denominators for 2025/2024/2023/2022, and US Open/Roland Garros total-player-compensation context rows.
- The Australian Open tournament-total rows use official AO/Tennis Australia total prize money as competition-prize-money numerators: A$96.5m for 2025, A$86.5m for 2024, A$76.5m for 2023, A$74.0m for 2022, and A$71.0m for 2021. AO revenue and profit/surplus remain unavailable because no AO-specific compatible financial denominator is normalized.
- The Wimbledon tournament-total rows use total tennis events prize money as the clean competition-prize-money numerator: £62.55m for 2026, £52.0m for 2025, £48.55m for 2024, £43.25m for 2023, and £38.9m for 2022. The broader Wimbledon total prize money lines include estimated per diems and are not used as clean numerators.
- Wimbledon 2026 revenue and profit/surplus remain unavailable because the AELTC Championships Ltd financial year ending 31 July 2026 had not ended, so same-year accounts were not available as of 2026-07-05.
- The US Open 2025 tournament-total competition-prize row uses US$85.0m, derived from the official US Open/USTA US$90.0m total player-compensation package after excluding the official US$5.0m travel and hotel support component. US Open revenue and profit/surplus remain unavailable because no US Open-specific compatible financial denominator is normalized.
- The US Open 2024 tournament-total competition-prize row uses US$68.756m, derived from the official US Open/USTA event payout schedule and kept separate from the official US$75.0m total-player-compensation headline. The 2024 split is medium confidence because the official release is less explicit about support/per-diem components than the 2025 release.
- The Roland Garros 2025 total-player-compensation row uses AP's €56.352m figure as support-inclusive context because AP says it includes per diems and exhibition payments. No clean Roland Garros tournament-total competition-prize-money row is normalized yet.
- Wimbledon revenue/profit ratios use AELTC Championships Ltd turnover and operating profit for the years ended 31 July 2025, 31 July 2024, 31 July 2023, and 31 July 2022. They are operating-company denominators for The Championships, not after-tax profit, dividends, LTA distributions, or broader organization-level financials.
- Total player compensation/support rows are not used as prize-money numerators in the primary revenue/profit answer; current answerability coverage is `4/19`.
- Roland Garros and US Open event-level prize-money rows remain medium confidence until clearer official, parseable sources replace the secondary/cross-check paths.
- Non-Wimbledon Grand Slam rows still have unavailable revenue, profit, or surplus denominators.
- No FX conversion exists; cross-currency comparisons are not computed.
- The standalone repo deploys through `.github/workflows/deploy.yml`, which builds the Vite app and publishes `dist/` to GitHub Pages.
