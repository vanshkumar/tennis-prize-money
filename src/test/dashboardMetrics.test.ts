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

  it('contains the expected 2025 Grand Slam prize-money and compensation records', () => {
    expect(dashboardDataset.records).toHaveLength(seedDatasetExpectations.length);

    for (const expected of seedDatasetExpectations) {
      const record = dashboardDataset.records.find((item) => item.id === expected.id);

      expect(record).toBeDefined();
      expect(record).toMatchObject({
        tournament: expected.tournament,
        event: expected.event,
        year: 2025,
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
    for (const record of dashboardDataset.records.filter(
      (item) => item.id !== 'wimbledon-2025-tournament-total',
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
      (record) => record.id !== 'wimbledon-2025-tournament-total',
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
      expect.objectContaining({ confidence: 'high', count: 3, share: 0.5 }),
    );
    expect(coverageSummary).toContainEqual(
      expect.objectContaining({ confidence: 'medium', count: 3, share: 0.5 }),
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
        value: '1/6',
        answerableCount: 1,
        totalCount: 6,
        unavailable: false,
      }),
      expect.objectContaining({
        id: 'profit-surplus-share',
        value: '1/6',
        answerableCount: 1,
        totalCount: 6,
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

  it('builds unavailable year-over-year chart rows for the 2025-only seed', () => {
    const yearOverYearRows = getYearOverYearChartRows(
      dashboardDataset.records,
      dashboardDataset.records,
    );

    expect(yearOverYearRows).toHaveLength(dashboardDataset.records.length);
    expect(yearOverYearRows.every((row) => row.unavailable)).toBe(true);
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
