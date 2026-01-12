import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 dark:bg-[#000513]">
      <div className="absolute top-1/2 left-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 bg-blue-500/10 blur-[120px] dark:bg-blue-600/20" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-4">
          <span className="text-[120px] leading-none font-black tracking-tighter text-slate-100 md:text-[200px] dark:text-white/5">
            404
          </span>
        </div>

        <div className="max-w-md">
          <Title level={1} className="m-0! mb-2! font-bold! text-slate-900! dark:text-white!">
            Lost in Cyberspace?
          </Title>
          <Text className="mb-8 block text-lg text-slate-500 dark:text-slate-400">
            The data packet you're looking for has been dropped or moved to a different node.
          </Text>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            size="large"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            className="flex h-12 items-center justify-center rounded-xl border-slate-200 font-semibold dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            Go Back
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<HomeOutlined />}
            onClick={() => navigate('/')}
            className="flex h-12 items-center justify-center rounded-xl bg-[#00d1ff] font-bold text-black shadow-[0_10px_20px_rgba(0,209,255,0.3)] hover:scale-105"
          >
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
