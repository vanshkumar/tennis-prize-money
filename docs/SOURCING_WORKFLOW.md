# Sourcing Workflow

## Purpose

This document replaces the old dashboard refresh/deployment workflow. Future work should preserve an auditable trail for how values were found, interpreted, and normalized.

## Before A Data Pull

1. Read `LEARNINGS.md`.
2. Check `git status --short --branch`.
3. Read `docs/DATA_MODEL.md`, `docs/DATA_SOURCES.md`, `docs/DATA_CAVEATS.md`, and the most relevant handoff under `docs/handoffs/`.
4. Identify the exact row or source gap being addressed.

## Source Preference

Prefer sources in this order:

1. Official tournament prize-money PDFs, pages, releases, or press kits.
2. Audited financial statements, annual reports, Companies House filings, or Form 990s.
3. Reputable secondary sources only when official sources are unavailable, non-parseable, or used as cross-checks.

Do not normalize a source just because it contains a headline number. First decide whether the value is clean competition prize money, total player compensation/support, organization-level financial context, or an incompatible lead.

## Normalization Rules

- Add or update source metadata before adding normalized records.
- Keep `sourceIds` on every available value.
- Preserve `competition_prize_money` and `total_player_compensation` as separate numerator categories.
- Keep support, per diems, travel/hotel coverage, stringing, grants, legends/exhibition payments, and bundled other events outside clean competition-prize rows unless a source separates them clearly.
- Do not use organization-level financials as tournament denominators without an explicit source bridge.
- Leave revenue, profit, or surplus unavailable when the denominator is missing, incompatible, zero, negative, or not tournament-specific enough.

## Recording The Pull

For material data changes, update:

- `data/raw/source-metadata/grandSlam2025Sources.json`
- `data/normalized/grandSlam2025MensSingles.json`
- `data/static/seedDatasetMetadata.json` if metadata or refresh timestamp changes
- `docs/DATA_SOURCES.md`
- `docs/DATA_CAVEATS.md`
- `docs/DATA_MODEL.md` if the contract changes
- `docs/TASK_LOG.md`
- a handoff under `docs/handoffs/`
- `LEARNINGS.md` only for new project-specific observations

## Basic Check

Run a JSON parse check after changing data:

```bash
node -e 'for (const f of ["data/static/seedDatasetMetadata.json","data/raw/source-metadata/grandSlam2025Sources.json","data/normalized/grandSlam2025MensSingles.json"]) JSON.parse(require("fs").readFileSync(f, "utf8")); console.log("JSON ok")'
```

`git diff --check` should also pass before handing off.
