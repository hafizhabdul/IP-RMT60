import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Eye, ChevronRight, Search } from 'lucide-react';
import { getArticles, getArticleFilters } from '../../services/articleService';

export default function ContentHub() {
    const [articles, setArticles] = useState([]);
    const [filters, setFilters] = useState({ methods: [], levels: [], categories: [] });
    const [loading, setLoading] = useState(true);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');

    useEffect(() => {
        loadData();
    }, [selectedMethod, selectedLevel]);

    const loadData = async () => {
        try {
            setLoading(true);
            const [articlesRes, filtersRes] = await Promise.all([
                getArticles({ method: selectedMethod, level: selectedLevel, limit: 20 }),
                getArticleFilters()
            ]);
            setArticles(articlesRes.data || []);
            setFilters(filtersRes.data || { methods: [], levels: [], categories: [] });
        } catch (err) {
            console.error('Failed to load articles:', err);
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Link
                        to="/e-learning"
                        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Kembali ke E-Learning Hub
                    </Link>
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-orange-50 rounded-lg">
                            <BookOpen className="h-8 w-8 text-orange-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Educational Content</h1>
                            <p className="mt-2 text-gray-600 max-w-3xl">
                                Comprehensive articles on NDT principles, techniques, and standards.
                                Build your theoretical knowledge with our expert-written content.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-wrap gap-4">
                        <select
                            value={selectedMethod}
                            onChange={(e) => setSelectedMethod(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                            <option value="">All Methods</option>
                            {filters.methods.map(method => (
                                <option key={method} value={method}>{method}</option>
                            ))}
                        </select>

                        <select
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading articles...</p>
                    </div>
                ) : articles.length === 0 ? (
                    <div className="text-center py-12">
                        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No articles found. Content coming soon!</p>
                    </div>
                ) : (
                    <>
                        {/* Featured Article */}
                        {featuredArticle && (
                            <div className="mb-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Featured Article</h2>
                                <Link
                                    to={`/e-learning/content/${featuredArticle.slug}`}
                                    className="block bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 text-white hover:shadow-lg transition-shadow group"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
                                                {featuredArticle.method} • {featuredArticle.level}
                                            </span>
                                            <h3 className="text-2xl font-bold mb-2">{featuredArticle.title}</h3>
                                            <p className="text-orange-100 mb-4">{featuredArticle.excerpt}</p>
                                            <div className="flex items-center gap-4 text-sm text-orange-100">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    {featuredArticle.readingTime} min read
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Eye className="h-4 w-4" />
                                                    {featuredArticle.viewCount} views
                                                </span>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </Link>
                            </div>
                        )}

                        {/* Article Grid */}
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">All Articles</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {regularArticles.map(article => (
                                <Link
                                    key={article.id}
                                    to={`/e-learning/content/${article.slug}`}
                                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-orange-300 transition-all group"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded">
                                            {article.method}
                                        </span>
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                            {article.level}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                        {article.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {article.readingTime} min
                                        </span>
                                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
