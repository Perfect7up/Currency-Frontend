import { Typography, Button } from 'antd';
import { MailOutlined, MessageOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export const FaqSupport = () => {
  return (
    <div className="relative overflow-hidden bg-white py-24 transition-colors duration-300 dark:bg-[#000513]">
      <div className="pointer-events-none absolute top-0 h-full w-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent dark:from-indigo-500/10" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <Title
          level={2}
          className="mb-6! bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text font-black! text-transparent! dark:from-white! dark:via-indigo-400! dark:to-white!"
        >
          Still have questions?
        </Title>
        <Text className="mb-12 block text-lg! font-medium! text-slate-600! transition-colors dark:text-slate-400!">
          Our institutional support team is available 24/7 to assist with your technical or account
          queries.
        </Text>

        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          <Button
            size="large"
            icon={<MessageOutlined />}
            className="group! flex! h-16! items-center! gap-3! rounded-full! border-none! bg-slate-900! px-8! text-lg! font-bold! text-white! transition-all! hover:scale-105! hover:bg-slate-800! dark:bg-white! dark:text-slate-900! dark:hover:bg-slate-200!"
          >
            Live Chat Support
          </Button>
          <Button
            size="large"
            icon={<MailOutlined />}
            className="flex! h-16! items-center! gap-3! rounded-full! border-2! border-slate-300! bg-transparent! px-8! text-lg! font-bold! text-slate-700! transition-all! hover:scale-105! hover:border-blue-600! hover:bg-blue-50! hover:text-blue-600! dark:border-slate-700! dark:text-slate-300! dark:hover:border-indigo-500! dark:hover:bg-indigo-500/10! dark:hover:text-indigo-400!"
          >
            Email Support
          </Button>
        </div>
        <Text className="mt-12 flex items-center justify-center gap-2 text-sm! font-semibold! text-slate-500! dark:text-slate-500!">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          Average response time: 4 minutes
          <span className="mx-2 opacity-30">•</span>
          Global Support
        </Text>
      </div>
    </div>
  );
};
