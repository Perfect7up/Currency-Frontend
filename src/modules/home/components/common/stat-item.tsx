import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { AnimatedChart } from './animated-chart';
import type { StatItemProps } from '../../types/types';

export function StatItem({ label, value, change }: StatItemProps) {
  const hasChange = change !== undefined && change !== null;
  const isPositive = !hasChange || change >= 0;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50 dark:border-slate-800/60! dark:bg-slate-900/40! dark:hover:border-blue-600/40! dark:hover:shadow-blue-500/10!">
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-500/5 blur-3xl transition-all duration-500 group-hover:bg-blue-500/10 dark:bg-blue-500/10!"></div>
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400!">
              {label}
            </span>
            {hasChange && (
              <span
                className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${
                  isPositive
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10! dark:text-emerald-400!'
                    : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10! dark:text-rose-400!'
                }`}
              >
                {isPositive ? <CaretUpOutlined /> : <CaretDownOutlined />}
                {Math.abs(change).toFixed(2)}%
              </span>
            )}
          </div>
          <div className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white!">
            {value ?? '--'}
          </div>
        </div>
        <AnimatedChart isPositive={isPositive} />
      </div>
    </div>
  );
}
