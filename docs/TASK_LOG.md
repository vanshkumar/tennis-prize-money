# Task Log

## 2026-07-05 - Task 0: Repository Reconnaissance And Execution Plan

Status: Complete

Branch: `feat/tennis-prize-economics-dashboard`

Summary:

- Confirmed `tennis-prize-money/` is an app folder inside the parent `vanshkumar.github.io` Git repo.
- Confirmed parent repo is an Astro 5 site deployed to GitHub Pages.
- Confirmed deployed sibling apps use React + Vite with app-local npm packages and subpath deployment.
- Selected React + TypeScript + Vite with npm and `base: '/tennis-prize-money/'` for the dashboard.
- Created app-local agent instructions, project plan, task log, and Task 0 handoff.
- Documented that every new Codex chat thread created for the project must use xhigh effort/thinking.

Checks:

- `git status --short --branch` from the parent repo.
- `git rev-parse --show-toplevel`.
- App folder inspection via `find . -maxdepth 3 -print`.
- Parent orientation docs inspected: `README.md`, `TECH_STACK.md`, `.github/workflows/deploy.yml`.
- Documentation consistency scan for stack/deploy/xhigh requirements.
- Follow-up documentation pass to make xhigh effort/thinking mandatory in thread creation tool settings and seed prompts.
- No app-level lint, test, typecheck, or build commands exist yet.

Next:

- Task 1 should scaffold the React + TypeScript + Vite app and build the baseline mock dashboard.

## 2026-07-05 - Task 1: Scaffold The App And Baseline Dashboard

Status: Complete

Branch: `feat/tennis-prize-economics-dashboard`

Summary:

- Confirmed the thread started on pushed Task 0 commit `e6d58e7c9a0dbb8eb16691703be85920ef765a45`.
- Created an app-local React 18 + TypeScript + Vite scaffold with npm scripts for dev, lint, typecheck, test, and build.
- Configured Vite with `base: '/tennis-prize-money/'`.
- Added React Router page structure with a baseline dashboard route.
- Added a visibly labeled Task 1 mock/sample JSON dataset using fictional tournament names.
- Built the dashboard shell with filters, KPI placeholders, simple CSS chart placeholders, sources/caveats, last refreshed status, and a disabled refresh placeholder.
- Added README setup instructions and initial architecture documentation.
- Added Vitest smoke/unit tests for mock labels, filtering, KPI helper behavior, and unavailable percentage handling.

Checks:

- `npm run lint` - passed.
- `npm run typecheck` - passed after simplifying the Vite config to avoid Vitest/Vite nested type conflicts.
- `npm run test` - passed, 1 test file and 4 tests.
- `npm run build` - passed.

Next:

- Task 2 should add the validated data model, schemas, data directories, and tested calculation engine, then wire the dashboard to validated data rather than the temporary loose mock objects.

## 2026-07-05 - Task 2: Data Schema, Validation, And Calculation Engine

Status: Complete

Branch: `feat/tennis-prize-economics-dashboard`

Summary:

- Confirmed the thread started on pushed Task 1 commit `c838e35ef1cd932f3d4f8b0a4118443c767e43c9`.
- Added TypeScript data types and runtime validation in `src/data/schemas.ts`.
- Split the visibly labeled mock/sample data into dataset metadata, raw source metadata, and normalized records under `src/data/static/`, `src/data/raw/source-metadata/`, and `src/data/normalized/`.
- Added `src/data/dashboardDataset.ts` so the dashboard imports validated data instead of loose JSON casts.
- Added `src/lib/metricEngine.ts` with calculations for prize pool, finalist payouts, payout ratios, prize-pool share of revenue, prize-pool share of profit/surplus, year-over-year growth, and round payout percentages.
- Preserved semantic distinctions for missing data, zero denominators, negative profit/surplus, incompatible currencies, and incompatible financial denominators.
- Updated the dashboard to render from validated records and structured metric results.
- Added data model and data caveat documentation.
- Expanded Vitest coverage for normal cases, missing data, negative and zero profit/surplus, incompatible currencies, semantically incompatible denominators, and mock data labeling.

Checks:

- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 1 test file and 9 tests.
- `npm run build` - passed.

Next:

- Task 3 should add a small, honest Grand Slam seed dataset using real verified data only when source metadata and semantics are clear, and should update `docs/DATA_SOURCES.md` and caveats.

## 2026-07-05 - Task 3: Initial Data Sourcing And Seed Dataset

Status: Complete

Branch: `feat/tennis-prize-economics-dashboard`

