import { Typography, Button } from 'antd';
import { SafetyCertificateFilled, ArrowRightOutlined, GlobalOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const MISSION_POINTS = [
  {
    text: 'Built on',
    highlight: 'radical transparency',
    suffix: 'and open-source principles',
  },
  {
    text: 'Pioneering',
    highlight: 'financial inclusion',
    suffix: 'for the next billion users',
  },
  {
    text: 'Governed by',
    highlight: 'institutional-grade',
    suffix: 'regulatory frameworks',
  },
];

const AboutHero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-white px-4 py-24 text-center transition-colors duration-300 dark:bg-[#000513]">
      {/* Background Glow Effect - Matching the Home Hero */}
      <div className="pointer-events-none absolute top-0 h-full w-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent dark:from-blue-500/10" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Badge / Sub-indicator */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 dark:border-indigo-500/20 dark:bg-indigo-500/10">
          <GlobalOutlined className="text-blue-600 dark:text-indigo-400" />
          <Text className="text-xs! font-bold! tracking-widest! text-blue-700! uppercase! dark:text-indigo-400!">
            Our Mission & Vision
          </Text>
        </div>

        <Title
          className="mb-6! bg-linear-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent! dark:from-white! dark:via-cyan-300! dark:to-white!"
          style={{
            fontSize: 'clamp(2.2rem, 6.5vw, 4rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
          }}
        >
          Building the Infrastructure <br />
          <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text dark:from-indigo-400! dark:to-cyan-400!">
            of Future Finance
          </span>
        </Title>

        <Title
          level={4}
          className="mb-12! font-medium! text-slate-600! transition-colors dark:text-slate-400!"
          style={{ maxWidth: '750px' }}
        >
          We are more than a platform. We are a global team of engineers, financiers, and
          visionaries dedicated to bridging the gap between traditional finance and the
          decentralized web.
        </Title>

        <div className="mb-14 flex flex-col items-start gap-6">
          {MISSION_POINTS.map((point, index) => (
            <div key={index} className="group flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-indigo-500/10 dark:text-indigo-400 dark:group-hover:bg-indigo-500 dark:group-hover:text-white">
                <SafetyCertificateFilled style={{ fontSize: '20px' }} />
              </div>
              <Text className="text-lg! font-medium! text-slate-700! transition-colors dark:text-slate-200!">
                {point.text}{' '}
                <span className="cursor-pointer text-blue-600 underline decoration-blue-500/30 underline-offset-4 transition-colors hover:text-blue-700 dark:text-indigo-400 dark:decoration-indigo-400/30 dark:hover:text-indigo-300">
                  {point.highlight}
                </span>{' '}
                {point.suffix}
              </Text>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <Button
            type="default"
            size="large"
            className="group! flex! h-16! items-center! gap-4! rounded-full! border-none! bg-slate-900! py-1! pr-1! pl-8! text-lg! font-bold! text-white! transition-all! hover:scale-105! hover:bg-slate-800! dark:bg-white! dark:text-slate-900! dark:hover:bg-slate-200!"
          >
            Explore our Vision
            <div className="flex h-13 w-13 items-center justify-center rounded-full bg-blue-600 text-white transition-transform group-hover:translate-x-1 dark:bg-indigo-600">
              <ArrowRightOutlined style={{ fontSize: '20px' }} />
            </div>
          </Button>

          <Button
            type="link"
            size="large"
            className="text-lg! font-bold! text-slate-600! hover:text-blue-600! dark:text-slate-400! dark:hover:text-indigo-400!"
          >
            Meet the Team
          </Button>
        </div>

        <Text className="mt-12 flex items-center gap-2 text-sm! font-semibold! text-slate-500! dark:text-slate-500!">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500"></span>
          Audited by top-tier security firms
          <span className="mx-2 opacity-30">•</span>
          SOC2 Type II Certified
        </Text>
      </div>
    </section>
  );
};

export default AboutHero;
