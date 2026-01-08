import { useQuery } from '@tanstack/react-query';
import { chartsApi } from '../api/trade.api';
import type { OhlcvPoint } from '../types';

/**
 * Get OHLCV chart data for a coin
 */
export const useOhlcvChart = (coinId: string, period?: string) =>
  useQuery({
    queryKey: ['ohlcv-chart', coinId, period],
    queryFn: async () => {
      const { data, error } = await chartsApi.ohlcv(coinId, period);
      if (error) throw error;

      return (data ?? []).map((p) => ({
        time: Number(p.time),
        open: Number(p.open),
        high: Number(p.high),
        low: Number(p.low),
        close: Number(p.close),
        volume: Number(p.volume),
      })) as OhlcvPoint[];
    },
    enabled: !!coinId,
    staleTime: 60000,
    retry: false,
  });
