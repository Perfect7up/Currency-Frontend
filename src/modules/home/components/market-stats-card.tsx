import { Skeleton, Divider, Typography, Button, Result } from 'antd';
import { useMarketOverview, useTopGainers, useTopLosers, useTrending } from '../hooks/use-market';
import {
  ClockCircleOutlined,
  FireFilled,
  RiseOutlined,
  FallOutlined,
  RocketOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import type { MarketOverview } from '../types/types';
import { CoinList, StatItem } from './common';

const { Title } = Typography;

export default function MarketStatsCard() {
  const {
    data,
    isLoading: loadingOverview,
    isError: errorOverview,
    refetch: refetchOverview,
  } = useMarketOverview();

  const {
    data: gainers,
    isLoading: loadingGainers,
    isError: errorGainers,
    refetch: refetchGainers,
  } = useTopGainers(5);

  const {
    data: losers,
    isLoading: loadingLosers,
    isError: errorLosers,
    refetch: refetchLosers,
  } = useTopLosers(5);

  const {
    data: trending,
    isLoading: loadingTrending,
    isError: errorTrending,
    refetch: refetchTrending,
  } = useTrending(10);

  const stats = data as MarketOverview;

  if (errorOverview) {
    return (
      <section className="flex min-h-150 w-full items-center justify-center bg-white py-20 dark:bg-[#000513]!">
        <Result
          status="error"
          title={<span className="dark:text-white!">Command Center Offline</span>}
          extra={[
            <Button
              type="primary"
              key="retry"
              icon={<ReloadOutlined />}
              onClick={() => refetchOverview()}
              className="h-10 rounded-full bg-blue-600 px-8"
            >
              Reconnect Now
            </Button>,
          ]}
        />
      </section>
    );
  }

  return (
    <section className="relative -mt-12 w-full overflow-hidden bg-linear-to-b from-slate-50 via-white to-slate-50 py-20 dark:from-[#000513]! dark:via-slate-950! dark:to-[#000513]!">
      {/* Decorative background blur */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-50">
        <div className="absolute top-20 -left-40 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl dark:bg-blue-500/10!"></div>
      </div>

      <div className="relative w-full px-4 md:px-8 lg:px-16">
        {/* Header Section */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-linear-to-r from-blue-50 to-purple-50 px-6 py-2 dark:from-blue-500/10! dark:to-purple-500/10!">
            <RocketOutlined className="text-lg text-blue-600 dark:text-blue-400!" />
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase dark:text-blue-400!">
              Real-Time Intelligence
            </span>
          </div>

          {/* UPDATED TITLE COMPONENT */}
          <Title
            className="mb-6! bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent! dark:from-white! dark:via-indigo-400! dark:to-white!"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Market Command Center
          </Title>
        </div>

        {/* Live Status Bar */}
        <div className="mb-8 flex items-center justify-center gap-8 rounded-2xl border border-slate-200/60 bg-white/80 p-4 backdrop-blur-xl dark:border-slate-800/60! dark:bg-slate-900/40!">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white!">Market Live</span>
          </div>
          <Divider type="vertical" className="h-6 border-slate-300 dark:border-slate-700!" />
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400!">
            <ClockCircleOutlined />
            <span className="text-sm font-semibold">Live Updates</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
          {loadingOverview ? (
            <div className="col-span-full">
              <Skeleton active paragraph={{ rows: 2 }} />
            </div>
          ) : (
            <>
              <StatItem
                label="Market Cap"
                value={
                  stats?.totalMarketCap
                    ? `$${(stats.totalMarketCap / 1e12).toFixed(2)}T`
                    : undefined
                }
                change={stats?.marketCapChange}
              />
              <StatItem
                label="24h Volume"
                value={stats?.totalVolume ? `$${(stats.totalVolume / 1e9).toFixed(2)}B` : undefined}
                change={stats?.volumeChange}
              />
              <StatItem
                label="BTC Dominance"
                value={stats?.btcDominance ? `${stats.btcDominance.toFixed(1)}%` : undefined}
              />
              <StatItem
                label="Bitcoin"
                value={
                  stats?.btcPrice ? `$${Math.round(stats.btcPrice).toLocaleString()}` : undefined
                }
                change={stats?.marketCapChange}
              />
              <StatItem
                label="Ethereum"
                value={
                  stats?.ethPrice ? `$${Math.round(stats.ethPrice).toLocaleString()}` : undefined
                }
                change={-0.2}
              />
            </>
          )}
        </div>

        {/* Market Lists (Gainers/Losers/Trending) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <CoinList
            title="Top Gainers"
            items={gainers}
            isLoading={loadingGainers}
            isError={errorGainers}
            onRetry={() => refetchGainers()}
            icon={RiseOutlined}
            iconColor="#10b981"
          />
          <CoinList
            title="Top Losers"
            items={losers}
            isLoading={loadingLosers}
            isError={errorLosers}
            onRetry={() => refetchLosers()}
            icon={FallOutlined}
            iconColor="#f43f5e"
          />
          <CoinList
            title="Trending Now"
            items={trending}
            isLoading={loadingTrending}
            isError={errorTrending}
            onRetry={() => refetchTrending()}
            icon={FireFilled}
            iconColor="#3b82f6"
          />
        </div>
      </div>
    </section>
  );
}
