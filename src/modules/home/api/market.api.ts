import { api } from './client';

export const marketApi = {
  overview: () => api.GET('/api/Market/overview'),

  topGainers: (limit?: number) =>
    api.GET('/api/Market/top-gainers', {
      params: {
        query: { limit },
      },
    }),

  topLosers: (limit?: number) =>
    api.GET('/api/Market/top-losers', {
      params: {
        query: { limit },
      },
    }),

  trending: (limit?: number) =>
    api.GET('/api/Market/trending', {
      params: {
        query: { limit },
      },
    }),
};
