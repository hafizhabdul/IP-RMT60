"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ArticleTag extends Model {
        static associate(models) {
            ArticleTag.belongsTo(models.Article, { foreignKey: 'ArticleId' });
        }
    }
    ArticleTag.init(
        {
            ArticleId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            tag: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "ArticleTag",
        }
    );
    return ArticleTag;
};
