import { describe, expect, it } from 'vitest';
import { dashboardDataset, type TournamentEconomicsRecord } from '../data/dashboardDataset';
import {
  choosePrimaryQuestionRecord,
  filterRecords,
  formatMetricPercent,
  getFinalistComparisonRows,
  getFinancialComparisonRows,
  getCoverageSummary,
  getFilterOptions,
  getPrimaryQuestionCaveats,
  getPrimaryQuestionCoverage,
  getPrimaryQuestionRows,
  getSourceCoverageSummary,
  getSourcesForRecord,
  getVisibleCaveats,
  getYearOverYearChartRows,
  summarizeKpis,
} from '../lib/dashboardMetrics';
import {
  calculatePrizePoolToProfitOrSurplus,
  calculatePrizePoolToRevenue,
  calculateRoundPayoutPercentages,
  calculateWinnerRunnerUpRatio,
  calculateYearOverYearPrizePoolGrowth,
  getRunnerUpPayout,
  getTotalPrizePool,
  getWinnerPayout,
} from '../lib/metricEngine';
import {
  mainDrawRoundMultipliers,
  seedDatasetExpectations,
} from './fixtures/seedDatasetExpectations';

const normalRecord = dashboardDataset.records.find(
  (record) => record.id === 'australian-open-2025-ms',
);

if (!normalRecord) {
  throw new Error('Expected australian-open-2025-ms fixture to exist');
}

