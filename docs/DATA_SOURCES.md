# Data Sources

## Current Scope

Version `0.1.0` shipped a small seed dataset for 2025 Grand Slam men's singles prize money. The current unreleased dataset adds schema-version-2 numerator semantics, an Australian Open 2025 tournament-total competition-prize row, one US Open total-player-compensation context row, and compatible primary-question Wimbledon 2025 and 2024 tournament-total financial slices. The active dataset is stored in:

- `src/data/static/seedDatasetMetadata.json`
- `src/data/raw/source-metadata/grandSlam2025Sources.json`
- `src/data/normalized/grandSlam2025MensSingles.json`

The first server-side refresh pipeline and generic JSON manifest adapter are implemented. Tournament-specific source adapters are not implemented yet, so the seed rows below remain manually normalized from the cited sources and validated at app import time, in Vitest fixtures, and during `npm run refresh:data`.

## Source Inventory

| Source id | URL | Publisher | Fields covered | Confidence | Known limitations | Adapter implemented |
| --- | --- | --- | --- | --- | --- | --- |
| `ao-2025-prize-money-release` | [Australian Open prize money increases more than 11 per cent in 2025](https://ausopen.com/articles/news/australian-open-prize-money-increases-more-11-cent-2025) | Australian Open / Tennis Australia | Total 2025 AO prize pool of A$96.5m, currency, headline singles payouts | High | Article is summary-level; full round table comes from the PDF source. It also mentions A$120m across Australian Summer of Tennis events, which is not used as the AO tournament numerator. | No |
| `ao-2025-prize-money-pdf` | [Australian Open Prize Money 2021-2025](https://www.tennis.com.au/wp-content/uploads/2025/01/AO25-Prize-Money.pdf) | Tennis Australia | Men's/women's singles per-player round payouts, singles event total, total tournament prize money of A$96.5m | High | PDF parsing is manual in v0.1; future adapter should parse tables. The PDF does not identify a separate player-support/per-diem component. | No |
| `roland-garros-2025-secondary-prize-money` | [2025 French Open prize money table](https://en.wikipedia.org/wiki/2025_French_Open#Prize_money) | Wikipedia, citing The Independent | Singles round payouts and total tournament prize money | Medium | No official Roland Garros/FFT prize-money URL was verified in this task; replace with official source when found. | No |
| `wimbledon-2025-prize-money-pdf` | [The Championships, Wimbledon 2025 Prize Money](https://www.wimbledon.com/pdf/Wimbledon_Prize_Money_2025.pdf) | The All England Lawn Tennis Club / Wimbledon | Gentlemen's/ladies' singles per-player round payouts, singles event total, £52.0m total tennis events prize money, £1.5m estimated per diems, £53.5m broader total prize money | High | PDF parsing is manual in v0.1; normalized clean competition-prize row uses £52.0m total tennis events prize money and excludes estimated per diems. | No |
| `wimbledon-aeltc-championships-2025-accounts` | [AELTC Championships Ltd full accounts made up to 31 July 2025](https://find-and-update.company-information.service.gov.uk/company/07546773/filing-history/MzUxNzE0NjY3OGFkaXF6a2N4/document?format=pdf&download=0) | Companies House / The All England Lawn Tennis Club (Championships) Limited | 2025 turnover £423.626m, operating profit £52.720m, accounting policy and surplus-division caveats | High | Scanned Companies House PDF; values were manually verified from the strategic report, profit and loss account, and accounting-policy notes. Denominators are AELTC Championships Ltd operating-company values for The Championships, not LTA/AELTC organization-level values or after-tax retained profit. | No |
| `wimbledon-2024-prize-money-pdf` | [The Championships, Wimbledon 2024 Prize Money](https://www.wimbledon.com/pdf/Wimbledon_Prize_Money_2024.pdf) | The All England Lawn Tennis Club / Wimbledon | Gentlemen's/ladies' singles per-player round payouts, singles event total, £48.55m total tennis events prize money, £1.45m estimated per diems, £50.0m broader total prize money | High | PDF parsing is manual in v0.1; normalized clean competition-prize row uses £48.55m total tennis events prize money and excludes estimated per diems. | No |
| `wimbledon-aeltc-championships-2024-accounts` | [AELTC Championships Ltd full accounts made up to 31 July 2024](https://find-and-update.company-information.service.gov.uk/company/07546773/filing-history/MzQ2MzQ1ODMzM2FkaXF6a2N4/document?download=0&format=pdf) | Companies House / The All England Lawn Tennis Club (Championships) Limited | 2024 turnover £406.507m, operating profit £54.332m, accounting policy and surplus-division caveats | High | Scanned Companies House PDF; values were manually verified from the strategic report, profit and loss account, and accounting-policy notes. Denominators are AELTC Championships Ltd operating-company values for The Championships, not LTA/AELTC organization-level values or after-tax retained profit. | No |
| `us-open-2025-prize-money-page` | [2025 US Open Prize Money](https://www.usopen.org/en_US/visit/prize_money.html) | United States Tennis Association / US Open | US Open prize-money table and total player compensation | Medium | Official page was reachable but did not expose crawler-readable text in this task. | No |
| `us-open-2025-compensation-release` | [2025 US Open prize money sets record for largest purse in tennis history](https://www.usopen.org/en_US/news/articles/2025-08-06/2025_us_open_prize_money_sets_record_for_largest_purse_in_tennis_history.html) | United States Tennis Association / US Open | Official URL for 2025 player-compensation announcement | Medium | Official page URL is identified but not crawler-readable in this environment; AP is used for parseable corroboration. | No |
| `us-open-2025-ap-compensation-split` | [US Open singles champions will get a record $5 million in 2025 and total compensation is up 20%](https://apnews.com/article/prize-money-us-open-2025-8134bd075f194c38011b3e8eff81fd56) | Associated Press | Parseable 2025 split: nearly $85m competition prize money across events and $90m total player compensation | Medium | Reputable secondary source; not a substitute for a parseable official competition-prize total. | No |
| `us-open-2025-secondary-crosscheck` | [US Open prize-money table](https://en.wikipedia.org/wiki/US_Open_(tennis)#Prize_money) | Wikipedia, citing the official US Open prize-money page | Singles round payouts, combined singles total, total player compensation | Medium | Used only as a cross-check because the official page did not parse in this environment. | No |

## Refresh Adapter Status

The current refresh adapter accepts a server-side JSON manifest with this shape:

```json
{
  "sources": [],
  "records": []
}
```

Those arrays must already match the app data model. The adapter fetches the manifest, normalizes through the existing parsers, merges rows by id, validates the full dataset, and writes static JSON only after validation succeeds.

Official tournament page adapters, PDF table parsers, and financial-report adapters remain future work.

## Normalized Seed Rows

| Record | Event scope | Numerator category | Prize/compensation value | Currency | Status | Confidence | Notes |
| --- | --- | --- | ---: | --- | --- | --- | --- |
| `australian-open-2025-ms` | Men's singles, 128-player main draw | `competition_prize_money` | 33,108,000 | AUD | Official | High | Official per-event singles total from Tennis Australia PDF. |
| `australian-open-2025-tournament-total` | Tournament total prize money | `competition_prize_money` | 96,500,000 | AUD | Official | High | Official AO/Tennis Australia total prize pool for Australian Open 2025. Revenue/profit remain unavailable because no AO-specific compatible denominator is normalized. |
| `roland-garros-2025-ms` | Men's singles, 128-player main draw | `competition_prize_money` | 20,509,000 | EUR | Derived | Medium | Weighted sum of listed singles round payouts from secondary source. |
| `wimbledon-2025-ms` | Gentlemen's singles, 128-player main draw | `competition_prize_money` | 19,414,000 | GBP | Official | High | Official per-event singles total from Wimbledon PDF. |
| `wimbledon-2025-tournament-total` | Tournament total tennis events prize money | `competition_prize_money` | 52,000,000 | GBP | Official | High | Official Wimbledon total tennis events prize money, excluding £1.5m estimated per diems from the broader £53.5m total prize money line. Compatible denominators: AELTC Championships Ltd turnover £423.626m and operating profit £52.720m. |
| `wimbledon-2024-tournament-total` | Tournament total tennis events prize money | `competition_prize_money` | 48,550,000 | GBP | Official | High | Official Wimbledon total tennis events prize money, excluding £1.45m estimated per diems from the broader £50.0m total prize money line. Compatible denominators: AELTC Championships Ltd turnover £406.507m and operating profit £54.332m. |
| `us-open-2025-ms` | Men's singles, 128-player main draw | `competition_prize_money` | 31,620,000 | USD | Derived | Medium | Weighted sum of listed singles round payouts, cross-checked against official-source citation. |
| `us-open-2025-total-player-compensation` | Tournament-level player compensation | `total_player_compensation` | 90,000,000 | USD | Reported | Medium | AP parses USTA announcement as nearly $85m competition prize money plus support/expense coverage to reach $90m total compensation; excluded from revenue/profit ratios. |

## Financial Data Status

The active seed includes two compatible Wimbledon financial denominator slices:

- `wimbledon-2025-tournament-total` uses AELTC Championships Ltd turnover of £423.626m as a compatible operating-company revenue denominator for The Championships.
- The same row uses AELTC Championships Ltd operating profit of £52.720m as a compatible operating-company profit denominator for The Championships.
- `wimbledon-2024-tournament-total` uses AELTC Championships Ltd turnover of £406.507m as a compatible operating-company revenue denominator for The Championships.
- The same row uses AELTC Championships Ltd operating profit of £54.332m as a compatible operating-company profit denominator for The Championships.

The 2025 filing also reports net finance income, a £48.117m division of net available surplus to LTA Operations, £6.737m profit before tax, £5.591m profit after tax, and a £5.0m dividend. The 2024 filing reports net finance income, a £49.853m division of net available surplus to LTA Operations, £6.161m profit before tax, and £5.120m profit after tax. Those values are not used as primary denominators. They remain caveats because they reflect surplus division, retained profit, taxation, or distribution mechanics rather than the operating profit denominator selected for the Wimbledon rows.

All non-Wimbledon seed records still leave tournament-level revenue, profit, or surplus unavailable. Tennis Australia annual-report values, USTA organization-level financials, other organization-level revenues, press estimates, and player-share claims are not normalized as compatible denominators unless a future task can tie them to a specific tournament/event and currency.

## Primary-Question Research Leads

The 2026-07-05 research sweep focused on the dashboard's primary question: prize money as a percentage of tournament revenue or profit/surplus. Wimbledon rows and the 2025 Australian Open numerator marked completed are now normalized; the remaining tournament leads are not normalized into JSON yet.

| Priority | Tournament | Candidate numerator | Candidate denominator | Current recommendation |
| --- | --- | --- | --- | --- |
| 1 | Wimbledon | Normalized 2025 clean competition-prize row uses £52.0m total tennis events prize money. Normalized 2024 clean competition-prize row uses £48.55m total tennis events prize money. The broader total prize money lines include estimated per diems and are not used as clean numerators. | Normalized denominators: 2025 AELTC Championships Ltd turnover £423.626m and operating profit £52.720m; 2024 turnover £406.507m and operating profit £54.332m. | Completed for 2025 and 2024 with explicit operating-company caveats. Possible next Wimbledon work: extend the prior-year series if official PDFs and accounts remain semantically consistent. |
| 2 | Roland Garros | Total prize money lead: 2025 €56.352m and 2024 €53.478m from Roland Garros press-kit citations / secondary tables. | Revenue leads: 2025 €395m from Guardian reporting on a player statement; 2024 €340m from secondary/Bloomberg-cited reporting. No tournament profit/surplus found. | Possible revenue-share row only with medium/low confidence and visible secondary-source caveat; do not add profit/surplus. |
| 3 | Australian Open | Normalized 2025 clean competition-prize row uses official A$96.5m total prize money from AO/Tennis Australia. 2024 A$86.5m remains a lead for a prior-year numerator. | Tennis Australia annual reports disclose organization-level revenue and surplus, not AO tournament revenue/profit. | 2025 numerator completed. Keep revenue/profit unavailable unless AO-specific financial denominators are found; add 2024 numerator only after source semantics are rechecked. |
| 4 | US Open | Official total player compensation/prize package: 2024 US$75.0m and 2025 US$90.0m from US Open sources; AP parses 2025 competition prize money as nearly US$85.0m. | USTA Form 990 values are organization-wide; a secondary FT operating-revenue lead needs primary confirmation. No tournament profit/surplus found. | Keep the US$90.0m row as `total_player_compensation`; do not use it in revenue/profit ratios unless a clean competition-prize total and tournament denominator are verified. |

Useful lead URLs:

- Wimbledon 2025 prize money: <https://www.wimbledon.com/pdf/Wimbledon_Prize_Money_2025.pdf>
- Wimbledon 2024 prize money: <https://www.wimbledon.com/pdf/Wimbledon_Prize_Money_2024.pdf>
- AELTC Championships Ltd filings: <https://find-and-update.company-information.service.gov.uk/company/07546773/filing-history>
- AO 2025 prize release: <https://ausopen.com/articles/news/australian-open-prize-money-increases-more-11-cent-2025>
- AO25 prize-money PDF: <https://www.tennis.com.au/wp-content/uploads/2025/01/AO25-Prize-Money.pdf>
- Tennis Australia annual reports: <https://www.tennis.com.au/about-us/reports-publications-national-policies/annual-reports>
- US Open 2024 prize-money release: <https://www.usopen.org/en_US/news/articles/2024-08-07/2024_us_open_prize_money_will_be_largest_purse_in_tennis_history.html>
- US Open 2025 prize-money release: <https://www.usopen.org/en_US/news/articles/2025-08-06/2025_us_open_prize_money_sets_record_for_largest_purse_in_tennis_history.html>
- USTA Form 990 summary: <https://projects.propublica.org/nonprofits/organizations/135459420>
- Roland Garros revenue lead: <https://www.theguardian.com/sport/2026/may/03/tennis-french-open-prize-money-novak-djokovic-jannik-sinner-aryna-sabalenka>
- Roland Garros 2025 prize-money lead: <https://de.wikipedia.org/wiki/French_Open_2025>

Data-model implication: the primary ratio should prefer full tournament competition-prize-money totals over event-level men's singles rows. Event-level rows can still exist, but any comparison to tournament revenue must be labeled as partial or kept unavailable. Total player compensation/support rows must remain separate from clean competition-prize-money numerators. Wimbledon 2025 and 2024 demonstrate the distinction: the clean rows use total tennis events prize money, while the broader total prize money lines with estimated per diems stay out of the ratio numerator. Australian Open 2025 has no separated support line in the cited AO/Tennis Australia sources, so A$96.5m is normalized as competition prize money while AO financial denominators remain unavailable.

## v0.1 Audit Status

- No active mock/sample rows are present in the `real` seed dataset.
- Every active source row includes URL, publisher, source type, accessed date, confidence, and notes.
- Every available prize-pool, payout, and round-payout value references at least one source id.
- Medium-confidence rows remain visibly caveated in source notes, record caveats, and the dashboard source panel.
- Revenue and profit/surplus are available only for the Wimbledon tournament-total rows; other rows remain unavailable, not estimated or inferred.

## Access Date

All active source entries were accessed on 2026-07-05.
