"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Article extends Model {
        static associate(models) {
            Article.belongsTo(models.User, { foreignKey: 'authorId', as: 'author' });
            Article.hasMany(models.ArticleTag, { foreignKey: 'ArticleId', as: 'tags' });
            Article.hasMany(models.ArticleProgress, { foreignKey: 'ArticleId' });
        }
    }
    Article.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Title cannot be empty" },
                },
            },
            slug: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            excerpt: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            content: {
                type: DataTypes.TEXT,
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
            category: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            coverImage: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            readingTime: {
                type: DataTypes.INTEGER,
                defaultValue: 5,
            },
            published: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            featured: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            viewCount: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            authorId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Article",
        }
    );
    return Article;
};
