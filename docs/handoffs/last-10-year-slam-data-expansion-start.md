# Last-10-Year Slam Data Expansion Start

Date: 2026-07-09

Branch: `codex/last-10-year-slam-data`

## Scope

The user requested a 2017-2026 data pull for the two primary questions:

- Grand Slam prize money as a percentage of Slam revenue.
- Grand Slam prize money as a percentage of Slam profit/surplus.

This repository remains a data/provenance archive. No dashboard, deployment, npm, or refresh infrastructure was added.

## Parallel Research

Four xhigh subagents were launched for independent Slam research:

- Australian Open returned usable 2017-2026 prize-money findings and confirmed no AO-specific revenue/profit denominator.
- Wimbledon returned usable 2017-2026 prize-money and AELTC Championships Ltd denominator findings.
- US Open returned usable confirmation that only 2021, 2022, 2024, and 2025 remain clean enough for normalized competition-prize rows; no compatible revenue/profit denominator was found.
- Roland Garros errored twice from context-window limits. No new RG conclusion was incorporated; existing RG caveats remain in force.

## Normalized Additions

Australian Open:

- Added `australian-open-2026-tournament-total`: A$111.5m official AO/Tennis Australia prize pool.
- Added `australian-open-2020-tournament-total`: A$71.0m medium-confidence secondary historical total.
- Added `australian-open-2019-tournament-total`: A$62.5m medium-confidence secondary historical total.
- Added `australian-open-2018-tournament-total`: A$55.0m medium-confidence secondary historical total.
- Added `australian-open-2017-tournament-total`: A$50.0m medium-confidence secondary historical total.
- All AO revenue/profit denominators remain unavailable because Tennis Australia organization-level financials are not AO-specific denominators.

Wimbledon:

- Added `wimbledon-2019-tournament-total`: £36.919m medium-confidence clean events subtotal, excluding £1.081m estimated per diems from the £38.0m headline total.
- Added `wimbledon-2018-tournament-total`: £32.921m official-derived clean competition-event subtotal, excluding £1.079m estimated per diems from the £34.0m headline total.
- Added `wimbledon-2017-tournament-total`: £30.523m official-derived clean competition-event subtotal, excluding £1.077m estimated per diems from the £31.6m headline total.
- Added compatible AELTC Championships Ltd turnover and operating-profit denominators for 2019, 2018, and 2017.
- Added `wimbledon-aeltc-championships-2020-accounts` as source context only; no 2020 normal ratio row was added because The Championships were canceled and 2020 operating profit includes cancellation insurance income.

## Answerable Wimbledon Ratios

| Year | Prize/revenue | Prize/operating profit |
| --- | ---: | ---: |
| 2017 | 14.12% | 81.84% |
| 2018 | 12.92% | 77.94% |
| 2019 | 12.64% | 73.64% |
| 2021 | 12.16% | 80.81% |
| 2022 | 11.22% | 82.67% |
| 2023 | 11.38% | 80.43% |
| 2024 | 11.94% | 89.36% |
| 2025 | 12.27% | 98.63% |

## Remaining Gaps

- Wimbledon 2026 has a clean prize-money numerator but no same-year accounts yet.
- Wimbledon 2020 is a canceled-event year, not a normal ratio row.
- Australian Open 2017-2026 has numerator coverage but no AO-specific revenue/profit denominator.
- US Open 2017-2020 and 2023 remain unnormalized until a source separates clean competition prize money from support/per diem/total compensation.
- US Open has no compatible revenue/profit denominator.
- Roland Garros remains conservative: 2025 and 2024 support-inclusive context rows only; clean tournament-total competition prize money and compatible revenue/profit denominators remain unresolved.

## Files Updated

- `data/static/seedDatasetMetadata.json`
- `data/raw/source-metadata/grandSlam2025Sources.json`
- `data/normalized/grandSlam2025MensSingles.json`
- `README.md`
- `docs/DATA_MODEL.md`
- `docs/DATA_SOURCES.md`
- `docs/DATA_CAVEATS.md`
- `docs/TASK_LOG.md`

## Checks

- JSON parse check for all retained data files: passed.
- Source-id integrity check: passed, 40 sources and 33 records.
- `git diff --check`: passed.
