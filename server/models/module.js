'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    static associate(models) {
      Module.belongsTo(models.LearningPath, {
        foreignKey: 'LearningPathId',
        as: 'learningPath'
      });
      Module.hasMany(models.LessonStep, {
        foreignKey: 'ModuleId',
        as: 'steps'
      });
      Module.hasMany(models.UserModuleProgress, {
        foreignKey: 'ModuleId',
        as: 'userProgresses'
      });
    }
  }

  Module.init({
    LearningPathId: { type: DataTypes.INTEGER, allowNull: false },
    orderIndex: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    description: DataTypes.TEXT,
    estMinutes: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 30 },
    isFinalAssessment: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    passingScore: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    sequelize,
    modelName: 'Module',
    tableName: 'Modules'
  });

  return Module;
};
