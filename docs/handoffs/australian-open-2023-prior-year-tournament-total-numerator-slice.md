# Australian Open 2023 Prior-Year Tournament-Total Numerator Slice

## Task Completed

Added `australian-open-2023-tournament-total` as a prior-year Australian Open tournament-total `competition_prize_money` numerator row after verifying official Tennis Australia source semantics.

The completed row does not answer the primary revenue/profit-share question yet:

- competition prize money / revenue: unavailable
- competition prize money / profit/surplus: unavailable

The dashboard answerability coverage is now `4/15` for both revenue and profit/surplus. `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.

## Source Verification

- Official Tennis Australia PDF: `https://www.tennis.com.au/wp-content/uploads/2025/01/AO25-Prize-Money.pdf`
  - Verified the PDF title/source shape is Australian Open prize money for 2021-2025.
  - Verified the 2023 Australian Open total prize-money line is A$76.5m.
  - Verified the PDF states all figures are in Australian dollars.
  - The PDF does not identify a separate player-support, per-diem, travel, hotel, or total-compensation component within the A$76.5m total, so the row is normalized as `competition_prize_money`.
- No AO-specific tournament revenue/profit/surplus denominator was added.
  - Tennis Australia organization-level financials remain out of AO tournament ratios unless a future source explicitly bridges the scope.

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
- `docs/handoffs/australian-open-2023-prior-year-tournament-total-numerator-slice.md`
- `src/data/normalized/grandSlam2025MensSingles.json`
- `src/data/raw/source-metadata/grandSlam2025Sources.json`
- `src/data/static/seedDatasetMetadata.json`
- `src/test/dashboardMetrics.test.ts`
- `src/test/fixtures/seedDatasetExpectations.ts`

## Current Branch

`main`

## Commit Hash

Implementation commit: `00ff6ab` (`feat: add australian open 2023 numerator slice`).

## Push Status

Pushed to `origin/main`. Implementation commit `00ff6ab` and handoff commit `6e2fa1a` were pushed successfully.

## Commands Run And Results

- `git status --short --branch` - started clean on `main...origin/main`.
- `git fetch origin main` - passed after approval for `.git/FETCH_HEAD`; local `main` matched `origin/main` at `bb397dd`.
- Read required docs: `LEARNINGS.md`, `AGENTS.md`, `README.md`, `docs/TASK_LOG.md`, `docs/DATA_MODEL.md`, `docs/DATA_SOURCES.md`, `docs/DATA_CAVEATS.md`, `docs/FUTURE_WORK.md`, and `docs/handoffs/wimbledon-2026-tournament-total-numerator-slice.md`.
- Used web/source verification for the official Tennis Australia `AO25-Prize-Money.pdf` source.
- `npm run test -- --run src/test/dashboardMetrics.test.ts` - passed, 33 tests.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 48 tests.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `npm run build` - passed.
- `git diff --check` - passed.

All npm commands used the known working Node path:

```bash
PATH=/Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin:/usr/bin:/bin:/usr/sbin:/sbin /Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin/npm ...
```

## Implementation Notes

- No schema change was needed; schema version remains `2`.
- Reused source metadata id `ao-2025-prize-money-pdf` and updated its notes to reflect that the PDF covers 2021-2025 totals and currency.
- Added record `australian-open-2023-tournament-total`:
  - `prizeMoneyScope.type: "tournament_total"`
  - `prizeMoneyScope.numeratorCategory: "competition_prize_money"`
  - `prizePool.amount: 76500000`
  - `prizePool.currency: "AUD"`
  - `prizePool.status: "official"`
  - `revenue.status: "unavailable"`
  - `profitOrSurplus.status: "unavailable"`
- Preserved record order so Australian Open 2023 follows Australian Open 2024, and `wimbledon-2025-tournament-total` remains the first answerable primary-question row.
- Tests now verify the 2023 AO row, high/medium confidence coverage of `11/15` and `4/15`, primary answerability coverage of `4/15`, AO 2025-over-2024 growth of +11.6%, and AO 2024-over-2023 growth of +13.1%.

