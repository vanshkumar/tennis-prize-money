# Agent Instructions

## Required Memory

Before starting any task in this repository, read `LEARNINGS.md` in full. Apply entries under "What Has Worked" and "Patterns and Preferences"; avoid entries under "What Has Failed." If `LEARNINGS.md` is missing, create it with these sections:

- `## What Has Worked`
- `## Patterns and Preferences`
- `## What Has Failed`

After completing a task, update `LEARNINGS.md` only with project-specific observations that are not already captured. Use this format:

```markdown
**[Date] - [Task type]**
- Observation: [what you noticed]
- Action: [what to do or avoid going forward]
- Confidence: [high / medium / low]
```

## Project Context

`tennis-prize-money/` is no longer a deployed dashboard project. It is a data archive for tennis prize-money economics and the provenance records behind the dataset.

Keep the repository focused on:

- Static JSON source metadata and normalized records under `data/`.
- Documentation that explains source selection, source limitations, normalization decisions, and caveats.
- Handoffs that preserve how prior data pulls were performed.

Do not reintroduce:

- React/Vite UI code.
- GitHub Pages deployment workflows.
- Browser refresh controls.
- Serverless refresh dispatch handlers.
- npm/package/build scaffolding unless the user explicitly asks for a tool, and the tool is clearly data-maintenance focused.

## Task Workflow

1. Read `LEARNINGS.md`.
2. Check `git status --short --branch`.
3. Make only the requested data or documentation change.
4. Keep source URLs, source types, access dates, confidence, and notes visible for real data.
5. Update `docs/TASK_LOG.md` and create or update a relevant handoff under `docs/handoffs/` when a data-pull or scope-boundary task is completed.
6. Run a lightweight JSON parse check when data files are changed.
7. Do not create a new Codex thread unless the user explicitly asks. If a new project thread is created, use xhigh effort/thinking when the tool supports it and include `Use xhigh effort/thinking for this thread.` in the seed prompt.

Use the current branch unless it is clearly inappropriate. Never force-push. Never delete user work. Stage explicit paths if committing.

## Data Rules

- Do not fabricate real data.
- Mock/sample data must be visibly labeled as mock/sample in code, data, and docs.
- Real data must include source URL, publisher, source type, retrieved/accessed date, confidence, and notes where useful.
- Prefer official sources. Use reputable secondary sources only with lower confidence and visible caveats.
- Keep prize money, total player compensation/support, revenue, profit, surplus, expenses, and unavailable values semantically distinct.
- Only compute derived percentages when numerator and denominator are compatible.
- Do not compare currencies without explicit conversion.
- If profit/surplus is zero, negative, missing, or semantically incompatible, show the ratio as unavailable.

## Documentation

Maintain these current docs:

- `README.md`
- `AGENTS.md`
- `CHANGELOG.md`
- `PLAN.md`
- `docs/PROJECT_PLAN.md`
- `docs/ARCHITECTURE.md`
- `docs/DATA_MODEL.md`
- `docs/DATA_SOURCES.md`
- `docs/DATA_CAVEATS.md`
- `docs/SOURCING_WORKFLOW.md`
- `docs/FUTURE_WORK.md`
- `docs/TASK_LOG.md`
- `docs/handoffs/`
