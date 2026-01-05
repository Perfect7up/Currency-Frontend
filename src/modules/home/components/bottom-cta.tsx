import { Typography, Button } from 'antd';
import { ArrowRightOutlined, SafetyCertificateFilled, ThunderboltFilled } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function BottomCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-b from-slate-50 via-white to-slate-50 py-24 dark:from-[#000513]! dark:via-slate-950! dark:to-[#000513]!">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60">
        <div className="absolute top-10 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl dark:bg-indigo-500/20!" />
        <div className="absolute right-20 bottom-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/20!" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-linear-to-r from-blue-50 to-purple-50 px-6 py-2 dark:from-blue-500/10! dark:to-purple-500/10!">
          <ThunderboltFilled className="text-blue-600 dark:text-blue-400!" />
          <span className="text-xs font-black tracking-widest text-blue-600 uppercase dark:text-blue-400!">
            Start Trading Today
          </span>
        </div>

        {/* Title */}
        <Title
          className="mb-6! bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent! dark:from-white! dark:via-indigo-400! dark:to-white!"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
          }}
        >
          Trade Crypto with <br />
          <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text dark:from-indigo-400! dark:to-cyan-400!">
            Speed, Security & Confidence
          </span>
        </Title>

        {/* Subtitle */}
        <Text className="mx-auto mb-12 block max-w-2xl text-lg font-medium text-slate-600 transition-colors dark:text-slate-400!">
          Join millions of traders worldwide. Institutional-grade security, real-time data, and
          lightning-fast execution.
        </Text>

        {/* CTA Button */}
        <div className="flex flex-col items-center gap-6">
          <Button
            size="large"
            className="group! flex! h-16! items-center! gap-4! rounded-full! border-none! bg-slate-900! py-1! pr-1! pl-8! text-lg! font-bold! text-white! transition-all! hover:scale-105! hover:bg-slate-800! dark:bg-white! dark:text-slate-900! dark:hover:bg-slate-200!"
          >
            Create Free Account
            <div className="flex h-13 w-13 items-center justify-center rounded-full bg-blue-600 text-white transition-transform group-hover:-rotate-45 dark:bg-indigo-600">
              <ArrowRightOutlined style={{ fontSize: 20 }} />
            </div>
          </Button>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-500 dark:text-slate-400!">
            <span className="flex items-center gap-2">
              <SafetyCertificateFilled className="text-emerald-500" />
              Secure & Regulated
            </span>
            <span className="opacity-30">•</span>
            <span>No credit card required</span>
            <span className="opacity-30">•</span>
            <span>Instant setup</span>
          </div>
        </div>
      </div>
    </section>
  );
}
