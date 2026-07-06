# Data Model

## Current Status

The active dataset is a small sourced seed dataset for Grand Slam competition prize money and clearly labeled player-compensation context. It now includes Australian Open 2025/2024/2023/2022/2021, Wimbledon 2026, and US Open 2025/2024 tournament-total competition-prize numerators, US Open and Roland Garros total-player-compensation context rows, and compatible primary-question financial slices for Wimbledon 2025, 2024, 2023, and 2022 tournament-total competition prize money compared with AELTC Championships Ltd operating-company turnover and operating profit.

The current static JSON contract is schema version `2`. Version `2` adds explicit prize-money scope and numerator-category metadata so player compensation/support totals cannot be mistaken for ratio-eligible competition prize money.

## File Layout

- `src/data/static/seedDatasetMetadata.json` stores dataset-level metadata such as schema version, label, notice, data mode, and last refresh timestamp.
- `src/data/raw/source-metadata/grandSlam2025Sources.json` stores the v0.1 source inventory for Grand Slam prize-money rows.
- `src/data/normalized/grandSlam2025MensSingles.json` stores the active normalized Grand Slam records: four 2025 men's singles competition-prize rows, Australian Open 2025, 2024, 2023, 2022, and 2021 tournament-total competition-prize rows with unavailable financial denominators, US Open 2025 and 2024 tournament-total competition-prize rows with unavailable financial denominators, Wimbledon 2026 tournament-total competition-prize money with unavailable financial denominators, Wimbledon 2025, 2024, 2023, and 2022 tournament-total competition-prize rows with compatible financial denominators, plus US Open and Roland Garros total-player-compensation context rows.
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

Each normalized record represents one tournament, year, and event. The active seed includes four 2025 men's singles event rows, Australian Open 2025, 2024, 2023, 2022, and 2021 tournament-level competition-prize-money rows, US Open 2025 and 2024 tournament-level competition-prize rows, Wimbledon 2026, 2025, 2024, 2023, and 2022 tournament-level competition-prize-money rows, and US Open/Roland Garros tournament-level player-compensation context rows:

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

For `australian-open-2024-tournament-total`, `prizePool` is the official AO/Tennis Australia total prize pool of A$86.5m. The official AO article says players compete for A$86.5m in prize money at Australian Open 2024 and states all prize-money amounts are in Australian dollars unless specified. The cited source does not identify a separate per-diem or support component within the A$86.5m prize pool, so the row is normalized as `competition_prize_money`. Its revenue and profit/surplus fields remain unavailable because Tennis Australia organization-level financials are not an AO-specific tournament denominator.

For `australian-open-2023-tournament-total`, `prizePool` is the official Tennis Australia total prize-money line of A$76.5m from the 2021-2025 Australian Open prize-money PDF. The PDF states all figures are in Australian dollars and does not identify a separate per-diem or support component within the A$76.5m prize-money total, so the row is normalized as `competition_prize_money`. Its revenue and profit/surplus fields remain unavailable because Tennis Australia organization-level financials are not an AO-specific tournament denominator.

For `australian-open-2022-tournament-total`, `prizePool` is the official Tennis Australia total prize-money line of A$74.0m from the same 2021-2025 Australian Open prize-money PDF. The PDF states all figures are in Australian dollars and does not identify a separate per-diem or support component within the A$74.0m prize-money total, so the row is normalized as `competition_prize_money`. Its revenue and profit/surplus fields remain unavailable because Tennis Australia organization-level financials are not an AO-specific tournament denominator.

For `australian-open-2021-tournament-total`, `prizePool` is the official Tennis Australia total prize-money line of A$71.0m from the same 2021-2025 Australian Open prize-money PDF. The PDF states all figures are in Australian dollars and does not identify a separate per-diem or support component within the A$71.0m prize-money total, so the row is normalized as `competition_prize_money`. Its revenue and profit/surplus fields remain unavailable because Tennis Australia organization-level financials are not an AO-specific tournament denominator.

For `wimbledon-2026-tournament-total`, `prizePool` is the official Wimbledon 2026 `TOTAL TENNIS EVENTS PRIZE MONEY` value of £62.55m. The broader PDF line for `TOTAL PRIZE MONEY` is £64.2m, but that includes £1.65m estimated per diems, so the broader total is not used as the clean `competition_prize_money` numerator. Revenue and profit/surplus remain unavailable because the AELTC Championships Ltd financial year ending 31 July 2026 had not ended as of 2026-07-05, so same-year accounts were not available.

For `wimbledon-2025-tournament-total`, `prizePool` is the official Wimbledon 2025 `TOTAL TENNIS EVENTS PRIZE MONEY` value of £52.0m. The broader PDF line for `TOTAL PRIZE MONEY` is £53.5m, but that includes £1.5m estimated per diems, so the broader total is not used as the clean `competition_prize_money` numerator.

For `wimbledon-2024-tournament-total`, `prizePool` is the official Wimbledon 2024 `TOTAL TENNIS EVENTS PRIZE MONEY` value of £48.55m. The broader PDF line for `TOTAL PRIZE MONEY` is £50.0m, but that includes £1.45m estimated per diems, so the broader total is not used as the clean `competition_prize_money` numerator.

For `wimbledon-2023-tournament-total`, `prizePool` is the official Wimbledon 2023 `TOTAL TENNIS EVENTS PRIZE MONEY` value of £43.25m. The broader PDF line for `TOTAL PRIZE MONEY` is £44.7m, but that includes £1.45m estimated per diems, so the broader total is not used as the clean `competition_prize_money` numerator.

