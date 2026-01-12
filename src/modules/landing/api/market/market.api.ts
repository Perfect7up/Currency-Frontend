import { marketApiClient } from './market.client';

export const marketApi = {
  overview: () => marketApiClient.GET('/api/Market/overview'),

  topGainers: (limit?: number) =>
    marketApiClient.GET('/api/Market/top-gainers', {
      params: {
        query: { limit },
      },
    }),

  topLosers: (limit?: number) =>
    marketApiClient.GET('/api/Market/top-losers', {
      params: {
        query: { limit },
      },
    }),

  trending: (limit?: number) =>
    marketApiClient.GET('/api/Market/trending', {
      params: {
        query: { limit },
      },
    }),
};
