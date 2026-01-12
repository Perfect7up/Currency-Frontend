import { useQuery } from '@tanstack/react-query';
import { coinsApi } from '../api/coins.api';
import type { Coin, MarketStats, PriceHistory } from '../types/index';

export const useCoins = (page = 1, perPage = 20) =>
  useQuery({
    queryKey: ['coins', page, perPage],
    queryFn: async () => {
      const { data, error } = await coinsApi.list(page, perPage);
      if (error) throw error;
      return data as unknown as Coin[];
    },
    staleTime: 60000,
    retry: false,
  });

export const useCoinById = (id: string) =>
  useQuery({
    queryKey: ['coin', id],
    queryFn: async () => {
      const { data, error } = await coinsApi.byId(id);
      if (error) throw error;
      return data as unknown as Coin;
    },
    enabled: !!id,
    staleTime: 60000,
    retry: false,
  });

export const useTrendingCoins = () =>
  useQuery({
    queryKey: ['coins-trending'],
    queryFn: async () => {
      const { data, error } = await coinsApi.trending();
      if (error) throw error;
      return data as unknown as Coin[];
    },
    staleTime: 60000,
    retry: false,
  });

export const useCoinDetails = (id: string) =>
  useQuery({
    queryKey: ['coin-details', id],
    queryFn: async () => {
      const { data, error } = await coinsApi.details(id);
      if (error) throw error;
      return data as unknown as Coin;
    },
    enabled: !!id,
    staleTime: 60000,
    retry: false,
  });

export const useCoinHistory = (id: string, days?: number) =>
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

export const useCoinPriceHistory = (id: string, period?: string) =>
  useQuery({
    queryKey: ['coin-price-history', id, period],
    queryFn: async () => {
      const { data, error } = await coinsApi.priceHistory(id, period);
      if (error) throw error;
      return data as unknown as PriceHistory[];
    },
    enabled: !!id,
    staleTime: 60000,
    retry: false,
  });

export const useCoinMarketStats = (id: string) =>
  useQuery({
    queryKey: ['coin-market-stats', id],
    queryFn: async () => {
      const { data, error } = await coinsApi.marketStats(id);
      if (error) throw error;
      return data as unknown as MarketStats;
    },
    enabled: !!id,
    staleTime: 60000,
    retry: false,
  });
