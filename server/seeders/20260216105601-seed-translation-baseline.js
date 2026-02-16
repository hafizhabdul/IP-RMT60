'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    const articles = await queryInterface.sequelize.query(
      'SELECT id, title, excerpt, content FROM "Articles"',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (articles.length) {
      await queryInterface.bulkInsert(
        'ArticleTranslations',
        articles.map((article) => ({
          ArticleId: article.id,
          language: 'id',
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          createdAt: now,
          updatedAt: now
        }))
      );
    }

    const lectures = await queryInterface.sequelize.query(
      'SELECT id, title, technique, description FROM "Lectures"',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (lectures.length) {
      await queryInterface.bulkInsert(
        'LectureTranslations',
        lectures.map((lecture) => ({
          LectureId: lecture.id,
          language: 'id',
          title: lecture.title,
          technique: lecture.technique,
          description: lecture.description,
          createdAt: now,
          updatedAt: now
        }))
      );
    }

    const lessons = await queryInterface.sequelize.query(
      'SELECT id, title, description FROM "Lessons"',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (lessons.length) {
      await queryInterface.bulkInsert(
        'LessonTranslations',
        lessons.map((lesson) => ({
          LessonId: lesson.id,
          language: 'id',
          title: lesson.title,
          description: lesson.description,
          createdAt: now,
          updatedAt: now
        }))
      );
    }

    const quizQuestions = await queryInterface.sequelize.query(
      'SELECT id, question, options, explanation FROM "QuizQuestions"',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (quizQuestions.length) {
      await queryInterface.bulkInsert(
        'QuizQuestionTranslations',
        quizQuestions.map((question) => ({
          QuizQuestionId: question.id,
          language: 'id',
          question: question.question,
          options: question.options,
          explanation: question.explanation,
          createdAt: now,
          updatedAt: now
        }))
      );
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('QuizQuestionTranslations', { language: 'id' });
    await queryInterface.bulkDelete('LessonTranslations', { language: 'id' });
    await queryInterface.bulkDelete('LectureTranslations', { language: 'id' });
    await queryInterface.bulkDelete('ArticleTranslations', { language: 'id' });
  }
};
