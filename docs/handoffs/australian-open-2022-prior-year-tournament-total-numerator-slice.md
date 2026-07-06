# Australian Open 2022 Prior-Year Tournament-Total Numerator Slice

## Task Status

Local implementation and verification are complete, but commit, push, and next-thread creation are blocked.

The blocked step is git metadata write access: `git add` with required escalation was rejected because this Codex environment hit its approval usage limit. No workaround was attempted after that rejection.

The completed local row is `australian-open-2022-tournament-total`.

The row does not answer the primary revenue/profit-share question yet:

- competition prize money / revenue: unavailable
- competition prize money / profit/surplus: unavailable

The dashboard answerability coverage is now `4/16` for both revenue and profit/surplus. `wimbledon-2025-tournament-total` remains the first default answerable primary-question row.

## Source Verification

- Official Tennis Australia PDF: `https://www.tennis.com.au/wp-content/uploads/2025/01/AO25-Prize-Money.pdf`
  - Verified the PDF title/source shape is Australian Open prize money for 2021-2025.
  - Verified the 2022 Australian Open total prize-money line is A$74.0m.
  - Verified the PDF states all figures are in Australian dollars.
  - The PDF does not identify a separate player-support, per-diem, travel, hotel, or total-compensation component within the A$74.0m total, so the row is normalized as `competition_prize_money`.
- No AO-specific tournament revenue/profit/surplus denominator was added.
  - Tennis Australia organization-level financials remain out of AO tournament ratios unless a future source explicitly bridges the scope.

## Files Changed Locally

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
- `docs/handoffs/australian-open-2022-prior-year-tournament-total-numerator-slice.md`
- `src/data/normalized/grandSlam2025MensSingles.json`
- `src/data/static/seedDatasetMetadata.json`
- `src/test/dashboardMetrics.test.ts`
- `src/test/fixtures/seedDatasetExpectations.ts`

## Current Branch

`main`

## Commit And Push Status

- Implementation commit: not created yet.
- Push status: not pushed.
- Blocker: approval usage limit rejected the required escalated `git add` command.

## Commands Run And Results

- `git status --short --branch` - started clean on `main...origin/main`.
- `git fetch origin main` - passed; local `main` matched `origin/main` at `59321e8`.
- Read required docs: `LEARNINGS.md`, `AGENTS.md`, `README.md`, `docs/TASK_LOG.md`, `docs/DATA_MODEL.md`, `docs/DATA_SOURCES.md`, `docs/DATA_CAVEATS.md`, `docs/FUTURE_WORK.md`, and `docs/handoffs/australian-open-2023-prior-year-tournament-total-numerator-slice.md`.
- Used web/source verification for the official Tennis Australia `AO25-Prize-Money.pdf` source.
- `npm run test -- --run src/test/dashboardMetrics.test.ts` - passed, 33 tests.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 48 tests.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `npm run build` - passed.
- `git diff --check` - passed.
- `git add ...` with explicit changed paths - blocked by approval usage limit before staging.

All npm commands used the known working Node path:

```bash
PATH=/Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin:/usr/bin:/bin:/usr/sbin:/sbin /Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin/npm ...
```

## Implementation Notes

- No schema change was needed; schema version remains `2`.
- Reused source metadata id `ao-2025-prize-money-pdf`.
- Added record `australian-open-2022-tournament-total`:
  - `prizeMoneyScope.type: "tournament_total"`
  - `prizeMoneyScope.numeratorCategory: "competition_prize_money"`
  - `prizePool.amount: 74000000`
  - `prizePool.currency: "AUD"`
  - `prizePool.status: "official"`
  - `revenue.status: "unavailable"`
  - `profitOrSurplus.status: "unavailable"`
- Preserved record order so Australian Open 2022 follows Australian Open 2023, and `wimbledon-2025-tournament-total` remains the first answerable primary-question row.
- Tests now verify the 2022 AO row, high/medium confidence coverage of `12/16` and `4/16`, primary answerability coverage of `4/16`, AO 2025-over-2024 growth of +11.6%, AO 2024-over-2023 growth of +13.1%, and AO 2023-over-2022 growth of +3.4%.

## Known Issues And Caveats

- Australian Open 2022 financial denominators are not normalized because no AO-specific compatible revenue/profit/surplus source is in the active dataset.
- Tennis Australia organization-level annual-report values remain out of AO tournament denominators unless a future source bridges the scope explicitly.
- The AO25 PDF does not show a separate support/per-diem line; if a future source separates support or total compensation from competition prize money, keep that support outside the clean numerator row.
- Non-Wimbledon revenue and profit/surplus denominators remain unavailable.
- The file names `grandSlam2025Sources.json` and `grandSlam2025MensSingles.json` are historical and now contain tournament-total, context, prior-year, and 2026 rows; no filename/schema migration was needed for this slice.

## Assumptions Made

- The AO25 PDF's 2022 `TOTAL` line is semantically comparable to the 2025, 2024, and 2023 AO tournament-total prize-money rows because it is in the same official prize-money table and no support component is separated.
- It is safer to leave AO 2022 revenue/profit unavailable than to map Tennis Australia organization-level financials to the tournament without an explicit bridge.

## Resume Objective

When approval capacity is available:

- Stage the explicit changed paths.
- Commit the local AO 2022 slice, likely with `feat: add australian open 2022 numerator slice`.
- Push `main` to `origin`.
- Update this handoff with the implementation commit hash and push status.
- Create the next xhigh Codex thread only after the push succeeds.

Recommended next data slice after this one is pushed:

- Recheck the official Tennis Australia AO25 prize-money PDF source semantics and add Australian Open 2021 tournament-total `competition_prize_money` only if the source remains compatible.
- Keep Australian Open 2021 revenue and profit/surplus unavailable unless an AO-specific compatible financial denominator is verified.
- Preserve `wimbledon-2025-tournament-total` as the first default answerable row.
- Keep schema version `2` unless a verified source shape truly requires a contract change.
- Keep total player compensation/support separate from competition prize money.

## Exact Resume Thread Instructions

Use xhigh effort/thinking for this thread.

You are Codex working in the standalone `tennis-prize-money` repo. The Australian Open 2022 prior-year tournament-total numerator slice is locally implemented and verified, but not committed or pushed because the prior thread hit a Codex approval usage limit when attempting the required escalated `git add`.

Before starting, read in full:

- `LEARNINGS.md`
- `AGENTS.md`
- `README.md`
- `docs/TASK_LOG.md`
- `docs/DATA_MODEL.md`
- `docs/DATA_SOURCES.md`
- `docs/DATA_CAVEATS.md`
- `docs/FUTURE_WORK.md`
- `docs/handoffs/australian-open-2022-prior-year-tournament-total-numerator-slice.md`

Goal:
Complete the task boundary for the locally verified AO 2022 slice.

Expected work:

- Check git status and inspect the existing local diff.
- Do not discard or overwrite local changes.
- Re-run any checks needed if the working tree has changed since the handoff; at minimum run `git diff --check`.
- Stage explicit paths only.
- Commit with a clear message such as `feat: add australian open 2022 numerator slice`.
- Push `main` to `origin`.
- Update `docs/TASK_LOG.md` and this handoff with the implementation commit hash and pushed status.
- After push, create the next Codex thread with xhigh effort/thinking. The seed prompt must say: "Use xhigh effort/thinking for this thread."
