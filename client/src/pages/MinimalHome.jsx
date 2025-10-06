import { Link } from 'react-router-dom';
import OptimizedImage from '@/components/OptimizedImage';
import { useEffect, useState } from 'react';
import { ArrowRight, Shield, BookOpen, Users, Award } from 'lucide-react';
import HeroVideo from '@/components/HeroVideo';
import api from '@/utils/api';
import { IMG_EVENT } from '@/config/images';
const formatIDR = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price || 0);

export default function MinimalHome() {
  const [data, setData] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const { data } = await api.get('/public/homepage-bundle');
        setData(data);
        const ev = await api.get('/public/events', { params: { limit: 6 } });
        setEvents(ev.data || []);
      } catch (e) {
        setData({ featuredLectures: [], latestLectures: [], popularCategories: [], statistics: { totalLectures: 0, totalUsers: 0 } });
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center"><div className="h-8 w-8 rounded-full border-2 border-gray-900 border-t-transparent animate-spin" /></div>
    );
  }

  return (
    <div>
      {/* Hero (Industrial Pro) */}
      <HeroVideo />

      {/* Stats strip */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-2xl font-semibold text-gray-900">{data?.statistics?.totalLectures || 0}+</div>
              <div className="text-sm text-gray-600">Kursus Aktif</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-gray-900">{data?.statistics?.totalUsers || 0}+</div>
              <div className="text-sm text-gray-600">Peserta</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-gray-900">98%</div>
              <div className="text-sm text-gray-600">Kelulusan</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Dukungan</div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlight banner */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-xl overflow-hidden border border-gray-200">
            <div className="relative">
              <img src={IMG_EVENT} alt="Highlight" loading="lazy" decoding="async" className="w-full h-56 md:h-72 object-cover" />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-between px-6 md:px-10">
                <div>
                  <div className="text-white text-xl md:text-2xl font-semibold">Program Sertifikasi Berlangsung</div>
                  <div className="text-white/80 text-sm md:text-base mt-1">Daftar sekarang untuk kuota terbatas</div>
                </div>
                <Link to="/schedule" className="hidden md:inline-flex rounded-md bg-white text-gray-900 px-5 py-2 text-sm font-medium hover:bg-gray-100">Lihat Jadwal</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-xl font-semibold text-gray-900">Layanan Kami</h2>
          <p className="text-gray-600 mt-1">Metode Non-Destructive Testing (NDT) yang tersedia</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{name:'Penetrant (PT)'},{name:'Magnetic Particle (MT)'},{name:'Ultrasonic (UT)'},{name:'Eddy Current (ET)'},{name:'Phased Array Ultrasonic (PAUT)'},{name:'Radiographic (RT)'}].map((m) => (
              <div key={m.name} className="rounded-lg border border-gray-200 p-5">
                <div className="flex items-center gap-2 text-gray-900 font-medium"><BookOpen className="h-4 w-4" /> {m.name}</div>
                <p className="mt-2 text-sm text-gray-600">Pelatihan komprehensif sesuai standar industri.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming schedule */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Jadwal Terdekat</h2>
              <p className="text-gray-600 text-sm">Training & sertifikasi NDT yang akan datang</p>
            </div>
            <Link to="/schedule" className="text-sm text-gray-700 hover:text-gray-900">Semua Jadwal</Link>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((ev)=>(
              <Link key={ev.id} to="/enroll" className="group border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300">
                <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
                  <img src={ev.image || IMG_EVENT} alt={ev.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-600">{ev.method} • {ev.location}</div>
                  <div className="mt-1 text-base font-medium text-gray-900 line-clamp-2">{ev.title}</div>
                  <div className="mt-2 text-sm text-gray-700">{ev.startDate} — {ev.endDate}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Kursus Unggulan</h2>
              <p className="text-gray-600 text-sm">Pilihan populer untuk memulai</p>
            </div>
            <Link to="/courses" className="text-sm text-gray-700 hover:text-gray-900">Semua Kursus</Link>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(data?.featuredLectures || []).slice(0,3).map((c) => (
              <Link key={c.id} to={`/courses/${c.id}`} className="group border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300">
                <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
                  <OptimizedImage 
                  src={c.image}
                  alt={c.name}
                  width={400}
                  height={250}
                  className="h-full w-full group-hover:scale-105 transition-transform"
                />
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-600">{c.category?.name || 'NDT'}</div>
                  <div className="mt-1 text-base font-medium text-gray-900 line-clamp-2">{c.name}</div>
                  <div className="mt-2 text-sm text-gray-700">{formatIDR(c.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center">
            <div className="text-sm text-gray-600">Dipercaya oleh profesional dari berbagai industri</div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-6 items-center">
              {Array.from({length:6}).map((_,i)=>(
                <img key={i} src="/vite.svg" alt="Logo klien" loading="lazy" decoding="async" className="mx-auto h-8 w-auto opacity-70" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="rounded-xl border border-gray-200 bg-white p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Siap meningkatkan kompetensi?</h3>
              <p className="text-gray-600 mt-1">Daftar kursus NDT dan dapatkan sertifikasi resmi.</p>
            </div>
            <Link to="/courses" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-3 text-sm font-medium hover:bg-primary/90">
              Mulai Sekarang
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="kontak" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Hubungi Kami</h2>
              <p className="text-gray-600 mt-1">Konsultasi kebutuhan pelatihan untuk tim Anda.</p>
              <div className="mt-6 space-y-2 text-sm text-gray-700">
                <div>Email: info@sns-ndt.com</div>
                <div>Telepon: +62 812-3456-7890</div>
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-2 text-gray-900 font-medium"><Users className="h-4 w-4" /> Konsultasi Perusahaan</div>
              <p className="mt-2 text-sm text-gray-600">Kami menyediakan pelatihan in-house dan sertifikasi untuk organisasi Anda.</p>
              <div className="mt-4 flex gap-3">
                <a href="mailto:info@sns-ndt.com" className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">Email</a>
                <a href="/courses" className="rounded-md bg-gray-900 text-white px-4 py-2 text-sm hover:bg-black">Lihat Kursus</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
