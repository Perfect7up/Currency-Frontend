import React, { useState, useMemo, useEffect } from 'react';
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  ComposedChart,
} from 'recharts';
import { Spin, Space, Select } from 'antd';
import { CaretUpFilled, CaretDownFilled, LineChartOutlined } from '@ant-design/icons';
import { useOhlcvChart } from '../hooks/use-charts';
import { SUPPORTED_COINS, TIMEFRAMES, type CoinOption } from '../constants/coins';
import type { OhlcvPoint } from '../types';

interface ChartDataItem extends OhlcvPoint {
  formattedTime: string;
}

interface TooltipPayloadItem {
  payload: ChartDataItem;
  value: number;
  name: string;
  color: string;
  dataKey?: string | number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: readonly TooltipPayloadItem[];
  label?: string | number;
  isDark: boolean;
}

export const TradingViewChart: React.FC = () => {
  const [selectedCoin, setSelectedCoin] = useState<CoinOption>(SUPPORTED_COINS[0]);
  const [period, setPeriod] = useState<string>('1h');
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const { data: history, isLoading } = useOhlcvChart(selectedCoin.id, period);

  const chartData = useMemo<ChartDataItem[]>(() => {
    if (!history) return [];
    return history.map((item) => ({
      ...item,
      formattedTime: new Date(item.time).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }));
  }, [history]);

  const latest = chartData[chartData.length - 1];
  const isUp = latest ? latest.close >= latest.open : true;
  const changePercent = latest ? ((latest.close - latest.open) / latest.open) * 100 : 0;

  const colors = {
    grid: isDark ? '#1e222d' : '#f0f0f0',
    text: isDark ? '#707a8a' : '#64748b',
    area: isDark ? '#2962ff' : '#3b82f6',
    bg: isDark ? '#000513' : '#ffffff',
    toolbar: isDark ? '#0b0e11' : '#f8fafc',
    border: isDark ? '#1e293b' : '#e2e8f0',
  };

  const getLegendValue = (key: 'OPEN' | 'HIGH' | 'LOW' | 'VOL'): string => {
    if (!latest) return '0.00';
    switch (key) {
      case 'OPEN':
        return latest.open.toLocaleString(undefined, { minimumFractionDigits: 2 });
      case 'HIGH':
        return latest.high.toLocaleString(undefined, { minimumFractionDigits: 2 });
      case 'LOW':
        return latest.low.toLocaleString(undefined, { minimumFractionDigits: 2 });
      case 'VOL':
        return latest.volume.toLocaleString();
    }
  };

  return (
    <div
      className="flex h-150 w-full flex-col overflow-hidden rounded-lg border transition-colors"
      style={{ backgroundColor: colors.bg, borderColor: colors.border }}
    >
      <div
        className="flex items-center justify-between border-b px-4 py-2"
        style={{ backgroundColor: colors.toolbar, borderColor: colors.border }}
      >
        <Space size="large">
          <Select
            value={selectedCoin.id}
            onChange={(val) => {
              const coin = SUPPORTED_COINS.find((c) => c.id === val);
              if (coin) setSelectedCoin(coin);
            }}
            variant="borderless"
            className="coin-select-dropdown font-bold"
            suffixIcon={<LineChartOutlined style={{ color: colors.text }} />}
          >
            {SUPPORTED_COINS.map((coin) => (
              <Select.Option key={coin.id} value={coin.id}>
                <span className={isDark ? 'text-slate-400' : 'text-slate-400'}>
                  {coin.symbol} / USD
                </span>
              </Select.Option>
            ))}
          </Select>

          <div
            className={`flex items-center rounded px-2 py-0.5 text-xs font-bold ${isUp ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}
          >
            {isUp ? <CaretUpFilled /> : <CaretDownFilled />}
            {Math.abs(changePercent).toFixed(2)}%
          </div>

          <div className="mx-2 h-4 w-px" style={{ backgroundColor: colors.border }} />

          <div className="flex gap-1">
            {TIMEFRAMES.map((tf) => (
              <button
                key={tf.value}
                onClick={() => setPeriod(tf.value)}
                className={`rounded px-3 py-1 text-[11px] font-bold transition-all ${
                  period === tf.value
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-blue-500'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </Space>
      </div>

      <div className="relative w-full grow">
        {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/5 backdrop-blur-sm">
            <Spin size="large" />
          </div>
        )}

        <div className="pointer-events-none absolute top-4 left-6 z-10 flex gap-4 font-mono text-[11px]">
          {(['OPEN', 'HIGH', 'LOW', 'VOL'] as const).map((label) => (
            <div key={label} className="flex gap-1">
              <span className="text-slate-500">{label}</span>
              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                {getLegendValue(label)}
              </span>
            </div>
          ))}
          <div className="flex gap-1">
            <span className="text-slate-500">CLOSE</span>
            <span className={isUp ? 'text-emerald-500' : 'text-rose-500'}>
              {latest?.close.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 40, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.area} stopOpacity={0.4} />
                <stop offset="95%" stopColor={colors.area} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="0" stroke={colors.grid} vertical horizontal />
            <XAxis
              dataKey="formattedTime"
              axisLine={false}
              tickLine={false}
              tick={{ fill: colors.text, fontSize: 10 }}
              minTickGap={80}
            />
            <YAxis
              yAxisId="price"
              orientation="right"
              domain={['auto', 'auto']}
              axisLine={false}
              tickLine={false}
              tick={{ fill: colors.text, fontSize: 10 }}
              width={65}
            />
            <YAxis yAxisId="volume" hide domain={[0, (max: number) => max * 4]} />

            <Tooltip
              content={(props) => (
                <CustomTooltip
                  active={props.active}
                  payload={props.payload as readonly TooltipPayloadItem[]}
                  label={props.label}
                  isDark={isDark}
                />
              )}
              isAnimationActive={false}
            />

            <Bar
              yAxisId="volume"
              dataKey="volume"
              fill={isDark ? '#1e222d' : '#e2e8f0'}
              opacity={0.6}
            />
            <Area
              yAxisId="price"
              type="monotone"
              dataKey="close"
              stroke={colors.area}
              strokeWidth={2}
              fill="url(#colorPrice)"
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, isDark }) => {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;
    const isPriceUp = data.close >= data.open;

    return (
      <div
        className={`rounded border p-3 text-[12px] shadow-xl transition-colors ${
          isDark
            ? 'border-[#363a45] bg-[#1e222d] text-white'
            : 'border-slate-200 bg-white text-slate-900'
        }`}
      >
        <div
          className="mb-2 border-b pb-1 font-bold opacity-60"
          style={{ borderColor: isDark ? '#363a45' : '#f1f5f9' }}
        >
          {data.formattedTime}
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1">
          <span className="text-slate-500">Price</span>
          <span
            className={`font-mono font-bold ${isPriceUp ? 'text-emerald-500' : 'text-rose-500'}`}
          >
            ${data.close.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
          <span className="text-slate-500">Volume</span>
          <span className="font-mono opacity-80">{data.volume.toLocaleString()}</span>
        </div>
      </div>
    );
  }
  return null;
};
