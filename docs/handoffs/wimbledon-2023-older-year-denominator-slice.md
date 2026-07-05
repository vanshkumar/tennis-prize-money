# Wimbledon 2023 Older-Year Denominator Slice

## Task Completed

Extended the Wimbledon tournament-total denominator series to 2023 after verifying that the official prize-money and financial-source semantics remain compatible with the existing 2025 and 2024 Wimbledon rows.

The completed row is `wimbledon-2023-tournament-total`. It answers:

- competition prize money / revenue: available, approximately 11.4%
- competition prize money / profit/surplus: available, approximately 80.4%

The dashboard answerability coverage is now `3/12` for both revenue and profit/surplus. `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.

## Source Verification

- Official Wimbledon 2023 prize-money PDF: `https://www.wimbledon.com/pdf/The_Championships_2023_Prize%20Money.pdf`
  - Verified `TOTAL TENNIS EVENTS PRIZE MONEY` of £43.25m.
  - Verified `PER DIEMS - estimated` of £1.45m.
  - Verified broader `TOTAL PRIZE MONEY` of £44.7m.
  - Used only the £43.25m total tennis events prize-money line as the clean `competition_prize_money` numerator.
- AELTC Championships Ltd Companies House 2023 accounts: `https://find-and-update.company-information.service.gov.uk/company/07546773/filing-history/MzQxOTIwMDA4OGFkaXF6a2N4/document?download=0&format=pdf`
  - Verified the 31 July 2023 filing from the official Companies House filing history.
  - Rendered and inspected the scanned PDF pages for the strategic report, profit and loss account, accounting-policy bridge, and turnover note.
  - Verified AELTC Championships Ltd undertakes day-to-day operations and is the principal contracting party for The Championships.
  - Verified the financial statements reflect the company activities, including results of and surplus division from The Championships.
  - Verified turnover of £380.156m and operating profit of £53.776m for the year ended 31 July 2023.
  - Verified net available surplus division to LTA Operations of £48.753m, profit before tax of £5.917m, profit after tax of £5.735m, and a £4.0m dividend as caveated values that are not used as the primary denominator.

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
- `docs/handoffs/wimbledon-2023-older-year-denominator-slice.md`
- `src/data/normalized/grandSlam2025MensSingles.json`
- `src/data/raw/source-metadata/grandSlam2025Sources.json`
- `src/data/static/seedDatasetMetadata.json`
- `src/test/dashboardMetrics.test.ts`
- `src/test/fixtures/seedDatasetExpectations.ts`

## Current Branch

`main`

## Commit Hash

Implementation commit: `dd4467f` (`feat: add wimbledon 2023 denominator slice`).

## Push Status

Pending. This handoff will be updated after the implementation and handoff commits are pushed to `origin/main`.

## Commands Run And Results

- `git status --short --branch` - started clean on `main...origin/main`.
- `git fetch origin main` - passed after escalation for `.git/FETCH_HEAD`; local `main` was even with `origin/main`.
- Read required docs: `LEARNINGS.md`, `AGENTS.md`, `README.md`, `docs/TASK_LOG.md`, `docs/DATA_MODEL.md`, `docs/DATA_SOURCES.md`, `docs/DATA_CAVEATS.md`, `docs/FUTURE_WORK.md`, and `docs/handoffs/roland-garros-2025-total-compensation-source-semantics.md`.
- Used web verification for the official Wimbledon 2023 PDF URL and Companies House 2023 filing URL.
- `curl -L -o tmp/pdfs/wimbledon-prize-money-2023.pdf "https://www.wimbledon.com/pdf/The_Championships_2023_Prize%20Money.pdf"` - passed after network approval.
- `curl -L -o tmp/pdfs/aeltc-championships-2023-accounts.pdf "...MzQxOTIwMDA4OGFkaXF6a2N4/document?download=0&format=pdf"` - passed after network approval.
- `pdfinfo tmp/pdfs/wimbledon-prize-money-2023.pdf` - passed; confirmed one-page official PDF.
- `pdfinfo tmp/pdfs/aeltc-championships-2023-accounts.pdf` - passed; confirmed 40-page Companies House PDF.
- `pdftoppm` render of Wimbledon and AELTC 2023 PDFs - passed; account pages were inspected visually because the filing is scanned.
- Local `pypdf` extraction of the Wimbledon PDF - passed; confirmed total tennis events prize money, estimated per diems, and total prize money lines.
- `npm run test -- --run src/test/dashboardMetrics.test.ts` - passed, 31 tests.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 46 tests.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `npm run build` - passed.
- `git diff --check` - passed.

All npm commands used the known working Node path:

```bash
PATH=/Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin:/usr/bin:/bin:/usr/sbin:/sbin /Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin/npm ...
```

