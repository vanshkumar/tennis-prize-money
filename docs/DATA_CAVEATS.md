# Data Caveats

## Current Dataset

The active dataset is a sourced seed for Grand Slam economics. It includes Australian Open 2017-2026 tournament competition-prize numerators with unavailable AO-only denominators; Wimbledon ratio-ready normal-edition rows for 2017-2025 plus 2026 prize money; US Open operating-revenue denominators for 2017-2024 and strict competition-prize numerators where support can be separated; Roland-Garros clean competition-prize/revenue rows for 2017-2020 and 2022-2025; and separate support-inclusive context rows.

The seed includes compatible revenue/profit ratios for Wimbledon, revenue-only ratios for US Open 2017, 2018, 2020-2024, Roland-Garros revenue and analytical-surplus ratios for 2017-2019, and Roland-Garros revenue-only ratios for 2020 and 2022-2025. US Open 2019 and Roland-Garros 2021 preserve revenue but leave the numerator unavailable because their source splits remain unresolved. Other records keep revenue, profit, or surplus unavailable rather than estimated.

The Wimbledon tournament-total rows use clean competition-prize-money numerators: total tennis events prize money of £62.55m for 2026, £52.0m for 2025, £48.55m for 2024, £43.25m for 2023, and £38.9m for 2022; the official historical total prize money line of £35.016m for 2021; the medium-confidence 2019 events subtotal of £36.919m; and official-PDF-derived competition-event subtotals of £32.921m for 2018 and £30.523m for 2017. The official 2026-2022 Wimbledon PDFs report broader total prize money lines that include estimated per diems: £64.2m including £1.65m estimated per diems for 2026, £53.5m including £1.5m estimated per diems for 2025, £50.0m including £1.45m estimated per diems for 2024, £44.7m including £1.45m estimated per diems for 2023, and £40.35m including £1.45m estimated per diems for 2022. The official 2018 PDF reports £34.0m total prize money with £1.079m estimated player per diems for 2018 and a 2017 comparative £31.6m total with £1.077m estimated player per diems. Those broader totals are not used as clean competition-prize-money numerators because the current schema keeps competition prize money separate from support-style compensation. The 2021 row is caveated separately: the current official historical table does not expose the newer total-tennis-events/per-diem subtotal shape, while a secondary cross-check says the £35.016m prize-money figure excludes accommodation and COVID testing support. Wimbledon 2020 is not normalized as a normal tournament row because The Championships were canceled.

The Australian Open tournament-total rows use official AO/Tennis Australia total prize money where available: A$111.5m for 2026, A$96.5m for 2025, A$86.5m for 2024, A$76.5m for 2023, A$74.0m for 2022, and A$71.0m for 2021. Medium-confidence secondary historical pages provide A$71.0m for 2020, A$62.5m for 2019, A$55.0m for 2018, and A$50.0m for 2017. The cited sources describe the values as prize money or prize pool and do not identify separate per-diem or player-support components within those totals. If a future source separates support or compensation from competition prize money, that support should remain outside these clean numerator rows. The 2026 source also describes broader Summer of Tennis investment and player-support improvements separately from the AO prize-pool line; the 2025 article mentions A$120m across Australian Summer of Tennis events. Those broader multi-event figures are not used as Australian Open tournament numerators.

The US Open 2025 tournament-total competition-prize row uses US$85.0m. That value is derived from the official US Open/USTA US$90.0m total player-compensation announcement after excluding the official US$5.0m travel and hotel support component, with AP corroborating US$85.0m in competition prize money across competitions. The separate US$90.0m row remains `total_player_compensation` because it includes support/expense coverage. US Open revenue and profit/surplus remain unavailable because no US Open-specific compatible financial denominator is normalized.

The US Open 2024 tournament-total competition-prize row uses US$68.756m. That value is derived from the rendered official US Open/USTA payout schedule for staged singles, doubles, qualifying, and mixed-doubles events, with a secondary cross-check separating US$6.244m in per diem from the official US$75.0m total-player-compensation headline. The separate US$75.0m row remains `total_player_compensation` because it includes broader compensation beyond listed event payouts. The 2024 clean row is medium confidence because the official 2024 release is less explicit about support/per-diem components than the 2025 release. Its revenue denominator is audited US Open operating revenue of US$559.658m; profit/surplus remains unavailable.

The US Open 2022 tournament-total competition-prize row uses US$57.5301m. That value is derived from an archived official US Open prize-money page provenance link plus a secondary split that separates US$56.4981m in listed professional event payouts, US$1.032m in wheelchair event payouts, and US$2.5719m in per diem from the US$60.102m total prize-money line. The separate US$60.102m row remains `total_player_compensation` because it includes per diem beyond listed competition-event payouts. The 2022 clean row is medium confidence because the archived official page body was not readable in this environment and the per-diem split comes from a secondary cross-check. The revenue denominator is USTA audited US Open operating revenue of US$472.172m. Profit/surplus remains unavailable because the audited statements list US Open expense lines but no explicit US Open tournament profit/surplus line is normalized.

