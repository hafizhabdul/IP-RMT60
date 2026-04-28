import { Link } from 'react-router-dom';
import { Award, Download, ExternalLink, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useMyCertificates } from '@/hooks/useCertificates';
import { useLearningPaths } from '@/hooks/useLearningPaths';
import { MethodIcon } from '@/components/elearning/primitives';

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function CertificatesPage() {
  const { user } = useAuth();
  const { data: certs = [], isLoading } = useMyCertificates({ enabled: !!user });
  const { data: paths = [] } = useLearningPaths();

  const enrolledNotCertified = (paths || []).filter((p) => p.isEnrolled && !certs.find((c) => c.LearningPathId === p.id));

  if (!user) {
    return (
      <div className="space-y-6">
        <Header />
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
          <Lock className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h2 className="text-[20px] font-bold tracking-tight mb-2">Login dulu untuk lihat sertifikat</h2>
          <p className="text-[14px] text-slate-600 max-w-md mx-auto mb-5">
            Sertifikat akan otomatis diterbitkan setelah lo lulus final assessment dengan skor minimal 75%.
          </p>
          <Link to="/login" className="inline-flex items-center gap-2 rounded-md bg-orange-amber px-5 py-2.5 text-[13px] font-semibold text-white shadow-el-orange">
            Masuk →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1,2,3,4].map((i) => <div key={i} className="h-44 bg-slate-100 rounded-xl animate-pulse" />)}
        </div>
      ) : certs.length === 0 ? (
        <EmptyState enrolledPaths={enrolledNotCertified} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {certs.map((c) => <CertCard key={c.id} cert={c} userName={user.username} />)}
        </div>
      )}

      {certs.length > 0 && enrolledNotCertified.length > 0 && (
        <section className="mt-8">
          <h3 className="text-[15px] font-bold tracking-tight mb-3">Path on the way</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {enrolledNotCertified.slice(0, 4).map((p) => (
              <Link
                key={p.code}
                to={`/e-learning/paths/${p.code}`}
                className="rounded-lg border border-dashed border-slate-300 bg-white p-4 flex items-center gap-3 hover:border-orange-300"
              >
                <MethodIcon method={p.method} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[14px] truncate">{p.title}</div>
                  <div className="font-plexMono text-[11px] text-slate-500 uppercase tracking-[0.06em]">
                    {p.progressPercent}% · finish to claim cert
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Header() {
  return (
    <div>
      <div className="font-plexMono text-[11px] uppercase tracking-[0.12em] text-slate-500">
        SNS NDT / E-Learning / Certificates
      </div>
      <h1 className="mt-2 text-[28px] sm:text-[32px] font-bold tracking-tight leading-tight">Sertifikat saya</h1>
      <p className="text-[14px] text-slate-600 mt-1 max-w-[60ch]">
        Sertifikat ditandatangani digital, dilengkapi serial unik dan QR untuk verifikasi publik.
      </p>
    </div>
  );
}

function CertCard({ cert, userName }) {
  const path = cert.learningPath || {};
  return (
    <article className="relative overflow-hidden rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-white p-5">
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-amber px-2.5 py-1 font-plexMono text-[10.5px] font-bold uppercase tracking-[0.08em] text-white">
            <Award className="h-3 w-3" /> Issued
          </span>
          <span className="font-plexMono text-[10.5px] uppercase tracking-[0.1em] text-slate-500 tabular-nums">
            {cert.serialNumber}
          </span>
        </div>

        <h3 className="mt-3 text-[18px] font-bold tracking-tight leading-tight">
          {path.title || 'Certificate'} — Certificate of Proficiency
        </h3>
        <div className="mt-1 text-[13px] text-slate-600">
          Diterbitkan untuk <b className="text-slate-900">{userName || 'Inspector'}</b>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t border-orange-200/60">
          <Stat k="Score" v={`${Math.round(cert.score || 0)}%`} />
          <Stat k="Issued" v={formatDate(cert.issuedAt)} />
          <Stat k="Method" v={`${path.method} ${path.level || ''}`.trim()} />
        </div>

        <div className="mt-4 flex gap-2">
          {cert.pdfUrl ? (
            <a
              href={cert.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3.5 py-2 text-[12.5px] font-semibold text-white hover:bg-slate-800"
            >
              <Download className="h-3.5 w-3.5" /> Download PDF
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-3.5 py-2 text-[12.5px] font-semibold text-slate-500 cursor-not-allowed"
            >
              <Download className="h-3.5 w-3.5" /> PDF (segera)
            </button>
          )}
          {cert.qrToken && (
            <Link
              to={`/e-learning/certificates/verify/${cert.qrToken}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-3.5 py-2 text-[12.5px] font-semibold text-slate-700 hover:bg-slate-50"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Verifikasi
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

function Stat({ k, v }) {
  return (
    <div>
      <div className="font-plexMono text-[10px] uppercase tracking-[0.08em] text-slate-500">{k}</div>
      <div className="font-semibold text-[13px] mt-0.5 truncate">{v}</div>
    </div>
  );
}

function EmptyState({ enrolledPaths }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-slate-200 bg-white p-10 sm:p-14 text-center">
      <Award className="h-14 w-14 text-orange-300 mx-auto mb-4" />
      <h2 className="text-[20px] font-bold tracking-tight mb-2">Belum ada sertifikat</h2>
      <p className="text-[14px] text-slate-600 max-w-md mx-auto mb-6">
        Selesaikan path Level I dan lulus final assessment dengan skor ≥ 75% — sertifikat akan otomatis
        diterbitkan dan muncul di sini.
      </p>

      {enrolledPaths.length > 0 ? (
        <div className="max-w-md mx-auto text-left">
          <div className="font-plexMono text-[11px] uppercase tracking-[0.1em] text-slate-500 mb-2">Path lo yang aktif</div>
          <div className="space-y-2">
            {enrolledPaths.slice(0, 3).map((p) => (
              <Link
                key={p.code}
                to={`/e-learning/paths/${p.code}`}
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 hover:border-orange-300 hover:bg-white"
              >
                <MethodIcon method={p.method} size="sm" />
                <div className="flex-1 min-w-0 text-left">
                  <div className="font-semibold text-[14px] truncate">{p.title}</div>
                  <div className="font-plexMono text-[11px] text-slate-500 uppercase tracking-[0.06em]">
                    {p.progressPercent}% · lanjutkan
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <Link to="/e-learning" className="inline-flex items-center gap-2 rounded-md bg-orange-amber px-5 py-2.5 text-[13px] font-semibold text-white shadow-el-orange">
          Mulai path pertama →
        </Link>
      )}
    </div>
  );
}
