import { Typography, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const AboutCTA = () => {
  return (
    <section className="py-24 dark:bg-[#000513]">
      <div className="mx-auto max-w-5xl px-4">
        <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 px-8 py-16 text-center dark:bg-white">
          {/* Decorative shapes */}
          <div className="absolute top-0 left-0 h-32 w-32 bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-32 w-32 bg-indigo-500/10 blur-3xl" />

          <Title level={2} className="mb-4! font-black! text-white! dark:text-slate-900!">
            Be Part of the Financial Revolution
          </Title>
          <Text className="mb-10 block text-lg! text-slate-400! dark:text-slate-500!">
            Join 150+ million people who choose our platform for its speed, security, and integrity.
          </Text>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="large"
              className="group! flex! h-16! items-center! gap-4! rounded-full! border-none! bg-blue-600! px-8! text-lg! font-bold! text-white! transition-all! hover:scale-105! hover:bg-blue-500!"
            >
              Get Started Now
              <ArrowRightOutlined className="group-hover:translate-x-1" />
            </Button>
            <Button
              ghost
              size="large"
              className="h-16! rounded-full! border-slate-700! px-8! text-lg! font-bold! text-white! hover:border-white! dark:border-slate-200! dark:text-slate-900!"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
