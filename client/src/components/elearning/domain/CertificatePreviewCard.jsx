import { Award, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CertificatePreviewCard({ pathCode, pathTitle, userName, status = 'upcoming', score, className }) {
  const upcoming = status === 'upcoming';
  return (
    <div className={cn(
      'rounded-xl border border-slate-200 bg-white p-5 sm:p-6',
      className
    )}>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-amber px-2.5 py-1 font-plexMono text-[10.5px] font-bold uppercase tracking-[0.08em] text-white">
        <Award className="h-3 w-3" />
        {upcoming ? 'Upcoming Certificate' : 'Earned Certificate'}
      </span>
      <h4 className="mt-3 text-[17px] font-bold tracking-tight leading-tight">
        {pathTitle || 'Certificate of Proficiency'}
      </h4>
      {upcoming && (
        <div className="mt-1 text-[12.5px] text-slate-500">
          Pass final assessment ≥ 75% untuk unlock
        </div>
      )}

      <div className="mt-3.5 rounded-lg border border-dashed border-orange-300 bg-gradient-to-br from-orange-50 to-white p-4">
        <div className="font-plexMono text-[10px] font-semibold uppercase tracking-[0.12em] text-orange-600">
          {upcoming ? 'SNS-' + (pathCode || 'XX-LX') + '-XXXXX' : `SNS-${pathCode}-${score?.toString().padStart(5, '0')}`}
        </div>
        <div className="mt-1.5 text-[17px] font-bold tracking-tight">{userName || 'Inspector'}</div>
        <div className="mt-0.5 font-plexMono text-[11px] text-slate-500">
          {upcoming
            ? 'Est. issue · soon · Signed digitally, QR verifiable'
            : 'Issued · ' + new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
          }
        </div>
      </div>

      {upcoming && (
        <div className="mt-4 flex gap-2">
          <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md bg-orange-amber px-4 py-2.5 text-[13px] font-semibold text-white shadow-el-orange hover:opacity-90">
            Lanjutkan path <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