describe('validated seed dashboard dataset', () => {
  it('loads a sourced real-data seed rather than mock/sample records', () => {
    expect(dashboardDataset.metadata.dataMode).toBe('real');
    expect(dashboardDataset.metadata.datasetLabel).toContain('Grand Slam');
    expect(dashboardDataset.records.every((record) => record.confidence !== 'mock')).toBe(true);
    expect(dashboardDataset.sources.every((source) => source.sourceType !== 'mock')).toBe(true);
  });

  it('contains the expected Grand Slam prize-money and compensation records', () => {
    expect(dashboardDataset.records).toHaveLength(seedDatasetExpectations.length);

    for (const expected of seedDatasetExpectations) {
      const record = dashboardDataset.records.find((item) => item.id === expected.id);

      expect(record).toBeDefined();
      expect(record).toMatchObject({
        tournament: expected.tournament,
        event: expected.event,
        year: expected.year,
        confidence: expected.confidence,
        displayCurrency: expected.currency,
        prizeMoneyScope: {
          type: expected.scopeType,
          numeratorCategory: expected.numeratorCategory,
        },
        prizePool: {
          amount: expected.prizePool,
          currency: expected.currency,
        },
        winnerPayout: {
          amount: expected.winner,
          currency: expected.winner === null ? null : expected.currency,
        },
        runnerUpPayout: {
          amount: expected.runnerUp,
          currency: expected.runnerUp === null ? null : expected.currency,
        },
      });

      if (expected.revenue !== undefined) {
        expect(record).toMatchObject({
          revenue: {
            amount: expected.revenue,
            currency: expected.currency,
            kind: 'tournament_revenue',
          },
        });
      }

      if (expected.profitOrSurplus !== undefined) {
        expect(record).toMatchObject({
          profitOrSurplus: {
            amount: expected.profitOrSurplus,
            currency: expected.currency,
            kind: 'tournament_profit',
          },
        });
      }
    }
  });

  it('keeps every real seed row linked to valid source metadata', () => {
    for (const record of dashboardDataset.records) {
      const sources = getSourcesForRecord(dashboardDataset, record);
      const expected = seedDatasetExpectations.find((item) => item.id === record.id);

      expect(expected).toBeDefined();
      if (!expected) {
        throw new Error(`Missing seed expectation for ${record.id}`);
      }

      expect(sources).toHaveLength(expected.sourceCount);
      expect(record.sourceIds.length).toBeGreaterThan(0);

      for (const source of sources) {
        expect(() => new URL(source.url)).not.toThrow();
        expect(source.accessedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(source.confidence).not.toBe('mock');
      }
    }
  });

  it('keeps tournament financial denominators unavailable unless sourced clearly', () => {
    const sourcedFinancialRecordIds = new Set([
      'wimbledon-2025-tournament-total',
      'wimbledon-2024-tournament-total',
      'wimbledon-2023-tournament-total',
      'wimbledon-2022-tournament-total',
    ]);

    for (const record of dashboardDataset.records.filter(
      (item) => !sourcedFinancialRecordIds.has(item.id),
    )) {
      expect(record.revenue).toMatchObject({
        amount: null,
        currency: null,
        kind: 'unknown',
        status: 'unavailable',
        sourceIds: [],
      });
      expect(record.profitOrSurplus).toMatchObject({
        amount: null,
        currency: null,
        kind: 'unknown',
        status: 'unavailable',
        sourceIds: [],
      });
      expect(record.caveats.join(' ')).toMatch(/revenue and profit\/surplus/i);
    }
  });

  it('normalizes Wimbledon tournament-total competition prize money with compatible operating-company denominators', () => {
    const record = dashboardDataset.records.find(
      (item) => item.id === 'wimbledon-2025-tournament-total',
    );

    expect(record).toBeDefined();
    if (!record) {
      throw new Error('Expected wimbledon-2025-tournament-total fixture to exist');
    }

    expect(record.prizePool).toMatchObject({
      amount: 52000000,
      currency: 'GBP',
      status: 'official',
    });
    expect(record.revenue).toMatchObject({
      amount: 423626000,
      currency: 'GBP',
      status: 'official',
      kind: 'tournament_revenue',
    });
    expect(record.profitOrSurplus).toMatchObject({
      amount: 52720000,
      currency: 'GBP',
      status: 'official',
      kind: 'tournament_profit',
    });
    expect(record.prizePool.notes).toContain('excludes');
    expect(record.revenue.notes).toContain('principal contracting party');
    expect(record.profitOrSurplus.notes).toContain('before net finance income');
    expect(record.caveats.join(' ')).toMatch(/operating-company turnover/i);
    expect(record.caveats.join(' ')).toMatch(/not used as this row's denominator/i);
  });

  it('normalizes the prior-year Wimbledon tournament-total denominator slice', () => {
    const record = dashboardDataset.records.find(
      (item) => item.id === 'wimbledon-2024-tournament-total',
    );

    expect(record).toBeDefined();
    if (!record) {
      throw new Error('Expected wimbledon-2024-tournament-total fixture to exist');
    }

    expect(record.prizePool).toMatchObject({
      amount: 48550000,
      currency: 'GBP',
      status: 'official',
    });
    expect(record.revenue).toMatchObject({
      amount: 406507000,
      currency: 'GBP',
      status: 'official',
      kind: 'tournament_revenue',
    });
    expect(record.profitOrSurplus).toMatchObject({
      amount: 54332000,
      currency: 'GBP',
      status: 'official',
      kind: 'tournament_profit',
    });
    expect(record.prizePool.notes).toContain('£1.45m estimated per diems');
    expect(record.revenue.notes).toContain('principal contracting party');
    expect(record.profitOrSurplus.notes).toContain('before net finance income');
    expect(record.caveats.join(' ')).toMatch(/£50\.0m total prize money/i);
    expect(record.caveats.join(' ')).toMatch(/not used as this row's denominator/i);
  });

  it('normalizes the current Wimbledon tournament-total numerator without financial denominators', () => {
    const record = dashboardDataset.records.find(
      (item) => item.id === 'wimbledon-2026-tournament-total',
    );

    expect(record).toBeDefined();
    if (!record) {
      throw new Error('Expected wimbledon-2026-tournament-total fixture to exist');
    }

    expect(record.prizeMoneyScope).toMatchObject({
      type: 'tournament_total',
      numeratorCategory: 'competition_prize_money',
    });
    expect(record.prizePool).toMatchObject({
      amount: 62550000,
      currency: 'GBP',
      status: 'official',
    });
    expect(record.revenue).toMatchObject({
      amount: null,
      currency: null,
      status: 'unavailable',
      kind: 'unknown',
    });
    expect(record.profitOrSurplus).toMatchObject({
      amount: null,
      currency: null,
      status: 'unavailable',
      kind: 'unknown',
    });
    expect(record.prizePool.notes).toContain('£1.65m estimated per diems');
    expect(record.prizePool.notes).toContain('£64.2m');
    expect(record.revenue.notes).toContain('31 July 2026');
    expect(record.profitOrSurplus.notes).toContain('same-year accounts were not available');
    expect(record.caveats.join(' ')).toMatch(/headline total prize money of £64\.2m includes/i);
    expect(record.caveats.join(' ')).toMatch(/Revenue and profit\/surplus remain unavailable/i);
    expect(calculatePrizePoolToRevenue(record)).toMatchObject({
      status: 'unavailable',
      reason: 'missing_data',
    });
    expect(calculatePrizePoolToProfitOrSurplus(record)).toMatchObject({
      status: 'unavailable',
      reason: 'missing_data',
    });
  });

  it('normalizes the older Wimbledon tournament-total denominator slice', () => {
    const record = dashboardDataset.records.find(
      (item) => item.id === 'wimbledon-2023-tournament-total',
    );

    expect(record).toBeDefined();
    if (!record) {
      throw new Error('Expected wimbledon-2023-tournament-total fixture to exist');
    }

    expect(record.prizePool).toMatchObject({
      amount: 43250000,
      currency: 'GBP',
      status: 'official',
    });
    expect(record.revenue).toMatchObject({
      amount: 380156000,
      currency: 'GBP',
      status: 'official',
      kind: 'tournament_revenue',
    });
    expect(record.profitOrSurplus).toMatchObject({
      amount: 53776000,
      currency: 'GBP',
      status: 'official',
      kind: 'tournament_profit',
    });
    expect(record.prizePool.notes).toContain('£1.45m estimated per diems');
    expect(record.revenue.notes).toContain('principal contracting party');
    expect(record.profitOrSurplus.notes).toContain('before net finance income');
    expect(record.caveats.join(' ')).toMatch(/£44\.7m total prize money/i);
    expect(record.caveats.join(' ')).toMatch(/not used as this row's denominator/i);
  });

  it('normalizes the 2022 Wimbledon tournament-total denominator slice', () => {
    const record = dashboardDataset.records.find(
      (item) => item.id === 'wimbledon-2022-tournament-total',
    );

    expect(record).toBeDefined();
    if (!record) {
      throw new Error('Expected wimbledon-2022-tournament-total fixture to exist');
    }

    expect(record.prizePool).toMatchObject({
      amount: 38900000,
      currency: 'GBP',
      status: 'official',
    });
    expect(record.revenue).toMatchObject({
      amount: 346640000,
      currency: 'GBP',
      status: 'official',
      kind: 'tournament_revenue',
    });
    expect(record.profitOrSurplus).toMatchObject({
      amount: 47057000,
      currency: 'GBP',
      status: 'official',
      kind: 'tournament_profit',
    });
    expect(record.prizePool.notes).toContain('£1.45m estimated per diems');
    expect(record.revenue.notes).toContain('principal contracting party');
    expect(record.profitOrSurplus.notes).toContain('before net finance cost');
    expect(record.caveats.join(' ')).toMatch(/£40\.35m total prize money/i);
    expect(record.caveats.join(' ')).toMatch(/not used as this row's denominator/i);
  });

  it('normalizes Australian Open tournament-total competition prize money without financial denominators', () => {
    const record2025 = dashboardDataset.records.find(
      (item) => item.id === 'australian-open-2025-tournament-total',
    );
    const record2024 = dashboardDataset.records.find(
      (item) => item.id === 'australian-open-2024-tournament-total',
    );
    const record2023 = dashboardDataset.records.find(
      (item) => item.id === 'australian-open-2023-tournament-total',
    );
    const record2022 = dashboardDataset.records.find(
      (item) => item.id === 'australian-open-2022-tournament-total',
    );
    const record2021 = dashboardDataset.records.find(
      (item) => item.id === 'australian-open-2021-tournament-total',
    );

    expect(record2025).toBeDefined();
    expect(record2024).toBeDefined();
    expect(record2023).toBeDefined();
    expect(record2022).toBeDefined();
    expect(record2021).toBeDefined();
    if (!record2025 || !record2024 || !record2023 || !record2022 || !record2021) {
      throw new Error('Expected Australian Open tournament-total fixtures to exist');
    }

    expect(record2025.prizeMoneyScope).toMatchObject({
      type: 'tournament_total',
      numeratorCategory: 'competition_prize_money',
    });
    expect(record2025.prizePool).toMatchObject({
      amount: 96500000,
      currency: 'AUD',
      status: 'official',
    });
    expect(record2025.revenue).toMatchObject({
      amount: null,
      currency: null,
      status: 'unavailable',
      kind: 'unknown',
    });
    expect(record2025.profitOrSurplus).toMatchObject({
      amount: null,
      currency: null,
      status: 'unavailable',
      kind: 'unknown',
    });
    expect(record2025.prizePool.notes).toContain('A$96.5m');
    expect(record2025.revenue.notes).toContain('organization-level financials');
    expect(record2025.profitOrSurplus.notes).toContain('organization-level surplus');
    expect(record2025.caveats.join(' ')).toMatch(/no AO-specific compatible financial denominator/i);
    expect(record2025.caveats.join(' ')).toMatch(/support or compensation/i);

    expect(record2024.prizeMoneyScope).toMatchObject({
      type: 'tournament_total',
      numeratorCategory: 'competition_prize_money',
    });
    expect(record2024.prizePool).toMatchObject({
      amount: 86500000,
      currency: 'AUD',
      status: 'official',
    });
    expect(record2024.revenue).toMatchObject({
      amount: null,
      currency: null,
      status: 'unavailable',
      kind: 'unknown',
    });
    expect(record2024.profitOrSurplus).toMatchObject({
      amount: null,
      currency: null,
      status: 'unavailable',
      kind: 'unknown',
    });
    expect(record2024.prizePool.notes).toContain('A$86.5m');
    expect(record2024.prizePool.notes).toContain('Australian dollars');
    expect(record2024.revenue.notes).toContain('organization-level financials');
    expect(record2024.profitOrSurplus.notes).toContain('organization-level surplus');
    expect(record2024.caveats.join(' ')).toMatch(/no AO-specific compatible financial denominator/i);
    expect(record2024.caveats.join(' ')).toMatch(/support or compensation/i);

    expect(record2023.prizeMoneyScope).toMatchObject({
      type: 'tournament_total',
      numeratorCategory: 'competition_prize_money',
    });
    expect(record2023.prizePool).toMatchObject({
      amount: 76500000,
      currency: 'AUD',
      status: 'official',
    });
    expect(record2023.revenue).toMatchObject({
      amount: null,
      currency: null,
      status: 'unavailable',
      kind: 'unknown',
    });
    expect(record2023.profitOrSurplus).toMatchObject({
      amount: null,
      currency: null,
      status: 'unavailable',
      kind: 'unknown',
    });
    expect(record2023.prizePool.notes).toContain('A$76.5m');
    expect(record2023.prizePool.notes).toContain('Australian dollars');
    expect(record2023.revenue.notes).toContain('organization-level financials');
    expect(record2023.profitOrSurplus.notes).toContain('organization-level surplus');
    expect(record2023.caveats.join(' ')).toMatch(/no AO-specific compatible financial denominator/i);
    expect(record2023.caveats.join(' ')).toMatch(/support or compensation/i);

    expect(record2022.prizeMoneyScope).toMatchObject({
      type: 'tournament_total',
      numeratorCategory: 'competition_prize_money',
    });
    expect(record2022.prizePool).toMatchObject({
      amount: 74000000,
      currency: 'AUD',
      status: 'official',
    });
    expect(record2022.revenue).toMatchObject({
      amount: null,
      currency: null,
      status: 'unavailable',
      kind: 'unknown',
    });
    expect(record2022.profitOrSurplus).toMatchObject({
      amount: null,
      currency: null,
      status: 'unavailable',
      kind: 'unknown',
    });
    expect(record2022.prizePool.notes).toContain('A$74.0m');
    expect(record2022.prizePool.notes).toContain('Australian dollars');
    expect(record2022.revenue.notes).toContain('organization-level financials');
    expect(record2022.profitOrSurplus.notes).toContain('organization-level surplus');
    expect(record2022.caveats.join(' ')).toMatch(/no AO-specific compatible financial denominator/i);
    expect(record2022.caveats.join(' ')).toMatch(/support or compensation/i);

    expect(record2021.prizeMoneyScope).toMatchObject({
      type: 'tournament_total',
      numeratorCategory: 'competition_prize_money',
    });
    expect(record2021.prizePool).toMatchObject({
      amount: 71000000,
      currency: 'AUD',
      status: 'official',
    });
    expect(record2021.revenue).toMatchObject({
      amount: null,
      currency: null,
      status: 'unavailable',
      kind: 'unknown',
    });
    expect(record2021.profitOrSurplus).toMatchObject({
      amount: null,
      currency: null,
      status: 'unavailable',
      kind: 'unknown',
    });
    expect(record2021.prizePool.notes).toContain('A$71.0m');
    expect(record2021.prizePool.notes).toContain('Australian dollars');
    expect(record2021.revenue.notes).toContain('organization-level financials');
    expect(record2021.profitOrSurplus.notes).toContain('organization-level surplus');
    expect(record2021.caveats.join(' ')).toMatch(/no AO-specific compatible financial denominator/i);
    expect(record2021.caveats.join(' ')).toMatch(/support or compensation/i);
  });

  it('matches each event-level competition prize pool to the weighted main-draw round payouts', () => {
    for (const record of dashboardDataset.records.filter(
      (item) => item.prizeMoneyScope.type === 'event_main_draw',
    )) {
      const weightedRoundTotal = record.roundPayouts.reduce((total, roundPayout) => {
        const multiplier = mainDrawRoundMultipliers[roundPayout.round] ?? 0;
        return total + (roundPayout.payout.amount ?? 0) * multiplier;
      }, 0);

      expect(weightedRoundTotal).toBe(record.prizePool.amount);
    }
  });

  it('filters validated records by dashboard selections', () => {
    const filtered = filterRecords(dashboardDataset.records, {
      tournament: normalRecord.tournament,
      year: String(normalRecord.year),
      event: normalRecord.event,
      confidence: 'high',
    });

    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe(normalRecord.id);
  });

  it('prefers the first answerable primary-question record for the selected comparison', () => {
    expect(choosePrimaryQuestionRecord(dashboardDataset.records)?.id).toBe(
      'wimbledon-2025-tournament-total',
    );

    const unavailableOnlyRecords = dashboardDataset.records.filter(
      (record) =>
        ![
          'wimbledon-2025-tournament-total',
          'wimbledon-2024-tournament-total',
          'wimbledon-2023-tournament-total',
          'wimbledon-2022-tournament-total',
        ].includes(record.id),
    );

    expect(choosePrimaryQuestionRecord(unavailableOnlyRecords)?.id).toBe(normalRecord.id);
    expect(choosePrimaryQuestionRecord([])).toBeNull();
  });

  it('builds options, coverage, and KPI cards from validated records', () => {
    const options = getFilterOptions(dashboardDataset.records);
    const coverageSummary = getCoverageSummary(dashboardDataset);
    const kpis = summarizeKpis(normalRecord, dashboardDataset.records);

    expect(options.tournaments).toEqual([
      'Australian Open',
      'Roland Garros',
      'US Open',
      'Wimbledon',
    ]);
    expect(coverageSummary).toContainEqual(
      expect.objectContaining({ confidence: 'high', count: 13, share: 13 / 23 }),
    );
    expect(coverageSummary).toContainEqual(
      expect.objectContaining({ confidence: 'medium', count: 10, share: 10 / 23 }),
    );
    expect(kpis).toHaveLength(9);
    expect(kpis.map((kpi) => kpi.label)).toContain('Prize pool YoY growth');
  });

  it('returns an empty record set for filter combinations outside the seed data', () => {
    const filtered = filterRecords(dashboardDataset.records, {
      tournament: 'all',
      year: 'all',
      event: 'all',
      confidence: 'low',
    });

    expect(filtered).toEqual([]);
    expect(getCoverageSummary(dashboardDataset, filtered)).toEqual([]);
    expect(getSourceCoverageSummary(dashboardDataset, filtered)).toEqual([]);
  });

  it('builds finalist and financial chart rows with unavailable states', () => {
    const finalistRows = getFinalistComparisonRows(normalRecord);
    const financialRows = getFinancialComparisonRows(normalRecord);

    expect(finalistRows).toEqual([
      expect.objectContaining({
        id: 'winner',
        value: 'A$3,500,000',
        barPercent: 100,
        unavailable: false,
      }),
      expect.objectContaining({
        id: 'runner-up',
        value: 'A$1,900,000',
        barPercent: (1900000 / 3500000) * 100,
        unavailable: false,
      }),
    ]);
    expect(financialRows).toEqual([
      expect.objectContaining({
        id: 'prize-pool',
        label: 'Competition prize money',
        value: 'A$33,108,000',
        barPercent: 100,
        unavailable: false,
      }),
      expect.objectContaining({
        id: 'revenue',
        value: 'Unavailable',
        status: 'Unavailable',
        barPercent: null,
        unavailable: true,
      }),
      expect.objectContaining({
        id: 'profit-surplus',
        value: 'Unavailable',
        status: 'Unavailable',
        barPercent: null,
        unavailable: true,
      }),
    ]);
  });

  it('builds primary question rows around revenue and profit share only', () => {
    const rows = getPrimaryQuestionRows(normalRecord);
    const coverage = getPrimaryQuestionCoverage(dashboardDataset.records);
    const caveats = getPrimaryQuestionCaveats(normalRecord);

    expect(rows).toEqual([
      expect.objectContaining({
        id: 'revenue-share',
        label: 'Competition prize money as % of tournament revenue',
        value: 'Unavailable',
        numeratorLabel: 'Competition prize money',
        numeratorValue: 'A$33,108,000',
        denominatorValue: 'Unavailable',
        barPercent: null,
        unavailable: true,
      }),
      expect.objectContaining({
        id: 'profit-surplus-share',
        label: 'Competition prize money as % of tournament profit/surplus',
        value: 'Unavailable',
        numeratorLabel: 'Competition prize money',
        numeratorValue: 'A$33,108,000',
        denominatorValue: 'Unavailable',
        barPercent: null,
        unavailable: true,
      }),
    ]);
    expect(coverage).toEqual([
      expect.objectContaining({
        id: 'revenue-share',
        value: '4/23',
        answerableCount: 4,
        totalCount: 23,
        unavailable: false,
      }),
      expect.objectContaining({
        id: 'profit-surplus-share',
        value: '4/23',
        answerableCount: 4,
        totalCount: 23,
        unavailable: false,
      }),
    ]);
    expect(caveats).toContain('Prize money / revenue is unavailable: Missing compatible data.');
    expect(caveats).not.toContain(
      'Year-over-year growth is unavailable: No matching prior-year record is available.',
    );
  });

  it('keeps US Open total compensation visible but excluded from primary ratios', () => {
    const compensationRecord = dashboardDataset.records.find(
      (record) => record.id === 'us-open-2025-total-player-compensation',
    );

    expect(compensationRecord).toBeDefined();
    if (!compensationRecord) {
      throw new Error('Expected US Open total-compensation fixture to exist');
    }

    const rows = getPrimaryQuestionRows(compensationRecord);
    const caveats = getPrimaryQuestionCaveats(compensationRecord);

    expect(rows).toEqual([
      expect.objectContaining({
        id: 'revenue-share',
        eyebrow: 'Needs competition prize money',
        numeratorLabel: 'Total player compensation (not used)',
        numeratorValue: '$90,000,000',
        unavailable: true,
      }),
      expect.objectContaining({
        id: 'profit-surplus-share',
        eyebrow: 'Needs competition prize money',
        numeratorLabel: 'Total player compensation (not used)',
        numeratorValue: '$90,000,000',
        unavailable: true,
      }),
    ]);
    expect(caveats).toContain(
      'Total player compensation is not competition prize money and is excluded from revenue/profit ratios.',
    );
    expect(caveats).toContain(
      'Prize money / revenue is unavailable: Numerator is not competition prize money.',
    );
  });

  it('keeps Roland Garros total compensation separate without a clean tournament-total prize row', () => {
    const compensationRecord = dashboardDataset.records.find(
      (record) => record.id === 'roland-garros-2025-total-player-compensation',
    );
    const unsupportedCleanRecord = dashboardDataset.records.find(
      (record) =>
        record.id === 'roland-garros-2025-tournament-total' ||
        (record.tournament === 'Roland Garros' &&
          record.year === 2025 &&
          record.event === 'Tournament total' &&
          record.prizeMoneyScope.numeratorCategory === 'competition_prize_money'),
    );

    expect(compensationRecord).toBeDefined();
    expect(unsupportedCleanRecord).toBeUndefined();
    if (!compensationRecord) {
      throw new Error('Expected Roland Garros total-compensation fixture to exist');
    }

    expect(compensationRecord.prizeMoneyScope).toMatchObject({
      type: 'tournament_total',
      numeratorCategory: 'total_player_compensation',
    });
    expect(compensationRecord.prizePool).toMatchObject({
      amount: 56352000,
      currency: 'EUR',
      status: 'reported',
    });
    expect(compensationRecord.prizePool.notes).toContain('per diems');
    expect(compensationRecord.prizePool.notes).toContain('exhibitions');
    expect(compensationRecord.revenue).toMatchObject({
      amount: null,
      currency: null,
      status: 'unavailable',
      kind: 'unknown',
    });
    expect(compensationRecord.profitOrSurplus).toMatchObject({
      amount: null,
      currency: null,
      status: 'unavailable',
      kind: 'unknown',
    });
    expect(compensationRecord.caveats.join(' ')).toMatch(/not clean competition prize money/i);
    expect(compensationRecord.caveats.join(' ')).toMatch(
      /No Roland Garros tournament-total competition-prize-money row/i,
    );
    expect(calculatePrizePoolToRevenue(compensationRecord)).toMatchObject({
      status: 'unavailable',
      reason: 'incompatible_numerator_kind',
    });
    expect(calculatePrizePoolToProfitOrSurplus(compensationRecord)).toMatchObject({
      status: 'unavailable',
      reason: 'incompatible_numerator_kind',
    });
    expect(getPrimaryQuestionRows(compensationRecord)).toEqual([
      expect.objectContaining({
        id: 'revenue-share',
        eyebrow: 'Needs competition prize money',
        numeratorLabel: 'Total player compensation (not used)',
        numeratorValue: '€56,352,000',
        unavailable: true,
      }),
      expect.objectContaining({
        id: 'profit-surplus-share',
        eyebrow: 'Needs competition prize money',
        numeratorLabel: 'Total player compensation (not used)',
        numeratorValue: '€56,352,000',
        unavailable: true,
      }),
    ]);
  });

  it('adds a clean US Open tournament-total competition-prize row without financial denominators', () => {
    const competitionRecord2025 = dashboardDataset.records.find(
      (record) => record.id === 'us-open-2025-tournament-total',
    );
    const compensationRecord2025 = dashboardDataset.records.find(
      (record) => record.id === 'us-open-2025-total-player-compensation',
    );
    const competitionRecord2024 = dashboardDataset.records.find(
      (record) => record.id === 'us-open-2024-tournament-total',
    );
    const compensationRecord2024 = dashboardDataset.records.find(
      (record) => record.id === 'us-open-2024-total-player-compensation',
    );
    const competitionRecord2022 = dashboardDataset.records.find(
      (record) => record.id === 'us-open-2022-tournament-total',
    );
    const compensationRecord2022 = dashboardDataset.records.find(
      (record) => record.id === 'us-open-2022-total-player-compensation',
    );
    const competitionRecord2021 = dashboardDataset.records.find(
      (record) => record.id === 'us-open-2021-tournament-total',
    );
    const compensationRecord2021 = dashboardDataset.records.find(
      (record) => record.id === 'us-open-2021-total-player-compensation',
    );

    expect(competitionRecord2025).toBeDefined();
    expect(compensationRecord2025).toBeDefined();
    expect(competitionRecord2024).toBeDefined();
    expect(compensationRecord2024).toBeDefined();
    expect(competitionRecord2022).toBeDefined();
    expect(compensationRecord2022).toBeDefined();
    expect(competitionRecord2021).toBeDefined();
    expect(compensationRecord2021).toBeDefined();
    if (
      !competitionRecord2025 ||
      !compensationRecord2025 ||
      !competitionRecord2024 ||
      !compensationRecord2024 ||
      !competitionRecord2022 ||
      !compensationRecord2022 ||
      !competitionRecord2021 ||
      !compensationRecord2021
    ) {
      throw new Error('Expected US Open tournament-total fixtures to exist');
    }

    expect(competitionRecord2025.prizeMoneyScope).toMatchObject({
      type: 'tournament_total',
      numeratorCategory: 'competition_prize_money',
    });
    expect(competitionRecord2025.prizePool).toMatchObject({
      amount: 85000000,
      currency: 'USD',
      status: 'derived',
    });
    expect(competitionRecord2025.revenue).toMatchObject({
      amount: null,
      currency: null,
      status: 'unavailable',
      kind: 'unknown',
    });
    expect(competitionRecord2025.profitOrSurplus).toMatchObject({
      amount: null,
      currency: null,
      status: 'unavailable',
      kind: 'unknown',
    });
    expect(competitionRecord2025.prizePool.notes).toContain('$90m');
    expect(competitionRecord2025.prizePool.notes).toContain('$5m');
    expect(competitionRecord2025.caveats.join(' ')).toMatch(
      /total-player-compensation row remains separate/i,
    );
    expect(competitionRecord2025.caveats.join(' ')).toMatch(
      /no tournament-specific compatible financial denominator/i,
    );
    expect(compensationRecord2025.prizeMoneyScope.numeratorCategory).toBe(
      'total_player_compensation',
    );
    expect(calculatePrizePoolToRevenue(competitionRecord2025)).toMatchObject({
      status: 'unavailable',
      reason: 'missing_data',
    });
    expect(calculatePrizePoolToProfitOrSurplus(competitionRecord2025)).toMatchObject({
      status: 'unavailable',
      reason: 'missing_data',
    });

    expect(competitionRecord2024).toMatchObject({
      confidence: 'medium',
      prizeMoneyScope: {
        type: 'tournament_total',
        numeratorCategory: 'competition_prize_money',
      },
      prizePool: {
        amount: 68756000,
        currency: 'USD',
        status: 'derived',
      },
      revenue: {
        amount: null,
        currency: null,
        status: 'unavailable',
        kind: 'unknown',
      },
      profitOrSurplus: {
        amount: null,
        currency: null,
        status: 'unavailable',
        kind: 'unknown',
      },
    });
    expect(competitionRecord2024.prizePool.notes).toContain('$75m');
    expect(competitionRecord2024.prizePool.notes).toContain('$6.244m per diem');
    expect(competitionRecord2024.caveats.join(' ')).toMatch(/medium confidence/i);
    expect(competitionRecord2024.caveats.join(' ')).toMatch(/broader compensation\/support/i);
    expect(compensationRecord2024).toMatchObject({
      prizeMoneyScope: {
        numeratorCategory: 'total_player_compensation',
      },
      prizePool: {
        amount: 75000000,
        currency: 'USD',
        status: 'reported',
      },
    });
    expect(calculatePrizePoolToRevenue(competitionRecord2024)).toMatchObject({
      status: 'unavailable',
      reason: 'missing_data',
    });
    expect(calculatePrizePoolToProfitOrSurplus(competitionRecord2024)).toMatchObject({
      status: 'unavailable',
      reason: 'missing_data',
    });
    expect(calculatePrizePoolToRevenue(compensationRecord2024)).toMatchObject({
      status: 'unavailable',
      reason: 'incompatible_numerator_kind',
    });

    expect(competitionRecord2022).toMatchObject({
      confidence: 'medium',
      prizeMoneyScope: {
        type: 'tournament_total',
        numeratorCategory: 'competition_prize_money',
      },
      prizePool: {
        amount: 57530100,
        currency: 'USD',
        status: 'derived',
      },
      revenue: {
        amount: null,
        currency: null,
        status: 'unavailable',
        kind: 'unknown',
      },
      profitOrSurplus: {
        amount: null,
        currency: null,
        status: 'unavailable',
        kind: 'unknown',
      },
    });
    expect(competitionRecord2022.prizePool.notes).toContain('$60.102m');
    expect(competitionRecord2022.prizePool.notes).toContain('$2.5719m in per diem');
    expect(competitionRecord2022.caveats.join(' ')).toMatch(/medium-confidence/i);
    expect(competitionRecord2022.caveats.join(' ')).toMatch(/per-diem separation/i);
    expect(compensationRecord2022).toMatchObject({
      prizeMoneyScope: {
        numeratorCategory: 'total_player_compensation',
      },
      prizePool: {
        amount: 60102000,
        currency: 'USD',
        status: 'reported',
      },
    });
    expect(calculatePrizePoolToRevenue(competitionRecord2022)).toMatchObject({
      status: 'unavailable',
      reason: 'missing_data',
    });
    expect(calculatePrizePoolToProfitOrSurplus(competitionRecord2022)).toMatchObject({
      status: 'unavailable',
      reason: 'missing_data',
    });
    expect(calculatePrizePoolToRevenue(compensationRecord2022)).toMatchObject({
      status: 'unavailable',
      reason: 'incompatible_numerator_kind',
    });

    expect(competitionRecord2021).toMatchObject({
      confidence: 'medium',
      prizeMoneyScope: {
        type: 'tournament_total',
        numeratorCategory: 'competition_prize_money',
      },
      prizePool: {
        amount: 54359440,
        currency: 'USD',
        status: 'derived',
      },
      revenue: {
        amount: null,
        currency: null,
        status: 'unavailable',
        kind: 'unknown',
      },
      profitOrSurplus: {
        amount: null,
        currency: null,
        status: 'unavailable',
        kind: 'unknown',
      },
    });
    expect(competitionRecord2021.prizePool.notes).toContain('$57.5m');
    expect(competitionRecord2021.prizePool.notes).toContain('$3.10256m in estimated per diem');
    expect(competitionRecord2021.caveats.join(' ')).toMatch(/medium confidence/i);
    expect(competitionRecord2021.caveats.join(' ')).toMatch(/per-diem separation/i);
    expect(compensationRecord2021).toMatchObject({
      prizeMoneyScope: {
        numeratorCategory: 'total_player_compensation',
      },
      prizePool: {
        amount: 57462000,
        currency: 'USD',
        status: 'reported',
      },
    });
    expect(calculatePrizePoolToRevenue(competitionRecord2021)).toMatchObject({
      status: 'unavailable',
      reason: 'missing_data',
    });
    expect(calculatePrizePoolToProfitOrSurplus(competitionRecord2021)).toMatchObject({
      status: 'unavailable',
      reason: 'missing_data',
    });
    expect(calculatePrizePoolToRevenue(compensationRecord2021)).toMatchObject({
      status: 'unavailable',
      reason: 'incompatible_numerator_kind',
    });
  });

  it('marks primary question rows answerable when compatible denominators exist', () => {
    const record = cloneRecord(normalRecord, {
      revenue: {
        amount: 132432000,
        currency: 'AUD',
        kind: 'tournament_revenue',
        status: 'reported',
        sourceIds: ['ao-2025-prize-money-release'],
      },
      profitOrSurplus: {
        amount: 16554000,
        currency: 'AUD',
        kind: 'tournament_surplus',
        status: 'reported',
        sourceIds: ['ao-2025-prize-money-release'],
      },
    });

    expect(getPrimaryQuestionRows(record)).toEqual([
      expect.objectContaining({
        id: 'revenue-share',
        value: '25.0%',
        denominatorValue: 'A$132,432,000',
        barPercent: 25,
        unavailable: false,
      }),
      expect.objectContaining({
        id: 'profit-surplus-share',
        value: '200.0%',
        denominatorValue: 'A$16,554,000',
        barPercent: 100,
        unavailable: false,
      }),
    ]);
    expect(getPrimaryQuestionCoverage([record])).toEqual([
      expect.objectContaining({ id: 'revenue-share', value: '1/1', barPercent: 100 }),
      expect.objectContaining({ id: 'profit-surplus-share', value: '1/1', barPercent: 100 }),
    ]);
  });

  it('builds primary question answer cards for the normalized Wimbledon tournament-total row', () => {
    const record = dashboardDataset.records.find(
      (item) => item.id === 'wimbledon-2025-tournament-total',
    );

    expect(record).toBeDefined();
    if (!record) {
      throw new Error('Expected wimbledon-2025-tournament-total fixture to exist');
    }

    expect(getPrimaryQuestionRows(record)).toEqual([
      expect.objectContaining({
        id: 'revenue-share',
        value: '12.3%',
        numeratorValue: '£52,000,000',
        denominatorValue: '£423,626,000',
        unavailable: false,
      }),
      expect.objectContaining({
        id: 'profit-surplus-share',
        value: '98.6%',
        numeratorValue: '£52,000,000',
        denominatorValue: '£52,720,000',
        unavailable: false,
      }),
    ]);
    expect(calculatePrizePoolToRevenue(record)).toMatchObject({
      status: 'available',
      value: 52000000 / 423626000,
    });
    expect(calculatePrizePoolToProfitOrSurplus(record)).toMatchObject({
      status: 'available',
      value: 52000000 / 52720000,
    });
  });

  it('builds year-over-year chart rows for the Wimbledon tournament-total rows', () => {
    const yearOverYearRows = getYearOverYearChartRows(
      dashboardDataset.records,
      dashboardDataset.records,
    );
    const wimbledon2025Row = yearOverYearRows.find(
      (row) => row.id === 'wimbledon-2025-tournament-total',
    );
    const wimbledon2026Row = yearOverYearRows.find(
      (row) => row.id === 'wimbledon-2026-tournament-total',
    );

    expect(yearOverYearRows).toHaveLength(dashboardDataset.records.length);
    expect(wimbledon2026Row).toMatchObject({
      value: '+20.3%',
      note: 'Compared with 2025 Tournament total.',
      unavailable: false,
    });
    expect(wimbledon2025Row).toMatchObject({
      value: '+7.1%',
      note: 'Compared with 2024 Tournament total.',
      unavailable: false,
    });
    expect(
      yearOverYearRows.find((row) => row.id === 'wimbledon-2024-tournament-total'),
    ).toMatchObject({
      value: '+12.3%',
      note: 'Compared with 2023 Tournament total.',
      unavailable: false,
    });
    expect(
      yearOverYearRows.find((row) => row.id === 'wimbledon-2023-tournament-total'),
    ).toMatchObject({
      value: '+11.2%',
      note: 'Compared with 2022 Tournament total.',
      unavailable: false,
    });
    expect(
      yearOverYearRows.find((row) => row.id === 'australian-open-2025-tournament-total'),
    ).toMatchObject({
      value: '+11.6%',
      note: 'Compared with 2024 Tournament total.',
      unavailable: false,
    });
    expect(
      yearOverYearRows.find((row) => row.id === 'australian-open-2024-tournament-total'),
    ).toMatchObject({
      value: '+13.1%',
      note: 'Compared with 2023 Tournament total.',
      unavailable: false,
    });
    expect(
      yearOverYearRows.find((row) => row.id === 'australian-open-2023-tournament-total'),
    ).toMatchObject({
      value: '+3.4%',
      note: 'Compared with 2022 Tournament total.',
      unavailable: false,
    });
    expect(
      yearOverYearRows.find((row) => row.id === 'australian-open-2022-tournament-total'),
    ).toMatchObject({
      value: '+4.2%',
      note: 'Compared with 2021 Tournament total.',
      unavailable: false,
    });
    expect(
      yearOverYearRows.find((row) => row.id === 'us-open-2025-tournament-total'),
    ).toMatchObject({
      value: '+23.6%',
      note: 'Compared with 2024 Tournament total.',
      unavailable: false,
    });
    expect(
      yearOverYearRows.find((row) => row.id === 'us-open-2022-tournament-total'),
    ).toMatchObject({
      value: '+5.8%',
      note: 'Compared with 2021 Tournament total.',
      unavailable: false,
    });
    expect(yearOverYearRows[0]).toMatchObject({
      id: normalRecord.id,
      value: 'Unavailable',
      note: 'No matching prior-year record is available.',
    });
  });

  it('surfaces derived and unavailable caveats for display', () => {
    const derivedRecord = dashboardDataset.records.find(
      (record) => record.id === 'roland-garros-2025-ms',
    );

    expect(derivedRecord).toBeDefined();
    if (!derivedRecord) {
      throw new Error('Expected roland-garros-2025-ms fixture to exist');
    }

    const caveats = getVisibleCaveats(derivedRecord, dashboardDataset.records);

    expect(caveats).toContain('Competition prize money is derived from normalized source rows.');
    expect(caveats).toContain('Revenue is unavailable for this record.');
    expect(caveats).toContain(
      'Prize money / profit or surplus is unavailable: Missing compatible data.',
    );
    expect(caveats).toContain(
      'Year-over-year growth is unavailable: No matching prior-year record is available.',
    );
  });
});

describe('metric engine calculations', () => {
  it('calculates sourced prize, payout, ratio, and round percentage cases', () => {
    expect(getTotalPrizePool(normalRecord)).toMatchObject({
      status: 'available',
      value: { amount: 33108000, currency: 'AUD' },
    });
    expect(getWinnerPayout(normalRecord)).toMatchObject({
      status: 'available',
      value: { amount: 3500000, currency: 'AUD' },
    });
    expect(getRunnerUpPayout(normalRecord)).toMatchObject({
      status: 'available',
      value: { amount: 1900000, currency: 'AUD' },
    });
    expect(calculateWinnerRunnerUpRatio(normalRecord)).toMatchObject({
      status: 'available',
      value: 3500000 / 1900000,
    });

    const winnerRound = calculateRoundPayoutPercentages(normalRecord).find(
      (round) => round.round === 'W',
    );

    expect(winnerRound?.percentage).toMatchObject({
      status: 'available',
      value: 3500000 / 33108000,
    });
    expect(
      formatMetricPercent(
        winnerRound?.percentage ?? {
          status: 'unavailable',
          value: null,
          reason: 'missing_data',
        },
      ),
    ).toBe('10.6%');
  });

  it('calculates compatible financial ratios when a record includes sourced denominators', () => {
    const record = cloneRecord(normalRecord, {
      revenue: {
        amount: 132432000,
        currency: 'AUD',
        kind: 'tournament_revenue',
        status: 'reported',
        sourceIds: ['ao-2025-prize-money-release'],
      },
      profitOrSurplus: {
        amount: 16554000,
        currency: 'AUD',
        kind: 'tournament_surplus',
        status: 'reported',
        sourceIds: ['ao-2025-prize-money-release'],
      },
    });

    expect(calculatePrizePoolToRevenue(record)).toMatchObject({
      status: 'available',
      value: 0.25,
    });
    expect(calculatePrizePoolToProfitOrSurplus(record)).toMatchObject({
      status: 'available',
      value: 2,
    });
  });

  it('calculates year-over-year growth when a prior same-event record exists', () => {
    const priorRecord = cloneRecord(normalRecord, {
      id: 'australian-open-2024-ms',
      year: 2024,
      prizePool: {
        ...normalRecord.prizePool,
        amount: 30000000,
      },
    });

    expect(calculateYearOverYearPrizePoolGrowth([priorRecord, normalRecord], normalRecord)).toMatchObject({
      status: 'available',
      value: 3108000 / 30000000,
    });
  });

  it('does not compute percentages when data is missing', () => {
    expect(calculatePrizePoolToRevenue(normalRecord)).toMatchObject({
      status: 'unavailable',
      reason: 'missing_data',
    });
    expect(calculateYearOverYearPrizePoolGrowth(dashboardDataset.records, normalRecord)).toMatchObject({
      status: 'unavailable',
      reason: 'no_prior_record',
    });
  });

  it('does not compute competition prize money / profit when profit is negative', () => {
    const record = cloneRecord(normalRecord, {
      profitOrSurplus: {
        amount: -250000,
        currency: 'AUD',
        kind: 'tournament_profit',
        status: 'reported',
        sourceIds: ['ao-2025-prize-money-release'],
      },
    });

    expect(calculatePrizePoolToProfitOrSurplus(record)).toMatchObject({
      status: 'unavailable',
      reason: 'negative_denominator',
    });
  });

  it('does not compute competition prize money / profit when profit is zero', () => {
    const record = cloneRecord(normalRecord, {
      profitOrSurplus: {
        amount: 0,
        currency: 'AUD',
        kind: 'tournament_surplus',
        status: 'reported',
        sourceIds: ['ao-2025-prize-money-release'],
      },
    });

    expect(calculatePrizePoolToProfitOrSurplus(record)).toMatchObject({
      status: 'unavailable',
      reason: 'zero_denominator',
    });
  });

  it('does not compute compatible-looking ratios across incompatible currencies', () => {
    const record = cloneRecord(normalRecord, {
      revenue: {
        amount: 12400000,
        currency: 'EUR',
        kind: 'tournament_revenue',
        status: 'reported',
        sourceIds: ['ao-2025-prize-money-release'],
      },
    });

    expect(calculatePrizePoolToRevenue(record)).toMatchObject({
      status: 'unavailable',
      reason: 'incompatible_currency',
    });
  });

  it('does not compute ratios from semantically incompatible financial denominators', () => {
    const revenueRecord = cloneRecord(normalRecord, {
      revenue: {
        amount: 12400000,
        currency: 'AUD',
        kind: 'organization_revenue',
        status: 'reported',
        sourceIds: ['ao-2025-prize-money-release'],
      },
    });
    const profitRecord = cloneRecord(normalRecord, {
      profitOrSurplus: {
        amount: 2100000,
        currency: 'AUD',
        kind: 'organization_surplus',
        status: 'reported',
        sourceIds: ['ao-2025-prize-money-release'],
      },
    });

    expect(calculatePrizePoolToRevenue(revenueRecord)).toMatchObject({
      status: 'unavailable',
      reason: 'incompatible_financial_kind',
    });
    expect(calculatePrizePoolToProfitOrSurplus(profitRecord)).toMatchObject({
      status: 'unavailable',
      reason: 'incompatible_financial_kind',
    });
  });

  it('does not compute financial ratios from total player compensation', () => {
    const record = cloneRecord(normalRecord, {
      prizeMoneyScope: {
        type: 'tournament_total',
        numeratorCategory: 'total_player_compensation',
        notes: 'Fixture total player compensation.',
      },
      prizePool: {
        ...normalRecord.prizePool,
        amount: 90000000,
      },
      revenue: {
        amount: 400000000,
        currency: 'AUD',
        kind: 'tournament_revenue',
        status: 'reported',
        sourceIds: ['ao-2025-prize-money-release'],
      },
      profitOrSurplus: {
        amount: 50000000,
        currency: 'AUD',
        kind: 'tournament_surplus',
        status: 'reported',
        sourceIds: ['ao-2025-prize-money-release'],
      },
    });

    expect(calculatePrizePoolToRevenue(record)).toMatchObject({
      status: 'unavailable',
      reason: 'incompatible_numerator_kind',
    });
    expect(calculatePrizePoolToProfitOrSurplus(record)).toMatchObject({
      status: 'unavailable',
      reason: 'incompatible_numerator_kind',
    });
  });
});

function cloneRecord(
  record: TournamentEconomicsRecord,
  overrides: Partial<TournamentEconomicsRecord>,
): TournamentEconomicsRecord {
  return {
    ...structuredClone(record),
    ...overrides,
  };
}
