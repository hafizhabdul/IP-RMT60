"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class QuizAttempt extends Model {
        static associate(models) {
            QuizAttempt.belongsTo(models.User, { foreignKey: 'UserId' });
        }
    }
    QuizAttempt.init(
        {
            UserId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            method: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            level: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            totalQuestions: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            correctAnswers: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            score: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            answers: {
                type: DataTypes.JSONB,
                allowNull: true,
                defaultValue: [],
                comment: 'Array of { questionId, selectedAnswer, isCorrect }'
            },
            timeSpent: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: 'Time spent in seconds'
            },
            completedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: "QuizAttempt",
        }
    );
    return QuizAttempt;
};
