import { cn } from '@/lib/utils';
import { Check, Lock } from 'lucide-react';

const kindStyles = {
  animated: 'bg-orange-100 text-orange-700',
  reading: 'bg-slate-100 text-slate-700',
  quiz: 'bg-slate-900 text-white',
};

const kindLabels = {
  animated: 'Animated',
  reading: 'Reading',
  quiz: 'Assessment',
};

export default function StepListItem({ step, current, locked, onClick, className }) {
  const status = step.progressStatus || 'not_started';
  const done = status === 'done';
  const inProgress = current || status === 'in_progress';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={locked}
      className={cn(
        'group w-full grid grid-cols-[20px_1fr_auto_auto] items-center gap-3 sm:gap-4 px-1.5 py-2.5 text-left text-[13.5px] border-b border-slate-100 last:border-0',
        !locked && 'hover:bg-slate-50',
        inProgress && 'bg-orange-50/50',
        locked && 'opacity-60 cursor-not-allowed',
        className
      )}
    >
      <span className={cn(
        'inline-grid h-[18px] w-[18px] place-items-center rounded-full text-[10px] font-semibold',
        done && 'bg-emerald-500 text-white',
        inProgress && !done && 'bg-orange-500 text-white',
        !done && !inProgress && !locked && 'border border-slate-300 text-transparent',
        locked && 'border border-dashed border-slate-300 text-slate-400'
      )}>
        {done && <Check className="h-3 w-3" strokeWidth={3} />}
        {inProgress && !done && '▶'}
        {locked && <Lock className="h-2.5 w-2.5" />}
      </span>

      <span className={cn(
        'truncate',
        inProgress && 'font-semibold text-slate-900',
        !inProgress && !locked && 'text-slate-700',
        locked && 'text-slate-400'
      )}>
        <span className="font-plexMono text-[11.5px] text-slate-500 mr-2">{step.orderIndex}.{step.subIndex || ''}</span>
        {step.title}
      </span>

      <span className={cn(
        'rounded px-2 py-0.5 font-plexMono text-[10px] font-semibold uppercase tracking-[0.08em]',
        kindStyles[step.kind] || kindStyles.reading
      )}>
        {kindLabels[step.kind] || step.kind}
      </span>

      <span className="hidden sm:inline-block font-plexMono text-[11px] text-slate-500 tabular-nums">
        {Math.floor((step.durationSeconds || 0) / 60)}:{String((step.durationSeconds || 0) % 60).padStart(2, '0')}
      </span>
    </button>
  );
}
