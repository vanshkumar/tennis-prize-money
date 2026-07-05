# Wimbledon 2026 Tournament-Total Numerator Slice

## Task Completed

Added a current-year Wimbledon tournament-total `competition_prize_money` numerator row after verifying the official 2026 Wimbledon PDF separates clean tennis events prize money from estimated per diems.

The completed row is `wimbledon-2026-tournament-total`. It does not answer the primary revenue/profit-share question yet:

- competition prize money / revenue: unavailable
- competition prize money / profit/surplus: unavailable

The dashboard answerability coverage is now `4/14` for both revenue and profit/surplus. `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.

## Source Verification

- Official Wimbledon Prize Money and Finance page: `https://www.wimbledon.com/en_GB/the_championships/prize_money_and_finance`
  - Verified it links to the official 2026 prize-money PDF.
  - Verified the page headline/table total of £64.2m is broader total prize money, not the clean competition-prize numerator.
- Official Wimbledon 2026 prize-money PDF: `https://content.wimbledon.com/is/content/AELTC/aeltc/wimbledon/live-site/guest/pdfs/The%20Championships%202026_Prize%20Money.pdf`
  - Verified `TOTAL TENNIS EVENTS PRIZE MONEY` of £62.55m.
  - Verified `PER DIEMS - estimated` of £1.65m.
  - Verified broader `TOTAL PRIZE MONEY` of £64.2m.
  - Used only the £62.55m total tennis events prize-money line as the clean `competition_prize_money` numerator.
- Wimbledon 2021 source-safety check:
  - Probed likely official 2021 PDF URL patterns, but those current URLs returned Wimbledon 404 pages.
  - The current official historical table lists 2021 total prize money, but the same table lists per-diem-inclusive recent totals, so it is not sufficient by itself for a clean older-year `competition_prize_money` row.
  - No 2021 row was added.

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
- `docs/handoffs/wimbledon-2026-tournament-total-numerator-slice.md`
- `src/data/normalized/grandSlam2025MensSingles.json`
- `src/data/raw/source-metadata/grandSlam2025Sources.json`
- `src/data/static/seedDatasetMetadata.json`
- `src/test/dashboardMetrics.test.ts`
- `src/test/fixtures/seedDatasetExpectations.ts`

## Current Branch

`main`

## Commit Hash

Implementation commit: `e5bbe63` (`feat: add wimbledon 2026 numerator slice`).

## Push Status

Pending at handoff creation.

## Commands Run And Results

- `git status --short --branch` - started clean on `main...origin/main`.
- `git fetch origin main` - passed after approval for `.git/FETCH_HEAD`; local `main` matched `origin/main` at `df9577d`.
- Read required docs: `LEARNINGS.md`, `AGENTS.md`, `README.md`, `docs/TASK_LOG.md`, `docs/DATA_MODEL.md`, `docs/DATA_SOURCES.md`, `docs/DATA_CAVEATS.md`, `docs/FUTURE_WORK.md`, and `docs/handoffs/wimbledon-2022-older-year-denominator-slice.md`.
- Used web/source verification for the official Wimbledon Prize Money and Finance page and Companies House filing-history context.
- `curl -I -L` probes for likely Wimbledon 2021 PDF URL patterns - official current URLs returned 404 pages.
- `curl -L -o tmp/source-html/wimbledon-prize-money-and-finance.html ...` - passed after network approval.
- `curl -L -o tmp/pdfs/wimbledon-prize-money-2026.pdf ...The%20Championships%202026_Prize%20Money.pdf` - passed after network approval.
- `pdfinfo tmp/pdfs/wimbledon-prize-money-2026.pdf` - passed; confirmed one-page official PDF.
- Bundled Python `pypdf` extraction of the Wimbledon 2026 PDF - passed; confirmed total tennis events prize money, estimated per diems, and total prize money lines.
- Bundled Poppler `pdftoppm` render of the Wimbledon 2026 PDF - passed; page was visually inspected.
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
- Added source metadata id `wimbledon-2026-prize-money-pdf`.
- Added record `wimbledon-2026-tournament-total`:
  - `prizeMoneyScope.type: "tournament_total"`
  - `prizeMoneyScope.numeratorCategory: "competition_prize_money"`
  - `prizePool.amount: 62550000`
  - `prizePool.currency: "GBP"`
  - `prizePool.status: "official"`
  - `revenue.status: "unavailable"`
  - `profitOrSurplus.status: "unavailable"`
