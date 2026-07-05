# Changelog

## Unreleased

- Refocused the dashboard visuals around the primary question: prize money as a percentage of tournament revenue and profit/surplus.
- Moved payout-curve, finalist, year-over-year, and broad coverage visuals out of the main dashboard flow in favor of answer cards, ratio inputs, answerability coverage, and calculation caveats.
- Bumped the static data contract to schema version 2 with explicit prize-money scope and numerator-category metadata.
- Added a US Open 2025 total-player-compensation context row while keeping it excluded from revenue/profit ratios.
- Updated metric compatibility checks so revenue/profit ratios require `competition_prize_money`, not total player compensation/support.
- Added a Wimbledon 2025 tournament-total competition-prize row using £52.0m total tennis events prize money and compatible AELTC Championships Ltd operating-company turnover/profit denominators.
- Added a Wimbledon 2024 tournament-total prior-year row using £48.55m total tennis events prize money and compatible AELTC Championships Ltd operating-company turnover/profit denominators.
- Added an Australian Open 2025 tournament-total competition-prize row using official AO/Tennis Australia A$96.5m total prize money while keeping AO revenue/profit unavailable.
- Added an Australian Open 2024 tournament-total competition-prize row using official AO/Tennis Australia A$86.5m total prize money while keeping AO revenue/profit unavailable.
- Added a US Open 2025 tournament-total competition-prize row using official-derived US$85.0m prize money while preserving the US$90.0m total-player-compensation row as support-inclusive context.
- Added a Roland Garros 2025 total-player-compensation context row using AP's €56.352m support-inclusive semantics, while leaving a clean Roland Garros tournament-total competition-prize row unnormalized until an official split is verified.

## v0.1.0 - 2026-07-05

- Added the first static React + TypeScript + Vite dashboard for tennis prize-money economics.
- Added a sourced 2025 Grand Slam men's singles seed dataset with source metadata, confidence labels, caveats, and validation.
- Added KPI cards, filters, payout curve, finalist comparison, financial unavailable states, year-over-year unavailable states, and source coverage views.
- Added tested metric utilities for prize pools, finalist payouts, payout ratios, financial ratios, year-over-year growth, and round payout percentages.
- Added schema validation hardening for real-data mode, source IDs, source metadata, unavailable values, and mock/sample labeling rules.
- Added a server-side refresh pipeline, `npm run refresh:data`, a manual GitHub Actions refresh workflow, and an optional external refresh dispatch handler.
- Added parent GitHub Pages deployment workflow integration for the `/tennis-prize-money/` static artifact.
- Added documentation for architecture, data model, data sources, caveats, refresh, deployment, future work, and task handoff history.

Known v0.1 limitations:

- The seed covers only 2025 men's singles Grand Slam rows.
- Tournament-level revenue, profit, and surplus denominators are not included yet.
- Roland Garros and US Open event-level prize-money rows remain medium confidence until better official parseable sources are added.
- Browser-triggered refresh remains unconfigured unless a separate serverless dispatch backend is deployed.
