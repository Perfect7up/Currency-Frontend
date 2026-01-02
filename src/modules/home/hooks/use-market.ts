import { useQuery } from '@tanstack/react-query';
import { marketApi } from '../api/market.api';

export const useMarketOverview = () =>
  useQuery({
    queryKey: ['market-overview'],
    queryFn: async () => {
      const { data, error } = await marketApi.overview();
      if (error) throw error;
      return data;
    },
  });

export const useTopGainers = (limit = 10) =>
  useQuery({
    queryKey: ['top-gainers', limit],
    queryFn: async () => {
      const { data, error } = await marketApi.topGainers(limit);
      if (error) throw error;
      return data;
    },
  });
