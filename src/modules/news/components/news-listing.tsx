import { useState } from 'react';
import { Typography, Button, Pagination, ConfigProvider, theme, Skeleton, Empty, Tag } from 'antd';
import {
  ArrowRightOutlined,
  GlobalOutlined,
  CalendarOutlined,
  SafetyCertificateOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { useNews } from '../hooks/use-news';

const { Title, Text } = Typography;

interface NewsListingProps {
  onArticleClick?: (id: number) => void;
}

const NewsListing = ({ onArticleClick }: NewsListingProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const { data: articles, isLoading, isError, error } = useNews(currentPage, pageSize);

  const SkeletonCard = () => (
    <div className="flex flex-col rounded-[2.5rem] border border-slate-100 bg-white p-4 dark:border-slate-800/50 dark:bg-slate-900/40">
      <Skeleton.Button active className="h-60! w-full! rounded-3xl" />
      <div className="mt-6 space-y-4 px-2">
        <Skeleton active paragraph={{ rows: 2 }} title={{ width: '80%' }} />
      </div>
    </div>
  );

  return (
    <section className="bg-white px-4 py-24 transition-colors duration-300 dark:bg-[#000513]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600/10 dark:bg-indigo-400/10">
                <SafetyCertificateOutlined className="text-xs text-blue-600 dark:text-indigo-400" />
              </span>
              <Text className="text-xs! font-bold! tracking-[0.2em] text-blue-600! uppercase dark:text-indigo-400!">
                Live News Feed
              </Text>
            </div>
            <Title
              level={2}
              className="m-0! text-slate-900! dark:text-white!"
              style={{
                fontWeight: 900,
                fontSize: 'clamp(2.25rem, 5vw, 3rem)',
                letterSpacing: '-0.03em',
              }}
            >
              Market{' '}
              <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-cyan-400">
                Intelligence
              </span>
            </Title>
          </div>
          <Text className="max-w-xs text-base! leading-relaxed! font-medium! text-slate-500! dark:text-slate-400!">
            Real-time updates aggregated from global sources, processed by our analytics engine.
          </Text>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(pageSize)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center rounded-[3rem] border border-dashed border-slate-200 py-20 dark:border-slate-800">
            <Empty
              description={
                <div className="space-y-2">
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    Connection Issue
                  </p>
                  <p className="text-slate-500">{error?.message}</p>
                </div>
              }
            >
              <Button
                shape="round"
                size="large"
                className="border-none! bg-slate-900! text-white! hover:scale-105! dark:bg-white! dark:text-slate-900!"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </Empty>
          </div>
        )}

        {!isLoading && !isError && articles && (
          <>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <article
                  key={article.id}
                  onClick={() => onArticleClick?.(article.id)}
                  className="group flex cursor-pointer flex-col overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-slate-800/40 dark:bg-slate-900/20"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={
                        article.imageUrl.startsWith('http')
                          ? article.imageUrl
                          : `https://www.cryptocompare.com${article.imageUrl}`
                      }
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.src =
                          'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=800';
                      }}
                    />
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-2 rounded-2xl bg-white/90 px-3 py-1.5 text-[10px] font-black tracking-widest text-slate-900 uppercase backdrop-blur-md dark:bg-slate-900/90 dark:text-white">
                        <GlobalOutlined className="text-blue-600 dark:text-indigo-400" />
                        {article.source}
                      </div>
                    </div>
                    {article.isFeatured && (
                      <div className="absolute top-4 right-4">
                        <Tag
                          color="gold"
                          className="m-0! rounded-full! border-none! px-3! py-1! text-[10px]! font-bold! uppercase! shadow-lg!"
                        >
                          Featured
                        </Tag>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-8">
                    <div className="mb-4 flex items-center gap-3 text-[11px] font-bold text-slate-400 dark:text-slate-500">
                      <CalendarOutlined />
                      {new Date(article.publishedAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>

                    <Title
                      level={4}
                      className="mb-4! line-clamp-2 text-xl! leading-tight! font-bold! text-slate-900! transition-colors group-hover:text-blue-600 dark:text-white! dark:group-hover:text-indigo-400!"
                    >
                      {article.title}
                    </Title>

                    <Text className="mb-8 line-clamp-3 text-sm! leading-relaxed! text-slate-500! dark:text-slate-400!">
                      {article.summary}
                    </Text>

                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex items-center gap-3 text-sm font-bold text-slate-900 dark:text-white">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-800 dark:group-hover:bg-indigo-500">
                          <ReadOutlined />
                        </span>
                        Quick View
                      </div>

                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-bold text-blue-600 underline-offset-4 hover:underline dark:text-indigo-400"
                      >
                        Source <ArrowRightOutlined className="ml-1 -rotate-45" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-20 flex justify-center">
              <ConfigProvider
                theme={{
                  algorithm: theme.darkAlgorithm,
                  token: {
                    colorPrimary: '#6366f1',
                    borderRadius: 100,
                    colorBgContainer: 'transparent',
                  },
                }}
              >
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={100}
                  onChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  showSizeChanger={false}
                  className="rounded-full bg-slate-50 px-8 py-3 dark:bg-slate-900/40"
                />
              </ConfigProvider>
            </div>
          </>
        )}

        {!isLoading && !articles?.length && !isError && (
          <div className="py-20 text-center">
            <Empty description="No articles currently available." />
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsListing;
