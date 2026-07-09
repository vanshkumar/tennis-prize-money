# Changelog

## Unreleased

- Converted the repository from a deployed dashboard project into a data/provenance archive.
- Moved retained dataset JSON from `src/data/` to `data/`.
- Removed the React/Vite UI, npm package files, TypeScript/Vite configs, app tests, serverless refresh dispatch handler, and GitHub Pages deployment workflow.
- Removed dashboard/deploy-only handoffs while keeping source-pull and normalization audit handoffs.
- Rewrote README, agent instructions, plan, architecture, data model, future-work, and task-log docs for the data-only scope.

## Historical Note

The earlier dashboard-era implementation and deployment history remains available through Git history. The current repository shape intentionally keeps only the data and provenance records.
