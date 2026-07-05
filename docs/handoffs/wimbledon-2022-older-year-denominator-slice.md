# Wimbledon 2022 Older-Year Denominator Slice

## Task Completed

Extended the Wimbledon tournament-total denominator series to 2022 after verifying that the official prize-money and financial-source semantics remain compatible with the existing 2025, 2024, and 2023 Wimbledon rows.

The completed row is `wimbledon-2022-tournament-total`. It answers:

- competition prize money / revenue: available, approximately 11.2%
- competition prize money / profit/surplus: available, approximately 82.7%

The dashboard answerability coverage is now `4/13` for both revenue and profit/surplus. `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.

## Source Verification

- Official Wimbledon 2022 prize-money PDF: `https://www.wimbledon.com/pdf/The_Championships_2022_Prize_Money.pdf`
  - Verified `TOTAL TENNIS EVENTS PRIZE MONEY` of £38.9m.
  - Verified `PER DIEMS - estimated per programme` of £1.45m.
  - Verified broader `TOTAL PRIZE MONEY` of £40.35m.
  - Used only the £38.9m total tennis events prize-money line as the clean `competition_prize_money` numerator.
- AELTC Championships Ltd Companies House 2022 accounts: `https://find-and-update.company-information.service.gov.uk/company/07546773/filing-history/MzM3NzI4MDgyMGFkaXF6a2N4/document?download=0&format=pdf`
  - Verified the 31 July 2022 filing from the official Companies House filing history.
  - Rendered and inspected the scanned PDF pages for the strategic report, profit and loss account, accounting-policy bridge, segmental reporting note, and turnover note.
  - Verified AELTC Championships Ltd undertakes day-to-day operations and is the principal contracting party for The Championships.
  - Verified the segmental reporting note assigns turnover and operating profit to activities in respect of The Championships.
  - Verified turnover of £346.640m and operating profit of £47.057m for the year ended 31 July 2022.
  - Verified net available surplus division to LTA Operations of £42.427m, profit before tax of £1.631m, profit after tax of £1.867m, and a £4.0m dividend as caveated values that are not used as the primary denominator.

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
- `docs/handoffs/wimbledon-2022-older-year-denominator-slice.md`
- `src/data/normalized/grandSlam2025MensSingles.json`
- `src/data/raw/source-metadata/grandSlam2025Sources.json`
- `src/data/static/seedDatasetMetadata.json`
- `src/test/dashboardMetrics.test.ts`
- `src/test/fixtures/seedDatasetExpectations.ts`

## Current Branch

`main`

## Commit Hash

Implementation commit: `3409eb9` (`feat: add wimbledon 2022 denominator slice`).

## Push Status

Pushed to `origin/main`. Implementation commit `3409eb9` and handoff commit `d723005` were pushed successfully.

## Commands Run And Results

- `git status --short --branch` - started clean on `main...origin/main`.
- `git fetch origin main` - passed after escalation for `.git/FETCH_HEAD`; local `main` was even with `origin/main`.
- Read required docs: `LEARNINGS.md`, `AGENTS.md`, `README.md`, `docs/TASK_LOG.md`, `docs/DATA_MODEL.md`, `docs/DATA_SOURCES.md`, `docs/DATA_CAVEATS.md`, `docs/FUTURE_WORK.md`, and `docs/handoffs/wimbledon-2023-older-year-denominator-slice.md`.
- Used web verification for the official Wimbledon 2022 PDF URL and Companies House 2022 filing-history entry.
- `curl -L -o tmp/pdfs/wimbledon-prize-money-2022.pdf "https://www.wimbledon.com/pdf/The_Championships_2022_Prize_Money.pdf"` - passed after network approval.
- `curl -L -o tmp/pdfs/aeltc-championships-2022-accounts.pdf "...MzM3NzI4MDgyMGFkaXF6a2N4/document?download=0&format=pdf"` - passed after network approval.
- `pdfinfo tmp/pdfs/wimbledon-prize-money-2022.pdf` - passed; confirmed one-page official PDF.
- `pdfinfo tmp/pdfs/aeltc-championships-2022-accounts.pdf` - passed; confirmed 40-page Companies House PDF.
- Bundled Python `pypdf` extraction of the Wimbledon PDF - passed; confirmed total tennis events prize money, estimated per diems, and total prize money lines.
- Bundled Poppler `pdftoppm` render of Wimbledon and AELTC 2022 PDFs - passed; account pages were inspected visually because the filing is scanned.
- `npm run test -- --run src/test/dashboardMetrics.test.ts` - passed, 32 tests.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 47 tests.
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
  - `wimbledon-2022-prize-money-pdf`
  - `wimbledon-aeltc-championships-2022-accounts`
