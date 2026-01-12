import { useState, useEffect } from 'react';
import {
  Skeleton,
  Typography,
  Button,
  Result,
  Avatar,
  Tag,
  Pagination,
  ConfigProvider,
  theme,
  Divider,
} from 'antd';
import {
  FireFilled,
  ReloadOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  ArrowRightOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { useTrendingCoins, useCoins } from '../hooks/use-coins';
import type { Coin } from '../types';

const { Title, Text } = Typography;

interface TrendingCoinsProps {
  onCoinSelect: (id: string, name: string) => void;
}

interface CoinCardProps {
  coin: Coin;
  formatPrice: (price: number) => string;
  onCoinSelect: (id: string, name: string) => void;
}

export default function TrendingCoins({ onCoinSelect }: TrendingCoinsProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pageSize = 12;

  useEffect(() => {
    const checkTheme = () => setIsDarkMode(document.documentElement.classList.contains('dark'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const { data: trendingData, isLoading: loadingTrending } = useTrendingCoins();
  const {
    data: allCoins,
    isLoading: loadingAll,
    isError,
    refetch,
  } = useCoins(currentPage, pageSize);

  const formatPrice = (price: number): string =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price || 0);

  if (isError) {
    return (
      <section className="flex min-h-120 w-full items-center justify-center bg-white py-20 dark:bg-[#000513]!">
        <Result
          status="error"
          title={<span className="dark:text-white!">Market Feed Interrupted</span>}
          extra={
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={() => refetch()}
              className="h-10 rounded-full bg-blue-600 px-8"
            >
              Retry Connection
            </Button>
          }
        />
      </section>
    );
  }

  return (
    <section className="relative -mt-12 w-full overflow-hidden bg-white py-24 transition-colors duration-300 dark:bg-[#000513]!">
      <div className="relative z-10 w-full px-4 md:px-8 lg:px-16">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-50 px-5 py-1.5 dark:bg-orange-500/10!">
            <FireFilled className="text-orange-500" />
            <Text className="text-[10px] font-black tracking-widest text-orange-600 uppercase dark:text-orange-400!">
              Hot Momentum
            </Text>
          </div>
          <Title
            className="mb-0! bg-linear-to-b from-slate-900 to-slate-600 bg-clip-text text-transparent! dark:from-white! dark:to-slate-400!"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900 }}
          >
            Trending Assets
          </Title>
        </div>

        <div className="mb-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loadingTrending
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex h-20 items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800! dark:bg-slate-900/40!"
                >
                  <Skeleton.Avatar active size="large" shape="circle" />
                  <Skeleton active paragraph={{ rows: 1 }} title={false} />
                </div>
              ))
            : trendingData?.slice(0, 4).map((coin) => (
                <div
                  key={coin.id}
                  onClick={() => onCoinSelect(coin.id, coin.name)}
                  className="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 transition-all hover:border-blue-500 dark:border-slate-800! dark:bg-slate-900/40!"
                >
                  <Avatar src={coin.image} size={40} className="shrink-0" />
                  <div className="flex flex-col">
                    <Text className="text-xs font-bold! uppercase dark:text-white!">
                      {coin.symbol}
                    </Text>
                    <Text className="text-[11px] text-slate-500 dark:text-slate-400!">
                      {formatPrice(coin.currentPrice)}
                    </Text>
                  </div>
                  <Tag
                    bordered={false}
                    className="mr-0! ml-auto bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10! dark:text-emerald-400!"
                  >
                    {coin.priceChangePercentage24h.toFixed(1)}%
                  </Tag>
                </div>
              ))}
        </div>

        <Divider className="mb-20 border-slate-100 dark:border-slate-800!" />

        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50 px-5 py-1.5 dark:bg-blue-500/10!">
            <GlobalOutlined className="text-blue-500" />
            <Text className="text-[10px] font-black tracking-widest text-blue-600 uppercase dark:text-blue-400!">
              Market Directory
            </Text>
          </div>
          <Title
            className="mb-4! bg-linear-to-b from-slate-900 to-slate-600 bg-clip-text text-transparent! dark:from-white! dark:to-slate-400!"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800 }}
          >
            All Digital Currencies
          </Title>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loadingAll
            ? Array.from({ length: pageSize }).map((_, i) => (
                <div
                  key={i}
                  className="h-48 rounded-2xl border border-slate-100 bg-slate-50 p-6 dark:border-slate-800! dark:bg-slate-900/50"
                >
                  <Skeleton active avatar={{ size: 'large' }} paragraph={{ rows: 3 }} />
                </div>
              ))
            : allCoins?.map((coin) => (
                <CompactCoinCard
                  key={coin.id}
                  coin={coin}
                  formatPrice={formatPrice}
                  onCoinSelect={onCoinSelect}
                />
              ))}
        </div>

        <div className="mt-16 flex justify-center py-12">
          <ConfigProvider
            theme={{
              algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
              token: {
                colorPrimary: '#3b82f6',
                colorBgContainer: 'transparent',
                colorText: isDarkMode ? '#94a3b8' : '#475569',
              },
            }}
          >
            <Pagination
              current={currentPage}
              total={100}
              pageSize={pageSize}
              onChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 800, behavior: 'smooth' });
              }}
              showSizeChanger={false}
              className="dark:text-white!"
            />
          </ConfigProvider>
        </div>
      </div>
    </section>
  );
}

function CompactCoinCard({ coin, formatPrice, onCoinSelect }: CoinCardProps) {
  const isPositive = coin.priceChangePercentage24h >= 0;

  return (
    <div
      onClick={() => onCoinSelect(coin.id, coin.name)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all hover:border-blue-500/40 hover:shadow-xl dark:border-slate-800! dark:bg-slate-900/60!"
    >
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-left">
            <Avatar
              src={coin.image}
              size={44}
              className="border border-slate-100 bg-slate-50 p-1 dark:border-slate-700! dark:bg-slate-800!"
            />
            <div>
              <Text className="block text-[10px] leading-none font-black tracking-tighter text-slate-400 uppercase dark:text-slate-500!">
                {coin.symbol}
              </Text>
              <Title
                level={5}
                className="m-0! truncate text-sm! font-bold! dark:text-white!"
                style={{ maxWidth: '100px' }}
              >
                {coin.name}
              </Title>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div
              className={`flex items-center text-xs font-black ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}
            >
              {isPositive ? <CaretUpOutlined /> : <CaretDownOutlined />}
              {Math.abs(coin.priceChangePercentage24h).toFixed(2)}%
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-end justify-between">
          <div className="text-left">
            <Text className="block text-[9px] font-bold tracking-widest text-slate-400 uppercase dark:text-slate-500!">
              Live Price
            </Text>
            <Text className="text-xl font-black tracking-tight dark:text-white!">
              {formatPrice(coin.currentPrice)}
            </Text>
          </div>
          <Button
            type="primary"
            size="small"
            icon={<ArrowRightOutlined />}
            className="flex h-8! w-8! items-center justify-center rounded-lg border-none bg-slate-100 text-slate-900 opacity-0 transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:opacity-100 dark:bg-slate-800! dark:text-slate-400!"
          />
        </div>
      </div>
      <div
        className={`h-1 w-full transition-colors ${isPositive ? 'bg-emerald-500/20 group-hover:bg-emerald-500' : 'bg-rose-500/20 group-hover:bg-rose-500'}`}
      />
    </div>
  );
}
