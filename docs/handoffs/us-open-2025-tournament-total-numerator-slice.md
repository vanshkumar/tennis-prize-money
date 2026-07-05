# US Open 2025 Tournament-Total Numerator Slice

## Task Completed

Normalized a US Open 2025 tournament-total competition-prize-money numerator row while preserving the existing total-player-compensation context row.

The completed row is `us-open-2025-tournament-total`.

It does not answer the primary revenue/profit-share ratios yet because no US Open-specific compatible financial denominator was verified:

- competition prize money / revenue: unavailable
- competition prize money / profit/surplus: unavailable

The dashboard answerability coverage is now `2/10` for both revenue and profit/surplus. `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.

## Source Verification

- Official US Open / USTA 2025 release: `https://www.usopen.org/en_US/news/articles/2025-08-06/2025_us_open_prize_money_sets_record_for_largest_purse_in_tennis_history.html`
  - Direct crawler/web text extraction returned an empty dynamic page.
  - Direct `curl` failed with an HTTP/2 internal error and then an HTTP/1.1 timeout.
  - Rendered browser verification succeeded and exposed the official article text.
  - Verified US$90.0m total player compensation for the 2025 US Open.
  - Verified a separate US$5.0m travel and hotel support component before the prize-money breakdown.
  - Normalized clean competition prize money as US$85.0m by excluding the official US$5.0m support component from the official US$90.0m total player-compensation package.
- AP corroboration: `https://apnews.com/article/prize-money-us-open-2025-8134bd075f194c38011b3e8eff81fd56`
  - Corroborates US$85.0m in 2025 US Open prize money across competitions and US$90.0m total player compensation.
- Official US Open / USTA 2024 release lead: `https://www.usopen.org/en_US/news/articles/2024-08-07/2024_us_open_prize_money_will_be_largest_purse_in_tennis_history.html`
  - Rendered browser check did not expose enough article text in this task.
  - No 2024 clean competition-prize row was normalized.
- No US Open-specific tournament revenue or profit/surplus denominator was verified.
- USTA organization-level financials remain out of US Open tournament revenue/profit ratios.

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
- `docs/handoffs/us-open-2025-tournament-total-numerator-slice.md`
- `src/data/normalized/grandSlam2025MensSingles.json`
- `src/data/raw/source-metadata/grandSlam2025Sources.json`
- `src/data/static/seedDatasetMetadata.json`
- `src/test/dashboardMetrics.test.ts`
- `src/test/fixtures/seedDatasetExpectations.ts`

## Current Branch

`main`

## Commit Hash

Implementation commit: `109de01` (`feat: add us open 2025 numerator slice`).

## Push Status

Pushed to `origin/main`. Implementation commit `109de01` and handoff commit `017782e` were pushed successfully.

## Commands Run And Results

- `git status --short --branch` - started clean on `main...origin/main`.
- `git fetch origin main` - passed; local `main` was even with `origin/main`.
- Read required docs: `LEARNINGS.md`, `AGENTS.md`, `README.md`, `docs/TASK_LOG.md`, `docs/DATA_MODEL.md`, `docs/DATA_SOURCES.md`, `docs/DATA_CAVEATS.md`, `docs/FUTURE_WORK.md`, and `docs/handoffs/australian-open-2024-prior-year-tournament-total-numerator-slice.md`.
- Opened official US Open 2025 and 2024 source URLs with web/curl/rendered-browser paths; verified 2025 source semantics and left 2024 as an unnormalized lead.
- `npm run test -- --run src/test/dashboardMetrics.test.ts` - passed, 29 tests.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 44 tests.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `npm run build` - passed.
- `git diff --check` - passed.

All npm commands used the known working Node path:

```bash
PATH=/Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin:/usr/bin:/bin:/usr/sbin:/sbin /Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin/npm ...
```

## Implementation Notes

- No schema change was needed; schema version remains `2`.
- Updated source metadata id `us-open-2025-compensation-release` to high confidence after rendered official text verification.
- Added record `us-open-2025-tournament-total`:
  - `prizeMoneyScope.type: "tournament_total"`
  - `prizeMoneyScope.numeratorCategory: "competition_prize_money"`
  - `prizePool.amount: 85000000`
  - `prizePool.status: "derived"`
  - `revenue.kind: "unknown"`, `status: "unavailable"`
  - `profitOrSurplus.kind: "unknown"`, `status: "unavailable"`
- Preserved record `us-open-2025-total-player-compensation`:
  - `prizeMoneyScope.numeratorCategory: "total_player_compensation"`
  - `prizePool.amount: 90000000`
  - excluded from revenue/profit ratios by existing metric-engine guardrails
- Kept `wimbledon-2025-tournament-total` as the first answerable row so the all-records dashboard view still opens on the latest answerable Wimbledon comparison.
- Tests now verify the US Open 2025 tournament-total row, unavailable financial denominators, high/medium confidence coverage of `7/10` and `3/10`, primary answerability coverage of `2/10`, and total-player-compensation exclusion.