Summary:

- Confirmed the thread started on pushed Task 2 commit `e150e0043e80efa516a9076204a0a2fd7a84c482`.
- Researched 2025 Grand Slam prize-money sources and used official Australian Open and Wimbledon sources where clear.
- Added a sourced 2025 men's singles seed row for each Grand Slam: Australian Open, Roland Garros, Wimbledon, and US Open.
- Kept Roland Garros and US Open rows at medium confidence where source access had limitations.
- Kept revenue and profit/surplus unavailable for every seed record because no clear compatible tournament-level financial denominators were added.
- Replaced mock-only UI language with sourced-data labels, selected-record confidence, source confidence, source notes, and clickable source links.
- Added `docs/DATA_SOURCES.md` plus updated data model, caveats, architecture, and README documentation.
- Replaced mock-focused tests with source/provenance fixtures and weighted prize-pool validation for the seed dataset.

Checks:

- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 1 test file and 15 tests.
- `npm run build` - passed.

Next:

- Task 4 should add real visualizations, filters, empty/unavailable states, responsive layout, and accessibility polish using the sourced seed dataset.

## 2026-07-05 - Task 4: First Real Visualizations And UX Polish

Status: Complete

Branch: `feat/tennis-prize-economics-dashboard`

Summary:

- Confirmed the thread started on pushed Task 3 commit `e865a0b455e332cc60145697c01489f617c73595`.
- Added testable dashboard display helpers for finalist comparisons, financial comparison rows, year-over-year rows, source coverage summaries, and visible caveats.
- Reworked the dashboard filters so zero-match combinations show an explicit empty state instead of silently falling back to the first record.
- Added first-version CSS/SVG visualizations for payout curve by round, winner vs runner-up payout, prize pool vs financial rows, year-over-year growth, and confidence/source coverage.
- Added visible unavailable states for missing revenue, profit/surplus, and prior-year data.
- Improved responsive layout, focus states, labeled filters, reset controls, chart labels, and keyboard-friendly native controls.
- Updated README and architecture documentation for the Task 4 chart/data flow.
- Expanded Vitest coverage for display helpers, filter empty states, unavailable chart rows, and caveat surfacing.

Checks:

- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 1 test file and 19 tests.
- `npm run build` - passed.

Next:

- Task 5 should add the on-demand refresh pipeline, CLI refresh script, GitHub Actions workflow, optional external refresh dispatch integration, and refresh/deployment docs.

## 2026-07-05 - Task 5: On-Demand Refresh Pipeline

Status: Complete

Branch: `feat/tennis-prize-economics-dashboard`

Summary:

- Confirmed the thread started on pushed Task 4 commit `67936909e424d16dc3de7cb36b6ce470a1409fb0`.
- Added a server-side TypeScript refresh pipeline with source-adapter interfaces for fetching raw data, normalizing, validating, merging by id, and writing static JSON outputs.
- Added `npm run refresh:data`, backed by a Node CLI wrapper and a refresh-only TypeScript build config.
- Added safe refresh logging, sanitized error handling, `.env.example`, and `.env` ignore rules.
- Added a manual GitHub Actions workflow at `.github/workflows/tennis-prize-money-refresh.yml` that installs app dependencies, runs tests, refreshes data, commits changed static JSON only, and pushes back to the selected branch.
- Added optional external serverless dispatch code that requires server-side GitHub and refresh tokens and dispatches the refresh workflow without exposing secrets to the browser bundle.
- Wired the dashboard refresh button to an absolute configured external endpoint when present; otherwise it stays in a "Refresh not configured" state and links to refresh docs.
- Added refresh and deployment documentation.
- Added Vitest coverage for the refresh pipeline, mocked fetch adapters, validation failures before writes, safe failure logging, and browser refresh-client behavior.

Checks:

- `npm run build:refresh` - passed after enabling declarations in the refresh TypeScript config.
- `npm run refresh:data` - passed; validated and stabilized static JSON output.
- `npm run lint` - passed.
- `npm run typecheck` - passed after tightening refresh test fixture types.
- `npm run test` - passed, 3 test files and 27 tests.
- `npm run build` - passed after the typecheck fix.

Next:

- Task 6 should harden the v0.1 dashboard and docs, audit for mock leakage/secrets/terminology issues, add future-work and changelog docs, run final checks, commit, push, and prepare PR instructions or a PR.

## 2026-07-05 - Task 6: Final Hardening, Documentation, And v0.1 Release Readiness

Status: Complete

