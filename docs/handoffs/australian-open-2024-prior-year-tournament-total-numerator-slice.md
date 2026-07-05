# Australian Open 2024 Prior-Year Tournament-Total Numerator Slice

## Task Completed

Normalized an Australian Open 2024 prior-year tournament-total competition-prize-money numerator row from the official AO/Tennis Australia article.

The completed row is `australian-open-2024-tournament-total`.

It does not answer the primary revenue/profit-share ratios yet because no AO-specific compatible financial denominator was verified:

- competition prize money / revenue: unavailable
- competition prize money / profit/surplus: unavailable

The dashboard answerability coverage is now `2/9` for both revenue and profit/surplus. `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.

## Source Verification

- Official AO article: `https://ausopen.com/articles/news/australian-open-prize-money-hits-record-high-10-million-increase-2024`
  - Verified article date: 29 December 2023.
  - Verified Australian Open 2024 total prize pool = A$86.5m.
  - Verified the article says all prize-money amounts are in Australian dollars unless specified.
  - Verified the article lists singles, qualifying singles, doubles, and mixed doubles payouts and describes the A$86.5m value as prize money/prize pool.
  - The article discusses player facilities/services separately but does not identify a separate per-diem or player-support component within the A$86.5m prize pool.
- Tennis Australia annual reports page: `https://www.tennis.com.au/about-us/reports-publications-national-policies/annual-reports`
  - Treated only as organization-level financial-report context.
  - No Tennis Australia organization-level revenue or surplus value was normalized as an AO tournament denominator.
- No separate official Tennis Australia AO 2024 prize-money PDF was verified in this task.

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
- `docs/handoffs/australian-open-2024-prior-year-tournament-total-numerator-slice.md`
- `src/data/normalized/grandSlam2025MensSingles.json`
- `src/data/raw/source-metadata/grandSlam2025Sources.json`
- `src/data/static/seedDatasetMetadata.json`
- `src/test/dashboardMetrics.test.ts`
- `src/test/fixtures/seedDatasetExpectations.ts`

## Current Branch

`main`

## Commit Hash

Implementation commit: `a028a9064fe72ec38e601ef1f3f740720800c05c` (`feat: add australian open 2024 numerator slice`).

## Push Status

Pending. This handoff is being created before the handoff commit and push-status update.

## Commands Run And Results

- `git status --short --branch` - started clean on `main...origin/main`.
- Read required docs: `LEARNINGS.md`, `AGENTS.md`, `README.md`, `docs/TASK_LOG.md`, `docs/DATA_MODEL.md`, `docs/DATA_SOURCES.md`, `docs/DATA_CAVEATS.md`, `docs/FUTURE_WORK.md`, and `docs/handoffs/australian-open-2025-tournament-total-numerator-slice.md`.
- Opened the official AO 2024 prize-money article; verified the A$86.5m AO 2024 tournament-total prize-money numerator, Australian-dollar currency, and source semantics.
- Opened the Tennis Australia annual reports page; kept it as organization-level context only.
- `npm run test -- --run src/test/dashboardMetrics.test.ts` - passed, 28 tests.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 43 tests.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `npm run build` - passed.
- `git diff --check` - passed.

All npm commands used the known working Node path:

```bash
PATH=/Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin:/usr/bin:/bin:/usr/sbin:/sbin /Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin/npm ...
```

## Implementation Notes

- No schema change was needed; schema version remains `2`.
- Added source metadata id `ao-2024-prize-money-release`.
- Added record `australian-open-2024-tournament-total`:
  - `prizeMoneyScope.type: "tournament_total"`
  - `prizeMoneyScope.numeratorCategory: "competition_prize_money"`
  - `prizePool.amount: 86500000`
  - `revenue.kind: "unknown"`, `status: "unavailable"`
  - `profitOrSurplus.kind: "unknown"`, `status: "unavailable"`
- Kept `wimbledon-2025-tournament-total` as the first answerable row so the all-records dashboard view still opens on the latest answerable Wimbledon comparison.
- Tests now verify the AO 2024 tournament-total row, unavailable financial denominators, high/medium confidence coverage of `6/9` and `3/9`, primary answerability coverage of `2/9`, and the AO 2025-over-2024 tournament-total year-over-year prize-money growth case.

## Known Issues And Caveats

