import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Search, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { getArticles, getArticleFilters } from '../../services/articleService';
import { MethodIcon } from '@/components/elearning/primitives';

const PAGE_SIZE = 9;

export default function ContentHub() {
    const [articles, setArticles] = useState([]);
    const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 });
    const [filters, setFilters] = useState({ methods: [], levels: [], categories: [] });
    const [loading, setLoading] = useState(true);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);

    useEffect(() => { loadFilters(); }, []);
    useEffect(() => { setPage(1); }, [selectedMethod, selectedLevel]);
    useEffect(() => { loadArticles(); }, [selectedMethod, selectedLevel, page]);

    const loadFilters = async () => {
        try {
            const filtersRes = await getArticleFilters();
            setFilters(filtersRes.data || { methods: [], levels: [], categories: [] });
        } catch (err) {
            console.error('Failed to load filters:', err);
        }
    };

    const loadArticles = async () => {
        try {
            setLoading(true);
            setError(null);
            const articlesRes = await getArticles({
                method: selectedMethod, level: selectedLevel, limit: PAGE_SIZE, page
            });
            setArticles(articlesRes.data || []);
            setPagination(articlesRes.pagination || { total: 0, page: 1, totalPages: 1 });
        } catch (err) {
            console.error('Failed to load articles:', err);
            setError(err.message || 'Failed to load articles');
        } finally {
            setLoading(false);
        }
    };

    const featuredArticle = page === 1 ? articles.find(a => a.featured) : null;
    const regularArticles = page === 1 ? articles.filter(a => !a.featured) : articles;
    const totalPages = pagination.totalPages || 1;

    return (
        <div className="space-y-6 sm:space-y-7">
            {/* Header */}
            <div data-el-reveal="1">
                <div className="font-plexMono text-[11px] uppercase tracking-[0.12em] text-slate-500">
                    SNS NDT / E-Learning / Knowledge Base
                </div>
                <h1 className="mt-2 text-[28px] sm:text-[32px] font-bold tracking-tight leading-tight">
                    Knowledge Base
                </h1>
                <p className="text-[14px] text-slate-600 mt-1 max-w-[60ch]">
                    Artikel teknis komprehensif tentang prinsip, teknik, dan standar NDT — referensi untuk self-study.
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center" data-el-reveal="2">
                <div className="font-plexMono text-[11px] uppercase tracking-[0.1em] text-slate-500">Filter:</div>
                <select
                    value={selectedMethod}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    className="rounded-md border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
                >
                    <option value="">Semua Method</option>
                    {filters.methods.map(method => (
                        <option key={method} value={method}>{method}</option>
                    ))}
                </select>
                <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="rounded-md border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
                >
                    <option value="">Semua Level</option>
                    {filters.levels.map(level => (
                        <option key={level} value={level}>{level}</option>
                    ))}
                </select>
                <div className="ml-auto font-plexMono text-[11px] uppercase tracking-[0.08em] text-slate-500 tabular-nums">
                    {pagination.total} ARTIKEL · {totalPages} HALAMAN
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-56 rounded-xl bg-slate-100 animate-pulse" />
                    ))}
                </div>
            ) : error ? (
                <div className="rounded-xl border-2 border-dashed border-rose-300 bg-rose-50 p-8 text-center">
                    <p className="text-rose-700 font-medium mb-2">Gagal load artikel</p>
                    <button
                        onClick={loadArticles}
                        className="text-sm text-rose-700 font-semibold hover:underline"
                    >
                        Coba lagi
                    </button>
                </div>
            ) : articles.length === 0 ? (
                <div className="rounded-xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
                    <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600 font-medium">Tidak ada artikel cocok kriteria.</p>
                    <button
                        onClick={() => { setSelectedMethod(''); setSelectedLevel(''); }}
                        className="mt-3 inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold text-sm"
                    >
                        Reset filter
                    </button>
                </div>
            ) : (
                <>
                    {/* Featured article */}
                    {featuredArticle && (
                        <Link
                            to={`/e-learning/content/${featuredArticle.slug}`}
                            className="group block relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-7 sm:p-9 text-white hover:from-slate-800 hover:to-slate-900 transition-colors"
                            data-el-reveal="3"
                        >
                            <div className="absolute -top-16 -right-16 w-64 h-64 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
                            <div className="relative flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-amber px-2.5 py-1 font-plexMono text-[10.5px] font-bold uppercase tracking-[0.08em] text-white">
                                            ★ Featured
                                        </span>
                                        {featuredArticle.method && (
                                            <span className="font-plexMono text-[10.5px] uppercase tracking-[0.1em] text-amber-400">
                                                {featuredArticle.method} · {featuredArticle.level}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-[24px] sm:text-[30px] font-bold tracking-tight leading-tight mb-3">
                                        {featuredArticle.title}
                                    </h3>
                                    <p className="text-slate-300 text-[15px] mb-5 max-w-2xl">{featuredArticle.excerpt}</p>
                                    <div className="inline-flex items-center gap-2 text-[14px] font-semibold group-hover:gap-3 transition-all">
                                        Baca artikel <ArrowRight className="h-4 w-4" />
                                    </div>
                                </div>
                                {featuredArticle.method && (
                                    <div className="hidden lg:block">
                                        <MethodIcon method={featuredArticle.method} size="lg" className="ring-2 ring-white/10" />
                                    </div>
                                )}
                            </div>
                        </Link>
                    )}

                    {/* Article grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" data-el-reveal="4">
                        {regularArticles.map(article => (
                            <Link
                                key={article.id}
                                to={`/e-learning/content/${article.slug}`}
                                className="group flex flex-col bg-white rounded-xl border border-slate-200 p-5 hover:shadow-el-card-hover hover:border-orange-300 transition-all"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        {article.method ? (
                                            <span className="font-plexMono text-[10.5px] font-semibold tracking-[0.08em] uppercase text-orange-600">
                                                {article.method}
                                            </span>
                                        ) : (
                                            <span className="font-plexMono text-[10.5px] font-semibold tracking-[0.08em] uppercase text-slate-500">
                                                GENERAL
                                            </span>
                                        )}
                                        <span className="text-slate-300">·</span>
                                        <span className="font-plexMono text-[10.5px] tracking-[0.08em] uppercase text-slate-500">
                                            {article.level}
                                        </span>
                                    </div>
                                    {article.category && (
                                        <span className="font-plexMono text-[10px] uppercase tracking-[0.06em] text-slate-400">
                                            {article.category}
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-[18px] font-bold tracking-tight leading-snug text-slate-900 mb-2 line-clamp-2 group-hover:text-orange-700 transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-[13.5px] text-slate-600 line-clamp-3 flex-grow">
                                    {article.excerpt}
                                </p>
                                <div className="mt-4 flex items-center justify-between pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-1.5 font-plexMono text-[11px] text-slate-500 tracking-[0.06em] uppercase">
                                        <Clock className="h-3 w-3" />
                                        {article.readingTime} min read
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-7 border-t border-slate-200">
                            <div className="font-plexMono text-[11px] uppercase tracking-[0.08em] text-slate-500">
                                Halaman <b className="text-slate-900 tabular-nums">{pagination.page}</b> / {totalPages}
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1 || loading}
                                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-2 text-[12.5px] font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="h-3.5 w-3.5" /> Prev
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1)
                                    .filter(n => {
                                        if (totalPages <= 5) return true;
                                        if (n === 1 || n === totalPages) return true;
                                        return Math.abs(n - page) <= 1;
                                    })
                                    .map((n, idx, arr) => {
                                        const prev = arr[idx - 1];
                                        const showGap = prev && n - prev > 1;
                                        return (
                                            <span key={n} className="flex items-center gap-2">
                                                {showGap && <span className="text-slate-400 px-1">…</span>}
                                                <button
                                                    type="button"
                                                    onClick={() => setPage(n)}
                                                    disabled={loading}
                                                    className={`min-w-[36px] h-9 rounded-md font-plexMono text-[12px] font-bold tabular-nums ${n === page
                                                        ? 'bg-orange-amber text-white shadow-el-orange'
                                                        : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    {n}
                                                </button>
                                            </span>
                                        );
                                    })}

                                <button
                                    type="button"
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page >= totalPages || loading}
                                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-2 text-[12.5px] font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    Next <ChevronRight className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
