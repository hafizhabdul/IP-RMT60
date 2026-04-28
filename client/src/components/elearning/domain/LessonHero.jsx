import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LessonHero({ moduleNumber, moduleTitle, onMenuClick, onExit, className }) {
  return (
    <section className={cn(
      'relative overflow-hidden text-white px-6 sm:px-12 py-10 sm:py-12 min-h-[260px]',
      className
    )} style={{
      background:
        'radial-gradient(ellipse 50% 80% at 100% 50%, rgba(167,139,250,0.20), transparent 55%), linear-gradient(135deg, #0B1F3D 0%, #132A4F 50%, #0B1F3D 100%)'
    }}>
      <div className="absolute -top-12 -right-20 w-[380px] h-[380px] pointer-events-none opacity-90">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <radialGradient id="lh-amber" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="lh-purple" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <circle cx="260" cy="180" r="160" fill="#0F172A" />
          <path d="M260,20 A160,160 0 0,1 420,180 L260,180 Z" fill="url(#lh-purple)" opacity="0.85" />
          <path d="M260,180 L420,180 A160,160 0 0,1 380,280 Z" fill="url(#lh-amber)" />
          <path d="M260,180 L380,280 A160,160 0 0,1 260,340 Z" fill="#EA580C" opacity="0.55" />
          <circle cx="260" cy="180" r="52" fill="#0B1F3D" />
          <circle cx="260" cy="180" r="28" fill="#EA580C" opacity="0.85" />
        </svg>
      </div>

      <div className="relative flex items-center justify-between">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded p-2 transition-colors hover:bg-white/8"
          aria-label="Toggle course menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {onExit && (
          <button
            type="button"
            onClick={onExit}
            className="border-2 border-white px-4 py-2 font-plexMono text-[11px] font-bold uppercase tracking-[0.1em] transition-colors hover:bg-white hover:text-slate-900 inline-flex items-center gap-2"
          >
            <X className="h-3.5 w-3.5" />
            Exit Course
          </button>
        )}
      </div>

      <div className="relative mt-7">
        <div className="w-20 h-0.5 bg-white mb-3" />
        <div className="text-[20px] sm:text-[22px] font-light tracking-tight">Module {moduleNumber}</div>
        <h2 className="mt-2 text-[30px] sm:text-[42px] lg:text-[48px] font-bold leading-[1.08] tracking-[-0.02em] max-w-[22ch]">
          {moduleTitle}
        </h2>
      </div>

      <div className="absolute top-10 right-12 hidden lg:flex items-center gap-5">
        <div className="text-right">
          <div className="text-[22px] font-bold tracking-tight">SNS <em className="not-italic font-light text-amber-400">NDT</em></div>
        </div>
      </div>
    </section>
  );
}
