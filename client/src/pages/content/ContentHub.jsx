import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { getArticles, getArticleFilters } from '../../services/articleService';

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

    useEffect(() => {
        loadFilters();
    }, []);

    useEffect(() => {
        // reset page when filter changes
        setPage(1);
    }, [selectedMethod, selectedLevel]);

    useEffect(() => {
        loadArticles();
    }, [selectedMethod, selectedLevel, page]);

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
                method: selectedMethod,
                level: selectedLevel,
                limit: PAGE_SIZE,
                page
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

    // Featured only on first page; otherwise treat all as regular
    const featuredArticle = page === 1 ? articles.find(a => a.featured) : null;
    const regularArticles = page === 1 ? articles.filter(a => !a.featured) : articles;
    const totalPages = pagination.totalPages || 1;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Link
                        to="/e-learning"
                        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Hub
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Technical Knowledge Base</h1>
                    <p className="mt-4 text-xl text-gray-500 max-w-3xl font-light">
                        Comprehensive articles on NDT principles, techniques, and standards.
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-wrap gap-4">
                        <select
                            value={selectedMethod}
                            onChange={(e) => setSelectedMethod(e.target.value)}
                            className="bg-gray-50 border-transparent text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2.5 hover:bg-gray-100 transition-colors"
                        >
                            <option value="">All Methods</option>
                            {filters.methods.map(method => (
                                <option key={method} value={method}>{method}</option>
                            ))}
                        </select>

                        <select
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                            className="bg-gray-50 border-transparent text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2.5 hover:bg-gray-100 transition-colors"
                        >
                            <option value="">All Levels</option>
                            {filters.levels.map(level => (
                                <option key={level} value={level}>{level}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-orange-500 border-t-transparent mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading library...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-12 bg-red-50 rounded-lg border border-red-100">
                        <p className="text-red-600 mb-2">Unable to load content</p>
                        <button
                            onClick={loadArticles}
                            className="text-sm text-red-700 font-medium hover:underline"
                        >
                            Try again
                        </button>
                    </div>
                ) : articles.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl border border-gray-200 border-dashed">
                        <p className="text-gray-500">No articles match your criteria.</p>
                    </div>
                ) : (
                    <>
                        {/* Featured Article */}
                        {featuredArticle && (
                            <div className="mb-12">
                                <Link
                                    to={`/e-learning/content/${featuredArticle.slug}`}
                                    className="block bg-gray-900 rounded-2xl p-8 md:p-12 text-white hover:bg-black transition-colors group relative overflow-hidden"
                                >
                                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-6">
                                                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium backdrop-blur-sm">
                                                    Featured
                                                </span>
                                                <span className="text-gray-400 text-sm flex items-center gap-2">
                                                    {featuredArticle.method} • {featuredArticle.level}
                                                </span>
                                            </div>
                                            <h3 className="text-3xl font-bold mb-4 leading-tight">{featuredArticle.title}</h3>
                                            <p className="text-gray-400 text-lg mb-8 max-w-2xl">{featuredArticle.excerpt}</p>

                                            <div className="flex items-center gap-2 text-white font-medium group-hover:gap-3 transition-all">
                                                Read Article <ArrowRight className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}

                        {/* Article Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {regularArticles.map(article => (
                                <Link
                                    key={article.id}
                                    to={`/e-learning/content/${article.slug}`}
                                    className="flex flex-col bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-orange-200 transition-all group"
                                >
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-xs font-semibold text-orange-600 tracking-wider uppercase">
                                            {article.method || 'GENERAL'}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            •
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {article.level}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 line-clamp-3 text-sm flex-grow">
                                        {article.excerpt}
                                    </p>
                                    <div className="flex items-center text-xs text-gray-400 mt-auto pt-4 border-t border-gray-50">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {article.readingTime} min read
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200">
                                <div className="text-sm text-gray-500">
                                    Menampilkan halaman <b className="text-gray-900 font-semibold">{pagination.page}</b> dari{' '}
                                    <b className="text-gray-900 font-semibold">{totalPages}</b> · total{' '}
                                    <b className="text-gray-900 font-semibold">{pagination.total}</b> artikel
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1 || loading}
                                        className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft className="h-4 w-4" /> Prev
                                    </button>

                                    {/* Page buttons (max 5 visible) */}
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
                                                    {showGap && <span className="text-gray-400 px-1">…</span>}
                                                    <button
                                                        type="button"
                                                        onClick={() => setPage(n)}
                                                        disabled={loading}
                                                        className={`min-w-[36px] h-9 rounded-md text-sm font-semibold ${
                                                            n === page
                                                                ? 'bg-orange-600 text-white shadow-sm'
                                                                : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
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
                                        className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        Next <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
