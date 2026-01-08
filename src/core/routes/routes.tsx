import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Home from '../../modules/home/home';
import MainLayout from '../components/layout/main-layout';
import Coins from '../../modules/coins/coins';
import News from '../../modules/news/news';
import Tools from '../../modules/tools/tools';

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
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
