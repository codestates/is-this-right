'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chats_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  chats_user.init(
    {},
    {
      sequelize,
      modelName: 'chats_user',
    },
  );
  return chats_user;
};
