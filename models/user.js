'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helper/bycript');
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
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'username is required',
          },
          notEmpty: {
            msg: 'username is required',
          },
        },
      },
      email: {
        unique: {
          msg: 'e-mail already registered',
        },
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'e-mail must be unique',
        },
        validate: {
          notNull: {
            msg: 'e-mail is required',
          },
          notEmpty: {
            msg: 'e-mail is required',
          },
          isEmail: {
            msg: 'email format (foo@bar.com)',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'password is required',
          },
          notEmpty: {
            msg: 'password is required',
          },
          len: {
            args: [5],
            msg: 'minimum password length is 5',
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate(instance) {
          instance.password = hashPassword(instance.password);
        },
      },
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
