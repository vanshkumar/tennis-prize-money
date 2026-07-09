# Architecture

## Current Scope

The repository is a static data archive. It has no runtime app, no deployment target, and no local package manager requirement.

## Directory Layout

- `data/static/seedDatasetMetadata.json` stores dataset metadata such as schema version, dataset label, data mode, notice, and last refreshed timestamp.
- `data/raw/source-metadata/grandSlam2025Sources.json` stores source-level provenance.
- `data/normalized/grandSlam2025MensSingles.json` stores normalized tournament economics records.
- `docs/DATA_MODEL.md` describes the JSON contract and semantic boundaries.
- `docs/DATA_SOURCES.md` records source inventory, normalized rows, and research leads.
- `docs/DATA_CAVEATS.md` records interpretation caveats.
- `docs/SOURCING_WORKFLOW.md` records how future source pulls should be handled.
- `docs/handoffs/` stores source-pull handoffs and audit closures.

## Data Flow

1. A source is identified and recorded with publisher, URL, source type, accessed date, confidence, and notes.
2. The source is interpreted against the project data rules.
3. A normalized record is added or updated only when the source semantics are clear enough.
4. If a source is useful but incompatible, it remains documented as context or a research lead rather than being promoted into a ratio-ready row.
5. Caveats and handoffs explain the decision.

## Validation Boundary

There is no TypeScript validation layer now. The minimum local check is JSON parsing for the three data files. Model correctness is maintained through `docs/DATA_MODEL.md`, `docs/DATA_SOURCES.md`, and explicit review of source notes.

If future maintenance needs stronger checks, add a small data-focused validator without reintroducing a dashboard build.
