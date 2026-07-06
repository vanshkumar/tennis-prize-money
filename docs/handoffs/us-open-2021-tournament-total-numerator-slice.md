# US Open 2021 Tournament-Total Numerator Slice

## Task Completed

Added `us-open-2021-tournament-total` as a prior-year US Open tournament-total `competition_prize_money` numerator row after rechecking official/source semantics.

Also added `us-open-2021-total-player-compensation` as a separate `total_player_compensation` context row so the broader compensation value is not used as a clean revenue/profit numerator.

The row does not answer the primary revenue/profit-share question yet:

- competition prize money / revenue: unavailable
- competition prize money / profit/surplus: unavailable

The dashboard answerability coverage is now `4/21` for both revenue and profit/surplus. `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.

## Source Verification

- US Open 2023 was checked first as the recommended slice.
  - Official US Open / USTA 2023 release: `https://www.usopen.org/en_US/news/articles/2023-08-08/2023_us_open_prize_money_and_player_compensation_to_total_65_million.html`
  - Static web extraction exposed no useful text, matching prior US Open source limitations.
  - Rendered browser verification confirmed US$65.0m overall player compensation.
  - The official release describes expanded per diem, travel vouchers, hotel support, meal allowance, and racquet stringing.
  - The official release lists only main draw singles and main draw doubles payouts; it does not provide a complete staged-event subtotal or support split.
  - No US Open 2023 row was normalized.
- Wimbledon 2021 fallback was checked.
  - The likely official PDF URL `https://www.wimbledon.com/pdf/The_Championships_2021_Prize_Money.pdf` now resolves to the current Wimbledon not-found page.
  - No Wimbledon 2021 row was normalized in this slice.
- Official US Open / USTA 2021 release: `https://www.usopen.org/en_US/news/articles/2021-08-23/2021_us_open_offers_record_prize_money_575_million_in_total_player_compensation.html`
  - Rendered browser verification confirmed the article headline and date.
  - Verified the rounded US$57.5m prize-money and total-player-compensation headline.
  - Verified the release says 2021 US Open qualifying offered nearly US$6m and that prize money increased across singles, doubles, mixed doubles, and wheelchair competitions.
  - The official release does not state the per-diem split directly.
- Secondary cross-check: `https://pt.wikipedia.org/wiki/US_Open_de_2021#Premia%C3%A7%C3%A3o`
  - Cross-checks US$53.75944m in listed singles, doubles, mixed doubles, and qualifying payouts.
  - Cross-checks US$0.600m in other competition events.
  - Cross-checks US$3.10256m estimated per diem and US$57.462m total.
  - Used as corroboration for keeping per diem outside the clean numerator.
- Derived clean competition-event payout subtotal:
  - Listed event payouts: US$53.75944m.
  - Other competition events: US$0.600m.
  - Clean competition subtotal: US$54.35944m.
  - Total player compensation context: US$57.462m.
- No US Open-specific tournament revenue/profit/surplus denominator was added.
  - USTA organization-level financials remain out of US Open tournament ratios unless a future source explicitly bridges the scope.

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
- `docs/handoffs/us-open-2021-tournament-total-numerator-slice.md`
- `src/data/normalized/grandSlam2025MensSingles.json`
- `src/data/raw/source-metadata/grandSlam2025Sources.json`
- `src/data/static/seedDatasetMetadata.json`
- `src/test/dashboardMetrics.test.ts`
- `src/test/fixtures/seedDatasetExpectations.ts`

## Current Branch

`main`

## Commit Hash

Implementation commit: `e9e52a0` (`feat: add us open 2021 numerator slice`).

## Push Status

Implementation commit `e9e52a0` has been created locally. Push status will be finalized after this handoff commit.

## Commands Run And Results

