import React, { useMemo } from 'react';
import { Typography } from 'antd';
import { CaretUpFilled } from '@ant-design/icons';

const { Text } = Typography;

export const OrderBook: React.FC = () => {
  const { asks, bids } = useMemo(() => {
    const gen = (b: number, s: number) =>
      Array.from({ length: 25 }, (_, i) => ({
        price: b + i * s,
        amt: (Math.random() * 1.2 + 0.1).toFixed(4),
      }));
    return { asks: gen(91000, 10).reverse(), bids: gen(90850, -10) };
  }, []);

  const Row = ({ price, amt, type }: { price: number; amt: string; type: 'bid' | 'ask' }) => (
    <div className="group relative grid grid-cols-2 px-4 py-0.5 text-[11px] hover:bg-slate-500/10">
      <div
        className={`absolute inset-y-0 right-0 opacity-10 ${type === 'bid' ? 'bg-emerald-500' : 'bg-rose-500'}`}
        style={{ width: `${parseFloat(amt) * 60}%` }}
      />
      <span className={type === 'bid' ? 'text-emerald-500' : 'text-rose-500'}>
        {price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </span>
      <span className="z-10 text-right font-mono text-slate-400 dark:text-slate-500">{amt}</span>
    </div>
  );

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0b0e11]">
      <div className="border-b border-slate-100 p-3 dark:border-slate-800">
        <Text className="text-[11px] font-bold tracking-widest text-slate-500! uppercase">
          Order Book
        </Text>
      </div>

      <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto">
        <div className="py-1">
          {asks.map((a, i) => (
            <Row key={i} {...a} type="ask" />
          ))}
        </div>
        <div className="sticky top-0 bottom-0 z-10 flex items-center justify-between border-y border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-[#161a1e]">
          <span className="text-lg font-black text-emerald-500">
            90,959.20 <CaretUpFilled className="ml-1 animate-pulse text-xs" />
          </span>
          <span className="text-[10px] text-slate-500">Spread: 0.01%</span>
        </div>
        <div className="py-1">
          {bids.map((b, i) => (
            <Row key={i} {...b} type="bid" />
          ))}
        </div>
      </div>
    </div>
  );
};
