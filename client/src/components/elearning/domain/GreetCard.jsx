import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ELProgressBar } from '../primitives';

function getGreeting(date = new Date()) {
  const h = date.getHours();
  if (h < 11) return 'Selamat pagi';
  if (h < 15) return 'Selamat siang';
  if (h < 18) return 'Selamat sore';
  return 'Selamat malam';
}

export default function GreetCard({ user, summary, resumeEnrollment, className }) {
  const name = user?.username || 'Inspector';
  const hasResume = !!resumeEnrollment;
  const path = resumeEnrollment?.learningPath;
  const completionPercent = resumeEnrollment?.completionPercent ?? 0;

  return (
    <div className={cn(
      'relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 sm:p-7 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-7 items-center',
      className
    )}>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="text-[13px] text-slate-500 font-medium">
          {getGreeting()}, <span className="font-semibold text-slate-900">{name}</span>.
        </div>
        {hasResume ? (
          <h1 className="mt-1.5 text-[26px] sm:text-[30px] font-bold leading-[1.12] tracking-tight">
            Lanjutkan ke <em className="not-italic bg-orange-amber bg-clip-text text-transparent">Module {resumeEnrollment.currentModule?.orderIndex || '?'}</em>,<br className="hidden sm:block" />
            {' '}path {path?.code || ''}.
          </h1>
        ) : (
          <h1 className="mt-1.5 text-[26px] sm:text-[30px] font-bold leading-[1.12] tracking-tight">
            Pilih path pertama lo,<br className="hidden sm:block" />
            mulai belajar <em className="not-italic bg-orange-amber bg-clip-text text-transparent">NDT</em> hari ini.
          </h1>
        )}
        <p className="mt-2 text-[14px] text-slate-600 max-w-[52ch]">
          Kurikulum kamu terkalibrasi otomatis. Setiap step melacak progress dan menyimpannya untuk resume di perangkat lain.
        </p>

        {summary && (
          <div className="mt-5 flex flex-wrap gap-7">
            <Stat k="Streak" v={summary.streak ?? 0} unit="hari" />
            <Stat k="Steps done" v={summary.stepsDone ?? 0} />
            <Stat k="Quiz avg." v={summary.quizAverage ?? '—'} unit={summary.quizAverage ? '%' : ''} />
          </div>
        )}
      </div>

      {hasResume && (
        <div className="relative rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white">
          <div className="font-plexMono text-[10.5px] font-medium uppercase tracking-[0.12em] text-amber-400 flex items-center gap-1.5">
            <Play className="h-3 w-3 fill-current" />
            Resume — {path?.code || ''}
          </div>
          <h4 className="mt-1.5 text-[17px] font-bold tracking-tight">{path?.title?.replace(/ — .*$/, '') || 'Path'}</h4>
          <div className="mt-1 text-[13px] text-slate-300">
            Module {resumeEnrollment.currentModule?.orderIndex ?? '?'}
            {resumeEnrollment.currentStep && (
              <> · Step {resumeEnrollment.currentStep.orderIndex}</>
            )}
          </div>
          <div className="mt-3.5 h-1.5 bg-white/15 overflow-hidden rounded-full">
            <div className="h-full bg-orange-amber" style={{ width: `${completionPercent}%` }} />
          </div>
          <div className="mt-3.5 flex items-center justify-between">
            <div className="font-plexMono text-[12px] font-semibold text-amber-400">{completionPercent}% COMPLETE</div>
            <Link
              to={`/e-learning/paths/${path?.code}/modules/${resumeEnrollment.currentModule?.orderIndex || 1}/steps/${resumeEnrollment.currentStepId || ''}`}
              className="inline-flex items-center gap-2 rounded-md bg-orange-600 px-4 py-2.5 text-[13px] font-semibold transition-colors hover:bg-orange-700"
            >
              Lanjutkan <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}

      {!hasResume && (
        <div className="relative rounded-lg border-2 border-dashed border-slate-200 p-6 text-center bg-slate-50">
          <div className="font-plexMono text-[10.5px] font-medium uppercase tracking-[0.12em] text-slate-500 mb-2">No active path</div>
          <p className="text-[13.5px] text-slate-600 mb-4">Pilih salah satu method dari panel di bawah untuk memulai.</p>
          <Link to="#paths" className="inline-flex items-center gap-2 rounded-md bg-orange-amber px-4 py-2.5 text-[13px] font-semibold text-white shadow-el-orange hover:opacity-90">
            Pilih path <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}

function Stat({ k, v, unit }) {
  return (
    <div>
      <div className="font-plexMono text-[10.5px] font-medium uppercase tracking-[0.1em] text-slate-500">{k}</div>
      <div className="mt-0.5 text-[24px] font-bold tracking-tight">
        {v}{unit && <span className="text-sm font-medium text-slate-500 ml-1">{unit}</span>}
      </div>
    </div>
  );
}
