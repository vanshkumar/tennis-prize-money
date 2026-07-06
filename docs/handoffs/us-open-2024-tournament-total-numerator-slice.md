# US Open 2024 Tournament-Total Numerator Slice

## Task Completed

Added `us-open-2024-tournament-total` as a prior-year US Open tournament-total `competition_prize_money` numerator row after rechecking official/source semantics.

Also added `us-open-2024-total-player-compensation` as a separate `total_player_compensation` context row so the official headline compensation value is not used as a clean revenue/profit numerator.

The row does not answer the primary revenue/profit-share question yet:

- competition prize money / revenue: unavailable
- competition prize money / profit/surplus: unavailable

The dashboard answerability coverage is now `4/19` for both revenue and profit/surplus. `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.

## Source Verification

- Official US Open / USTA 2024 release: `https://www.usopen.org/en_US/news/articles/2024-08-07/2024_us_open_prize_money_will_be_largest_purse_in_tennis_history.html`
  - Direct crawler/web reads exposed no useful article text, matching prior US Open source limitations.
  - Rendered browser verification confirmed the article headline and date.
  - Verified US$75.0m total player compensation for the 2024 US Open.
  - Verified the official staged-event payout schedule for main draw singles, main draw doubles, qualifying singles, and mixed doubles.
  - Verified the article notes that no US Open Wheelchair Championships were staged in 2024 due to the Paralympic Games, and that the USTA provided player grants to would-be direct-acceptance wheelchair players.
- Derived clean competition-event payout subtotal:
  - Main draw singles, doubled for men and women: US$52.880m.
  - Qualifying singles, doubled for men and women: US$7.296m.
  - Main draw doubles, doubled for men and women: US$7.778m.
  - Mixed doubles: US$0.802m.
  - Total listed staged-event payouts: US$68.756m.
- Secondary cross-check: `https://pt.wikipedia.org/wiki/US_Open_de_2024#Premia%C3%A7%C3%A3o`
  - Cross-checks US$68.756m in listed event payouts, US$6.244m per diem, and US$75.0m total.
  - Used only as corroboration. The normalized clean row remains medium confidence because the official 2024 release does not state the support/per-diem split as explicitly as the official 2025 US$90.0m / US$5.0m support split.
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
- `docs/handoffs/us-open-2024-tournament-total-numerator-slice.md`
- `src/data/normalized/grandSlam2025MensSingles.json`
- `src/data/raw/source-metadata/grandSlam2025Sources.json`
- `src/data/static/seedDatasetMetadata.json`
- `src/test/dashboardMetrics.test.ts`
- `src/test/fixtures/seedDatasetExpectations.ts`
- `src/test/refreshPipeline.test.ts`

## Current Branch

`main`

## Commit Hash

Implementation commit: `97ddf15` (`feat: add us open 2024 numerator slice`).

## Push Status

Implementation commit `97ddf15` was pushed to `origin/main`. Handoff commit is pending.

## Commands Run And Results

- `git status --short --branch` - started clean on `main...origin/main`.
- Read required docs: `LEARNINGS.md`, `AGENTS.md`, `README.md`, `docs/TASK_LOG.md`, `docs/DATA_MODEL.md`, `docs/DATA_SOURCES.md`, `docs/DATA_CAVEATS.md`, `docs/FUTURE_WORK.md`, and `docs/handoffs/australian-open-2021-prior-year-tournament-total-numerator-slice.md`.
- Used web/source verification for the official US Open 2024 release URL; direct extraction remained non-parseable.
- Used rendered in-app browser verification for the official US Open 2024 release text.
- Used a small Node calculation to sum the official staged-event payout schedule to US$68.756m.
- Static JSON parse validation - passed.
- `npm run test -- --run src/test/dashboardMetrics.test.ts` - passed, 33 tests.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - initially failed on a stale refresh timestamp expectation, then passed after making the assertion fixture-relative; final result was 4 test files and 48 tests passed.
- `npm run build` - passed.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `git diff --check` - passed.
- `git add ...` with explicit changed paths - passed after approved git metadata access.
- `git commit -m "feat: add us open 2024 numerator slice"` - passed; created implementation commit `97ddf15`.
- `git push origin main` - first sandboxed attempt failed on DNS/network access; approved retry pushed `97ddf15` to `origin/main`.

