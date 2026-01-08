import { Typography, Row, Col } from 'antd';

const { Title, Text } = Typography;

const STATS = [
  {
    label: 'QUARTERLY TRADING VOLUME',
    value: '$1.2T+',
    color: 'from-blue-500 to-blue-400',
  },
  {
    label: 'REGISTERED USERS',
    value: '150M+',
    color: 'from-indigo-500 to-purple-400',
  },
  {
    label: 'COUNTRIES SUPPORTED',
    value: '100+',
    color: 'from-emerald-500 to-cyan-400',
  },
  {
    label: 'SECURITY AUDITS',
    value: '500+',
    color: 'from-orange-500 to-yellow-400',
  },
];

const AboutStats = () => {
  return (
    <section className="bg-white py-24 transition-colors duration-300 dark:bg-[#000513]">
      <div className="mx-auto max-w-7xl px-4">
        <Row gutter={[24, 24]}>
          {STATS.map((stat, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-4xl border border-slate-200 bg-white p-10 transition-all duration-500 hover:border-blue-500/30 dark:border-slate-800/60 dark:bg-[#040a1d]">
                {/* Content Container */}
                <div>
                  <Text className="mb-4 block text-[10px] font-black tracking-[0.25em] text-slate-400! uppercase opacity-80 dark:text-slate-500">
                    {stat.label}
                  </Text>

                  <Title
                    level={1}
                    className={`m-0! bg-linear-to-r ${stat.color} bg-clip-text font-black! text-transparent!`}
                    style={{
                      fontSize: 'clamp(2rem, 3vw, 2.75rem)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.2,
                    }}
                  >
                    {stat.value}
                  </Title>
                </div>
                <div className="relative mt-8">
                  <div className="h-0.75 w-12 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className={`h-full w-0 rounded-full bg-linear-to-r ${stat.color} transition-all duration-1000 group-hover:w-full`}
                    />
                  </div>
                </div>

                <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-transparent" />
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default AboutStats;
