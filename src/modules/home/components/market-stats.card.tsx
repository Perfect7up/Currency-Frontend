import { Card, Skeleton, Divider, Typography } from 'antd';
import { useMarketOverview, useTopGainers, useTopLosers, useTrending } from '../hooks/use-market';
import {
  CaretUpOutlined,
  CaretDownOutlined,
  ClockCircleOutlined,
  StockOutlined,
  ThunderboltFilled,
  FireFilled,
  RiseOutlined,
  FallOutlined,
} from '@ant-design/icons';
import type { MarketOverview, StatItemProps, Coin } from '../types/types';

const { Title } = Typography;

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
              {isPositive ? <CaretUpOutlined /> : <CaretDownOutlined />}
              {Math.abs(change).toFixed(2)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function MiniList({
  title,
  items,
  isLoading,
  type,
}: {
  title: string;
  items?: Coin[];
  isLoading: boolean;
  type: 'gainers' | 'losers' | 'trending';
}) {
  const Icon = type === 'gainers' ? RiseOutlined : type === 'losers' ? FallOutlined : FireFilled;
  const iconColor = type === 'gainers' ? '#10b981' : type === 'losers' ? '#f43f5e' : '#3b82f6';

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center gap-2">
        <Icon style={{ color: iconColor }} />
        <h4 className="text-[10px] font-black tracking-widest text-slate-500 uppercase dark:text-slate-400">
          {title}
        </h4>
      </div>
      <div className="flex flex-col gap-2">
        {isLoading ? (
          <Skeleton active paragraph={{ rows: 3 }} title={false} />
        ) : (
          items?.slice(0, 5).map((item) => {
            const isPositive = (item.priceChangePercentage24h ?? 0) >= 0;
            const hasPrice =
              item.currentPrice !== undefined &&
              item.currentPrice !== null &&
              item.currentPrice !== 0;

            return (
              <div
                key={item.id}
                className="flex justify-between rounded-none! border border-slate-100 px-3 py-2 transition-colors duration-300 dark:border-slate-800/50 dark:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.symbol} className="h-5 w-5 rounded-none!" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {item.symbol.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-slate-900 tabular-nums dark:text-white">
                    {hasPrice
                      ? `$${item.currentPrice.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: item.currentPrice < 1 ? 6 : 2,
                        })}`
                      : '--'}
                  </span>
                  <span
                    className={`text-[10px] font-bold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}
                  >
                    {isPositive ? '+' : ''}
                    {item.priceChangePercentage24h?.toFixed(2)}%
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default function MarketStatsCard() {
  const {
    data: overviewData,
    isLoading: loadingOverview,
    isError: errorOverview,
  } = useMarketOverview();
  const { data: gainers, isLoading: loadingGainers } = useTopGainers(5);
  const { data: losers, isLoading: loadingLosers } = useTopLosers(5);
  const { data: trending, isLoading: loadingTrending } = useTrending(10);

  if (errorOverview || (!loadingOverview && !overviewData)) return null;

  const stats = overviewData as MarketOverview;

  return (
    <section className="-mt-16 w-full bg-white py-20 transition-colors duration-300 dark:bg-[#000513]">
      <div className="w-full px-4 md:px-8">
        {/* HEADER SECTION - Matches your Hero style */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="mb-4 flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50 px-4 py-1 dark:bg-blue-500/10">
            <ThunderboltFilled className="text-blue-600 dark:text-blue-500" />
            <span className="text-[10px] font-black tracking-widest text-blue-600 uppercase dark:text-blue-400">
              Live Terminal
            </span>
          </div>
          <Title
            className="mb-6! text-slate-900! transition-colors duration-300 dark:text-white!"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            The World’s Premier <br />
            <span className="text-blue-600 dark:text-blue-500">Market Terminal</span>
          </Title>
          <Title
            level={4}
            className="mb-12! font-normal! text-slate-600! transition-colors duration-300 dark:text-gray-400!"
            style={{ maxWidth: '700px', margin: '0 auto' }}
          >
            Monitor global market caps, volume trends, and trending assets with institutional
            precision.
          </Title>
        </div>

        {/* MARKET CARD - Using your specific Dark Mode classes */}
        <Card
          bordered={false}
          className="w-full rounded-none! border-none bg-white shadow-none transition-colors duration-300 dark:bg-[#000513]"
          styles={{ body: { padding: 0 } }}
        >
          <div className="flex flex-col transition-colors duration-300 dark:bg-[#000513]">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 transition-colors duration-300 dark:border-slate-800/50">
              <div className="flex items-center gap-3">
                <StockOutlined className="text-slate-400 transition-colors duration-300 dark:text-white" />
                <h3 className="text-xs font-black tracking-widest text-slate-900 uppercase transition-colors duration-300 dark:text-white">
                  Market Intelligence
                </h3>
              </div>

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
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 divide-y divide-slate-100 md:flex md:items-center md:justify-between md:divide-y-0 dark:divide-slate-800/50">
              {loadingOverview ? (
                <div className="w-full p-6">
                  <Skeleton active title={false} paragraph={{ rows: 1 }} />
                </div>
              ) : (
                <>
                  <StatItem
                    label="Market Cap"
                    value={
                      stats.totalMarketCap
                        ? `$${(Number(stats.totalMarketCap) / 1e12).toFixed(2)}T`
                        : '--'
                    }
                    change={stats.marketCapChange}
                  />
                  <StatItem
                    label="24h Volume"
                    value={
                      stats.totalVolume ? `$${(Number(stats.totalVolume) / 1e9).toFixed(2)}B` : '--'
                    }
                    change={stats.volumeChange}
                  />
                  <StatItem
                    label="BTC Dominance"
                    value={stats.btcDominance ? `${stats.btcDominance.toFixed(1)}%` : '--'}
                  />
                  <StatItem
                    label="BTC Price"
                    value={
                      stats.btcPrice
                        ? `$${Math.round(Number(stats.btcPrice)).toLocaleString()}`
                        : '--'
                    }
                    change={stats.marketCapChange}
                  />
                  <div className="hidden flex-1 lg:block">
                    <StatItem
                      label="ETH Price"
                      value={
                        stats.ethPrice
                          ? `$${Math.round(Number(stats.ethPrice)).toLocaleString()}`
                          : '--'
                      }
                      change={-0.2}
                    />
                  </div>
                </>
              )}
            </div>

            <Divider className="m-0 border-slate-100 dark:border-slate-800/50" />

            {/* Bottom Lists */}
            <div className="grid grid-cols-1 divide-y divide-slate-100 md:grid-cols-3 md:divide-x md:divide-y-0 dark:divide-slate-800/50">
              <MiniList
                title="Top Gainers"
                type="gainers"
                items={gainers as Coin[]}
                isLoading={loadingGainers}
              />
              <MiniList
                title="Top Losers"
                type="losers"
                items={losers as Coin[]}
                isLoading={loadingLosers}
              />
              <MiniList
                title="Trending Market"
                type="trending"
                items={trending as Coin[]}
                isLoading={loadingTrending}
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
