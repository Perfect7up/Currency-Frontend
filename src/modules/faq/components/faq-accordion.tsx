import React, { useMemo } from 'react';
import { Collapse, Typography, ConfigProvider } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';

const { Title, Text } = Typography;

const FAQ_DATA = [
  {
    header: 'What security standards does the platform follow?',
    content:
      'We adhere to SOC 2 Type II and ISO 27001 standards. 98% of assets are stored in multi-signature cold wallets with insured custodians.',
  },
  {
    header: 'What is the maximum trading limit for institutional accounts?',
    content:
      'Institutional accounts benefit from uncapped trading volumes and high-priority withdrawal limits up to $10M daily by default.',
  },
  {
    header: 'Does the platform support FIX protocol connectivity?',
    content:
      'Yes, we provide a robust FIX 4.4 API for high-frequency trading (HFT) and sub-millisecond execution speeds through our prime brokerage stack.',
  },
  {
    header: 'How do sub-accounts work?',
    content:
      'Main accounts can create up to 500 sub-accounts to isolate strategies, manage risk levels, and distribute capital across different team members.',
  },
];

export const FaqAccordion: React.FC = () => {
  const items: CollapseProps['items'] = useMemo(
    () =>
      FAQ_DATA.map((faq, i) => ({
        key: i.toString(),
        label: (
          <span className="text-lg font-bold transition-colors group-hover:text-blue-600 dark:text-slate-200 dark:group-hover:text-indigo-400">
            {faq.header}
          </span>
        ),
        children: (
          <div className="px-6 pb-6">
            <Text className="text-base! leading-relaxed text-slate-500! dark:text-slate-400!">
              {faq.content}
            </Text>
          </div>
        ),
        className:
          'group mb-4 overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-[#040a1d]',
      })),
    [],
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Collapse: {
            headerPadding: '20px 24px',
            contentPadding: '0px',
          },
        },
      }}
    >
      <div className="mx-auto max-w-4xl px-4 py-20 dark:bg-[#000513]">
        <div className="mb-12 text-center">
          <Title level={2} className="mb-4! font-black! dark:text-white!">
            Frequently Asked Questions
          </Title>
          <Text className="text-lg! text-slate-500! dark:text-slate-400!">
            Everything you need to know about our institutional trading stack.
          </Text>
        </div>

        <Collapse
          accordion
          defaultActiveKey={['0']}
          bordered={false}
          ghost
          expandIconPosition="end"
          expandIcon={({ isActive }) =>
            isActive ? (
              <MinusOutlined className="dark:text-white" />
            ) : (
              <PlusOutlined className="dark:text-white" />
            )
          }
          items={items}
        />
      </div>
    </ConfigProvider>
  );
};
