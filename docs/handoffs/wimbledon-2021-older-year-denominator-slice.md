# Wimbledon 2021 Older-Year Denominator Slice

Date: 2026-07-06

Branch: `main`

Implementation commit: `9bceef7` (`feat: add wimbledon 2021 denominator slice`)

Push status: Pushed implementation commit `9bceef7` and handoff commit `945cf89` to `origin/main`.

## Summary

This slice continued the 2021-and-newer primary-question data expansion without changing schema version `2`.

`wimbledon-2025-tournament-total` remains the first default answerable primary-question row. The dashboard answerability coverage is now `5/25` for both revenue and profit/surplus.

The slice first rechecked Roland Garros 2023/2022/2021 source semantics. No Roland Garros row was normalized because the available source shapes did not verify a clean tournament-total `competition_prize_money` subtotal separated from support/per diem/other compensation components.

The compatible fallback was Wimbledon 2021. The new `wimbledon-2021-tournament-total` row uses the official Wimbledon historical total prize-money line of £35.016m, a secondary support-exclusion cross-check, and AELTC Championships Ltd 2021 operating-company denominators.

## Added Data

- `wimbledon-2021-prize-money-finance-page`
  - Official Wimbledon Prize Money and Finance page.
  - Historical table lists the 2021 total prize money line of £35.016m.
  - URL: `https://www.wimbledon.com/en_GB/the_championships/prize_money_and_finance`
- `wimbledon-2021-secondary-prize-money-crosscheck`
  - Secondary 2021 tournament-page cross-check.
  - Confirms £35.016m and says the prize-money figure excludes accommodation and COVID testing support.
  - URL: `https://en.wikipedia.org/wiki/2021_Wimbledon_Championships#Prize_money`
- `wimbledon-aeltc-championships-2021-accounts`
  - Official Companies House filing for AELTC Championships Ltd, full accounts made up to 31 July 2021.
  - URL: `https://find-and-update.company-information.service.gov.uk/company/07546773/filing-history/MzMzNzY5ODU0NWFkaXF6a2N4/document?format=pdf&download=0`

New record:

- `wimbledon-2021-tournament-total`
  - Tournament: Wimbledon
  - Year: 2021
  - Event: Tournament total
  - Confidence: high
  - Currency: GBP
  - `prizeMoneyScope.numeratorCategory`: `competition_prize_money`
  - Prize pool: £35.016m
  - Revenue: £287.970m, `tournament_revenue`
  - Profit/surplus: £43.331m, `tournament_profit`

## Source Verification

Roland Garros was rechecked first:

- Official Roland Garros 2023 article: `https://www.rolandgarros.com/en-us/article/roland-garros-2023-prize-money-increase-draws`
  - It states the €49.6m headline total and discusses increases across first-round, qualifying, wheelchair, and quad prize money.
  - It did not verify a clean support/per-diem split.
- Secondary Roland Garros 2023 split lead: `https://pt.wikipedia.org/wiki/Torneio_de_Roland_Garros_de_2023#Premia%C3%A7%C3%A3o`
  - It separates listed events from an `other events + estimated per diem` bundle, which is not a clean full-tournament competition-prize split.
- Secondary Roland Garros 2022 split lead: `https://pt.wikipedia.org/wiki/Torneio_de_Roland_Garros_de_2022#Premia%C3%A7%C3%A3o`
  - It has the same bundled other-events-plus-per-diem source shape.
- Roland Garros 2021 was not normalized because no official clean split was verified in this pass.

Wimbledon 2021 verification:

- The current official Wimbledon Prize Money and Finance page carries the 2021 £35.016m total prize-money historical row.
- The current page is an official source for the amount, but it does not expose the newer 2022-2026 PDF subtotal shape that separates total tennis events prize money from estimated per diems.
- The secondary 2021 tournament-page cross-check says the £35.016m prize-money figure excludes accommodation and COVID testing support.
- The AELTC Championships Ltd 2021 accounts PDF is scanned. Relevant pages were rendered and inspected visually:
  - Strategic report/company role: AELTC Championships Ltd undertakes day-to-day operations and is the principal contracting party for The Championships.
  - Results: turnover £287.970m and operating profit £43.331m.
  - Profit and loss account: confirms turnover and operating profit values.
  - Accounting policy notes: financial statements reflect the results of, and division of surplus arising from, The Championships.
  - Caveat: 2021 operating profit includes £6.673m in insurance income related to the cancelled 2020 Championships.

## Files Changed

- `src/data/raw/source-metadata/grandSlam2025Sources.json`
- `src/data/normalized/grandSlam2025MensSingles.json`
- `src/data/static/seedDatasetMetadata.json`
- `src/test/dashboardMetrics.test.ts`
- `src/test/fixtures/seedDatasetExpectations.ts`
- `README.md`
- `docs/ARCHITECTURE.md`
- `docs/DATA_MODEL.md`
- `docs/DATA_SOURCES.md`
- `docs/DATA_CAVEATS.md`
- `docs/FUTURE_WORK.md`
- `docs/PROJECT_PLAN.md`
- `docs/TASK_LOG.md`
- `CHANGELOG.md`
- `LEARNINGS.md`

