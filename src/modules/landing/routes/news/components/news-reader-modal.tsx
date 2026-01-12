import { Modal, Typography, Button, Skeleton, Divider, Tag } from 'antd';
import {
  CalendarOutlined,
  GlobalOutlined,
  CloseOutlined,
  ExportOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { useNewsById } from '../hooks/use-news';

const { Title, Text, Paragraph } = Typography;

interface ReaderProps {
  articleId: number | null;
  isVisible: boolean;
  onClose: () => void;
}

export const NewsReaderModal = ({ articleId, isVisible, onClose }: ReaderProps) => {
  const { data: article, isLoading } = useNewsById(articleId || '');

  return (
    <Modal
      open={isVisible}
      onCancel={onClose}
      footer={null}
      closeIcon={null}
      width={1100}
      centered
      style={{
        padding: 0,
        borderRadius: '2.5rem',
        overflow: 'hidden',
        backgroundColor: 'transparent',
      }}
      styles={{
        mask: {
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(0, 5, 19, 0.8)',
        },
        body: {
          padding: 0,
          borderRadius: '2.5rem',
          overflow: 'hidden',
        },
      }}
    >
      <div className="relative flex flex-col overflow-hidden border border-slate-200 bg-white shadow-2xl transition-colors md:flex-row dark:border-slate-800 dark:bg-[#000513]">
        <button
          onClick={onClose}
          className="group absolute top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/10 text-slate-900 backdrop-blur-xl transition-all hover:bg-red-500 hover:text-white dark:bg-white/10 dark:text-white dark:hover:bg-red-500"
        >
          <CloseOutlined className="text-lg transition-transform group-hover:rotate-90" />
        </button>

        <div className="relative h-72 w-full md:h-auto md:w-5/12">
          {isLoading ? (
            <Skeleton.Button active className="h-full! w-full!" />
          ) : article ? (
            <>
              <img
                src={
                  article.imageUrl.startsWith('http')
                    ? article.imageUrl
                    : `https://www.cryptocompare.com${article.imageUrl}`
                }
                className="h-full w-full object-cover"
                alt="article"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/20 to-transparent md:bg-linear-to-r" />

              <div className="absolute right-8 bottom-8 left-8">
                <Tag
                  color="blue"
                  className="mb-4 rounded-full border-none bg-blue-600 px-4 py-1 font-bold tracking-widest text-white uppercase"
                >
                  {article.source}
                </Tag>
                <Title level={3} className="m-0! text-white! drop-shadow-md!">
                  Exclusive Coverage
                </Title>
              </div>
            </>
          ) : null}
        </div>

        <div className="relative flex h-[85vh] flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-8 py-12 md:px-16">
            {isLoading ? (
              <div className="space-y-8">
                <Skeleton
                  active
                  paragraph={{ rows: 15 }}
                  title={{ width: '90%', className: '!h-10' }}
                />
              </div>
            ) : article ? (
              <article>
                <div className="mb-8 flex items-center gap-6 text-xs font-bold tracking-widest text-slate-400 uppercase">
                  <span className="flex items-center gap-2">
                    <CalendarOutlined className="text-blue-600 dark:text-indigo-400" />
                    {new Date(article.publishedAt).toLocaleDateString(undefined, {
                      dateStyle: 'long',
                    })}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span className="flex items-center gap-2">
                    <GlobalOutlined className="text-blue-600 dark:text-indigo-400" />
                    {article.source}
                  </span>
                </div>

                <Title
                  level={1}
                  className="mb-8! text-slate-900! dark:text-white!"
                  style={{
                    fontWeight: 900,
                    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {article.title}
                </Title>

                <div className="mb-10 rounded-2xl border-l-4 border-blue-600 bg-blue-50/50 p-6 dark:border-indigo-500 dark:bg-indigo-500/5">
                  <Text className="text-lg! font-medium! text-slate-700! italic! dark:text-slate-300!">
                    {article.summary}
                  </Text>
                </div>

                <Divider className="opacity-50 dark:border-slate-800" />

                <Paragraph className="text-lg! leading-relaxed! text-slate-600! dark:text-slate-400!">
                  {article.content}
                </Paragraph>

                {/* Footer Action Card */}
                <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-4xl border border-slate-100 bg-slate-50 p-8 md:flex-row dark:border-slate-800/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white dark:bg-indigo-600">
                      <GlobalOutlined style={{ fontSize: '20px' }} />
                    </div>
                    <div>
                      <Text className="block text-[10px] font-black tracking-widest text-slate-400! uppercase">
                        Source Integrity
                      </Text>
                      <Text className="text-base font-bold text-slate-400!">
                        Verified by {article.source}
                      </Text>
                    </div>
                  </div>

                  <Button
                    type="primary"
                    size="large"
                    icon={<ExportOutlined />}
                    href={article.url}
                    target="_blank"
                    className="h-14! rounded-full! border-none! bg-slate-900! px-8! font-bold! text-white! transition-all! hover:scale-105! dark:bg-white! dark:text-slate-900!"
                  >
                    View Original Link
                  </Button>
                </div>
              </article>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <Title level={4} className="dark:text-slate-400">
                  Unable to load content
                </Title>
                <Button onClick={onClose} type="link" icon={<ArrowLeftOutlined />}>
                  Return to newsroom
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
