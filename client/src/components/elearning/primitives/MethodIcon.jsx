import { cn } from '@/lib/utils';

const sizes = {
  sm: 'h-9 w-9 text-[11px]',
  md: 'h-12 w-12 text-base',
  lg: 'h-16 w-16 text-xl',
};

const METHOD_GRADIENTS = {
  UT: 'linear-gradient(135deg, #0EA5E9, #06B6D4)',
  MT: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
  PT: 'linear-gradient(135deg, #EA580C, #F59E0B)',
  RT: 'linear-gradient(135deg, #10B981, #059669)',
  VT: 'linear-gradient(135deg, #F43F5E, #E11D48)',
  ET: 'linear-gradient(135deg, #475569, #334155)',
};

export default function MethodIcon({ method = 'UT', size = 'md', className, locked = false }) {
  const safeMethod = ['UT', 'MT', 'PT', 'RT', 'VT', 'ET'].includes(method) ? method : 'UT';
  const gradient = METHOD_GRADIENTS[safeMethod];

  return (
    <div
      className={cn(
        'inline-grid place-items-center rounded-lg font-plexMono font-semibold tracking-wider text-white shadow-sm',
        sizes[size] || sizes.md,
        locked && 'opacity-60 grayscale',
        className
      )}
      style={{ backgroundImage: gradient }}
      aria-label={`${method} method icon`}
    >
      {method}
    </div>
  );
}
