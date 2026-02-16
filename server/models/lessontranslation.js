"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class LessonTranslation extends Model {
    static associate(models) {
      LessonTranslation.belongsTo(models.Lesson, {
        foreignKey: "LessonId",
        as: "lesson"
      });
    }
  }

  LessonTranslation.init(
    {
      LessonId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: "LessonTranslation",
      indexes: [
        {
          unique: true,
          fields: ["LessonId", "language"]
        }
      ]
    }
  );

  return LessonTranslation;
};