## Implementation Notes

- No schema change was needed; schema version remains `2`.
- Added source metadata ids:
  - `wimbledon-2023-prize-money-pdf`
  - `wimbledon-aeltc-championships-2023-accounts`
- Added record `wimbledon-2023-tournament-total`:
  - `prizeMoneyScope.type: "tournament_total"`
  - `prizeMoneyScope.numeratorCategory: "competition_prize_money"`
  - `prizePool.amount: 43250000`
  - `prizePool.currency: "GBP"`
  - `prizePool.status: "official"`
  - `revenue.amount: 380156000`
  - `revenue.kind: "tournament_revenue"`
  - `profitOrSurplus.amount: 53776000`
  - `profitOrSurplus.kind: "tournament_profit"`
- Preserved record order: `wimbledon-2025-tournament-total` remains before 2024 and 2023, so the default all-record dashboard selection still opens on the latest answerable Wimbledon comparison.
- Tests now verify the 2023 row, high/medium confidence coverage of `8/12` and `4/12`, primary answerability coverage of `3/12`, and Wimbledon 2024-over-2023 tournament-total year-over-year prize-money growth of +12.3%.

## Known Issues And Caveats

- The Companies House accounts PDF is scanned; values were verified by rendering and visual inspection rather than machine-readable PDF text.
- The 2023 Wimbledon prize-money PDF uses a different official URL pattern than the 2024/2025 PDFs, so future older-year Wimbledon work should not assume the newer filename pattern.
- AELTC Championships Ltd turnover/profit are operating-company values for The Championships, not a separate cash ledger for only the tournament fortnight.
- The normalized profit denominator is operating profit before net finance income, net available surplus division to LTA Operations, taxation, and dividends. Net available surplus, after-tax profit, dividends, and AELTC/LTA organization-level values are not used as this row's denominator.
- Non-Wimbledon revenue and profit/surplus denominators remain unavailable.
- The file names `grandSlam2025Sources.json` and `grandSlam2025MensSingles.json` are historical and now contain tournament-total, context, and prior-year rows; no filename/schema migration was needed for this slice.

## Assumptions Made

- The official 2023 Wimbledon total tennis events prize-money line is semantically comparable to the 2024/2025 total tennis events prize-money lines.
- AELTC Championships Ltd 2023 turnover and operating profit are compatible denominators because the filing retains the same principal-contracting-party and statements-reflect-Championships bridge used for 2024/2025.
- It is safer to keep per diems, surplus division, after-tax profit, and dividends out of the primary ratio denominator/numerator choices even when they are sourced clearly.

## Next Task Objective

Continue primary-question expansion without weakening source semantics.

Recommended next slice:

- Extend Wimbledon to another older year only if the official Wimbledon prize-money PDF and same-year AELTC Championships Ltd accounts preserve the same clean numerator and operating-company denominator semantics.
- Alternatively, normalize a non-Wimbledon tournament-total numerator or denominator only when official/source semantics are at least as clear as the existing AO, US Open, Roland Garros, and Wimbledon precedents.
- Preserve `wimbledon-2025-tournament-total` as the first default answerable row.
- Keep schema version `2` unless a verified source shape truly requires a contract change.
- Keep total player compensation/support separate from competition prize money.

## Exact Next Thread Instructions

Use xhigh effort/thinking for this thread.

You are Codex working in the standalone `tennis-prize-money` repo. Work from latest `main`; the Wimbledon 2023 older-year denominator slice has been completed in the current prior thread.

Before starting, read in full:

- `LEARNINGS.md`
- `AGENTS.md`
- `README.md`
- `docs/TASK_LOG.md`
- `docs/DATA_MODEL.md`
- `docs/DATA_SOURCES.md`
- `docs/DATA_CAVEATS.md`
- `docs/FUTURE_WORK.md`
- `docs/handoffs/wimbledon-2023-older-year-denominator-slice.md`

Context from the completed Wimbledon 2023 slice:

- Static dataset schema remains version `2`.
- `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.
- `wimbledon-2023-tournament-total` is a tournament-total `competition_prize_money` row using £43.25m total tennis events prize money.
- The official Wimbledon 2023 PDF separates £43.25m total tennis events prize money from £1.45m estimated per diems and £44.7m broader total prize money.
- AELTC Championships Ltd 2023 accounts report turnover of £380.156m and operating profit of £53.776m for the year ended 31 July 2023.
- The 2023 row uses operating-company denominators for The Championships with caveats; it does not use net available surplus, after-tax profit, dividends, or broader organization-level values.
- The dashboard answerability coverage is now `3/12` for revenue and profit/surplus.

Goal:
Continue primary-question data expansion only where official/source semantics remain compatible.

Expected work:

- Verify official source semantics before adding any real row.
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
