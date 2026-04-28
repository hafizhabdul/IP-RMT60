import { cn } from '@/lib/utils';
import { CheckCircle2, BookOpen, ClipboardCheck } from 'lucide-react';

function timeAgo(date) {
  if (!date) return '—';
  const diffMs = Date.now() - new Date(date).getTime();
  const days = Math.floor(diffMs / 86400000);
  const hours = Math.floor(diffMs / 3600000);
  if (days >= 7) return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  if (days >= 1) return `${days}d`;
  if (hours >= 1) return `${hours}h`;
  return 'baru saja';
}

export default function ActivityStream({ items = [], className }) {
  return (
    <div className={cn(
      'relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white',
      className
    )}>
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="relative">
        <div className="font-plexMono text-[10.5px] font-medium uppercase tracking-[0.14em] text-amber-400 mb-1">
          ◉ Activity · Last 7 days
        </div>
        <h4 className="text-[17px] font-bold tracking-tight">Your learning stream</h4>

        <div className="mt-4 divide-y divide-white/10">
          {items.length === 0 && (
            <div className="py-6 text-center text-[13px] text-slate-400">
              Belum ada aktivitas — selesaikan step pertama untuk mulai streak.
            </div>
          )}
          {items.map((item, idx) => {
            const Icon = item.type === 'quiz' ? ClipboardCheck : item.type === 'module_done' ? CheckCircle2 : BookOpen;
            const dotColor = item.type === 'quiz' ? 'bg-amber-400' : item.type === 'module_done' ? 'bg-emerald-500' : 'bg-orange-500';
            return (
              <div key={idx} className="grid grid-cols-[20px_1fr_auto] gap-2.5 py-2.5 text-[13px] text-slate-300">
                <span className={cn('mt-1 inline-block h-2 w-2 rounded-full', dotColor)} />
                <div className="min-w-0">
                  <div className="text-white font-medium leading-tight truncate flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5 opacity-70" />
                    {item.title}
                  </div>
                  <div className="font-plexMono text-[10.5px] text-slate-400 mt-0.5 uppercase tracking-[0.06em]">
                    {item.path && <span>{item.path}</span>}
                    {item.score !== null && item.score !== undefined && <span> · score {Math.round(item.score)}%</span>}
                  </div>
                </div>
                <span className="font-plexMono text-[10.5px] text-slate-400 whitespace-nowrap">{timeAgo(item.completedAt)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
