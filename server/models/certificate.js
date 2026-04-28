'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Certificate extends Model {
    static associate(models) {
      Certificate.belongsTo(models.User, {
        foreignKey: 'UserId',
        as: 'user'
      });
      Certificate.belongsTo(models.LearningPath, {
        foreignKey: 'LearningPathId',
        as: 'learningPath'
      });
    }
  }

  Certificate.init({
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    LearningPathId: { type: DataTypes.INTEGER, allowNull: false },
    serialNumber: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    score: { type: DataTypes.FLOAT, allowNull: false },
    issuedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    pdfUrl: DataTypes.STRING(500),
    qrToken: { type: DataTypes.STRING(100), allowNull: false, unique: true }
  }, {
    sequelize,
    modelName: 'Certificate',
    tableName: 'Certificates'
  });

  return Certificate;
};
