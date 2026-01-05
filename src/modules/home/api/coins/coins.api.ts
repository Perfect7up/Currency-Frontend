import { coinsApiClient } from './coins.client';

export const coinsApi = {
  list: (page?: number, perPage?: number) =>
    coinsApiClient.GET('/api/Coins', {
      params: {
        query: { page, perPage },
      },
    }),

  trending: () => coinsApiClient.GET('/api/Coins/trending'),

  getById: (id: string) =>
    coinsApiClient.GET('/api/Coins/{id}', {
      params: {
        path: { id },
      },
    }),

  history: (id: string, days?: number) =>
    coinsApiClient.GET('/api/Coins/history/{id}', {
      params: {
        path: { id },
        query: { days },
      },
    }),
};
