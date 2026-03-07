const { Article, ArticleTag, ArticleProgress, User, ArticleTranslation, sequelize } = require('../models');
const { Op } = require('sequelize');
const { resolveLanguage } = require('../utils/language');

const applyTranslation = (record, translation) => {
    if (!translation) {
        return record;
    }
    return {
        ...record,
        title: translation.title || record.title,
        excerpt: translation.excerpt ?? record.excerpt,
        content: translation.content || record.content
    };
};

class ArticleController {
    // Get all published articles with filters
    static async getArticles(req, res, next) {
        try {
            const { method, level, category, featured, limit = 10, page = 1 } = req.query;

            const where = { published: true };
            if (method) where.method = method;
            if (level) where.level = level;
            if (category) where.category = category;
            if (featured === 'true') where.featured = true;

            const offset = (parseInt(page) - 1) * parseInt(limit);

            const language = resolveLanguage(req);

            const { count, rows: articles } = await Article.findAndCountAll({
                where,
                attributes: ['id', 'title', 'slug', 'excerpt', 'method', 'level', 'category', 'coverImage', 'readingTime', 'featured', 'viewCount', 'createdAt'],
                include: [
                    {
                        model: ArticleTranslation,
                        as: 'translations',
                        required: false,
                        where: {
                            language
                        }
                    }
                ],
                limit: parseInt(limit),
                offset,
                order: [['createdAt', 'DESC']]
            });

            const translatedArticles = articles.map((article) => {
                const record = article.toJSON();
                const translation = record.translations?.[0];
                delete record.translations;
                return applyTranslation(record, translation);
            });

            res.status(200).json({
                success: true,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    totalPages: Math.ceil(count / parseInt(limit))
                },
                data: translatedArticles
            });
        } catch (error) {
            next(error);
        }
    }

    // Get single article by slug
    static async getArticle(req, res, next) {
        try {
            const { slug } = req.params;
            const language = resolveLanguage(req);

            const article = await Article.findOne({
                where: { slug, published: true },
                include: [
                    {
                        model: ArticleTranslation,
                        as: 'translations',
                        required: false,
                        where: {
                            language
                        }
                    }
                ]
            });

            if (!article) {
                return res.status(404).json({
                    success: false,
                    message: 'Article not found'
                });
            }

            // Increment view count
            await article.increment('viewCount');

            const articleData = article.toJSON();
            const translation = articleData.translations?.[0];
            delete articleData.translations;

            res.status(200).json({
                success: true,
                data: applyTranslation(articleData, translation)
            });
        } catch (error) {
            next(error);
        }
    }

    // Get available filters
    static async getFilters(req, res, next) {
        try {
            const methods = await Article.findAll({
                where: { published: true, method: { [Op.ne]: null } },
                attributes: ['method'],
                group: ['method']
            });

            const levels = await Article.findAll({
                where: { published: true, level: { [Op.ne]: null } },
                attributes: ['level'],
                group: ['level']
            });

            const categories = await Article.findAll({
                where: { published: true, category: { [Op.ne]: null } },
                attributes: ['category'],
                group: ['category']
            });

            res.status(200).json({
                success: true,
                data: {
                    methods: methods.map(m => m.method),
                    levels: levels.map(l => l.level),
                    categories: categories.map(c => c.category)
                }
            });
        } catch (error) {
            next(error);
        }
    }

    // Track reading progress
    static async updateProgress(req, res, next) {
        try {
            const { articleId } = req.params;
            const { progress, completed } = req.body;
            const userId = req.user.id;

            const articleProgress = await sequelize.transaction(async (t) => {
                const [record, created] = await ArticleProgress.findOrCreate({
                    where: { UserId: userId, ArticleId: articleId },
                    defaults: { progress, completed, lastReadAt: new Date() },
                    lock: t.LOCK.UPDATE,
                    transaction: t
                });

                if (!created) {
                    await record.update({
                        progress: Math.max(record.progress, progress || 0),
                        completed: completed || record.completed,
                        lastReadAt: new Date()
                    }, { transaction: t });
                }

                return record;
            });

            res.status(200).json({
                success: true,
                data: articleProgress
            });
        } catch (error) {
            next(error);
        }
    }

    // Get user's reading progress
    static async getUserProgress(req, res, next) {
        try {
            const userId = req.user.id;

            const progress = await ArticleProgress.findAll({
                where: { UserId: userId },
                include: [
                    {
                        model: Article,
                        attributes: ['id', 'title', 'slug', 'method', 'level']
                    }
                ],
                order: [['lastReadAt', 'DESC']]
            });

            const stats = {
                totalRead: progress.length,
                completed: progress.filter(p => p.completed).length,
                inProgress: progress.filter(p => !p.completed).length
            };

            res.status(200).json({
                success: true,
                stats,
                data: progress
            });
        } catch (error) {
            next(error);
        }
    }

    // Get related articles
    static async getRelated(req, res, next) {
        try {
            const { slug } = req.params;

            const language = resolveLanguage(req);

            const currentArticle = await Article.findOne({
                where: { slug, published: true },
                attributes: ['id', 'method', 'level', 'category']
            });

            if (!currentArticle) {
                return res.status(404).json({
                    success: false,
                    message: 'Article not found'
                });
            }

            const related = await Article.findAll({
                where: {
                    id: { [Op.ne]: currentArticle.id },
                    published: true,
                    [Op.or]: [
                        { method: currentArticle.method },
                        { level: currentArticle.level },
                        { category: currentArticle.category }
                    ]
                },
                attributes: ['id', 'title', 'slug', 'excerpt', 'method', 'level', 'readingTime'],
                include: [
                    {
                        model: ArticleTranslation,
                        as: 'translations',
                        required: false,
                        where: {
                            language
                        }
                    }
                ],
                limit: 3,
                order: [['viewCount', 'DESC']]
            });

            const relatedTranslated = related.map((item) => {
                const record = item.toJSON();
                const translation = record.translations?.[0];
                delete record.translations;
                return applyTranslation(record, translation);
            });

            res.status(200).json({
                success: true,
                data: relatedTranslated
            });
        } catch (error) {
            next(error);
        }
    }

    // Search articles
    static async search(req, res, next) {
        try {
            const { q, limit = 10 } = req.query;
            const language = resolveLanguage(req);

            if (!q || q.length < 2) {
                return res.status(400).json({
                    success: false,
                    message: 'Search query must be at least 2 characters'
                });
            }

            const articles = await Article.findAll({
                where: {
                    published: true,
                    [Op.or]: [
                        { title: { [Op.iLike]: `%${q}%` } },
                        { excerpt: { [Op.iLike]: `%${q}%` } },
                        { content: { [Op.iLike]: `%${q}%` } },
                        { '$translations.title$': { [Op.iLike]: `%${q}%` } },
                        { '$translations.excerpt$': { [Op.iLike]: `%${q}%` } },
                        { '$translations.content$': { [Op.iLike]: `%${q}%` } }
                    ]
                },
                attributes: ['id', 'title', 'slug', 'excerpt', 'method', 'level', 'readingTime'],
                include: [
                    {
                        model: ArticleTranslation,
                        as: 'translations',
                        required: false,
                        where: {
                            language
                        }
                    }
                ],
                limit: parseInt(limit),
                order: [['viewCount', 'DESC']]
            });

            const translatedArticles = articles.map((article) => {
                const record = article.toJSON();
                const translation = record.translations?.[0];
                delete record.translations;
                return applyTranslation(record, translation);
            });

            res.status(200).json({
                success: true,
                count: translatedArticles.length,
                data: translatedArticles
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ArticleController;