For `wimbledon-2022-tournament-total`, `prizePool` is the official Wimbledon 2022 `TOTAL TENNIS EVENTS PRIZE MONEY` value of £38.9m. The broader PDF line for `TOTAL PRIZE MONEY` is £40.35m, but that includes £1.45m estimated per diems, so the broader total is not used as the clean `competition_prize_money` numerator.

For `us-open-2025-tournament-total`, `prizePool` is US$85.0m in 2025 US Open competition prize money. The official US Open/USTA release confirms US$90.0m total player compensation and separately identifies US$5.0m in overall travel and hotel support before the prize-money breakdown. The clean row excludes that support component and is corroborated by AP's US$85.0m competition-prize-money report. Its revenue and profit/surplus fields remain unavailable because USTA organization-level financials are not a US Open tournament denominator.

For `us-open-2024-tournament-total`, `prizePool` is US$68.756m in listed 2024 US Open competition-event payouts. The official US Open/USTA release confirms US$75.0m total player compensation and lists the staged main draw singles, main draw doubles, qualifying singles, and mixed doubles payout schedule. The clean row is derived from that payout schedule and a secondary cross-check that separates US$6.244m in per diem from the headline total. Because the official 2024 release does not provide as explicit a support split as the 2025 release, the row remains medium confidence. Its revenue and profit/surplus fields remain unavailable because USTA organization-level financials are not a US Open tournament denominator.

The Wimbledon tournament-total rows use AELTC Championships Ltd financial statements:

- `wimbledon-2025-tournament-total` uses `revenue.kind: "tournament_revenue"` with £423.626m turnover, documented as Championships operating-company turnover.
- `wimbledon-2025-tournament-total` uses `profitOrSurplus.kind: "tournament_profit"` with £52.720m operating profit before net finance income, net available surplus division to LTA Operations, taxation, and dividends.
- `wimbledon-2024-tournament-total` uses £406.507m turnover and £54.332m operating profit on the same operating-company basis.
- `wimbledon-2023-tournament-total` uses £380.156m turnover and £53.776m operating profit on the same operating-company basis.
- `wimbledon-2022-tournament-total` uses £346.640m turnover and £47.057m operating profit on the same operating-company basis.

Those values are compatible for the primary question because the filings say AELTC Championships Ltd is the principal contracting party for The Championships and that the statements reflect the results of, and division of surplus from, The Championships. The rows still carry explicit caveats because these are operating-company denominators, not separate after-tax retained profit or LTA/AELTC organization-level values.

The US Open total-player-compensation rows use the same money field for display, but `prizeMoneyScope.numeratorCategory` marks them as `total_player_compensation`. The metric engine excludes that category from revenue and profit/surplus ratios. The 2025 context row remains separate from `us-open-2025-tournament-total` because the US$90.0m value includes the US$5.0m support component. The 2024 context row remains separate from `us-open-2024-tournament-total` because the US$75.0m value includes compensation beyond the listed event payout subtotal.

The Roland Garros total-player-compensation row uses AP's reported €56.352m 2025 French Open total player compensation figure as display-only context. AP says that figure includes per diems and payments to former players taking part in exhibitions, and no official split was verified that separates clean competition prize money from support or exhibition components. No Roland Garros tournament-total `competition_prize_money` row is normalized in this slice, and Roland Garros revenue/profit denominators remain unavailable.

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
- The current Wimbledon 2025/2024/2023/2022 tournament-total rows are the only active records with compatible revenue and profit denominators. The 2025 row displays approximately 12.3% of operating-company turnover and 98.6% of operating profit. The 2024 row displays approximately 11.9% of operating-company turnover and 89.4% of operating profit. The 2023 row displays approximately 11.4% of operating-company turnover and 80.4% of operating profit. The 2022 row displays approximately 11.2% of operating-company turnover and 82.7% of operating profit. Current primary-question answerability coverage is `4/19`.
- Year-over-year prize-pool growth is available for the 2026 Wimbledon tournament-total row against the 2025 tournament-total row and displays approximately +20.3%. The 2025 Wimbledon tournament-total row has a 2024 prior-year comparison and displays approximately +7.1%. The 2024 row has a 2023 prior-year comparison and displays approximately +12.3%. The 2023 row has a 2022 prior-year comparison and displays approximately +11.2%. Australian Open tournament-total rows now provide 2025-over-2024 growth of approximately +11.6%, 2024-over-2023 growth of approximately +13.1%, 2023-over-2022 growth of approximately +3.4%, and 2022-over-2021 growth of approximately +4.2%. US Open tournament-total rows now provide 2025-over-2024 growth of approximately +23.6%.

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
- the normalized Australian Open tournament-total numerators with unavailable financial denominators and 2025-over-2024, 2024-over-2023, 2023-over-2022, plus 2022-over-2021 year-over-year calculations
- the Roland Garros total-player-compensation context row and absence of a clean Roland Garros tournament-total competition-prize row
- the normalized US Open tournament-total competition-prize numerators and separate total-player-compensation context rows
- the normalized Wimbledon tournament-total rows and 2026-over-2025, 2025-over-2024, 2024-over-2023, plus 2023-over-2022 year-over-year calculations
- validation-before-write behavior in the refresh pipeline
