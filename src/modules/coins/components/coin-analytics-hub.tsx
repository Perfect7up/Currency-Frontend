import { useMemo } from 'react';
import { Typography, Skeleton, Card, Progress, Tag, Space, Tooltip, Divider } from 'antd';
import {
  InfoCircleOutlined,
  DeploymentUnitOutlined,
  GlobalOutlined,
  SafetyCertificateOutlined,
  BarChartOutlined,
  ThunderboltOutlined,
  ClockCircleOutlined,
  HistoryOutlined,
  RiseOutlined,
  FallOutlined,
} from '@ant-design/icons';
import { useCoinDetails, useCoinMarketStats, useCoinHistory } from '../hooks/use-coins';

const { Title, Text, Paragraph } = Typography;

interface CoinAnalyticsHubProps {
  coinId: string;
}

const formatValue = (val: number | string | undefined) => {
  if (val === undefined) return '--';
  const num = Number(val);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: num < 1 ? 6 : 2,
  }).format(num);
};

const formatCompact = (num: number | undefined) => {
  if (num === undefined) return '--';
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(num);
};

const AnalyticsHubSkeleton = () => {
  return (
    <section className="relative -mt-12 w-full overflow-hidden bg-white py-24 transition-colors duration-300 dark:bg-[#000513]!">
      <div className="pointer-events-none absolute top-0 h-full w-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_70%)]!" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8!">
        <div className="mb-16 flex flex-col items-start gap-6 border-b border-slate-100 pb-12 md:flex-row md:items-end md:justify-between dark:border-slate-800/50!">
          <div className="w-full space-y-4! md:w-2/3!">
            <Skeleton.Button
              active
              size="small"
              style={{ width: 200, height: 32, borderRadius: 20 }}
            />
            <Skeleton.Input active size="large" style={{ width: '100%', height: 80 }} />
          </div>
          <div className="flex gap-2!">
            <Skeleton.Button
              active
              size="small"
              style={{ width: 100, height: 36, borderRadius: 12 }}
            />
            <Skeleton.Button
              active
              size="small"
              style={{ width: 100, height: 36, borderRadius: 12 }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3!">
          <div className="space-y-8! lg:col-span-2">
            <Card className="overflow-hidden rounded-[2.5rem] border-slate-200! bg-white! shadow-xl! dark:border-slate-800! dark:bg-slate-900/50!">
              <div className="border-b border-slate-100 bg-slate-50/50 p-6 dark:border-slate-800! dark:bg-slate-800/30!">
                <Skeleton.Button active size="small" style={{ width: 180 }} />
              </div>
              <div className="p-8!">
                <Skeleton active paragraph={{ rows: 4 }} />
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2!">
              <Card className="rounded-[2.5rem] border-slate-200! bg-white! shadow-xl! dark:border-slate-800! dark:bg-slate-900/50!">
                <div className="p-8!">
                  <Skeleton.Button active size="small" style={{ width: 120, marginBottom: 24 }} />
                  <Skeleton.Input
                    active
                    size="large"
                    style={{ width: '100%', height: 12, marginBottom: 32 }}
                  />
                  <div className="grid grid-cols-2 gap-4!">
                    <Skeleton active paragraph={{ rows: 2 }} />
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </div>
                </div>
              </Card>

              <Card className="rounded-[2.5rem] border-slate-200! bg-white! shadow-xl! dark:border-slate-800! dark:bg-slate-900/50!">
                <div className="p-8!">
                  <Skeleton active paragraph={{ rows: 5 }} />
                </div>
              </Card>
            </div>
          </div>

          <div className="space-y-6!">
            <Card className="overflow-hidden rounded-[2.5rem] border-slate-200! bg-white! shadow-xl! dark:border-slate-800! dark:bg-slate-900/50!">
              <div className="border-b border-slate-100 bg-slate-50/50 p-6 dark:border-slate-800! dark:bg-slate-800/30!">
                <Skeleton.Button active size="small" style={{ width: 150 }} />
              </div>
              <div className="space-y-8! p-8!">
                <Skeleton active paragraph={{ rows: 2 }} />
                <Skeleton active paragraph={{ rows: 2 }} />
                <Skeleton active paragraph={{ rows: 2 }} />
              </div>
            </Card>

            <Card className="rounded-3xl border-slate-200! bg-white! px-6! py-4! shadow-lg! dark:border-slate-800! dark:bg-slate-900/50!">
              <Skeleton.Button active size="small" style={{ width: '100%' }} />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

const CoinAnalyticsHub = ({ coinId }: CoinAnalyticsHubProps) => {
  const {
    data: details,
    isLoading: loadingDetails,
    isFetching: fetchingDetails,
  } = useCoinDetails(coinId);
  const {
    data: stats,
    isLoading: loadingStats,
    isFetching: fetchingStats,
  } = useCoinMarketStats(coinId);
  const {
    data: history,
    isLoading: loadingHistory,
    isFetching: fetchingHistory,
  } = useCoinHistory(coinId, 7);

  const historyStats = useMemo(() => {
    if (!history || history.length === 0) return null;
    const prices = history.map((h) => Number(h.price));
    const high = Math.max(...prices);
    const low = Math.min(...prices);
    const startPrice = prices[0];
    const endPrice = prices[prices.length - 1];
    const change = ((endPrice - startPrice) / startPrice) * 100;
    return { high, low, change };
  }, [history]);

  const rangePosition = useMemo(() => {
    if (!stats?.low24h || !stats?.high24h || !stats?.currentPrice) return 50;
    const total = stats.high24h - stats.low24h;
    const current = stats.currentPrice - stats.low24h;
    return Math.min(Math.max((current / total) * 100, 0), 100);
  }, [stats]);

  const supplyProgress = useMemo(() => {
    if (!stats?.circulatingSupply || !stats?.totalSupply) return 0;
    return Math.round((stats.circulatingSupply / stats.totalSupply) * 100);
  }, [stats]);

  const isInitialLoading = loadingDetails || loadingStats || loadingHistory;

  if (isInitialLoading) {
    return <AnalyticsHubSkeleton />;
  }

  const isRefetching = fetchingDetails || fetchingStats || fetchingHistory;

  return (
    <section className="relative -mt-12 w-full overflow-hidden bg-white py-24 transition-colors duration-300 dark:bg-[#000513]!">
      {isRefetching && (
        <div className="absolute top-4 right-4 z-50 animate-pulse rounded-full bg-blue-500 px-3 py-1 text-xs text-white shadow-lg">
          Updating...
        </div>
      )}

      <div className="pointer-events-none absolute top-0 h-full w-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_70%)]!" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8!">
        <div className="mb-16 flex flex-col items-start gap-6 border-b border-slate-100 pb-12 md:flex-row md:items-end md:justify-between dark:border-slate-800/50!">
          <div className="space-y-4!">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-6 py-2 dark:border-blue-500/20! dark:bg-blue-500/10!">
              <DeploymentUnitOutlined className="text-blue-600! dark:text-blue-400!" />
              <Text className="text-xs! font-bold! tracking-[0.2em]! text-blue-700! uppercase! dark:text-blue-400!">
                Institutional Analysis
              </Text>
            </div>
            <Title
              className="m-0! bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent! dark:from-white! dark:via-slate-200! dark:to-slate-400!"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              {details?.name}{' '}
              <span className="font-light! text-slate-400! opacity-50!">
                {details?.symbol?.toUpperCase()}
              </span>
            </Title>
          </div>

          <Space
            size="middle"
            className="rounded-2xl border border-slate-100 bg-slate-50/50 p-2 dark:border-slate-800! dark:bg-slate-900/50!"
          >
            <Tag
              icon={<GlobalOutlined />}
              className="m-0! rounded-xl! border-none! bg-white! px-4! py-1! font-bold! shadow-sm! dark:bg-slate-800! dark:text-slate-300!"
            >
              Rank #{stats?.marketCapRank}
            </Tag>
            <Tag
              icon={<SafetyCertificateOutlined />}
              className="m-0! rounded-xl! border-none! bg-blue-500! px-4! py-1! font-bold! text-white! shadow-lg shadow-blue-500/30!"
            >
              Verified
            </Tag>
          </Space>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3!">
          <div className="space-y-8! lg:col-span-2">
            <Card className="overflow-hidden rounded-[2.5rem] border-slate-200! bg-white! shadow-xl! dark:border-slate-800! dark:bg-slate-900/50!">
              <div className="border-b border-slate-100 bg-slate-50/50 p-6 dark:border-slate-800! dark:bg-slate-800/30!">
                <div className="flex items-center gap-2!">
                  <ThunderboltOutlined className="text-amber-500!" />
                  <Text className="text-[10px] font-bold! tracking-widest! text-slate-400! uppercase!">
                    Fundamental Narrative
                  </Text>
                </div>
              </div>
              <div className="p-8!">
                <Paragraph className="m-0! text-lg! leading-relaxed! font-medium! text-slate-600! dark:text-slate-400!">
                  {details?.description ||
                    'No detailed analysis available for this asset at this time.'}
                </Paragraph>
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2!">
              <Card className="rounded-[2.5rem] border-slate-200! bg-white! shadow-xl! dark:border-slate-800! dark:bg-slate-900/50!">
                <div className="p-8!">
                  <div className="mb-6 flex items-center justify-between!">
                    <Text className="text-[10px] font-bold! tracking-widest! text-slate-400! uppercase!">
                      Supply Velocity
                    </Text>
                    <Tooltip title="Percentage of total supply currently in circulation.">
                      <InfoCircleOutlined className="cursor-help! text-slate-400!" />
                    </Tooltip>
                  </div>

                  <Progress
                    percent={supplyProgress}
                    strokeColor={{ '0%': '#3b82f6', '100%': '#6366f1' }}
                    trailColor="rgba(148, 163, 184, 0.1)"
                    strokeWidth={12}
                    showInfo={false}
                    className="mb-8!"
                  />

                  <div className="grid grid-cols-2 gap-4!">
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700/50! dark:bg-slate-800/30!">
                      <Text className="mb-1 block text-[10px] font-black tracking-wider text-slate-400! uppercase!">
                        Circulating
                      </Text>
                      <Text className="text-lg! font-black! dark:text-white!">
                        {formatCompact(stats?.circulatingSupply)}
                      </Text>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700/50! dark:bg-slate-800/30!">
                      <Text className="mb-1 block text-[10px] font-black tracking-wider text-slate-400! uppercase!">
                        Max Supply
                      </Text>
                      <Text className="text-lg! font-black! dark:text-white!">
                        {formatCompact(stats?.totalSupply)}
                      </Text>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="rounded-[2.5rem] border-slate-200! bg-white! shadow-xl! dark:border-slate-800! dark:bg-slate-900/50!">
                <div className="p-8!">
                  <div className="mb-6 flex items-center justify-between!">
                    <Text className="text-[10px] font-bold! tracking-widest! text-slate-400! uppercase!">
                      7-Day Momentum
                    </Text>
                    <HistoryOutlined className="text-blue-500!" />
                  </div>

                  {historyStats && (
                    <div className="space-y-6!">
                      <div className="flex items-center gap-4!">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${historyStats.change >= 0 ? 'bg-emerald-500/10 text-emerald-500!' : 'bg-rose-500/10 text-rose-500!'}`}
                        >
                          {historyStats.change >= 0 ? (
                            <RiseOutlined className="text-xl!" />
                          ) : (
                            <FallOutlined className="text-xl!" />
                          )}
                        </div>
                        <div>
                          <Text className="block text-[10px] font-black text-slate-400! uppercase!">
                            7D Change
                          </Text>
                          <Text
                            className={`text-2xl! font-black! ${historyStats.change >= 0 ? 'text-emerald-500!' : 'text-rose-500!'}`}
                          >
                            {historyStats.change >= 0 ? '+' : ''}
                            {historyStats.change.toFixed(2)}%
                          </Text>
                        </div>
                      </div>

                      <div className="space-y-3!">
                        <div className="flex justify-between!">
                          <Text className="text-xs font-bold text-slate-400!">7D Range Low</Text>
                          <Text className="text-xs font-black dark:text-white!">
                            {formatValue(historyStats.low)}
                          </Text>
                        </div>
                        <div className="flex justify-between!">
                          <Text className="text-xs font-bold text-slate-400!">7D Range High</Text>
                          <Text className="text-xs font-black dark:text-white!">
                            {formatValue(historyStats.high)}
                          </Text>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6!">
            {/* Market Stats Card */}
            <Card className="overflow-hidden rounded-[2.5rem] border-slate-200! bg-white! shadow-xl! transition-all! dark:border-slate-800! dark:bg-slate-900/50!">
              <div className="border-b border-slate-100 bg-slate-50/50 p-6 dark:border-slate-800! dark:bg-slate-800/30!">
                <div className="flex items-center gap-3!">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white shadow-lg shadow-blue-500/20!">
                    <BarChartOutlined className="text-lg!" />
                  </div>
                  <div>
                    <Text className="block text-[10px] font-bold! tracking-widest! text-blue-600 uppercase dark:text-blue-400!">
                      Fundamentals
                    </Text>
                    <Title level={5} className="m-0! font-black! dark:text-white!">
                      Core Statistics
                    </Title>
                  </div>
                </div>
              </div>

              <div className="space-y-8! p-8!">
                {/* Market Cap */}
                <div className="group!">
                  <Text className="mb-2 block text-[10px] font-bold! tracking-widest! text-slate-400! uppercase!">
                    Market Capitalization
                  </Text>
                  <Title
                    level={3}
                    className="m-0! text-2xl! font-black! tracking-tight! transition-colors! group-hover:text-blue-500! dark:text-white!"
                  >
                    {formatValue(stats?.marketCap)}
                  </Title>
                  <div className="mt-4 h-1 w-full rounded-full bg-slate-100 dark:bg-slate-800!">
                    <div className="h-1 w-2/3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]!" />
                  </div>
                </div>

                {/* 24h Range Integrated into Sidebar */}
                <div className="space-y-4!">
                  <Text className="mb-2 block text-[10px] font-bold! tracking-widest! text-slate-400! uppercase!">
                    24H Price Range
                  </Text>
                  <div className="flex items-center justify-between!">
                    <Text className="text-[10px] font-black text-rose-500! uppercase!">
                      L: {formatValue(stats?.low24h)}
                    </Text>
                    <Text className="text-[10px] font-black text-emerald-500! uppercase!">
                      H: {formatValue(stats?.high24h)}
                    </Text>
                  </div>
                  <div className="relative h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800!">
                    <div
                      className="absolute top-1/2 -mt-1.5 h-3 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]! transition-all duration-700!"
                      style={{ left: `${rangePosition}%` }}
                    />
                  </div>
                </div>

                <Divider className="my-0! dark:border-slate-800!" />

                <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-6 shadow-sm dark:border-slate-800! dark:bg-slate-800/30!">
                  <div className="mb-3 flex items-center justify-between!">
                    <div className="flex items-center gap-2!">
                      <GlobalOutlined className="text-xs text-blue-500!" />
                      <Text className="text-[10px] font-bold! tracking-widest! text-slate-500 uppercase dark:text-slate-400!">
                        Fully Diluted Val.
                      </Text>
                    </div>
                    <Tooltip title="Market cap if the max supply was in circulation.">
                      <InfoCircleOutlined className="text-[10px] text-slate-400!" />
                    </Tooltip>
                  </div>
                  <Text className="text-2xl! font-black! tracking-tight! dark:text-blue-400!">
                    {formatValue(Number(stats?.currentPrice) * (stats?.totalSupply || 0))}
                  </Text>
                </div>
              </div>
            </Card>

            {/* Status Card */}
            <Card className="rounded-3xl border-slate-200! bg-white! px-6! py-4! shadow-lg! dark:border-slate-800! dark:bg-slate-900/50!">
              <div className="flex items-center justify-between!">
                <div className="flex items-center gap-3!">
                  <div className="relative flex h-2 w-2!">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75!" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500!" />
                  </div>
                  <Text className="text-[10px] font-black! tracking-widest! text-slate-500 uppercase dark:text-slate-400!">
                    Network Status: <span className="text-emerald-500!">Live</span>
                  </Text>
                </div>
                <div className="flex items-center gap-1.5!">
                  <ClockCircleOutlined className="text-[10px] text-slate-400!" />
                  <Text className="text-[10px] font-bold! text-slate-400!">
                    {details?.lastUpdated
                      ? new Date(details.lastUpdated).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'Syncing...'}
                  </Text>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoinAnalyticsHub;
