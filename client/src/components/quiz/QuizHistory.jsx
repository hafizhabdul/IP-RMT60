import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    History,
    LogIn,
    CheckCircle,
    XCircle,
    Clock,
    TrendingDown,
    AlertTriangle,
    Loader2,
} from 'lucide-react';
import { getQuizHistory } from '../../services/quizService';
import { PASSING_SCORE } from '@/config/elearning';

const formatTime = (seconds) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const formatDate = (value) => {
    if (!value) return '-';
    try {
        return new Date(value).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    } catch {
        return '-';
    }
};

// Aggregate attempts into average score per method+level so the weakest
// areas surface to the top. Mirrors the server's score scale (0-100).
const buildWeakAreas = (attempts) => {
    const groups = {};
    attempts.forEach((a) => {
        const method = a.method || 'Umum';
        const level = a.level || '-';
        const key = `${method} · ${level}`;
        if (!groups[key]) {
            groups[key] = { method, level, total: 0, count: 0 };
        }
        groups[key].total += Number(a.score) || 0;
        groups[key].count += 1;
    });

    return Object.values(groups)
        .map((g) => ({
            method: g.method,
            level: g.level,
            attempts: g.count,
            average: Math.round((g.total / g.count) * 10) / 10,
        }))
        .sort((a, b) => a.average - b.average);
};