- `git status --short --branch` - started clean on `main...origin/main`.
- Read required docs: `LEARNINGS.md`, `AGENTS.md`, `README.md`, `docs/TASK_LOG.md`, `docs/DATA_MODEL.md`, `docs/DATA_SOURCES.md`, `docs/DATA_CAVEATS.md`, `docs/FUTURE_WORK.md`, and `docs/handoffs/us-open-2024-tournament-total-numerator-slice.md`.
- Used web/source verification for the official US Open 2023 release URL; direct extraction remained non-parseable.
- Used rendered in-app browser verification for the official US Open 2023 release text.
- Used rendered in-app browser verification for the likely Wimbledon 2021 official prize-money PDF URL; current page is not found.
- Used rendered in-app browser verification for the official US Open 2021 release text.
- Static JSON parse validation - passed.
- `npm run test -- --run src/test/dashboardMetrics.test.ts` - passed, 33 tests.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 48 tests.
- `npm run build` - passed.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `git diff --check` - passed.
- `git add ...` with explicit changed paths - passed after approved git metadata access.
- `git commit -m "feat: add us open 2021 numerator slice"` - passed after approved git metadata access; created implementation commit `e9e52a0`.

All npm commands used the known working Node path:

```bash
PATH=/Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin:/usr/bin:/bin:/usr/sbin:/sbin /Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin/npm ...
```

## Implementation Notes

- No schema change was needed; schema version remains `2`.
- Added source metadata:
  - `us-open-2021-compensation-release`
  - `us-open-2021-secondary-split-crosscheck`
- Added record `us-open-2021-tournament-total`:
  - `prizeMoneyScope.type: "tournament_total"`
  - `prizeMoneyScope.numeratorCategory: "competition_prize_money"`
  - `prizePool.amount: 54359440`
  - `prizePool.currency: "USD"`
  - `prizePool.status: "derived"`
  - `confidence: "medium"`
  - `revenue.status: "unavailable"`
  - `profitOrSurplus.status: "unavailable"`
- Added record `us-open-2021-total-player-compensation`:
  - `prizeMoneyScope.type: "tournament_total"`
  - `prizeMoneyScope.numeratorCategory: "total_player_compensation"`
  - `prizePool.amount: 57462000`
  - `prizePool.currency: "USD"`
  - `prizePool.status: "reported"`
  - `confidence: "medium"`
- Preserved record order so the newer US Open clean/context rows remain before the 2021 rows, and `wimbledon-2025-tournament-total` remains the first answerable primary-question row.
- Tests now verify high/medium confidence coverage of `13/21` and `8/21`, primary answerability coverage of `4/21`, and US Open 2021 total-compensation exclusion.
- Updated future-work and project-plan docs to state that 2021 is the current historical floor across every Grand Slam; do not pull pre-2021 data for any Slam in this expansion pass.

## Known Issues And Caveats

- US Open 2021 financial denominators are not normalized because no US Open-specific compatible revenue/profit/surplus source is in the active dataset.
- USTA organization-level financials remain out of US Open tournament denominators unless a future source bridges the scope explicitly.
- The official US Open 2021 release does not identify the per-diem split directly. The clean US$54.35944m row is therefore medium confidence and depends on secondary split corroboration.
- The US$57.462m total-player-compensation row is support-inclusive context and is excluded from revenue/profit ratios.
- US Open 2023 remains unnormalized because the official release describes support/expense assistance but does not publish a complete clean staged-event subtotal or support split.
- Non-Wimbledon revenue and profit/surplus denominators remain unavailable.
- The current manual historical data-pull floor is 2021 for every Slam; do not expand before 2021 in the current phase.
- The file names `grandSlam2025Sources.json` and `grandSlam2025MensSingles.json` are historical and now contain tournament-total, context, prior-year, and 2026 rows; no filename/schema migration was needed for this slice.

## Assumptions Made

- The secondary 2021 split is acceptable as corroboration for keeping per diem outside the clean numerator, but not strong enough to make the 2021 clean row high confidence.
- It is safer to leave US Open 2023 unnormalized than to infer a support split from an incomplete official payout table.
- It is safer to omit Wimbledon 2021 in this slice than to rely on a non-official prize-money source when the project instructions specifically call for the official PDF/accounts bridge.
- It is safer to leave US Open 2021 revenue/profit unavailable than to map USTA organization-level financials to the tournament without an explicit bridge.
- The current expansion pass should stop at 2021 for every Slam once 2021-and-newer coverage is complete.

## Next Task Objective

