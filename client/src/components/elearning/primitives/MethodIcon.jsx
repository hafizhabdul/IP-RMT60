import { cn } from '@/lib/utils';

const sizes = {
  sm: 'h-9 w-9 text-[11px]',
  md: 'h-12 w-12 text-base',
  lg: 'h-16 w-16 text-xl',
};

export default function MethodIcon({ method = 'UT', size = 'md', className, locked = false }) {
  const safeMethod = ['UT', 'MT', 'PT', 'RT', 'VT', 'ET'].includes(method) ? method : 'UT';
  const bgClass = locked ? 'bg-method-et opacity-60' : `bg-method-${safeMethod.toLowerCase()}`;

  return (
    <div
      className={cn(
        'inline-grid place-items-center rounded-lg font-plexMono font-semibold tracking-wider text-white shadow-sm',
        sizes[size] || sizes.md,
        bgClass,
        className
      )}
      aria-label={`${method} method icon`}
    >
      {method}
    </div>
  );
}