Branch: `feat/tennis-prize-economics-dashboard`

Summary:

- Confirmed the thread started from pushed Task 5 commit `df1a96864d8a0b08326c5765c5d40d29eb38774a`.
- Audited the app for mock data leakage, source labels, terminology, exposed secrets, filter behavior, empty states, and build readiness.
- Added schema hardening so datasets labeled `real` reject mock sources, mock record confidence, and mock value statuses.
- Added validation tests for mock-leakage rejection, paired mock source labels, required source ids, and active seed source metadata completeness.
- Tightened dashboard terminology so unavailable financial rows do not imply reported values, and source rows show labeled source type/confidence.
- Updated README, architecture, data model, data sources, caveats, refresh, deployment, project plan, and future-work docs for v0.1.
- Added `CHANGELOG.md` entry for `v0.1.0` and set the app package version to `0.1.0`.
- Documented high-value next steps in `docs/FUTURE_WORK.md`.

Checks:

- `npm ci` - passed; installed missing locked dependencies in this worktree.
- `npm run lint` - passed after dependencies were installed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 32 tests.
- `npm run build` - passed.

Next:

- Open or review the pull request for `feat/tennis-prize-economics-dashboard`.
- Do not create another implementation thread unless review or CI reveals a concrete bugfix.

## 2026-07-05 - Post-Plan Release Follow-Up

Status: Complete

Branch: `feat/tennis-prize-economics-dashboard`

Summary:

- Confirmed the worktree was detached, then moved it to pushed Task 6 commit `b51a6af8e88b359db2903ac587975b9347bf851a`.
- Confirmed PR #4 was open, non-draft, and mergeable at the Task 6 head before follow-up changes.
- Confirmed the parent Pages workflow did not yet build or copy `tennis-prize-money/` into the combined Pages artifact.
- Added parent workflow steps to install and build the app, copy its Vite output into `site/tennis-prize-money/`, and smoke-check the copied artifact.
- Updated deployment docs, changelog, future-work notes, project memory, and a post-plan handoff for the release follow-up.

Checks:

- `npm ci` - passed; installed locked app dependencies in this worktree.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 32 tests.
- `npm run build` - passed.
- Local artifact smoke check - passed by copying `dist/.` into `/private/tmp/tennis-prize-money-site-check-b51a6af8/tennis-prize-money/`, verifying `index.html`, verifying `assets/`, and checking built HTML for `/tennis-prize-money/assets/`.

Next:

- Commit and push the follow-up to PR #4.
- Re-check PR mergeability and merge only if safe.
- Verify the first GitHub Pages deployment after merge.

## 2026-07-05 - Primary Question Visual Rehash And Data Gathering

Status: Complete

Branch: `feat/tennis-prize-economics-dashboard`

Summary:

- Refocused the dashboard around one primary question: prize money as a percentage of tournament revenue and profit/surplus.
- Replaced the main payout-curve/finalist/year-over-year/coverage visual flow with two primary answer cards, ratio-input summaries, answerability coverage, calculation caveats, and selected-record sources.
- Moved refresh status out of the hero so the answer board appears immediately after the selected comparison, including on mobile.
- Added primary-question dashboard view models and tests for unavailable ratios, answerability coverage, and compatible denominator cases.
- Updated README, architecture, data sources, caveats, data model, future work, changelog, and handoff notes to match the primary-question direction.
- Ran five parallel xhigh research agents for Wimbledon, US Open, Australian Open, Roland Garros, and methodology/data-model fit.
- Recorded the research sweep as leads, not normalized data. Wimbledon is the strongest next candidate; AO and US Open have strong official total-prize-money numerators but only organization-level financials; Roland Garros has secondary revenue leads but no tournament profit/surplus.

Checks:

- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test -- --run` - passed, 4 test files and 34 tests.
- `npm run build` - passed.
- Local Vite visual QA at `http://127.0.0.1:5177/tennis-prize-money/` - desktop and mobile sanity checks passed; mobile had no horizontal overflow and showed the primary answer card in the opening viewport after moving refresh status.

Next:

- Normalize full tournament prize-money totals before adding more revenue/profit ratios.
- Start with Wimbledon because official prize-money PDFs and AELTC Championships Ltd filings provide the clearest candidate numerator and denominator.
- Add AO and US Open tournament-total prize-money numerators while keeping financial ratios unavailable until tournament-specific denominators are found.
- Treat Roland Garros revenue as a secondary-source lead until FFT/Roland Garros official or audited revenue is found.

