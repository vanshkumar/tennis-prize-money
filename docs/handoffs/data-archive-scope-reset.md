# Data Archive Scope Reset

Date: 2026-07-09

Branch: `feat/tennis-prize-economics-dashboard`

## Task Completed

Removed the deployed-dashboard surface and recast the repository as a data/provenance archive.

## Files Changed

- Removed tracked React/Vite UI, package files, build config, app tests, serverless dispatch handler, and GitHub Pages deploy workflow.
- Moved retained dataset JSON from `src/data/` to `data/`.
- Rewrote project docs for data-only scope.
- Removed deployment and dashboard-only handoff records.
- Added `data/README.md` and `docs/SOURCING_WORKFLOW.md`.

## Commit Hash

Not committed in this handoff.

## Push Status

Not pushed in this handoff.

## Commands Run And Results

- `git status --short --branch` - started clean on `main...origin/main`.
- `git switch -c feat/tennis-prize-economics-dashboard` - succeeded with approved Git metadata access after the sandbox blocked the initial branch write.
- Repository inventory commands with `rg --files`, `git ls-files`, and doc reads - completed.
- Moved retained JSON files from `src/data/` to `data/`.
- Removed ignored local `dist/`, `node_modules/`, and empty app/deploy directories.
- JSON parse check for all retained data files - passed.
- Source-id integrity check across retained source metadata and normalized records - passed, 29 sources and 25 records.
- SHA-256 checks confirmed the three moved JSON files match their previous tracked contents exactly.
- `git diff --check` - passed.

## Known Issues

- The retained normalized filename `grandSlam2025MensSingles.json` is historical and broader than the name implies.
- There is no TypeScript schema validator after this cleanup; data maintenance relies on JSON parsing, docs, and review unless a future data-focused validator is added.

## Next Task Objective

No immediate next implementation task is required. Future work should add or revise data only when a clear source gap is being addressed.
