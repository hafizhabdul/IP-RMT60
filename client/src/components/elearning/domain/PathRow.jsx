import { Link } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MethodIcon, StatusBadge, ELProgressBar } from '../primitives';

export default function PathRow({ path, className, active = false }) {
  const enrollment = path.enrollment;
  const isLocked = !!path.prerequisite && !path.isEnrolled && path.prerequisite?.code;
  const lockedHardcoded = path.code === 'ET-L1' && !path.isEnrolled; // matches the seed prerequisite
  const isInProgress = enrollment && enrollment.status === 'active' && enrollment.completionPercent > 0;
  const isCompleted = enrollment && enrollment.status === 'completed';
  let status = 'available';
  if (isLocked || lockedHardcoded) status = 'locked';
  else if (isCompleted) status = 'done';
  else if (isInProgress) status = 'in_progress';

  const cta = isInProgress ? 'Lanjutkan' : isCompleted ? 'Lihat ulang' : status === 'locked' ? 'Lihat' : 'Mulai';

  // Extract level number for L1/L2/L3 display
  const levelNumber = path.level === 'Level I' ? 1 : path.level === 'Level II' ? 2 : 3;

  return (
    <Link
      to={`/e-learning/paths/${path.code}`}
      className={cn(
        'group grid grid-cols-[60px_1fr_auto] sm:grid-cols-[80px_1.3fr_100px_1fr_120px_140px] items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 transition-colors hover:bg-slate-50 border-b border-slate-100 last:border-b-0',
        active && 'bg-slate-50',
        className
      )}
    >
      <MethodIcon method={path.method} size="md" locked={status === 'locked'} className="rounded-lg sm:h-[60px] sm:w-[60px] sm:text-lg" />

      <div className="min-w-0">
        <div className="font-plexMono text-[10.5px] font-medium uppercase tracking-[0.08em] text-slate-500">
          NDT / {path.method} · {path.level}
        </div>
        <div className="mt-0.5 truncate text-[15px] font-semibold text-slate-900">
          {path.title.replace(/ — .*$/, '')}
          {status === 'locked' && <Lock className="inline-block ml-1.5 h-3.5 w-3.5 text-slate-400" />}
        </div>
        <div className="mt-0.5 truncate text-[12.5px] text-slate-500 line-clamp-1 hidden sm:block">{path.description}</div>
      </div>

      <div className="hidden sm:flex justify-center">
        <StatusBadge status={status} />
      </div>

      <div className="hidden sm:block min-w-0">
        <div className="flex justify-between font-plexMono text-[11px] text-slate-500">
          <span>{path.totalModules} modul</span>
          <span className="font-semibold text-slate-900">
            {enrollment?.completionPercent ?? 0}%
          </span>
        </div>
        <ELProgressBar value={enrollment?.completionPercent ?? 0} className="mt-1.5" />
      </div>

      <div className="hidden sm:flex gap-1">
        {[1, 2, 3].map((lv) => {
          const isActiveLevel = lv === levelNumber;
          return (
            <div
              key={lv}
              className={cn(
                'flex-1 rounded px-2 py-1 text-center font-plexMono text-[10px] font-semibold',
                isActiveLevel && status === 'in_progress' && 'bg-orange-600 text-white',
                isActiveLevel && status === 'done' && 'bg-emerald-500 text-white',
                isActiveLevel && status === 'available' && 'bg-slate-100 text-slate-700',
                isActiveLevel && status === 'locked' && 'el-locked-stripes text-slate-400',
                !isActiveLevel && 'bg-slate-100 text-slate-400 el-locked-stripes',
              )}
            >
              L{lv}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-2 text-[12.5px] font-semibold text-slate-700 transition-all group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white sm:justify-center">
        {cta}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
