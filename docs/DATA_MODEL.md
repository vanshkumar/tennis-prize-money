# Data Model

## Current Status

The active dataset is a small sourced seed dataset for Grand Slam competition prize money and clearly labeled player-compensation context. It now includes an Australian Open 2025 tournament-total competition-prize numerator and compatible primary-question financial slices for Wimbledon 2025 and 2024 tournament-total competition prize money compared with AELTC Championships Ltd operating-company turnover and operating profit.

The current static JSON contract is schema version `2`. Version `2` adds explicit prize-money scope and numerator-category metadata so player compensation/support totals cannot be mistaken for ratio-eligible competition prize money.

## File Layout

- `src/data/static/seedDatasetMetadata.json` stores dataset-level metadata such as schema version, label, notice, data mode, and last refresh timestamp.
- `src/data/raw/source-metadata/grandSlam2025Sources.json` stores the v0.1 source inventory for Grand Slam prize-money rows.
- `src/data/normalized/grandSlam2025MensSingles.json` stores the active normalized Grand Slam records: four 2025 men's singles competition-prize rows, an Australian Open 2025 tournament-total competition-prize row with unavailable financial denominators, Wimbledon 2025 and 2024 tournament-total competition-prize rows with compatible financial denominators, and one US Open total-player-compensation context row.
- `src/data/schemas.ts` defines TypeScript types and runtime validation.
- `src/data/dashboardDataset.ts` imports the static JSON files, validates them, and exports the typed dataset used by the dashboard.
- `src/lib/metricEngine.ts` computes derived metrics from validated records.
- `src/refresh/index.ts` validates and writes these same JSON outputs during `npm run refresh:data`.

## Dataset Metadata

Dataset metadata fields:

- `schemaVersion`: currently `2`.
- `datasetId`: stable dataset identifier.
- `datasetLabel`: visible label. Mock datasets must include mock/sample wording.
- `datasetNotice`: visible data-use notice. Mock datasets must state that values are not real facts.
- `dataMode`: `mock`, `mixed`, or `real`.
- `lastRefreshedAt`: ISO datetime.

`dataMode` is enforced:

- `real` datasets cannot contain mock sources, mock record confidence, or mock value statuses.
- `mock` datasets must visibly include mock/sample wording in the dataset label or notice, and every available value must be mock-labeled.
- `mixed` is reserved for future datasets that intentionally combine sourced rows with visibly labeled mock/sample rows.

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

Mock source type and mock confidence must be paired. The active seed dataset uses real source metadata and has `dataMode: "real"`.

## Tournament Records

Each normalized record represents one tournament, year, and event. The active seed includes four 2025 men's singles event rows, an Australian Open 2025 tournament-level competition-prize-money row, Wimbledon 2025 and 2024 tournament-level competition-prize-money rows, and one US Open tournament-level player-compensation context row:

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

`displayCurrency` is a UI convenience. Calculations use each value's own `currency` and refuse to compare incompatible currencies.

For the four event-level competition-prize rows, `prizePool` is the men's singles allocation when an official per-event total is available. When only round payouts are available, `prizePool.status` is `derived` and the value is the weighted sum of the 128-player singles draw payouts.

For `australian-open-2025-tournament-total`, `prizePool` is the official AO/Tennis Australia total prize pool of A$96.5m. The official AO article says players compete for A$96.5m in prize money at Australian Open 2025, and the Tennis Australia PDF lists a 2025 total of A$96.5m with all figures in Australian dollars. The cited sources do not identify a separate per-diem or support component, so the row is normalized as `competition_prize_money`. Its revenue and profit/surplus fields remain unavailable because Tennis Australia organization-level financials are not an AO-specific tournament denominator.

For `wimbledon-2025-tournament-total`, `prizePool` is the official Wimbledon 2025 `TOTAL TENNIS EVENTS PRIZE MONEY` value of £52.0m. The broader PDF line for `TOTAL PRIZE MONEY` is £53.5m, but that includes £1.5m estimated per diems, so the broader total is not used as the clean `competition_prize_money` numerator.

For `wimbledon-2024-tournament-total`, `prizePool` is the official Wimbledon 2024 `TOTAL TENNIS EVENTS PRIZE MONEY` value of £48.55m. The broader PDF line for `TOTAL PRIZE MONEY` is £50.0m, but that includes £1.45m estimated per diems, so the broader total is not used as the clean `competition_prize_money` numerator.

