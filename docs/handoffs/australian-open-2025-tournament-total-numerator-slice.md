# Australian Open 2025 Tournament-Total Numerator Slice

## Task Completed

Normalized an Australian Open 2025 tournament-total competition-prize-money numerator row from official AO/Tennis Australia sources.

The completed row is `australian-open-2025-tournament-total`.

It does not answer the primary revenue/profit-share ratios yet because no AO-specific compatible financial denominator was verified:

- competition prize money / revenue: unavailable
- competition prize money / profit/surplus: unavailable

The dashboard answerability coverage is now `2/8` for both revenue and profit/surplus. `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.

## Source Verification

- Official AO article: `https://ausopen.com/articles/news/australian-open-prize-money-increases-more-11-cent-2025`
  - Verified article date: 29 December 2024.
  - Verified Australian Open 2025 total prize pool = A$96.5m.
  - Verified all prize-money amounts are in Australian dollars.
  - Verified the article separately mentions A$120m across Australian Summer of Tennis events; that broader multi-event value was not used as the AO tournament numerator.
- Official Tennis Australia PDF: `https://www.tennis.com.au/wp-content/uploads/2025/01/AO25-Prize-Money.pdf`
  - Verified 2025 `TOTAL` line = A$96.5m.
  - Verified the PDF states all figures are in Australian dollars.
  - Verified the PDF includes event-level singles, doubles, qualifying, and mixed doubles tables, but does not identify a separate AO per-diem/player-support component.
- Tennis Australia annual reports page: `https://www.tennis.com.au/about-us/reports-publications-national-policies/annual-reports`
  - Treated only as organization-level financial-report context.
  - No Tennis Australia organization-level revenue or surplus value was normalized as an AO tournament denominator.

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
- `docs/handoffs/australian-open-2025-tournament-total-numerator-slice.md`
- `src/data/normalized/grandSlam2025MensSingles.json`
- `src/data/raw/source-metadata/grandSlam2025Sources.json`
- `src/data/static/seedDatasetMetadata.json`
- `src/test/dashboardMetrics.test.ts`
- `src/test/fixtures/seedDatasetExpectations.ts`

## Current Branch

`main`

## Commit Hash

Implementation commit: `5273060` (`feat: add australian open 2025 numerator slice`).

## Push Status

Pushed to `origin/main`. Implementation commit `5273060` and handoff commit `ac44c92` were pushed successfully.

## Commands Run And Results

- `git status --short --branch` - started clean on `main...origin/main`.
- `git pull --ff-only` - required approved Git metadata access, then reported already up to date.
- Read required docs: `LEARNINGS.md`, `AGENTS.md`, `README.md`, `docs/TASK_LOG.md`, `docs/DATA_MODEL.md`, `docs/DATA_SOURCES.md`, `docs/DATA_CAVEATS.md`, `docs/FUTURE_WORK.md`, and `docs/handoffs/wimbledon-2024-prior-year-denominator-slice.md`.
- Opened official AO article and Tennis Australia prize-money PDF; verified the A$96.5m AO 2025 tournament-total prize-money numerator and source semantics.
- Opened Tennis Australia annual reports page; kept it as organization-level context only.
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
- Reused source metadata ids `ao-2025-prize-money-release` and `ao-2025-prize-money-pdf`, with notes tightened to include the A$96.5m total.
- Added record `australian-open-2025-tournament-total`:
  - `prizeMoneyScope.type: "tournament_total"`
  - `prizeMoneyScope.numeratorCategory: "competition_prize_money"`
  - `prizePool.amount: 96500000`
  - `revenue.kind: "unknown"`, `status: "unavailable"`
  - `profitOrSurplus.kind: "unknown"`, `status: "unavailable"`
- Kept `wimbledon-2025-tournament-total` as the first answerable row so the all-records dashboard view still opens on the latest answerable Wimbledon comparison.
- Tests now verify the AO tournament-total row, unavailable financial denominators, source counts, high/medium confidence coverage of `5/8` and `3/8`, and primary answerability coverage of `2/8`.

## Known Issues And Caveats

