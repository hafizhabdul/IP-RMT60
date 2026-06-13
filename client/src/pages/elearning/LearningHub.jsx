import { Flame, BookOpen, Clock, Trophy, Award } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useMyProgress } from '@/hooks/useProgress';
import { useMyCertificates } from '@/hooks/useCertificates';
import { useLearningPaths, usePathDetail } from '@/hooks/useLearningPaths';
import {
  KPICard,
  PathRow,
  GreetCard,
  ActivityStream,
  CertificatePreviewCard,
  ModuleAccordion,
} from '@/components/elearning/domain';

function formatHours(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

export default function LearningHub() {
  const { user } = useAuth();
  const { data: paths = [], isLoading: pathsLoading } = useLearningPaths();
  const { data: progress } = useMyProgress({ enabled: !!user });
  const { data: certificates = [] } = useMyCertificates({ enabled: !!user });
  const certificatesCount = certificates.length;

  const summary = progress?.summary || {};
  const enrollments = progress?.enrollments || [];
  const activity = progress?.activity || [];

  // Prefer an in-progress enrollment that has a resolvable resume target,
  // then any active enrollment, then any enrollment at all.
  const activeEnrollment =
    enrollments.find((e) => e.status === 'active' && e.resume) ||
    enrollments.find((e) => e.status === 'active') ||
    enrollments.find((e) => e.resume) ||
    enrollments[0];
  const activePath = activeEnrollment?.learningPath;

  return (
    <div className="space-y-6 sm:space-y-7">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 sm:items-center sm:justify-between" data-el-reveal="1">
        <div>
          <div className="font-plexMono text-[11px] uppercase tracking-[0.12em] text-slate-500">SNS NDT / E-Learning / Learning Hub</div>
          <div className="mt-1 font-plexMono text-[10px] uppercase tracking-[0.14em] text-slate-400 tabular-nums">
            {new Date().toISOString().slice(0, 10)} · {paths.length} paths total
          </div>
        </div>
        {certificatesCount > 0 && (
          <div className="flex items-center gap-2 rounded-md border border-orange-200 bg-orange-50 px-3 py-2 text-[13px] font-semibold text-orange-700">
            <Award className="h-4 w-4" />
            <span className="tabular-nums">{certificatesCount}</span>
            <span className="font-normal text-orange-600">sertifikat diraih</span>
          </div>
        )}
      </div>

      <div data-el-reveal="2">
        <GreetCard
          user={user}
          summary={summary}
          resumeEnrollment={activeEnrollment ? {
            ...activeEnrollment,
            learningPath: activePath,
          } : null}
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" data-el-reveal="3">
        <KPICard
          label="Paths Enrolled"
          value={summary.enrollmentsCount ?? 0}
          unit={`/ ${paths.length || 6}`}
          delta={enrollments.length > 0 ? 'Active learner' : 'Pilih path pertama'}
          icon={<BookOpen className="h-3 w-3" />}
        />
        <KPICard
          label="Modules Done"
          value={summary.modulesDone ?? 0}
          delta={summary.modulesDone ? `${summary.stepsDone} steps total` : 'Mulai dari Module 1'}
          icon={<BookOpen className="h-3 w-3" />}
        />
        <KPICard
          label="Time on Task"
          value={summary.totalTimeSeconds ? formatHours(summary.totalTimeSeconds) : '0h'}
          delta="—"
          deltaTone="neutral"
          icon={<Clock className="h-3 w-3" />}
        />
        <KPICard
          label="Streak"
          value={summary.streak ?? 0}
          unit="days"
          delta={summary.streak > 0 ? 'Keep it up!' : 'Mulai streak hari ini'}
          accent
          icon={<Flame className="h-3 w-3" />}
        />
      </div>

      {/* Paths Panel */}
      <section className="rounded-xl border border-slate-200 bg-white overflow-hidden" data-el-reveal="4">
        <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="text-[17px] font-bold tracking-tight">Learning Paths</h3>
            <p className="text-[12.5px] text-slate-500 mt-0.5">6 metode · 3 level — terkalibrasi ASNT SNT-TC-1A</p>
          </div>
          <div className="font-plexMono text-[11px] uppercase tracking-[0.1em] text-slate-500 tabular-nums">
            {paths.length} TOTAL · {enrollments.length} ACTIVE
          </div>
        </div>

        {pathsLoading ? (
          <div className="p-6 space-y-3">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="h-16 rounded bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : paths.length === 0 ? (
          <div className="p-12 text-center">
            <Trophy className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">Belum ada learning path tersedia.</p>
          </div>
        ) : (
          <div>
            {paths.map((p) => (
              <PathRow key={p.code} path={p} />
            ))}
          </div>
        )}
      </section>

      {/* Bottom: roadmap + activity */}
      {activePath && (
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-5">
          <ActivePathRoadmap pathCode={activePath.code} />
          <div className="space-y-5">
            <ActivityStream items={activity} />
            <CertificatePreviewCard
              pathCode={activePath.code}
              pathTitle={`${activePath.title} — Certificate`}
              userName={user?.username}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ActivePathRoadmap({ pathCode }) {
  const { data: path, isLoading } = usePathDetail(pathCode);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
        <div className="h-6 bg-slate-100 rounded animate-pulse w-1/2" />
        {[1,2,3,4].map((i) => <div key={i} className="h-14 bg-slate-100 rounded animate-pulse" />)}
      </div>
    );
  }

  if (!path) return null;

  return (
    <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h3 className="text-[17px] font-bold tracking-tight">{path.title} · Module Roadmap</h3>
          <p className="text-[12.5px] text-slate-500 mt-0.5">Progres modul-by-modul</p>
        </div>
        <div className="font-plexMono text-[11px] uppercase tracking-[0.08em] text-slate-500">
          {path.modules?.length || 0} MODULES · ~{path.estHours}H
        </div>
      </div>
      <div className="p-3 space-y-2">
        {(path.modules || []).slice(0, 6).map((mod) => (
          <ModuleAccordion key={mod.id} module={mod} pathCode={path.code} />
        ))}
      </div>
    </section>
  );
}

