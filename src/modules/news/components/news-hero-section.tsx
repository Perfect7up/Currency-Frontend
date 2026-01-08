import { Typography, Button, Skeleton } from 'antd';
import { ArrowRightOutlined, ThunderboltFilled } from '@ant-design/icons';
import { useFeaturedNews } from '../hooks/use-news';

const { Title, Text } = Typography;

const NewsHero = () => {
  const { data: featuredArticles, isLoading } = useFeaturedNews();
  const breakingTitle = featuredArticles?.[0]?.title;

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-white px-4 py-20 text-center transition-colors duration-300 dark:bg-[#000513]">
      <div className="pointer-events-none absolute top-0 h-full w-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent dark:from-indigo-500/10" />
      <div className="relative z-10 flex max-w-4xl flex-col items-center">
        <div className="mb-8 flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 transition-colors dark:border-indigo-500/20 dark:bg-indigo-500/10">
          <ThunderboltFilled className="text-blue-600 dark:text-indigo-400" />
          {isLoading ? (
            <Skeleton.Input active size="small" style={{ width: 100, height: 16 }} />
          ) : (
            <Text className="text-xs! font-bold! tracking-wider text-blue-700! uppercase dark:text-indigo-400!">
              Latest Update:{' '}
              <span className="ml-1 font-medium text-slate-600 normal-case dark:text-slate-300">
                {breakingTitle || 'New market analysis available'}
              </span>
            </Text>
          )}
        </div>

        <Title
          className="mb-6! bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent! dark:from-white! dark:via-indigo-400! dark:to-white!"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 4rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
          }}
        >
          Market Insights & <br />
          <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text dark:from-indigo-400! dark:to-cyan-400!">
            Crypto Intelligence
          </span>
        </Title>

        <Title
          level={4}
          className="mb-12! font-medium! text-slate-600! transition-colors dark:text-slate-400!"
          style={{ maxWidth: '700px' }}
        >
          Stay ahead of the curve with real-time updates, institutional-grade analysis, and deep
          dives into the future of decentralized finance.
        </Title>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            type="default"
            size="large"
            className="group! flex! h-16! items-center! gap-4! rounded-full! border-none! bg-slate-900! py-1! pr-1! pl-8! text-lg! font-bold! text-white! transition-all! hover:scale-105! hover:bg-slate-800! dark:bg-white! dark:text-slate-900! dark:hover:bg-slate-200!"
          >
            Explore Articles
            <div className="flex h-13 w-13 items-center justify-center rounded-full bg-blue-600 text-white transition-transform group-hover:rotate-90 dark:bg-indigo-600">
              <ArrowRightOutlined style={{ fontSize: '20px' }} />
            </div>
          </Button>

          <Button
            size="large"
            className="h-16! rounded-full! border-slate-200! px-8! font-bold! text-slate-700! hover:border-blue-600! hover:text-blue-600! dark:border-slate-800! dark:bg-transparent! dark:text-slate-300! dark:hover:border-indigo-400! dark:hover:text-indigo-400!"
          >
            Subscribe to Newsletter
          </Button>
        </div>

        <Text className="mt-8 flex items-center gap-2 text-sm! font-semibold! text-slate-500! dark:text-slate-500!">
          <span className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-6 w-6 rounded-full border-2 border-white bg-slate-200 dark:border-[#000513]"
              />
            ))}
          </span>
          <span className="ml-2">Joined by 50k+ readers weekly</span>
        </Text>
      </div>
    </section>
  );
};

export default NewsHero;
