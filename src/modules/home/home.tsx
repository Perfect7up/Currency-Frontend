import Navbar from '../../core/components/layout/navbar';
import Hero from './components/hero-section';

const Home = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#000511]">
      <Navbar />
      <Hero />
    </div>
  );
};

export default Home;
