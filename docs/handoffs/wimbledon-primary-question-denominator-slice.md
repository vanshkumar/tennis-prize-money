# Wimbledon Primary-Question Denominator Slice

## Task Completed

Normalized the first primary-question-ready row with a clean tournament-total competition-prize-money numerator and compatible financial denominators.

The completed row is `wimbledon-2025-tournament-total`. It answers:

- competition prize money / revenue: £52.0m / £423.626m = 12.3%
- competition prize money / profit: £52.0m / £52.720m = 98.6%

## Source Verification

- Official Wimbledon 2025 prize-money PDF: `https://www.wimbledon.com/pdf/Wimbledon_Prize_Money_2025.pdf`
  - Verified `TOTAL TENNIS EVENTS PRIZE MONEY` = £52.0m.
  - Verified `PER DIEMS - estimated` = £1.5m.
  - Verified broader `TOTAL PRIZE MONEY` = £53.5m.
  - Normalized the clean competition-prize numerator as £52.0m and excluded estimated per diems from the ratio numerator.
- Official Companies House filing for AELTC Championships Ltd full accounts made up to 31 July 2025:
  - URL: `https://find-and-update.company-information.service.gov.uk/company/07546773/filing-history/MzUxNzE0NjY3OGFkaXF6a2N4/document?format=pdf&download=0`
  - Verified the company is the principal contracting party for The Championships.
  - Verified turnover = £423.626m.
  - Verified operating profit = £52.720m.
  - Verified the accounts separately show net available surplus division to LTA Operations, profit before tax, profit after tax, and dividends; those are not used as this row's primary denominator.

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
- `docs/handoffs/wimbledon-primary-question-denominator-slice.md`
- `src/data/normalized/grandSlam2025MensSingles.json`
- `src/data/raw/source-metadata/grandSlam2025Sources.json`
- `src/data/static/seedDatasetMetadata.json`
- `src/lib/dashboardMetrics.ts`
- `src/pages/DashboardPage.tsx`
- `src/test/dashboardMetrics.test.ts`
- `src/test/fixtures/seedDatasetExpectations.ts`

## Current Branch

`main`

## Commit Hash

Pending until committed.

## Push Status

Pending until pushed.

## Commands Run And Results

- `cat LEARNINGS.md` - read project memory before starting.
- `git status --short --branch` - started clean on `main...origin/main`.
- `git pull --ff-only` - already up to date at first pull; later confirmed latest `main` was `9576281`.
- Read required docs: `AGENTS.md`, `README.md`, `docs/TASK_LOG.md`, `docs/DATA_MODEL.md`, `docs/DATA_SOURCES.md`, `docs/DATA_CAVEATS.md`, `docs/FUTURE_WORK.md`, and `docs/handoffs/primary-question-data-normalization-guardrail.md`.
- Downloaded and inspected Wimbledon 2025 prize-money PDF.
- Downloaded and inspected Companies House AELTC Championships Ltd 2025 accounts PDF; rendered relevant scanned pages for visual verification.
- `npm run test -- --run src/test/dashboardMetrics.test.ts` - passed, 26 tests.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 41 tests.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `npm run build` - passed.

All npm commands used the known working Node path:

```bash
PATH=/Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin:/usr/bin:/bin:/usr/sbin:/sbin /Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin/npm ...
```

## Implementation Notes

- No schema change was needed; schema version remains `2`.
- Added source metadata `wimbledon-aeltc-championships-2025-accounts` with `sourceType: "annual_report"` and high confidence.
- Added record `wimbledon-2025-tournament-total`:
  - `prizeMoneyScope.type: "tournament_total"`
  - `prizeMoneyScope.numeratorCategory: "competition_prize_money"`
  - `prizePool.amount: 52000000`
  - `revenue.kind: "tournament_revenue"`, `amount: 423626000`
  - `profitOrSurplus.kind: "tournament_profit"`, `amount: 52720000`
- The dashboard now chooses the first answerable primary-question record from the filtered set, so the all-records view opens on the Wimbledon answer instead of an unavailable event-level row.
- Tests now verify the Wimbledon row, ratios, denominator caveats, and selected-record preference.

## Known Issues And Caveats

- The AELTC accounts PDF is scanned, not text-extractable in this environment, so values were manually verified from rendered pages.
- The Wimbledon £53.5m total prize money line includes estimated per diems. It should not be used as a clean `competition_prize_money` numerator unless the model explicitly adds support/compensation categories.
- AELTC Championships Ltd turnover/profit are operating-company denominators for The Championships. They should not be described as after-tax retained profit, dividends, LTA surplus distributions, or broader organization-level financials.
- Non-Wimbledon Grand Slam rows still do not have compatible tournament-level revenue/profit denominators.

## Next Task Objective

Continue primary-question data expansion without weakening numerator/denominator semantics.

Recommended next slice:

- Add Australian Open 2025 tournament-total competition-prize-money numerator from official AO/Tennis Australia sources while keeping revenue/profit unavailable unless AO-specific financial denominators are found.
- Or add Wimbledon 2024 tournament-total competition-prize row and AELTC Championships Ltd 2024 denominators to enable a prior-year Wimbledon comparison.

The next Codex thread for this project must use xhigh effort/thinking, and its seed prompt must include: `Use xhigh effort/thinking for this thread.`
