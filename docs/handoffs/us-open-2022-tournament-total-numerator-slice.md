# US Open 2022 Tournament-Total Numerator Slice

## Task Completed

Added `us-open-2022-tournament-total` as a prior-year US Open tournament-total `competition_prize_money` numerator row after rechecking official/source semantics.

Also added `us-open-2022-total-player-compensation` as a separate `total_player_compensation` context row so the broader per-diem-inclusive total prize-money value is not used as a clean revenue/profit numerator.

The row does not answer the primary revenue/profit-share question yet:

- competition prize money / revenue: unavailable
- competition prize money / profit/surplus: unavailable

The dashboard answerability coverage is now `4/23` for both revenue and profit/surplus. `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.

## Source Verification

- Current official US Open prize-money page: `https://www.usopen.org/en_US/visit/prize_money.html`
  - Rendered browser verification showed the current 2025 prize-money table and US$90.0m total player compensation.
  - The current page did not expose a 2022 historical table or per-diem split.
- Archived official US Open 2022 prize-money page: `https://web.archive.org/web/20220904014635/https://www.usopen.org/en_US/visit/prize_money.html`
  - The archive URL and official 2022 US Open page title were verified in-browser.
  - The archived body did not expose usable prize-money text in this environment; only page shell text was readable.
  - This source is retained as official provenance, not as the source of the clean split.
- Secondary cross-check: `https://pt.wikipedia.org/wiki/US_Open_de_2022#Premia%C3%A7%C3%A3o`
  - The source cites the official US Open prize-money page and ATP Tour.
  - Cross-checks US$56.4981m in listed professional event payouts.
  - Cross-checks US$1.032m in wheelchair event payouts.
  - Cross-checks US$2.5719m in per diem and US$60.102m total prize money.
  - Used as corroboration for keeping per diem outside the clean numerator.
- Derived clean competition-event payout subtotal:
  - Listed professional event payouts: US$56.4981m.
  - Wheelchair event payouts: US$1.032m.
  - Clean competition subtotal: US$57.5301m.
  - Total prize money/player compensation context: US$60.102m.
- No US Open-specific tournament revenue/profit/surplus denominator was added.
  - USTA organization-level financials remain out of US Open tournament ratios unless a future source explicitly bridges the scope.

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
- `docs/handoffs/us-open-2022-tournament-total-numerator-slice.md`
- `src/data/normalized/grandSlam2025MensSingles.json`
- `src/data/raw/source-metadata/grandSlam2025Sources.json`
- `src/data/static/seedDatasetMetadata.json`
- `src/test/dashboardMetrics.test.ts`
- `src/test/fixtures/seedDatasetExpectations.ts`

## Current Branch

`main`

## Commit Hash

Implementation commit: `31a5f1e` (`feat: add us open 2022 numerator slice`).

## Push Status

Pending until the final handoff commit is pushed.

## Commands Run And Results

- `git status --short --branch` - started clean on `main...origin/main`.
- Read required docs: `LEARNINGS.md`, `AGENTS.md`, `README.md`, `docs/TASK_LOG.md`, `docs/DATA_MODEL.md`, `docs/DATA_SOURCES.md`, `docs/DATA_CAVEATS.md`, `docs/FUTURE_WORK.md`, and `docs/handoffs/us-open-2021-tournament-total-numerator-slice.md`.
- Used web/source search to identify the 2022 US Open prize-money page references and secondary split.
- Used rendered in-app browser verification for the current official US Open prize-money page; it exposed the current 2025 table only.
- Used rendered in-app browser verification for the archived official US Open 2022 prize-money page URL; the official page title was verified, but the archived body was not usable.
- Static JSON parse validation - passed.
- `npm run test -- --run src/test/dashboardMetrics.test.ts` - passed, 33 tests.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 48 tests.
- `npm run build` - passed.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `git diff --check` - passed.
- `git add ...` with explicit changed paths - initial sandboxed attempt failed on `.git/index.lock`, approved retry passed.
- `git commit -m "feat: add us open 2022 numerator slice"` - initial sandboxed attempt failed on `.git/index.lock`, approved retry created implementation commit `31a5f1e`.

All npm commands used the known working Node path:

```bash
PATH=/Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin:/usr/bin:/bin:/usr/sbin:/sbin /Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin/npm ...
```

## Implementation Notes

- No schema change was needed; schema version remains `2`.
- Added source metadata:
  - `us-open-2022-prize-money-page`
  - `us-open-2022-secondary-split-crosscheck`
