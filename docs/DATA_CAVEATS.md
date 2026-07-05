# Data Caveats

## Current Dataset

The active dataset is a small sourced seed for Grand Slam economics. It includes 2025 men's singles competition-prize rows for the Australian Open, Roland Garros, Wimbledon, and the US Open, Australian Open 2025 and 2024 tournament-level competition-prize rows with unavailable financial denominators, US Open 2025 tournament-level competition prize money with unavailable financial denominators, Wimbledon 2025 and 2024 tournament-level competition-prize rows with compatible operating-company financial denominators, plus US Open and Roland Garros tournament-level total-player-compensation context rows.

The seed includes compatible tournament-level revenue/profit ratios only for the Wimbledon tournament-total rows. Other records keep revenue, profit, or surplus unavailable rather than estimated.

The Wimbledon tournament-total rows use total tennis events prize money as clean competition-prize-money numerators: £52.0m for 2025 and £48.55m for 2024. The official Wimbledon PDFs also report broader total prize money lines that include estimated per diems: £53.5m including £1.5m estimated per diems for 2025, and £50.0m including £1.45m estimated per diems for 2024. The broader totals are not used as clean competition-prize-money numerators because the current schema keeps competition prize money separate from support-style compensation.

The Australian Open tournament-total rows use official AO/Tennis Australia total prize money: A$96.5m for 2025 and A$86.5m for 2024. The cited AO/Tennis Australia sources describe the values as prize money or prize pool and do not identify separate per-diem or player-support components within those totals. If a future source separates support or compensation from competition prize money, that support should remain outside these clean numerator rows. The 2025 article also mentions A$120m across Australian Summer of Tennis events; that broader multi-event figure is not used as the Australian Open tournament numerator.

The US Open 2025 tournament-total competition-prize row uses US$85.0m. That value is derived from the official US Open/USTA US$90.0m total player-compensation announcement after excluding the official US$5.0m travel and hotel support component, with AP corroborating US$85.0m in competition prize money across competitions. The separate US$90.0m row remains `total_player_compensation` because it includes support/expense coverage. US Open revenue and profit/surplus remain unavailable because no US Open-specific compatible financial denominator is normalized.

The Roland Garros 2025 total-player-compensation row uses AP's €56.352m figure as support-inclusive context. AP says the value includes per diems and payments to former players taking part in exhibitions. No official split was verified that separates clean competition prize money from those support/exhibition components, so no Roland Garros tournament-total `competition_prize_money` row is normalized in this slice. Roland Garros revenue and profit/surplus remain unavailable because no Roland Garros-specific compatible financial denominator is normalized, and FFT organization-level financials should remain out of tournament ratios unless a source bridges the scope explicitly.

The Wimbledon denominators are AELTC Championships Ltd operating-company values for the years ended 31 July 2025 and 31 July 2024. The 2025 row uses £423.626m turnover and £52.720m operating profit. The 2024 row uses £406.507m turnover and £54.332m operating profit. The company filings say AELTC Championships Ltd is the principal contracting party for The Championships and that the statements reflect the results of, and division of surplus from, The Championships. These denominators are still caveated as operating-company values, not a separate two-week cash ledger, after-tax retained profit, dividends, LTA distributions, or broader organization-level values.

Roland Garros and US Open event-level rows are medium confidence in this seed:

- Roland Garros uses a secondary source because a clear official FFT/Roland Garros prize-money page was not found in this research pass.
- The Roland Garros headline €56.352m total is also medium confidence as a normalized context row because the parseable AP source describes support-inclusive compensation, not clean competition prize money.
- The US Open official prize-money page still does not expose parseable crawler text for the event-level row; event values are cross-checked through a secondary page citing the official source. The official 2025 compensation release was verified in the rendered browser for the US$90.0m total-compensation and US$5.0m support split.

## Semantic Distinctions

Competition prize money, total player compensation/support, revenue, profit, surplus, expenses, and unavailable values are different concepts and must not be collapsed into a generic "money" field in user-facing logic.

- Competition prize money is the tournament/event prize-money pool represented by eligible normalized records.
- Total player compensation can include competition prize money plus support and expense coverage; it is visible context, not a revenue/profit numerator.
- Winner and runner-up payouts are payout rows and may be per player, per team, or total allocation.
- Revenue must describe a compatible tournament-level or event-level financial denominator before competition-prize-money share is computed.
- Profit/surplus must describe compatible tournament-level profit or surplus before competition-prize-money share is computed.
- Revenue and profit/surplus ratios require `prizeMoneyScope.numeratorCategory: "competition_prize_money"`.
- Organizer-level revenue/profit/surplus can be useful context, but it is not automatically comparable to a single tournament/event prize pool.
- Operating-company financials can be used only when source text bridges the company to the tournament/event and the row labels that scope clearly.
- Expenses are not profit or surplus denominators.
- Unknown and unavailable values should remain visible as unavailable rather than guessed.

