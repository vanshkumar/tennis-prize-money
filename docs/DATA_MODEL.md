# Data Model

## Current Status

The active dataset is a sourced Grand Slam economics seed. It includes competition-prize-money rows, total-player-compensation context rows, unavailable financial rows, and compatible Wimbledon operating-company financial denominator rows.

The JSON contract is schema version `2`. Version `2` requires explicit prize-money scope and numerator-category metadata so total player compensation/support cannot be mistaken for clean competition prize money.

## File Layout

- `data/static/seedDatasetMetadata.json` stores dataset-level metadata.
- `data/raw/source-metadata/grandSlam2025Sources.json` stores source metadata.
- `data/normalized/grandSlam2025MensSingles.json` stores normalized records. The filename is historical; it now contains more than 2025 men's singles records.

## Dataset Metadata

Dataset metadata fields:

- `schemaVersion`: currently `2`.
- `datasetId`: stable dataset identifier.
- `datasetLabel`: visible label.
- `datasetNotice`: visible data-use notice.
- `dataMode`: `mock`, `mixed`, or `real`.
- `lastRefreshedAt`: ISO datetime for the last successful data refresh or validation pass.

The active dataset has `dataMode: "real"`. It should not contain mock sources, mock record confidence, or mock value statuses.

## Sources

Every available real value should be traceable to source metadata:

- `id`
- `title`
- `publisher`
- `url`
- `sourceType`: `official_report`, `annual_report`, `form_990`, `official_prize_money_page`, `press_release`, `reputable_secondary`, `manual_verified`, or `mock`
- `accessedAt`
- `confidence`: `high`, `medium`, `low`, or `mock`
- `notes`

Mock source type and mock confidence must be paired. Official sources are preferred; secondary sources require visible caveats.

## Tournament Records

Each normalized record represents one tournament, year, and event or tournament-total scope:

- `id`
- `tournament`
- `year`
- `event`
- `confidence`
- `displayCurrency`
- `sourceIds`
- `prizeMoneyScope`
- `prizePool`
- `revenue`
- `profitOrSurplus`
- `winnerPayout`
- `runnerUpPayout`
- `roundPayouts`
- `caveats`

`displayCurrency` is a convenience field. Compatibility decisions must use each value object's own `currency`.

## Prize-Money Scope

Every record must include `prizeMoneyScope`:

- `type`: `event_main_draw` or `tournament_total`.
- `numeratorCategory`: `competition_prize_money` or `total_player_compensation`.
- `notes`: source or normalization note for scope interpretation.

`competition_prize_money` is the only numerator category eligible for revenue/profit-share calculations. `total_player_compensation` can include support, per diems, travel, hotel, stringing, grants, exhibition payments, or other expense coverage and must stay separate.

## Value Objects

Money-like values share these fields:

- `amount`: number or `null`
- `currency`: ISO-style three-letter code or `null`
- `status`: `official`, `reported`, `estimated`, `derived`, `mock`, or `unavailable`
- `sourceIds`
- `notes`

Unavailable values must use `amount: null`, `currency: null`, and `status: "unavailable"`.

Financial values also include `kind`:

- `tournament_revenue`
- `event_revenue`
- `organization_revenue`
- `tour_revenue`
- `tournament_profit`
- `tournament_surplus`
- `organization_profit`
- `organization_surplus`
- `expenses`
- `unknown`

Payout values also include `allocation`:

- `per_player`
- `per_team`
- `total_allocation`

## Compatibility Rules

- Prize-money/revenue ratios accept only `competition_prize_money` over `tournament_revenue` or `event_revenue` in the same currency.
- Prize-money/profit-or-surplus ratios accept only `competition_prize_money` over `tournament_profit` or `tournament_surplus` in the same currency.
- Organization-level revenue/profit/surplus, tour-level revenue, expenses, unknown values, and total player compensation/support are not compatible denominators or numerators for the primary ratio.
- Profit or surplus denominators that are zero or negative remain unavailable.
- Currency conversion requires explicit FX source metadata before any cross-currency comparison is made.

## Active Semantic Notes

- Australian Open 2025/2024/2023/2022/2021 tournament-total rows use official AO/Tennis Australia prize-money totals and keep revenue/profit unavailable because Tennis Australia organization-level financials are not AO-specific denominators.
- Wimbledon 2026 uses the official total tennis events prize-money numerator and keeps revenue/profit unavailable until same-year AELTC Championships Ltd accounts exist.
- Wimbledon 2025/2024/2023/2022/2021 rows use clean competition-prize-money numerators and AELTC Championships Ltd turnover/operating profit denominators because the filings bridge that company to The Championships.
- US Open 2025/2024/2022/2021 clean rows remain separate from support-inclusive total-player-compensation rows.
- Roland Garros 2025/2024 totals remain total-player-compensation context only because known sources include per diems, support, legends/exhibition payments, or bundled other events.
- Roland Garros 2023/2022/2021 and US Open 2023 remain unnormalized until sources separate clean competition prize money from support or per-diem semantics.
