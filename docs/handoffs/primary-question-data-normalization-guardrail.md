# Primary Question Data Normalization Guardrail

## Task Completed

Extended the data model and metric engine so the dashboard can distinguish clean competition prize money from broader player compensation/support totals.

The US Open 2025 modeling blocker is now handled by schema and calculation guardrails: total player compensation can be represented as context, but it cannot be used as the numerator for prize money / revenue or prize money / profit/surplus.

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
- `docs/REFRESH_PIPELINE.md`
- `docs/TASK_LOG.md`
- `docs/handoffs/primary-question-data-normalization-guardrail.md`
- `src/data/dashboardDataset.ts`
- `src/data/normalized/grandSlam2025MensSingles.json`
- `src/data/raw/source-metadata/grandSlam2025Sources.json`
- `src/data/schemas.ts`
- `src/data/static/seedDatasetMetadata.json`
- `src/lib/dashboardMetrics.ts`
- `src/lib/metricEngine.ts`
- `src/pages/DashboardPage.tsx`
- `src/test/dashboardMetrics.test.ts`
- `src/test/dataValidation.test.ts`
- `src/test/fixtures/seedDatasetExpectations.ts`

## Current Branch

`main`

## Commit Hash

Implementation commit: `5a0205c` (`feat: guard prize money numerator semantics`).

## Push Status

Pushed to `origin/main`.

## Commands Run And Results

- `cat LEARNINGS.md` - read project memory before starting.
- `git status --short --branch` - started clean on `main...origin/main`.
- Read required docs: `AGENTS.md`, `README.md`, `docs/TASK_LOG.md`, `docs/DATA_MODEL.md`, `docs/DATA_SOURCES.md`, `docs/DATA_CAVEATS.md`, `docs/FUTURE_WORK.md`.
- Attempted to read `docs/handoffs/primary-question-data-normalization-slice.md`; it was not present in this standalone checkout.
- Read available predecessor handoff: `docs/handoffs/primary-question-visual-rehash-and-data-sweep.md`.
- Web source check: official US Open 2025 compensation URLs remained non-parseable here; AP was the parseable corroboration for nearly $85m competition prize money and $90m total player compensation.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 38 tests.
- `npm run build` - passed.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.

All npm commands used the known working Node path:

```bash
PATH=/Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin:/usr/bin:/bin:/usr/sbin:/sbin /Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin/npm ...
```

## Implementation Notes

- Static dataset schema is now version `2`.
- Every record requires `prizeMoneyScope`:
  - `type`: `event_main_draw` or `tournament_total`
  - `numeratorCategory`: `competition_prize_money` or `total_player_compensation`
  - `notes`
- Existing AO, Roland Garros, Wimbledon, and US Open men's singles rows are marked as `competition_prize_money`.
- Added `us-open-2025-total-player-compensation` as a `tournament_total` / `total_player_compensation` row for the reported $90m 2025 US Open total player compensation.
- Added official US Open release metadata plus AP corroboration metadata for the compensation split.
- The metric engine now returns `incompatible_numerator_kind` before computing financial ratios from non-competition-prize numerators.
- Dashboard labels and caveats now show total player compensation as context and mark it as not used in the primary revenue/profit answer.
- Revenue and profit/surplus remain unavailable for the US Open. USTA organization-level financials were not normalized as tournament denominators.

## Known Issues

- The official US Open 2025 release URL is identified but still not parseable in this environment.
- The parseable 2025 US Open split is from AP, so the normalized full-tournament US Open row is total player compensation, not a clean competition-prize-money total.
- The AP-described nearly $85m competition-prize total was not normalized as a numeric row because it is approximate and not official/parseable from USTA here.
- No compatible tournament-level revenue, profit, or surplus denominators were added.

## Next Task Objective

Normalize the first primary-question-ready clean competition-prize-money and denominator slice. Wimbledon remains the best next candidate because official Wimbledon total-prize PDFs and AELTC Championships Ltd filings provide the strongest source path. Keep operating-company turnover/profit caveats explicit and do not treat distributions or organization-level values as tournament profit without a compatible source bridge.

The next Codex thread for this project must use xhigh effort/thinking, and its seed prompt must include: `Use xhigh effort/thinking for this thread.`
