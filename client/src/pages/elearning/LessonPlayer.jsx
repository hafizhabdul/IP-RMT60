import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { usePathDetail } from '@/hooks/useLearningPaths';
import { useStartStep, useCompleteStep } from '@/hooks/useProgress';
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

  const { data: path, isLoading, refetch } = usePathDetail(code);
  const startStep = useStartStep();
  const completeStep = useCompleteStep();

  const moduleNumber = parseInt(number, 10);
  const module = path?.modules?.find((m) => m.orderIndex === moduleNumber);
  const steps = module?.steps || [];
  const currentIndex = steps.findIndex((s) => String(s.id) === String(stepId));
  const step = steps[currentIndex] || steps[0];
  const prevStep = currentIndex > 0 ? steps[currentIndex - 1] : null;
  const nextStep = currentIndex >= 0 && currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;

  const overallProgress = useMemo(() => {
    if (!path?.modules) return 0;
    return path.enrollment?.completionPercent ?? 0;
  }, [path]);

  // Mark step as in_progress on mount
  useEffect(() => {
    if (step?.id && user) {
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

  if (isLoading) {
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

  function handlePrev() {
    if (!prevStep) return;
    navigate(`/e-learning/paths/${code}/modules/${moduleNumber}/steps/${prevStep.id}`);
  }

  async function handleNext() {
    try {
      const payload = { stepId: step.id, code };
      if (step.kind === 'quiz' && quizScore !== null) {
        payload.score = quizScore;
      }
      await completeStep.mutateAsync(payload);

      // Navigate
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
      await refetch();
    } catch (e) {
      // toast via interceptor
    }
  }

  function handleExit() {
    navigate(`/e-learning/paths/${code}`);
  }

  const stepCanAdvance = step.kind !== 'quiz' || quizScore !== null;

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
            </div>

            <h1 className="text-[28px] sm:text-[38px] font-bold leading-[1.12] tracking-[-0.018em] mb-7">
              {step.title}
            </h1>

            {step.kind === 'reading' && <ReadingSlide content={step.contentJson} />}
            {step.kind === 'animated' && (
              <>
                <AnimatedStepFrame
                  simulationRef={step.simulationRef}
                  caption={step.contentJson?.sceneCaption}
                />
                {step.contentJson?.body && (
                  <div className="el-prose mt-6">
                    <p>{step.contentJson.body}</p>
                  </div>
                )}
              </>
            )}
            {step.kind === 'quiz' && (
              <QuizRunner
                questions={step.contentJson?.questions}
                onComplete={({ score }) => setQuizScore(score)}
              />
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
