# Task Log

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

- Australian Open 2025/2024/2023/2022/2021 tournament-total numerator slices.
- Wimbledon 2026 numerator, Wimbledon 2025/2024/2023/2022/2021 denominator/numerator slices.
- US Open 2025/2024/2022/2021 tournament-total numerator slices.
- Roland Garros 2025/2024 source-semantics slices and 2023/2022/2021 archive-audit closure.
- Primary-question data-normalization guardrail and data sweep notes.
- Task 3 initial data-sourcing summary.
