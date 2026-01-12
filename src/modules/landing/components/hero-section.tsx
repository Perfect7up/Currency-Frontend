import { Typography, Button } from 'antd';
import { CheckCircleFilled, ArrowRightOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const FEATURES = [
  {
    text: 'Trade with',
    highlight: '20+ currencies',
    suffix: 'and Apple/Google Pay',
  },
  {
    text: 'Leader in',
    highlight: 'regulatory compliance',
    suffix: 'and security certifications',
  },
  {
    text: 'Trusted by',
    highlight: 'over 150 million users',
    suffix: 'worldwide',
  },
];

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-white px-4 py-20 text-center transition-colors duration-300 dark:bg-[#000513]">
      <div className="pointer-events-none absolute top-0 h-full w-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent dark:from-indigo-500/10" />
      <div className="relative z-10 flex flex-col items-center">
        <Title
          className="mb-6! bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent! dark:from-white! dark:via-indigo-400! dark:to-white!"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
          }}
        >
          The World’s Premier <br />
          <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text dark:from-indigo-400! dark:to-cyan-400!">
            Crypto Trading Platform
          </span>
        </Title>

        <Title
          level={4}
          className="mb-12! font-medium! text-slate-600! transition-colors dark:text-slate-400!"
          style={{ maxWidth: '650px' }}
        >
          Join the future of finance. Buy Bitcoin, Ethereum, and 400+ digital assets with
          institutional-grade security.
        </Title>

        <div className="mb-12 flex flex-col items-start gap-5">
          {FEATURES.map((feature, index) => (
            <div key={index} className="group flex items-center gap-4">
              <CheckCircleFilled className="text-xl text-blue-600 dark:text-indigo-400" />
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

        <Button
          type="default"
          size="large"
          className="group! flex! h-16! items-center! gap-4! rounded-full! border-none! bg-slate-900! py-1! pr-1! pl-8! text-lg! font-bold! text-white! transition-all! hover:scale-105! hover:bg-slate-800! dark:bg-white! dark:text-slate-900! dark:hover:bg-slate-200!"
        >
          Sign up and get up to 1 BTC
          <div className="flex h-13 w-13 items-center justify-center rounded-full bg-blue-600 text-white transition-transform group-hover:-rotate-45 dark:bg-indigo-600">
            <ArrowRightOutlined style={{ fontSize: '20px' }} />
          </div>
        </Button>

        <Text className="mt-8 flex items-center gap-2 text-sm! font-semibold! text-slate-500! dark:text-slate-500!">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          No credit card required
          <span className="mx-2 opacity-30">•</span>
          Instant setup
        </Text>
      </div>
    </section>
  );
};

export default Hero;
