import { Typography, Divider } from 'antd';
import {
  TwitterOutlined,
  GithubOutlined,
  LinkedinOutlined,
  GlobalOutlined,
  SafetyCertificateFilled,
  ThunderboltFilled,
} from '@ant-design/icons';
import { Link as RouterLink } from 'react-router-dom';

const { Title, Text } = Typography;

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-slate-50 dark:bg-[#000513]!">
      {/* Top gradient divider (same language as other sections) */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-blue-500/40 to-transparent dark:via-indigo-500/40!" />

      <div className="mx-auto max-w-7xl px-6 py-28">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-6 flex items-center gap-4">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-14 w-14"
                style={{ filter: 'drop-shadow(0 0 12px rgba(0, 209, 255, 0.4))' }}
              />
              <Title
                level={3}
                className="m-0! font-normal tracking-tight text-slate-900! dark:text-white!"
              >
                CRYPTO<span className="text-[#00d1ff]">C</span>
              </Title>
            </div>

            <Text className="block max-w-sm text-base leading-relaxed font-medium text-slate-600 dark:text-slate-400!">
              A global crypto trading platform delivering real-time intelligence, deep liquidity,
              and institutional-grade security for modern traders.
            </Text>
          </div>

          {/* Platform */}
          <div>
            <Title level={4} className="mb-6! text-slate-900! dark:text-white!">
              Platform
            </Title>
            <ul className="space-y-4 text-base font-semibold text-slate-600 dark:text-slate-400!">
              <li>
                <RouterLink
                  to="/markets"
                  className="hover:text-blue-600 dark:hover:text-indigo-400"
                >
                  Markets
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/trade" className="hover:text-blue-600 dark:hover:text-indigo-400">
                  Trade
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/pricing"
                  className="hover:text-blue-600 dark:hover:text-indigo-400"
                >
                  Fees & Pricing
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/api" className="hover:text-blue-600 dark:hover:text-indigo-400">
                  API Access
                </RouterLink>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <Title level={4} className="mb-6! text-slate-900! dark:text-white!">
              Company
            </Title>
            <ul className="space-y-4 text-base font-semibold text-slate-600 dark:text-slate-400!">
              <li>
                <RouterLink to="/about" className="hover:text-blue-600 dark:hover:text-indigo-400">
                  About Us
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/careers"
                  className="hover:text-blue-600 dark:hover:text-indigo-400"
                >
                  Careers
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/blog" className="hover:text-blue-600 dark:hover:text-indigo-400">
                  Research & Insights
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/legal" className="hover:text-blue-600 dark:hover:text-indigo-400">
                  Legal & Compliance
                </RouterLink>
              </li>
            </ul>
          </div>

          {/* Trust & Status */}
          <div>
            <Title level={4} className="mb-6! text-slate-900! dark:text-white!">
              Trust & Status
            </Title>

            <ul className="space-y-5 text-base font-semibold text-slate-600 dark:text-slate-400!">
              <li className="flex items-center gap-3">
                <SafetyCertificateFilled className="text-emerald-500" />
                Secure & Regulated Infrastructure
              </li>
              <li className="flex items-center gap-3">
                <ThunderboltFilled className="text-blue-600 dark:text-indigo-400!" />
                Real-Time Market Data
              </li>
              <li className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                </span>
                All Systems Operational
              </li>
            </ul>

            {/* Social */}
            <div className="mt-8 flex items-center gap-5 text-2xl text-slate-500 dark:text-slate-400!">
              <a className="hover:text-blue-600 dark:hover:text-indigo-400" aria-label="Twitter">
                <TwitterOutlined />
              </a>
              <a className="hover:text-blue-600 dark:hover:text-indigo-400" aria-label="GitHub">
                <GithubOutlined />
              </a>
              <a className="hover:text-blue-600 dark:hover:text-indigo-400" aria-label="LinkedIn">
                <LinkedinOutlined />
              </a>
              <a className="hover:text-blue-600 dark:hover:text-indigo-400" aria-label="Website">
                <GlobalOutlined />
              </a>
            </div>
          </div>
        </div>

        <Divider className="my-16 border-slate-200 dark:border-slate-800!" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-6 text-base md:flex-row">
          <Text className="font-semibold text-slate-500 dark:text-slate-400!">
            © {new Date().getFullYear()} CryptoC. All rights reserved.
          </Text>

          <div className="flex items-center gap-8 font-semibold text-slate-500 dark:text-slate-400!">
            <RouterLink to="/privacy" className="hover:text-blue-600 dark:hover:text-indigo-400">
              Privacy Policy
            </RouterLink>
            <RouterLink to="/terms" className="hover:text-blue-600 dark:hover:text-indigo-400">
              Terms of Service
            </RouterLink>
            <RouterLink to="/security" className="hover:text-blue-600 dark:hover:text-indigo-400">
              Security
            </RouterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
