# Wimbledon 2024 Prior-Year Denominator Slice

## Task Completed

Normalized a Wimbledon 2024 prior-year primary-question row with a clean tournament-total competition-prize-money numerator and compatible operating-company financial denominators.

The completed row is `wimbledon-2024-tournament-total`. It answers:

- competition prize money / revenue: £48.55m / £406.507m = 11.9%
- competition prize money / profit: £48.55m / £54.332m = 89.4%

It also enables 2025-over-2024 Wimbledon tournament-total prize-money growth:

- (£52.0m - £48.55m) / £48.55m = +7.1%

## Source Verification

- Official Wimbledon 2024 prize-money PDF: `https://www.wimbledon.com/pdf/Wimbledon_Prize_Money_2024.pdf`
  - Verified `TOTAL TENNIS EVENTS PRIZE MONEY` = £48.55m.
  - Verified `PER DIEMS - estimated` = £1.45m.
  - Verified broader `TOTAL PRIZE MONEY` = £50.0m.
  - Normalized the clean competition-prize numerator as £48.55m and excluded estimated per diems from the ratio numerator.
- Official Companies House filing for AELTC Championships Ltd full accounts made up to 31 July 2024:
  - URL: `https://find-and-update.company-information.service.gov.uk/company/07546773/filing-history/MzQ2MzQ1ODMzM2FkaXF6a2N4/document?download=0&format=pdf`
  - Verified the company is the principal contracting party for The Championships.
  - Verified the accounts state the financial statements reflect the activities of the company, including the results of and division of surplus from The Championships.
  - Verified turnover = £406.507m.
  - Verified operating profit = £54.332m.
  - Verified the accounts separately show net available surplus division to LTA Operations, profit before tax, and profit after tax; those are not used as this row's primary denominator.

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
- `docs/handoffs/wimbledon-2024-prior-year-denominator-slice.md`
- `src/data/normalized/grandSlam2025MensSingles.json`
- `src/data/raw/source-metadata/grandSlam2025Sources.json`
- `src/data/static/seedDatasetMetadata.json`
- `src/test/dashboardMetrics.test.ts`
- `src/test/fixtures/seedDatasetExpectations.ts`

## Current Branch

`main`

## Commit Hash

Implementation commit: `8c9934a` (`feat: add wimbledon 2024 denominator slice`).

## Push Status

Pushed to `origin/main`. Implementation commit `8c9934a` and handoff commit `f033fc5` were pushed successfully.

## Commands Run And Results

- `git status --short --branch` - started clean on `main...origin/main`.
- `git pull --ff-only` - already up to date after approved git metadata access.
- Read required docs: `LEARNINGS.md`, `AGENTS.md`, `README.md`, `docs/TASK_LOG.md`, `docs/DATA_MODEL.md`, `docs/DATA_SOURCES.md`, `docs/DATA_CAVEATS.md`, `docs/FUTURE_WORK.md`, and `docs/handoffs/wimbledon-primary-question-denominator-slice.md`.
- Opened official Wimbledon 2024 prize-money PDF and verified the total tennis events prize money, estimated per diems, and broader total prize money lines.
- Opened official Companies House filing history and AELTC Championships Ltd 2024 accounts PDF; rendered relevant scanned pages for visual verification.
- `npm run test -- --run src/test/dashboardMetrics.test.ts` - first run exposed a stale fallback expectation after adding a second answerable Wimbledon row; updated the test, then reran successfully with 27 tests.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 42 tests.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `npm run build` - passed.
- Re-ran `npm run lint`, `npm run typecheck`, `npm run test`, `npm run refresh:data`, and `npm run build` after the documentation pass; all passed.
- `git diff --check` - passed.

All npm commands used the known working Node path:

```bash
PATH=/Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin:/usr/bin:/bin:/usr/sbin:/sbin /Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin/npm ...
```

## Implementation Notes

- No schema change was needed; schema version remains `2`.
- Added source metadata `wimbledon-2024-prize-money-pdf` with `sourceType: "official_prize_money_page"` and high confidence.
- Added source metadata `wimbledon-aeltc-championships-2024-accounts` with `sourceType: "annual_report"` and high confidence.
- Added record `wimbledon-2024-tournament-total`:
  - `prizeMoneyScope.type: "tournament_total"`
  - `prizeMoneyScope.numeratorCategory: "competition_prize_money"`
  - `prizePool.amount: 48550000`
  - `revenue.kind: "tournament_revenue"`, `amount: 406507000`
  - `profitOrSurplus.kind: "tournament_profit"`, `amount: 54332000`
