// tools.api.ts
import { toolsApiClient } from './client.api';

export const toolsApi = {
  /**
   * Convert amount between currencies/coins
   * GET /api/Tools/convert
   */
  convert: (params?: { from?: string; to?: string; amount?: number | string }) =>
    toolsApiClient.GET('/api/Tools/convert', {
      params: {
        query: params,
      },
    }),

  /**
   * Compare multiple coins by ids (comma-separated)
   * GET /api/coins/compare
   */
  compareCoins: (ids: string) =>
    toolsApiClient.GET('/api/coins/compare', {
      params: {
        query: { ids },
      },
    }),
};
