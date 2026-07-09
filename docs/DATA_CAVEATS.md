# Data Caveats

## Current Dataset

The active dataset is a small sourced seed for Grand Slam economics. It includes 2025 men's singles competition-prize rows for the Australian Open, Roland Garros, Wimbledon, and the US Open, Australian Open 2025, 2024, 2023, 2022, and 2021 tournament-level competition-prize rows with unavailable financial denominators, US Open 2025, 2024, 2022, and 2021 tournament-level competition-prize rows with unavailable financial denominators, Wimbledon 2026 tournament-level competition prize money with unavailable financial denominators, Wimbledon 2025, 2024, 2023, 2022, and 2021 tournament-level competition-prize rows with compatible operating-company financial denominators, plus US Open and Roland Garros 2025/2024 tournament-level total-player-compensation context rows.

The seed includes compatible tournament-level revenue/profit ratios only for the Wimbledon tournament-total rows. Other records keep revenue, profit, or surplus unavailable rather than estimated.

The Wimbledon tournament-total rows use clean competition-prize-money numerators: total tennis events prize money of £62.55m for 2026, £52.0m for 2025, £48.55m for 2024, £43.25m for 2023, and £38.9m for 2022, plus the official historical total prize money line of £35.016m for 2021. The official 2026-2022 Wimbledon PDFs also report broader total prize money lines that include estimated per diems: £64.2m including £1.65m estimated per diems for 2026, £53.5m including £1.5m estimated per diems for 2025, £50.0m including £1.45m estimated per diems for 2024, £44.7m including £1.45m estimated per diems for 2023, and £40.35m including £1.45m estimated per diems for 2022. Those broader totals are not used as clean competition-prize-money numerators because the current schema keeps competition prize money separate from support-style compensation. The 2021 row is caveated separately: the current official historical table does not expose the newer total-tennis-events/per-diem subtotal shape, while a secondary cross-check says the £35.016m prize-money figure excludes accommodation and COVID testing support.

The Australian Open tournament-total rows use official AO/Tennis Australia total prize money: A$96.5m for 2025, A$86.5m for 2024, A$76.5m for 2023, A$74.0m for 2022, and A$71.0m for 2021. The cited AO/Tennis Australia sources describe the values as prize money or prize pool and do not identify separate per-diem or player-support components within those totals. If a future source separates support or compensation from competition prize money, that support should remain outside these clean numerator rows. The 2025 article also mentions A$120m across Australian Summer of Tennis events; that broader multi-event figure is not used as the Australian Open tournament numerator.

The US Open 2025 tournament-total competition-prize row uses US$85.0m. That value is derived from the official US Open/USTA US$90.0m total player-compensation announcement after excluding the official US$5.0m travel and hotel support component, with AP corroborating US$85.0m in competition prize money across competitions. The separate US$90.0m row remains `total_player_compensation` because it includes support/expense coverage. US Open revenue and profit/surplus remain unavailable because no US Open-specific compatible financial denominator is normalized.

The US Open 2024 tournament-total competition-prize row uses US$68.756m. That value is derived from the rendered official US Open/USTA payout schedule for staged singles, doubles, qualifying, and mixed-doubles events, with a secondary cross-check separating US$6.244m in per diem from the official US$75.0m total-player-compensation headline. The separate US$75.0m row remains `total_player_compensation` because it includes broader compensation beyond listed event payouts. The 2024 clean row is medium confidence because the official 2024 release is less explicit about support/per-diem components than the 2025 release. US Open revenue and profit/surplus remain unavailable because no US Open-specific compatible financial denominator is normalized.

The US Open 2022 tournament-total competition-prize row uses US$57.5301m. That value is derived from an archived official US Open prize-money page provenance link plus a secondary split that separates US$56.4981m in listed professional event payouts, US$1.032m in wheelchair event payouts, and US$2.5719m in per diem from the US$60.102m total prize-money line. The separate US$60.102m row remains `total_player_compensation` because it includes per diem beyond listed competition-event payouts. The 2022 clean row is medium confidence because the archived official page body was not readable in this environment and the per-diem split comes from a secondary cross-check. US Open revenue and profit/surplus remain unavailable because no US Open-specific compatible financial denominator is normalized.