- Kept `wimbledon-2025-tournament-total` before the 2024 row so the all-records dashboard view still opens on the latest answerable Wimbledon comparison.
- Tests now verify the 2024 row, source counts, answerability coverage of `2/7`, and the +7.1% Wimbledon 2025-over-2024 tournament-total prize-money growth case.

## Known Issues And Caveats

- The AELTC accounts PDF is scanned, not text-extractable in this environment, so values were manually verified from rendered pages.
- The Wimbledon £50.0m 2024 total prize money line includes estimated per diems. It should not be used as a clean `competition_prize_money` numerator unless the model explicitly adds support/compensation categories.
- AELTC Championships Ltd turnover/profit are operating-company denominators for The Championships. They should not be described as after-tax retained profit, dividends, LTA surplus distributions, or broader organization-level financials.
- Non-Wimbledon Grand Slam rows still do not have compatible tournament-level revenue/profit denominators.
- The file names `grandSlam2025Sources.json` and `grandSlam2025MensSingles.json` are historical and now contain a Wimbledon 2024 prior-year tournament-total row; no filename/schema migration was needed for this slice.

## Assumptions Made

- The year ended 31 July 2024 AELTC Championships Ltd accounts are the compatible operating-company financial period for The Championships 2024 because the filing ties the company directly to The Championships using the same principal-contracting-party and statements-reflect-Championships language as the 2025 filing.
- The clean numerator should be Wimbledon total tennis events prize money, not the broader total prize money line that includes estimated per diems.
- The next primary-question expansion should prioritize official tournament-total competition-prize numerators before lower-confidence denominator estimates.

## Next Task Objective

Continue primary-question data expansion without weakening numerator/denominator semantics.

Recommended next slice:

- Add Australian Open 2025 tournament-total competition-prize-money numerator from official AO/Tennis Australia sources.
- Keep AO revenue/profit unavailable unless an AO-specific compatible financial denominator is verified.
- Preserve schema version `2` unless a verified source shape truly requires a contract change.
- Keep total player compensation/support and organization-level financials out of primary ratios unless source semantics support compatibility.

## Exact Next Thread Instructions

Use xhigh effort/thinking for this thread.

You are Codex working in the standalone `tennis-prize-money` repo. Work from latest `main`; the implementation commit for the completed Wimbledon 2024 prior-year slice is `8c9934a` (`feat: add wimbledon 2024 denominator slice`).

Before starting, read in full:

- `LEARNINGS.md`
- `AGENTS.md`
- `README.md`
- `docs/TASK_LOG.md`
- `docs/DATA_MODEL.md`
- `docs/DATA_SOURCES.md`
- `docs/DATA_CAVEATS.md`
- `docs/FUTURE_WORK.md`
- `docs/handoffs/wimbledon-2024-prior-year-denominator-slice.md`

Context from the completed Wimbledon 2024 slice:

- Static dataset schema remains version `2`.
- `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.
- `wimbledon-2024-tournament-total` is a prior-year tournament-total competition-prize row.
- It uses £48.55m Wimbledon 2024 total tennis events prize money, excluding £1.45m estimated per diems from the broader £50.0m total prize money line.
- It uses AELTC Championships Ltd 2024 turnover (£406.507m) and operating profit (£54.332m) as operating-company denominators for The Championships.
- It does not use net available surplus, profit before tax, profit after tax, dividends, LTA distributions, or broader organization-level values as the primary denominator.
- The dashboard answerability coverage is now `2/7` for revenue and profit/surplus, and the tested Wimbledon 2025-over-2024 tournament-total YoY growth is +7.1%.

Goal:
Normalize the next primary-question numerator slice: add an Australian Open 2025 tournament-total competition-prize-money row from official AO/Tennis Australia sources, while keeping revenue/profit unavailable unless an AO-specific compatible denominator is verified.

Expected work:

- Verify official AO/Tennis Australia 2025 tournament-total prize-money values and source semantics.
- Keep clean competition prize money separate from any broader support/compensation concept if one appears.
- Add normalized 2025 Australian Open tournament-total competition-prize-money row only when numerator semantics are clear.
- Keep currency, numerator category, denominator kind, source confidence, and caveats explicit.
- Do not use Tennis Australia organization-level revenue/surplus as tournament revenue/profit unless a source bridge verifies compatibility.
- Do not fabricate real data.
- Update tests and dashboard behavior only as needed; schema should stay version `2` unless a verified source shape truly requires a contract change.
- Update README, data model, sources, caveats, future work, task log, LEARNINGS, changelog if appropriate, and create a new handoff.
- Run lint, typecheck, tests, build, and refresh validation.
- Commit and push to `main` when complete.
- If creating another Codex thread, it must use xhigh effort/thinking and the seed prompt must say: "Use xhigh effort/thinking for this thread."

The next Codex thread for this project must be created with xhigh effort/thinking.
