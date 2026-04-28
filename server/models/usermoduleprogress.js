'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserModuleProgress extends Model {
    static associate(models) {
      UserModuleProgress.belongsTo(models.User, {
        foreignKey: 'UserId',
        as: 'user'
      });
      UserModuleProgress.belongsTo(models.Module, {
        foreignKey: 'ModuleId',
        as: 'module'
      });
    }
  }

  UserModuleProgress.init({
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    ModuleId: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.ENUM('not_started', 'in_progress', 'done'),
      allowNull: false,
      defaultValue: 'not_started'
    },
    completionPercent: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    startedAt: DataTypes.DATE,
    completedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserModuleProgress',
    tableName: 'UserModuleProgress'
  });

  return UserModuleProgress;
};
