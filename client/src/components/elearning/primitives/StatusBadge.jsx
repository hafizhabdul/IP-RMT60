import { cn } from '@/lib/utils';

const variantClasses = {
  done: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  active: 'bg-orange-100 text-orange-700 border-orange-200',
  current: 'bg-orange-100 text-orange-700 border-orange-200',
  in_progress: 'bg-orange-100 text-orange-700 border-orange-200',
  available: 'bg-slate-100 text-slate-700 border-slate-200',
  not_started: 'bg-slate-100 text-slate-700 border-slate-200',
  locked: 'bg-slate-50 text-slate-400 border-slate-200 border-dashed',
};

const labels = {
  done: 'Complete',
  active: 'In Progress',
  current: 'In Progress',
  in_progress: 'In Progress',
  available: 'Available',
  not_started: 'Available',
  locked: 'Locked',
};

export default function StatusBadge({ status = 'available', children, className }) {
  const variant = variantClasses[status] || variantClasses.available;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-plexMono text-[10.5px] font-semibold uppercase tracking-[0.08em]',
        variant,
        className
      )}
    >
      {children || labels[status] || status}
    </span>
  );
}