The US Open 2021 tournament-total competition-prize row uses US$54.35944m. That value is derived from the official US Open/USTA release confirming a rounded US$57.5m in prize money and total player compensation plus a secondary split that separates US$53.75944m in listed event payouts, US$0.600m in other competition events, and US$3.10256m in estimated per diem from the US$57.462m exact total. The separate US$57.462m row remains `total_player_compensation` because it includes per diem beyond competition-event payouts. The 2021 clean row is medium confidence because the per-diem split is not stated directly in the official release. The revenue denominator is USTA audited US Open operating revenue of US$406.172m. Profit/surplus remains unavailable because the audited statements list US Open expense lines but no explicit US Open tournament profit/surplus line is normalized.

The added US Open rows use strict competition totals of US$48.5868m for 2017, US$50.91584m for 2018, US$43.662m for the pandemic-format 2020 event, and US$60.3436m for 2023. Each excludes identified Legends/Champions Invitational, pension, per diem, relief, hotel, travel, meal, and stringing support as applicable. Their audited operating-revenue denominators are US$347.593m, US$380.144m, US$181.210m, and US$514.105m. The 2017/2018/2023 clean splits remain medium confidence because complete category separation depends partly on secondary transcriptions citing archived official pages.

US Open 2019 preserves audited operating revenue of US$399.601m but has no strict full-tournament numerator. The official fact sheet reports US$53.5175m in listed professional draws and bundles US$0.650m across wheelchair competition and Legends. Player pension and per diem are separately excluded, but the wheelchair/Legends bundle cannot be split without inference.

The Roland-Garros 2025 clean row uses EUR54.03217m from complete official press-kit category tables and excludes the EUR2.31983m Legends/per-diem residual from the EUR56.352m headline. The separate support-inclusive context row remains. A secondary report supplies EUR395m in tournament revenue, so the combined row is medium confidence; no explicit tournament profit/surplus was found.

The Roland-Garros 2024 clean row uses EUR51.260m from complete official press-kit category tables and excludes EUR2.218m in Legends/per diem from the EUR53.478m headline. Official FFT financial reporting supplies EUR345.7m in tournament products/revenue and EUR201.5m in tournament charges. The charges are useful context, but the EUR144.2m difference is not normalized as profit because FFT does not label it tournament profit or surplus.

Roland-Garros 2023 and 2022 now have clean competition totals of EUR47.515m and EUR43.5806m reconstructed from complete category schedules, paired with FFT-attributed tournament turnover of EUR328m and EUR308m. The 2022 revenue conflicts with a separate EUR325m report lacking a clear definition, so the normalized value remains medium confidence. Roland-Garros 2020 uses EUR36.409676m competition prize money and EUR147m turnover, with a COVID-format caveat. Roland-Garros 2021 preserves EUR184.5m turnover but no numerator: its complete category reconstruction exceeds the official headline by EUR6,002, and the dataset does not insert an unexplained balancing adjustment.

Roland-Garros 2017-2019 use provisional/derived competition totals of EUR34.067m, EUR37.3452m, and EUR40.671m. The 2017 and 2018 numerators remain medium confidence because surviving detailed schedules conflict or require wheelchair reconstruction; 2019 has complete official category schedules. FFT Internationaux de France analytical P&Ls report products of EUR222.430m, EUR225.010m, and EUR247.265m, plus `solde analytique` of EUR85.480m, EUR80.887m, and EUR90.590m. The normalized `tournament_surplus` values are analytical tournament balances, not FFT statutory net profit; `M.B.A.` and separately reported La Griffe values are not substituted.

The Wimbledon denominators are AELTC Championships Ltd operating-company values for the years ended 31 July 2025, 31 July 2024, 31 July 2023, 31 July 2022, 31 July 2021, 31 July 2019, 31 July 2018, and 31 July 2017. The 2025 row uses £423.626m turnover and £52.720m operating profit. The 2024 row uses £406.507m turnover and £54.332m operating profit. The 2023 row uses £380.156m turnover and £53.776m operating profit. The 2022 row uses £346.640m turnover and £47.057m operating profit. The 2021 row uses £287.970m turnover and £43.331m operating profit. The 2019 row uses £292.071m turnover and £50.134m operating profit. The 2018 row uses £254.873m turnover and £42.237m operating profit. The 2017 row uses £216.145m turnover and £37.294m operating profit. The company filings say AELTC Championships Ltd is the principal contracting party for The Championships and that the statements reflect the results of, and division of surplus from, The Championships. These denominators are still caveated as operating-company values, not a separate two-week cash ledger, after-tax retained profit, dividends, LTA distributions, or broader organization-level values. The 2021 operating-profit denominator is additionally caveated because it includes £6.673m in insurance income related to the cancelled 2020 Championships. The 2020 accounts are not used for a normal ratio row because The Championships were canceled and the reported operating profit includes cancellation insurance income. Wimbledon 2026 denominators remain unavailable because the AELTC Championships Ltd financial year ending 31 July 2026 had not ended as of 2026-07-09, so same-year accounts were not available.

