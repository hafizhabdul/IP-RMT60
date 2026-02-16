"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class QuizQuestionTranslation extends Model {
    static associate(models) {
      QuizQuestionTranslation.belongsTo(models.QuizQuestion, {
        foreignKey: "QuizQuestionId",
        as: "quizQuestion"
      });
    }
  }

  QuizQuestionTranslation.init(
    {
      QuizQuestionId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false
      },
      question: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      options: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: []
      },
      explanation: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: "QuizQuestionTranslation",
      indexes: [
        {
          unique: true,
          fields: ["QuizQuestionId", "language"]
        }
      ]
    }
  );

  return QuizQuestionTranslation;
};
