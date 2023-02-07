'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Auction.init({
    UserId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    color: DataTypes.STRING,
    startPrice: DataTypes.INTEGER,
    multiple: DataTypes.INTEGER,
    startTime: DataTypes.DATE,
    finishTime: DataTypes.DATE,
    finishPrice: DataTypes.INTEGER,
    winnerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Auction',
  });
  return Auction;
};