import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

/**
 * Wrapper for animated step content. For the pilot, it renders a static
 * SVG illustration based on simulationRef. Once the simulation components
 * are extracted (D4.6), this can dynamically import the matching scene.
 */
export default function AnimatedStepFrame({ simulationRef, caption, className }) {
  return (
    <div className={cn('rounded border border-slate-200 bg-slate-50 overflow-hidden', className)}>
      <div className="bg-slate-900 text-white px-4 sm:px-5 py-2.5 flex items-center justify-between">
        <div className="font-plexMono text-[11px] uppercase tracking-[0.14em] text-amber-400 inline-flex items-center gap-2">
          <Play className="h-3 w-3 fill-current" />
          Animated · {simulationRef || 'scene'}
        </div>
        <div className="font-plexMono text-[11px] tracking-[0.08em] text-slate-400">SCENE-01</div>
      </div>

      <div className="aspect-[16/9] sm:aspect-[16/8] relative bg-white p-6 sm:p-10">
        {/* Default illustration: probe + couplant + specimen */}
        <DefaultScene simulationRef={simulationRef} />
      </div>

      {caption && (
        <div className="border-t border-slate-200 bg-white px-5 py-3 text-[12.5px] text-slate-500 italic">
          {caption}
        </div>
      )}
    </div>
  );
}

function DefaultScene({ simulationRef }) {
  return (
    <svg viewBox="0 0 720 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-label="Ultrasonic probe scene">
      <defs>
        <linearGradient id="anim-probe" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
        <linearGradient id="anim-spec" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>

      {/* without couplant */}
      <text x="100" y="32" fontFamily="IBM Plex Mono" fontSize="11" fontWeight="600" fill="#64748B" letterSpacing="1.4">WITHOUT COUPLANT · AIR GAP</text>
      <rect x="50" y="56" width="120" height="68" fill="url(#anim-probe)" rx="4" />
      <text x="110" y="98" textAnchor="middle" fontFamily="IBM Plex Sans" fontSize="13" fill="white" fontWeight="500">Probe</text>
      <line x1="40" y1="138" x2="180" y2="138" stroke="#EA580C" strokeWidth="2" strokeDasharray="3 2" />
      <text x="190" y="142" fontFamily="IBM Plex Mono" fontSize="11" fill="#EA580C" fontWeight="600">AIR GAP</text>
      <rect x="20" y="148" width="240" height="120" fill="url(#anim-spec)" rx="2" />
      <path d="M110 132 L110 90 M110 90 L102 100 M110 90 L118 100" stroke="#EA580C" strokeWidth="2.5" fill="none" />
      <text x="280" y="158" fontFamily="IBM Plex Sans" fontSize="14" fill="#EA580C" fontWeight="600">~ 99.9% reflected</text>
      <text x="280" y="178" fontFamily="IBM Plex Sans" fontSize="13" fill="#64748B">Sinyal nggak sampai ke material</text>
      <text x="280" y="196" fontFamily="IBM Plex Mono" fontSize="11" fill="#64748B">Z_air ≈ 0.0004 · Z_steel ≈ 45</text>

      {/* with couplant */}
      <text x="465" y="32" fontFamily="IBM Plex Mono" fontSize="11" fontWeight="600" fill="#64748B" letterSpacing="1.4">WITH COUPLANT · Z-MATCHED</text>
      <rect x="430" y="56" width="120" height="68" fill="url(#anim-probe)" rx="4" />
      <text x="490" y="98" textAnchor="middle" fontFamily="IBM Plex Sans" fontSize="13" fill="white" fontWeight="500">Probe</text>
      <rect x="410" y="130" width="170" height="10" fill="#10B981" opacity="0.55" />
      <text x="585" y="139" fontFamily="IBM Plex Mono" fontSize="11" fill="#059669" fontWeight="600">COUPLANT</text>
      <rect x="390" y="146" width="240" height="122" fill="url(#anim-spec)" rx="2" />
      <path d="M490 130 L490 250" stroke="#10B981" strokeWidth="2.5" fill="none" />
      <path d="M490 250 L482 240 M490 250 L498 240" stroke="#10B981" strokeWidth="2.5" fill="none" />
      <text x="640" y="190" fontFamily="IBM Plex Sans" fontSize="14" fill="#059669" fontWeight="600" textAnchor="end">~ 88% transmitted</text>
      <text x="640" y="210" fontFamily="IBM Plex Sans" fontSize="13" fill="#64748B" textAnchor="end">Sinyal mencapai cacat</text>
      <text x="640" y="228" fontFamily="IBM Plex Mono" fontSize="11" fill="#64748B" textAnchor="end">Z_gel ≈ 1.5 menjembatani gap</text>
    </svg>
  );
}
