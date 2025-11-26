import { Link } from 'react-router-dom';
import OptimizedImage from '@/components/OptimizedImage';
import { useEffect, useState } from 'react';
import { ArrowRight, Shield, BookOpen, Users, Award } from 'lucide-react';
import HeroVideo from '@/components/HeroVideo';
import api from '@/utils/api';
import { IMG_EVENT } from '@/config/images';
import { createWhatsAppLink, formatWhatsAppMessage } from '@/utils/whatsapp';
import '../styles/enhancements.css';
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
      } catch (error) {
        console.error('Error loading home data:', error);
        setData({ featuredLectures: [], latestLectures: [], popularCategories: [], statistics: { totalLectures: 0, totalUsers: 0 } });
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const handleWhatsApp = (eventName = "") => {
    const phoneNumber = "6281296953557";
    const message = eventName 
      ? `Halo Admin, saya tertarik mendaftar training: ${eventName}. Mohon infonya.`
      : "Halo Admin, saya ingin mendaftar kursus.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

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
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2760%27%20height=%2760%27%20viewBox=%270%200%2060%2060%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg%20fill=%27none%27%20fill-rule=%27evenodd%27%3E%3Cg%20fill=%27%23ffffff%27%20fill-opacity=%270.03%27%3E%3Ccircle%20cx=%277%27%20cy=%277%27%20r=%277%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Dipercaya oleh 500+ Profesional Industri</h2>
            <p className="text-gray-300">Bergabung dengan alumni yang sukses karir NDT-nya</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group stat-counter">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                {data?.statistics?.totalLectures || 0}+
              </div>
              <div className="text-sm text-gray-300">
                Program Kursus
              </div>
            </div>
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                {data?.statistics?.totalUsers || 0}+
              </div>
              <div className="text-sm text-gray-300">
                Alumni Berhasil
              </div>
            </div>
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                98%
              </div>
              <div className="text-sm text-gray-300">
                Tingkat Kelulusan
              </div>
            </div>
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                24/7
              </div>
              <div className="text-sm text-gray-300">
                Support Online
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlight banner */}
      <section className="bg-gradient-to-br from-orange-100 via-white to-blue-100 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-orange-300/20 rounded-full filter blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-300/20 rounded-full filter blur-2xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-2xl overflow-hidden border border-orange-200">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-orange-700/90"></div>
              <div className="relative px-8 md:px-12 py-10 md:py-14">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left flex-1">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full mb-4">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      <span className="font-medium">BERLANGSUNG SEKARANG</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      Peluang Terbatas: Sertifikasi NDT 2024
                    </h2>
                    <p className="text-orange-100 text-base md:text-lg mb-6 max-w-lg">
                      Amankan kursi Anda sekarang dan hemat 20% untuk investasi karir Anda. Kuota terbatas!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        to="/schedule"
                        className="inline-flex items-center justify-center bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        Cek Jadwal & Harga
                      </Link>
                      <button
                        onClick={() => handleWhatsApp()}
                        className="inline-flex items-center justify-center bg-orange-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-900 transition-all duration-300 transform hover:scale-105"
                      >
                        Amankan Kursi Saya
                      </button>
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <div className="text-white text-sm font-medium mb-4">Keuntungan Mendaftar Sekarang:</div>
                      <ul className="space-y-2 text-orange-100 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-300 rounded-full"></span>
                          Diskon 20% Early Bird
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-300 rounded-full"></span>
                          Materi Pembelajaran Online
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-300 rounded-full"></span>
                          Sertifikasi Internasional
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-gradient-to-b from-gray-50 to-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Metode NDT yang Kami Ajarkan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Pelatihan komprehensif dengan standar internasional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {name:'Penetrant Testing (PT)', desc: 'Deteksi retakan permukaan dengan cairan penetrasi'},
              {name:'Magnetic Particle (MT)', desc: 'Identifikasi cacat pada material feromagnetik'},
              {name:'Ultrasonic Testing (UT)', desc: 'Pemeriksaan internal dengan gelombang ultrasonik'},
              {name:'Eddy Current (ET)', desc: 'Pengujian konduktivitas listrik material'},
              {name:'Phased Array (PAUT)', desc: 'Teknologi advanced ultrasonic imaging'},
              {name:'Radiographic Testing (RT)', desc: 'Inspeksi dengan sinar-X/Gamma'}
            ].map((m, index) => (
              <div
                key={m.name}
                className={`group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden service-card card-enter`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {m.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {m.desc}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      Sertifikasi ASNT SNT TC 1A dan EN 4179/NAS 410
                    </div>
                    <div className="text-orange-600 group-hover:text-orange-700 transition-colors">
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25 btn-enhanced"
            >
              <BookOpen className="w-5 h-5" />
              Lihat Semua Kursus
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming schedule */}
      <section className="bg-gradient-to-br from-orange-50 to-blue-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Jadwal Training Terdekat
              </h2>
              <p className="text-gray-600 mt-2">Kuota terbatas! Daftar sebelum kehabisan</p>
            </div>
            <Link to="/schedule" className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors">
              Lihat Semua Jadwal
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {events.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>Belum ada jadwal training tersedia</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {events.map((ev, index) => (
                  <button
                    key={ev.id}
                    onClick={() => handleWhatsApp(ev.title)}
                    className={`group block w-full text-left p-4 hover:bg-orange-50 transition-all duration-200 ${
                      index === 0 ? 'bg-gradient-to-r from-orange-50 to-transparent border-l-4 border-orange-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          {index === 0 && (
                            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">POPULER</span>
                          )}
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            {ev.method}
                          </span>
                          <span className="text-xs text-gray-600">
                            {ev.location}
                          </span>
                        </div>
                        <h3 className="text-base font-semibold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                          {ev.title}
                        </h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span>
                            {ev.startDate} — {ev.endDate}
                          </span>
                          {ev.price && (
                            <span className="font-medium text-green-600">
                              {formatIDR(ev.price)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="ml-4 flex items-center gap-2">
                        <span className="text-xs text-gray-500 group-hover:text-orange-600 transition-colors">
                          Klik untuk daftar →
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {events.length > 0 && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 text-sm px-4 py-2 rounded-full">
                <span className="font-medium">Penting:</span> Kuota terbatas untuk setiap kelas
              </div>
            </div>
          )}
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
                  alt={c.title || c.technique || c.name}
                  width={400}
                  height={250}
                  className="h-full w-full group-hover:scale-105 transition-transform"
                />
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-600">{c.category?.name || 'NDT'}</div>
                  <div className="mt-1 text-base font-medium text-gray-900 line-clamp-2">{c.title || c.technique || c.name}</div>
                  <div className="mt-2 text-sm text-gray-700">{formatIDR(c.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 container-mobile">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 heading-responsive">Apa Kata Alumni Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg text-responsive">
              Lebih dari 500+ profesional telah mempercayai kami untuk karir NDT mereka
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Budi Santoso",
                position: "Senior NDT Inspector",
                company: "Pertamina Refinery Unit",
                image: "https://api.dicebear.com/7.x/initials/svg?seed=Budi&backgroundColor=f59e0b&color=white",
                rating: 5,
                text: "Pelatihan yang sangat komprehensif! Materi mudah dipahami dan instruktur sangat berpengalaman. Saya langsung dapat kerja setelah sertifikasi.",
                highlight: true
              },
              {
                name: "Sarah Wijaya",
                position: "NDT Engineer",
                company: "Schlumberger Indonesia",
                image: "https://api.dicebear.com/7.x/initials/svg?seed=Sarah&backgroundColor=3b82f6&color=white",
                rating: 5,
                text: "Standar pelatihan internasional dan sertifikat diakui globally. Career saya naik drastis setelah dapat sertifikasi di sini."
              },
              {
                name: "Ahmad Fauzi",
                position: "QC Manager",
                company: "Badak LNG",
                image: "https://api.dicebear.com/7.x/initials/svg?seed=Ahmad&backgroundColor=10b981&color=white",
                rating: 5,
                text: "Investasi terbaik untuk karir NDT. Instruktur sangat hands-on dan kasus studi relevan dengan industri."
              }
            ].map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`card-mobile relative bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-4 sm:p-6 border border-gray-100 gpu-accelerated ${
                  testimonial.highlight ? 'ring-2 ring-orange-500 ring-offset-2 sm:ring-offset-4' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {testimonial.highlight && (
                  <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-3 sm:px-4 py-1 rounded-full font-semibold shadow-lg">
                      Testimoni Unggulan
                    </span>
                  </div>
                )}

                <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">{testimonial.name}</div>
                    <div className="text-xs sm:text-sm text-gray-600 truncate">{testimonial.position}</div>
                    <div className="text-xs text-gray-500 mt-0.5 sm:mt-1 truncate">{testimonial.company}</div>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm italic text-responsive">
                  "{testimonial.text}"
                </p>

                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                  <div className="flex items-center text-xs text-gray-500">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {index === 0 ? 'Lulus 2024' : index === 1 ? 'Lulus 2023' : 'Lulus 2023'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-orange-50 to-blue-50 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-orange-200">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    {i === 1 ? 'B' : i === 2 ? 'S' : i === 3 ? 'A' : 'R'}
                  </div>
                ))}
              </div>
              <div className="text-xs sm:text-sm text-gray-700">
                <span className="font-semibold text-orange-600">500+</span> alumni berhasil di berbagai industri
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center">
            <div className="text-sm text-gray-600">Dipercaya oleh profesional dari perusahaan ternama</div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-6 items-center">
              {Array.from({length:6}).map((_,i)=>(
                <div key={i} className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                  <div className="text-xs font-medium text-gray-400">
                    {['PERTAMINA', 'SCHLUM', 'BADAK LNG', 'EXXON', 'CHEVRON', 'TOTAL'][i]}
                  </div>
                </div>
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
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/courses" className="inline-flex items-center justify-center rounded-md bg-gray-900 text-white px-5 py-3 text-sm font-medium hover:bg-black">
                Lihat Kursus
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                href={createWhatsAppLink('62812969535570', formatWhatsAppMessage({
                  name: 'Calon Peserta',
                  email: 'email@example.com',
                  phone: 'Nomor WhatsApp',
                  method: 'Info Umum',
                  note: 'Mendapatkan informasi tentang kursus NDT'
                }))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-green-600 text-white px-5 py-3 text-sm font-medium hover:bg-green-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-.31.08-1.26.33-.33-1.22.09-.32-.2-.29a8.188 8.188 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24z"/>
                </svg>
                Konsultasi WhatsApp
              </a>
            </div>
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
