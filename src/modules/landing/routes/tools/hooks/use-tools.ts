import { useQuery } from '@tanstack/react-query';
import { toolsApi } from '../api/tools.api';
import type { ComparedCoin, ConvertResult } from '../types/index';

/**
 * Convert between currencies / coins
 */
export const useConvert = (from?: string, to?: string, amount?: number | string) =>
  useQuery({
    queryKey: ['tools-convert', from, to, amount],
    queryFn: async () => {
      const { data, error } = await toolsApi.convert({
        from,
        to,
        amount,
      });

      if (error) throw error;

      return {
        value: Number(data),
      } as ConvertResult;
    },
    enabled: !!from && !!to && amount !== undefined,
    staleTime: 60000,
    retry: false,
  });

/**
 * Compare coins by comma-separated ids
 */
export const useCompareCoins = (ids: string) =>
  useQuery({
    queryKey: ['tools-compare-coins', ids],
    queryFn: async () => {
      const { data, error } = await toolsApi.compareCoins(ids);
      if (error) throw error;
      return data as unknown as ComparedCoin[];
    },
    enabled: !!ids,
    staleTime: 60000,
    retry: false,
  });
