import { Link } from 'react-router-dom';
import { VIDEO_PATHS, VIDEO_SETTINGS } from '../config/images';
import { useState, useEffect } from 'react';
import '../styles/hero.css';

export default function HeroVideo() {
  const videoUrl = import.meta.env.VITE_HERO_VIDEO_URL || VIDEO_PATHS.demo;
  const poster = VIDEO_SETTINGS.poster || '/video-poster.jpg';
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative text-white overflow-hidden min-h-screen video-overlay" style={{ backgroundColor: '#0f172a' }}>
      {/* Video Background with enhanced effects */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-70' : 'opacity-0'} ${!isLoaded ? 'video-loading' : ''}`}>
        <video
          className="h-full w-full object-cover transform scale-105"
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload={VIDEO_SETTINGS.preload}
          poster={poster}
          onLoadStart={() => setIsLoaded(false)}
          onCanPlay={() => setIsLoaded(true)}
          onError={(e) => {
            console.warn('Video failed to load, using fallback');
            // Fallback to placeholder if video fails
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Simple overlay elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32 min-h-screen flex flex-col justify-center">
        <div className={`space-y-6 transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

          {/* Enhanced logo with animation */}
          <div className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="SNS - Sar NDT Services"
              className="h-12 w-auto opacity-90 transform hover:scale-105 transition-transform duration-300"
            />
            <div className="h-8 w-px bg-white/30" />
            <span className="text-white/70 text-sm font-medium tracking-wider uppercase">SINCE 2020</span>
          </div>

          {/* Enhanced heading with better typography */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Industrial NDT
              </span>
              <span className="block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mt-2">
                Training & Certification
              </span>
            </h1>

            {/* Simple underline */}
            <div className="h-1 w-32 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" />
          </div>

          {/* Enhanced description */}
          <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
            Pelatihan praktis dan sertifikasi NDT <span className="text-orange-400 font-semibold">(PT, MT, UT, ET, PAUT, RT)</span> yang dirancang untuk teknisi dan engineer industri dengan standar internasional.
          </p>

          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              to="/schedule"
              className="group relative hero-button-primary inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 px-8 py-4 text-base font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25"
            >
              <span className="flex items-center">
                Lihat Jadwal Training
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>

            <Link
              to="/enroll"
              className="group inline-flex items-center justify-center rounded-lg border-2 border-white/40 hover:border-white/60 hover:bg-white/10 px-8 py-4 text-base font-semibold backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <span className="flex items-center">
                Daftar Sekarang
                <svg className="ml-2 w-5 h-5 transform group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Certifications */}
          <div className="flex flex-wrap items-center gap-3 pt-6">
            {["ISO 9712", "ASNT SNT-TC-1A", "K3 Industrial", "Internasional Certified"].map((badge) => (
              <span
                key={badge}
                className="text-sm rounded-full border border-white/30 px-4 py-2 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="pt-8 border-t border-white/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-6 text-white/70 text-sm">
                <span>1000+ Alumni</span>
                <span>Expert Instructor</span>
              </div>
              <div className="text-white/60 text-xs">
                Trusted by 50+ Industrial Companies
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <svg className="w-6 h-6 text-white/50 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

