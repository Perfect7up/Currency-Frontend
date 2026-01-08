import { Typography, Button, Space } from 'antd';
import {
  QuestionCircleOutlined,
  ArrowRightOutlined,
  MessageFilled,
  SafetyCertificateFilled,
  ThunderboltFilled,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const HELP_CATEGORIES = [
  {
    text: 'Secure your',
    highlight: 'account and assets',
    suffix: 'with 2FA',
    icon: <SafetyCertificateFilled className="text-xl text-blue-600 dark:text-indigo-400" />,
  },
  {
    text: 'Learn about',
    highlight: 'trading fees',
    suffix: 'and limit orders',
    icon: <ThunderboltFilled className="text-xl text-blue-600 dark:text-indigo-400" />,
  },
  {
    text: 'Connect with',
    highlight: '24/7 live support',
    suffix: 'anytime, anywhere',
    icon: <MessageFilled className="text-xl text-blue-600 dark:text-indigo-400" />,
  },
];

const FaqHero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-white px-4 py-24 text-center transition-colors duration-300 dark:bg-[#000513]">
      {/* Background Glow - Consistent with Hero and About */}
      <div className="pointer-events-none absolute top-0 h-full w-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent dark:from-indigo-500/10" />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center">
        {/* Badge Indicator */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 dark:border-indigo-500/20 dark:bg-indigo-500/10">
          <QuestionCircleOutlined className="text-blue-600 dark:text-indigo-400" />
          <Text className="text-xs! font-bold! tracking-widest! text-blue-700! uppercase! dark:text-indigo-400!">
            Help Center & FAQ
          </Text>
        </div>

        <Title
          className="mb-6! bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent! dark:from-white! dark:via-indigo-400! dark:to-white!"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 4.2rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
          }}
        >
          How can we <br />
          <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text dark:from-indigo-400! dark:to-cyan-400!">
            help you today?
          </span>
        </Title>

        <Title
          level={4}
          className="mb-14! font-medium! text-slate-600! transition-colors dark:text-slate-400!"
          style={{ maxWidth: '650px' }}
        >
          Browse our institutional-grade guides on trading, security, and managing your digital
          assets to find the answers you need.
        </Title>

        {/* Categories / Quick Links */}
        <div className="mb-14 flex flex-col items-start gap-6">
          {HELP_CATEGORIES.map((category, index) => (
            <div key={index} className="group flex items-center gap-4">
              {category.icon}
              <Text className="text-lg! font-medium! text-slate-700! transition-colors dark:text-slate-200!">
                {category.text}{' '}
                <span className="cursor-pointer text-blue-600 underline decoration-blue-500/30 underline-offset-4 transition-colors hover:text-blue-700 dark:text-indigo-400 dark:decoration-indigo-400/30 dark:hover:text-indigo-300">
                  {category.highlight}
                </span>{' '}
                {category.suffix}
              </Text>
            </div>
          ))}
        </div>

        <Space size="middle">
          <Button
            type="default"
            size="large"
            className="group! flex! h-16! items-center! gap-4! rounded-full! border-none! bg-slate-900! py-1! pr-1! pl-8! text-lg! font-bold! text-white! transition-all! hover:scale-105! hover:bg-slate-800! dark:bg-white! dark:text-slate-900! dark:hover:bg-slate-200!"
          >
            Contact Support
            <div className="flex h-13 w-13 items-center justify-center rounded-full bg-blue-600 text-white transition-transform group-hover:-rotate-45 dark:bg-indigo-600">
              <ArrowRightOutlined style={{ fontSize: '20px' }} />
            </div>
          </Button>

          <Button
            type="link"
            className="text-lg! font-bold! text-slate-500! hover:text-blue-600! dark:text-slate-400! dark:hover:text-indigo-400!"
          >
            Join the Community
          </Button>
        </Space>

        <Text className="mt-12 flex items-center gap-2 text-sm! font-semibold! text-slate-500! dark:text-slate-500!">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          Average response time: 4 minutes
          <span className="mx-2 opacity-30">•</span>
          Global Support
        </Text>
      </div>
    </section>
  );
};

export default FaqHero;
