export function AnimatedChart({ isPositive }: { isPositive: boolean }) {
  const gradientId = `gradient-${isPositive ? 'positive' : 'negative'}`;

  return (
    <div className="relative h-16 w-20 overflow-hidden rounded-xl bg-linear-to-br from-slate-50 to-slate-100 p-3 dark:from-slate-800/50! dark:to-slate-900/50!">
      <svg width="100%" height="100%" viewBox="0 0 60 40" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isPositive ? '#10b981' : '#f43f5e'} stopOpacity="0.3" />
            <stop offset="100%" stopColor={isPositive ? '#10b981' : '#f43f5e'} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={
            isPositive
              ? 'M0 35 L12 28 L24 30 L36 18 L48 22 L60 10 L60 40 L0 40 Z'
              : 'M0 10 L12 20 L24 15 L36 30 L48 25 L60 35 L60 40 L0 40 Z'
          }
          fill={`url(#${gradientId})`}
        />
        <path
          d={
            isPositive
              ? 'M0 35 L12 28 L24 30 L36 18 L48 22 L60 10'
              : 'M0 10 L12 20 L24 15 L36 30 L48 25 L60 35'
          }
          stroke={isPositive ? '#10b981' : '#f43f5e'}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
