# Task Log

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
