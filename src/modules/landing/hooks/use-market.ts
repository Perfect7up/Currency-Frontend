import { useQuery } from '@tanstack/react-query';
import { marketApi } from '../api/market/market.api';
import type { MarketOverview, Coin } from '../types/types';

export const useMarketOverview = () =>
  useQuery({
    queryKey: ['market-overview'],
    queryFn: async () => {
      const { data, error } = await marketApi.overview();
      if (error) throw error;
      return data as unknown as MarketOverview;
    },
    staleTime: 60000,
  });

export const useTopGainers = (limit = 10) =>
  useQuery({
    queryKey: ['top-gainers', limit],
    queryFn: async () => {
      const { data, error } = await marketApi.topGainers(limit);
      if (error) throw error;
      return data as unknown as Coin[];
    },
    staleTime: 60000,
    retry: false,
  });

export const useTopLosers = (limit = 10) =>
  useQuery({
    queryKey: ['top-losers', limit],
    queryFn: async () => {
      const { data, error } = await marketApi.topLosers(limit);
      if (error) throw error;
      return data as unknown as Coin[];
    },
    staleTime: 60000,
    retry: false,
  });

export const useTrending = (limit = 10) =>
  useQuery({
    queryKey: ['trending', limit],
    queryFn: async () => {
      const { data, error } = await marketApi.trending(limit);
      if (error) throw error;
      return data as unknown as Coin[];
    },
    staleTime: 60000,
    retry: false,
  });
