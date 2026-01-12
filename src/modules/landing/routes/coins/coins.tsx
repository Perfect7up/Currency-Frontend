import { useState, useRef } from 'react';
import { CoinAnalyticsHub, CoinChart, CoinsHero, TrendingCoins } from './components';

const Coins = () => {
  const [selectedCoin, setSelectedCoin] = useState({
    id: 'bitcoin',
    name: 'Bitcoin',
  });

  const chartRef = useRef<HTMLDivElement>(null);
  const handleCoinSelect = (id: string, name: string) => {
    setSelectedCoin({ id, name });

    setTimeout(() => {
      chartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <>
      <CoinsHero onCoinSelect={handleCoinSelect} />
      <TrendingCoins onCoinSelect={handleCoinSelect} />

      <CoinChart coinId={selectedCoin.id} coinName={selectedCoin.name} />
      <CoinAnalyticsHub coinId={selectedCoin.id} />
    </>
  );
};

export default Coins;
