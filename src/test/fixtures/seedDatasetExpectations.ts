export interface SeedDatasetExpectation {
  id: string;
  tournament: string;
  year: number;
  event: string;
  currency: string;
  confidence: 'high' | 'medium';
  prizePool: number;
  numeratorCategory: 'competition_prize_money' | 'total_player_compensation';
  scopeType: 'event_main_draw' | 'tournament_total';
  winner: number | null;
  runnerUp: number | null;
  sourceCount: number;
  revenue?: number;
  profitOrSurplus?: number;
}

export const seedDatasetExpectations: SeedDatasetExpectation[] = [
  {
    id: 'australian-open-2025-ms',
    tournament: 'Australian Open',
    year: 2025,
    event: "Men's singles",
    currency: 'AUD',
    confidence: 'high',
    prizePool: 33108000,
    numeratorCategory: 'competition_prize_money',
    scopeType: 'event_main_draw',
    winner: 3500000,
    runnerUp: 1900000,
    sourceCount: 2,
  },
  {
    id: 'roland-garros-2025-ms',
    tournament: 'Roland Garros',
    year: 2025,
    event: "Men's singles",
    currency: 'EUR',
    confidence: 'medium',
    prizePool: 20509000,
    numeratorCategory: 'competition_prize_money',
    scopeType: 'event_main_draw',
    winner: 2550000,
    runnerUp: 1275000,
    sourceCount: 1,
  },
  {
    id: 'wimbledon-2025-ms',
    tournament: 'Wimbledon',
    year: 2025,
    event: "Men's singles",
    currency: 'GBP',
    confidence: 'high',
    prizePool: 19414000,
    numeratorCategory: 'competition_prize_money',
    scopeType: 'event_main_draw',
    winner: 3000000,
    runnerUp: 1520000,
    sourceCount: 1,
  },
  {
    id: 'wimbledon-2025-tournament-total',
    tournament: 'Wimbledon',
    year: 2025,
    event: 'Tournament total',
    currency: 'GBP',
    confidence: 'high',
    prizePool: 52000000,
    numeratorCategory: 'competition_prize_money',
    scopeType: 'tournament_total',
    winner: null,
    runnerUp: null,
    sourceCount: 2,
    revenue: 423626000,
    profitOrSurplus: 52720000,
  },
  {
    id: 'wimbledon-2024-tournament-total',
    tournament: 'Wimbledon',
    year: 2024,
    event: 'Tournament total',
    currency: 'GBP',
    confidence: 'high',
    prizePool: 48550000,
    numeratorCategory: 'competition_prize_money',
    scopeType: 'tournament_total',
    winner: null,
    runnerUp: null,
    sourceCount: 2,
    revenue: 406507000,
    profitOrSurplus: 54332000,
  },
  {
    id: 'us-open-2025-ms',
    tournament: 'US Open',
    year: 2025,
    event: "Men's singles",
    currency: 'USD',
    confidence: 'medium',
    prizePool: 31620000,
    numeratorCategory: 'competition_prize_money',
    scopeType: 'event_main_draw',
    winner: 5000000,
    runnerUp: 2500000,
    sourceCount: 2,
  },
  {
    id: 'us-open-2025-total-player-compensation',
    tournament: 'US Open',
    year: 2025,
    event: 'Tournament player compensation',
    currency: 'USD',
    confidence: 'medium',
    prizePool: 90000000,
    numeratorCategory: 'total_player_compensation',
    scopeType: 'tournament_total',
    winner: null,
    runnerUp: null,
    sourceCount: 2,
  },
];

export const mainDrawRoundMultipliers: Record<string, number> = {
  R128: 64,
  R64: 32,
  R32: 16,
  R16: 8,
  QF: 4,
  SF: 2,
  F: 1,
  W: 1,
};
