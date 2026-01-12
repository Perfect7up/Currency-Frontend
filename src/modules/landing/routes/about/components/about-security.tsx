import { Typography, Badge } from 'antd';
import { LockFilled } from '@ant-design/icons';

const { Title, Text } = Typography;

const AboutSecurity = () => {
  return (
    <section className="bg-white py-24 dark:bg-[#000513]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          <div className="flex-1">
            <Badge count="TRUST & SAFETY" className="mb-6" color="#4f46e5" />
            <Title level={2} className="mb-6! font-black! dark:text-white!">
              Your Security is Our <br />
              <span className="text-blue-600 dark:text-indigo-400">Sole Obsession</span>
            </Title>
            <div className="space-y-6">
              {[
                'Multi-Signature Cold Storage for 98% of assets',
                'Advanced AES-256 Encryption at rest',
                'SOC2 Type I & II Compliance certification',
                '24/7 Global security operations center (GSOC)',
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                  <Text className="text-lg! font-medium! text-slate-700! dark:text-slate-300!">
                    {text}
                  </Text>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex-1">
            <div className="relative z-10 rounded-[2.5rem] border border-slate-200 bg-slate-50 p-12 dark:border-slate-800 dark:bg-slate-900/50">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl dark:bg-slate-800">
                  <LockFilled style={{ fontSize: '40px' }} className="text-emerald-500" />
                </div>
                <Title level={3} className="m-0! dark:text-white!">
                  Institutional Grade
                </Title>
                <Text className="mt-2 block text-slate-500!">
                  Securing digital assets for over 8 years without a single breach.
                </Text>
              </div>
            </div>
            {/* Glow Effect behind card */}
            <div className="absolute -inset-4 z-0 rounded-[3rem] bg-linear-to-r from-blue-500/20 to-indigo-500/20 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSecurity;