Some Roland-Garros and US Open event-level or reconstructed tournament rows remain medium confidence:

- The original Roland-Garros 2025 men's-singles event row still uses a secondary source. The new tournament-total rows use official press kits/category schedules where available, with explicit lower confidence on reconstructed or secondary components.
- The Roland-Garros EUR56.352m and EUR53.478m headline totals remain separate support-inclusive context rows. Clean tournament rows now exist for 2020 and 2022-2025; 2021 alone remains unavailable because its complete reconstruction does not reconcile.
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

The Australian Open 2026 through 2017 tournament-total numerators are full-tournament prize money, but their revenue and profit/surplus remain unavailable. Tennis Australia organization-level revenue or surplus should not be used as an AO tournament denominator unless a source explicitly bridges the organization-level accounts to the Australian Open tournament scope.

The US Open 2025, 2024, 2022, and 2021 total-player-compensation rows are not clean competition-prize-money totals. The active clean US Open tournament-total rows are US$85.0m for 2025, US$68.756m for 2024, US$57.5301m for 2022, and US$54.35944m for 2021; the US$90.0m, US$75.0m, US$60.102m, and US$57.462m compensation/support rows remain separate and are excluded from primary ratios. US Open 2022 and 2021 are eligible for prize-money/revenue ratios because the USTA audited statements report US Open operating revenue directly; they remain ineligible for prize-money/profit ratios.

The Roland Garros 2025 and 2024 total-player-compensation rows are also not clean competition-prize-money totals. The active dataset keeps the €56.352m and €53.478m compensation/support totals separate from the event-level men's singles row and excludes them from primary ratios until a source verifies a clean tournament-total competition-prize amount.

## Currency Caveats

The dataset does not include currency conversion. A ratio should be computed only when numerator and denominator currencies match exactly. If later tasks need cross-currency comparisons, they should add explicit FX source metadata, conversion dates, and validation notes.

## Profit And Surplus Caveats

Competition prize money / profit or surplus is unavailable when profit/surplus is missing, zero, negative, semantically incompatible, or in another currency. Negative and zero denominators should remain unavailable because a percentage would be misleading.

For Wimbledon 2025, 2024, 2023, 2022, 2021, 2019, 2018, and 2017, the selected profit denominator is operating profit before net finance income or cost, division of net available surplus to LTA Operations, taxation, and dividends or distribution mechanics. The normalized rows intentionally do not use net available surplus, profit before tax, profit after tax, or dividend values as the primary profit/surplus denominator. The 2021 row additionally discloses the £6.673m 2020-cancellation insurance income included in operating profit. Wimbledon 2020 is excluded as a canceled-event year, and Wimbledon 2026 does not have a normalized profit/surplus denominator yet.

For US Open 2022 and 2021, do not compute profit/surplus from reported US Open expense lines unless a future task adds an explicit derived-profit model and caveat. The current dataset records the audited operating revenue line only.

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

The active seed applies this by using high-confidence official Australian Open 2026/2025/2024/2023/2022/2021, Wimbledon 2026/2025/2024/2023/2022/2021/2018/2017, and US Open 2025 tournament-total source semantics; medium-confidence Australian Open 2020/2019/2018/2017, Wimbledon 2019, US Open 2024/2022/2021, Roland Garros/US Open event-level rows; plus Roland Garros 2025/2024 total-player-compensation context where source limitations or support-inclusive semantics remain.

## Maintenance Caveats

The `lastRefreshedAt` timestamp records the last successful data refresh or validation pass from the earlier workflow. It does not make manually sourced rows more authoritative; source confidence still comes from the underlying source metadata and normalization notes.

Future official-page, PDF, financial-report, or validation tooling should keep the same caveat discipline: no fabricated values, no hidden currency conversion, and no compatible financial ratios unless denominator semantics are clear.

## v0.1 Audit Notes

- No active mock/sample rows are present. If mock rows are reintroduced, the dataset mode, labels, source type, confidence, and value statuses must make that visible.
- Unavailable financial rows are kept as unavailable rather than hidden or silently treated as zero.
- Available Wimbledon financial rows are documented with operating-company caveats rather than being smoothed into generic tournament-profit language.
- Source limitations for Roland Garros and US Open event-level rows, support-inclusive semantics for Roland Garros 2025/2024 compensation, medium-confidence US Open 2024/2022/2021 split semantics, and US Open 2022/2021 revenue-only denominator coverage remain visible instead of being smoothed into high-confidence language.
