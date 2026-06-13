import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, GraduationCap, Clock, Award } from 'lucide-react';
import { usePathDetail, useEnroll } from '@/hooks/useLearningPaths';
import { useAuth } from '@/hooks/useAuth';
import { ModuleAccordion, CertificatePreviewCard } from '@/components/elearning/domain';
import { DownloadModuleSummaryButton } from '@/components/elearning/domain/ModuleSummaryPDF';
import { isPathInDevelopment } from '@/components/elearning/domain/PathRow';
import { MethodIcon, ELProgressBar } from '@/components/elearning/primitives';

// A module is summarisable when it has at least one reading step with slides.
function moduleHasReadingContent(mod) {
  return (mod?.steps || []).some(
    (s) => s?.kind === 'reading' && Array.isArray(s?.contentJson?.slides) && s.contentJson.slides.length > 0
  );
}

export default function LearningPathDetail() {
  const { code } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: path, isLoading, refetch } = usePathDetail(code);
  const enrollMutation = useEnroll();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-32 bg-slate-100 rounded animate-pulse" />
        <div className="h-32 bg-slate-100 rounded animate-pulse" />
        {[1,2,3,4].map((i) => <div key={i} className="h-16 bg-slate-100 rounded animate-pulse" />)}
      </div>
    );
  }

  if (!path) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-600 mb-4">Path tidak ditemukan.</p>
        <Link to="/e-learning" className="inline-flex items-center gap-2 text-orange-600 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Kembali ke Hub
        </Link>
      </div>
    );
  }

  const progress = path.enrollment?.completionPercent ?? 0;
  const inDevelopment = isPathInDevelopment(path);
  const onEnroll = async () => {
    if (!user) { navigate('/login'); return; }
    try {
      await enrollMutation.mutateAsync(code);
      await refetch();
      // jump to first step
      const firstModule = path.modules?.[0];
      const firstStep = firstModule?.steps?.[0];
      if (firstModule && firstStep) {
        navigate(`/e-learning/paths/${code}/modules/${firstModule.orderIndex}/steps/${firstStep.id}`);
      }
    } catch (e) {
      // toast handled by axios interceptor
    }
  };

  return (
    <div className="space-y-6">
      <Link to="/e-learning" className="inline-flex items-center gap-2 font-plexMono text-[11px] uppercase tracking-[0.1em] text-slate-500 hover:text-orange-600">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Learning Hub
      </Link>

      {/* Path hero */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 items-center" data-el-reveal="1">
        <MethodIcon method={path.method} size="lg" />
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="font-plexMono text-[11px] uppercase tracking-[0.1em] text-slate-500">
              NDT / {path.method} · {path.level}
            </div>
            {inDevelopment && (
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 font-plexMono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                Dalam pengembangan
              </span>
            )}
          </div>
          <h1 className="mt-1 text-[28px] sm:text-[36px] font-bold tracking-tight leading-tight">{path.title}</h1>
          <p className="mt-2 text-[14px] text-slate-600 max-w-[60ch]">{path.description}</p>

          <div className="mt-4 flex flex-wrap gap-5 text-[13px]">
            <div className="flex items-center gap-1.5 text-slate-700">
              <GraduationCap className="h-4 w-4 text-orange-600" />
              <span><b className="font-semibold">{path.totalModules}</b> modul</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <Clock className="h-4 w-4 text-orange-600" />
              <span>~<b className="font-semibold">{path.estHours}</b> jam</span>
            </div>
            {path.instructor && (
              <div className="flex items-center gap-1.5 text-slate-700">
                <Award className="h-4 w-4 text-orange-600" />
                <span>Instruktur: <b className="font-semibold">{path.instructor.username}</b></span>
              </div>
            )}
          </div>

          {path.isEnrolled && (
            <div className="mt-5 max-w-md">
              <ELProgressBar value={progress} showLabel label="Path progress" height="medium" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          {inDevelopment ? (
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-dashed border-slate-300 px-5 py-3 text-[14px] font-semibold text-slate-400 cursor-not-allowed"
            >
              Segera hadir
            </button>
          ) : !path.isEnrolled ? (
            <button
              type="button"
              onClick={onEnroll}
              disabled={enrollMutation.isPending}
              className="inline-flex items-center gap-2 rounded-md bg-orange-amber px-5 py-3 text-[14px] font-semibold text-white shadow-el-orange transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {enrollMutation.isPending ? 'Mendaftar…' : 'Enrol di path ini'} <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                const stepId = path.enrollment?.currentStepId;
                const moduleNumber = path.modules?.find((m) => m.id === path.enrollment?.currentModuleId)?.orderIndex
                  || path.modules?.[0]?.orderIndex;
                if (stepId) {
                  navigate(`/e-learning/paths/${code}/modules/${moduleNumber}/steps/${stepId}`);
                }
              }}
              className="inline-flex items-center gap-2 rounded-md bg-orange-amber px-5 py-3 text-[14px] font-semibold text-white shadow-el-orange transition-opacity hover:opacity-90"
            >
              Lanjutkan <ArrowRight className="h-4 w-4" />
            </button>
          )}
          <Link
            to="/e-learning"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 px-5 py-2.5 text-[13px] font-semibold text-slate-700 hover:bg-slate-50"
          >
            Lihat semua path
          </Link>
        </div>
      </section>

      {/* Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
        <section className="space-y-2.5" data-el-reveal="2">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-[18px] font-bold tracking-tight">Module Roadmap</h2>
            <div className="font-plexMono text-[11px] uppercase tracking-[0.1em] text-slate-500">
              {path.modules?.length || 0} MODULES
            </div>
          </div>
          {(path.modules || []).map((mod) => (
            <div key={mod.id}>
              <ModuleAccordion module={mod} pathCode={path.code} />
              {moduleHasReadingContent(mod) && (
                <div className="mt-1 flex justify-end px-1">
                  <DownloadModuleSummaryButton
                    module={mod}
                    pathCode={path.code}
                    pathTitle={path.title}
                    methodLabel={`${path.method} · ${path.level}`}
                  />
                </div>
              )}
            </div>
          ))}
          {(!path.modules || path.modules.length === 0) && (
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <p className="text-slate-600 font-medium">Konten path ini akan segera tersedia.</p>
            </div>
          )}
        </section>

        <aside className="space-y-4" data-el-reveal="3">
          {path.instructor && (
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="el-label text-orange-600 mb-3">◉ Instruktur</div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-orange-amber grid place-items-center text-white font-bold">
                  {(path.instructor.username || 'NDT').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold">{path.instructor.username}</div>
                  <div className="text-[11.5px] font-plexMono uppercase tracking-[0.08em] text-slate-500">ASNT L-III</div>
                </div>
              </div>
            </div>
          )}

          <CertificatePreviewCard
            pathCode={path.code}
            pathTitle={`${path.title} — Certificate`}
            userName={user?.username}
          />

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="el-label text-orange-600 mb-3">◉ Path Telemetry</div>
            <div className="space-y-2.5">
              <Row k="Completion" v={`${progress}%`} tone="orange" />
              <Row k="Total modules" v={path.totalModules} />
              <Row k="Est. duration" v={`~${path.estHours} jam`} />
              <Row k="Pass threshold" v="≥ 75%" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ k, v, tone }) {
  return (
    <div className="flex items-baseline justify-between text-[13px] py-1.5 border-b border-dashed border-slate-200 last:border-0">
      <span className="text-slate-500">{k}</span>
      <span className={`font-semibold tabular-nums ${tone === 'orange' ? 'text-orange-600' : 'text-slate-900'}`}>{v}</span>
    </div>
  );
}
