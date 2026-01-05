import { Skeleton, Divider, Typography } from 'antd';
import { useMarketOverview, useTopGainers, useTopLosers, useTrending } from '../hooks/use-market';
import {
  CaretUpOutlined,
  CaretDownOutlined,
  ClockCircleOutlined,
  StockOutlined,
  FireFilled,
  RiseOutlined,
  FallOutlined,
  RocketOutlined,
} from '@ant-design/icons';
import type { MarketOverview, StatItemProps, Coin } from '../types/types';

const { Title } = Typography;

function AnimatedChart({ isPositive }: { isPositive: boolean }) {
  const gradientId = `gradient-${isPositive ? 'positive' : 'negative'}`;

  return (
    <div className="relative h-16 w-20 overflow-hidden rounded-xl bg-linear-to-br from-slate-50 to-slate-100 p-3 dark:from-slate-800/50! dark:to-slate-900/50!">
      <svg width="100%" height="100%" viewBox="0 0 60 40" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isPositive ? '#10b981' : '#f43f5e'} stopOpacity="0.3" />
            <stop offset="100%" stopColor={isPositive ? '#10b981' : '#f43f5e'} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={
            isPositive
              ? 'M0 35 L12 28 L24 30 L36 18 L48 22 L60 10 L60 40 L0 40 Z'
              : 'M0 10 L12 20 L24 15 L36 30 L48 25 L60 35 L60 40 L0 40 Z'
          }
          fill={`url(#${gradientId})`}
        />
        <path
          d={
            isPositive
              ? 'M0 35 L12 28 L24 30 L36 18 L48 22 L60 10'
              : 'M0 10 L12 20 L24 15 L36 30 L48 25 L60 35'
          }
          stroke={isPositive ? '#10b981' : '#f43f5e'}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function StatItem({ label, value, change }: StatItemProps) {
  const hasChange = change !== undefined && change !== null;
  const isPositive = !hasChange || change >= 0;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50 dark:border-slate-800/60! dark:bg-slate-900/40! dark:hover:border-blue-600/40! dark:hover:shadow-blue-500/10!">
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-500/5 blur-3xl transition-all duration-500 group-hover:bg-blue-500/10 dark:bg-blue-500/10!"></div>

      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400!">
              {label}
            </span>
            {hasChange && (
              <span
                className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${
                  isPositive
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10! dark:text-emerald-400!'
                    : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10! dark:text-rose-400!'
                }`}
              >
                {isPositive ? <CaretUpOutlined /> : <CaretDownOutlined />}
                {Math.abs(change).toFixed(2)}%
              </span>
            )}
          </div>
          <div className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white!">
            {value ?? '--'}
          </div>
        </div>
        <AnimatedChart isPositive={isPositive} />
      </div>
    </div>
  );
}

function CoinCard({
  coin,
  rank,
}: {
  coin: Coin;
  rank: number;
  type: 'gainers' | 'losers' | 'trending';
}) {
  const isPositive = (coin.priceChangePercentage24h ?? 0) >= 0;
  const hasPrice =
    coin.currentPrice !== undefined && coin.currentPrice !== null && coin.currentPrice !== 0;

  const getRankBadgeColor = () => {
    if (rank === 1) return 'from-yellow-400 to-yellow-600';
    if (rank === 2) return 'from-slate-300 to-slate-500';
    if (rank === 3) return 'from-yellow-400 to-yellow-600';
    if (rank === 4) return 'from-slate-300 to-slate-500';
    if (rank === 5) return 'from-yellow-400 to-yellow-600';

    return 'from-slate-200 to-slate-400';
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200/60 bg-white p-4 transition-all duration-300 hover:border-blue-300 hover:shadow-md dark:border-slate-800/60! dark:bg-slate-900/40! dark:hover:border-blue-600/40!">
      {/* Rank badge */}
      <div
        className={`absolute -top-8 -right-8 h-20 w-20 rounded-full bg-linear-to-br ${getRankBadgeColor()} opacity-10`}
      ></div>

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className={`absolute -inset-1 rounded-full bg-linear-to-br ${getRankBadgeColor()} opacity-20 blur-sm`}
            ></div>
            <span
              className={`relative flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br ${getRankBadgeColor()} text-xs font-black text-white`}
            >
              {rank}
            </span>
          </div>
          <img
            src={coin.image}
            alt={coin.symbol}
            className="h-10 w-10 rounded-full border-2 border-slate-100 dark:border-slate-800!"
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 dark:text-white!">
              {coin.symbol.toUpperCase()}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400!">{coin.name}</span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-base font-bold text-slate-900 tabular-nums dark:text-white!">
            {hasPrice
              ? `$${coin.currentPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: coin.currentPrice < 1 ? 6 : 2,
                })}`
              : '--'}
          </span>
          <span
            className={`mt-1 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${
              isPositive
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10! dark:text-emerald-400!'
                : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10! dark:text-rose-400!'
            }`}
          >
            {isPositive ? <CaretUpOutlined /> : <CaretDownOutlined />}
            {Math.abs(coin.priceChangePercentage24h ?? 0).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}

function CoinList({
  title,
  items,
  isLoading,
  type,
  icon: Icon,
  iconColor,
}: {
  title: string;
  items?: Coin[];
  isLoading: boolean;
  type: 'gainers' | 'losers' | 'trending';
  icon: React.ComponentType<{ style?: React.CSSProperties }>;
  iconColor: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white p-6 dark:border-slate-800/60! dark:bg-slate-900/40!">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-500/10! dark:to-blue-600/10!">
            <Icon style={{ fontSize: '20px', color: iconColor }} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white!">{title}</h3>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800/50!">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></div>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400!">Live</span>
        </div>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <Skeleton active paragraph={{ rows: 5 }} title={false} />
        ) : (
          items
            ?.slice(0, 5)
            .map((item, index) => (
              <CoinCard key={item.id} coin={item} rank={index + 1} type={type} />
            ))
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
    <section className="relative w-full overflow-hidden bg-linear-to-b from-slate-50 via-white to-slate-50 py-20 dark:from-[#000513]! dark:via-slate-950! dark:to-[#000513]!">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-40 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl dark:bg-blue-500/10!"></div>
        <div className="absolute top-40 -right-40 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl dark:bg-purple-500/10!"></div>
        <div className="absolute bottom-20 left-1/3 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl dark:bg-emerald-500/10!"></div>
      </div>

      <div className="relative w-full px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-linear-to-r from-blue-50 to-purple-50 px-6 py-2 dark:from-blue-500/10! dark:to-purple-500/10!">
            <RocketOutlined className="text-lg text-blue-600 dark:text-blue-400!" />
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase dark:text-blue-400!">
              Real-Time Intelligence
            </span>
          </div>

          <Title
            className="dark:!from-white! dark:!via-blue-400! dark:!to-white! mb-6! bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent!"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
            }}
          >
            Market Command
            <br />
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text dark:from-blue-400! dark:to-purple-400!">
              Center
            </span>
          </Title>

          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400!">
            Professional-grade market analytics powered by real-time data streams. Track global
            movements with institutional precision.
          </p>
        </div>

        {/* Live Status Bar */}
        <div className="mb-8 flex items-center justify-center gap-8 rounded-2xl border border-slate-200/60 bg-white/80 p-4 backdrop-blur-xl dark:border-slate-800/60! dark:bg-slate-900/40!">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white!">Market Open</span>
          </div>
          <Divider type="vertical" className="h-6 border-slate-300 dark:border-slate-700!" />
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400!">
            <ClockCircleOutlined />
            <span className="text-sm font-semibold">Live Updates</span>
          </div>
          <Divider type="vertical" className="h-6 border-slate-300 dark:border-slate-700!" />
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400!">
            <StockOutlined />
            <span className="text-sm font-semibold">Global Markets</span>
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
                label="Bitcoin"
                value={
                  stats.btcPrice ? `$${Math.round(Number(stats.btcPrice)).toLocaleString()}` : '--'
                }
                change={stats.marketCapChange}
              />
              <StatItem
                label="Ethereum"
                value={
                  stats.ethPrice ? `$${Math.round(Number(stats.ethPrice)).toLocaleString()}` : '--'
                }
                change={-0.2}
              />
            </>
          )}
        </div>

        {/* Market Lists */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <CoinList
            title="Top Gainers"
            type="gainers"
            items={gainers as Coin[]}
            isLoading={loadingGainers}
            icon={RiseOutlined}
            iconColor="#10b981"
          />
          <CoinList
            title="Top Losers"
            type="losers"
            items={losers as Coin[]}
            isLoading={loadingLosers}
            icon={FallOutlined}
            iconColor="#f43f5e"
          />
          <CoinList
            title="Trending Now"
            type="trending"
            items={trending as Coin[]}
            isLoading={loadingTrending}
            icon={FireFilled}
            iconColor="#3b82f6"
          />
        </div>
      </div>
    </section>
  );
}
