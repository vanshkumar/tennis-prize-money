# Roland Garros 2024 Total-Compensation Source-Semantics Slice

## Task Completed

Added `roland-garros-2024-total-player-compensation` as a Roland Garros tournament-total `total_player_compensation` context row after rechecking official/source semantics.

No clean Roland Garros 2024 tournament-total `competition_prize_money` row was added. The official press kit's headline total includes Legends Trophy prize money and Per Diem daily accommodation allowance, and the available split bundles other events with estimated per diem.

The row does not answer the primary revenue/profit-share question:

- competition prize money / revenue: unavailable
- competition prize money / profit/surplus: unavailable

The dashboard answerability coverage is now `4/24` for both revenue and profit/surplus. `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.

## Source Verification

- Official Roland Garros 2024 press kit: `https://fft-rg-commun-news.cdn.prismic.io/fft-rg-commun-news/beb0c171-022a-4b42-8c1e-3965109997ee_DP+ROLAND+GARROS+2024+UK.pdf`
  - Downloaded and extracted locally with the PDF skill and bundled `pdfplumber`.
  - Page 33 reports total prize money of €53.478m.
  - The same page states that the total prize-money amount includes Legends Trophy by Emirates prize money and Per Diem daily accommodation allowance.
  - The press kit also describes accommodation and food support, reinforcing that the headline is not a clean competition-prize-only value.
- Secondary split cross-check: `https://pt.wikipedia.org/wiki/Torneio_de_Roland_Garros_de_2024#Premia%C3%A7%C3%A3o`
  - The source cites the official Roland Garros 2024 press kit.
  - Cross-checks €51.260m for listed events.
  - Cross-checks €2.218m for other events plus estimated per diem.
  - Used only to document why the split is not clean enough for a full tournament-total `competition_prize_money` row.
- No Roland Garros-specific tournament revenue/profit/surplus denominator was added.
  - FFT organization-level financials remain out of Roland Garros tournament ratios unless a future source explicitly bridges the scope.

## Files Changed

- `CHANGELOG.md`
- `LEARNINGS.md`
- `README.md`
- `docs/ARCHITECTURE.md`
- `docs/DATA_CAVEATS.md`
- `docs/DATA_MODEL.md`
- `docs/DATA_SOURCES.md`
- `docs/FUTURE_WORK.md`
- `docs/PROJECT_PLAN.md`
- `docs/TASK_LOG.md`
- `docs/handoffs/roland-garros-2024-total-compensation-source-semantics-slice.md`
- `src/data/normalized/grandSlam2025MensSingles.json`
- `src/data/raw/source-metadata/grandSlam2025Sources.json`
- `src/data/static/seedDatasetMetadata.json`
- `src/test/dashboardMetrics.test.ts`
- `src/test/fixtures/seedDatasetExpectations.ts`

## Current Branch

`main`

## Commit Hash

Implementation commit: Pending.

## Push Status

Pending.

## Commands Run And Results

- `git status --short --branch` - started clean on `main...origin/main`.
- Read required docs: `LEARNINGS.md`, `AGENTS.md`, `README.md`, `docs/TASK_LOG.md`, `docs/DATA_MODEL.md`, `docs/DATA_SOURCES.md`, `docs/DATA_CAVEATS.md`, `docs/FUTURE_WORK.md`, and `docs/handoffs/us-open-2022-tournament-total-numerator-slice.md`.
- Used web/source search to identify the Roland Garros 2024 official press kit and secondary split.
- Downloaded the official press kit PDF to `/private/tmp/roland-garros-2024-press-kit.pdf` for local extraction.
- Used the PDF skill and bundled `pdfplumber` to extract official press-kit text.
- Official Roland Garros 2024 press kit source verification - completed.
- Secondary split cross-check citing the official press kit - completed.
- Static JSON parse validation - passed.
- `npm run test -- --run src/test/dashboardMetrics.test.ts` - passed, 33 tests.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 48 tests.
- `npm run build` - passed.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `git diff --check` - passed.

All npm commands use the known working Node path:

```bash
PATH=/Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin:/usr/bin:/bin:/usr/sbin:/sbin /Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin/npm ...
```