All npm commands used the known working Node path:

```bash
PATH=/Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin:/usr/bin:/bin:/usr/sbin:/sbin /Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin/npm ...
```

## Implementation Notes

- No schema change was needed; schema version remains `2`.
- Added source metadata:
  - `us-open-2024-compensation-release`
  - `us-open-2024-secondary-split-crosscheck`
- Added record `us-open-2024-tournament-total`:
  - `prizeMoneyScope.type: "tournament_total"`
  - `prizeMoneyScope.numeratorCategory: "competition_prize_money"`
  - `prizePool.amount: 68756000`
  - `prizePool.currency: "USD"`
  - `prizePool.status: "derived"`
  - `confidence: "medium"`
  - `revenue.status: "unavailable"`
  - `profitOrSurplus.status: "unavailable"`
- Added record `us-open-2024-total-player-compensation`:
  - `prizeMoneyScope.type: "tournament_total"`
  - `prizeMoneyScope.numeratorCategory: "total_player_compensation"`
  - `prizePool.amount: 75000000`
  - `prizePool.currency: "USD"`
  - `prizePool.status: "reported"`
  - `confidence: "medium"`
- Preserved record order so the 2025 US Open clean/context rows remain before 2024, and `wimbledon-2025-tournament-total` remains the first answerable primary-question row.
- Tests now verify high/medium confidence coverage of `13/19` and `6/19`, primary answerability coverage of `4/19`, US Open 2024 total-compensation exclusion, and US Open 2025-over-2024 tournament-total prize-money growth of +23.6%.
- Updated future-work and project-plan docs to treat 2021 as the current historical floor for manual data pulling.

## Known Issues And Caveats

- US Open 2024 financial denominators are not normalized because no US Open-specific compatible revenue/profit/surplus source is in the active dataset.
- USTA organization-level financials remain out of US Open tournament denominators unless a future source bridges the scope explicitly.
- The official 2024 release does not identify the support/per-diem split as explicitly as the 2025 release. The clean US$68.756m row is therefore medium confidence and derived from listed staged-event payouts plus secondary split corroboration.
- The US$75.0m total-player-compensation row is support-inclusive context and is excluded from revenue/profit ratios.
- Non-Wimbledon revenue and profit/surplus denominators remain unavailable.
- The current manual historical data-pull floor is 2021; do not expand before 2021 in the current phase.
- The file names `grandSlam2025Sources.json` and `grandSlam2025MensSingles.json` are historical and now contain tournament-total, context, prior-year, and 2026 rows; no filename/schema migration was needed for this slice.

## Assumptions Made

- The official US Open 2024 staged-event payout schedule can be weighted across the listed draw stages to derive the clean event-payout subtotal.
- The secondary split is acceptable as corroboration for keeping per diem outside the clean numerator, but not strong enough to make the 2024 clean row high confidence.
- It is safer to leave US Open 2024 revenue/profit unavailable than to map USTA organization-level financials to the tournament without an explicit bridge.
- The current expansion pass should stop at 2021 once 2021-and-newer coverage is complete.

## Next Task Objective

