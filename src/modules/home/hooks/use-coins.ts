import { useQuery } from '@tanstack/react-query';
import { coinsApi } from '../api/coins/coins.api';
import type { Coin, PriceHistory } from '../types/types';

export const useCoinsList = (page = 1, perPage = 20) =>
  useQuery({
    queryKey: ['coins-list', page, perPage],
    queryFn: async () => {
      const { data, error } = await coinsApi.list(page, perPage);
      if (error) throw error;
      return data as unknown as Coin[];
    },
    staleTime: 60000,
    retry: false,
  });

export const useTrendingCoins = () =>
  useQuery({
    queryKey: ['trending-coins'],
    queryFn: async () => {
      const { data, error } = await coinsApi.trending();
      if (error) throw error;
      return data as unknown as Coin[];
    },
    staleTime: 60000,
    retry: false,
  });

export const useCoin = (id: string) =>
  useQuery({
    queryKey: ['coin', id],
    queryFn: async () => {
      const { data, error } = await coinsApi.getById(id);
      if (error) throw error;
      return data as unknown as Coin;
    },
    enabled: !!id,
    staleTime: 60000,
    retry: false,
  });

export const useCoinHistory = (id: string, days = 7) =>
  useQuery({
    queryKey: ['coin-history', id, days],
    queryFn: async () => {
      const { data, error } = await coinsApi.history(id, days);
      if (error) throw error;
      return data as unknown as PriceHistory[];
    },
    enabled: !!id,
    staleTime: 60000,
    retry: false,
  });
