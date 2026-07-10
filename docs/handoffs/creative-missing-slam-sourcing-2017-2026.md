# Creative Missing-Slam Sourcing Handoff

Date: 2026-07-10

## Goal

Recover enough 2017-2026 Grand Slam competition prize money, tournament revenue, and tournament profit/surplus data to answer:

1. Competition prize money as a percentage of tournament revenue.
2. Competition prize money as a percentage of tournament profit or surplus.

Strict numerator scope excludes per diem, travel/hotel/stringing support, pensions, relief funds, Legends/exhibitions, and juniors. Revenue-minus-selected-expense arithmetic is not treated as profit.

## Research Method

Six xhigh Codex tasks searched in parallel for US Open audits, US Open historical prize schedules, Australian Open financial denominators, Roland-Garros finances, Roland-Garros category schedules, and archive/document-library leads. Interrupted tasks were resumed with narrower prompts until each produced a final handoff.

The most productive non-obvious paths were:

- Following comparative columns across USTA audited statements instead of searching each year independently.
- Recovering old USTA PDFs by document-library filename patterns.
- Reading FFT general-meeting appendices for tournament analytical P&Ls.
- Summing official Roland-Garros category tables rather than using support-inclusive headlines.
- Preserving a financial-only row when a denominator is known but the strict numerator is unresolved.

## Ratio-Ready Additions

Percentages below are arithmetic checks from normalized same-currency values; ratios are not stored as separate source facts.

| Tournament | Year | Competition prize | Revenue | Prize / revenue | Profit or surplus | Prize / profit or surplus |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| US Open | 2017 | US$48.5868m | US$347.593m | 13.9781% | unavailable | unavailable |
| US Open | 2018 | US$50.91584m | US$380.144m | 13.3938% | unavailable | unavailable |
| US Open | 2020 | US$43.662m | US$181.210m | 24.0947% | unavailable | unavailable |
| US Open | 2021 | US$54.35944m | US$406.172m | 13.3834% | unavailable | unavailable |
| US Open | 2022 | US$57.5301m | US$472.172m | 12.1841% | unavailable | unavailable |
| US Open | 2023 | US$60.3436m | US$514.105m | 11.7376% | unavailable | unavailable |
| US Open | 2024 | US$68.756m | US$559.658m | 12.2854% | unavailable | unavailable |
| Roland-Garros | 2017 | EUR34.067m | EUR222.430m | 15.3158% | EUR85.480m analytical surplus | 39.8538% |
| Roland-Garros | 2018 | EUR37.3452m | EUR225.010m | 16.5971% | EUR80.887m analytical surplus | 46.1696% |
| Roland-Garros | 2019 | EUR40.671m | EUR247.265m | 16.4483% | EUR90.590m analytical surplus | 44.8957% |
| Roland-Garros | 2020 | EUR36.409676m | EUR147.0m | 24.7685% | unavailable | unavailable |
| Roland-Garros | 2022 | EUR43.5806m | EUR308.0m | 14.1495% | unavailable | unavailable |
| Roland-Garros | 2023 | EUR47.515m | EUR328.0m | 14.4863% | unavailable | unavailable |
| Roland-Garros | 2024 | EUR51.260m | EUR345.7m | 14.8279% | unavailable | unavailable |
| Roland-Garros | 2025 | EUR54.03217m | EUR395.0m | 13.6790% | unavailable | unavailable |

Wimbledon ratio-ready rows were already present for 2017, 2018, 2019, and 2021-2025. Wimbledon 2020 was canceled. Australian Open 2017-2026 numerators were already present, but no AO-only financial denominator was found.

## Financial Sources

### US Open

USTA audited consolidated statements provide a continuous US Open operating-revenue series for 2017-2024. Comparative statements bridge every year. Values are on the US Open operating-revenue line and are stated in USD thousands.

Key source files:

- 2018/2017: <https://www.usta.com/content/dam/usta/pdfs/USTA_Consolidated_Financials_2018_FINAL_SIGNED.pdf>
- 2020/2019: <https://www.usta.com/content/dam/usta/990-pdfs/2020-USTA-and-Affiliates-Consolidated-Financial-Statements.pdf>
- 2022/2021: <https://www.usta.com/content/dam/usta/2023-pdfs/USTA-2022-Affiliates-Consolidated-Financial-Statements.pdf>
- 2024/2023: <https://www.usta.com/content/dam/usta/2025-pdfs/2025-usta-and-affiliates-consolidated-financial-statements.pdf>

The audits disclose US Open expense lines but never label their difference from revenue as tournament profit, surplus, net income, or operating income. Consolidated USTA excess is organization-wide. US Open profit therefore remains unavailable.

### Roland-Garros

FFT general-meeting appendices contain an `Internationaux de France` analytical P&L for 2017-2019. `TOTAL DES PRODUITS` is normalized as tournament revenue and `SOLDE ANALYTIQUE` as `tournament_surplus`. `M.B.A.` and separately reported La Griffe values are not substituted.

- 2017/2018 official FFT PDF, digital page 63: <https://guidedudirigeant.fft.fr/wp-content/uploads/2019/03/AG-FFT-19-20-janvier-2019-PV.pdf>
- 2019 FFT-branded minutes on affiliated league mirror, digital page 86: <https://www.liguetennis-caledonie.com/wp-content/uploads/2020/02/PV-AG-FFT-14-et-15-decembre-2019.pdf>
- 2024 official FFT report: <https://fft-site.cdn.prismic.io/fft-site/aNaHjp5xUNkB1Jeo_PROCESVERBALASSEMBLEEGENERALE14DECEMBRE2024.pdf>

The 2024 report gives EUR345.7m products and EUR201.5m charges but does not label the EUR144.2m difference as profit/surplus. Modern profit therefore remains unavailable.

## Numerator Decisions

- US Open 2017 excludes US$0.400m Champions Invitational and US$1.478m per diem; wheelchair prize is retained.
- US Open 2018 uses listed draws plus US$0.350m wheelchair and excludes the unexplained remainder of the US$53m compensation headline.
- US Open 2019 remains unavailable because the official US$0.650m line combines wheelchair and Legends.
- US Open 2020 excludes US$7.6m relief and US$2.14m direct hotel payments.
- US Open 2023 excludes US$4.65642m expense assistance.
- Roland-Garros category tables exclude Legends and per diem. The 2017/2018 totals remain provisional medium confidence because surviving detailed schedules conflict or require wheelchair reconstruction.
- Roland-Garros 2021 remains unavailable because reconstructed categories total EUR34.373218m, EUR6,002 above the official EUR34.367216m headline.

## Remaining Gaps

1. Australian Open AO-only revenue and profit/surplus for every year. Best target: annual settlement/reconciliation statements under the Tennis Australia/Melbourne & Olympic Parks Operational Agreement and Australian Open Framework Agreement.
2. US Open 2019 strict wheelchair-versus-Legends split.
3. US Open 2025 operating revenue, expected in the next USTA comparative audit if publication continues.
4. Roland-Garros 2021 exact category reconciliation.
5. Explicit modern Roland-Garros and US Open tournament profit/surplus.
6. Wimbledon 2026 revenue/profit after the financial year ending 31 July 2026 is reported.

## Files Changed

- `data/raw/source-metadata/grandSlam2025Sources.json`
- `data/normalized/grandSlam2025MensSingles.json`
- `data/static/seedDatasetMetadata.json`
- Project source, caveat, model, future-work, changelog, task-log, and learning documentation.
