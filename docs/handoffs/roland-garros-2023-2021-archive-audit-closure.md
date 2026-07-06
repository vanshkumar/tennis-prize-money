# Roland Garros 2023/2022/2021 Archive Audit Closure

Date: 2026-07-06

Branch: `main`

Implementation commit: `8f08abc` (`docs: close roland garros archive audit`)

Push status: Pending until this handoff is committed and pushed.

## Summary

This slice closed the recommended deeper Roland Garros 2023/2022/2021 official-source archive audit without changing schema version `2` and without adding any real data rows.

`wimbledon-2025-tournament-total` remains the first default answerable primary-question row. Dashboard answerability coverage remains `5/25` for both revenue and profit/surplus. The static dataset remains at 25 records.

The conclusion is conservative: current known Roland Garros 2023/2022/2021 sources do not verify a clean full tournament-total `competition_prize_money` subtotal separated from per diem, support, legends/exhibition payments, other events, or undisclosed compensation. Those rows remain unnormalized.

## Source Audit

Official/source archive path:

- Official Roland Garros 2023 article: `https://www.rolandgarros.com/en-us/article/roland-garros-2023-prize-money-increase-draws`
  - Verified text says Roland-Garros 2023 prize money totaled EUR 49.6m and describes increases for first-round losers, singles, qualifying, wheelchair/quad competitions, and doubles.
  - It does not publish a clean full tournament competition-prize subtotal separated from support/per-diem semantics.
- Internet Archive CDX, official English article candidates:
  - Queried `www.rolandgarros.com/en-us/article/*` for 2021-2023 and filtered for prize/money/dotation/remuneration/compensation.
  - Candidate path surfaced the 2023 official prize-money article and no compatible 2022/2021 official prize-money article.
- Internet Archive CDX, official French article candidates:
  - Queried `www.rolandgarros.com/fr-fr/article/*` for 2021-2023 and filtered for prix/dotation/prize/money/remuneration/compensation.
  - Candidate path surfaced the French 2023 dotation article and no compatible 2022/2021 official prize-money article.

Secondary split leads:

- 2023 secondary split: `https://pt.wikipedia.org/wiki/Torneio_de_Roland_Garros_de_2023#Premia%C3%A7%C3%A3o`
  - Lists total prize money of €49.600m.
  - Splits €47.515m for listed events and €2.085m for `Outros eventos + per diem (estimado)`.
  - Because other events and estimated per diem are bundled, this is not a clean full competition-prize subtotal.
- 2022 secondary split: `https://pt.wikipedia.org/wiki/Torneio_de_Roland_Garros_de_2022#Premia%C3%A7%C3%A3o`
  - Lists total prize money of €43.600m.
  - Splits €42.9886m for listed events and €0.6114m for `Outros eventos + per diem (estimado)`.
  - Notes mixed-doubles prize money was not separately disclosed; source path cites ATP/WTA secondary pages rather than an official Roland Garros split.
- 2021 secondary split: `https://pt.wikipedia.org/wiki/Torneio_de_Roland_Garros_de_2021#Premia%C3%A7%C3%A3o`
  - Lists total prize money of €34.367216m.
  - Splits €34.023218m for listed events and €0.343998m for `Outros eventos + per diem (estimado)`.
  - Notes some wheelchair and mixed-doubles values were not separately disclosed.

## Data Decision

No Roland Garros 2023, 2022, or 2021 tournament-total `competition_prize_money` row was added.

Reasons:

- The official 2023 article is an amount anchor but not a clean split.
- No compatible official 2022 or 2021 article was found in the archive candidate path.
- Secondary split leads bundle other events with estimated per diem or contain undisclosed components.
- Current project rules require broader total prize money, per diem, support, legends/exhibition payments, and other compensation to remain separate from clean competition prize money.

## Files Changed

- `README.md`
- `docs/DATA_MODEL.md`
- `docs/DATA_SOURCES.md`
- `docs/DATA_CAVEATS.md`
- `docs/FUTURE_WORK.md`
- `docs/TASK_LOG.md`
- `docs/handoffs/roland-garros-2023-2021-archive-audit-closure.md`
- `CHANGELOG.md`
- `LEARNINGS.md`
- `src/test/dashboardMetrics.test.ts`
- `src/data/static/seedDatasetMetadata.json`

## Tests And Checks

- Official Roland Garros 2023 article text verification - completed.
- Internet Archive CDX official English/French article candidate audit for 2021-2023 - completed.
- Secondary Roland Garros 2023/2022/2021 split-lead recheck - completed.
- `npm run test -- --run src/test/dashboardMetrics.test.ts` - passed, 34 tests.
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run test` - passed, 4 test files and 49 tests.
- `npm run refresh:data` - passed; validated schema-version-2 static JSON and updated `lastRefreshedAt`.
- `npm run build` - passed.
- `git diff --check` - passed.

## Caveats

- This is a coverage closure with known sources, not proof that a clean Roland Garros historical subtotal does not exist anywhere.
- Do not promote the 2023 €49.6m headline, 2022 €43.6m headline, or 2021 €34.367216m headline into `competition_prize_money` unless a future official/source split resolves support and per-diem semantics.
- Keep US Open 2023 unnormalized under the same rule until a source supplies a full clean subtotal or support split.
- Keep non-Wimbledon revenue/profit unavailable unless a tournament-specific compatible financial denominator is verified.
- Do not pull data before 2021 for any Slam in the current manual expansion phase.

## Next Recommended Task

No immediate successor data-expansion thread is recommended from the currently known 2021-and-newer Grand Slam leads. Future work should wait for a new compatible official/source split, or move to a separately scoped task such as source-adapter implementation, deployment verification, maintenance, or a new explicitly approved expansion phase.

If another Codex thread is created for this project, it must use xhigh effort/thinking and its seed prompt must include: "Use xhigh effort/thinking for this thread."
