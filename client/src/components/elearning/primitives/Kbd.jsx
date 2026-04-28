import { cn } from '@/lib/utils';

export default function Kbd({ children, className }) {
  return (
    <kbd className={cn(
      'inline-flex items-center rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-plexMono text-[10.5px] font-medium text-slate-500',
      className
    )}>
      {children}
    </kbd>
  );
}
