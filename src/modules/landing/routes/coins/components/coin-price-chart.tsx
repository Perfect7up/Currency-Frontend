import { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { Typography, Skeleton, Empty, Card, Tag, Divider } from 'antd';
import {
  RiseOutlined,
  FallOutlined,
  LineChartOutlined,
  GlobalOutlined,
  ThunderboltFilled,
  BarChartOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useCoinPriceHistory, useCoinMarketStats } from '../hooks/use-coins';
import type { PriceHistory } from '../types';

const { Text, Title } = Typography;

interface ChartDataItem {
  date: string;
  price: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    value: number;
    payload: ChartDataItem;
  }[];
  label?: string;
}

interface CoinChartProps {
  coinId: string;
  coinName: string;
}

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value < 1 ? 4 : 2,
  }).format(value);

const formatNumber = (num: number) => {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
  return num.toLocaleString();
};

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur-md dark:border-slate-800! dark:bg-slate-900/95!">
        <p className="mb-2! text-[10px] font-bold! tracking-widest! text-slate-400 uppercase">
          {data.date}
        </p>
        <p className="text-lg! font-bold! text-blue-600 dark:text-blue-400!">
          {formatCurrency(Number(payload[0].value))}
        </p>
      </div>
    );
  }
  return null;
};

const CoinChart = ({ coinId, coinName }: CoinChartProps) => {
  const [period, setPeriod] = useState<string>('7');

  const { data: history, isLoading, isError } = useCoinPriceHistory(coinId, period);
  const { data: stats } = useCoinMarketStats(coinId);

  const chartData = useMemo<ChartDataItem[]>(() => {
    if (!history) return [];
    return (history as PriceHistory[]).map((item) => ({
      date: new Date(item.timestamp).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: period === '1' ? '2-digit' : undefined,
      }),
      price: Number(item.price),
    }));
  }, [history, period]);

  const priceChange = useMemo(() => {
    if (chartData.length < 2) return { value: 0, percentage: 0 };
    const first = chartData[0].price;
    const last = chartData[chartData.length - 1].price;
    return { value: last - first, percentage: ((last - first) / first) * 100 };
  }, [chartData]);

  const isPositive = priceChange.percentage >= 0;

  if (isError) {
    return (
      <section className="relative flex flex-col items-center justify-center bg-white px-4 py-24 transition-colors duration-300 dark:bg-[#000513]">
        <Card className="rounded-3xl border-slate-200! bg-white! dark:border-slate-800! dark:bg-slate-900/50!">
          <Empty
            description={<Text className="dark:text-slate-400!">Market Analysis Offline</Text>}
          />
        </Card>
      </section>
    );
  }

  return (
    <section className="relative -mt-18 flex flex-col items-center justify-center overflow-hidden bg-white px-4 py-24 text-center transition-colors duration-300 dark:bg-[#000513]">
      <div className="pointer-events-none absolute top-0 h-full w-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_70%)]" />
      <div className="relative z-10 w-full max-w-6xl">
        <div className="mb-16 flex flex-col items-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-6 py-2 dark:border-blue-500/20 dark:bg-blue-500/10">
            <LineChartOutlined className="text-blue-600 dark:text-blue-400!" />
            <Text className="text-xs! font-bold! tracking-widest! text-blue-700! uppercase! dark:text-blue-400!">
              Institutional Analysis
            </Text>
          </div>

          <Title
            className="mb-4! bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent! dark:from-white! dark:via-slate-200! dark:to-slate-400!"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
            }}
          >
            {coinName}
          </Title>

          {!isLoading && chartData.length > 0 && (
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {formatCurrency(chartData[chartData.length - 1].price)}
              </span>
              <Tag
                icon={isPositive ? <RiseOutlined /> : <FallOutlined />}
                color={isPositive ? 'success' : 'error'}
                className="flex! items-center gap-1 rounded-full! border-none! px-4! py-1! text-sm! font-bold!"
              >
                {isPositive ? '+' : ''}
                {priceChange.percentage.toFixed(2)}%
              </Tag>
            </div>
          )}
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            {
              label: 'Market Rank',
              value: `#${stats?.marketCapRank || '--'}`,
              icon: <ThunderboltFilled className="text-amber-500" />,
            },
            {
              label: 'Market Cap',
              value: `$${formatNumber(Number(stats?.marketCap || 0))}`,
              icon: <GlobalOutlined className="text-blue-500" />,
            },
            {
              label: '24h Volume',
              value: `$${formatNumber(Number(stats?.totalVolume || 0))}`,
              icon: <BarChartOutlined className="text-indigo-500" />,
            },
            {
              label: 'Supply',
              value: formatNumber(Number(stats?.circulatingSupply || 0)),
              icon: <ClockCircleOutlined className="text-emerald-500" />,
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 transition-all dark:border-slate-800 dark:bg-slate-900/50"
            >
              <div className="mb-2 text-xl">{stat.icon}</div>
              <Text className="text-[10px] font-bold! tracking-widest! text-slate-400! uppercase">
                {stat.label}
              </Text>
              <Text className="text-base font-bold! text-slate-900 dark:text-white!">
                {stat.value}
              </Text>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-xl transition-all dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-100 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-800/30">
            <div className="flex items-center gap-3">
              <div className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-500"></span>
              </div>
              <Text className="text-xs! font-bold! tracking-widest! text-slate-400! uppercase">
                Live Market Feed
              </Text>
            </div>

            <div className="flex gap-1 rounded-xl bg-slate-200/50 p-1 dark:bg-slate-800/50">
              {['1', '7', '30', '365'].map((t) => (
                <button
                  key={t}
                  onClick={() => setPeriod(t)}
                  className={`min-w-16 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                    period === t
                      ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-400!'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {t === '1' ? '1D' : t === '7' ? '7D' : t === '30' ? '1M' : '1Y'}
                </button>
              ))}
            </div>
          </div>

          <div className="h-100 w-full p-8">
            {isLoading ? (
              <div className="flex h-full items-center justify-center">
                <Skeleton.Node
                  active
                  style={{ width: '100%', height: '300px', borderRadius: '24px' }}
                />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="rgba(148, 163, 184, 0.1)"
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                    minTickGap={40}
                  />
                  <YAxis hide domain={['dataMin - dataMin * 0.02', 'dataMax + dataMax * 0.02']} />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#3b82f6"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorPrice)"
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* BOTTOM STATS GRID */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            {
              label: 'Range High',
              value: chartData.length ? Math.max(...chartData.map((d) => d.price)) : 0,
            },
            {
              label: 'Range Low',
              value: chartData.length ? Math.min(...chartData.map((d) => d.price)) : 0,
            },
            { label: 'Price Change', value: priceChange.value },
            { label: 'Volatility', value: priceChange.percentage, isPercent: true },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="group rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-500/30 dark:border-slate-800 dark:bg-slate-900/50"
            >
              <Text className="block text-[10px] font-bold! tracking-widest! text-slate-400! uppercase">
                {stat.label}
              </Text>
              <Text
                className={`mt-2 block text-xl font-bold dark:text-white! ${
                  stat.label.includes('Change') || stat.label === 'Volatility'
                    ? isPositive
                      ? 'text-emerald-500!'
                      : 'text-rose-500!'
                    : 'text-slate-900'
                }`}
              >
                {stat.isPercent
                  ? `${isPositive ? '+' : ''}${stat.value.toFixed(2)}%`
                  : formatCurrency(stat.value)}
              </Text>
              <Divider className="my-3 dark:border-slate-800" />
              <div className="flex items-center gap-1">
                <div
                  className={`h-1 w-full rounded-full ${isPositive ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`}
                >
                  <div
                    className={`h-1 rounded-full ${isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`}
                    style={{ width: '60%' }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoinChart;
