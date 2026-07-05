# Learnings

## What Has Worked

## Patterns and Preferences

**2026-07-05 — Project kickoff planning**
- Observation: `PLAN.md` defines a serial Codex-thread workflow where each major task must be documented, checked, committed, pushed, handed off under `docs/handoffs/`, and followed by creation of the next Codex thread before stopping.
- Action: Complete only the current major task in a thread; for Task 0, create the planning docs and Task 1 handoff/thread, then stop without starting Task 1 implementation.
- Confidence: high

**2026-07-05 — Parent site side-app planning**
- Observation: `tennis-prize-money/` is a sibling app inside the larger `vanshkumar.github.io` Astro/GitHub Pages repo; deployed sibling apps use independent React 18 + Vite projects with app-local npm packages and subpath `base` settings.
- Action: Prefer React + Vite with `base: '/tennis-prize-money/'`, npm, static GitHub Pages deployment, and optional external refresh dispatch instead of Next.js/server routes.
- Confidence: high

**2026-07-05 — Codex thread setup**
- Observation: New Codex chat threads for this project must use xhigh effort/thinking.
- Action: When creating Task 1 and later handoff or auxiliary Codex chat threads, set the thread creation tool's thinking/reasoning option to `xhigh` when available and include that requirement in the seed prompt.
- Confidence: high

**2026-07-05 — Task 0 git setup**
- Observation: The Git root is the parent `vanshkumar.github.io` repo while the writable app root is `tennis-prize-money/`; creating `feat/tennis-prize-economics-dashboard` needed an approved git metadata write after the sandboxed `git switch -c` failed.
- Action: For future branch or commit operations from this app, expect normal reads to work but retry required git metadata writes with approval if sandboxing blocks `.git` updates.
- Confidence: high

**2026-07-05 — Task 1 dependency workflow**
- Observation: This Codex shell did not have `npm` or `node` on PATH, but `/Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin/npm` worked once that same Node bin directory was prepended to PATH; package setup also needed approved network access.
- Action: For app-local npm installs and scripts in future threads, use `PATH=/Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin:/usr/bin:/bin:/usr/sbin:/sbin /Users/vanshkumar/.local/share/mise/installs/node/24.16.0/bin/npm ...` and request escalation when registry access is required.
- Confidence: high

**2026-07-05 — Task 1 Vite/Vitest config**
- Observation: With the current dependency set, adding a Vitest `test` block to `vite.config.ts` produced TypeScript conflicts between app Vite types and Vitest's nested Vite dependency.
- Action: Keep `vite.config.ts` Vite-only for now; the current Vitest tests run with default Node behavior without a Vite test config.
- Confidence: high

**2026-07-05 — Task 2 data layer**
- Observation: Runtime validation works cleanly without adding another dependency by importing `src/data/static/`, `src/data/raw/source-metadata/`, and `src/data/normalized/` through `src/data/dashboardDataset.ts`; calculations consume validated `TournamentEconomicsRecord` values.
- Action: Future data tasks should extend those JSON directories and import from `src/data/dashboardDataset.ts`, avoiding direct JSON casts or parallel loose data files.
- Confidence: high

**2026-07-05 — Task 3 seed sourcing**
- Observation: Grand Slam prize-money rows fit the current model best as event-level singles records; AO and Wimbledon publish official per-event totals, while Roland Garros and US Open may require derived event totals or secondary cross-checks when official pages are not crawler-readable.
- Action: For future source expansion, keep `prizePool` event-scoped when paired with singles round payouts, mark summed table totals as `derived`, lower confidence when source access is limited, and leave revenue/profit unavailable without a clear tournament-level financial source.
- Confidence: high

**2026-07-05 — Task 4 visualization UI**
- Observation: Local CSS/SVG chart components were enough for payout curves, comparison bars, confidence coverage, empty states, and unavailable states without adding a charting dependency.
- Action: For near-term dashboard visualization work, extend `src/lib/dashboardMetrics.ts` view models and `src/pages/DashboardPage.tsx` CSS/SVG panels before introducing a charting library.
- Confidence: medium

**2026-07-05 — Task 5 refresh pipeline**
- Observation: Server-side refresh TypeScript can be compiled without adding runtime/dependency tooling by using `tsconfig.refresh.json` to emit only `src/refresh/` and `src/data/schemas.ts` into `node_modules/.tmp/refresh`, then importing that output from `scripts/refresh-data.mjs`.
- Action: For future Node refresh scripts, keep Node-specific file IO in `.mjs` wrappers and keep reusable refresh logic in dependency-injected TypeScript modules that avoid Node globals.
- Confidence: high

**2026-07-05 — Task 5 refresh UI**
- Observation: The static dashboard can safely wire browser refresh only to an absolute public `VITE_REFRESH_DISPATCH_URL`; relative `/api/refresh`-style values would imply a GitHub Pages server runtime that does not exist.
- Action: Keep browser refresh configuration limited to public endpoint/doc URLs, and keep GitHub tokens, refresh passphrases, and signed source URLs in GitHub Actions or external serverless environment variables only.
- Confidence: high

**2026-07-05 - Task 6 release hardening**
- Observation: The active v0.1 seed uses `dataMode: "real"`, so schema-level checks can prevent future mock leakage before the dashboard imports JSON.
- Action: Keep real-data mock-leakage rules in `src/data/schemas.ts` and add focused validation tests in `src/test/dataValidation.test.ts` when tightening source or dataset contracts.
- Confidence: high

