import { coinsApiClient } from './coins.client';

export const coinsApi = {
  /** Get paginated coins list */
  list: (page?: number, perPage?: number) =>
    coinsApiClient.GET('/api/Coins', {
      params: {
        query: {
          page,
          perPage,
        },
      },
    }),

  /** Get single coin by id */
  byId: (id: string) =>
    coinsApiClient.GET('/api/Coins/{id}', {
      params: {
        path: { id },
      },
    }),

  /** Get trending coins */
  trending: () => coinsApiClient.GET('/api/Coins/trending'),

  /** Get historical prices (legacy endpoint) */
  history: (id: string, days?: number) =>
    coinsApiClient.GET('/api/Coins/history/{id}', {
      params: {
        path: { id },
        query: { days },
      },
    }),

  /** Get coin details */
  details: (id: string) =>
    coinsApiClient.GET('/api/Coins/{id}/details', {
      params: {
        path: { id },
      },
    }),

  /** Get price history by period (e.g. 1d, 7d, 30d) */
  priceHistory: (id: string, period?: string) =>
    coinsApiClient.GET('/api/Coins/{id}/price-history', {
      params: {
        path: { id },
        query: { period },
      },
    }),

  /** Get market stats for a coin */
  marketStats: (id: string) =>
    coinsApiClient.GET('/api/Coins/{id}/market-stats', {
      params: {
        path: { id },
      },
    }),
};
