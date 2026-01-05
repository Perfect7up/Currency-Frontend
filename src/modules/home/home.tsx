import Navbar from '../../core/components/layout/navbar';
import { Hero, MarketStatsCard, TrendingCoins } from './components';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <MarketStatsCard />
      <TrendingCoins />
    </>
  );
};

export default Home;
