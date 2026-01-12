import { Typography, Button, Skeleton, Badge } from 'antd';
import { ArrowRightOutlined, ShareAltOutlined, ReadOutlined } from '@ant-design/icons';
import { useFeaturedNews } from '../hooks/use-news';

const { Title, Text } = Typography;

export const FeaturedNews = ({ onReadMore }: { onReadMore: (id: number) => void }) => {
  const { data: featured, isLoading, isError } = useFeaturedNews();

  const WORD_LIMIT = 60;

  const formatSummary = (text: string, limit: number) => {
    if (!text) return '';
    const words = text.trim().split(/\s+/);
    if (words.length <= limit) return text;

    return words.slice(0, limit).join(' ') + '...';
  };

  if (isLoading)
    return (
      <div className="bg-white px-4 py-12 dark:bg-[#000513]">
        <div className="mx-auto max-w-7xl">
          <Skeleton.Button active className="h-130! w-full! rounded-[3rem]" />
        </div>
      </div>
    );

  if (isError || !featured?.[0]) return null;

  const main = featured[0];
  const rawText = main.summary || main.content || '';
  const wordCount = rawText.trim().split(/\s+/).length;

  // Apply limit to the text
  const processedText = formatSummary(rawText, WORD_LIMIT);
  const isLongText = wordCount > WORD_LIMIT;

  return (
    <section className="relative overflow-hidden bg-white px-4 py-12 transition-colors duration-300 dark:bg-[#000513]">
      <div className="pointer-events-none absolute top-0 h-full w-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent dark:from-indigo-500/10" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 ring-1 ring-slate-200/10 dark:bg-slate-900/40 dark:ring-slate-800">
          <div className="absolute inset-0 z-0">
            <img
              src={
                main.imageUrl.startsWith('http')
                  ? main.imageUrl
                  : `https://www.cryptocompare.com${main.imageUrl}`
              }
              alt={main.title}
              className="h-full w-full object-cover opacity-30 transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/95 to-transparent" />
          </div>

          <div className="relative z-10 flex min-h-130 flex-col justify-center p-8 md:p-16 lg:w-4/5">
            <div className="mb-6 flex items-center gap-3">
              <Badge
                status="processing"
                color="#2563eb"
                text={
                  <span className="font-black tracking-widest text-blue-500 uppercase dark:text-indigo-400">
                    Editorial Feature
                  </span>
                }
              />
              <span className="text-slate-700">|</span>
              <Text className="text-xs font-bold tracking-[0.2em] text-slate-400! uppercase">
                {main.source}
              </Text>
            </div>

            <Title
              className="mb-6! text-white!"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
              }}
            >
              {main.title}
            </Title>

            <div className="mb-10">
              <Text className="inline text-lg! leading-relaxed! text-slate-300! md:text-xl!">
                {processedText}
                {isLongText && (
                  <button
                    onClick={() => onReadMore(main.id)}
                    className="ml-2 inline-flex items-center gap-1 font-bold text-blue-500 hover:underline dark:text-indigo-400"
                  >
                    — Continue Reading <ReadOutlined className="text-sm" />
                  </button>
                )}
              </Text>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                type="default"
                size="large"
                onClick={() => onReadMore(main.id)}
                className="group! flex! h-14! items-center! gap-4! rounded-full! border-none! bg-blue-600! py-1! pr-1! pl-8! text-base! font-bold! text-white! transition-all! hover:scale-105! hover:bg-blue-700! dark:bg-indigo-600! dark:hover:bg-indigo-500!"
              >
                Open Full Analysis
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white transition-transform group-hover:rotate-45">
                  <ArrowRightOutlined style={{ fontSize: '18px' }} />
                </div>
              </Button>

              <Button
                icon={<ShareAltOutlined />}
                size="large"
                className="h-14! rounded-full! border-slate-700! bg-transparent! font-bold! text-slate-400! transition-colors hover:border-white! hover:bg-white/5! hover:text-white!"
              >
                Share Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
