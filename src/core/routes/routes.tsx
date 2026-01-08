import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Home from '../../modules/home/home';
import MainLayout from '../components/layout/main-layout';
import Coins from '../../modules/coins/coins';
import News from '../../modules/news/news';
import Tools from '../../modules/tools/tools';
import Trade from '../../modules/trade/trade';
import About from '../../modules/about/about';
import FAQ from '../../modules/faq/faq';

const LoadingFallback = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="text-lg">Loading...</div>
  </div>
);

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/coins" element={<Coins />} />
            <Route path="/blogs" element={<News />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
