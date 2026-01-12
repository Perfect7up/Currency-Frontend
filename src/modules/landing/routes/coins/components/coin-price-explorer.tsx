import { useState } from 'react';
import { Typography } from 'antd';
import { RocketOutlined, FireFilled } from '@ant-design/icons';
import { useCoins } from '../hooks/use-coins';
import CoinChart from './coin-price-chart';

const { Text, Title } = Typography;

const CoinPriceExplorer = () => {
  const [selectedCoin, setSelectedCoin] = useState({
    id: 'bitcoin',
    name: 'Bitcoin',
  });

  // We still fetch coins to ensure we can get the correct name/data for the chart
  const { data: coins = [] } = useCoins(1, 100);

  const handleCoinChange = (id: string, name: string) => {
    setSelectedCoin({ id, name });
  };

  const popularCoins = [
    { id: 'bitcoin', name: 'Bitcoin', icon: '₿' },
    { id: 'ethereum', name: 'Ethereum', icon: 'Ξ' },
    { id: 'solana', name: 'Solana', icon: '◎' },
    { id: 'cardano', name: 'Cardano', icon: '₳' },
    { id: 'dogecoin', name: 'Dogecoin', icon: 'Ð' },
  ];

  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-[#000513]!">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-linear-to-b from-white to-slate-50 px-4 py-16 transition-colors duration-300 dark:border-slate-800! dark:from-[#000513]! dark:to-slate-950!">
        <div className="pointer-events-none absolute top-0 h-full w-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1),transparent_60%)]!" />

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-2 dark:border-blue-500/20! dark:bg-blue-500/10!">
            <RocketOutlined className="text-blue-600! dark:text-blue-400!" />
            <Text className="text-xs! font-bold! tracking-widest! text-blue-700! uppercase! dark:text-blue-400!">
              Advanced Analytics
            </Text>
          </div>

          {/* Title */}
          <Title
            level={1}
            className="mb-4! bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent! dark:from-white! dark:via-slate-200! dark:to-slate-400!"
            style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Market Intelligence
            <br />
            <span className="bg-linear-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent!">
              Dashboard
            </span>
          </Title>

          <Text className="mb-10! block max-w-2xl text-base! text-slate-600! dark:text-slate-400!">
            Deep-dive into comprehensive price charts and historical data. Track performance across
            multiple timeframes with institutional-grade analytics.
          </Text>

          {/* Popular Assets Header */}
          <div className="mb-6 flex items-center gap-2">
            <FireFilled className="text-orange-500!" />
            <Text className="text-xs! font-bold! tracking-wider! text-slate-400! uppercase! dark:text-slate-500!">
              Select an Asset
            </Text>
          </div>

          {/* Asset Selection Buttons */}
          <div className="flex flex-wrap gap-3">
            {popularCoins.map((coin) => (
              <button
                key={coin.id}
                onClick={() => {
                  const found = coins?.find((c) => c.id === coin.id);
                  handleCoinChange(coin.id, found?.name || coin.name);
                }}
                className={`group flex cursor-pointer items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                  selectedCoin.id === coin.id
                    ? 'border-blue-500 bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 dark:border-slate-800! dark:bg-slate-900/50! dark:text-slate-300! dark:hover:border-blue-700!'
                }`}
              >
                <span className="text-xl">{coin.icon}</span>
                <span>{coin.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Chart Section */}
      <CoinChart coinId={selectedCoin.id} coinName={selectedCoin.name} />

      {/* Feature Section */}
      <section className="border-t border-slate-200 bg-slate-50 px-4 py-12 dark:border-slate-800! dark:bg-slate-950!">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Real-Time Data',
                desc: 'Live price feeds updated every minute from global exchanges',
                icon: '⚡',
              },
              {
                title: 'Historical Analysis',
                desc: 'Access comprehensive price history spanning multiple years',
                icon: '📊',
              },
              {
                title: 'Multi-Timeframe',
                desc: 'Analyze trends across daily, weekly, monthly, and yearly periods',
                icon: '🔍',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg dark:border-slate-800! dark:bg-slate-900/50!"
              >
                <div className="mb-3 text-3xl">{feature.icon}</div>
                <Title level={5} className="mb-2! text-slate-900! dark:text-white!">
                  {feature.title}
                </Title>
                <Text className="text-sm! text-slate-600! dark:text-slate-400!">
                  {feature.desc}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoinPriceExplorer;
