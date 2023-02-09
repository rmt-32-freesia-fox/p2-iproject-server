'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Item);
      Transaction.belongsTo(models.User);
    }
  }
  Transaction.init(
    {
      quantity: DataTypes.INTEGER,
      status: DataTypes.STRING,
      subtotal: DataTypes.INTEGER,
      ItemId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Transaction',
    }
  );
  return Transaction;
};
