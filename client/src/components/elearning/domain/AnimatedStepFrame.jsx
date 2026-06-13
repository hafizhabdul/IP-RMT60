import { cn } from '@/lib/utils';
import { useReducedMotion } from 'framer-motion';
import { Play, Loader2, Wrench } from 'lucide-react';
import { lazy, Suspense } from 'react';

/**
 * Wrapper for animated step content. Dispatches on `simulationRef` to the
 * matching interactive simulation component (lazy-loaded). simulationRef values
 * are method-prefixed in the seeds, e.g. 'ut-couplant-intro', 'mt-flux-leakage',
 * 'pt-capillary', 'rt-geometric-unsharpness', 'vt-...', 'et-...'.
 *
 * Methods with a real simulator (UT/MT/PT/RT) render it; methods without one yet
 * (VT/ET, or any unknown ref) render an honest "being prepared" placeholder
 * instead of a wrong, hardcoded scene.
 */

// Lazy registry: method prefix -> matching self-contained sim component.
const SIM_REGISTRY = {
  ut: lazy(() => import('@/components/ndt-sims/UT/UTFlawScanner')),
  mt: lazy(() => import('@/components/ndt-sims/MT/MagneticLab')),
  pt: lazy(() => import('@/components/ndt-sims/PT/PenetrantLab')),
  rt: lazy(() => import('@/components/ndt-sims/RT/RadiographyLab')),
};

function methodOf(simulationRef) {
  if (!simulationRef || typeof simulationRef !== 'string') return null;
  const prefix = simulationRef.split('-')[0]?.toLowerCase();
  return prefix || null;
}

export default function AnimatedStepFrame({ simulationRef, caption, className }) {
  const method = methodOf(simulationRef);
  const SimComponent = method ? SIM_REGISTRY[method] : null;
  const ariaLabel = caption || (simulationRef ? `Visualisasi interaktif: ${simulationRef}` : 'Visualisasi interaktif');

  return (
    <div className={cn('rounded border border-slate-200 bg-slate-50 overflow-hidden', className)}>
      <div className="bg-slate-900 text-white px-4 sm:px-5 py-2.5 flex items-center justify-between">
        <div className="font-plexMono text-[11px] uppercase tracking-[0.14em] text-amber-400 inline-flex items-center gap-2">
          <Play className="h-3 w-3 fill-current" />
          Animated · {simulationRef || 'scene'}
        </div>
        <div className="font-plexMono text-[11px] tracking-[0.08em] text-slate-400">SCENE-01</div>
      </div>

      <div className="relative bg-white" role="img" aria-label={ariaLabel}>
        {SimComponent ? (
          <Suspense fallback={<SimFallback />}>
            <SimComponent />
          </Suspense>
        ) : (
          <UnavailableScene method={method} />
        )}
      </div>

      {caption && (
        <div className="border-t border-slate-200 bg-white px-5 py-3 text-[12.5px] text-slate-500 italic">
          {caption}
        </div>
      )}
    </div>
  );
}

function SimFallback() {
  // Honour reduced-motion: render a static loader instead of an infinite spin.
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="aspect-[16/9] sm:aspect-[16/8] flex items-center justify-center bg-white text-slate-400">
      <Loader2 className={cn('h-6 w-6', !prefersReducedMotion && 'animate-spin')} aria-hidden="true" />
      <span className="sr-only">Memuat visualisasi…</span>
    </div>
  );
}

function UnavailableScene({ method }) {
  return (
    <div className="aspect-[16/9] sm:aspect-[16/8] flex flex-col items-center justify-center gap-3 bg-slate-50 px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-slate-500">
        <Wrench className="h-5 w-5" aria-hidden="true" />
      </div>
      <p className="max-w-md text-sm font-medium text-slate-600">
        Visualisasi interaktif untuk langkah ini sedang disiapkan
        {method ? (
          <span className="block mt-1 font-plexMono text-[11px] uppercase tracking-[0.12em] text-slate-400">
            Metode {method.toUpperCase()}
          </span>
        ) : null}
      </p>
    </div>
  );
}