## Tests And Checks

- JSON parse validation for static data files - passed.
- `npm run test -- src/test/dashboardMetrics.test.ts` - passed, 34 tests.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 49 tests.
- `npm run build` - passed.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `git diff --check` - passed.

## Caveats

- Wimbledon 2021 is not the same source shape as Wimbledon 2022-2026. The 2021 row uses the official historical total prize-money line and a secondary support-exclusion cross-check, not a year-specific official PDF that separates total tennis events prize money from estimated per diems.
- The 2021 profit denominator is AELTC Championships Ltd operating profit before finance income, division of net available surplus to LTA Operations, tax, and dividends. It includes £6.673m in insurance income related to the cancelled 2020 Championships.
- Net available surplus of £38.829m, after-tax profit, dividends, and AELTC/LTA organization-level values are not used as denominators.
- Wimbledon 2026 revenue/profit remain unavailable until same-year AELTC Championships Ltd accounts exist.
- Non-Wimbledon revenue/profit remain unavailable unless a tournament-specific compatible denominator is verified.
- US Open 2023 remains unnormalized.
- Do not pull data before 2021 for any Slam in the current manual expansion phase.

## Next Recommended Task

Perform a deeper Roland Garros 2023/2022/2021 official-source archive audit.

Add a clean `competition_prize_money` row only if official/source semantics distinguish competition prize money from per diems, support, legends/exhibition payments, or other compensation. If Roland Garros 2023/2022/2021 remains unclear, document the exhausted leads and consider the 2021-and-newer manual expansion phase complete until new official sources appear.

## Next Thread Seed

Use xhigh effort/thinking for this thread.

You are Codex working in the standalone `tennis-prize-money` repo. Work from latest `main`; the Wimbledon 2021 older-year denominator slice has been completed in the current prior thread.

Before starting, read in full:

- `LEARNINGS.md`
- `AGENTS.md`
- `README.md`
- `docs/TASK_LOG.md`
- `docs/DATA_MODEL.md`
- `docs/DATA_SOURCES.md`
- `docs/DATA_CAVEATS.md`
- `docs/FUTURE_WORK.md`
- `docs/handoffs/wimbledon-2021-older-year-denominator-slice.md`

Context from the completed Wimbledon 2021 slice:

- Static dataset schema remains version `2`.
- `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.
- Dashboard answerability coverage is now `5/25` for revenue and profit/surplus.
- `wimbledon-2021-tournament-total` is a high-confidence tournament-total `competition_prize_money` row using the official Wimbledon historical £35.016m total prize-money line, a secondary support-exclusion cross-check, and AELTC Championships Ltd 2021 denominators.
- Wimbledon 2021 revenue is £287.970m turnover from AELTC Championships Ltd accounts.
- Wimbledon 2021 profit/surplus is £43.331m operating profit from AELTC Championships Ltd accounts.
- The 2021 profit denominator includes £6.673m in insurance income related to the cancelled 2020 Championships; keep that caveat visible.
- The 2021 Wimbledon source shape is not the same as the 2022-2026 prize-money PDFs because no year-specific official PDF subtotal split was verified.
- Roland Garros 2023/2022/2021 were rechecked lightly; no clean row was normalized because the available source leads did not verify a full tournament-total competition-prize subtotal separated from support/per diem/other compensation.
- Keep US Open 2023 unnormalized unless a future compatible source supplies the full clean subtotal/split.
- Keep non-Wimbledon revenue and profit/surplus unavailable unless a tournament-specific compatible financial denominator is verified.
- The current manual historical data-pull floor is 2021 across every Grand Slam; do not pull data before 2021 for any Slam in this phase.

Goal:
Continue 2021-and-newer primary-question data expansion only where official/source semantics remain compatible, or document the coverage closure if remaining 2021-and-newer leads stay incompatible.

Expected work:

- Verify official/source semantics before adding any real row.
- Keep broader total prize money/per-diem/support lines separate from clean competition prize money.
- Keep currency, numerator category, denominator kind, source confidence, and caveats explicit.
- Preserve existing row order so `wimbledon-2025-tournament-total` remains the first default answerable row.
- Do not fabricate real data.
- Do not pull pre-2021 data for any Slam in the current expansion phase.
- Recommended next slice: perform a deeper Roland Garros 2023/2022/2021 official-source archive audit and add a clean `competition_prize_money` row only if official/source semantics distinguish competition prize money from per diems, support, legends/exhibition payments, or other compensation.
- If Roland Garros 2023/2022/2021 remains unclear, leave rows unnormalized and document the exhausted leads in the appropriate docs.
- Keep US Open 2023 unnormalized unless a future compatible source supplies the full clean subtotal/split.
- Update tests and dashboard behavior only as needed; schema should stay version `2` unless a verified source shape truly requires a contract change.
- Update README, data model, sources, caveats, future work, task log, LEARNINGS, changelog if appropriate, and create a new handoff.
- Run lint, typecheck, tests, build, refresh validation, and `git diff --check`.
- Commit and push to `main` when complete.
- If creating another Codex thread, it must use xhigh effort/thinking and the seed prompt must say: "Use xhigh effort/thinking for this thread."