## 2026-07-05 - Standalone Repository Migration

Status: Complete

Branch: `main`

Implementation commit: `5273060` (`feat: add australian open 2025 numerator slice`)

Summary:

- Initialized `tennis-prize-money/` as a standalone Git repository after extracting it from the parent site workflow.
- Added `origin` as `https://github.com/vanshkumar/tennis-prize-money.git`.
- Confirmed `origin` was reachable and had no branch heads before pushing, so no remote history merge or force-push was needed.
- Added app-local `.gitignore` coverage for generated artifacts including `node_modules/` and `dist/`.
- Created the initial migration commit and recorded the standalone migration note in `LEARNINGS.md`.
- Pushed `main` to `origin` with upstream tracking.

Checks:

- `npm run lint` - passed.
- `npm run test` - passed, 4 test files and 34 tests.
- `npm run build` - passed.

Next:

- Use this standalone repository for future project threads.

## 2026-07-05 - Standalone GitHub Pages Deployment

Status: Complete

Branch: `main`

Implementation commit: `3409eb9` (`feat: add wimbledon 2022 denominator slice`)

Summary:

- Confirmed the standalone repo still uses Vite `base: '/tennis-prize-money/'`, which matches the project-site path.
- Added `.github/workflows/deploy.yml` to build the Vite app and deploy `dist/` through GitHub Pages Actions.
- Kept deployment minimal: no committed `dist/`, no `gh-pages` branch, and no browser/server secrets.
- Updated README and deployment docs to replace the old parent-site artifact instructions with standalone repo deployment instructions.
- Documented that the GitHub Pages source should be changed from branch publishing to `GitHub Actions`.

Checks:

- `npm run build` - passed.

Next:

- Push the workflow to `main`.
- In GitHub repo settings, set Pages Source to `GitHub Actions`.
- Verify the first deployment at `https://vanshkumar.github.io/tennis-prize-money/` and, if inherited custom-domain routing is enabled, `https://vanshkumar.net/tennis-prize-money/`.

## 2026-07-05 - Primary Question Data Normalization Guardrail

Status: Complete

Branch: `main`

Summary:

- Confirmed the standalone repo started clean on `main...origin/main`.
- Read project memory, repo instructions, data docs, future-work notes, and the available primary-question handoff before editing.
- Added schema version `2` with required `prizeMoneyScope.type` and `prizeMoneyScope.numeratorCategory`.
- Marked existing Grand Slam men's singles rows as `competition_prize_money` event-main-draw records.
- Added US Open 2025 total player compensation as a distinct `total_player_compensation` tournament-total context row using the official US Open release URL plus parseable AP corroboration.
- Kept US Open revenue and profit/surplus unavailable; USTA organization-level financials remain separate from tournament denominators.
- Updated metric compatibility checks so revenue/profit ratios require `competition_prize_money` and reject total compensation/support.
- Updated dashboard labels, caveats, tests, README, data model, source inventory, caveats, future work, changelog, and handoff docs for the new numerator semantics.

Checks:

- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 38 tests.
- `npm run build` - passed.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.

Next:

- Continue in the next xhigh Codex handoff thread for the Wimbledon primary-question data slice.

## 2026-07-05 - Wimbledon Primary-Question Denominator Slice

Status: Complete

Branch: `main`

Summary:

- Confirmed latest `main` was at `9576281` (`docs: finalize numerator guardrail handoff`) before editing.
- Verified the official Wimbledon 2025 prize-money PDF. The normalized clean competition-prize numerator is £52.0m total tennis events prize money, excluding £1.5m estimated per diems from the broader £53.5m total prize money line.
- Verified the official Companies House 2025 AELTC Championships Ltd accounts. The company is the principal contracting party for The Championships and reports turnover of £423.626m and operating profit of £52.720m for the year ended 31 July 2025.
- Added `wimbledon-2025-tournament-total` as the first primary-question-ready tournament-total competition-prize row with compatible operating-company revenue/profit denominators.
- Kept the row caveated: AELTC Championships Ltd turnover/profit are operating-company values for The Championships, not after-tax profit, dividends, LTA surplus distributions, or broader organization-level financials.
- Updated the dashboard selection logic so the all-records view prefers the first answerable primary-question record.
- Updated source metadata, normalized data, tests, README, architecture, data model, source inventory, caveats, future work, project plan, changelog, and project memory.

Checks:

- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 41 tests.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `npm run build` - passed.

Next:

- Create the next xhigh Codex handoff thread for the next primary-question data slice.