The Wimbledon tournament-total rows use AELTC Championships Ltd financial statements:

- `wimbledon-2025-tournament-total` uses `revenue.kind: "tournament_revenue"` with £423.626m turnover, documented as Championships operating-company turnover.
- `wimbledon-2025-tournament-total` uses `profitOrSurplus.kind: "tournament_profit"` with £52.720m operating profit before net finance income, net available surplus division to LTA Operations, taxation, and dividends.
- `wimbledon-2024-tournament-total` uses £406.507m turnover and £54.332m operating profit on the same operating-company basis.

Those values are compatible for the primary question because the filings say AELTC Championships Ltd is the principal contracting party for The Championships and that the statements reflect the results of, and division of surplus from, The Championships. The rows still carry explicit caveats because these are operating-company denominators, not separate after-tax retained profit or LTA/AELTC organization-level values.

The US Open total-player-compensation row uses the same money field for display, but `prizeMoneyScope.numeratorCategory` marks it as `total_player_compensation`. The metric engine excludes that category from revenue and profit/surplus ratios.

## Prize-Money Scope

Every record must include `prizeMoneyScope`:

- `type`: `event_main_draw` or `tournament_total`.
- `numeratorCategory`: `competition_prize_money` or `total_player_compensation`.
- `notes`: source/normalization note for scope interpretation.

`competition_prize_money` is eligible for primary revenue/profit ratios when the denominator is also compatible. `total_player_compensation` can include support, per diems, travel, hotel, stringing, or other expense coverage and is not eligible for those ratios.

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

## Derived Metrics

The metric engine returns structured results rather than only formatted strings. Ratios and percentages are available only when inputs are compatible.

Supported calculations:

- prize-money numerator
- winner payout
- runner-up payout
- winner/runner-up payout ratio
- competition prize money / revenue
- competition prize money / profit or surplus
- year-over-year prize pool growth
- round payout percentages

Unavailable reasons:

- `missing_data`
- `zero_denominator`
- `negative_denominator`
- `incompatible_currency`
- `incompatible_numerator_kind`
- `incompatible_financial_kind`
- `no_prior_record`

Compatible denominator rules:

- `prizePool / revenue` accepts `tournament_revenue` and `event_revenue`.
- `prizePool / profit or surplus` accepts `tournament_profit` and `tournament_surplus`.
- Both financial ratios require `prizeMoneyScope.numeratorCategory: "competition_prize_money"`.
- Organizer-level revenue/profit/surplus, tour-level revenue, expenses, and unknown values are not treated as compatible denominators.
- Profit or surplus denominators that are zero or negative are unavailable.
- The current Wimbledon tournament-total rows are the only active records with compatible revenue and profit denominators. The 2025 row displays approximately 12.3% of operating-company turnover and 98.6% of operating profit. The 2024 row displays approximately 11.9% of operating-company turnover and 89.4% of operating profit.
- Year-over-year prize-pool growth is available for the 2025 Wimbledon tournament-total row against the 2024 tournament-total row and displays approximately +7.1%.

## Refresh Merge Rules

Refresh adapters normalize source data into the existing `Source` and `TournamentEconomicsRecord` shapes.

- Sources are merged by `source.id`.
- Records are merged by `record.id`.
- Incoming rows replace matching ids.
- Unrelated existing rows are preserved.
- The complete merged dataset is validated before any static JSON output is written.

The first refresh adapter accepts a JSON manifest with top-level `sources` and `records` arrays. Tournament-specific scraping, PDF parsing, and financial-report adapters are future work.

## v0.1 Validation Coverage

The test suite covers:

- active seed provenance and source metadata labels
- required prize-money scope and numerator category
- rejection of mock leakage in datasets labeled `real`
- rejection of unpaired mock source type/confidence
- rejection of available money values without source ids
- ratio unavailability for missing, zero, negative, incompatible-currency, and incompatible-financial-kind cases
- the normalized Australian Open tournament-total numerator with unavailable financial denominators
- the normalized Wimbledon prior-year tournament-total row and 2025-over-2024 year-over-year calculation
- validation-before-write behavior in the refresh pipeline
