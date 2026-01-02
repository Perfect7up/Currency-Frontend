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
      <div className="pointer-events-none absolute top-0 h-full w-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent dark:from-blue-900/20" />

      <div className="relative z-10 flex flex-col items-center">
        <Title
          className="mb-6! text-slate-900! transition-colors dark:text-white!"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          The World’s Premier <br />
          <span className="text-blue-600 dark:text-blue-500">Crypto Trading Platform</span>
        </Title>

        <Title
          level={4}
          className="mb-12! font-normal! text-slate-600! transition-colors dark:text-gray-400!"
          style={{ maxWidth: '600px' }}
        >
          Buy Bitcoin, Ethereum, and 400+ crypto with confidence
        </Title>
        <div className="mb-12 flex flex-col items-start gap-5">
          {FEATURES.map((feature, index) => (
            <div key={index} className="flex items-center gap-4">
              <CheckCircleFilled className="text-xl text-blue-600 dark:text-blue-500" />
              <Text className="text-lg! text-slate-700! transition-colors dark:text-white!">
                {feature.text}{' '}
                <span className="cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-400">
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
          className="flex! h-14! items-center! gap-4! rounded-full! border-none! bg-black! py-1! pr-1! pl-8! text-base! font-bold! text-white! hover:opacity-90! dark:bg-white! dark:text-black!"
        >
          Sign up and get up to 1 BTC
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white dark:bg-blue-600">
            <ArrowRightOutlined />
          </div>
        </Button>

        <Text className="mt-8 text-sm! text-slate-500! dark:text-gray-500!">
          No credit card required <span className="mx-2">•</span> Instant setup
        </Text>
      </div>
    </section>
  );
};

export default Hero;