## 2026-07-05 - Wimbledon 2024 Prior-Year Denominator Slice

Status: Complete

Branch: `main`

Implementation commit: `8c9934a` (`feat: add wimbledon 2024 denominator slice`)

Summary:

- Confirmed latest `main` was up to date with `origin/main` before editing.
- Verified the official Wimbledon 2024 prize-money PDF. The normalized clean competition-prize numerator is £48.55m total tennis events prize money, excluding £1.45m estimated per diems from the broader £50.0m total prize money line.
- Verified the official Companies House 2024 AELTC Championships Ltd accounts. The company is the principal contracting party for The Championships and reports turnover of £406.507m and operating profit of £54.332m for the year ended 31 July 2024.
- Added `wimbledon-2024-tournament-total` as a prior-year tournament-total competition-prize row with compatible operating-company revenue/profit denominators.
- Kept the row caveated: AELTC Championships Ltd turnover/profit are operating-company values for The Championships, not after-tax profit, dividends, LTA surplus distributions, or broader organization-level financials.
- Preserved schema version `2` and the default selected comparison behavior by keeping the 2025 Wimbledon answer before the 2024 prior-year row.
- Updated source metadata, normalized data, tests, README, architecture, data model, source inventory, caveats, future work, project plan, changelog, and project memory.

Checks:

- `npm run test -- --run src/test/dashboardMetrics.test.ts` - passed after fixing a stale fallback expectation exposed by the first focused run.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 42 tests.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `npm run build` - passed.
- `git diff --check` - passed.

Push:

- Pushed implementation commit `5273060` and handoff commit `ac44c92` to `origin/main`.

Next:

- Create the next xhigh Codex handoff thread for the Australian Open tournament-total competition-prize numerator slice, keeping AO revenue/profit unavailable unless an AO-specific compatible denominator is verified.

## 2026-07-05 - Australian Open 2025 Tournament-Total Numerator Slice

Status: Complete

Branch: `main`

Summary:

- Confirmed latest `main` was up to date with `origin/main` before editing.
- Verified official AO/Tennis Australia 2025 prize-money sources: the AO article reports A$96.5m in prize money for Australian Open 2025 and the Tennis Australia PDF lists a 2025 total of A$96.5m with all figures in Australian dollars.
- Added `australian-open-2025-tournament-total` as a tournament-total `competition_prize_money` row using the official A$96.5m total prize pool.
- Kept Australian Open 2025 revenue and profit/surplus unavailable because no AO-specific compatible financial denominator was verified.
- Kept Tennis Australia organization-level revenue/surplus and the broader A$120m Australian Summer of Tennis figure out of AO tournament revenue/profit ratios.
- Preserved schema version `2` and the default dashboard selection behavior; `wimbledon-2025-tournament-total` remains the first answerable primary-question row.
- Updated source metadata, normalized data, tests, README, architecture, data model, source inventory, caveats, future work, project plan, changelog, and project memory.

Checks:

- `npm run test -- --run src/test/dashboardMetrics.test.ts` - passed, 28 tests.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 43 tests.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `npm run build` - passed.
- `git diff --check` - passed.

Next:

- Create the next xhigh Codex handoff thread for the Australian Open 2024 prior-year tournament-total competition-prize numerator slice, keeping AO revenue/profit unavailable unless an AO-specific compatible denominator is verified.

## 2026-07-05 - Australian Open 2024 Prior-Year Tournament-Total Numerator Slice

Status: Complete

Branch: `main`

Summary:

- Confirmed latest `main` was up to date with `origin/main` before editing.
- Verified the official AO/Tennis Australia 2024 prize-money article: it reports A$86.5m in prize money for Australian Open 2024, states all prize-money amounts are in Australian dollars unless specified, and does not identify a separate per-diem or player-support component within the A$86.5m prize pool.
- Added `australian-open-2024-tournament-total` as a prior-year tournament-total `competition_prize_money` row using the official A$86.5m total prize pool.
- Kept Australian Open 2024 revenue and profit/surplus unavailable because no AO-specific compatible financial denominator was verified.
- Kept Tennis Australia organization-level revenue/surplus out of AO tournament revenue/profit ratios.
- Preserved schema version `2` and the default dashboard selection behavior; `wimbledon-2025-tournament-total` remains the first answerable primary-question row.
- Updated source metadata, normalized data, tests, README, architecture, data model, source inventory, caveats, future work, project plan, changelog, and project memory.

Checks:

- `npm run test -- --run src/test/dashboardMetrics.test.ts` - passed, 28 tests.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 43 tests.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `npm run build` - passed.
- `git diff --check` - passed.

Next:

- Create the next xhigh Codex handoff thread for the next primary-question data slice. Recommended next slice: re-check US Open tournament-total source semantics and add a clean competition-prize-money row only if official or otherwise clearly corroborated sources distinguish competition prize money from total player compensation/support.

## 2026-07-05 - US Open 2025 Tournament-Total Numerator Slice

Status: Complete

Branch: `main`

Implementation commit: `109de01` (`feat: add us open 2025 numerator slice`)

Summary:

- Confirmed latest `main` was up to date with `origin/main` before editing.
- Rechecked official US Open/USTA 2025 source semantics. Direct crawler/curl reads still failed or exposed no text, but the rendered official release verified US$90.0m total player compensation and a separate US$5.0m travel/hotel support component before the prize-money breakdown.
- Verified AP corroboration for US$85.0m in 2025 US Open prize money across competitions and US$90.0m total player compensation.
- Added `us-open-2025-tournament-total` as a tournament-total `competition_prize_money` row using US$85.0m, derived by excluding the official US$5.0m support component from the official US$90.0m total player-compensation package.
- Preserved `us-open-2025-total-player-compensation` as a separate `total_player_compensation` context row.
- Kept US Open 2025 revenue and profit/surplus unavailable because no US Open-specific compatible financial denominator was verified.
- Kept USTA organization-level financials out of US Open tournament revenue/profit ratios.
- Preserved schema version `2` and the default dashboard selection behavior; `wimbledon-2025-tournament-total` remains the first answerable primary-question row.
- Updated source metadata, normalized data, tests, README, architecture, data model, source inventory, caveats, future work, project plan, changelog, and project memory.

Checks:

- `npm run test -- --run src/test/dashboardMetrics.test.ts` - passed, 29 tests.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 44 tests.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `npm run build` - passed.
- `git diff --check` - passed.

Push:

- Pushed implementation commit `109de01` and handoff commit `017782e` to `origin/main`.

Next:

- Create the next xhigh Codex handoff thread for the next primary-question data slice. Recommended next slice: re-check Roland Garros tournament-total prize-money source semantics and add a clean competition-prize-money row only if official or otherwise clearly corroborated sources distinguish competition prize money from support/compensation and event-level partial allocations.

## 2026-07-05 - Roland Garros 2025 Total-Compensation Source-Semantics Slice

Status: Complete

Branch: `main`

Implementation commit: `e092178` (`feat: add roland garros compensation context`)

Summary:

- Confirmed latest `main` was up to date with `origin/main` at `d14aed0` before editing.
- Rechecked Roland Garros/French Open 2025 source semantics. AP reports €56.352m in total player compensation and says the total includes per diems and payments to former players taking part in exhibitions.
- Did not add a clean Roland Garros tournament-total `competition_prize_money` row because no official split was verified that separates competition prize money from support/exhibition components.
- Added `roland-garros-2025-total-player-compensation` as a tournament-total `total_player_compensation` context row using €56.352m.
- Preserved `roland-garros-2025-ms` as the existing event-level competition-prize row.
- Kept Roland Garros revenue and profit/surplus unavailable because no Roland Garros-specific compatible financial denominator was verified.
- Kept FFT organization-level financials and secondary revenue leads out of Roland Garros tournament revenue/profit ratios.
- Preserved schema version `2` and the default dashboard selection behavior; `wimbledon-2025-tournament-total` remains the first answerable primary-question row.
- Updated source metadata, normalized data, tests, README, architecture, data model, source inventory, caveats, future work, project plan, changelog, and project memory.
- Primary-question answerability coverage is now `2/11` for both revenue and profit/surplus.

Checks:

- `npm run test -- --run src/test/dashboardMetrics.test.ts` - passed, 30 tests.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 45 tests.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `npm run build` - passed.
- `git diff --check` - passed.

Push:

- Pushed implementation commit `e092178` and handoff commit `8fbe694` to `origin/main`.

Next:

- Create the next xhigh Codex handoff thread for the next primary-question data slice. Recommended next slice: extend the Wimbledon tournament-total denominator series to an older year only if official prize-money PDFs and AELTC Championships Ltd accounts keep the same clean numerator and operating-company denominator semantics.

## 2026-07-05 - Wimbledon 2023 Older-Year Denominator Slice

Status: Complete

Branch: `main`

Summary:

