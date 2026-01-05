import Navbar from '../../core/components/layout/navbar';
import Hero from './components/hero-section';
import MarketStatsCard from './components/market/market-stats.card';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <MarketStatsCard />
    </>
  );
};

export default Home;