## Implementation Notes

- No schema change was needed; schema version remains `2`.
- Added source metadata:
  - `roland-garros-2024-press-kit-prize-money`
  - `roland-garros-2024-secondary-split-crosscheck`
- Added record `roland-garros-2024-total-player-compensation`:
  - `prizeMoneyScope.type: "tournament_total"`
  - `prizeMoneyScope.numeratorCategory: "total_player_compensation"`
  - `prizePool.amount: 53478000`
  - `prizePool.currency: "EUR"`
  - `prizePool.status: "reported"`
  - `confidence: "medium"`
  - `revenue.status: "unavailable"`
  - `profitOrSurplus.status: "unavailable"`
- Preserved record order so the Roland Garros 2025 context row remains before 2024, and `wimbledon-2025-tournament-total` remains the first answerable primary-question row.
- Tests now verify high/medium confidence coverage of `13/24` and `11/24`, primary answerability coverage of `4/24`, Roland Garros 2024 total-compensation exclusion, and the absence of clean Roland Garros tournament-total competition-prize rows.

## Known Issues And Caveats

- Roland Garros 2024 financial denominators are not normalized because no Roland Garros-specific compatible revenue/profit/surplus source is in the active dataset.
- FFT organization-level financials remain out of Roland Garros tournament denominators unless a future source bridges the scope explicitly.
- The €53.478m official press-kit total is support-inclusive context, not a clean competition-prize numerator.
- The secondary split bundles other events with estimated per diem, so it is not clean enough to derive a full tournament-total competition-prize row.
- Roland Garros 2023/2022/2021 remain unnormalized unless future source verification distinguishes clean competition prize money from per diems, support, legends/exhibition payments, or other compensation.
- Non-Wimbledon revenue and profit/surplus denominators remain unavailable.
- The current manual historical data-pull floor is 2021 for every Slam; do not expand before 2021 in the current phase.
- The file names `grandSlam2025Sources.json` and `grandSlam2025MensSingles.json` are historical and now contain tournament-total, context, prior-year, and 2026 rows; no filename/schema migration was needed for this slice.

## Assumptions Made

- The official press kit is a high-confidence source for the €53.478m headline amount and its support-inclusive semantics.
- It is safer to keep the 2024 Roland Garros headline as total-player-compensation context than to infer a clean competition-prize total from an incomplete split.
- It is safer to leave Roland Garros revenue/profit unavailable than to map FFT organization-level financials or secondary revenue leads to the tournament without an explicit bridge.
- The current expansion pass should stop at 2021 for every Slam once 2021-and-newer coverage is complete.

## Next Task Objective

- Continue primary-question data expansion only where official/source semantics remain compatible.
- Keep broader total prize money/per-diem/support lines separate from clean competition prize money.
- Keep currency, numerator category, denominator kind, source confidence, and caveats explicit.
- Preserve `wimbledon-2025-tournament-total` as the first default answerable row.
- Keep schema version `2` unless a verified source shape truly requires a contract change.
- Respect the 2021 historical floor across every Slam in the current manual data-pull phase.
- Recommended candidates:
  - Recheck Roland Garros 2023/2022/2021 tournament-total prize-money source semantics and add a clean `competition_prize_money` row only if official/source semantics distinguish competition prize money from per diems, support, legends/exhibition payments, or other compensation.
  - Recheck Wimbledon 2021 only if an official prize-money PDF or equivalent official source is found and AELTC Championships Ltd accounts retain the clean numerator/operating-company denominator bridge.
  - Keep US Open 2023 unnormalized unless a future source supplies a complete clean staged-event subtotal or support split.
  - Keep non-Wimbledon revenue/profit unavailable unless a tournament-specific compatible financial denominator is verified.
  - Do not pull data before 2021 for any Slam in the current expansion phase.

## Exact Next Thread Instructions

Use xhigh effort/thinking for this thread.

You are Codex working in the standalone `tennis-prize-money` repo. Work from latest `main`; the Roland Garros 2024 total-compensation source-semantics slice has been completed in the current prior thread. Implementation commit is pending until the current thread pushes.

Before starting, read in full:

- `LEARNINGS.md`
- `AGENTS.md`
- `README.md`
- `docs/TASK_LOG.md`
- `docs/DATA_MODEL.md`
- `docs/DATA_SOURCES.md`
- `docs/DATA_CAVEATS.md`
- `docs/FUTURE_WORK.md`
- `docs/handoffs/roland-garros-2024-total-compensation-source-semantics-slice.md`

Context from the completed Roland Garros 2024 slice:

- Static dataset schema remains version `2`.
- `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.
- `roland-garros-2024-total-player-compensation` is a medium-confidence tournament-total `total_player_compensation` row using the official press kit's €53.478m support-inclusive total prize-money figure.
- No clean Roland Garros 2024 tournament-total `competition_prize_money` row was added.
- The official Roland Garros 2024 press kit states the total prize-money amount includes Legends Trophy prize money and Per Diem daily accommodation allowance.
- A secondary split citing the official press kit separates €51.260m listed events from €2.218m other events plus estimated per diem, but the bundled remainder is not a clean support/per-diem split.
- Roland Garros revenue and profit/surplus remain unavailable.
- FFT organization-level financials must not be used as Roland Garros tournament revenue/profit unless a source bridge verifies compatibility.
- Dashboard answerability coverage is now `4/24` for revenue and profit/surplus.
- The current manual historical data-pull floor is 2021 across every Grand Slam; do not pull data before 2021 for any Slam in this phase.

Useful source URLs from the prior slice:

- Official Roland Garros 2024 press kit PDF: https://fft-rg-commun-news.cdn.prismic.io/fft-rg-commun-news/beb0c171-022a-4b42-8c1e-3965109997ee_DP+ROLAND+GARROS+2024+UK.pdf
- Archived official Roland Garros 2024 press kit PDF: https://web.archive.org/web/20240523151209/https://fft-rg-commun-news.cdn.prismic.io/fft-rg-commun-news/beb0c171-022a-4b42-8c1e-3965109997ee_DP+ROLAND+GARROS+2024+UK.pdf
- Roland Garros 2024 secondary split cross-check: https://pt.wikipedia.org/wiki/Torneio_de_Roland_Garros_de_2024#Premia%C3%A7%C3%A3o
- Official Roland Garros 2023 article checked as a lead: https://www.rolandgarros.com/en-us/article/roland-garros-2023-prize-money-increase-draws

Goal:
Continue 2021-and-newer primary-question data expansion only where official/source semantics remain compatible.

Expected work:

- Verify official/source semantics before adding any real row.
- Keep broader total prize money/per-diem/support lines separate from clean competition prize money.
- Keep currency, numerator category, denominator kind, source confidence, and caveats explicit.
- Preserve existing row order so `wimbledon-2025-tournament-total` remains the first default answerable row.
- Do not fabricate real data.
- Do not pull pre-2021 data for any Slam in the current expansion phase.
- Recommended next slice: recheck Roland Garros 2023/2022/2021 tournament-total source semantics and add a clean `competition_prize_money` row only if official/source semantics distinguish clean competition prize money from per diems, support, legends/exhibition payments, or other compensation. If semantics are unclear, leave the row unnormalized and choose another compatible 2021-and-newer slice.
- Alternative slice: recheck Wimbledon 2021 only if an official prize-money PDF or equivalent official source can be found and denominator semantics remain compatible.
- Keep US Open 2023 unnormalized unless a future compatible source supplies the full clean subtotal/split.
- Keep non-Wimbledon revenue and profit/surplus unavailable unless a tournament-specific compatible financial denominator is verified.
- Update tests and dashboard behavior only as needed; schema should stay version `2` unless a verified source shape truly requires a contract change.
- Update README, data model, sources, caveats, future work, task log, LEARNINGS, changelog if appropriate, and create a new handoff.
- Run lint, typecheck, tests, build, refresh validation, and `git diff --check`.
- Commit and push to `main` when complete.
- If creating another Codex thread, it must use xhigh effort/thinking and the seed prompt must say: "Use xhigh effort/thinking for this thread."

The next Codex thread for this project must be created with xhigh effort/thinking.
