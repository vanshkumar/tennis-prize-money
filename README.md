# Tennis Prize Money Data Archive

This repository is now a data and provenance archive, not a deployed dashboard.

It keeps the sourced Grand Slam prize-money economics dataset plus the records that explain how each row was pulled, normalized, caveated, or deliberately left unavailable. The previous React/Vite UI, GitHub Pages deployment workflow, serverless refresh handler, npm package, build config, and dashboard tests have been removed.

## Contents

- `data/static/seedDatasetMetadata.json` - dataset-level metadata.
- `data/raw/source-metadata/grandSlam2025Sources.json` - source inventory with publishers, URLs, access dates, source types, confidence, and notes.
- `data/normalized/grandSlam2025MensSingles.json` - normalized tournament economics records. The filename is historical; it now includes tournament-total rows, total-player-compensation context rows, and compatible tournament financial denominators.
- `docs/DATA_MODEL.md` - field contract and semantic rules.
- `docs/DATA_SOURCES.md` - source inventory, normalized row summary, research leads, and access-date notes.
- `docs/DATA_CAVEATS.md` - caveats for numerator scope, denominator compatibility, unavailable values, and source confidence.
- `docs/SOURCING_WORKFLOW.md` - how future data pulls should be researched and recorded.
- `docs/handoffs/` - retained source-pull handoffs and normalization audit notes.

Start future sourcing work with `docs/handoffs/creative-missing-slam-sourcing-2017-2026.md`; it contains the current coverage, source paths, and remaining gaps.

## Current Dataset

The active dataset is `schemaVersion: 2` and `dataMode: "real"`.

It includes Australian Open 2017-2026 competition-prize numerators; Wimbledon ratio-ready rows for normal editions from 2017-2025; US Open operating-revenue denominators for 2017-2024 with strict competition-prize ratios where support can be separated; and Roland-Garros clean competition-prize/revenue rows for 2017-2020 and 2022-2025. Support-inclusive headline rows remain separate context records.

Australian Open revenue and profit remain unavailable because public Tennis Australia accounts are organization-wide rather than AO-only. US Open profit remains unavailable because USTA audits disclose tournament revenue and expense lines but no labeled tournament profit. Roland-Garros 2017-2019 include explicitly labeled analytical tournament surplus; 2021 keeps revenue but no ratio-ready numerator because the reconstructed schedules miss the official headline by EUR6,002. Wimbledon 2020 is intentionally treated as canceled rather than a normal ratio row.

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
jq empty data/static/seedDatasetMetadata.json \
  data/raw/source-metadata/grandSlam2025Sources.json \
  data/normalized/grandSlam2025MensSingles.json
```

Before changing data, read `LEARNINGS.md`, `AGENTS.md`, `docs/DATA_MODEL.md`, `docs/DATA_SOURCES.md`, `docs/DATA_CAVEATS.md`, and the relevant handoff under `docs/handoffs/`.
