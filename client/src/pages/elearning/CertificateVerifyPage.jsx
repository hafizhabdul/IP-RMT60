import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Award, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { certificateService } from '@/services/certificateService';
import { MethodIcon } from '@/components/elearning/primitives';

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function CertificateVerifyPage() {
  const { qrToken } = useParams();
  const [state, setState] = useState({ loading: true, cert: null, error: null });

  useEffect(() => {
    let cancelled = false;
    certificateService
      .verify(qrToken)
      .then((cert) => !cancelled && setState({ loading: false, cert, error: null }))
      .catch((err) =>
        !cancelled &&
        setState({
          loading: false,
          cert: null,
          error: err?.response?.data?.message || 'Sertifikat tidak ditemukan',
        })
      );
    return () => { cancelled = true; };
  }, [qrToken]);

  return (
    <div className="elearning-surface min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-plexMono text-[11px] uppercase tracking-[0.1em] text-slate-500 hover:text-orange-600"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to home
        </Link>

        <div className="mt-6">
          <div className="font-plexMono text-[11px] uppercase tracking-[0.12em] text-slate-500">
            SNS NDT · Certificate Verification
          </div>
          <h1 className="mt-2 text-[28px] sm:text-[36px] font-bold tracking-tight leading-tight">
            Verify Certificate
          </h1>
          <p className="text-[14px] text-slate-600 mt-1 max-w-[60ch]">
            Halaman publik untuk verifikasi keabsahan sertifikat SNS NDT. Scan QR atau masukkan token unik.
          </p>
        </div>

        <div className="mt-7">
          {state.loading ? (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
              <div className="inline-block h-8 w-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin mb-3" />
              <p className="text-slate-500 text-sm">Memverifikasi sertifikat…</p>
            </div>
          ) : state.error ? (
            <div className="rounded-xl border-2 border-rose-200 bg-rose-50 p-8 text-center">
              <AlertCircle className="h-12 w-12 text-rose-500 mx-auto mb-3" />
              <h2 className="text-[20px] font-bold text-rose-800 mb-1">Sertifikat Tidak Valid</h2>
              <p className="text-[13.5px] text-rose-700 mb-4">{state.error}</p>
              <div className="font-plexMono text-[11px] uppercase tracking-[0.1em] text-rose-600/70">
                Token: {qrToken?.slice(0, 16)}…
              </div>
            </div>
          ) : state.cert ? (
            <ValidCertificate cert={state.cert} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ValidCertificate({ cert }) {
  return (
    <div className="space-y-5">
      {/* Status banner */}
      <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-5 flex items-center gap-4">
        <div className="inline-flex h-12 w-12 rounded-full bg-emerald-500 text-white items-center justify-center shrink-0">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div>
          <div className="font-plexMono text-[10.5px] uppercase tracking-[0.12em] text-emerald-700 font-bold">
            ✓ Verified Authentic
          </div>
          <div className="text-[15px] font-semibold text-emerald-900 mt-0.5">
            Sertifikat ini sah dan terdaftar di database SNS NDT
          </div>
        </div>
      </div>

      {/* Certificate details */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-7 sm:p-9">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-amber px-2.5 py-1 font-plexMono text-[10.5px] font-bold uppercase tracking-[0.08em] text-white">
              <Award className="h-3 w-3" /> Issued
            </span>
            <span className="font-plexMono text-[11px] uppercase tracking-[0.12em] text-amber-400 tabular-nums">
              {cert.serialNumber}
            </span>
          </div>

          <div className="font-plexMono text-[11px] uppercase tracking-[0.12em] text-amber-400 mb-2">
            Certificate of Proficiency
          </div>
          <h2 className="text-[26px] sm:text-[32px] font-bold tracking-tight leading-tight mb-1">
            {cert.path?.title || 'Certificate'}
          </h2>
          <div className="font-plexMono text-[11px] uppercase tracking-[0.1em] text-slate-400 mb-6">
            {cert.path?.code} · {cert.path?.method} · {cert.path?.level}
          </div>

          <div className="rounded-lg bg-white/5 border border-white/10 p-5">
            <div className="font-plexMono text-[10.5px] uppercase tracking-[0.1em] text-slate-400 mb-1">
              Diterbitkan untuk
            </div>
            <div className="text-[24px] font-bold tracking-tight">{cert.recipient?.username}</div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-white/10">
            <Stat k="Score" v={`${Math.round(cert.score || 0)}%`} accent />
            <Stat k="Issued" v={formatDate(cert.issuedAt)} />
            <Stat k="Method" v={`${cert.path?.method || ''} ${cert.path?.level || ''}`.trim()} />
            <Stat k="Validity" v="5 years" />
          </div>
        </div>
      </div>

      {/* Verification metadata */}
      <div className="rounded-lg bg-white border border-slate-200 p-5">
        <div className="font-plexMono text-[10.5px] uppercase tracking-[0.12em] text-slate-500 mb-3">
          Verification info
        </div>
        <div className="space-y-2 text-[13px]">
          <Row k="Issuer" v="SNS NDT — SAR NDT Services" />
          <Row k="Standard" v="ASNT SNT-TC-1A 2020 · CP-105" />
          <Row k="Verification time" v={formatDate(new Date())} />
          <Row k="Status" v="✓ Active & valid" tone="good" />
        </div>
      </div>

      <div className="flex justify-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-3 text-[13px] font-semibold text-slate-700 hover:bg-slate-50"
        >
          Selesai
        </Link>
      </div>
    </div>
  );
}

function Stat({ k, v, accent }) {
  return (
    <div>
      <div className="font-plexMono text-[10px] uppercase tracking-[0.1em] text-slate-400">{k}</div>
      <div className={`text-[14px] font-semibold mt-0.5 ${accent ? 'text-amber-400' : 'text-white'}`}>{v}</div>
    </div>
  );
}

function Row({ k, v, tone }) {
  return (
    <div className="flex items-baseline justify-between border-b border-slate-100 last:border-0 py-1.5">
      <span className="text-slate-500">{k}</span>
      <span className={`font-semibold ${tone === 'good' ? 'text-emerald-700' : 'text-slate-900'}`}>{v}</span>
    </div>
  );
}
