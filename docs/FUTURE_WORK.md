# Future Work

## Data Coverage

- Add new rows only when source semantics preserve the current model distinctions.
- Keep 2021 as the current historical floor for manual Grand Slam pulling unless the user explicitly starts a new expansion phase.
- Add Wimbledon 2026 revenue/profit denominators only after official AELTC Championships Ltd accounts for the year ending 31 July 2026 are available and retain a compatible bridge to The Championships.
- Extend US Open tournament-total competition-prize-money coverage to 2023 only when official or clearer source semantics distinguish clean competition prize money from total player compensation/support.
- Add a clean Roland Garros tournament-total competition-prize-money row only after an official FFT/Roland Garros source separates competition prize money from per diems, support, legends/exhibition payments, and other compensation.
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

## Out Of Scope Unless Direction Changes

- Dashboard UI.
- GitHub Pages deployment.
- Browser-triggered refresh.
- Serverless dispatch.
- Charting or presentation-specific code.
