import { newsApiClient } from './client.api';

export const newsApi = {
  list: (page?: number, limit?: number) =>
    newsApiClient.GET('/api/News', {
      params: {
        query: { page, limit },
      },
    }),

  featured: () => newsApiClient.GET('/api/News/featured'),
  getById: (id: number | string) =>
    newsApiClient.GET('/api/News/{id}', {
      params: {
        path: { id },
      },
    }),
};