## Known Issues And Caveats

- Australian Open 2023 financial denominators are not normalized because no AO-specific compatible revenue/profit/surplus source is in the active dataset.
- Tennis Australia organization-level annual-report values remain out of AO tournament denominators unless a future source bridges the scope explicitly.
- The AO25 PDF does not show a separate support/per-diem line; if a future source separates support or total compensation from competition prize money, keep that support outside the clean numerator row.
- Non-Wimbledon revenue and profit/surplus denominators remain unavailable.
- The file names `grandSlam2025Sources.json` and `grandSlam2025MensSingles.json` are historical and now contain tournament-total, context, prior-year, and 2026 rows; no filename/schema migration was needed for this slice.

## Assumptions Made

- The AO25 PDF's 2023 `TOTAL` line is semantically comparable to the 2025 and 2024 AO tournament-total prize-money rows because it is in the same official prize-money table and no support component is separated.
- It is safer to leave AO 2023 revenue/profit unavailable than to map Tennis Australia organization-level financials to the tournament without an explicit bridge.

## Next Task Objective

Continue primary-question data expansion without weakening source semantics.

Recommended next slice:

- Recheck the official Tennis Australia AO25 prize-money PDF source semantics and add Australian Open 2022 tournament-total `competition_prize_money` only if the source remains compatible.
- Keep Australian Open 2022 revenue and profit/surplus unavailable unless an AO-specific compatible financial denominator is verified.
- Preserve `wimbledon-2025-tournament-total` as the first default answerable row.
- Keep schema version `2` unless a verified source shape truly requires a contract change.
- Keep total player compensation/support separate from competition prize money.

## Exact Next Thread Instructions

Use xhigh effort/thinking for this thread.

You are Codex working in the standalone `tennis-prize-money` repo. Work from latest `main`; the Australian Open 2023 prior-year tournament-total numerator slice has been completed in the current prior thread.

Before starting, read in full:

- `LEARNINGS.md`
- `AGENTS.md`
- `README.md`
- `docs/TASK_LOG.md`
- `docs/DATA_MODEL.md`
- `docs/DATA_SOURCES.md`
- `docs/DATA_CAVEATS.md`
- `docs/FUTURE_WORK.md`
- `docs/handoffs/australian-open-2023-prior-year-tournament-total-numerator-slice.md`

Context from the completed Australian Open 2023 slice:

- Static dataset schema remains version `2`.
- `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.
- `australian-open-2023-tournament-total` is a tournament-total `competition_prize_money` row using A$76.5m total Australian Open prize money from the official Tennis Australia `AO25-Prize-Money.pdf`.
- The official AO25 PDF lists 2021-2025 Australian Open prize-money totals, states all figures are in Australian dollars, and does not identify a separate support/per-diem component inside the A$76.5m 2023 total.
- Australian Open 2023 revenue and profit/surplus are unavailable because no AO-specific compatible financial denominator is normalized.
- The dashboard answerability coverage is now `4/15` for revenue and profit/surplus.
- Do not use Tennis Australia organization-level financials as AO tournament denominators without an explicit source bridge.

Goal:
Continue primary-question data expansion only where official/source semantics remain compatible.

Expected work:

- Verify official/source semantics before adding any real row.
- Keep broader total prize money/per-diem/support lines separate from clean competition prize money.
- Keep currency, numerator category, denominator kind, source confidence, and caveats explicit.
- Preserve existing row order so `wimbledon-2025-tournament-total` remains the first default answerable row.
- Do not fabricate real data.
- Update tests and dashboard behavior only as needed; schema should stay version `2` unless a verified source shape truly requires a contract change.
- Update README, data model, sources, caveats, future work, task log, LEARNINGS, changelog if appropriate, and create a new handoff.
- Run lint, typecheck, tests, build, refresh validation, and `git diff --check`.
- Commit and push to `main` when complete.
- If creating another Codex thread, it must use xhigh effort/thinking and the seed prompt must say: "Use xhigh effort/thinking for this thread."

The next Codex thread for this project must be created with xhigh effort/thinking.
