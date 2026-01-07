import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Eye, BookOpen, ChevronRight, User } from 'lucide-react';
import MarkdownRenderer from '../../components/content/MarkdownRenderer';
import { getArticle, getRelatedArticles } from '../../services/articleService';

export default function ArticlePage() {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadArticle();
    }, [slug]);

    const loadArticle = async () => {
        try {
            setLoading(true);
            setError(null);
            const [articleRes, relatedRes] = await Promise.all([
                getArticle(slug),
                getRelatedArticles(slug)
            ]);
            setArticle(articleRes.data);
            setRelated(relatedRes.data || []);
        } catch (err) {
            setError('Article not found');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading article...</p>
                </div>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">{error || 'Article not found'}</p>
                    <Link
                        to="/e-learning/content"
                        className="inline-block px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                    >
                        Back to Articles
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Link
                        to="/e-learning/content"
                        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back to Articles
                    </Link>

                    {/* Tags */}
                    <div className="flex items-center gap-2 mb-4">
                        {article.method && (
                            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-semibold rounded-full">
                                {article.method}
                            </span>
                        )}
                        {article.level && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                                {article.level}
                            </span>
                        )}
                        {article.category && (
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                                {article.category}
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>

                    {/* Excerpt */}
                    {article.excerpt && (
                        <p className="text-xl text-gray-600 mb-6">{article.excerpt}</p>
                    )}

                    {/* Meta */}
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {article.readingTime} min read
                        </span>
                        <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {article.viewCount} views
                        </span>
                        {article.author && (
                            <span className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {article.author.name || article.author.username}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <article className="bg-white rounded-xl border border-gray-200 p-8 md:p-12 shadow-sm">
                    <MarkdownRenderer content={article.content} />
                </article>

                {/* Related Articles */}
                {related.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {related.map(relatedArticle => (
                                <Link
                                    key={relatedArticle.id}
                                    to={`/e-learning/content/${relatedArticle.slug}`}
                                    className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-orange-300 transition-all group"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded">
                                            {relatedArticle.method}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors line-clamp-2">
                                        {relatedArticle.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {relatedArticle.readingTime} min read
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <div className="mt-12 flex justify-center">
                    <Link
                        to="/e-learning/content"
                        className="px-6 py-3 border-2 border-gray-300 hover:border-orange-500 text-gray-700 hover:text-orange-600 font-semibold rounded-lg transition-colors flex items-center gap-2"
                    >
                        <BookOpen className="h-5 w-5" />
                        Browse More Articles
                    </Link>
                </div>
            </div>
        </div>
    );
}
