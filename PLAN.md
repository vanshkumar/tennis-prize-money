# Tennis Prize Money Data Archive Plan

## Goal

Keep an auditable dataset about tennis tournament prize money, player compensation, and compatible tournament financial denominators where they can be verified.

This repository should not be treated as a deployed dashboard. The durable value is the source data and the written record of how the values were pulled, interpreted, normalized, or rejected.

## Current Shape

- `data/static/seedDatasetMetadata.json`
- `data/raw/source-metadata/grandSlam2025Sources.json`
- `data/normalized/grandSlam2025MensSingles.json`
- `docs/DATA_MODEL.md`
- `docs/DATA_SOURCES.md`
- `docs/DATA_CAVEATS.md`
- `docs/SOURCING_WORKFLOW.md`
- `docs/handoffs/`

The historical `grandSlam2025MensSingles` filename remains for continuity, even though the records now include tournament-total rows and financial denominator slices.

## Operating Rules

1. Preserve source provenance before adding or changing normalized data.
2. Do not fabricate data.
3. Prefer official sources and visibly caveat secondary sources.
4. Keep clean competition prize money separate from total player compensation, support, per diems, travel/hotel coverage, grants, and other compensation.
5. Keep tournament-level financial denominators separate from organization-level financials unless a source explicitly bridges the scope.
6. Leave values unavailable when scope, currency, denominator semantics, or source confidence are not compatible.
7. Record meaningful source-pull decisions in `docs/handoffs/`.
8. Do not rebuild the dashboard, deployment workflow, browser refresh UI, or serverless dispatch path unless the user explicitly changes the project direction again.

## Near-Term Work

- Maintain and audit the active 2017-2026 Grand Slam target window.
- Add new rows only when source semantics are clear enough to preserve the model distinctions.
- Add Wimbledon 2026 financial denominators only after official AELTC Championships Ltd accounts exist and retain the Championships scope bridge.
- Prioritize Australian Open settlement/ledger requests, the US Open 2019 wheelchair/Legends split and 2025 audit, Roland-Garros 2021 reconciliation and modern profit, and Wimbledon 2026 accounts.
- Consider a small data-validation script only if manual JSON parse checks become too weak for maintenance.