- Continue primary-question data expansion only where official/source semantics remain compatible.
- Keep broader total prize money/per-diem/support lines separate from clean competition prize money.
- Keep currency, numerator category, denominator kind, source confidence, and caveats explicit.
- Preserve `wimbledon-2025-tournament-total` as the first default answerable row.
- Keep schema version `2` unless a verified source shape truly requires a contract change.
- Respect the 2021 historical floor across every Slam in the current manual data-pull phase.
- Recommended candidates:
  - Recheck US Open 2022 tournament-total prize-money source semantics and add a row only if official/source semantics distinguish competition prize money from total player compensation/support.
  - Keep US Open 2023 unnormalized unless a future source supplies a complete clean staged-event subtotal or support split.
  - Keep US Open revenue/profit unavailable unless a tournament-specific compatible financial denominator is verified.
  - Do not pull data before 2021 for any Slam in the current expansion phase.

## Exact Next Thread Instructions

Use xhigh effort/thinking for this thread.

You are Codex working in the standalone `tennis-prize-money` repo. Work from latest `main`; the US Open 2021 tournament-total numerator slice has been completed in the current prior thread. The implementation commit is `e9e52a0` (`feat: add us open 2021 numerator slice`).

Before starting, read in full:

- `LEARNINGS.md`
- `AGENTS.md`
- `README.md`
- `docs/TASK_LOG.md`
- `docs/DATA_MODEL.md`
- `docs/DATA_SOURCES.md`
- `docs/DATA_CAVEATS.md`
- `docs/FUTURE_WORK.md`
- `docs/handoffs/us-open-2021-tournament-total-numerator-slice.md`

Context from the completed US Open 2021 slice:

- Static dataset schema remains version `2`.
- `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.
- `us-open-2021-tournament-total` is a medium-confidence tournament-total `competition_prize_money` row using a US$54.35944m listed/other event-payout subtotal.
- `us-open-2021-total-player-compensation` is a separate `total_player_compensation` context row using US$57.462m total player compensation.
- The official US Open 2021 release was verified in the rendered browser and anchors the rounded US$57.5m total-compensation headline plus competition-category context, but the per-diem separation comes from a secondary cross-check.
- US Open 2023 was rechecked and left unnormalized because the official release describes expanded per diem, travel vouchers, hotel support, meal allowance, and racquet stringing without publishing a full clean staged-event subtotal or support split.
- The likely official Wimbledon 2021 prize-money PDF URL currently resolves to a not-found page, so no Wimbledon 2021 row was normalized in this slice.
- US Open 2021 revenue and profit/surplus remain unavailable.
- USTA organization-level financials must not be used as US Open tournament revenue/profit unless a source bridge verifies compatibility.
- Dashboard answerability coverage is now `4/21` for revenue and profit/surplus.
- The current manual historical data-pull floor is 2021 for every Slam; do not pull pre-2021 data for any Slam in the current phase.

Goal:
Continue 2021-and-newer primary-question data expansion only where official/source semantics remain compatible.

Expected work:

- Verify official/source semantics before adding any real row.
- Keep broader total prize money/per-diem/support lines separate from clean competition prize money.
- Keep currency, numerator category, denominator kind, source confidence, and caveats explicit.
- Preserve existing row order so `wimbledon-2025-tournament-total` remains the first default answerable row.
- Do not fabricate real data.
- Do not pull pre-2021 data for any Slam in the current expansion phase.
- Recommended next slice: recheck US Open 2022 tournament-total prize-money source semantics and add a clean `competition_prize_money` row only if official/source semantics distinguish competition prize money from total player compensation/support. If semantics are unclear, leave the row unnormalized and choose another compatible 2021-and-newer slice.
- Keep US Open 2022 revenue and profit/surplus unavailable unless a US Open-specific compatible financial denominator is verified.
- Keep US Open 2023 unnormalized unless a future source supplies a full clean competition-event subtotal or support split.
- Update tests and dashboard behavior only as needed; schema should stay version `2` unless a verified source shape truly requires a contract change.
- Update README, data model, sources, caveats, future work, task log, LEARNINGS, changelog if appropriate, and create a new handoff.
- Run lint, typecheck, tests, build, refresh validation, and `git diff --check`.
- Commit and push to `main` when complete.
- If creating another Codex thread, it must use xhigh effort/thinking and the seed prompt must say: "Use xhigh effort/thinking for this thread."

The next Codex thread for this project must be created with xhigh effort/thinking.
