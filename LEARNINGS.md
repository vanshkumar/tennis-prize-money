# Learnings

## What Has Worked

**2026-07-10 - Data archive scope**
- Observation: The durable project surface is the JSON under `data/` plus provenance documentation; the former dashboard, deployment, package, and refresh code are intentionally gone.
- Action: Keep work limited to sourced data, normalization semantics, validation, and handoffs unless the user explicitly changes direction.
- Confidence: high

**2026-07-10 - US Open financial sourcing**
- Observation: USTA comparative audited statements expose two adjacent years of US Open operating revenue, producing a continuous 2017-2024 series from four PDFs.
- Action: Follow comparative columns and direct USTA document-library URLs before using Form 990 data; keep tournament expense lines and USTA-wide excess separate from explicit US Open profit.
- Confidence: high

**2026-07-10 - Roland-Garros sourcing**
- Observation: Complete FFT category tables can recover clean competition-prize totals even when headlines include Legends or per diem; FFT general-meeting appendices provide `Internationaux de France` analytical P&Ls for 2017-2019.
- Action: Sum every staged competition category and reconcile it to the headline. Normalize `solde analytique` as `tournament_surplus`, not statutory net profit; do not substitute `M.B.A.` or separately reported La Griffe values.
- Confidence: high

**2026-07-10 - Wimbledon sourcing**
- Observation: Wimbledon prize PDFs separate tennis-event prize money from estimated per diem, while AELTC Championships Ltd accounts explicitly bridge turnover and operating profit to The Championships.
- Action: Use the clean tennis-event subtotal and same-year operating-company financials. Keep Wimbledon 2020 canceled and wait for the year-ending 31 July 2026 accounts before adding 2026 denominators.
- Confidence: high

**2026-07-10 - Australian Open boundary**
- Observation: Tennis Australia reports group revenue/surplus, not AO-only denominators, but its accounting policies and MOPT relationship imply annual AO ledgers and settlement schedules exist.
- Action: Keep AO financial ratios unavailable. Target Tennis Australia/Melbourne & Olympic Parks settlement or agreed-revenue-item schedules through direct request or Victorian FOI.
- Confidence: high

## Patterns and Preferences

**2026-07-10 - Ratio eligibility**
- Observation: Headline player compensation often includes per diem, travel, hotel, stringing, pensions, relief, grants, Legends, or exhibitions.
- Action: Use only `competition_prize_money` over same-currency tournament revenue/profit/surplus. Keep support-inclusive totals as separate context rows.
- Confidence: high

**2026-07-10 - Unresolved but useful data**
- Observation: A valid denominator can exist when the strict numerator is unresolved, as with US Open 2019 and Roland-Garros 2021.
- Action: Preserve the denominator in a financial-only record and leave the numerator unavailable instead of discarding sourced data or forcing a ratio.
- Confidence: high

**2026-07-10 - Verification and handoff**
- Observation: The most useful maintenance checks are JSON parsing, duplicate IDs, source-ID integrity, non-null money provenance, and ratio scope/currency compatibility.
- Action: Run those checks after data edits and keep the concise current-state handoff at `docs/handoffs/creative-missing-slam-sourcing-2017-2026.md` updated.
- Confidence: high

**2026-07-10 - Parallel research**
- Observation: Distinct Slam/source-family searches parallelize well, but broad archive crawls can exhaust context before producing a handoff.
- Action: Use xhigh tasks when explicitly requested, give each a narrow source target, and redirect interrupted tasks to produce a concise final from evidence already gathered.
- Confidence: high

## What Has Failed

**2026-07-10 - Incompatible denominators**
- Observation: Organizer-wide accounts, economic-impact studies, grants, venue invoices, and revenue components do not establish tournament revenue or profit by themselves.
- Action: Do not normalize them as denominators without an explicit tournament-scope bridge.
- Confidence: high

**2026-07-10 - Derived profit**
- Observation: USTA and modern FFT sources can disclose tournament revenue and selected charges without labeling the difference as profit or surplus.
- Action: Do not derive profit by subtraction. Leave it unavailable unless the source labels a compatible tournament result or the data model explicitly adds a separate proxy.
- Confidence: high

**2026-07-10 - Unreconciled prize schedules**
- Observation: Bundled wheelchair/Legends values and small schedule/headline discrepancies can prevent a strict numerator even when most categories are known.
- Action: Do not infer the missing split or insert a balancing adjustment; record the precise unresolved amount and next source target.
- Confidence: high