For the four event-level records, the prize pool is the men's singles event allocation, not total tournament prize money across singles, doubles, mixed doubles, wheelchair, qualifying, per diems, or player support.

For the primary revenue/profit-share question, future rows should prefer full tournament prize-money totals. If an event-level numerator is ever compared with a tournament-level denominator, the UI must label it as partial rather than presenting it as the players' full tournament share.

The Australian Open 2025 and 2024 tournament-total numerators are full-tournament prize money, but their revenue and profit/surplus remain unavailable. Tennis Australia organization-level revenue or surplus should not be used as an AO tournament denominator unless a source explicitly bridges the organization-level accounts to the Australian Open tournament scope.

The US Open 2025 total-player-compensation row is not a clean competition-prize-money total. The active clean US Open tournament-total row is US$85.0m competition prize money; the US$90.0m compensation/support row remains separate and is excluded from primary ratios.

The Roland Garros 2025 total-player-compensation row is also not a clean competition-prize-money total. The active dataset keeps the €56.352m compensation/support total separate from the event-level men's singles row and excludes it from primary ratios until a source verifies a clean tournament-total competition-prize amount.

## Currency Caveats

The app does not do currency conversion yet. A ratio is computed only when numerator and denominator currencies match exactly. If later tasks need cross-currency comparisons, they should add explicit FX source metadata, conversion dates, and tests.

## Profit And Surplus Caveats

Competition prize money / profit or surplus is unavailable when profit/surplus is missing, zero, negative, semantically incompatible, or in another currency. Negative and zero denominators are shown as unavailable because a percentage would be misleading for this dashboard.

For Wimbledon 2025 and 2024, the selected profit denominator is operating profit before net finance income, division of net available surplus to LTA Operations, taxation, and dividends or distribution mechanics. The normalized rows intentionally do not use net available surplus, profit before tax, profit after tax, or dividend values as the primary profit/surplus denominator.

## Round Payout Caveats

Round payout percentages compare each published round payout to the record's prize-money numerator only when currencies match. They should not be interpreted as the total share of the entire draw unless the allocation basis and draw counts are also modeled.

Doubles payouts may be per team while singles payouts are usually per player. The `allocation` field must remain visible where payout rows are shown.

The test fixtures validate the singles prize-pool rows by weighting round payouts across the 128-player main draw. This is still not a replacement for richer draw-size modeling in the app UI.

## Source Confidence Caveats

Confidence describes source trust and data clarity, not truth in isolation.

- `high`: official or audited source with clear semantics.
- `medium`: reputable source or official source with some ambiguity.
- `low`: usable but limited source, likely with caveats.
- `mock`: fictional sample data only.

Future source expansion should prefer official tournament pages, annual reports, Form 990s, official financial statements, and official press releases. Secondary sources should be clearly labeled with lower confidence and notes.

The active seed applies this by using high-confidence official Australian Open, Wimbledon, and US Open 2025 tournament-total source semantics, and medium-confidence Roland Garros/US Open event-level rows plus Roland Garros total-player-compensation context where source limitations or support-inclusive semantics remain.

## Refresh Caveats

Refresh automation validates and rewrites the current static JSON, but it does not make manually sourced rows more authoritative. A refreshed timestamp means the pipeline ran successfully; source confidence still comes from the underlying source metadata and normalization notes.

The generic JSON manifest adapter expects already-normalized rows. Future official-page, PDF, or financial-report adapters should keep the same caveat discipline: no fabricated values, no hidden currency conversion, and no compatible financial ratios unless denominator semantics are clear.

## v0.1 Audit Notes

- No active mock/sample rows are present. If mock rows are reintroduced, the dataset mode, labels, source type, confidence, and value statuses must make that visible.
- Unavailable financial rows are displayed as unavailable rather than hidden or silently treated as zero.
- Available Wimbledon financial rows are displayed with operating-company caveats rather than being smoothed into generic tournament-profit language.
- Filters that match no records show empty states and reset actions.
- Source limitations for Roland Garros and US Open event-level rows, and support-inclusive semantics for Roland Garros compensation, remain visible instead of being smoothed into high-confidence language.
