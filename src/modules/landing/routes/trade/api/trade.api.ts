import { tradeApiClient } from './client.api';

export const chartsApi = {
  /**
   * Get OHLCV chart data for a coin
   * GET /api/Charts/{coinId}/ohlcv
   */
  ohlcv: (coinId: string, period?: string) =>
    tradeApiClient.GET('/api/Charts/{coinId}/ohlcv', {
      params: {
        path: { coinId },
        query: { period },
      },
    }),
};
