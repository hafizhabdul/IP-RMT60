'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LearningPath extends Model {
    static associate(models) {
      LearningPath.hasMany(models.Module, {
        foreignKey: 'LearningPathId',
        as: 'modules'
      });
      LearningPath.hasMany(models.UserEnrollment, {
        foreignKey: 'LearningPathId',
        as: 'enrollments'
      });
      LearningPath.hasMany(models.Certificate, {
        foreignKey: 'LearningPathId',
        as: 'certificates'
      });
      LearningPath.belongsTo(models.LearningPath, {
        foreignKey: 'prerequisitePathId',
        as: 'prerequisite'
      });
      LearningPath.belongsTo(models.User, {
        foreignKey: 'instructorId',
        as: 'instructor'
      });
    }
  }

  LearningPath.init({
    code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: { notEmpty: true }
    },
    method: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: { isIn: [['UT', 'MT', 'PT', 'RT', 'VT', 'ET']] }
    },
    level: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: { isIn: [['Level I', 'Level II', 'Level III']] }
    },
    title: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    description: DataTypes.TEXT,
    totalModules: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    estHours: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    prerequisitePathId: { type: DataTypes.INTEGER, allowNull: true },
    orderIndex: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    isPublished: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    instructorId: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    sequelize,
    modelName: 'LearningPath',
    tableName: 'LearningPaths'
  });

  return LearningPath;
};
