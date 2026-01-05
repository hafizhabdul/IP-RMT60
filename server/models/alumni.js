"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Alumni extends Model {
    static associate(models) {
      // No associations for now
    }
  }
  Alumni.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name cannot be empty" },
        },
      },
      method: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Alumni",
      tableName: "Alumni",
    }
  );
  return Alumni;
};