The US Open 2021 tournament-total competition-prize row uses US$54.35944m. That value is derived from the official US Open/USTA release confirming a rounded US$57.5m in prize money and total player compensation plus a secondary split that separates US$53.75944m in listed event payouts, US$0.600m in other competition events, and US$3.10256m in estimated per diem from the US$57.462m exact total. The separate US$57.462m row remains `total_player_compensation` because it includes per diem beyond competition-event payouts. The 2021 clean row is medium confidence because the per-diem split is not stated directly in the official release. US Open revenue and profit/surplus remain unavailable because no US Open-specific compatible financial denominator is normalized.

US Open 2023 was rechecked but not normalized. The official US Open/USTA release frames US$65.0m as overall player compensation and describes expanded per diem, travel vouchers, hotel support, meal allowance, and racquet stringing without publishing a full clean staged-event payout subtotal or support split. That source shape is not clear enough for a clean tournament-total `competition_prize_money` row.

The Roland Garros 2025 total-player-compensation row uses AP's €56.352m figure as support-inclusive context. AP says the value includes per diems and payments to former players taking part in exhibitions. No official split was verified that separates clean competition prize money from those support/exhibition components, so no Roland Garros 2025 tournament-total `competition_prize_money` row is normalized in this slice. Roland Garros revenue and profit/surplus remain unavailable because no Roland Garros-specific compatible financial denominator is normalized, and FFT organization-level financials should remain out of tournament ratios unless a source bridges the scope explicitly.

The Roland Garros 2024 total-player-compensation row uses the official press kit's €53.478m total prize-money figure as support-inclusive context. The press kit says that total includes Legends Trophy prize money and Per Diem daily accommodation allowance. A secondary table citing the press kit separates €51.260m for listed events from €2.218m in other events plus estimated per diem, but that bundled remainder does not separate competition payouts from per diem/support. No clean Roland Garros 2024 tournament-total `competition_prize_money` row is normalized.

A deeper Roland Garros 2023/2022/2021 audit also ended without a normalized row. The official 2023 Roland Garros article reports a €49.6m total prize-money headline and category-level increases for singles, qualifying, wheelchair, quad, and doubles, but it does not publish a clean full tournament competition-prize subtotal separate from support or per-diem semantics. The secondary 2023 split separates €47.515m in listed events from €2.085m in other events plus estimated per diem. The 2022 secondary split separates €42.9886m in listed events from €0.6114m in other events plus estimated per diem and notes mixed doubles was not separately disclosed. The 2021 secondary split separates €34.023218m in listed events from €0.343998m in other events plus estimated per diem and says some wheelchair and mixed-doubles values were not separately disclosed. These bundled source shapes are not clean enough for a tournament-total `competition_prize_money` row.

The Wimbledon denominators are AELTC Championships Ltd operating-company values for the years ended 31 July 2025, 31 July 2024, 31 July 2023, 31 July 2022, and 31 July 2021. The 2025 row uses £423.626m turnover and £52.720m operating profit. The 2024 row uses £406.507m turnover and £54.332m operating profit. The 2023 row uses £380.156m turnover and £53.776m operating profit. The 2022 row uses £346.640m turnover and £47.057m operating profit. The 2021 row uses £287.970m turnover and £43.331m operating profit. The company filings say AELTC Championships Ltd is the principal contracting party for The Championships and that the statements reflect the results of, and division of surplus from, The Championships. These denominators are still caveated as operating-company values, not a separate two-week cash ledger, after-tax retained profit, dividends, LTA distributions, or broader organization-level values. The 2021 operating-profit denominator is additionally caveated because it includes £6.673m in insurance income related to the cancelled 2020 Championships. Wimbledon 2026 denominators remain unavailable because the AELTC Championships Ltd financial year ending 31 July 2026 had not ended as of 2026-07-05, so same-year accounts were not available.

Roland Garros and US Open event-level rows are medium confidence in this seed:

- Roland Garros uses a secondary source because a clear official FFT/Roland Garros prize-money page was not found in this research pass.
- The Roland Garros headline €56.352m and €53.478m totals are also medium confidence as normalized context rows because the parseable sources describe or include support-inclusive compensation, not clean competition prize money. Roland Garros 2023/2022/2021 remain unnormalized because the available official or secondary source shapes either lack a split or bundle other events with estimated per diem.
- The US Open official prize-money page still does not expose parseable crawler text for the event-level row; event values are cross-checked through a secondary page citing the official source. The official 2025 compensation release was verified in the rendered browser for the US$90.0m total-compensation and US$5.0m support split. The official 2024 release was also verified in the rendered browser, but the clean US$68.756m row remains medium confidence because the release does not state the support/per-diem split as explicitly as 2025. The archived official 2022 prize-money page URL and title were verified, but the archived body did not expose usable prize-money text, so the clean US$57.5301m row also remains medium confidence.

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

