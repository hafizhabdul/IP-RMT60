import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Search, Check, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CourseSidebar({ pathDetail, currentStepId, className }) {
  const navigate = useNavigate();
  const path = pathDetail;
  if (!path) return null;

  return (
    <aside className={cn(
      'el-scroll flex flex-col bg-gradient-to-b from-orange-600 to-orange-700 text-white overflow-hidden',
      className
    )}>
      <div className="flex justify-end px-5 pt-3.5 pb-1">
        <button className="rounded-full p-2 transition-colors hover:bg-black/10" aria-label="Search">
          <Search className="h-4 w-4" />
        </button>
      </div>

      <div className="px-5 pb-4">
        <h1 className="text-[28px] font-bold leading-[1.12] tracking-tight">{path.title.replace(/ — .*$/, '')}</h1>
        <div className="mt-1 font-plexMono text-[11px] tracking-[0.1em] text-white/80 uppercase">
          {path.code} · {path.level}
        </div>
      </div>

      <div className="px-5 pb-4 border-b border-white/15">
        <div className="h-1 bg-white/25 overflow-hidden">
          <div className="h-full bg-white" style={{ width: `${path.enrollment?.completionPercent ?? 0}%` }} />
        </div>
        <div className="mt-2 font-plexMono text-[11px] font-semibold uppercase tracking-[0.1em]">
          {path.enrollment?.completionPercent ?? 0}% COMPLETE
        </div>
      </div>

      <div className="el-scroll flex-1 overflow-y-auto">
        {path.modules?.map((mod) => (
          <SidebarSection
            key={mod.id}
            module={mod}
            pathCode={path.code}
            currentStepId={currentStepId}
            onNavigate={(stepId) => navigate(`/e-learning/paths/${path.code}/modules/${mod.orderIndex}/steps/${stepId}`)}
          />
        ))}
      </div>
    </aside>
  );
}

function SidebarSection({ module, pathCode, currentStepId, onNavigate }) {
  // Default open if module is current
  const hasCurrent = module.steps?.some((s) => String(s.id) === String(currentStepId));
  const [open, setOpen] = useState(hasCurrent || module.progressStatus === 'in_progress');
  const locked = !!module.locked;

  return (
    <div className="border-b border-white/12">
      <button
        type="button"
        onClick={() => !locked && setOpen((o) => !o)}
        className="w-full grid grid-cols-[20px_1fr] gap-2 items-center px-5 py-4 font-plexMono text-[12.5px] font-semibold tracking-[0.08em] uppercase text-left transition-colors hover:bg-black/8 disabled:cursor-not-allowed"
        disabled={locked}
        aria-expanded={open}
      >
        <ChevronDown className={cn('h-3 w-3 transition-transform', open ? 'rotate-0' : '-rotate-90')} />
        <span className="truncate">
          {module.isFinalAssessment ? 'Σ Final Assessment' : `Module ${module.orderIndex}: ${module.title}`}
        </span>
      </button>

      {open && !locked && (
        <div className="pb-2">
          {module.steps && module.steps.length > 0 ? (
            module.steps.map((step) => {
              const done = step.progressStatus === 'done';
              const current = String(step.id) === String(currentStepId);

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => onNavigate(step.id)}
                  className={cn(
                    'w-full grid grid-cols-[20px_1fr_22px] items-center gap-3 pl-9 pr-5 py-2.5 text-[13.5px] text-left text-white/92 border-l-[3px] border-transparent transition-colors hover:bg-black/8',
                    current && 'border-l-white bg-black/15 font-semibold'
                  )}
                >
                  <span className="font-plexMono text-[10px] uppercase tracking-[0.04em] opacity-70">≡</span>
                  <span className="truncate">
                    <span className="opacity-70 mr-1">{module.orderIndex}.{step.orderIndex}</span>
                    {step.title}
                  </span>
                  <span className={cn(
                    'inline-grid h-[22px] w-[22px] place-items-center rounded-full text-[10.5px] font-bold',
                    done && 'bg-white text-orange-700',
                    !done && current && 'border-2 border-white bg-transparent',
                    !done && !current && 'border-2 border-white/35 bg-white/10'
                  )}>
                    {done && <Check className="h-3 w-3" strokeWidth={3} />}
                    {!done && current && (
                      <span className="block h-2 w-2 rounded-full bg-white animate-pulse" />
                    )}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="px-9 py-2 text-[13px] text-white/65 italic">Coming soon</div>
          )}
        </div>
      )}

      {locked && (
        <div className="grid grid-cols-[20px_1fr] gap-3 items-center pl-9 pr-5 py-2.5 text-[13px] text-white/60">
          <Lock className="h-3.5 w-3.5" />
          <span>Complete previous module to unlock</span>
        </div>
      )}
    </div>
  );
}
