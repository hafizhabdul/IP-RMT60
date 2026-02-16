"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class LectureTranslation extends Model {
    static associate(models) {
      LectureTranslation.belongsTo(models.Lecture, {
        foreignKey: "LectureId",
        as: "lecture"
      });
    }
  }

  LectureTranslation.init(
    {
      LectureId: {
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
      technique: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "LectureTranslation",
      indexes: [
        {
          unique: true,
          fields: ["LectureId", "language"]
        }
      ]
    }
  );

  return LectureTranslation;
};