- Added record `wimbledon-2022-tournament-total`:
  - `prizeMoneyScope.type: "tournament_total"`
  - `prizeMoneyScope.numeratorCategory: "competition_prize_money"`
  - `prizePool.amount: 38900000`
  - `prizePool.currency: "GBP"`
  - `prizePool.status: "official"`
  - `revenue.amount: 346640000`
  - `revenue.kind: "tournament_revenue"`
  - `profitOrSurplus.amount: 47057000`
  - `profitOrSurplus.kind: "tournament_profit"`
- Preserved record order: `wimbledon-2025-tournament-total` remains before 2024, 2023, and 2022, so the default all-record dashboard selection still opens on the latest answerable Wimbledon comparison.
- Tests now verify the 2022 row, high/medium confidence coverage of `9/13` and `4/13`, primary answerability coverage of `4/13`, and Wimbledon 2023-over-2022 tournament-total year-over-year prize-money growth of +11.2%.

## Known Issues And Caveats

- The Companies House accounts PDF is scanned; values were verified by rendering and visual inspection rather than machine-readable PDF text.
- The 2022 Wimbledon prize-money PDF uses the official URL pattern `The_Championships_2022_Prize_Money.pdf`, which differs from both the 2024/2025 `Wimbledon_Prize_Money_YEAR.pdf` pattern and the 2023 escaped-space URL.
- AELTC Championships Ltd turnover/profit are operating-company values for The Championships, not a separate cash ledger for only the tournament fortnight.
- The normalized profit denominator is operating profit before net finance cost, net available surplus division to LTA Operations, taxation, and dividends. Net available surplus, after-tax profit, dividends, and AELTC/LTA organization-level values are not used as this row's denominator.
- Non-Wimbledon revenue and profit/surplus denominators remain unavailable.
- The file names `grandSlam2025Sources.json` and `grandSlam2025MensSingles.json` are historical and now contain tournament-total, context, and prior-year rows; no filename/schema migration was needed for this slice.

## Assumptions Made

- The official 2022 Wimbledon total tennis events prize-money line is semantically comparable to the 2023/2024/2025 total tennis events prize-money lines.
- AELTC Championships Ltd 2022 turnover and operating profit are compatible denominators because the filing retains the same principal-contracting-party bridge and segmental reporting assigns those values to activities in respect of The Championships.
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

You are Codex working in the standalone `tennis-prize-money` repo. Work from latest `main`; the Wimbledon 2022 older-year denominator slice has been completed in the current prior thread.

Before starting, read in full:

- `LEARNINGS.md`
- `AGENTS.md`
- `README.md`
- `docs/TASK_LOG.md`
- `docs/DATA_MODEL.md`
- `docs/DATA_SOURCES.md`
- `docs/DATA_CAVEATS.md`
- `docs/FUTURE_WORK.md`
- `docs/handoffs/wimbledon-2022-older-year-denominator-slice.md`

Context from the completed Wimbledon 2022 slice:

- Static dataset schema remains version `2`.
- `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.
- `wimbledon-2022-tournament-total` is a tournament-total `competition_prize_money` row using £38.9m total tennis events prize money.
- The official Wimbledon 2022 PDF separates £38.9m total tennis events prize money from £1.45m estimated per diems and £40.35m broader total prize money.
- AELTC Championships Ltd 2022 accounts report turnover of £346.640m and operating profit of £47.057m for the year ended 31 July 2022.
- The 2022 row uses operating-company denominators for The Championships with caveats; it does not use net available surplus, after-tax profit, dividends, or broader organization-level values.
- The dashboard answerability coverage is now `4/13` for revenue and profit/surplus.

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
