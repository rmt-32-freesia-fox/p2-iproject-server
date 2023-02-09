'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Token.init(
    {
      code: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Token',
      hooks: {
        beforeCreate(instance, options) {
          instance.status = false;
        },
      },
    }
  );
  return Token;
};
