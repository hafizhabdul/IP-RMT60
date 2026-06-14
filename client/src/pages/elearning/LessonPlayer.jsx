import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { X, Info, Award, Beaker, Bookmark, BookmarkCheck, StickyNote, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { usePathDetail, useModuleDetail } from '@/hooks/useLearningPaths';
import { useStartStep, useCompleteStep, useGradeQuiz } from '@/hooks/useProgress';
import { useStepNotes } from '@/hooks/useStepNotes';
import { SIM_AVAILABLE_METHODS } from '@/config/elearning';
import {
  CourseSidebar,
  LessonHero,
  LessonFooter,
  ReadingSlide,
  AnimatedStepFrame,
  QuizRunner,
} from '@/components/elearning/domain';
import { Callout } from '@/components/elearning/primitives';

export default function LessonPlayer() {
  const { code, number, stepId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [quizPassed, setQuizPassed] = useState(false);
  const [earnedCertificate, setEarnedCertificate] = useState(null);
  const [notesOpen, setNotesOpen] = useState(false);

  const moduleNumber = parseInt(number, 10);

  const { data: path, isLoading, refetch } = usePathDetail(code);
  // Path detail is now lightweight (structure only). The current module's full
  // content (contentJson + quizQuestions) is fetched lazily here so the roadmap
  // and sidebar stay fast. getModule is optional-auth, so guests get it too.
  const { data: moduleData, isLoading: moduleLoading, isError: moduleError, refetch: refetchModule } = useModuleDetail(code, moduleNumber);
  const startStep = useStartStep();
  const completeStep = useCompleteStep();
  const gradeQuiz = useGradeQuiz();

  // Prefer the content-rich module fetch; fall back to the path structure while it loads.
  const moduleStruct = path?.modules?.find((m) => m.orderIndex === moduleNumber);
  const module = moduleData || moduleStruct;
  const steps = module?.steps || [];
  const currentIndex = steps.findIndex((s) => String(s.id) === String(stepId));
  const step = steps[currentIndex] || steps[0];
  const prevStep = currentIndex > 0 ? steps[currentIndex - 1] : null;
  const nextStep = currentIndex >= 0 && currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;

  // Per-step notes & bookmark (localStorage, no backend). Hook must run on every
  // render (before the early returns), so it is keyed on the resolved step id.
  const { note, setNote, bookmarked, toggleBookmark } = useStepNotes(step?.id);

  const overallProgress = useMemo(() => {
    if (!path?.modules) return 0;
    return path.enrollment?.completionPercent ?? 0;
  }, [path]);

  // Derive the NDT method for an animated step: prefer the simulationRef prefix
  // (e.g. 'ut-couplant-intro' -> 'UT'), fall back to the path's method/code.
  const stepMethod = useMemo(() => {
    const fromRef = typeof step?.simulationRef === 'string'
      ? step.simulationRef.split('-')[0]
      : null;
    const raw = fromRef || path?.method || path?.code;
    return raw ? String(raw).toUpperCase() : null;
  }, [step?.simulationRef, path?.method, path?.code]);

  const simMethodAvailable = stepMethod && SIM_AVAILABLE_METHODS.includes(stepMethod);

  // Reset quiz state whenever the active step changes.
  useEffect(() => {
    setQuizScore(null);
    setQuizPassed(false);
    setEarnedCertificate(null);
  }, [step?.id]);

  // Mark step as in_progress on mount (authenticated only, silently).
  useEffect(() => {
    if (step?.id && user) {
      // Never block preview on a failed start call.
      startStep.mutate(step.id);
    }
  }, [step?.id, user]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft' && prevStep) handlePrev();
      if (e.key === 'ArrowRight' && nextStep) handleNext();
      if (e.key === 'Escape') handleExit();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prevStep, nextStep]);

  if (isLoading || moduleLoading) {
    return (
      <div className="elearning-surface min-h-screen bg-white grid place-items-center">
        <div className="text-slate-500 text-sm">Loading lesson…</div>
      </div>
    );
  }

  if (!path || !module || !step) {
    return (
      <div className="elearning-surface min-h-screen bg-white grid place-items-center p-6">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Lesson tidak ditemukan.</p>
          <Link to={`/e-learning/paths/${code}`} className="text-orange-600 underline">Kembali ke path</Link>
        </div>
      </div>
    );
  }

  // Module content fetch failed (transient) — offer a retry instead of letting the
  // lightweight path structure render as empty content.
  if (!moduleData && moduleError) {
    return (
      <div className="elearning-surface min-h-screen bg-white grid place-items-center p-6">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Gagal memuat konten modul.</p>
          <button
            type="button"
            onClick={() => refetchModule()}
            className="rounded-md bg-orange-amber px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Coba lagi
          </button>
        </div>
      </div>
    );
  }

  function handlePrev() {
    if (!prevStep) return;
    navigate(`/e-learning/paths/${code}/modules/${moduleNumber}/steps/${prevStep.id}`);
  }

  function goToNext() {
    if (nextStep) {
      navigate(`/e-learning/paths/${code}/modules/${moduleNumber}/steps/${nextStep.id}`);
    } else {
      // End of module — find next module's first step
      const nextModule = path.modules.find((m) => m.orderIndex > moduleNumber && m.steps?.length > 0);
      if (nextModule) {
        navigate(`/e-learning/paths/${code}/modules/${nextModule.orderIndex}/steps/${nextModule.steps[0].id}`);
      } else {
        navigate(`/e-learning/paths/${code}`);
      }
    }
  }

  async function handleNext() {
    // Quiz steps were already persisted server-side by gradeQuiz — never call
    // completeStep for them (it must not mint certificates or touch scores).
    if (step.kind !== 'quiz' && user) {
      try {
        await completeStep.mutateAsync({ stepId: step.id, code });
        await refetch();
      } catch {
        // Guest / transient failures must never block navigation (silent).
      }
    }
    goToNext();
  }

  function handleExit() {
    navigate(`/e-learning/paths/${code}`);
  }

  // MASTERY GATE: a quiz step only unlocks Next once the server says it passed.
  const stepCanAdvance = step.kind !== 'quiz' || quizPassed === true;

  async function handleQuizSubmit(answers) {
    // Server-authoritative grading. Returns { score, passed, passingScore, review, certificate }.
    const result = await gradeQuiz.mutateAsync({ stepId: step.id, answers, code });
    setQuizScore(result.score);
    setQuizPassed(result.passed === true);
    if (result.certificate) setEarnedCertificate(result.certificate);
    return result;
  }

  return (
    <div className="elearning-surface el-player min-h-screen bg-white">
      {/* Top thin progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-800 z-50">
        <div className="h-full bg-orange-amber transition-[width] duration-500" style={{ width: `${overallProgress}%` }} />
      </div>

      {/* Course title bar */}
      <div className="fixed top-1 left-0 right-0 h-11 bg-slate-900 text-white flex items-center justify-between px-4 sm:px-5 z-40 text-[14px]">
        <Link to={`/e-learning/paths/${code}`} className="font-semibold tracking-tight truncate">
          {path.title}
        </Link>
        <button
          type="button"
          onClick={handleExit}
          className="inline-flex items-center gap-2 rounded p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
          aria-label="Exit course"
        >
          <X className="h-3.5 w-3.5" />
          <span className="hidden sm:inline font-plexMono text-[11px] uppercase tracking-[0.1em]">Exit</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-[340px_1fr] pt-12 min-h-screen">
        {/* Sidebar */}
        <CourseSidebar
          pathDetail={path}
          currentStepId={step.id}
          className={cn(
            'lg:sticky lg:top-12 lg:h-[calc(100vh-3rem)]',
            !drawerOpen && 'hidden lg:flex',
            drawerOpen && 'fixed inset-y-12 left-0 w-[300px] z-40 flex'
          )}
        />
        {drawerOpen && (
          <div className="fixed inset-0 z-30 bg-slate-900/60 lg:hidden" onClick={() => setDrawerOpen(false)} />
        )}

        {/* Main content */}
        <main className="bg-white min-w-0">
          <LessonHero
            moduleNumber={moduleNumber}
            moduleTitle={module.title}
            onMenuClick={() => setDrawerOpen((o) => !o)}
            onExit={handleExit}
          />

          <section className="px-6 sm:px-12 py-10 sm:py-14 max-w-[920px]">
            {/* Guest preview banner — informs guests progress/certs won't save. */}
            {!user && (
              <div className="mb-7 flex items-start gap-3 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-[13.5px] text-slate-700">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                <p className="leading-relaxed">
                  Anda sedang melihat pratinjau.{' '}
                  <Link to="/login" className="font-semibold text-orange-700 underline">
                    Masuk
                  </Link>{' '}
                  untuk menyimpan progres &amp; mendapatkan sertifikat.
                </p>
              </div>
            )}

            <div className="flex items-center gap-3 font-plexMono text-[11px] uppercase tracking-[0.14em] text-slate-500 mb-7 flex-wrap">
              <span>Step <span className="text-orange-600 font-semibold">{step.orderIndex} / {steps.length}</span></span>
              <span className="opacity-50">·</span>
              <span>Est. {Math.round((step.durationSeconds || 0) / 60)} min</span>
              <span className="opacity-50">·</span>
              <span className={cn(
                'inline-block rounded px-2 py-0.5 font-semibold',
                step.kind === 'animated' && 'bg-orange-100 text-orange-700',
                step.kind === 'reading' && 'bg-slate-100 text-slate-700',
                step.kind === 'quiz' && 'bg-slate-900 text-white'
              )}>
                {step.kind}
              </span>
              {step.kind === 'quiz' && quizScore !== null && (
                <>
                  <span className="opacity-50">·</span>
                  <span className={cn('font-semibold', quizPassed ? 'text-emerald-600' : 'text-rose-600')}>
                    Skor {quizScore}%
                  </span>
                </>
              )}
            </div>

            <div className="mb-7 flex items-start justify-between gap-4">
              <h1 className="text-[28px] sm:text-[38px] font-bold leading-[1.12] tracking-[-0.018em]">
                {step.title}
              </h1>
              <button
                type="button"
                onClick={toggleBookmark}
                aria-pressed={bookmarked}
                aria-label={bookmarked ? 'Hapus penanda langkah ini' : 'Tandai langkah ini'}
                title={bookmarked ? 'Hapus penanda' : 'Tandai langkah ini'}
                className={cn(
                  'mt-1 inline-grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition-colors',
                  bookmarked
                    ? 'border-orange-300 bg-orange-50 text-orange-600 hover:bg-orange-100'
                    : 'border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600'
                )}
              >
                {bookmarked
                  ? <BookmarkCheck className="h-[18px] w-[18px]" aria-hidden="true" />
                  : <Bookmark className="h-[18px] w-[18px]" aria-hidden="true" />}
              </button>
            </div>

            {/* Collapsible per-step notes panel — autosaves to localStorage. */}
            <div className="mb-7 rounded-lg border border-slate-200 bg-slate-50/60">
              <button
                type="button"
                onClick={() => setNotesOpen((o) => !o)}
                aria-expanded={notesOpen}
                aria-controls="el-step-notes-panel"
                className="flex w-full items-center gap-2 px-4 py-2.5 text-left font-plexMono text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600 transition-colors hover:text-slate-900"
              >
                <StickyNote className="h-4 w-4 text-orange-500" aria-hidden="true" />
                <span>Catatan</span>
                {!notesOpen && note.trim().length > 0 && (
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500" aria-hidden="true" />
                )}
                <ChevronDown
                  className={cn('ml-auto h-4 w-4 transition-transform', notesOpen ? 'rotate-0' : '-rotate-90')}
                  aria-hidden="true"
                />
              </button>
              {notesOpen && (
                <div id="el-step-notes-panel" className="px-4 pb-4">
                  <label htmlFor="el-step-note-input" className="sr-only">
                    Catatan untuk langkah {step.title}
                  </label>
                  <textarea
                    id="el-step-note-input"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={4}
                    placeholder="Tulis catatan pribadi untuk langkah ini… (tersimpan otomatis di perangkat Anda)"
                    aria-label={`Catatan untuk langkah ${step.title}`}
                    className="w-full resize-y rounded-md border border-slate-200 bg-white px-3 py-2 text-[14px] leading-relaxed text-slate-800 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
                  />
                  <p className="mt-1.5 font-plexMono text-[10.5px] uppercase tracking-[0.08em] text-slate-400">
                    Tersimpan otomatis di perangkat ini
                  </p>
                </div>
              )}
            </div>

            {step.kind === 'reading' && <ReadingSlide content={step.contentJson} />}
            {step.kind === 'animated' && (
              <>
                <AnimatedStepFrame
                  simulationRef={step.simulationRef}
                  caption={step.contentJson?.sceneCaption}
                />
                {simMethodAvailable && (
                  <div className="mt-4">
                    <Link
                      to={`/e-learning/simulations/${stepMethod.toLowerCase()}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-4 py-2.5 text-[13.5px] font-semibold text-orange-700 transition-colors hover:border-orange-300 hover:bg-orange-100"
                    >
                      <Beaker className="h-4 w-4" aria-hidden="true" />
                      Buka simulasi interaktif {stepMethod}
                    </Link>
                  </div>
                )}
                {step.contentJson?.body && (
                  <div className="el-prose mt-6">
                    <p>{step.contentJson.body}</p>
                  </div>
                )}
              </>
            )}
            {step.kind === 'quiz' && (
              <>
                <QuizRunner
                  questions={step.quizQuestions || step.contentJson?.questions}
                  onSubmit={handleQuizSubmit}
                  onComplete={({ score, passed, certificate }) => {
                    setQuizScore(score);
                    setQuizPassed(passed === true);
                    if (certificate) setEarnedCertificate(certificate);
                  }}
                />
                {earnedCertificate && (
                  <div className="mt-6 flex items-start gap-3 rounded-xl border-2 border-emerald-500 bg-emerald-50 p-5">
                    <span className="inline-grid h-10 w-10 place-items-center rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                      <Award className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-[16px] font-bold text-slate-900">Selamat! Sertifikat diterbitkan</h3>
                      <p className="mt-1 text-[13.5px] text-slate-700">
                        Anda telah lulus asesmen akhir.{' '}
                        <Link to="/e-learning/certificates" className="font-semibold text-emerald-700 underline">
                          Lihat sertifikat
                        </Link>
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}

            {step.contentJson?.callout && (
              <Callout tag={step.contentJson.callout.tag}>{step.contentJson.callout.text}</Callout>
            )}
          </section>

          <LessonFooter
            prevStep={prevStep}
            nextStep={nextStep}
            totalSteps={steps.length}
            currentIndex={currentIndex}
            moduleNumber={moduleNumber}
            onPrev={handlePrev}
            onNext={stepCanAdvance ? handleNext : undefined}
            isCompleting={completeStep.isPending}
          />
        </main>
      </div>
    </div>
  );
}
