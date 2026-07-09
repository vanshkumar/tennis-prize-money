# Tennis Prize Money Data Archive

This repository is now a data and provenance archive, not a deployed dashboard.

It keeps the sourced Grand Slam prize-money economics dataset plus the records that explain how each row was pulled, normalized, caveated, or deliberately left unavailable. The previous React/Vite UI, GitHub Pages deployment workflow, serverless refresh handler, npm package, build config, and dashboard tests have been removed.

## Contents

- `data/static/seedDatasetMetadata.json` - dataset-level metadata.
- `data/raw/source-metadata/grandSlam2025Sources.json` - source inventory with publishers, URLs, access dates, source types, confidence, and notes.
- `data/normalized/grandSlam2025MensSingles.json` - normalized tournament economics records. The filename is historical; it now includes tournament-total rows, total-player-compensation context rows, and Wimbledon financial denominator rows.
- `docs/DATA_MODEL.md` - field contract and semantic rules.
- `docs/DATA_SOURCES.md` - source inventory, normalized row summary, research leads, and access-date notes.
- `docs/DATA_CAVEATS.md` - caveats for numerator scope, denominator compatibility, unavailable values, and source confidence.
- `docs/SOURCING_WORKFLOW.md` - how future data pulls should be researched and recorded.
- `docs/handoffs/` - retained source-pull handoffs and normalization audit notes.

## Current Dataset

The active dataset is `schemaVersion: 2` and `dataMode: "real"`.

It includes Australian Open 2026-2017, Wimbledon 2026/2025/2024/2023/2022/2021/2019/2018/2017, and US Open 2025/2024/2022/2021 tournament-total competition-prize rows; US Open and Roland Garros 2025/2024 total-player-compensation context rows; and compatible Wimbledon 2025/2024/2023/2022/2021/2019/2018/2017 operating-company revenue/profit denominator slices.

Revenue and profit/surplus remain unavailable for Wimbledon 2026 and non-Wimbledon rows unless a tournament-specific compatible financial source is verified. Wimbledon 2020 is intentionally treated as canceled rather than a normal ratio row.

## Data Rules

- Do not fabricate real data.
- Keep competition prize money, total player compensation/support, revenue, profit, surplus, expenses, and unavailable values semantically distinct.
- Every available real value must be traceable to source metadata.
- Prefer official sources. Use reputable secondary sources only with lower confidence and visible caveats.
- Do not compare currencies without explicit conversion source metadata.
- Only compute or describe ratios when numerator and denominator scope are compatible.
- If profit/surplus is zero, negative, missing, or semantically incompatible, keep the ratio unavailable.

## Basic Check

There is no app build or npm test suite now. A lightweight integrity check is to parse the JSON files:

```bash
node -e 'for (const f of ["data/static/seedDatasetMetadata.json","data/raw/source-metadata/grandSlam2025Sources.json","data/normalized/grandSlam2025MensSingles.json"]) JSON.parse(require("fs").readFileSync(f, "utf8")); console.log("JSON ok")'
```

Before changing data, read `LEARNINGS.md`, `AGENTS.md`, `docs/DATA_MODEL.md`, `docs/DATA_SOURCES.md`, `docs/DATA_CAVEATS.md`, and the relevant handoff under `docs/handoffs/`.
