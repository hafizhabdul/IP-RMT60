import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/enhancements.css';
import { LanguageContext } from '../context/LanguageContext';

export default function ELearningHub() {
    const { language, setLanguage } = useContext(LanguageContext);

    const translations = {
        id: {
            heroTitle: 'E-Learning Hub NDT',
            heroDescription:
                'Belajar Non-Destructive Testing dari dasar hingga siap sertifikasi, lewat simulasi, materi teori, dan latihan soal terverifikasi.',
            languageLabel: 'Bahasa',
            startHereTitle: 'Mulai Dari Sini',
            startHereItems: [
                {
                    title: '1. Kenali dasar NDT',
                    description: 'Pelajari definisi, tujuan, dan manfaat NDT untuk industri.',
                    action: 'Baca pengantar NDT',
                    link: '/e-learning/content'
                },
                {
                    title: '2. Pilih metode yang ingin dikuasai',
                    description: 'UT, MT, PT, RT, VT, dan ET — tiap metode punya aplikasi berbeda.',
                    action: 'Lihat simulasi metode',
                    link: '/e-learning/simulations'
                },
                {
                    title: '3. Uji kesiapan sertifikasi',
                    description: 'Latihan soal bergaya ASNT untuk Level I dan II.',
                    action: 'Mulai latihan soal',
                    link: '/e-learning/quizzes'
                }
            ],
            features: [
                {
                    title: 'Simulation Lab',
                    description: 'Simulasi interaktif fisika dan prosedur UT, MT, PT, RT.',
                    link: '/e-learning/simulations',
                    action: 'Buka Lab'
                },
                {
                    title: 'Knowledge Base',
                    description: 'Artikel teknis, ringkasan teori, dan panduan persiapan ujian.',
                    link: '/e-learning/content',
                    action: 'Jelajahi Materi'
                },
                {
                    title: 'Certification Prep',
                    description: 'Latihan soal dan evaluasi kemampuan seperti ujian sertifikasi.',
                    link: '/e-learning/quizzes',
                    action: 'Mulai Latihan'
                },
                {
                    title: 'Learning Paths',
                    description: 'Roadmap belajar terstruktur untuk Level I, II, dan III.',
                    action: 'Segera Hadir',
                    disabled: true
                }
            ],
            ndtIntroTitle: 'Apa Itu NDT?',
            ndtIntroDescription:
                'Non-Destructive Testing (NDT) adalah metode inspeksi untuk mendeteksi cacat material tanpa merusak komponen. Sertifikasi NDT dibutuhkan agar inspector mampu memastikan keselamatan dan kualitas peralatan industri.',
            availableTitle: 'Teknologi yang Tersedia',
            methods: [
                'Ultrasonic Testing (UT) — inspeksi dengan gelombang suara',
                'Magnetic Particle (MT) — deteksi cacat permukaan pada material ferromagnetik',
                'Liquid Penetrant (PT) — identifikasi retak halus pada permukaan',
                'Radiographic Testing (RT) — inspeksi internal menggunakan radiasi',
                'Visual Testing (VT) — pemeriksaan visual dan dimensi',
                'Eddy Current (ET) — inspeksi cepat berbasis arus induksi'
            ]
        },
        en: {
            heroTitle: 'NDT E-Learning Hub',
            heroDescription:
                'Learn Non-Destructive Testing from fundamentals to certification-ready, through simulations, theory, and verified practice assessments.',
            languageLabel: 'Language',
            startHereTitle: 'Start Here',
            startHereItems: [
                {
                    title: '1. Learn the NDT basics',
                    description: 'Understand the definition, purpose, and value of NDT in industry.',
                    action: 'Read NDT introduction',
                    link: '/e-learning/content'
                },
                {
                    title: '2. Choose a method to master',
                    description: 'UT, MT, PT, RT, VT, and ET — each method has a unique use case.',
                    action: 'Explore simulations',
                    link: '/e-learning/simulations'
                },
                {
                    title: '3. Validate certification readiness',
                    description: 'ASNT-style quizzes for Level I and II preparation.',
                    action: 'Start practice',
                    link: '/e-learning/quizzes'
                }
            ],
            features: [
                {
                    title: 'Simulation Lab',
                    description: 'Interactive physics simulations for UT, MT, PT, RT.',
                    link: '/e-learning/simulations',
                    action: 'Launch Lab'
                },
                {
                    title: 'Knowledge Base',
                    description: 'Technical articles, theory summaries, and study guides.',
                    link: '/e-learning/content',
                    action: 'Browse Articles'
                },
                {
                    title: 'Certification Prep',
                    description: 'Practice quizzes and assessments aligned with certification exams.',
                    link: '/e-learning/quizzes',
                    action: 'Start Practice'
                },
                {
                    title: 'Learning Paths',
                    description: 'Structured curriculum for Level I, II, and III.',
                    action: 'Coming Soon',
                    disabled: true
                }
            ],
            ndtIntroTitle: 'What Is NDT?',
            ndtIntroDescription:
                'Non-Destructive Testing (NDT) is an inspection method used to detect material flaws without damaging components. NDT certification ensures inspectors can maintain industrial safety and quality.',
            availableTitle: 'Available Technologies',
            methods: [
                'Ultrasonic Testing (UT) — sound wave inspection',
                'Magnetic Particle (MT) — surface flaw detection on ferromagnetic materials',
                'Liquid Penetrant (PT) — reveal fine surface cracks',
                'Radiographic Testing (RT) — internal inspection using radiation',
                'Visual Testing (VT) — visual and dimensional inspection',
                'Eddy Current (ET) — rapid inspection using induced currents'
            ]
        }
    };

    const t = translations[language];
    const features = t.features;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Minimal Hero */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
                            {t.languageLabel}
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setLanguage('id')}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                                    language === 'id'
                                        ? 'border-orange-500 text-orange-600 bg-orange-50'
                                        : 'border-gray-200 text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                Indonesia
                            </button>
                            <button
                                type="button"
                                onClick={() => setLanguage('en')}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                                    language === 'en'
                                        ? 'border-orange-500 text-orange-600 bg-orange-50'
                                        : 'border-gray-200 text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                English
                            </button>
                        </div>
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-bold text-gray-900 tracking-tight mb-4"
                    >
                        {t.heroTitle}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-xl text-gray-500 max-w-2xl font-light leading-relaxed"
                    >
                        {t.heroDescription}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-6"
                    >
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            {t.ndtIntroTitle}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            {t.ndtIntroDescription}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-6 text-gray-900">
                        <BookOpen className="h-5 w-5 text-orange-500" />
                        <h2 className="text-2xl font-semibold">{t.startHereTitle}</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {t.startHereItems.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <Link
                                    to={item.link}
                                    className="block h-full group bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:border-orange-200 hover:shadow-lg"
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {item.description}
                                    </p>
                                    <div className="flex items-center text-sm font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                                        {item.action}
                                        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            {feature.disabled ? (
                                <div
                                    aria-disabled="true"
                                    className="group bg-white rounded-xl p-8 border border-gray-200 transition-all duration-300 opacity-60 cursor-not-allowed h-full"
                                >
                                    <div className="flex flex-col h-full justify-between">
                                        <div>
                                            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                                {feature.description}
                                            </p>
                                        </div>
                                        <div className="flex items-center text-sm font-medium text-gray-900">
                                            {feature.action}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    to={feature.link}
                                    className="block group bg-white rounded-xl p-8 border border-gray-200 transition-all duration-300 hover:border-orange-200 hover:shadow-lg hover:-translate-y-1 h-full"
                                >
                                    <div className="flex flex-col h-full justify-between">
                                        <div>
                                            <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                                {feature.description}
                                            </p>
                                        </div>
                                        <div className="flex items-center text-sm font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                                            {feature.action}
                                            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Available Methods List */}
                <div className="mt-20">
                    <h2 className="text-xl font-semibold text-gray-900 mb-8 pb-4 border-b border-gray-200">
                        {t.availableTitle}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-x-8 gap-y-4 text-gray-600">
                        {t.methods.map((method) => (
                            <div key={method} className="flex items-center group">
                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3 group-hover:bg-orange-500 transition-colors"></span>
                                {method}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
