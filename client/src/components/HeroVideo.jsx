import { Link } from 'react-router-dom';

export default function HeroVideo() {
  const videoUrl = import.meta.env.VITE_HERO_VIDEO_URL ||
    'https://cdn.coverr.co/videos/coverr-welding-sparks-0023/1080p.mp4';
  const poster = '/technical-support.png';

  return (
    <section className="relative text-white overflow-hidden" style={{ backgroundColor: '#0f172a' }}>
      <div className="absolute inset-0 opacity-60">
        <video
          className="h-full w-full object-cover"
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <img src="/logo.png" alt="SNS - Sar NDT Services" className="h-10 w-auto opacity-90" />
        <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight">
          Industrial NDT Training & Certification
        </h1>
        <p className="mt-4 text-lg text-white/90 max-w-2xl">
          Pelatihan praktis dan sertifikasi NDT (PT, MT, UT, ET, PAUT, RT) yang dirancang untuk teknisi dan engineer industri.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link to="/schedule" className="inline-flex items-center justify-center rounded-md bg-orange-600 hover:bg-orange-700 px-6 py-3 text-sm font-medium">Lihat Jadwal</Link>
          <Link to="/enroll" className="inline-flex items-center justify-center rounded-md border border-white/30 hover:bg-white/10 px-6 py-3 text-sm font-medium">Daftar Sekarang</Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2">
          {["ISO 9712","ASNT SNT-TC-1A","K3 Industrial"].map((b)=> (
            <span key={b} className="text-xs rounded-full border border-white/30 px-3 py-1 backdrop-blur-sm">{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

