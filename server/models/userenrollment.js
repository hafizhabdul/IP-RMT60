'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserEnrollment extends Model {
    static associate(models) {
      UserEnrollment.belongsTo(models.User, {
        foreignKey: 'UserId',
        as: 'user'
      });
      UserEnrollment.belongsTo(models.LearningPath, {
        foreignKey: 'LearningPathId',
        as: 'learningPath'
      });
      UserEnrollment.belongsTo(models.Module, {
        foreignKey: 'currentModuleId',
        as: 'currentModule'
      });
      UserEnrollment.belongsTo(models.LessonStep, {
        foreignKey: 'currentStepId',
        as: 'currentStep'
      });
    }
  }

  UserEnrollment.init({
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    LearningPathId: { type: DataTypes.INTEGER, allowNull: false },
    currentModuleId: DataTypes.INTEGER,
    currentStepId: DataTypes.INTEGER,
    completionPercent: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    status: {
      type: DataTypes.ENUM('active', 'completed', 'paused', 'abandoned'),
      allowNull: false,
      defaultValue: 'active'
    },
    enrolledAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    completedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserEnrollment',
    tableName: 'UserEnrollments'
  });

  return UserEnrollment;
};
