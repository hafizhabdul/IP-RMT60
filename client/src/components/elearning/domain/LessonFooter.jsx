import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LessonFooter({
  prevStep,
  nextStep,
  totalSteps,
  currentIndex,
  moduleNumber,
  onPrev,
  onNext,
  isCompleting,
  className,
}) {
  const dots = Array.from({ length: totalSteps || 0 });

  return (
    <footer className={cn(
      'border-t border-slate-200 bg-slate-50 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-5 items-center px-6 sm:px-12 py-6',
      className
    )}>
      <button
        type="button"
        onClick={onPrev}
        disabled={!prevStep || isCompleting}
        className="inline-flex items-center gap-3 text-left text-slate-700 transition-colors hover:text-orange-600 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>
          <span className="block font-plexMono text-[11px] tracking-[0.1em] uppercase text-slate-400">
            {prevStep ? `Previous · Step ${prevStep.orderIndex}` : 'No previous'}
          </span>
          <span className="block text-[14px] font-semibold text-slate-900 truncate max-w-[28ch]">
            {prevStep?.title || '—'}
          </span>
        </span>
      </button>

      <div className="flex flex-col items-center gap-1.5 font-plexMono text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
        <div className="flex gap-1.5">
          {dots.map((_, i) => (
            <span
              key={i}
              className={cn(
                'h-1 w-6',
                i < currentIndex && 'bg-orange-600',
                i === currentIndex && 'bg-orange-500 ring-2 ring-orange-200',
                i > currentIndex && 'bg-slate-200'
              )}
            />
          ))}
        </div>
        <span>Step {currentIndex + 1} / {totalSteps} · Module {moduleNumber}</span>
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={isCompleting}
        className="inline-flex items-center justify-end gap-3 text-right transition-colors disabled:opacity-60 disabled:cursor-wait"
      >
        <span>
          <span className="block font-plexMono text-[11px] tracking-[0.1em] uppercase text-white/75">
            {nextStep ? `Next · Step ${nextStep.orderIndex}` : 'Complete module'}
          </span>
          <span className="block text-[14px] font-semibold text-white truncate max-w-[28ch]">
            {nextStep?.title || 'Finish'}
          </span>
        </span>
        <span className="inline-flex items-center justify-center h-12 w-12 bg-orange-600 text-white transition-colors hover:bg-orange-700">
          <ArrowRight className="h-5 w-5" />
        </span>
      </button>
    </footer>
  );
}
