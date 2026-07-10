# Changelog

## Unreleased

- Added the complete audited US Open operating-revenue series for 2017-2024, new strict competition-prize rows for 2017/2018/2020/2023, a financial-only 2019 row, and explicit profit-unavailable caveats.
- Added Roland-Garros clean competition-prize/revenue rows for 2017-2020 and 2022-2025, including FFT analytical tournament-surplus denominators for 2017-2019, while preserving 2021 revenue without forcing its unresolved prize-schedule discrepancy.
- Added USTA audited financial-statement source metadata and US Open 2022/2021 tournament revenue denominators while leaving US Open profit/surplus unavailable.
- Started the 2017-2026 Slam data expansion with new Australian Open 2026/2020/2019/2018/2017 prize-money rows and Wimbledon 2019/2018/2017 ratio-ready rows.
- Added older Wimbledon AELTC Championships Ltd source metadata and documented Wimbledon 2020 as canceled rather than a normal ratio row.
- Converted the repository from a deployed dashboard project into a data/provenance archive.
- Moved retained dataset JSON from `src/data/` to `data/`.
- Removed the React/Vite UI, npm package files, TypeScript/Vite configs, app tests, serverless refresh dispatch handler, and GitHub Pages deployment workflow.
- Removed dashboard/deploy-only handoffs while keeping source-pull and normalization audit handoffs.
- Rewrote README, agent instructions, plan, architecture, data model, future-work, and task-log docs for the data-only scope.

## Historical Note

The earlier dashboard-era implementation and deployment history remains available through Git history. The current repository shape intentionally keeps only the data and provenance records.
