'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LessonStep extends Model {
    static associate(models) {
      LessonStep.belongsTo(models.Module, {
        foreignKey: 'ModuleId',
        as: 'module'
      });
      LessonStep.hasMany(models.UserStepProgress, {
        foreignKey: 'LessonStepId',
        as: 'userProgresses'
      });
      LessonStep.hasMany(models.QuizQuestion, {
        foreignKey: 'LessonStepId',
        as: 'quizQuestions'
      });
    }
  }

  LessonStep.init({
    ModuleId: { type: DataTypes.INTEGER, allowNull: false },
    orderIndex: { type: DataTypes.INTEGER, allowNull: false },
    kind: {
      type: DataTypes.ENUM('animated', 'reading', 'quiz'),
      allowNull: false,
      defaultValue: 'reading'
    },
    title: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    contentJson: { type: DataTypes.JSONB, allowNull: false, defaultValue: {} },
    durationSeconds: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 300 },
    simulationRef: DataTypes.STRING(100)
  }, {
    sequelize,
    modelName: 'LessonStep',
    tableName: 'LessonSteps'
  });

  return LessonStep;
};
