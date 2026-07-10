# Task Log

## 2026-07-10 - Creative Missing-Slam Recovery

Status: Complete

Branch: `main`

Summary:

- Resumed all interrupted xhigh research tasks with narrower prompts until each produced a final handoff.
- Recovered a continuous official USTA US Open operating-revenue series for 2017-2024 from comparative audited statements.
- Added strict US Open competition-prize/revenue rows for 2017, 2018, 2020, 2023, and 2024; retained existing 2021/2022 rows; and added a 2019 financial-only row because wheelchair and Legends remain bundled.
- Reconstructed clean Roland-Garros competition totals from complete category schedules for 2019, 2020, and 2022-2025, plus provisional medium-confidence 2017/2018 totals.
- Recovered FFT Internationaux de France analytical P&Ls for 2017-2019 and normalized `solde analytique` as explicitly labeled tournament analytical surplus, not statutory net profit.
- Added Roland-Garros tournament revenue for 2017-2025; kept 2021 prize money unavailable because the reconstructed schedules exceed the official headline by EUR6,002.
- Preserved modern US Open and Roland-Garros profit as unavailable rather than deriving it from selected expense lines.
- Recorded the source paths, normalization arithmetic, ratios, and remaining gaps in `docs/handoffs/creative-missing-slam-sourcing-2017-2026.md`.

Checks:

- JSON parse check for all retained data files - passed.
- Source-id integrity check - passed, 69 sources and 47 records.
- Duplicate source-id and record-id checks - passed.
- Remaining coverage gaps: Australian Open denominators, US Open 2019 strict numerator and 2025 revenue, Roland-Garros 2021 strict numerator and modern profit, Wimbledon 2026 accounts.

## 2026-07-09 - Creative Missing-Slam Financial Sourcing

Status: Revenue slice complete

Branch: `main`

Summary:

- Found a USTA audited consolidated financial statement that reports US Open operating revenue directly for 2022 and 2021.
- Added source metadata for the USTA 2022 Affiliates Consolidated Financial Statements.
- Added compatible US Open revenue denominators to the clean 2022 and 2021 competition-prize rows: US$472.172m for 2022 and US$406.172m for 2021.
- Kept US Open profit/surplus unavailable because the audited statements list US Open expense lines but no explicit US Open tournament profit/surplus line is normalized.
- Kept support-inclusive US Open compensation rows excluded from ratios, with revenue denominators attached only to the clean competition-prize rows.
- Recorded Australian Open denominator leads from parallel research: public Tennis Australia annual reports disclose group revenue/surplus, while older accounting-policy notes imply AO-specific ledgers or MOPT revenue-share schedules may exist outside the public reports.
- Rechecked public USTA 2023/2024 financial-statement leads; no primary public PDF path was confirmed in this pass.

Checks:

- JSON parse check for retained data files - passed.
- Source-id integrity check across retained source metadata and normalized records - passed, 41 sources and 33 records.
- `git diff --check` - passed.

## 2026-07-09 - Last-10-Year Slam Data Expansion Start

Status: First slice complete

Branch: `codex/last-10-year-slam-data`

Summary:

- Started the 2017-2026 data expansion for the primary questions: prize money as a percentage of Slam revenue and prize money as a percentage of Slam profit/surplus.
- Used parallel xhigh subagents for Australian Open, Wimbledon, US Open, and Roland Garros research. Australian Open, Wimbledon, and US Open returned usable findings; both Roland Garros research attempts hit context limits and no new RG conclusion was incorporated.
- Added Australian Open 2026 official tournament-total prize-money row and 2020/2019/2018/2017 medium-confidence historical prize-money rows; AO revenue/profit remain unavailable without AO-specific denominators.
- Added Wimbledon 2019/2018/2017 tournament-total competition-prize rows and compatible AELTC Championships Ltd turnover/operating-profit denominators.
- Documented Wimbledon 2020 as canceled rather than a normal ratio row and kept Wimbledon 2026 denominators unavailable until same-year accounts exist.
- Left US Open 2017-2020/2023 and Roland Garros tournament-total clean numerators unavailable pending source semantics that separate competition prize money from support, per diem, exhibitions, grants, or other compensation.

Checks:

- JSON parse check for all retained data files - passed.
- Source-id integrity check across retained source metadata and normalized records - passed, 40 sources and 33 records.
- `git diff --check` - passed.
- Coverage summary - Australian Open tournament-total competition-prize rows now cover 2017-2026; Wimbledon tournament-total competition-prize rows cover 2017, 2018, 2019, 2021, 2022, 2023, 2024, 2025, and 2026; ratio-ready rows are Wimbledon 2017, 2018, 2019, 2021, 2022, 2023, 2024, and 2025.

## 2026-07-09 - Data Archive Scope Reset

Status: Complete

Branch: `feat/tennis-prize-economics-dashboard`

Summary:

- Removed the tracked React/Vite dashboard, package files, app tests, serverless dispatch handler, and GitHub Pages deploy workflow.
- Moved the retained JSON dataset from `src/data/` to `data/`.
- Removed deployment documentation and dashboard-only handoffs.
- Rewrote project docs so future work treats this repository as a data/provenance archive.
- Kept data-specific handoffs and source-audit records under `docs/handoffs/`.

Checks:

- JSON parse check for all retained data files - passed.
- Source-id integrity check across retained source metadata and normalized records - passed, 29 sources and 25 records.
- `git diff --check` - passed.

## Retained Data Pull Records

The following handoffs remain part of the provenance record:

- Australian Open 2026/2025/2024/2023/2022/2021/2020/2019/2018/2017 tournament-total numerator slices.
- Wimbledon 2026 numerator, Wimbledon 2025/2024/2023/2022/2021/2019/2018/2017 denominator/numerator slices, and Wimbledon 2020 cancellation caveat.
- US Open 2025/2024/2022/2021 tournament-total numerator slices.
- Roland Garros 2025/2024 source-semantics slices and 2023/2022/2021 archive-audit closure.
- Primary-question data-normalization guardrail and data sweep notes.
- Task 3 initial data-sourcing summary.
