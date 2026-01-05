import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import type { Coin } from '../../types/types';

interface CoinCardProps {
  coin: Coin;
  rank: number;
}

export function CoinCard({ coin, rank }: CoinCardProps) {
  const isPositive = (coin.priceChangePercentage24h ?? 0) >= 0;

  // Logic for price formatting based on value
  const formattedPrice = coin.currentPrice
    ? `$${coin.currentPrice.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: coin.currentPrice < 1 ? 6 : 2,
      })}`
    : '--';

  const getRankBadgeColor = () => {
    if (rank === 1) return 'from-yellow-400 to-yellow-600';
    if (rank === 2) return 'from-slate-300 to-slate-500';
    return 'from-slate-200 to-slate-400';
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200/60 bg-white p-4 transition-all duration-300 hover:border-blue-300 hover:shadow-md dark:border-slate-800/60! dark:bg-slate-900/40! dark:hover:border-blue-600/40!">
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
            {formattedPrice}
          </span>
          <span
            className={`mt-1 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${
              isPositive
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10! dark:text-emerald-400!'
                : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10! dark:text-rose-400!'
            }`}
          >
            {isPositive ? <CaretUpOutlined /> : <CaretDownOutlined />}
            {Math.abs(coin.priceChangePercentage24h).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}
