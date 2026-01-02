import { Card, Skeleton } from 'antd';
import { useMarketOverview } from '../hooks/use-market';
import {
  CaretUpOutlined,
  CaretDownOutlined,
  ClockCircleOutlined,
  StockOutlined,
} from '@ant-design/icons';
import type { MarketOverview, StatItemProps } from '../types/types';

function MiniChart({ isPositive }: { isPositive: boolean }) {
  const strokeColor = isPositive ? '#10b981' : '#f43f5e';
  return (
    <div className="flex items-center justify-center rounded-none! bg-slate-100 p-2 transition-colors duration-300 dark:bg-white/5">
      <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="opacity-90">
        <path
          d={
            isPositive
              ? 'M2 18 L10 12 L16 14 L24 6 L32 10 L38 2'
              : 'M2 4 L8 12 L16 8 L24 18 L32 14 L38 18'
          }
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="square"
        />
      </svg>
    </div>
  );
}

function StatItem({ label, value, change }: StatItemProps) {
  const hasChange = change !== undefined && change !== null;
  const isPositive = !hasChange || change >= 0;

  return (
    <div className="flex min-w-fit flex-1 items-center gap-4 border-slate-100 px-6 py-4 transition-colors duration-300 last:border-r-0 md:border-r dark:border-slate-800/50">
      <MiniChart isPositive={isPositive} />
      <div className="flex flex-col">
        <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase transition-colors duration-300 dark:text-slate-400">
          {label}
        </span>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-slate-900 tabular-nums transition-colors duration-300 dark:text-white">
            {value ?? '--'}
          </span>

          {hasChange && (
            <span
              className={`flex items-center text-[10px] font-bold transition-colors duration-300 ${
                isPositive
                  ? 'text-emerald-500 dark:text-emerald-400'
                  : 'text-rose-500 dark:text-rose-400'
              }`}
            >
              {isPositive ? (
                <CaretUpOutlined style={{ marginRight: 2 }} />
              ) : (
                <CaretDownOutlined style={{ marginRight: 2 }} />
              )}
              {Math.abs(change).toFixed(2)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MarketStatsCard() {
  const { data, isLoading, isError } = useMarketOverview();

  if (isLoading)
    return (
      <div className="rounded-none! border-none bg-white p-6 transition-colors duration-300 dark:bg-[#000513]">
        <Skeleton active paragraph={{ rows: 1 }} />
      </div>
    );

  if (isError || !data) return null;

  const stats = data as MarketOverview;

  return (
    <Card
      bordered={false}
      className="rounded-none! border-none bg-white shadow-none transition-colors duration-300 dark:bg-[#000513]"
      bodyStyle={{ padding: 0 }}
    >
      <div className="flex flex-col transition-colors duration-300 dark:bg-[#000513]">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 transition-colors duration-300 dark:border-slate-800/50">
          <div className="flex items-center gap-3">
            <StockOutlined className="text-slate-400 transition-colors duration-300 dark:text-white" />
            <h3 className="text-xs font-black tracking-widest text-slate-900 uppercase transition-colors duration-300 dark:text-white">
              Market Terminal
            </h3>
          </div>

          {stats.timestamp && (
            <div className="flex items-center gap-2 rounded-none! border border-slate-200 bg-slate-50 px-3 py-1 transition-colors duration-300 dark:border-slate-800 dark:bg-white/5">
              <div className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-none! bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-none! bg-emerald-500"></span>
              </div>
              <span className="text-[10px] font-black text-slate-600 uppercase transition-colors duration-300 dark:text-emerald-400">
                Live Feed
              </span>
              <ClockCircleOutlined className="ml-1 text-[10px] text-slate-400! dark:text-slate-400!" />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 divide-y divide-slate-100 md:flex md:items-center md:justify-between md:divide-y-0 dark:divide-slate-800/50">
          <StatItem
            label="Market Cap"
            value={
              stats.totalMarketCap ? `$${(stats.totalMarketCap / 1e12).toFixed(2)}T` : undefined
            }
            change={stats.marketCapChange}
          />
          <StatItem
            label="24h Volume"
            value={stats.totalVolume ? `$${(stats.totalVolume / 1e9).toFixed(2)}B` : undefined}
            change={stats.volumeChange}
          />
          <StatItem
            label="BTC Dominance"
            value={stats.btcDominance ? `${stats.btcDominance.toFixed(1)}%` : undefined}
            change={0.15}
          />
          <StatItem
            label="BTC Price"
            value={stats.btcPrice ? `$${Math.round(stats.btcPrice).toLocaleString()}` : undefined}
            change={stats.marketCapChange}
          />
          <div className="hidden flex-1 lg:block">
            <StatItem
              label="ETH Price"
              value={stats.ethPrice ? `$${Math.round(stats.ethPrice).toLocaleString()}` : undefined}
              change={-0.2}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
