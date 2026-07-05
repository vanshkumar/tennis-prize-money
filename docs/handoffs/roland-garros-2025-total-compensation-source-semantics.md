# Roland Garros 2025 Total-Compensation Source-Semantics Slice

## Task Completed

Rechecked Roland Garros 2025 tournament-total prize-money source semantics and kept the dataset conservative.

No clean Roland Garros tournament-total `competition_prize_money` row was added because the verified parseable source describes the headline total as support-inclusive compensation.

The completed context row is `roland-garros-2025-total-player-compensation`.

It does not answer the primary revenue/profit-share ratios:

- competition prize money / revenue: unavailable
- competition prize money / profit/surplus: unavailable

The dashboard answerability coverage is now `2/11` for both revenue and profit/surplus. `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.

## Source Verification

- AP 2025 French Open guide: `https://apnews.com/article/dddc3a4e78b49ce0dc374f29cb042006`
  - Reports €56.352m in total player compensation at the 2025 French Open.
  - Says that total includes per diems and payments to former players taking part in exhibitions.
  - Used as support-inclusive `total_player_compensation` context, not as a clean competition-prize-money numerator.
- Roland Garros / French Open 2025 secondary prize-money tables:
  - Continue to support the existing event-level men's singles round payouts at medium confidence.
  - Do not provide a verified official split that removes per diems, support, or exhibition payments from the headline tournament total.
- No Roland Garros-specific tournament revenue or profit/surplus denominator was verified.
- FFT organization-level revenue, profit, or surplus remains out of Roland Garros tournament revenue/profit ratios.

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
- `docs/handoffs/roland-garros-2025-total-compensation-source-semantics.md`
- `src/data/normalized/grandSlam2025MensSingles.json`
- `src/data/raw/source-metadata/grandSlam2025Sources.json`
- `src/data/static/seedDatasetMetadata.json`
- `src/test/dashboardMetrics.test.ts`
- `src/test/fixtures/seedDatasetExpectations.ts`

## Current Branch

`main`

## Commit Hash

Implementation commit: `e092178` (`feat: add roland garros compensation context`).

## Push Status

Pending push.

## Commands Run And Results

- `git status --short --branch` - started clean on `main...origin/main`.
- `git fetch origin main` - passed after escalation for `.git/FETCH_HEAD`; local `main` was even with `origin/main`.
- Read required docs: `LEARNINGS.md`, `AGENTS.md`, `README.md`, `docs/TASK_LOG.md`, `docs/DATA_MODEL.md`, `docs/DATA_SOURCES.md`, `docs/DATA_CAVEATS.md`, `docs/FUTURE_WORK.md`, and `docs/handoffs/us-open-2025-tournament-total-numerator-slice.md`.
- Rechecked AP and Roland Garros/French Open 2025 source leads; no official clean tournament-total competition-prize split was verified.
- `npm run test -- --run src/test/dashboardMetrics.test.ts` - passed, 30 tests.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 45 tests.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `npm run build` - passed.
- `git diff --check` - passed.

All npm commands used the known working Node path:

```bash
PATH=/Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin:/usr/bin:/bin:/usr/sbin:/sbin /Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin/npm ...
```

## Implementation Notes

- No schema change was needed; schema version remains `2`.
- Added source metadata id `roland-garros-2025-ap-compensation-semantics`.
- Added record `roland-garros-2025-total-player-compensation`:
  - `prizeMoneyScope.type: "tournament_total"`
  - `prizeMoneyScope.numeratorCategory: "total_player_compensation"`
  - `prizePool.amount: 56352000`
  - `prizePool.currency: "EUR"`
  - `prizePool.status: "reported"`
  - `revenue.kind: "unknown"`, `status: "unavailable"`
  - `profitOrSurplus.kind: "unknown"`, `status: "unavailable"`
- Preserved record `roland-garros-2025-ms` as the event-level men's singles `competition_prize_money` row.
- Did not add `roland-garros-2025-tournament-total` because clean tournament-total competition-prize semantics were not verified.
- Tests now verify the Roland Garros total-compensation context row, the absence of a clean Roland Garros tournament-total competition-prize row, unavailable financial denominators, high/medium confidence coverage of `7/11` and `4/11`, primary answerability coverage of `2/11`, and total-player-compensation exclusion.

