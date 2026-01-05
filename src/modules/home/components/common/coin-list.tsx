import { Skeleton, Button } from 'antd';
import { WarningOutlined, ReloadOutlined } from '@ant-design/icons';
import { CoinCard } from './coin-card';
import type { Coin } from '../../types/types';

interface CoinListProps {
  title: string;
  items?: Coin[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  icon: React.ComponentType<{ style?: React.CSSProperties }>;
  iconColor: string;
}

export function CoinList({
  title,
  items,
  isLoading,
  isError,
  onRetry,
  icon: Icon,
  iconColor,
}: CoinListProps) {
  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white p-6 dark:border-slate-800/60! dark:bg-slate-900/40!">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-500/10! dark:to-blue-600/10!">
            <Icon style={{ fontSize: '20px', color: iconColor }} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white!">{title}</h3>
        </div>
        {!isError && (
          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800/50!">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></div>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400!">Live</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <Skeleton active paragraph={{ rows: 5 }} title={false} />
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <WarningOutlined className="mb-3 text-3xl text-slate-300" />
            <p className="mb-4 text-sm font-medium text-slate-500">
              Failed to load {title.toLowerCase()}
            </p>
            <Button size="small" icon={<ReloadOutlined />} onClick={onRetry} className="rounded-lg">
              Retry
            </Button>
          </div>
        ) : (
          items
            ?.slice(0, 5)
            .map((item, index) => <CoinCard key={item.id} coin={item} rank={index + 1} />)
        )}
      </div>
    </div>
  );
}
