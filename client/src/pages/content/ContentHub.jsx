import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { getArticles, getArticleFilters } from '../../services/articleService';

export default function ContentHub() {
    const [articles, setArticles] = useState([]);
    const [filters, setFilters] = useState({ methods: [], levels: [], categories: [] });
    const [loading, setLoading] = useState(true);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData();
    }, [selectedMethod, selectedLevel]);

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);
            const [articlesRes, filtersRes] = await Promise.all([
                getArticles({ method: selectedMethod, level: selectedLevel, limit: 20 }),
                getArticleFilters()
            ]);
            setArticles(articlesRes.data || []);
            setFilters(filtersRes.data || { methods: [], levels: [], categories: [] });
        } catch (err) {
            console.error('Failed to load articles:', err);
            setError(err.message || 'Failed to load articles');
        } finally {
            setLoading(false);
        }
    };

    const featuredArticle = articles.find(a => a.featured);
    const regularArticles = articles.filter(a => !a.featured);

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
                            onClick={loadData}
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
                                            {article.method}
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
                    </>
                )}
            </div>
        </div>
    );
}