- Confirmed latest `main` was up to date with `origin/main` before editing.
- Verified the official Wimbledon 2023 prize-money PDF. The normalized clean competition-prize numerator is £43.25m total tennis events prize money, excluding £1.45m estimated per diems from the broader £44.7m total prize money line.
- Verified the official Companies House 2023 AELTC Championships Ltd accounts. The company is the principal contracting party for The Championships and reports turnover of £380.156m and operating profit of £53.776m for the year ended 31 July 2023.
- Added `wimbledon-2023-tournament-total` as an older-year tournament-total competition-prize row with compatible operating-company revenue/profit denominators.
- Kept the row caveated: AELTC Championships Ltd turnover/profit are operating-company values for The Championships, not after-tax profit, dividends, LTA surplus distributions, or broader organization-level financials.
- Preserved schema version `2` and the default dashboard selection behavior; `wimbledon-2025-tournament-total` remains the first answerable primary-question row.
- Updated source metadata, normalized data, tests, README, architecture, data model, source inventory, caveats, future work, project plan, changelog, and project memory.
- Primary-question answerability coverage is now `3/12` for both revenue and profit/surplus.

Checks:

- `npm run test -- --run src/test/dashboardMetrics.test.ts` - passed, 31 tests.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 46 tests.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `npm run build` - passed.
- `git diff --check` - passed.

Push:

- Pushed implementation commit `dd4467f` and handoff commit `7f0bd6f` to `origin/main`.

Next:

- Create the next xhigh Codex handoff thread for the next primary-question data slice. Recommended next slice: continue primary-question expansion without weakening source semantics; likely candidates are another Wimbledon older year if official PDFs/accounts remain compatible, or a non-Wimbledon tournament-total numerator/denominator slice only when source semantics are clear.

## 2026-07-05 - Wimbledon 2022 Older-Year Denominator Slice

Status: Complete

Branch: `main`

Summary:

- Confirmed latest `main` was up to date with `origin/main` before editing.
- Verified the official Wimbledon 2022 prize-money PDF. The normalized clean competition-prize numerator is £38.9m total tennis events prize money, excluding £1.45m estimated per diems from the broader £40.35m total prize money line.
- Verified the official Companies House 2022 AELTC Championships Ltd accounts. The company is the principal contracting party for The Championships and reports turnover of £346.640m and operating profit of £47.057m for the year ended 31 July 2022.
- Added `wimbledon-2022-tournament-total` as an older-year tournament-total competition-prize row with compatible operating-company revenue/profit denominators.
- Kept the row caveated: AELTC Championships Ltd turnover/profit are operating-company values for The Championships, not after-tax profit, dividends, LTA surplus distributions, or broader organization-level financials.
- Preserved schema version `2` and the default dashboard selection behavior; `wimbledon-2025-tournament-total` remains the first answerable primary-question row.
- Updated source metadata, normalized data, tests, README, architecture, data model, source inventory, caveats, future work, project plan, changelog, and project memory.
- Primary-question answerability coverage is now `4/13` for both revenue and profit/surplus.

Checks:

- `npm run test -- --run src/test/dashboardMetrics.test.ts` - passed, 32 tests.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 47 tests.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `npm run build` - passed.
- `git diff --check` - passed.

Push:

- Pushed implementation commit `3409eb9` and handoff commit `d723005` to `origin/main`.

Next:

- Create the next xhigh Codex handoff thread for the next primary-question data slice. Recommended next slice: continue primary-question expansion without weakening source semantics; likely candidates are another Wimbledon older year if official PDFs/accounts remain compatible, or a non-Wimbledon tournament-total numerator/denominator slice only when source semantics are clear.

## 2026-07-05 - Wimbledon 2026 Tournament-Total Numerator Slice

Status: Complete

Branch: `main`

Summary:

- Confirmed latest `main` was up to date with `origin/main` at `df9577d` before editing.
- Verified the official Wimbledon 2026 prize-money PDF from the current Wimbledon Prize Money and Finance page.
- Added `wimbledon-2026-tournament-total` as a tournament-total `competition_prize_money` row using £62.55m total tennis events prize money.
- Kept the broader £64.2m total prize money line separate because it includes £1.65m estimated per diems.
- Kept Wimbledon 2026 revenue and profit/surplus unavailable because AELTC Championships Ltd accounts for the year ending 31 July 2026 were not available as of 2026-07-05.
- Preserved schema version `2` and the default dashboard selection behavior; `wimbledon-2025-tournament-total` remains the first answerable primary-question row.
- Updated source metadata, normalized data, tests, README, architecture, data model, source inventory, caveats, future work, project plan, changelog, and project memory.
- Primary-question answerability coverage is now `4/14` for both revenue and profit/surplus.

