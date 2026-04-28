import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Callout } from '../primitives';

export default function ReadingSlide({ content, className }) {
  const slides = content?.slides || [];
  const [idx, setIdx] = useState(0);

  if (slides.length === 0) {
    return (
      <div className={cn('rounded border border-dashed border-slate-300 bg-slate-50 p-10 text-center', className)}>
        <div className="font-plexMono text-[11px] uppercase tracking-[0.14em] text-slate-500">No reading content</div>
        <p className="mt-2 text-slate-600">Konten reading belum diisi untuk step ini.</p>
      </div>
    );
  }

  const slide = slides[idx];
  const isFirst = idx === 0;
  const isLast = idx === slides.length - 1;

  return (
    <article className={cn('el-prose', className)}>
      <div className="font-plexMono text-[11px] uppercase tracking-[0.14em] text-slate-500 mb-4">
        Slide {idx + 1} / {slides.length}
      </div>

      {slide.heading && <h2 className="text-[26px] font-bold tracking-tight">{slide.heading}</h2>}

      {slide.body && (
        <div className="mt-3 space-y-3 max-w-[68ch]">
          {slide.body.split('\n\n').map((para, i) => (
            <p key={i} className="text-[16.5px] leading-[1.65] text-slate-800">{para}</p>
          ))}
        </div>
      )}

      {slide.callout && (
        <Callout tag={slide.callout.tag}>{slide.callout.text}</Callout>
      )}

      {slide.bullets && slide.bullets.length > 0 && (
        <ul className="mt-4 space-y-2 max-w-[68ch]">
          {slide.bullets.map((b, i) => (
            <li key={i} className="text-[16.5px] leading-[1.65] text-slate-800 list-disc list-inside">{b}</li>
          ))}
        </ul>
      )}

      {slides.length > 1 && (
        <div className="mt-8 flex items-center gap-3 border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={isFirst}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-2 font-plexMono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Slide
          </button>
          <div className="flex-1 text-center font-plexMono text-[11px] uppercase tracking-[0.1em] text-slate-500">
            {idx + 1} / {slides.length}
          </div>
          <button
            type="button"
            onClick={() => setIdx((i) => Math.min(slides.length - 1, i + 1))}
            disabled={isLast}
            className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-2 font-plexMono text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-orange-600 disabled:opacity-40"
          >
            Slide <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </article>
  );
}
