import React from 'react';
import { Spin, Empty } from 'antd';
import { ClockCircleOutlined, HistoryOutlined } from '@ant-design/icons';
import type { OhlcvPoint } from '../types';

interface MarketActivityProps {
  history?: OhlcvPoint[];
  isLoading: boolean;
  symbol: string;
}

export const MarketActivity: React.FC<MarketActivityProps> = ({ history, isLoading, symbol }) => {
  const recentTrades = React.useMemo(() => {
    if (!history) return [];
    return [...history].reverse().slice(0, 15);
  }, [history]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0b0e11]">
      <div className="flex gap-6 border-b border-slate-100 px-6 pt-3 dark:border-slate-800">
        <div className="cursor-pointer border-b-2 border-blue-500 pb-3 text-xs font-bold text-blue-500">
          <HistoryOutlined className="mr-2" /> Recent Market Activity
        </div>
        <div className="cursor-pointer pb-3 text-xs font-bold text-slate-400 hover:text-slate-600">
          My Positions
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Spin />
          </div>
        ) : recentTrades.length > 0 ? (
          <table className="w-full border-collapse text-left">
            <thead className="sticky top-0 z-50 bg-white text-[10px] font-bold text-slate-500 uppercase dark:bg-black">
              <tr>
                <th className="px-6 py-2">Time</th>
                <th className="px-6 py-2">Type</th>
                <th className="px-6 py-2">Price (USD)</th>
                <th className="px-6 py-2">Volume ({symbol})</th>
                <th className="px-6 py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="font-mono text-[11px]">
              {recentTrades.map((item, idx) => {
                const isPositive = item.close >= item.open;
                const timeStr = new Date(item.time).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                });

                return (
                  <tr
                    key={idx}
                    className="border-b border-slate-50 transition-colors hover:bg-slate-500/5 dark:border-slate-800/50"
                  >
                    <td className="px-6 py-2 text-slate-500">
                      <ClockCircleOutlined className="mr-1 opacity-50" /> {timeStr}
                    </td>
                    <td
                      className={`px-6 py-2 font-bold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}
                    >
                      {isPositive ? 'BUY' : 'SELL'}
                    </td>
                    <td className="px-6 py-2 text-slate-400!">${item.close.toLocaleString()}</td>
                    <td className="px-6 py-2 text-slate-400!">{item.volume.toFixed(4)}</td>
                    <td className="px-6 py-2 text-right font-bold text-slate-400!">
                      $
                      {(item.close * item.volume).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="flex h-full items-center justify-center">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span className="text-slate-500">No market data available</span>}
            />
          </div>
        )}
      </div>
    </div>
  );
};