- Continue primary-question data expansion only where official/source semantics remain compatible.
- Keep broader total prize money/per-diem/support lines separate from clean competition prize money.
- Keep currency, numerator category, denominator kind, source confidence, and caveats explicit.
- Preserve `wimbledon-2025-tournament-total` as the first default answerable row.
- Keep schema version `2` unless a verified source shape truly requires a contract change.
- Respect the 2021 historical floor for the current manual data-pull phase.
- Recommended candidates:
  - Recheck US Open 2023, 2022, or 2021 tournament-total prize-money source semantics and add rows only if official/source semantics distinguish competition prize money from total player compensation/support.
  - Recheck Wimbledon 2021 only if the official prize-money PDF and AELTC Championships Ltd accounts preserve the same clean numerator and operating-company denominator bridge.
  - Keep non-Wimbledon revenue/profit unavailable unless a tournament-specific compatible financial denominator is verified.

## Exact Next Thread Instructions

Use xhigh effort/thinking for this thread.

You are Codex working in the standalone `tennis-prize-money` repo. Work from latest `main`; the US Open 2024 tournament-total numerator slice has been completed in the current prior thread. The implementation commit is `97ddf15` (`feat: add us open 2024 numerator slice`).

Before starting, read in full:

- `LEARNINGS.md`
- `AGENTS.md`
- `README.md`
- `docs/TASK_LOG.md`
- `docs/DATA_MODEL.md`
- `docs/DATA_SOURCES.md`
- `docs/DATA_CAVEATS.md`
- `docs/FUTURE_WORK.md`
- `docs/handoffs/us-open-2024-tournament-total-numerator-slice.md`

Context from the completed US Open 2024 slice:

- Static dataset schema remains version `2`.
- `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.
- `us-open-2024-tournament-total` is a medium-confidence tournament-total `competition_prize_money` row using a derived US$68.756m listed staged-event payout subtotal.
- `us-open-2024-total-player-compensation` is a separate `total_player_compensation` context row using the official US$75.0m total player compensation headline.
- The official US Open 2024 release was verified in the rendered browser because direct crawler/web extraction exposed no useful text.
- The official release lists staged-event payouts but does not state the support/per-diem split as explicitly as the 2025 release; a secondary cross-check separates US$6.244m per diem from the US$75.0m total.
- US Open 2024 revenue and profit/surplus remain unavailable.
- USTA organization-level financials must not be used as US Open tournament revenue/profit unless a source bridge verifies compatibility.
- Dashboard answerability coverage is now `4/19` for revenue and profit/surplus.
- The current manual historical data-pull floor is 2021; do not expand before 2021 in the current phase.

Goal:
Continue 2021-and-newer primary-question data expansion only where official/source semantics remain compatible.

Expected work:

- Verify official/source semantics before adding any real row.
- Keep broader total prize money/per-diem/support lines separate from clean competition prize money.
- Keep currency, numerator category, denominator kind, source confidence, and caveats explicit.
- Preserve existing row order so `wimbledon-2025-tournament-total` remains the first default answerable row.
- Do not fabricate real data.
- Do not pull pre-2021 data in the current expansion phase.
- Recommended next slice: recheck US Open 2023 tournament-total prize-money source semantics and add a clean `competition_prize_money` row only if official/source semantics distinguish competition prize money from total player compensation/support. If semantics are unclear, leave the row unnormalized and choose another compatible 2021-and-newer slice.
- Keep US Open 2023 revenue and profit/surplus unavailable unless a US Open-specific compatible financial denominator is verified.
- Alternative slice: recheck Wimbledon 2021 only if the official prize-money PDF and AELTC Championships Ltd accounts preserve the same clean numerator and operating-company denominator bridge.
- Update tests and dashboard behavior only as needed; schema should stay version `2` unless a verified source shape truly requires a contract change.
- Update README, data model, sources, caveats, future work, task log, LEARNINGS, changelog if appropriate, and create a new handoff.
- Run lint, typecheck, tests, build, refresh validation, and `git diff --check`.
- Commit and push to `main` when complete.
- If creating another Codex thread, it must use xhigh effort/thinking and the seed prompt must say: "Use xhigh effort/thinking for this thread."

The next Codex thread for this project must be created with xhigh effort/thinking.
