'use strict';
const {generateHash} = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    message: DataTypes.STRING,
    orderId: DataTypes.STRING,
    paymentStatus: DataTypes.STRING,
    accountStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance,options)=>{
    if(!instance.amount){
      instance.amount=100000
    }
    if(!instance.message){
      instance.message=`Support Our Idol`
    }
    instance.orderId=new Date().getTime()
    instance.paymentStatus="pending",
    instance.accountStatus="Reguler"
    instance.password=generateHash(instance.password)
  })
  return User;
};