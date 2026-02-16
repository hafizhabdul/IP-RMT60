"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ArticleTranslation extends Model {
    static associate(models) {
      ArticleTranslation.belongsTo(models.Article, {
        foreignKey: "ArticleId",
        as: "article"
      });
    }
  }

  ArticleTranslation.init(
    {
      ArticleId: {
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
      excerpt: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "ArticleTranslation",
      indexes: [
        {
          unique: true,
          fields: ["ArticleId", "language"]
        }
      ]
    }
  );

  return ArticleTranslation;
};
