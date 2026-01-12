import { useState } from 'react';
import { SUPPORTED_COINS } from './constants/coins';
import { useOhlcvChart } from './hooks/use-charts';
import { MarketActivity, OrderBook, TradingViewChart } from './components';

const Trade = () => {
  const [selectedCoin] = useState(SUPPORTED_COINS[0]);
  const [period] = useState('1h');

  const { data: history, isLoading } = useOhlcvChart(selectedCoin.id, period);

  return (
    <main className="min-h-screen bg-[#f8fafc] p-3 transition-colors lg:p-4 dark:bg-[#000513]">
      <div className="mx-auto max-w-400">
        <div className="grid h-220 grid-cols-12 gap-4">
          <div className="col-span-12 h-full overflow-hidden md:col-span-4 lg:col-span-3">
            <OrderBook />
          </div>
          <div className="col-span-12 flex h-full flex-col gap-4 overflow-hidden md:col-span-8 lg:col-span-9">
            <div className="min-h-0 flex-3 overflow-hidden rounded-lg border border-slate-200 shadow-sm dark:border-slate-800">
              <TradingViewChart />
            </div>
            <div className="min-h-0 flex-[1.4] overflow-hidden rounded-lg border border-slate-200 shadow-sm dark:border-slate-800">
              <MarketActivity
                history={history}
                isLoading={isLoading}
                symbol={selectedCoin.symbol}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Trade;
