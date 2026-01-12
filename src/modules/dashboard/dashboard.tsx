// src/modules/dashboard/dashboard.tsx
import { Typography, Empty } from 'antd';

const { Title, Text } = Typography;

const Dashboard = () => {
  return (
    <div className="animate-in fade-in duration-700">
      <header className="mb-10">
        <Title level={2} className="m-0! font-black! tracking-tight dark:text-white!">
          Market Overview
        </Title>
        <Text className="text-slate-500 dark:text-slate-400">
          Real-time institutional aggregate data across all major liquidity pools.
        </Text>
      </header>

      {/* Clean Slate for your data */}
      <section className="flex min-h-[400px] flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-slate-200 bg-white/30 dark:border-white/10 dark:bg-white/5">
        <Empty
          description={
            <Text className="text-slate-400 italic">Initializing Secure Data Streams...</Text>
          }
        />
      </section>
    </div>
  );
};

export default Dashboard;