**2026-07-05 - Post-plan deployment follow-up**
- Observation: The parent Pages workflow deploys sibling apps only when each app is explicitly installed, built, copied into `site/<subpath>/`, and smoke-checked in `.github/workflows/deploy.yml`.
- Action: When adding or renaming deployed side apps, update the parent workflow and app deployment docs together; app-local Vite `base` is necessary but not sufficient for publication.
- Confidence: high

**2026-07-05 - Primary question dashboard rehash**
- Observation: The revenue/profit-share question is clearest when the dashboard first shows two answer cards for prize money / revenue and prize money / profit/surplus, with payout curves and finalist charts removed from the main flow.
- Action: Keep the first viewport focused on the selected comparison and primary answer cards; keep refresh, provenance, and broader context below the primary answer.
- Confidence: high

**2026-07-05 - Primary financial data sourcing**
- Observation: The active seed's men's singles event prize pools are not the right numerator for a full tournament revenue/profit-share answer; Wimbledon has the strongest next data path because official total-prize-money PDFs can be paired with AELTC Championships Ltd financial filings.
- Action: Add explicit numerator scope before normalizing denominator ratios, prioritize full tournament prize-money totals, and start financial-ratio expansion with Wimbledon while keeping AO/US Open/Roland Garros denominators unavailable or caveated until tournament-specific sources are verified.
- Confidence: high

**2026-07-05 - Repo extraction planning**
- Observation: Codex project threads are tied to local projects/workspaces, and the documented Handoff flow moves threads between Local and Worktree checkouts rather than bulk-reassigning existing project threads to a newly extracted repository path.
- Action: Before extracting this app into its own repository, preserve continuity through committed `docs/handoffs/`, `docs/TASK_LOG.md`, `AGENTS.md`, and `LEARNINGS.md`; after opening the new repo as a Codex project, create xhigh successor threads seeded with those handoffs instead of assuming old threads will be wholesale moved.
- Confidence: high

**2026-07-05 - Standalone repo migration**
- Observation: After extracting `tennis-prize-money/` into its own folder, the local directory had no `.git` metadata while the GitHub `origin` was reachable but had no branch heads; `.git` writes such as init, remote add, branch rename, add, and commit required approved execution in this Codex sandbox.
- Action: For future standalone migration or recovery work, initialize/fetch first, inspect `origin` heads before pushing, use a normal non-force first push when no remote refs exist, and keep generated `node_modules/` and `dist/` excluded with app-local `.gitignore`.
- Confidence: high

**2026-07-05 - Standalone Pages deployment**
- Observation: In the standalone repo, GitHub Pages `Deploy from a branch` with `main` and `/(root)` is insufficient because the Vite app must be built and served from `dist/`.
- Action: Use Source `GitHub Actions` plus `.github/workflows/deploy.yml` to run `npm ci`, `npm run build`, upload `dist/`, and deploy; keep `base: '/tennis-prize-money/'` for the project-site URL.
- Confidence: high

**2026-07-05 - US Open numerator semantics**
- Observation: Official US Open 2025 compensation URLs remained non-parseable in this environment, while AP provided a parseable split between nearly $85m competition prize money and $90m total player compensation/support.
- Action: Keep US Open total-compensation rows marked as `total_player_compensation`, require `prizeMoneyScope.numeratorCategory` on every record, and reject non-`competition_prize_money` numerators in revenue/profit ratio calculations.
- Confidence: high

**2026-07-05 - Wimbledon primary-question normalization**
- Observation: The official Wimbledon 2025 prize-money PDF separates £52.0m `TOTAL TENNIS EVENTS PRIZE MONEY` from £1.5m estimated per diems and the broader £53.5m `TOTAL PRIZE MONEY`; AELTC Championships Ltd accounts tie operating-company turnover/profit directly to The Championships.
- Action: Use Wimbledon total tennis events prize money as the clean `competition_prize_money` numerator; keep broader total prize money/per diems out of competition-prize ratios, and label AELTC Championships Ltd turnover/profit as operating-company denominators with caveats.
- Confidence: high

**2026-07-05 - Wimbledon prior-year normalization**
- Observation: Wimbledon 2024 uses the same source shape as 2025: the official prize-money PDF separates £48.55m total tennis events prize money from £1.45m estimated per diems and the broader £50.0m total prize money line, while AELTC Championships Ltd accounts use the same principal-contracting-party and statements-reflect-Championships bridge.
- Action: Add Wimbledon prior-year tournament-total rows after the latest answerable row so the default dashboard still opens on the latest Wimbledon answer, and use same-event `Tournament total` rows to unlock year-over-year checks.
- Confidence: high

**2026-07-05 - Australian Open numerator normalization**
- Observation: The official AO 2025 article and Tennis Australia PDF publish a single A$96.5m Australian Open prize-money/prize-pool total, while the article separately mentions A$120m across broader Australian Summer of Tennis events and does not separate AO per diems or player-support compensation.
- Action: Normalize AO tournament-total rows from official AO/Tennis Australia prize-money totals as `competition_prize_money` only when no support component is identified; keep broader Summer of Tennis figures and Tennis Australia organization-level financials out of AO revenue/profit ratios.
- Confidence: high

**2026-07-05 - Australian Open prior-year normalization**
- Observation: The official AO 2024 prize-money article is sufficient for the A$86.5m tournament prize-pool numerator and states prize-money amounts are in Australian dollars, but no separate 2024 Tennis Australia prize-money PDF was verified in this task.
- Action: For AO prior-year tournament-total rows, official AO articles can serve as high-confidence source metadata when they clearly state the tournament prize-pool total and currency; note when no companion PDF was verified and keep revenue/profit unavailable without an AO-specific financial bridge.
- Confidence: high

## What Has Failed
