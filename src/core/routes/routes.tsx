import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';

import MainLayout from '../components/layout/main-layout';
import DashboardLayout from '../../modules/dashboard/components/layout/dashboard-layout';

import { ProtectedRoute } from '../auth/protected-route';

import Home from '../../modules/home/home';
import Coins from '../../modules/coins/coins';
import News from '../../modules/news/news';
import Tools from '../../modules/tools/tools';
import Trade from '../../modules/trade/trade';
import About from '../../modules/about/about';
import FAQ from '../../modules/faq/faq';

import { LoginPage } from '../../modules/account/routes/login/login';
import { SignupPage } from '../../modules/account/routes/signup/signup';
import Dashboard from '../../modules/dashboard/dashboard';
import { ForgotPasswordPage } from '../../modules/account/routes/forgot-password/forgot-password';
import { ConfirmEmailPage } from '../../modules/account/routes/email/confirm-email';
import { ResetPasswordPage } from '../../modules/account/routes/reset-password/reset-password';
import { ChangePasswordPage } from '../../modules/account/routes/change-password/change-password';

const LoadingFallback = () => (
  <div className="flex h-screen items-center justify-center bg-white dark:bg-[#000513]">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#00d1ff] border-t-transparent"></div>
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/confirm-email" element={<ConfirmEmailPage />} />
          <Route path="/dashboard/change-password" element={<ChangePasswordPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
