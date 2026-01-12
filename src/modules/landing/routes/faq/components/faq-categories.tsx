import { Typography, Card } from 'antd';
import {
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  ApiOutlined,
  WalletOutlined,
  TeamOutlined,
  BankOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const CATEGORIES = [
  {
    title: 'Account Security',
    icon: <SafetyCertificateOutlined />,
    desc: '2FA, whitelist, and SOC2 compliance standards.',
  },
  {
    title: 'Trading Engine',
    icon: <ThunderboltOutlined />,
    desc: 'Order types, latency, and matching algorithm.',
  },
  {
    title: 'API & FIX',
    icon: <ApiOutlined />,
    desc: 'WebSocket, REST, and institutional FIX connectivity.',
  },
  {
    title: 'Funding & Limits',
    icon: <WalletOutlined />,
    desc: 'Bank wires, SEPA, and daily withdrawal limits.',
  },
  {
    title: 'Institutional',
    icon: <TeamOutlined />,
    desc: 'Sub-account management and corporate onboarding.',
  },
  {
    title: 'Compliance',
    icon: <BankOutlined />,
    desc: 'Tax reports, MiCA regulation, and legal documentation.',
  },
];

export const FaqCategories = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 transition-colors duration-300 dark:bg-[#000513]">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((cat, i) => (
          <Card
            key={i}
            className="group cursor-pointer overflow-hidden rounded-4xl border-slate-200 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30 hover:shadow-2xl dark:border-slate-800/60! dark:bg-[#040a1d]!"
            styles={{ body: { padding: '40px' } }}
          >
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600 transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white dark:bg-indigo-500/10 dark:text-indigo-400 dark:group-hover:bg-indigo-500 dark:group-hover:text-white dark:group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              {cat.icon}
            </div>

            <Title
              level={4}
              className="mb-3! font-bold! text-slate-900! transition-colors dark:text-white!"
            >
              {cat.title}
            </Title>

            <Text className="text-base! leading-relaxed text-slate-500! transition-colors dark:text-slate-400!">
              {cat.desc}
            </Text>

            <div className="mt-8 flex items-center gap-2 text-[10px] font-black tracking-widest text-blue-600 opacity-0 transition-all duration-500 group-hover:translate-x-2 group-hover:opacity-100 dark:text-indigo-400">
              EXPLORE CATEGORY
              <span className="text-lg">→</span>
            </div>

            <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-transparent" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
