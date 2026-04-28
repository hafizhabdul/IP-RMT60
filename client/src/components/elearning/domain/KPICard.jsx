import { cn } from '@/lib/utils';

export default function KPICard({ label, value, unit, delta, deltaTone = 'good', accent = false, icon, className }) {
  const deltaColor = {
    good: 'text-emerald-600',
    bad: 'text-rose-600',
    neutral: 'text-slate-500',
  }[deltaTone] || 'text-slate-500';

  if (accent) {
    return (
      <div className={cn(
        'rounded-lg p-4 sm:p-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden',
        className
      )}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative">
          <div className="font-plexMono text-[10.5px] font-medium uppercase tracking-[0.12em] text-amber-400 flex items-center gap-1.5">
            {icon && <span>{icon}</span>}
            {label}
          </div>
          <div className="mt-1 text-[26px] font-bold leading-tight tracking-tight">
            {value}
            {unit && <span className="text-sm font-medium text-slate-300 ml-1">{unit}</span>}
          </div>
          {delta && <div className="mt-0.5 text-[11.5px] text-slate-300 font-medium">{delta}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'rounded-lg border border-slate-200 bg-white p-4 sm:p-5',
      className
    )}>
      <div className="font-plexMono text-[10.5px] font-medium uppercase tracking-[0.1em] text-slate-500 flex items-center gap-1.5">
        {icon && <span>{icon}</span>}
        {label}
      </div>
      <div className="mt-1 text-[26px] font-bold leading-tight tracking-tight text-slate-900">
        {value}
        {unit && <span className="text-sm font-medium text-slate-500 ml-1">{unit}</span>}
      </div>
      {delta && <div className={cn('mt-0.5 text-[11.5px] font-medium', deltaColor)}>{delta}</div>}
    </div>
  );
}
