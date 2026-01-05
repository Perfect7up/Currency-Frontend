import { Footer, Navbar } from '../../core/components/layout';
import { BottomCTA, Hero, MarketStatsCard, TrendingCoins } from './components';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <MarketStatsCard />
      <TrendingCoins />
      <BottomCTA />
      <Footer />
    </>
  );
};

export default Home;
