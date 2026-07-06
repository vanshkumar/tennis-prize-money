# Future Work

## Data Coverage

- Add more full tournament competition-prize-money totals before adding more denominator ratios; event-level prize money should remain labeled as partial when compared with whole-tournament financials.
- Keep the completed Wimbledon 2025/2024/2023/2022/2021 tournament-total denominator series at the current 2021 historical floor during this expansion phase. The 2021 row uses the official historical prize-money table plus a secondary support-exclusion cross-check rather than the newer PDF subtotal shape, so do not extend before 2021 without an explicit future scope change.
- Add Wimbledon 2026 revenue/profit denominators only after official AELTC Championships Ltd accounts for the year ending 31 July 2026 are available and retain a compatible bridge to The Championships.
- Treat 2021 as the current historical floor for manual data pulling across every Grand Slam. The current 2021-and-newer primary-question manual expansion pass is closed with known sources: completed compatible rows stay normalized, while Roland Garros 2023/2022/2021 and US Open 2023 stay unnormalized until new source semantics appear. Do not extend the current data-expansion pass before 2021 for any Slam.
- Extend US Open tournament-total competition-prize-money coverage to 2023 only when official/source semantics distinguish clean competition prize money from total player compensation/support clearly enough to keep support, per diem, grants, or other compensation out of the clean numerator. US Open 2022 and 2021 are normalized at medium confidence because their clean subtotals rely on secondary per-diem splits.
- Add a clean Roland Garros tournament-total competition-prize-money row only after an official FFT/Roland Garros source separates competition prize money from per diems, support, legends/exhibition payments, and other compensation. The 2023/2022/2021 archive audit found no compatible split, so do not revisit those same leads unless a new official source or clearer source table appears. Until then, keep the 2025 €56.352m and 2024 €53.478m headlines as total-player-compensation context only.
- Treat Roland Garros revenue leads as secondary-source candidates until FFT/Roland Garros official or audited tournament revenue is found.
- Add more tournaments beyond the four Grand Slam men's singles rows, starting with women's singles and prior-year Grand Slam rows so year-over-year growth can become available.
- Add doubles, mixed doubles, wheelchair, qualifying, per diem, travel, hotel, stringing, and player-support data only when allocation semantics are clear.
- Add compatible tournament-level revenue, profit, or surplus denominators from official financial statements, annual reports, Form 990 filings, or clearly scoped tournament reports.
- Find AO-specific revenue/profit/surplus sources before adding Australian Open financial ratios; Tennis Australia organization-level annual-report values should remain contextual unless a source bridges them to the tournament.

## Source Adapters

- Build richer official source adapters for tournament prize-money pages instead of relying on already-normalized JSON manifests.
- Add PDF/report parsing improvements for official prize-money PDFs and financial reports, with table-level validation and parser tests.
- Replace medium-confidence Roland Garros and US Open event rows when clearer official, parseable sources are available.
- Build a Roland Garros official-source path or PDF/press-kit parser that can distinguish clean competition prize money from per diems, support, legends/exhibition payments, and other compensation before promoting a tournament-total row to `competition_prize_money`; the 2024 press kit's bundled "other events plus estimated per diem" split is not clean enough by itself.
- Build a US Open official-page parser or alternate official-source path that can distinguish competition prize money from total player compensation/support and can re-verify the current 2025 tournament-total split without manual browser inspection.

## Financial Modeling

- Add FX conversion only if needed, with explicit FX source metadata, conversion date, source confidence, and tests that keep original and converted values distinct.
- Model draw size and allocation basis more explicitly so round-payout percentages can distinguish per-player values from total draw allocation.
- Keep organization-level financial context separate from tournament/event denominators unless a source provides a compatible bridge. The Wimbledon 2025, 2024, 2023, 2022, and 2021 rows should remain the pattern: operating-company turnover/profit can be ratio denominators only because the filings tie AELTC Championships Ltd directly to The Championships and the rows carry explicit caveats. The Wimbledon 2021 profit denominator also needs its 2020-cancellation insurance-income caveat. The Wimbledon 2026 numerator-only row should stay unavailable for revenue/profit ratios until same-year accounts exist.
- Keep total player compensation/support separate from competition-prize-money numerators in every ratio path.

## Persistence And Refresh

- Consider database, KV, or object storage persistence if source coverage grows beyond static JSON ergonomics.
- Add stronger authentication for browser-triggered refresh, such as short-lived signed requests, rate limiting, and tighter CORS origins on the external backend.
- Add adapter-level dry-run reports that list changed source ids, record ids, confidence changes, and caveat changes before writing static JSON.

## Provenance UI

- Improve the provenance UI with value-level source links, source-type labels, confidence explanations, and per-field notes instead of only record-level source panels.
- Add a source confidence legend and filters for official, reported, derived, estimated, unavailable, and mock statuses.
- Add visible "why unavailable" affordances near financial ratios and charts so caveats are easier to scan.

## Deployment

- Monitor the first GitHub Pages deployment after merge and confirm the dashboard is served at `/tennis-prize-money/`.
- Add a post-deploy browser smoke check if the parent repo starts running automated deployed-site verification.
