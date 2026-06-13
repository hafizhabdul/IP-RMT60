import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatusBadge } from '../primitives';
import StepListItem from './StepListItem';

export default function ModuleAccordion({ module, pathCode, defaultOpen = false, className }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(defaultOpen);
  const status = module.progressStatus || (module.locked ? 'locked' : 'available');
  const finalAssessment = !!module.isFinalAssessment;

  const numColor = status === 'done' ? 'bg-emerald-500 text-white'
    : status === 'in_progress' ? 'bg-orange-amber text-white'
    : status === 'locked' ? 'bg-slate-100 text-slate-400'
    : 'bg-slate-100 text-slate-500';

  return (
    <div className={cn(
      'rounded-lg border bg-white transition-colors',
      status === 'locked' ? 'border-slate-200' : 'border-slate-200 hover:border-slate-300',
      className
    )}>
      <button
        type="button"
        onClick={() => !module.locked && setOpen((o) => !o)}
        className={cn(
          'w-full grid grid-cols-[44px_1fr_auto_auto] items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 text-left',
          module.locked && 'cursor-not-allowed'
        )}
        aria-expanded={open}
        title={module.locked ? 'Selesaikan modul sebelumnya untuk membuka' : undefined}
        aria-label={module.locked ? `${module.title} — terkunci. Selesaikan modul sebelumnya untuk membuka.` : undefined}
      >
        <span className={cn(
          'inline-grid h-8 w-8 place-items-center rounded-full font-plexMono text-[13px] font-semibold tabular-nums',
          numColor
        )}>
          {finalAssessment ? 'Σ' : module.orderIndex}
        </span>

        <div className="min-w-0">
          <div className={cn('text-[15px] font-semibold leading-tight', status === 'locked' ? 'text-slate-400' : 'text-slate-900')}>
            {module.title}
            {module.locked && <Lock className="inline-block ml-1.5 h-3.5 w-3.5 text-slate-400" />}
          </div>
          <div className="mt-0.5 font-plexMono text-[11px] text-slate-500 tracking-[0.06em]">
            {module.steps?.length || 0} STEP · {module.estMinutes} MIN
            {finalAssessment && module.passingScore && <> · MIN. {module.passingScore}%</>}
          </div>
        </div>

        <StatusBadge status={status} className="hidden sm:inline-flex" />

        <ChevronDown className={cn(
          'h-4 w-4 text-slate-400 transition-transform',
          open && 'rotate-180'
        )} />
      </button>

      {open && !module.locked && module.steps && module.steps.length > 0 && (
        <div className="border-t border-slate-100 px-3 sm:px-5 py-2">
          {module.steps.map((step, idx) => (
            <StepListItem
              key={step.id}
              step={{ ...step, subIndex: idx + 1, orderIndex: module.orderIndex }}
              current={module.progressStatus === 'in_progress' && step.progressStatus === 'in_progress'}
              onClick={() => navigate(`/e-learning/paths/${pathCode}/modules/${module.orderIndex}/steps/${step.id}`)}
            />
          ))}
        </div>
      )}

      {open && module.steps && module.steps.length === 0 && !module.locked && (
        <div className="border-t border-slate-100 px-5 py-4 text-center text-[13px] text-slate-500">
          Konten modul ini akan segera tersedia.
        </div>
      )}
    </div>
  );
}
