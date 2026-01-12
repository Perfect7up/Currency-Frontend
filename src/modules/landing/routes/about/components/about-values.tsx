import { Typography } from 'antd';
import {
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  TeamOutlined,
  GlobalOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const VALUES = [
  {
    title: 'Security First',
    desc: 'We employ bank-grade encryption and cold storage to ensure your assets are protected at all times.',
    icon: (
      <SafetyCertificateOutlined
        style={{ fontSize: '32px' }}
        className="text-blue-600 dark:text-indigo-400"
      />
    ),
  },
  {
    title: 'Technological Excellence',
    desc: 'Our matching engine handles over 1.4 million transactions per second with sub-millisecond latency.',
    icon: (
      <ThunderboltOutlined
        style={{ fontSize: '32px' }}
        className="text-indigo-600 dark:text-cyan-400"
      />
    ),
  },
  {
    title: 'User Centric',
    desc: 'Everything we build starts with the user. From novice traders to institutional hedge funds.',
    icon: (
      <TeamOutlined
        style={{ fontSize: '32px' }}
        className="text-emerald-600 dark:text-emerald-400"
      />
    ),
  },
  {
    title: 'Global Compliance',
    desc: 'We work closely with global regulators to set the standard for digital asset compliance.',
    icon: (
      <GlobalOutlined
        style={{ fontSize: '32px' }}
        className="text-orange-600 dark:text-orange-400"
      />
    ),
  },
];

const AboutValues = () => {
  return (
    <section className="bg-white py-24 dark:bg-[#000513]">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <Title
          level={2}
          className="mb-16! bg-linear-to-b from-slate-900 to-slate-700 bg-clip-text font-black! text-transparent! dark:from-white! dark:to-slate-400!"
          style={{ letterSpacing: '-0.02em' }}
        >
          What Drives Us
        </Title>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((val, i) => (
            <div key={i} className="group text-left">
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl dark:bg-slate-900/50 dark:group-hover:bg-slate-800">
                {val.icon}
              </div>

              <Title level={4} className="mb-4! font-bold! text-slate-900! dark:text-white!">
                {val.title}
              </Title>

              <Text className="text-base! leading-relaxed text-slate-500! dark:text-slate-400!">
                {val.desc}
              </Text>

              <div className="mt-6 h-1 w-12 rounded-full bg-slate-100 transition-all duration-500 group-hover:w-24 dark:bg-slate-800" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
