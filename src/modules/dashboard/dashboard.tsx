import { Typography, Empty, Tag } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Dashboard = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Tag
              color="processing"
              className="border-none bg-blue-500/10 font-bold tracking-wider text-blue-500 uppercase"
            >
              Live Market
            </Tag>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              <Text className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                Updated 1s ago
              </Text>
            </div>
          </div>
          <Title level={2} className="m-0! font-bold! tracking-tight dark:text-white!">
            Market Overview
          </Title>
          <Text className="text-lg text-slate-500 dark:text-slate-400">
            Real-time institutional aggregate data across major liquidity pools.
          </Text>
        </div>
      </header>
      <section className="relative flex min-h-125 flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-white/2">
        <div
          className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)',
          }}
        />
        <div className="absolute -top-24 -right-24 h-96 w-96 bg-blue-500/10 blur-[120px] dark:bg-blue-600/20" />

        <div className="relative z-10 flex flex-col items-center px-6">
          <div className="mb-8 flex h-24 w-24 rotate-12 items-center justify-center rounded-3xl bg-blue-50 transition-transform hover:rotate-0 dark:bg-blue-500/10">
            <LoadingOutlined className="text-4xl text-blue-500" />
          </div>

          <Empty
            description={
              <div className="flex flex-col items-center gap-3">
                <Text className="text-2xl font-bold dark:text-white">
                  Initializing Secure Streams
                </Text>
                <Text className="max-w-[320px] text-center text-base leading-relaxed text-slate-400">
                  Connecting to global liquidity nodes to aggregate the best market rates.
                </Text>
              </div>
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{ display: 'none' }}
          />

          <div className="mt-12 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 px-6 py-3 dark:border-white/5 dark:bg-white/5">
            <Text className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              System Status: <span className="text-green-500">Operational</span>
            </Text>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
