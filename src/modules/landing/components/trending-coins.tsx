import { Skeleton, Divider, Typography, Button, Result } from 'antd';
import { useTrendingCoins, useCoinsList } from '../hooks/use-coins';
import {
  FireFilled,
  GlobalOutlined,
  ThunderboltFilled,
  StarFilled,
  ReloadOutlined,
} from '@ant-design/icons';
import { CoinList, StatItem } from './common';

const { Title } = Typography;

export default function TrendingCoins() {
  const {
    data: trending,
    isLoading: loadingTrending,
    isError: errorTrending,
    refetch: refetchTrending,
  } = useTrendingCoins();

  const {
    data: marketLeaders,
    isLoading: loadingLeaders,
    isError: errorLeaders,
    refetch: refetchLeaders,
  } = useCoinsList(1, 10);

  const btc = marketLeaders?.find((c) => c.symbol?.toLowerCase() === 'btc');
  const eth = marketLeaders?.find((c) => c.symbol?.toLowerCase() === 'eth');

  const handleRetryAll = () => {
    refetchTrending();
    refetchLeaders();
  };

  if (errorTrending || errorLeaders) {
    return (
      <section className="flex min-h-150 w-full items-center justify-center bg-white py-20 dark:bg-[#000513]!">
        <Result
          status="error"
          title={<span className="dark:text-white!">Data Stream Interrupted</span>}
          extra={[
            <Button
              type="primary"
              key="retry"
              icon={<ReloadOutlined />}
              onClick={handleRetryAll}
              className="h-10 rounded-full bg-blue-600 px-8"
            >
              Retry Connection
            </Button>,
          ]}
        />
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden bg-linear-to-b from-slate-50 via-white to-slate-50 py-20 dark:from-[#000513]! dark:via-slate-950! dark:to-[#000513]!">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-50">
        <div className="absolute top-40 -right-20 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl dark:bg-purple-500/10!"></div>
        <div className="absolute bottom-20 -left-20 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl dark:bg-blue-500/10!"></div>
      </div>

      <div className="relative w-full px-4 md:px-8 lg:px-16">
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-linear-to-r from-blue-50 to-purple-50 px-6 py-2 dark:from-blue-500/10! dark:to-purple-500/10!">
            <FireFilled className="text-lg text-blue-600 dark:text-blue-400!" />
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase dark:text-blue-400!">
              Hot Assets Tracked
            </span>
          </div>
          <Title
            className="mb-6! bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent! dark:from-white! dark:via-indigo-400! dark:to-white!"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Trending Assets
          </Title>
        </div>

        <div className="mb-8 flex items-center justify-center gap-8 rounded-2xl border border-slate-200/60 bg-white/80 p-4 backdrop-blur-xl dark:border-slate-800/60! dark:bg-slate-900/40!">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-orange-500"></span>
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white!">Live Trends</span>
          </div>
          <Divider type="vertical" className="h-6 border-slate-300 dark:border-slate-700!" />
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400!">
            <GlobalOutlined />
            <span className="text-sm font-semibold">Global Data</span>
          </div>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {loadingLeaders ? (
            <div className="col-span-full">
              <Skeleton active paragraph={{ rows: 1 }} />
            </div>
          ) : (
            <>
              <StatItem
                label="Bitcoin Price"
                value={btc?.currentPrice ? `$${btc.currentPrice.toLocaleString()}` : undefined}
                change={btc?.priceChangePercentage24h}
              />
              <StatItem
                label="Ethereum Price"
                value={eth?.currentPrice ? `$${eth.currentPrice.toLocaleString()}` : undefined}
                change={eth?.priceChangePercentage24h}
              />
              <StatItem label="Active Trends" value={trending?.length || 0} />
              <StatItem label="Market Depth" value="Top 100" />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <CoinList
            title="Trending Now"
            items={trending}
            isLoading={loadingTrending}
            isError={errorTrending}
            onRetry={() => refetchTrending()}
            icon={ThunderboltFilled}
            iconColor="#f59e0b"
          />
          <CoinList
            title="Market Leaders"
            items={marketLeaders}
            isLoading={loadingLeaders}
            isError={errorLeaders}
            onRetry={() => refetchLeaders()}
            icon={StarFilled}
            iconColor="#8b5cf6"
          />
        </div>
      </div>
    </section>
  );
}
