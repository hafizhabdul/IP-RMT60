"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ArticleProgress extends Model {
        static associate(models) {
            ArticleProgress.belongsTo(models.User, { foreignKey: 'UserId' });
            ArticleProgress.belongsTo(models.Article, { foreignKey: 'ArticleId' });
        }
    }
    ArticleProgress.init(
        {
            UserId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            ArticleId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            completed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            progress: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            lastReadAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: "ArticleProgress",
            indexes: [
                {
                    unique: true,
                    fields: ['UserId', 'ArticleId']
                }
            ]
        }
    );
    return ArticleProgress;
};
