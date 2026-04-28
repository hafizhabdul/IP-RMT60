import { cn } from '@/lib/utils';

export default function ELProgressBar({ value = 0, className, showLabel = false, label, height = 'thin' }) {
  const safeValue = Math.max(0, Math.min(100, Math.round(value)));
  const heightClass = height === 'thick' ? 'h-2' : height === 'medium' ? 'h-1.5' : 'h-1';

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="mb-2 flex items-baseline justify-between text-[11px] font-plexMono uppercase tracking-[0.08em] text-slate-500">
          <span>{label || 'Progress'}</span>
          <span className="font-semibold text-slate-900">{safeValue}%</span>
        </div>
      )}
      <div
        className={cn('relative overflow-hidden bg-slate-200', heightClass)}
        role="progressbar"
        aria-valuenow={safeValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-orange-amber transition-[width] duration-500 ease-out"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