For the primary revenue/profit-share question, future rows should prefer full tournament prize-money totals. If an event-level numerator is ever compared with a tournament-level denominator, the docs or any downstream consumer must label it as partial rather than presenting it as the players' full tournament share.

The Australian Open 2025, 2024, 2023, 2022, and 2021 tournament-total numerators are full-tournament prize money, but their revenue and profit/surplus remain unavailable. Tennis Australia organization-level revenue or surplus should not be used as an AO tournament denominator unless a source explicitly bridges the organization-level accounts to the Australian Open tournament scope.

The US Open 2025, 2024, 2022, and 2021 total-player-compensation rows are not clean competition-prize-money totals. The active clean US Open tournament-total rows are US$85.0m for 2025, US$68.756m for 2024, US$57.5301m for 2022, and US$54.35944m for 2021; the US$90.0m, US$75.0m, US$60.102m, and US$57.462m compensation/support rows remain separate and are excluded from primary ratios.

The Roland Garros 2025 and 2024 total-player-compensation rows are also not clean competition-prize-money totals. The active dataset keeps the €56.352m and €53.478m compensation/support totals separate from the event-level men's singles row and excludes them from primary ratios until a source verifies a clean tournament-total competition-prize amount.

## Currency Caveats

The dataset does not include currency conversion. A ratio should be computed only when numerator and denominator currencies match exactly. If later tasks need cross-currency comparisons, they should add explicit FX source metadata, conversion dates, and validation notes.

## Profit And Surplus Caveats

Competition prize money / profit or surplus is unavailable when profit/surplus is missing, zero, negative, semantically incompatible, or in another currency. Negative and zero denominators should remain unavailable because a percentage would be misleading.

For Wimbledon 2025, 2024, 2023, 2022, and 2021, the selected profit denominator is operating profit before net finance income or cost, division of net available surplus to LTA Operations, taxation, and dividends or distribution mechanics. The normalized rows intentionally do not use net available surplus, profit before tax, profit after tax, or dividend values as the primary profit/surplus denominator. The 2021 row additionally discloses the £6.673m 2020-cancellation insurance income included in operating profit. Wimbledon 2026 does not have a normalized profit/surplus denominator yet.

## Round Payout Caveats

Round payout percentages compare each published round payout to the record's prize-money numerator only when currencies match. They should not be interpreted as the total share of the entire draw unless the allocation basis and draw counts are also modeled.

Doubles payouts may be per team while singles payouts are usually per player. The `allocation` field must remain visible where payout rows are shown.

The derived singles prize-pool rows use weighted round payouts across the 128-player main draw where an official per-event total was not available. This is still not a replacement for richer draw-size modeling.

## Source Confidence Caveats

Confidence describes source trust and data clarity, not truth in isolation.

- `high`: official or audited source with clear semantics.
- `medium`: reputable source or official source with some ambiguity.
- `low`: usable but limited source, likely with caveats.
- `mock`: fictional sample data only.

Future source expansion should prefer official tournament pages, annual reports, Form 990s, official financial statements, and official press releases. Secondary sources should be clearly labeled with lower confidence and notes.

The active seed applies this by using high-confidence official Australian Open, Wimbledon, and US Open 2025 tournament-total source semantics, and medium-confidence Roland Garros/US Open event-level rows, US Open 2024/2022/2021 tournament-total rows, plus Roland Garros 2025/2024 total-player-compensation context where source limitations or support-inclusive semantics remain.

## Maintenance Caveats

The `lastRefreshedAt` timestamp records the last successful data refresh or validation pass from the earlier workflow. It does not make manually sourced rows more authoritative; source confidence still comes from the underlying source metadata and normalization notes.

Future official-page, PDF, financial-report, or validation tooling should keep the same caveat discipline: no fabricated values, no hidden currency conversion, and no compatible financial ratios unless denominator semantics are clear.

## v0.1 Audit Notes

- No active mock/sample rows are present. If mock rows are reintroduced, the dataset mode, labels, source type, confidence, and value statuses must make that visible.
- Unavailable financial rows are kept as unavailable rather than hidden or silently treated as zero.
- Available Wimbledon financial rows are documented with operating-company caveats rather than being smoothed into generic tournament-profit language.
- Source limitations for Roland Garros and US Open event-level rows, support-inclusive semantics for Roland Garros 2025/2024 compensation, and medium-confidence US Open 2024/2022/2021 split semantics remain visible instead of being smoothed into high-confidence language.
