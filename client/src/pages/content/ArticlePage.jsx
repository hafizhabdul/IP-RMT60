import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Eye, BookOpen, User } from 'lucide-react';
import MarkdownRenderer from '../../components/content/MarkdownRenderer';
import { getArticle, getRelatedArticles } from '../../services/articleService';
import { MethodIcon } from '@/components/elearning/primitives';

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
            <div className="space-y-6 max-w-3xl">
                <div className="h-4 w-32 bg-slate-100 rounded animate-pulse" />
                <div className="h-12 w-3/4 bg-slate-100 rounded animate-pulse" />
                <div className="h-6 w-2/3 bg-slate-100 rounded animate-pulse" />
                <div className="space-y-3 mt-8">
                    {[1, 2, 3, 4].map((i) => <div key={i} className="h-4 bg-slate-100 rounded animate-pulse" />)}
                </div>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="rounded-xl border-2 border-dashed border-slate-200 bg-white p-12 sm:p-16 text-center">
                <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-700 font-semibold mb-2">Artikel tidak ditemukan</p>
                <p className="text-[13.5px] text-slate-500 mb-5">Mungkin sudah dihapus atau slug tidak valid.</p>
                <Link
                    to="/e-learning/content"
                    className="inline-flex items-center gap-2 rounded-md bg-orange-amber px-5 py-2.5 text-[13px] font-semibold text-white shadow-el-orange"
                >
                    Kembali ke Knowledge Base <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-7">
            {/* Breadcrumb */}
            <Link
                to="/e-learning/content"
                className="inline-flex items-center gap-2 font-plexMono text-[11px] uppercase tracking-[0.1em] text-slate-500 hover:text-orange-600"
            >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Knowledge Base
            </Link>

            {/* Header card */}
            <header className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-7 sm:p-10 text-white" data-el-reveal="1">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="relative">
                    <div className="flex items-center gap-3 flex-wrap mb-4">
                        {article.method && (
                            <MethodIcon method={article.method} size="sm" className="ring-2 ring-white/10" />
                        )}
                        <div className="font-plexMono text-[10.5px] uppercase tracking-[0.12em] text-amber-400">
                            {article.method ? `${article.method} · ` : ''}{article.level}
                        </div>
                        {article.category && (
                            <span className="font-plexMono text-[10.5px] uppercase tracking-[0.12em] text-slate-400">
                                · {article.category}
                            </span>
                        )}
                    </div>
                    <h1 className="text-[30px] sm:text-[42px] font-bold leading-tight tracking-tight max-w-[24ch]">
                        {article.title}
                    </h1>
                    {article.excerpt && (
                        <p className="mt-4 text-[16px] sm:text-[17px] text-slate-300 max-w-[60ch]">
                            {article.excerpt}
                        </p>
                    )}
                    <div className="mt-6 flex flex-wrap items-center gap-5 font-plexMono text-[11px] uppercase tracking-[0.08em] text-slate-400">
                        <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" /> {article.readingTime} min read
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Eye className="h-3.5 w-3.5" /> {article.viewCount} views
                        </span>
                        {article.author && (
                            <span className="flex items-center gap-1.5">
                                <User className="h-3.5 w-3.5" />
                                {article.author.name || article.author.username}
                            </span>
                        )}
                    </div>
                </div>
            </header>

            {/* Content */}
            <article className="bg-white rounded-xl border border-slate-200 px-6 py-7 sm:px-10 sm:py-10 max-w-[820px]" data-el-reveal="2">
                <MarkdownRenderer content={article.content} />
            </article>

            {/* Related */}
            {related.length > 0 && (
                <section className="pt-2" data-el-reveal="3">
                    <div className="font-plexMono text-[11px] uppercase tracking-[0.12em] text-slate-500 mb-3">
                        ◉ Related articles
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        {related.map((relatedArticle) => (
                            <Link
                                key={relatedArticle.id}
                                to={`/e-learning/content/${relatedArticle.slug}`}
                                className="group bg-white rounded-xl border border-slate-200 p-4 hover:shadow-el-card-hover hover:border-orange-300 transition-all"
                            >
                                <div className="flex items-center gap-2 mb-2 font-plexMono text-[10.5px] uppercase tracking-[0.08em]">
                                    <span className="text-orange-600 font-semibold">
                                        {relatedArticle.method || 'GENERAL'}
                                    </span>
                                    <span className="text-slate-300">·</span>
                                    <span className="text-slate-500">{relatedArticle.level}</span>
                                </div>
                                <h3 className="font-bold text-[14.5px] tracking-tight leading-snug text-slate-900 line-clamp-2 group-hover:text-orange-700 transition-colors">
                                    {relatedArticle.title}
                                </h3>
                                <div className="mt-3 flex items-center gap-1.5 font-plexMono text-[11px] text-slate-500">
                                    <Clock className="h-3 w-3" /> {relatedArticle.readingTime} min
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Bottom CTA */}
            <div className="flex justify-center pt-2">
                <Link
                    to="/e-learning/content"
                    className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-3 text-[13px] font-semibold text-slate-700 hover:border-orange-300 hover:text-orange-700"
                >
                    <BookOpen className="h-4 w-4" /> Browse all articles
                </Link>
            </div>
        </div>
    );
}