Checks:

- `npm run test -- --run src/test/dashboardMetrics.test.ts` - passed, 33 tests.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 48 tests.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `npm run build` - passed.
- `git diff --check` - passed.

Push:

- Pushed implementation commit `e5bbe63` and handoff commit `23da6f4` to `origin/main`.

Next:

- Create the next xhigh Codex handoff thread for the next primary-question data slice. Recommended next slice: continue primary-question expansion without weakening source semantics; likely candidates are another Wimbledon older year only if official PDFs/accounts remain compatible, Wimbledon 2026 denominators after official AELTC Championships Ltd accounts exist, or a non-Wimbledon tournament-total numerator/denominator slice only when source semantics are clear.

## 2026-07-05 - Australian Open 2023 Prior-Year Tournament-Total Numerator Slice

Status: Complete

Branch: `main`

Implementation commit: `00ff6ab` (`feat: add australian open 2023 numerator slice`)

Summary:

- Confirmed latest `main` was up to date with `origin/main` at `bb397dd` before editing.
- Verified the official Tennis Australia `AO25-Prize-Money.pdf` source semantics: the 2021-2025 table lists a 2023 Australian Open total prize-money line of A$76.5m and states all figures are in Australian dollars.
- Added `australian-open-2023-tournament-total` as a prior-year tournament-total `competition_prize_money` row using the official A$76.5m total prize-money line.
- Kept Australian Open 2023 revenue and profit/surplus unavailable because no AO-specific compatible financial denominator was verified.
- Kept Tennis Australia organization-level revenue/surplus out of AO tournament revenue/profit ratios.
- Preserved schema version `2` and the default dashboard selection behavior; `wimbledon-2025-tournament-total` remains the first answerable primary-question row.
- Updated source metadata, normalized data, tests, README, architecture, data model, source inventory, caveats, future work, project plan, changelog, and project memory.
- Primary-question answerability coverage is now `4/15` for both revenue and profit/surplus.

Checks:

- `npm run test -- --run src/test/dashboardMetrics.test.ts` - passed, 33 tests.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 48 tests.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `npm run build` - passed.
- `git diff --check` - passed.

Push:

- Pushed implementation commit `00ff6ab` and handoff commit `6e2fa1a` to `origin/main`.

Next:

- Create the next xhigh Codex handoff thread for the next primary-question data slice. Recommended next slice: continue Australian Open older-year numerator expansion with 2022 only if the official AO/Tennis Australia source semantics remain compatible, while keeping AO revenue/profit unavailable unless an AO-specific financial denominator is verified.

## 2026-07-05 - Australian Open 2022 Prior-Year Tournament-Total Numerator Slice

Status: Complete

Branch: `main`

Implementation commit: `6edeb7f` (`feat: add australian open 2022 numerator slice`)

Summary:

- Confirmed latest `main` was up to date with `origin/main` at `59321e8` before editing.
- Verified the official Tennis Australia `AO25-Prize-Money.pdf` source semantics: the 2021-2025 table lists a 2022 Australian Open total prize-money line of A$74.0m and states all figures are in Australian dollars.
- Added `australian-open-2022-tournament-total` as a prior-year tournament-total `competition_prize_money` row using the official A$74.0m total prize-money line.
- Kept Australian Open 2022 revenue and profit/surplus unavailable because no AO-specific compatible financial denominator was verified.
- Kept Tennis Australia organization-level revenue/surplus out of AO tournament revenue/profit ratios.
- Preserved schema version `2` and the default dashboard selection behavior; `wimbledon-2025-tournament-total` remains the first answerable primary-question row.
- Updated normalized data, tests, README, architecture, data model, source inventory, caveats, future work, project plan, changelog, and project memory.
- Primary-question answerability coverage is now `4/16` for both revenue and profit/surplus.

Checks:

- `npm run test -- --run src/test/dashboardMetrics.test.ts` - passed, 33 tests.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 48 tests.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `npm run build` - passed.
- `git diff --check` - passed.

Next:

- Push the implementation and handoff commits to `origin/main`.
- Create the next xhigh Codex handoff thread for the next primary-question data slice. Recommended next slice: continue Australian Open older-year numerator expansion with 2021 only if the official AO/Tennis Australia source semantics remain compatible, while keeping AO revenue/profit unavailable unless an AO-specific compatible financial denominator is verified.