export default function QuizHistory({ isAuthenticated }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [attempts, setAttempts] = useState([]);
    const [stats, setStats] = useState({ totalAttempts: 0, averageScore: 0, passRate: 0 });

    useEffect(() => {
        let cancelled = false;

        if (!isAuthenticated) {
            setLoading(false);
            return undefined;
        }

        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                // Pull a wider window so per-method averages are meaningful.
                const response = await getQuizHistory({ limit: 50 });
                if (cancelled) return;
                setAttempts(Array.isArray(response.data) ? response.data : []);
                setStats(response.stats || { totalAttempts: 0, averageScore: 0, passRate: 0 });
            } catch (err) {
                if (cancelled) return;
                console.error('Failed to load quiz history:', err);
                setError('Gagal memuat riwayat quiz. Coba lagi nanti.');
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, [isAuthenticated]);

    // Not logged in — show a login hint.
    if (!isAuthenticated) {
        return (
            <div className="rounded-xl border border-orange-200 bg-orange-50 p-6 text-center">
                <LogIn className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h3 className="text-[16px] font-bold text-orange-900 mb-1">
                    Masuk untuk Melihat Riwayat
                </h3>
                <p className="text-[13px] text-orange-800 mb-4 max-w-[48ch] mx-auto">
                    Login untuk menyimpan hasil quiz, melihat riwayat percobaan, dan
                    mengetahui area yang masih perlu kamu perkuat.
                </p>
                <Link
                    to="/login?redirect=/e-learning/quizzes"
                    className="inline-block px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-[13px] font-semibold rounded-lg transition-colors"
                >
                    Masuk Sekarang
                </Link>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white p-10 flex flex-col items-center justify-center text-slate-500">
                <Loader2 className="h-6 w-6 animate-spin mb-2" />
                <p className="text-[13px]">Memuat riwayat...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
                <AlertTriangle className="h-7 w-7 text-red-500 mx-auto mb-2" />
                <p className="text-[13px] text-red-800">{error}</p>
            </div>
        );
    }

    // Empty state.
    if (attempts.length === 0) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
                <History className="h-8 w-8 text-slate-400 mx-auto mb-3" />
                <h3 className="text-[16px] font-bold tracking-tight mb-1">Belum Ada Riwayat</h3>
                <p className="text-[13px] text-slate-600 max-w-[44ch] mx-auto">
                    Kamu belum menyelesaikan quiz apa pun. Pilih method di atas untuk
                    memulai latihan pertamamu.
                </p>
            </div>
        );
    }

    const weakAreas = buildWeakAreas(attempts);
    const lowestAverage = weakAreas.length > 0 ? weakAreas[0].average : null;

    return (
        <div className="space-y-6">
            {/* Stats strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <SummaryCard label="Total Percobaan" value={stats.totalAttempts} />
                <SummaryCard
                    label="Rata-rata Skor"
                    value={`${Math.round(stats.averageScore)}%`}
                />
                <SummaryCard label="Tingkat Kelulusan" value={`${stats.passRate}%`} />
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
                {/* Recent attempts */}
                <section className="lg:col-span-3">
                    <h3 className="text-[15px] font-bold tracking-tight mb-3 flex items-center gap-2">
                        <History className="h-4 w-4 text-slate-500" />
                        Percobaan Terbaru
                    </h3>
                    <div className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100 overflow-hidden">
                        {attempts.slice(0, 10).map((a) => {
                            const score = Math.round(Number(a.score) || 0);
                            const passed = score >= PASSING_SCORE;
                            return (
                                <div
                                    key={a.id}
                                    className="flex items-center gap-3 px-4 py-3"
                                >
                                    <div
                                        className={`inline-flex items-center justify-center h-9 w-9 rounded-md shrink-0 ${
                                            passed
                                                ? 'bg-green-50 text-green-600'
                                                : 'bg-red-50 text-red-600'
                                        }`}
                                    >
                                        {passed ? (
                                            <CheckCircle className="h-4 w-4" />
                                        ) : (
                                            <XCircle className="h-4 w-4" />
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="text-[13.5px] font-semibold tracking-tight truncate">
                                            {a.method || 'Umum'}
                                            {a.level ? (
                                                <span className="text-slate-500 font-medium">
                                                    {' '}
                                                    · {a.level}
                                                </span>
                                            ) : null}
                                        </div>
                                        <div className="flex items-center gap-3 text-[11.5px] text-slate-500 mt-0.5">
                                            <span>{formatDate(a.completedAt)}</span>
                                            <span className="inline-flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {formatTime(a.timeSpent)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div
                                            className={`text-[16px] font-bold ${
                                                passed ? 'text-green-600' : 'text-red-600'
                                            }`}
                                        >
                                            {score}%
                                        </div>
                                        <div
                                            className={`font-plexMono text-[10px] uppercase tracking-[0.08em] ${
                                                passed ? 'text-green-600' : 'text-red-500'
                                            }`}
                                        >
                                            {passed ? 'Lulus' : 'Belum'}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Weak areas */}
                <section className="lg:col-span-2">
                    <h3 className="text-[15px] font-bold tracking-tight mb-3 flex items-center gap-2">
                        <TrendingDown className="h-4 w-4 text-slate-500" />
                        Area yang Perlu Diperkuat
                    </h3>
                    <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
                        <p className="text-[12px] text-slate-500">
                            Rata-rata skor per method &amp; level. Yang terendah ditandai.
                        </p>
                        {weakAreas.map((area, idx) => {
                            const isLowest = idx === 0 && lowestAverage < PASSING_SCORE;
                            const below = area.average < PASSING_SCORE;
                            return (
                                <div
                                    key={`${area.method}-${area.level}`}
                                    className={`rounded-lg border p-3 ${
                                        isLowest
                                            ? 'border-red-200 bg-red-50'
                                            : 'border-slate-200 bg-white'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-1.5">
                                        <div className="text-[13px] font-semibold tracking-tight flex items-center gap-1.5">
                                            {isLowest && (
                                                <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                                            )}
                                            {area.method}
                                            <span className="text-slate-500 font-medium">
                                                · {area.level}
                                            </span>
                                        </div>
                                        <span
                                            className={`text-[13px] font-bold ${
                                                below ? 'text-red-600' : 'text-slate-900'
                                            }`}
                                        >
                                            {area.average}%
                                        </span>
                                    </div>
                                    <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${
                                                below ? 'bg-red-400' : 'bg-green-500'
                                            }`}
                                            style={{
                                                width: `${Math.min(100, Math.max(0, area.average))}%`,
                                            }}
                                        />
                                    </div>
                                    <div className="text-[11px] text-slate-500 mt-1">
                                        {area.attempts} percobaan
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}

function SummaryCard({ label, value }) {
    return (
        <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-[24px] font-bold tracking-tight leading-none">{value}</div>
            <div className="text-[12px] text-slate-600 mt-1.5">{label}</div>
        </div>
    );
}
