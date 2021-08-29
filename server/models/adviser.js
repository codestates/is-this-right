'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class adviser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  adviser.init(
    {
      // userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      category: DataTypes.STRING,
      detail: DataTypes.STRING,
      url: DataTypes.STRING,
      gender: DataTypes.STRING,
      state: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'adviser',
    },
  );
  return adviser;
};