- Preserved record order so `wimbledon-2025-tournament-total` remains the first answerable primary-question row.
- Tests now verify the 2026 row, high/medium confidence coverage of `10/14` and `4/14`, primary answerability coverage of `4/14`, and Wimbledon 2026-over-2025 tournament-total year-over-year prize-money growth of +20.3%.

## Known Issues And Caveats

- Wimbledon 2026 financial denominators are not normalized because the AELTC Championships Ltd financial year ending 31 July 2026 had not ended as of 2026-07-05, so same-year accounts were not available.
- The official Wimbledon headline total prize money of £64.2m includes estimated per diems and should not be used as a clean competition-prize-money numerator.
- The current official historical prize-money table is useful as a source lead, but recent rows show it can be broader than clean tennis events prize money.
- Non-Wimbledon revenue and profit/surplus denominators remain unavailable.
- The file names `grandSlam2025Sources.json` and `grandSlam2025MensSingles.json` are historical and now contain tournament-total, context, prior-year, and 2026 rows; no filename/schema migration was needed for this slice.

## Assumptions Made

- The 2026 Wimbledon total tennis events prize-money line is semantically comparable to the 2025/2024/2023/2022 total tennis events prize-money lines.
- It is safer to leave 2026 revenue/profit unavailable until official AELTC Championships Ltd accounts exist, even though the 2025/2024/2023/2022 filings establish the operating-company denominator pattern.
- It is safer to skip a 2021 denominator row until an official PDF or equivalent source separates clean competition prize money from any support/per-diem-style components.

## Next Task Objective

Continue primary-question expansion without weakening source semantics.

Recommended next slice:

- Add another full tournament clean competition-prize numerator or compatible denominator only after source semantics are verified.
- Revisit Wimbledon 2021 only if an official PDF or equivalent source separates clean total tennis events prize money from support/per-diem-style values and same-year AELTC Championships Ltd accounts preserve the operating-company bridge.
- Revisit Wimbledon 2026 denominators only after official AELTC Championships Ltd accounts for the year ending 31 July 2026 are available and compatible.
- Alternatively, normalize a non-Wimbledon tournament-total numerator or denominator only when official/source semantics are at least as clear as the existing AO, US Open, Roland Garros, and Wimbledon precedents.
- Preserve `wimbledon-2025-tournament-total` as the first default answerable row.
- Keep schema version `2` unless a verified source shape truly requires a contract change.
- Keep total player compensation/support separate from competition prize money.

## Exact Next Thread Instructions

Use xhigh effort/thinking for this thread.

You are Codex working in the standalone `tennis-prize-money` repo. Work from latest `main`; the Wimbledon 2026 tournament-total numerator slice has been completed in the current prior thread.

Before starting, read in full:

- `LEARNINGS.md`
- `AGENTS.md`
- `README.md`
- `docs/TASK_LOG.md`
- `docs/DATA_MODEL.md`
- `docs/DATA_SOURCES.md`
- `docs/DATA_CAVEATS.md`
- `docs/FUTURE_WORK.md`
- `docs/handoffs/wimbledon-2026-tournament-total-numerator-slice.md`

Context from the completed Wimbledon 2026 slice:

- Static dataset schema remains version `2`.
- `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.
- `wimbledon-2026-tournament-total` is a tournament-total `competition_prize_money` row using £62.55m total tennis events prize money.
- The official Wimbledon 2026 PDF separates £62.55m total tennis events prize money from £1.65m estimated per diems and £64.2m broader total prize money.
- Wimbledon 2026 revenue and profit/surplus are unavailable because AELTC Championships Ltd accounts for the year ending 31 July 2026 were not available as of 2026-07-05.
- The dashboard answerability coverage is now `4/14` for revenue and profit/surplus.
- Do not use the current official Wimbledon historical headline table alone as a clean numerator source; it lists broader per-diem-inclusive recent totals.

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
