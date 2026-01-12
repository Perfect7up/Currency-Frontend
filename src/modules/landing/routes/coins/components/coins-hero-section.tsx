import { Typography, Avatar, Skeleton } from 'antd';
import { CaretUpOutlined, CaretDownOutlined, FireFilled } from '@ant-design/icons';
import { useTrendingCoins } from '../hooks/use-coins';

const { Title, Text } = Typography;

interface CoinsHeroProps {
  onCoinSelect: (id: string, name: string) => void;
}

const CoinsHero = ({ onCoinSelect }: CoinsHeroProps) => {
  const { data: trendingCoins, isLoading } = useTrendingCoins();

  const formatPrice = (price: number | undefined) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price || 0);

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-white px-4 py-24 text-center transition-colors duration-300 dark:bg-[#000513]">
      <div className="pointer-events-none absolute top-0 h-150 w-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_70%)]" />
      <div className="relative z-10 w-full max-w-5xl">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50/50 px-4 py-1.5 dark:border-orange-500/20 dark:bg-orange-500/10">
          <FireFilled className="text-orange-500" />
          <Text className="text-xs! font-bold! tracking-widest! text-orange-700! uppercase! dark:text-orange-400!">
            Live Market Insights
          </Text>
        </div>

        <Title
          className="mb-6! bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent! dark:from-white! dark:via-slate-200! dark:to-slate-400!"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
          }}
        >
          Explore the <br />
          <span className="bg-linear-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent!">
            Digital Asset Market
          </span>
        </Title>

        <Text
          className="mb-16! block text-lg! text-slate-500! dark:text-slate-400!"
          style={{ maxWidth: '600px', margin: '0 auto' }}
        >
          Track real-time price movements and analytics for your favorite digital assets powered by
          institutional-grade data.
        </Text>

        <div className="flex flex-col items-center">
          <Text className="mb-8 block text-xs! font-bold! tracking-widest! text-slate-400! uppercase!">
            Trending Now
          </Text>

          <div className="flex flex-wrap justify-center gap-4">
            {isLoading
              ? [1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="flex h-16 w-44 items-center gap-3 rounded-xl border border-slate-200 px-4 dark:border-slate-800"
                  >
                    <Skeleton.Avatar active size="small" shape="circle" />
                    <Skeleton.Input active size="small" style={{ width: 80 }} />
                  </div>
                ))
              : trendingCoins?.slice(0, 4).map((coin) => {
                  const isPositive = coin.priceChangePercentage24h >= 0;

                  return (
                    <div
                      key={coin.id}
                      onClick={() => onCoinSelect(coin.id, coin.name)}
                      className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 pr-5 transition-all hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/50"
                    >
                      <Avatar
                        src={coin.image}
                        size="small"
                        className="bg-slate-100 dark:bg-slate-800"
                      />
                      <div className="flex flex-col items-start">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold uppercase dark:text-white">
                            {coin.symbol}
                          </span>
                          <span
                            className={`flex items-center text-[10px] font-bold ${
                              isPositive ? 'text-emerald-500' : 'text-rose-500'
                            }`}
                          >
                            {isPositive ? <CaretUpOutlined /> : <CaretDownOutlined />}
                            {Math.abs(coin.priceChangePercentage24h).toFixed(2)}%
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500">
                          {formatPrice(coin.currentPrice)}
                        </span>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoinsHero;
