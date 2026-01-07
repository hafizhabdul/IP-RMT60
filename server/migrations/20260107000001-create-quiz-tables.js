'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Create QuizQuestions table
        await queryInterface.createTable('QuizQuestions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            question: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            options: {
                type: Sequelize.JSONB,
                allowNull: false,
                defaultValue: []
            },
            correctAnswer: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            explanation: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            category: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'general'
            },
            method: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: 'NDT method: UT, RT, MT, PT, ET, VT'
            },
            level: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: 'Level I',
                comment: 'Certification level: Level I, Level II, Level III'
            },
            difficulty: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: 'medium',
                comment: 'easy, medium, hard'
            },
            LectureId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Lectures',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });

        // Create QuizAttempts table
        await queryInterface.createTable('QuizAttempts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            UserId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            method: {
                type: Sequelize.STRING,
                allowNull: true
            },
            level: {
                type: Sequelize.STRING,
                allowNull: true
            },
            totalQuestions: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            correctAnswers: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            score: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            answers: {
                type: Sequelize.JSONB,
                allowNull: true,
                comment: 'Array of { questionId, selectedAnswer, isCorrect }'
            },
            timeSpent: {
                type: Sequelize.INTEGER,
                allowNull: true,
                comment: 'Time spent in seconds'
            },
            completedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW')
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });

        // Add indexes
        await queryInterface.addIndex('QuizQuestions', ['method']);
        await queryInterface.addIndex('QuizQuestions', ['level']);
        await queryInterface.addIndex('QuizQuestions', ['category']);
        await queryInterface.addIndex('QuizAttempts', ['UserId']);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('QuizAttempts');
        await queryInterface.dropTable('QuizQuestions');
    }
};