- The official AO 2024 article describes A$86.5m as prize money or prize pool and does not split out per diems or player support. If a future source separates support/compensation from competition prize money, do not leave those support values inside this row.
- No separate AO 2024 Tennis Australia prize-money PDF was verified in this task.
- Tennis Australia annual reports are organization-level financial reports. Do not use Tennis Australia organization-level revenue or surplus as AO tournament revenue/profit unless a source bridge verifies compatibility.
- Australian Open 2024 has no compatible tournament-level revenue/profit denominator in the active dataset.
- The file names `grandSlam2025Sources.json` and `grandSlam2025MensSingles.json` are historical and now contain tournament-total and prior-year rows; no filename/schema migration was needed for this slice.

## Assumptions Made

- Because the official AO/Tennis Australia 2024 article describes the A$86.5m value as Australian Open prize money/prize pool and does not identify separate support or per diem components within that total, the A$86.5m row can be treated as `competition_prize_money` for now.
- The article's separate discussion of player facilities/services is not a monetary support component inside the A$86.5m prize pool.
- Organization-level Tennis Australia financials remain incompatible with AO tournament ratios until a source explicitly bridges the scope.

## Next Task Objective

Continue primary-question numerator expansion without weakening denominator semantics.

Recommended next slice:

- Re-check US Open tournament-total source semantics for 2025 and/or 2024.
- Add a clean US Open tournament-total `competition_prize_money` row only if official or otherwise clearly corroborated sources distinguish competition prize money from total player compensation/support.
- Preserve the existing `us-open-2025-total-player-compensation` context row as `total_player_compensation` unless a clean competition-prize row is separately verified.
- Keep US Open revenue/profit unavailable unless a US Open-specific compatible denominator is verified.
- Preserve schema version `2` unless a verified source shape truly requires a contract change.

## Exact Next Thread Instructions

Use xhigh effort/thinking for this thread.

You are Codex working in the standalone `tennis-prize-money` repo. Work from latest `main`; the Australian Open 2024 prior-year tournament-total numerator slice has been completed in the current prior thread.

Before starting, read in full:

- `LEARNINGS.md`
- `AGENTS.md`
- `README.md`
- `docs/TASK_LOG.md`
- `docs/DATA_MODEL.md`
- `docs/DATA_SOURCES.md`
- `docs/DATA_CAVEATS.md`
- `docs/FUTURE_WORK.md`
- `docs/handoffs/australian-open-2024-prior-year-tournament-total-numerator-slice.md`

Context from the completed Australian Open 2024 slice:

- Static dataset schema remains version `2`.
- `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.
- `australian-open-2025-tournament-total` is a tournament-total competition-prize row using official AO/Tennis Australia A$96.5m total prize money.
- `australian-open-2024-tournament-total` is a prior-year tournament-total competition-prize row using the official AO/Tennis Australia A$86.5m total prize pool.
- The official AO 2024 article states all prize-money amounts are in Australian dollars unless specified and does not identify a separate per-diem or player-support component within the A$86.5m prize pool.
- Australian Open 2024 and 2025 revenue and profit/surplus remain unavailable.
- Tennis Australia organization-level revenue/surplus must not be used as AO tournament revenue/profit unless a source bridge verifies compatibility.
- The dashboard answerability coverage is now `2/9` for revenue and profit/surplus.

Goal:
Re-check US Open tournament-total prize-money source semantics and add a clean competition-prize-money numerator row only when source semantics are clear, while keeping total player compensation/support and tournament revenue/profit semantics separate.

Expected work:

- Verify official US Open/USTA 2025 and/or 2024 tournament-total prize-money values and source semantics.
- Keep clean competition prize money separate from total player compensation/support.
- Preserve the existing `us-open-2025-total-player-compensation` context row as `total_player_compensation` unless a separate clean competition-prize row is verified.
- Add normalized US Open tournament-total `competition_prize_money` row only when numerator semantics are clear.
- Keep US Open revenue/profit unavailable unless a US Open-specific compatible denominator is verified.
- Keep currency, numerator category, denominator kind, source confidence, and caveats explicit.
- Do not use USTA organization-level revenue/profit/surplus as US Open tournament revenue/profit unless a source bridge verifies compatibility.
- Do not fabricate real data.
- Update tests and dashboard behavior only as needed; schema should stay version `2` unless a verified source shape truly requires a contract change.
- Update README, data model, sources, caveats, future work, task log, LEARNINGS, changelog if appropriate, and create a new handoff.
- Run lint, typecheck, tests, build, refresh validation, and `git diff --check`.
- Commit and push to `main` when complete.
- If creating another Codex thread, it must use xhigh effort/thinking and the seed prompt must say: "Use xhigh effort/thinking for this thread."

The next Codex thread for this project must be created with xhigh effort/thinking.