- Added record `us-open-2022-tournament-total`:
  - `prizeMoneyScope.type: "tournament_total"`
  - `prizeMoneyScope.numeratorCategory: "competition_prize_money"`
  - `prizePool.amount: 57530100`
  - `prizePool.currency: "USD"`
  - `prizePool.status: "derived"`
  - `confidence: "medium"`
  - `revenue.status: "unavailable"`
  - `profitOrSurplus.status: "unavailable"`
- Added record `us-open-2022-total-player-compensation`:
  - `prizeMoneyScope.type: "tournament_total"`
  - `prizeMoneyScope.numeratorCategory: "total_player_compensation"`
  - `prizePool.amount: 60102000`
  - `prizePool.currency: "USD"`
  - `prizePool.status: "reported"`
  - `confidence: "medium"`
- Preserved record order so the newer US Open clean/context rows remain before 2022, the 2022 rows remain before 2021, and `wimbledon-2025-tournament-total` remains the first answerable primary-question row.
- Tests now verify high/medium confidence coverage of `13/23` and `10/23`, primary answerability coverage of `4/23`, US Open 2022 total-compensation exclusion, and US Open 2022-over-2021 tournament-total prize-money growth of +5.8%.

## Known Issues And Caveats

- US Open 2022 financial denominators are not normalized because no US Open-specific compatible revenue/profit/surplus source is in the active dataset.
- USTA organization-level financials remain out of US Open tournament denominators unless a future source bridges the scope explicitly.
- The archived official US Open 2022 prize-money page body was not readable in this environment. The clean US$57.5301m row is therefore medium confidence and depends on secondary split corroboration.
- The US$60.102m total-prize-money/player-compensation row is per-diem-inclusive context and is excluded from revenue/profit ratios.
- US Open 2023 remains unnormalized because the official release describes support/expense assistance but does not publish a complete clean staged-event subtotal or support split.
- Non-Wimbledon revenue and profit/surplus denominators remain unavailable.
- The current manual historical data-pull floor is 2021 for every Slam; do not expand before 2021 in the current phase.
- The file names `grandSlam2025Sources.json` and `grandSlam2025MensSingles.json` are historical and now contain tournament-total, context, prior-year, and 2026 rows; no filename/schema migration was needed for this slice.

## Assumptions Made

- The secondary 2022 split is acceptable as corroboration for keeping per diem outside the clean numerator, but not strong enough to make the 2022 clean row high confidence.
- It is safer to leave the archived official page as provenance only than to imply that it directly supplied the readable split in this environment.
- It is safer to keep US Open 2023 unnormalized than to infer a support split from an incomplete official payout table.
- It is safer to leave US Open 2022 revenue/profit unavailable than to map USTA organization-level financials to the tournament without an explicit bridge.
- The current expansion pass should stop at 2021 for every Slam once 2021-and-newer coverage is complete.

## Next Task Objective

- Continue primary-question data expansion only where official/source semantics remain compatible.
- Keep broader total prize money/per-diem/support lines separate from clean competition prize money.
- Keep currency, numerator category, denominator kind, source confidence, and caveats explicit.
- Preserve `wimbledon-2025-tournament-total` as the first default answerable row.
- Keep schema version `2` unless a verified source shape truly requires a contract change.
- Respect the 2021 historical floor across every Slam in the current manual data-pull phase.
- Recommended candidates:
  - Recheck Roland Garros 2024/2023/2022/2021 tournament-total prize-money source semantics and add a clean `competition_prize_money` row only if official/source semantics distinguish competition prize money from per diems, support, exhibition payments, or other compensation.
  - Recheck Wimbledon 2021 only if an official prize-money PDF or equivalent official source is found and AELTC Championships Ltd accounts retain the clean numerator/operating-company denominator bridge.
  - Keep US Open 2023 unnormalized unless a future source supplies a complete clean staged-event subtotal or support split.
  - Keep non-Wimbledon revenue/profit unavailable unless a tournament-specific compatible financial denominator is verified.
  - Do not pull data before 2021 for any Slam in the current expansion phase.

## Exact Next Thread Instructions

Use xhigh effort/thinking for this thread.

You are Codex working in the standalone `tennis-prize-money` repo. Work from latest `main`; the US Open 2022 tournament-total numerator slice has been completed in the current prior thread. The implementation commit is `31a5f1e` (`feat: add us open 2022 numerator slice`).

