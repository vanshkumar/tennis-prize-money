# Project Plan

## Current Direction

This project is now a data archive, not a web app. The previous dashboard idea did not justify a deployed product surface, so the repository should preserve only the source data and the records of how that data was collected and normalized.

## In Scope

- Static JSON data under `data/`.
- Source metadata with URLs, publishers, source types, access dates, confidence, and notes.
- Normalized tournament records with explicit prize-money scope and denominator semantics.
- Documentation explaining source decisions, caveats, and future data leads.
- Handoff files that preserve source-pull and audit history.

## Out Of Scope

- React/Vite UI.
- GitHub Pages deployment.
- Browser refresh controls.
- Serverless dispatch handlers.
- npm package/build/test scaffolding for a dashboard.
- Product copy, charts, or dashboard-specific presentation logic.

## Acceptance Criteria

- The tracked web app, deployment workflow, package files, serverless handler, and UI tests are removed.
- The dataset JSON is kept under `data/`.
- Documentation points to the data archive structure and no longer instructs future agents to build or deploy a dashboard.
- Data-specific handoffs remain available as provenance records.
- A lightweight JSON parse check passes.