## Known Issues And Caveats

- AP is a reputable secondary source, not an official FFT/Roland Garros source. The row is medium confidence.
- The €56.352m Roland Garros headline total includes per diems and exhibition payments, so it is not clean competition prize money.
- A clean Roland Garros tournament-total competition-prize row should be added only if a future official source separates competition prize money from support, per diems, legends/exhibition payments, or other compensation.
- Roland Garros revenue and profit/surplus remain unavailable. Secondary revenue leads and FFT organization-level finances are not compatible tournament denominators without a source bridge.
- The file names `grandSlam2025Sources.json` and `grandSlam2025MensSingles.json` are historical and now contain tournament-total, context, and prior-year rows; no filename/schema migration was needed for this slice.

## Assumptions Made

- AP's explicit support-inclusive description is enough to normalize €56.352m as `total_player_compensation` context.
- It is safer to omit a clean tournament-total competition-prize row than to subtract or infer unsupported support/exhibition amounts.
- Roland Garros revenue/profit remains unavailable until a Roland Garros-specific denominator, not FFT organization-level finance, is verified.

## Next Task Objective

Continue primary-question expansion without weakening source semantics.

Recommended next slice:

- Extend the Wimbledon tournament-total denominator series to an older year only if official prize-money PDFs and AELTC Championships Ltd accounts keep the same clean numerator and operating-company denominator semantics.
- Preserve `wimbledon-2025-tournament-total` as the first default answerable row.
- Keep schema version `2` unless a verified source shape truly requires a contract change.
- Keep all non-Wimbledon revenue/profit denominators unavailable unless a source bridges tournament scope explicitly.

## Exact Next Thread Instructions

Use xhigh effort/thinking for this thread.

You are Codex working in the standalone `tennis-prize-money` repo. Work from latest `main`; the Roland Garros 2025 total-compensation source-semantics slice has been completed in the current prior thread.

Before starting, read in full:

- `LEARNINGS.md`
- `AGENTS.md`
- `README.md`
- `docs/TASK_LOG.md`
- `docs/DATA_MODEL.md`
- `docs/DATA_SOURCES.md`
- `docs/DATA_CAVEATS.md`
- `docs/FUTURE_WORK.md`
- `docs/handoffs/roland-garros-2025-total-compensation-source-semantics.md`

Context from the completed Roland Garros 2025 slice:

- Static dataset schema remains version `2`.
- `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.
- `roland-garros-2025-total-player-compensation` is a tournament-total `total_player_compensation` context row using €56.352m.
- AP says the €56.352m 2025 French Open total includes per diems and exhibition payments.
- No clean Roland Garros tournament-total `competition_prize_money` row was added.
- Roland Garros revenue and profit/surplus remain unavailable.
- FFT organization-level revenue/profit/surplus must not be used as Roland Garros tournament revenue/profit unless a source bridge verifies compatibility.
- The dashboard answerability coverage is now `2/11` for revenue and profit/surplus.

Goal:
Extend the Wimbledon tournament-total denominator series to an older year only if official prize-money and financial-source semantics remain compatible.

Expected work:

- Verify official Wimbledon prize-money PDF semantics for the selected older year.
- Verify AELTC Championships Ltd accounts for the same compatible financial period.
- Add a normalized Wimbledon tournament-total `competition_prize_money` row only when the clean total tennis events prize-money numerator and operating-company turnover/profit denominators are clear.
- Keep broader total prize money/per-diem lines separate from clean competition prize money.
- Keep currency, numerator category, denominator kind, source confidence, and caveats explicit.
- Preserve existing row order so `wimbledon-2025-tournament-total` remains the first default answerable row.
- Do not fabricate real data.
- Update tests and dashboard behavior only as needed; schema should stay version `2` unless a verified source shape truly requires a contract change.
- Update README, data model, sources, caveats, future work, task log, LEARNINGS, changelog if appropriate, and create a new handoff.
- Run lint, typecheck, tests, build, refresh validation, and `git diff --check`.
- Commit and push to `main` when complete.
- If creating another Codex thread, it must use xhigh effort/thinking and the seed prompt must say: "Use xhigh effort/thinking for this thread."

The next Codex thread for this project must be created with xhigh effort/thinking.
