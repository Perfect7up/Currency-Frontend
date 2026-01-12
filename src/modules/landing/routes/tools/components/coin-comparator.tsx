import { useState } from 'react';
import { Select, Table, Tag, Typography, Avatar } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { BarChartOutlined, RiseOutlined, FallOutlined, SearchOutlined } from '@ant-design/icons';
import { useCompareCoins } from '../hooks/use-tools';
import { ASSET_OPTIONS } from '../constants/converter-options';
import type { ComparedCoin } from '../types';

const { Title, Text } = Typography;

export const CoinComparator = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['bitcoin', 'ethereum', 'solana']);

  const idsString = selectedIds.join(',');
  const { data, isLoading } = useCompareCoins(idsString);
  const isEmpty = selectedIds.length === 0;
  const coinOptions = ASSET_OPTIONS.map((asset) => ({
    value: asset.value,
    label: (
      <section className="flex items-center justify-between gap-2">
        <span className="font-medium text-slate-900 dark:text-white">{asset.label}</span>
        <span className="text-[10px] text-slate-500 uppercase opacity-40 dark:text-slate-400">
          {asset.symbol}
        </span>
      </section>
    ),
    searchValue: `${asset.label} ${asset.symbol}`.toLowerCase(),
  }));

  const columns: ColumnsType<ComparedCoin> = [
    {
      title: (
        <span className="text-[11px] font-black tracking-widest text-slate-400 uppercase">
          Asset
        </span>
      ),
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <section className="flex items-center gap-3">
          <Avatar
            src={record.image}
            size={40}
            className="border border-slate-100 bg-white dark:border-white/10 dark:bg-slate-800"
          />
          <section className="flex flex-col">
            <Text className="text-base! font-bold! text-slate-900! dark:text-white!">
              {record.name}
            </Text>
            <Text className="text-[10px]! font-black! tracking-wider text-slate-400! uppercase">
              {record.symbol}
            </Text>
          </section>
        </section>
      ),
    },
    {
      title: (
        <span className="text-[11px] font-black tracking-widest text-slate-400 uppercase">
          Price (USD)
        </span>
      ),
      dataIndex: 'currentPrice',
      key: 'price',
      align: 'right',
      render: (val: number) => (
        <Text className="font-mono! text-base! font-bold! text-slate-900! dark:text-slate-100!">
          ${val.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Text>
      ),
    },
    {
      title: (
        <span className="block text-center text-[11px] font-black tracking-widest text-slate-400 uppercase">
          24h Change
        </span>
      ),
      dataIndex: 'priceChangePercentage24h',
      key: 'change',
      align: 'center',
      render: (val: number) => {
        const isPositive = val >= 0;
        return (
          <Tag
            className={`mx-auto flex w-fit items-center gap-1 rounded-full border-none! px-4! py-1! font-black! ${
              isPositive
                ? 'bg-emerald-500/10 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
                : 'bg-rose-500/10 text-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.1)]'
            }`}
          >
            {isPositive ? <RiseOutlined /> : <FallOutlined />}
            {val.toFixed(2)}%
          </Tag>
        );
      },
    },
    {
      title: (
        <span className="block text-right text-[11px] font-black tracking-widest text-slate-400 uppercase">
          Market Cap
        </span>
      ),
      dataIndex: 'marketCap',
      key: 'cap',
      align: 'right',
      render: (val: number) => (
        <Text className="font-bold! text-slate-500! dark:text-slate-400!">
          ${(val / 1e9).toFixed(2)}B
        </Text>
      ),
    },
  ];

  return (
    <section className="mx-auto w-full max-w-5xl transition-all duration-300">
      <section className="mb-8 flex flex-col items-center justify-between gap-6 rounded-[2.5rem] border border-slate-200/50 bg-white/80 p-8 shadow-2xl backdrop-blur-xl md:flex-row dark:border-white/10 dark:bg-[#000513]/80">
        <section className="flex items-center gap-4">
          <section className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-xl">
            <BarChartOutlined className="text-2xl" />
          </section>
          <section>
            <Title
              level={2}
              className="m-0! bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text font-black! tracking-tighter text-transparent! dark:from-white! dark:via-indigo-300! dark:to-white!"
            >
              Market Comparison
            </Title>
            <Text className="text-xs! font-bold! tracking-widest text-slate-400! uppercase">
              Analyze performance side-by-side
            </Text>
          </section>
        </section>

        <Select
          mode="multiple"
          placeholder={
            <span className="text-slate-400 dark:text-slate-500">
              <SearchOutlined className="mr-2" />
              Compare assets...
            </span>
          }
          className={`w-full rounded-2xl! bg-slate-100 transition-all duration-300 md:w-96! dark:bg-white/5! dark:text-white! ${isEmpty ? 'h-8!' : 'h-auto! min-h-11! py-1!'} [&_.ant-select-selector]:border-none! [&_.ant-select-selector]:bg-transparent! [&_.ant-select-selector]:shadow-none! ${isEmpty ? '[&_.ant-select-selector]:py-0!' : '[&_.ant-select-selector]:py-1!'} `}
          variant="borderless"
          value={selectedIds}
          onChange={setSelectedIds}
          maxTagCount="responsive"
          optionFilterProp="searchValue"
          options={coinOptions}
          popupClassName="dark:bg-[#0b0f1a]! dark:border dark:border-white/10! [&_.ant-select-item-option-selected]:bg-blue-600/20! [&_.ant-select-item-option-active]:bg-white/5!"
        />
      </section>

      <section className="overflow-hidden rounded-[2.5rem] border border-slate-200/50 bg-white shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#000513]/80">
        <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          pagination={false}
          scroll={{ x: 750 }}
          className="premium-table dark:[&_.ant-empty-description]:text-slate-500! dark:[&_.ant-table]:bg-transparent! dark:[&_.ant-table-cell]:border-white/5! dark:[&_.ant-table-cell]:bg-transparent! dark:[&_.ant-table-cell]:text-white! dark:[&_.ant-table-placeholder_.ant-table-cell]:bg-transparent! dark:[&_.ant-table-row:hover_td]:bg-white/5! dark:[&_.ant-table-thead_th]:bg-white/5! dark:[&_.ant-table-thead_th]:text-slate-400!"
        />
      </section>
    </section>
  );
};
