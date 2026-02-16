const { QuizQuestion, QuizAttempt, User, QuizQuestionTranslation } = require('../models');
const { Op } = require('sequelize');
const { resolveLanguage } = require('../utils/language');

const applyTranslation = (record, translation) => {
    if (!translation) {
        return record;
    }
    return {
        ...record,
        question: translation.question || record.question,
        options: translation.options || record.options,
        explanation: translation.explanation ?? record.explanation
    };
};

class QuizController {
    // Get quiz questions with filters
    static async getQuestions(req, res, next) {
        try {
            const { method, level, category, limit = 10, random = 'true' } = req.query;
            const language = resolveLanguage(req);

            const where = {};
            if (method) where.method = method;
            if (level) where.level = level;
            if (category) where.category = category;

            let questions = await QuizQuestion.findAll({
                where,
                attributes: ['id', 'question', 'options', 'category', 'method', 'level', 'difficulty'],
                include: [
                    {
                        model: QuizQuestionTranslation,
                        as: 'translations',
                        required: false,
                        where: {
                            language
                        }
                    }
                ],
                // Don't include correctAnswer for security
                limit: parseInt(limit),
                order: random === 'true' ? [['id', 'ASC']] : [['createdAt', 'DESC']]
            });

            questions = questions.map((question) => {
                const record = question.toJSON();
                const translation = record.translations?.[0];
                delete record.translations;
                return applyTranslation(record, translation);
            });

            // Shuffle if random
            if (random === 'true') {
                questions = questions.sort(() => Math.random() - 0.5);
            }

            res.status(200).json({
                success: true,
                count: questions.length,
                data: questions
            });
        } catch (error) {
            next(error);
        }
    }

    // Get available methods and levels for filter
    static async getFilters(req, res, next) {
        try {
            const methods = await QuizQuestion.findAll({
                attributes: ['method'],
                group: ['method'],
                where: { method: { [Op.ne]: null } }
            });

            const levels = await QuizQuestion.findAll({
                attributes: ['level'],
                group: ['level'],
                where: { level: { [Op.ne]: null } }
            });

            const categories = await QuizQuestion.findAll({
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

    // Submit quiz and get results
    static async submitQuiz(req, res, next) {
        try {
            const { answers, method, level, timeSpent } = req.body;
            const userId = req.user.id;

            if (!answers || !Array.isArray(answers) || answers.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Answers array is required'
                });
            }

            // Get question IDs from answers
            const questionIds = answers.map(a => a.questionId);

            // Fetch correct answers from database
            const language = resolveLanguage(req);

            const questions = await QuizQuestion.findAll({
                where: { id: questionIds },
                attributes: ['id', 'correctAnswer', 'explanation'],
                include: [
                    {
                        model: QuizQuestionTranslation,
                        as: 'translations',
                        required: false,
                        where: {
                            language
                        }
                    }
                ]
            });

            // Create a map for quick lookup
            const questionMap = {};
            questions.forEach(q => {
                const record = q.toJSON();
                const translation = record.translations?.[0];
                questionMap[q.id] = {
                    correctAnswer: record.correctAnswer,
                    explanation: translation?.explanation ?? record.explanation
                };
            });

            // Calculate score
            let correctCount = 0;
            const gradedAnswers = answers.map(answer => {
                const question = questionMap[answer.questionId];
                const isCorrect = question && answer.selectedAnswer === question.correctAnswer;
                if (isCorrect) correctCount++;

                return {
                    questionId: answer.questionId,
                    selectedAnswer: answer.selectedAnswer,
                    correctAnswer: question ? question.correctAnswer : null,
                    isCorrect,
                    explanation: question ? question.explanation : null
                };
            });

            const score = (correctCount / answers.length) * 100;

            // Save attempt to database
            const attempt = await QuizAttempt.create({
                UserId: userId,
                method,
                level,
                totalQuestions: answers.length,
                correctAnswers: correctCount,
                score,
                answers: gradedAnswers,
                timeSpent,
                completedAt: new Date()
            });

            res.status(200).json({
                success: true,
                data: {
                    attemptId: attempt.id,
                    totalQuestions: answers.length,
                    correctAnswers: correctCount,
                    score: Math.round(score * 100) / 100,
                    passed: score >= 70,
                    timeSpent,
                    gradedAnswers
                }
            });
        } catch (error) {
            next(error);
        }
    }

    // Get user's quiz history
    static async getHistory(req, res, next) {
        try {
            const userId = req.user.id;
            const { method, level, limit = 10 } = req.query;

            const where = { UserId: userId };
            if (method) where.method = method;
            if (level) where.level = level;

            const attempts = await QuizAttempt.findAll({
                where,
                order: [['completedAt', 'DESC']],
                limit: parseInt(limit),
                attributes: ['id', 'method', 'level', 'totalQuestions', 'correctAnswers', 'score', 'timeSpent', 'completedAt']
            });

            // Calculate stats
            const stats = {
                totalAttempts: attempts.length,
                averageScore: attempts.length > 0
                    ? Math.round((attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length) * 100) / 100
                    : 0,
                passRate: attempts.length > 0
                    ? Math.round((attempts.filter(a => a.score >= 70).length / attempts.length) * 100)
                    : 0
            };

            res.status(200).json({
                success: true,
                stats,
                data: attempts
            });
        } catch (error) {
            next(error);
        }
    }

    // Get specific attempt details
    static async getAttempt(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            const attempt = await QuizAttempt.findOne({
                where: { id, UserId: userId }
            });

            if (!attempt) {
                return res.status(404).json({
                    success: false,
                    message: 'Attempt not found'
                });
            }

            res.status(200).json({
                success: true,
                data: attempt
            });
        } catch (error) {
            next(error);
        }
    }

    // Admin: Create question
    static async createQuestion(req, res, next) {
        try {
            const { question, options, correctAnswer, explanation, category, method, level, difficulty, LectureId } = req.body;

            const newQuestion = await QuizQuestion.create({
                question,
                options,
                correctAnswer,
                explanation,
                category,
                method,
                level,
                difficulty,
                LectureId
            });

            res.status(201).json({
                success: true,
                data: newQuestion
            });
        } catch (error) {
            next(error);
        }
    }

    // Admin: Update question
    static async updateQuestion(req, res, next) {
        try {
            const { id } = req.params;
            const updates = req.body;

            const question = await QuizQuestion.findByPk(id);
            if (!question) {
                return res.status(404).json({
                    success: false,
                    message: 'Question not found'
                });
            }

            await question.update(updates);

            res.status(200).json({
                success: true,
                data: question
            });
        } catch (error) {
            next(error);
        }
    }

    // Admin: Delete question
    static async deleteQuestion(req, res, next) {
        try {
            const { id } = req.params;

            const question = await QuizQuestion.findByPk(id);
            if (!question) {
                return res.status(404).json({
                    success: false,
                    message: 'Question not found'
                });
            }

            await question.destroy();

            res.status(200).json({
                success: true,
                message: 'Question deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    // Admin: Get all questions with answers
    static async getAllQuestions(req, res, next) {
        try {
            const { method, level, page = 1, limit = 20 } = req.query;

            const where = {};
            if (method) where.method = method;
            if (level) where.level = level;

            const offset = (parseInt(page) - 1) * parseInt(limit);

            const { count, rows: questions } = await QuizQuestion.findAndCountAll({
                where,
                limit: parseInt(limit),
                offset,
                order: [['createdAt', 'DESC']]
            });

            res.status(200).json({
                success: true,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    totalPages: Math.ceil(count / parseInt(limit))
                },
                data: questions
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = QuizController;
