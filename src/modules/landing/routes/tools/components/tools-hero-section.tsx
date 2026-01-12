import { useState } from 'react';
import { Typography, Button, InputNumber, Select } from 'antd';
import { CheckCircleFilled, SwapOutlined, BarChartOutlined } from '@ant-design/icons';
import { useConvert } from '../hooks/use-tools';

const { Title, Text } = Typography;

const TOOL_FEATURES = [
  {
    text: 'Convert between',
    highlight: '400+ digital assets',
    suffix: 'with zero slippage',
  },
  {
    text: 'Compare coins',
    highlight: 'side-by-side',
    suffix: 'with institutional-grade metrics',
  },
  {
    text: 'Powered by',
    highlight: 'real-time market data',
    suffix: 'updated every 60 seconds',
  },
];

const ToolsHero = () => {
  const [amount, setAmount] = useState<number>(1);
  const [coin, setCoin] = useState<string>('bitcoin');

  const { data: quickRate, isLoading } = useConvert(coin, 'usd', amount);

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-white px-4 py-20 text-center transition-colors duration-300 dark:bg-[#000513]">
      <div className="pointer-events-none absolute top-0 h-full w-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent dark:from-indigo-500/10" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-6 flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 dark:border-indigo-500/20 dark:bg-indigo-500/10">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
          </span>
          <Text className="text-xs! font-bold! tracking-widest! text-blue-600! uppercase dark:text-indigo-400!">
            Advanced Analytics Suite
          </Text>
        </div>

        <Title
          className="mb-6! bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent! dark:from-white! dark:via-indigo-400! dark:to-white!"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
          }}
        >
          Precision Tools for <br />
          <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text dark:from-indigo-400! dark:to-cyan-400!">
            Smart Investors
          </span>
        </Title>

        <Title
          level={4}
          className="mb-12! font-medium! text-slate-600! transition-colors dark:text-slate-400!"
          style={{ maxWidth: '700px' }}
        >
          Master the market with our suite of calculation and comparison tools. Analyze price
          trends, convert assets, and stay ahead of the curve.
        </Title>

        <div className="mb-12 flex flex-col items-start gap-5">
          {TOOL_FEATURES.map((feature, index) => (
            <div key={index} className="group flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-indigo-500/10 dark:text-indigo-400 dark:group-hover:bg-indigo-500 dark:group-hover:text-white">
                <CheckCircleFilled className="text-lg" />
              </div>
              <Text className="text-lg! font-medium! text-slate-700! transition-colors dark:text-slate-200!">
                {feature.text}{' '}
                <span className="cursor-pointer text-blue-600 underline decoration-blue-500/30 underline-offset-4 transition-colors hover:text-blue-700 dark:text-indigo-400 dark:decoration-indigo-400/30 dark:hover:text-indigo-300">
                  {feature.highlight}
                </span>{' '}
                {feature.suffix}
              </Text>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            type="default"
            size="large"
            className="group! flex! h-16! items-center! gap-4! rounded-full! border-none! bg-slate-900! py-1! pr-1! pl-8! text-lg! font-bold! text-white! transition-all! hover:scale-105! hover:bg-slate-800! dark:bg-white! dark:text-slate-900! dark:hover:bg-slate-200!"
          >
            Open Full Converter
            <div className="flex h-13 w-13 items-center justify-center rounded-full bg-blue-600 text-white transition-transform group-hover:rotate-12 dark:bg-indigo-600">
              <SwapOutlined style={{ fontSize: '20px' }} />
            </div>
          </Button>

          <Button
            size="large"
            icon={<BarChartOutlined />}
            className="flex! h-16! items-center! rounded-full! border-slate-200! px-8! text-lg! font-bold! text-slate-900! hover:border-blue-500! hover:text-blue-600! dark:border-slate-700! dark:bg-transparent! dark:text-white! dark:hover:border-indigo-400! dark:hover:text-indigo-400!"
          >
            Compare Assets
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 rounded-3xl border border-slate-100 bg-slate-50/50 p-4 transition-colors dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex items-center gap-2 pr-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <Text className="text-xs! font-bold! tracking-wider text-slate-400! uppercase">
              Quick Check:
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <InputNumber
              min={0}
              value={amount}
              onChange={(val) => setAmount(val || 0)}
              className="w-24! rounded-lg! border-slate-200! bg-white! text-slate-900! dark:border-slate-700! dark:bg-slate-800! dark:text-white!"
              variant="outlined"
            />
            <Select
              value={coin}
              onChange={setCoin}
              className="w-32! rounded-lg! border-slate-200! bg-white! text-left! text-slate-900! dark:border-slate-700! dark:bg-slate-800! dark:text-white!"
              options={[
                { value: 'bitcoin', label: 'BTC' },
                { value: 'ethereum', label: 'ETH' },
                { value: 'solana', label: 'SOL' },
              ]}
            />
          </div>

          <div className="flex items-center gap-3 px-2">
            <SwapOutlined className="text-slate-300" />
            <Text className="font-mono! text-lg! font-bold! text-blue-600! dark:text-indigo-400!">
              {isLoading
                ? '...'
                : quickRate?.value
                  ? `$${quickRate.value.toLocaleString()}`
                  : '0.00'}
            </Text>
            <Text className="text-xs! font-bold! text-slate-400!">USD</Text>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsHero;
