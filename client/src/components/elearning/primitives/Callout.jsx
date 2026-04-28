import { cn } from '@/lib/utils';

export default function Callout({ tag, children, className, tone = 'orange' }) {
  const tones = {
    orange: 'bg-orange-50 border-orange-600 text-slate-900',
    amber: 'bg-amber-50 border-amber-500 text-slate-900',
    slate: 'bg-slate-50 border-slate-700 text-slate-900',
  };
  const tagTones = {
    orange: 'text-orange-700',
    amber: 'text-amber-700',
    slate: 'text-slate-700',
  };
  return (
    <div className={cn('border-l-4 px-5 py-4 my-6 text-[15px]', tones[tone] || tones.orange, className)}>
      {tag && (
        <span className={cn('mb-1.5 block font-plexMono text-[11px] font-bold uppercase tracking-[0.14em]', tagTones[tone] || tagTones.orange)}>
          {tag}
        </span>
      )}
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}
