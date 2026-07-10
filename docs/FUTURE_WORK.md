# Future Work

## Data Coverage

- Add new rows only when source semantics preserve the current model distinctions.
- Keep the active ten-year target at 2017-2026; do not extend farther back unless the user starts a new expansion phase.
- Add Wimbledon 2026 revenue/profit denominators only after official AELTC Championships Ltd accounts for the year ending 31 July 2026 are available and retain a compatible bridge to The Championships.
- Resolve the US Open 2019 wheelchair/Legends bundle before adding a strict full-tournament numerator; add the 2025 revenue denominator when the next USTA audit becomes public.
- Resolve Roland-Garros 2021's EUR6,002 schedule/headline discrepancy and strengthen secondary revenue denominators with official FFT records where available.
- Continue searching for explicitly labeled modern US Open and Roland-Garros tournament profit/surplus; do not derive profit by subtracting selected expense lines.
- Find AO-specific revenue/profit/surplus sources before adding Australian Open financial ratios.
- Add doubles, mixed doubles, wheelchair, qualifying, per diem, travel, hotel, stringing, and player-support data only when allocation semantics are clear.

## Data Maintenance

- Consider a small JSON validation script if manual review and JSON parsing become too weak.
- Add source-level status fields only if the current notes stop being sufficient.
- Rename the historical `grandSlam2025MensSingles.json` file only with a deliberate migration that updates every doc and handoff reference.

## Financial Modeling

- Add FX conversion only if needed, with explicit FX source metadata, conversion date, source confidence, and tests or review notes that keep original and converted values distinct.
- Keep organization-level financial context separate from tournament/event denominators unless a source provides a compatible bridge.
- Keep total player compensation/support separate from competition-prize-money numerators in every ratio path.
- For Australian Open denominators, prioritize FOI or direct requests for Tennis Australia/Melbourne & Olympic Parks Trust AO-only revenue-share settlement schedules or agreed-revenue-item schedules; public Tennis Australia annual reports publish group totals and economic-impact studies publish impact metrics, not strict AO revenue/profit denominators.

## Out Of Scope Unless Direction Changes

- Dashboard UI.
- GitHub Pages deployment.
- Browser-triggered refresh.
- Serverless dispatch.
- Charting or presentation-specific code.