Before starting, read in full:

- `LEARNINGS.md`
- `AGENTS.md`
- `README.md`
- `docs/TASK_LOG.md`
- `docs/DATA_MODEL.md`
- `docs/DATA_SOURCES.md`
- `docs/DATA_CAVEATS.md`
- `docs/FUTURE_WORK.md`
- `docs/handoffs/us-open-2022-tournament-total-numerator-slice.md`

Context from the completed US Open 2022 slice:

- Static dataset schema remains version `2`.
- `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.
- `us-open-2022-tournament-total` is a medium-confidence tournament-total `competition_prize_money` row using a derived US$57.5301m clean competition-event payout subtotal.
- `us-open-2022-total-player-compensation` is a separate `total_player_compensation` context row using the US$60.102m per-diem-inclusive total prize-money figure.
- The current official US Open prize-money page was verified in the rendered browser, but it exposes the current 2025 table rather than 2022 historical data.
- The archived official US Open 2022 prize-money page URL and title were verified in the rendered browser, but the archived body exposed only page shell text in this environment.
- A secondary cross-check citing the official page and ATP separates US$56.4981m listed professional event payouts, US$1.032m wheelchair event payouts, US$2.5719m per diem, and US$60.102m total; keep this medium confidence.
- US Open 2023 remains unnormalized because the official release frames US$65.0m as overall player compensation and describes expanded per diem, travel, hotel, meal, and stringing support without a full clean staged-event subtotal/support split.
- US Open revenue and profit/surplus remain unavailable.
- USTA organization-level financials must not be used as US Open tournament revenue/profit unless a source bridge verifies compatibility.
- Dashboard answerability coverage is now `4/23` for revenue and profit/surplus.
- The current manual historical data-pull floor is 2021 across every Grand Slam; do not pull data before 2021 for any Slam in this phase.

Useful source URLs from the prior slice:

- Current official US Open prize-money page: https://www.usopen.org/en_US/visit/prize_money.html
- Archived official US Open 2022 prize-money page: https://web.archive.org/web/20220904014635/https://www.usopen.org/en_US/visit/prize_money.html
- US Open 2022 secondary split cross-check: https://pt.wikipedia.org/wiki/US_Open_de_2022#Premia%C3%A7%C3%A3o
- Official US Open 2023 release checked but not normalized: https://www.usopen.org/en_US/news/articles/2023-08-08/2023_us_open_prize_money_and_player_compensation_to_total_65_million.html
- Likely Wimbledon 2021 PDF checked but currently not found: https://www.wimbledon.com/pdf/The_Championships_2021_Prize_Money.pdf

Goal:
Continue 2021-and-newer primary-question data expansion only where official/source semantics remain compatible.

Expected work:

- Verify official/source semantics before adding any real row.
- Keep broader total prize money/per-diem/support lines separate from clean competition prize money.
- Keep currency, numerator category, denominator kind, source confidence, and caveats explicit.
- Preserve existing row order so `wimbledon-2025-tournament-total` remains the first default answerable row.
- Do not fabricate real data.
- Do not pull pre-2021 data for any Slam in the current expansion phase.
- Recommended next slice: recheck Roland Garros 2024/2023/2022/2021 tournament-total source semantics and add a clean `competition_prize_money` row only if official/source semantics distinguish clean competition prize money from per diems, support, exhibition payments, or other compensation. If semantics are unclear, leave the row unnormalized and choose another compatible 2021-and-newer slice.
- Alternative slice: recheck Wimbledon 2021 only if an official prize-money PDF or equivalent official source can be found and denominator semantics remain compatible.
- Keep US Open 2023 unnormalized unless a future compatible source supplies the full clean subtotal/split.
- Keep non-Wimbledon revenue and profit/surplus unavailable unless a tournament-specific compatible financial denominator is verified.
- Update tests and dashboard behavior only as needed; schema should stay version `2` unless a verified source shape truly requires a contract change.
- Update README, data model, sources, caveats, future work, task log, LEARNINGS, changelog if appropriate, and create a new handoff.
- Run lint, typecheck, tests, build, refresh validation, and `git diff --check`.
- Commit and push to `main` when complete.
- If creating another Codex thread, it must use xhigh effort/thinking and the seed prompt must say: "Use xhigh effort/thinking for this thread."

The next Codex thread for this project must be created with xhigh effort/thinking.
