"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class QuizQuestion extends Model {
        static associate(models) {
            QuizQuestion.belongsTo(models.Lecture, { foreignKey: 'LectureId' });
            QuizQuestion.hasMany(models.QuizAttempt, { foreignKey: 'questionId' });
            QuizQuestion.hasMany(models.QuizQuestionTranslation, { foreignKey: 'QuizQuestionId', as: 'translations' });
        }
    }
    QuizQuestion.init(
        {
            question: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Question cannot be empty" },
                },
            },
            options: {
                type: DataTypes.JSONB,
                allowNull: false,
                defaultValue: [],
                validate: {
                    isValidOptions(value) {
                        if (!Array.isArray(value) || value.length < 2) {
                            throw new Error("At least 2 options are required");
                        }
                    }
                }
            },
            correctAnswer: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 0,
                },
            },
            explanation: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'general',
            },
            method: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: 'NDT method: UT, RT, MT, PT, ET, VT'
            },
            level: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: 'Level I',
            },
            difficulty: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: 'medium',
            },
            LectureId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "QuizQuestion",
        }
    );
    return QuizQuestion;
};
