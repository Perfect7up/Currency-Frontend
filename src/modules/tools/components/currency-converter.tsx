import { useState } from 'react';
import { Typography, InputNumber, Select, Skeleton } from 'antd';
import { SwapOutlined, ArrowRightOutlined, SyncOutlined } from '@ant-design/icons';
import { useConvert } from '../hooks/use-tools';
import { ASSET_OPTIONS, FIAT_OPTIONS } from '../constants/converter-options';

const { Text, Title } = Typography;

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromAsset, setFromAsset] = useState('bitcoin');
  const [toCurrency, setToCurrency] = useState('usd');

  const { data, isLoading, isFetching } = useConvert(fromAsset, toCurrency, amount);

  const assetOptions = ASSET_OPTIONS.map((asset) => ({
    value: asset.value,
    label: (
      <section className="flex items-center justify-between gap-2">
        <span className="font-medium text-slate-900 dark:text-slate-100">{asset.label}</span>
        <Text className="text-[10px]! uppercase opacity-40 dark:text-white!">{asset.symbol}</Text>
      </section>
    ),
  }));

  const currencyOptions = FIAT_OPTIONS.map((fiat) => ({
    value: fiat.value,
    label: `${fiat.label} (${fiat.symbol})`,
  }));

  return (
    <section className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-[2.5rem] border border-slate-200/50 bg-white p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 md:p-12 dark:border-white/10 dark:bg-[#000513]/80">
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px] dark:bg-indigo-500/15" />

      <section className="relative z-10">
        <header className="mb-10 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <section>
            <section className="mb-3 flex items-center gap-2">
              <section className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600/10 dark:bg-indigo-400/10">
                <SyncOutlined
                  spin={isFetching}
                  className="text-[10px] text-blue-600 dark:text-indigo-400"
                />
              </section>
              <Text className="text-[10px]! tracking-[0.2em] text-blue-600! uppercase dark:text-indigo-400!">
                Institutional Converter
              </Text>
            </section>
            <Title
              level={2}
              className="m-0! bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text font-black! tracking-tighter text-transparent! dark:from-white! dark:via-indigo-300! dark:to-white!"
            >
              Exchange Calculator
            </Title>
          </section>

          <section className="rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-2 dark:border-white/5 dark:bg-white/5">
            <Text className="text-xs! font-bold text-slate-500! dark:text-slate-400">
              Uptime: <span className="text-emerald-500">99.9% Live</span>
            </Text>
          </section>
        </header>

        <section className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <section className="flex flex-col gap-3">
            <Text className="ml-1 text-[11px]! font-bold! tracking-widest text-slate-400! uppercase">
              Input Amount
            </Text>
            <section className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 transition-all focus-within:border-blue-500 focus-within:bg-white dark:border-white/10 dark:bg-white/5 dark:focus-within:border-indigo-500 dark:focus-within:bg-white/10">
              <InputNumber
                variant="borderless"
                size="large"
                value={amount}
                onChange={(val) => setAmount(val || 0)}
                className="w-full! text-3xl! font-black! text-slate-900! dark:text-white!"
                placeholder="0.00"
              />
              <Select
                showSearch
                variant="borderless"
                size="large"
                value={fromAsset}
                onChange={setFromAsset}
                className="mt-4! h-12! w-full! rounded-2xl! bg-white! font-bold! text-slate-900! shadow-sm dark:bg-[#000513]! dark:text-white!"
                popupClassName="dark:bg-slate-900 dark:text-white"
                options={assetOptions}
              />
            </section>
          </section>

          <section className="flex justify-center lg:pt-8">
            <section className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-2xl transition-transform hover:rotate-180 dark:bg-white dark:text-slate-900">
              <SwapOutlined className="text-2xl" />
            </section>
          </section>

          <section className="relative flex flex-col gap-3">
            <Text className="ml-1 text-[11px]! font-bold! tracking-widest text-slate-400! uppercase">
              Estimated Result
            </Text>
            <section className="rounded-3xl border border-blue-100 bg-blue-50/30 p-6 dark:border-indigo-500/20 dark:bg-indigo-500/5">
              {isLoading ? (
                <section className="py-2">
                  <Skeleton.Button active block className="h-10! rounded-lg! opacity-20" />
                </section>
              ) : (
                <section className="flex h-10 items-center">
                  <Text className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-4xl! font-black! tracking-tighter text-transparent! dark:from-indigo-400 dark:to-cyan-400">
                    {data?.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </Text>
                </section>
              )}

              <Select
                variant="borderless"
                size="large"
                value={toCurrency}
                onChange={setToCurrency}
                className="mt-4! h-12! w-full! rounded-2xl! bg-white/80! font-bold! text-slate-900! shadow-sm dark:bg-[#000513]! dark:text-white!"
                popupClassName="dark:bg-slate-900 dark:text-white"
                options={currencyOptions}
              />
            </section>
          </section>
        </section>

        <footer className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-slate-100 pt-8 dark:border-white/5">
          <section className="flex items-center gap-6">
            <section className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
              <Text className="text-xs! font-bold! tracking-widest text-slate-500 uppercase dark:text-slate-400!">
                No Hidden Fees
              </Text>
            </section>
            <section className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
              <Text className="text-xs! font-bold! tracking-widest text-slate-500 uppercase dark:text-slate-400!">
                Live API Sync
              </Text>
            </section>
          </section>

          <section className="group flex cursor-pointer items-center gap-2 text-slate-400 transition-colors hover:text-blue-600 dark:hover:text-indigo-400">
            <Text className="text-sm! font-black! text-inherit dark:text-slate-400! group-hover:dark:text-indigo-400!">
              DETAILED MARKET ANALYTICS
            </Text>
            <ArrowRightOutlined className="text-xs transition-transform group-hover:translate-x-1" />
          </section>
        </footer>
      </section>
    </section>
  );
};