- The AO/Tennis Australia sources describe A$96.5m as prize money or prize pool and do not split out per diems or player support. If a future source separates support/compensation from competition prize money, do not leave those support values inside this row.
- The AO article's A$120m Australian Summer of Tennis value covers a broader multi-event series and is not an Australian Open tournament numerator.
- Tennis Australia annual reports are organization-level financial reports. Do not use Tennis Australia organization-level revenue or surplus as AO tournament revenue/profit unless a source bridge verifies compatibility.
- Australian Open 2025 has no compatible tournament-level revenue/profit denominator in the active dataset.
- The file names `grandSlam2025Sources.json` and `grandSlam2025MensSingles.json` are historical and now contain tournament-total and prior-year rows; no filename/schema migration was needed for this slice.

## Assumptions Made

- Because both official AO/Tennis Australia sources describe the A$96.5m value as Australian Open prize money/prize pool and neither identifies separate support or per diem components, the A$96.5m row can be treated as `competition_prize_money` for now.
- The A$120m Australian Summer of Tennis value is broader than the Australian Open tournament and should remain out of the normalized AO row.
- Organization-level Tennis Australia financials remain incompatible with AO tournament ratios until a source explicitly bridges the scope.

## Next Task Objective

Continue primary-question numerator expansion without weakening denominator semantics.

Recommended next slice:

- Add Australian Open 2024 prior-year tournament-total competition-prize-money numerator from official AO/Tennis Australia sources.
- Use official A$86.5m only after re-verifying source semantics.
- Keep Australian Open revenue/profit unavailable unless an AO-specific compatible financial denominator is verified.
- Preserve schema version `2` unless a verified source shape truly requires a contract change.
- Keep broader Australian Summer of Tennis values and Tennis Australia organization-level financials out of AO tournament ratios.

## Exact Next Thread Instructions

Use xhigh effort/thinking for this thread.

You are Codex working in the standalone `tennis-prize-money` repo. Work from latest `main`; the Australian Open 2025 tournament-total numerator slice has been completed in the current prior thread.

Before starting, read in full:

- `LEARNINGS.md`
- `AGENTS.md`
- `README.md`
- `docs/TASK_LOG.md`
- `docs/DATA_MODEL.md`
- `docs/DATA_SOURCES.md`
- `docs/DATA_CAVEATS.md`
- `docs/FUTURE_WORK.md`
- `docs/handoffs/australian-open-2025-tournament-total-numerator-slice.md`

Context from the completed Australian Open 2025 slice:

- Static dataset schema remains version `2`.
- `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.
- `australian-open-2025-tournament-total` is a tournament-total competition-prize row using official AO/Tennis Australia A$96.5m total prize money.
- The AO article separately mentions A$120m across Australian Summer of Tennis events; that broader multi-event value is not used as the AO tournament numerator.
- The cited AO/Tennis Australia sources do not identify a separate per-diem or player-support component for the A$96.5m AO total. If a future source separates support/compensation from competition prize money, keep support outside the competition-prize row.
- Australian Open 2025 revenue and profit/surplus remain unavailable.
- Tennis Australia organization-level revenue/surplus must not be used as AO tournament revenue/profit unless a source bridge verifies compatibility.
- The dashboard answerability coverage is now `2/8` for revenue and profit/surplus.

Goal:
Normalize the Australian Open 2024 prior-year tournament-total competition-prize-money numerator from official AO/Tennis Australia sources, while keeping revenue/profit unavailable unless an AO-specific compatible denominator is verified.

Expected work:

- Verify official AO/Tennis Australia 2024 tournament-total prize-money values and source semantics.
- Keep clean competition prize money separate from any broader support/compensation concept if one appears.
- Add normalized 2024 Australian Open tournament-total competition-prize-money row only when numerator semantics are clear.
- Preserve the 2025 AO row and default Wimbledon answerable-row behavior.
- Keep currency, numerator category, denominator kind, source confidence, and caveats explicit.
- Do not use Tennis Australia organization-level revenue/surplus as tournament revenue/profit unless a source bridge verifies compatibility.
- Do not fabricate real data.
- Update tests and dashboard behavior only as needed; schema should stay version `2` unless a verified source shape truly requires a contract change.
- Update README, data model, sources, caveats, future work, task log, LEARNINGS, changelog if appropriate, and create a new handoff.
- Run lint, typecheck, tests, build, refresh validation, and `git diff --check`.
- Commit and push to `main` when complete.
- If creating another Codex thread, it must use xhigh effort/thinking and the seed prompt must say: "Use xhigh effort/thinking for this thread."

The next Codex thread for this project must be created with xhigh effort/thinking.
