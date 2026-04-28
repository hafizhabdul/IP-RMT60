'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserStepProgress extends Model {
    static associate(models) {
      UserStepProgress.belongsTo(models.User, {
        foreignKey: 'UserId',
        as: 'user'
      });
      UserStepProgress.belongsTo(models.LessonStep, {
        foreignKey: 'LessonStepId',
        as: 'lessonStep'
      });
    }
  }

  UserStepProgress.init({
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    LessonStepId: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.ENUM('not_started', 'in_progress', 'done'),
      allowNull: false,
      defaultValue: 'not_started'
    },
    score: DataTypes.FLOAT,
    timeSpentSeconds: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    startedAt: DataTypes.DATE,
    completedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserStepProgress',
    tableName: 'UserStepProgress'
  });

  return UserStepProgress;
};
