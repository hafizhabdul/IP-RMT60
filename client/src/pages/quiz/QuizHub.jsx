import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, BookOpen, ChevronRight, History } from 'lucide-react';
import { getQuizFilters } from '../../services/quizService';
import { MethodIcon } from '@/components/elearning/primitives';
import { useAuth } from '@/hooks/useAuth';
import QuizHistory from '@/components/quiz/QuizHistory';

const METHOD_INFO = {
    UT: { name: 'Ultrasonic Testing', desc: 'Pulse-echo, defect characterization, calibration.' },
    MT: { name: 'Magnetic Particle', desc: 'Flux leakage, particle selection, demag.' },
    PT: { name: 'Liquid Penetrant', desc: 'Capillary action, dwell time, excess removal.' },
    RT: { name: 'Radiographic Testing', desc: 'Sources, IQI, exposure, density.' },
    VT: { name: 'Visual Testing', desc: 'Lighting standards, weld profile, AWS D1.1.' },
    ET: { name: 'Eddy Current', desc: 'Skin depth, impedance plane, tubing.' },
};

export default function QuizHub() {
    const { isAuthenticated } = useAuth();
    const [filters, setFilters] = useState({ methods: [], levels: [] });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('practice');

    useEffect(() => {
        loadFilters();
    }, []);

    const loadFilters = async () => {
        try {
            const response = await getQuizFilters();
            setFilters(response.data || { methods: [], levels: [] });
        } catch (err) {
            console.error('Failed to load filters:', err);
            setFilters({
                methods: ['UT', 'RT', 'MT', 'PT', 'VT', 'ET'],
                levels: ['Level I', 'Level II', 'Level III'],
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 sm:space-y-7">
            {/* Header */}
            <div data-el-reveal="1">
                <div className="font-plexMono text-[11px] uppercase tracking-[0.12em] text-slate-500">
                    SNS NDT / E-Learning / Quiz Practice
                </div>
                <h1 className="mt-2 text-[28px] sm:text-[32px] font-bold tracking-tight leading-tight">
                    Quiz Practice
                </h1>
                <p className="text-[14px] text-slate-600 mt-1 max-w-[60ch]">
                    Latihan soal bergaya ASNT untuk persiapan sertifikasi. Lulus 75% untuk masuk grade pass.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 border-b border-slate-200" data-el-reveal="2">
                <TabButton
                    active={activeTab === 'practice'}
                    onClick={() => setActiveTab('practice')}
                    icon={<BookOpen className="h-3.5 w-3.5" />}
                    label="Latihan"
                />
                <TabButton
                    active={activeTab === 'history'}
                    onClick={() => setActiveTab('history')}
                    icon={<History className="h-3.5 w-3.5" />}
                    label="Riwayat & Analisis"
                />
            </div>

            {activeTab === 'history' ? (
                <section data-el-reveal="3">
                    <QuizHistory isAuthenticated={isAuthenticated} />
                </section>
            ) : (
                <>
            {/* Stats strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4" data-el-reveal="3">
                <StatCard
                    icon={<CheckCircle className="h-4 w-4" />}
                    title="Pass Threshold"
                    desc="Minimum 75% untuk lolos mock exam"
                />
                <StatCard
                    icon={<Clock className="h-4 w-4" />}
                    title="Timed Sessions"
                    desc="Simulasi tekanan ujian sertifikasi nyata"
                />
                <StatCard
                    icon={<BookOpen className="h-4 w-4" />}
                    title="Instant Feedback"
                    desc="Penjelasan tiap soal setelah submit"
                />
            </div>

            {/* Method picker */}
            <section data-el-reveal="3">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[18px] font-bold tracking-tight">Pilih Method</h2>
                    <span className="font-plexMono text-[11px] uppercase tracking-[0.08em] text-slate-500">
                        6 METHODS · 3 LEVELS
                    </span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(METHOD_INFO).map(([code, info]) => (
                        <MethodQuizCard key={code} code={code} info={info} />
                    ))}
                </div>
            </section>
                </>
            )}
        </div>
    );
}

function TabButton({ active, onClick, icon, label }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-semibold tracking-tight border-b-2 -mb-px transition-colors ${
                active
                    ? 'border-orange-500 text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
        >
            {icon}
            {label}
        </button>
    );
}

function StatCard({ icon, title, desc }) {
    return (
        <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5">
            <div className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-orange-50 text-orange-600 mb-3">
                {icon}
            </div>
            <div className="text-[14px] font-bold tracking-tight">{title}</div>
            <div className="text-[12.5px] text-slate-600 mt-0.5">{desc}</div>
        </div>
    );
}

function MethodQuizCard({ code, info }) {
    return (
        <article className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-orange-300 hover:shadow-el-card-hover transition-all">
            <div className="flex items-start justify-between mb-4">
                <MethodIcon method={code} size="md" />
                <span className="font-plexMono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                    NDT / {code}
                </span>
            </div>
            <h3 className="text-[18px] font-bold tracking-tight leading-snug mb-1">{info.name}</h3>
            <p className="text-[13px] text-slate-600 mb-5 line-clamp-2">{info.desc}</p>

            <div className="space-y-1.5">
                {['Level I', 'Level II'].map((level) => (
                    <Link
                        key={level}
                        to={`/e-learning/quizzes/take?method=${code}&level=${encodeURIComponent(level)}&count=10`}
                        className="group/link flex items-center justify-between rounded-md border border-slate-200 px-3 py-2.5 text-[13px] font-medium text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors"
                    >
                        <span>{level} · 10 questions</span>
                        <ArrowRight className="h-3.5 w-3.5 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all" />
                    </Link>
                ))}
            </div>
        </article>
    );
}