## Known Issues And Caveats

- The US Open 2025 US$85.0m clean competition-prize numerator is derived from official US$90.0m total compensation less official US$5.0m travel/hotel support, with AP corroboration. If a future official table publishes a different exact competition-prize total, update this row and source notes.
- The official US Open 2025 release mentions free racquet stringing after the US$5.0m support sentence. The normalized row follows the official total-compensation/support arithmetic and AP corroboration; future source adapters should revisit whether stringing has a separately quantified value.
- The official US Open 2024 release lead did not render enough text in this task, so no prior-year US Open tournament-total row was added.
- USTA organization-level financials are not compatible US Open tournament revenue/profit denominators unless a source bridge verifies scope compatibility.
- The file names `grandSlam2025Sources.json` and `grandSlam2025MensSingles.json` are historical and now contain tournament-total and prior-year rows; no filename/schema migration was needed for this slice.

## Assumptions Made

- The official US Open 2025 article's US$90.0m total player compensation and US$5.0m support lines can be used to derive US$85.0m in clean competition prize money because the support amount is explicitly identified before the prize-money breakdown and AP corroborates US$85.0m in competition prize money.
- US Open revenue/profit remains unavailable until a US Open-specific denominator, not USTA organization-level finance, is verified.

## Next Task Objective

Continue primary-question numerator expansion without weakening source semantics.

Recommended next slice:

- Re-check Roland Garros tournament-total prize-money source semantics for 2025 and/or 2024.
- Prefer official Roland Garros/FFT sources; use reputable secondary sources only with lower confidence and visible caveats.
- Add a clean Roland Garros tournament-total `competition_prize_money` row only if source semantics are clear.
- Keep Roland Garros revenue/profit unavailable unless a Roland Garros-specific compatible denominator is verified.
- Preserve existing event-level rows and schema version `2` unless a verified source shape truly requires a contract change.

## Exact Next Thread Instructions

Use xhigh effort/thinking for this thread.

You are Codex working in the standalone `tennis-prize-money` repo. Work from latest `main`; the US Open 2025 tournament-total numerator slice has been completed in the current prior thread.

Before starting, read in full:

- `LEARNINGS.md`
- `AGENTS.md`
- `README.md`
- `docs/TASK_LOG.md`
- `docs/DATA_MODEL.md`
- `docs/DATA_SOURCES.md`
- `docs/DATA_CAVEATS.md`
- `docs/FUTURE_WORK.md`
- `docs/handoffs/us-open-2025-tournament-total-numerator-slice.md`

Context from the completed US Open 2025 slice:

- Static dataset schema remains version `2`.
- `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.
- `us-open-2025-tournament-total` is a tournament-total `competition_prize_money` row using US$85.0m, derived from the official US Open/USTA US$90.0m total player-compensation announcement after excluding the official US$5.0m travel/hotel support component.
- `us-open-2025-total-player-compensation` remains a separate `total_player_compensation` context row using US$90.0m.
- US Open 2025 revenue and profit/surplus remain unavailable.
- USTA organization-level revenue/profit/surplus must not be used as US Open tournament revenue/profit unless a source bridge verifies compatibility.
- The dashboard answerability coverage is now `2/10` for revenue and profit/surplus.

Goal:
Re-check Roland Garros tournament-total prize-money source semantics and add a clean competition-prize-money numerator row only when source semantics are clear, while keeping event-level partial allocations, total compensation/support, and tournament revenue/profit semantics separate.

Expected work:

- Verify official Roland Garros/FFT 2025 and/or 2024 tournament-total prize-money values and source semantics.
- Keep clean competition prize money separate from total player compensation/support, if any support component is identified.
- Preserve existing Roland Garros event-level rows unless a separate clean tournament-total competition-prize row is verified.
- Add normalized Roland Garros tournament-total `competition_prize_money` row only when numerator semantics are clear.
- Keep Roland Garros revenue/profit unavailable unless a Roland Garros-specific compatible denominator is verified.
- Keep currency, numerator category, denominator kind, source confidence, and caveats explicit.
- Do not use FFT organization-level revenue/profit/surplus as Roland Garros tournament revenue/profit unless a source bridge verifies compatibility.
- Do not fabricate real data.
- Update tests and dashboard behavior only as needed; schema should stay version `2` unless a verified source shape truly requires a contract change.
- Update README, data model, sources, caveats, future work, task log, LEARNINGS, changelog if appropriate, and create a new handoff.
- Run lint, typecheck, tests, build, refresh validation, and `git diff --check`.
- Commit and push to `main` when complete.
- If creating another Codex thread, it must use xhigh effort/thinking and the seed prompt must say: "Use xhigh effort/thinking for this thread."

The next Codex thread for this project must be created with xhigh effort/thinking.
