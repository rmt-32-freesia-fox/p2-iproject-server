'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/helpers')

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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: `email is already registered` },
      validate: {
        notNull: { msg: `email is required` },
        notEmpty: { msg: `email is required` },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        passLength(password) {
          if (password.length < 5) throw { msg: 'Password must at least contain 5 or more characters' }
        },
        notNull: { msg: `password is required` },
        notEmpty: { msg: `password is required` },
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `role is required` },
        notEmpty: { msg: `role is required` },
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password)
    user.role = `basic`
  })
  return User;
};