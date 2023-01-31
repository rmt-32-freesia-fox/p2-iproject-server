'use strict';
const { Model } = require('sequelize');
<<<<<<< HEAD
const { encryptPass } = require('../helpers/bcrypt');
=======
>>>>>>> a1497b91cad98e8764c6e47aff5c1f1b82c03dba
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.MyCourse);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'username is require',
          },
          notEmpty: {
            msg: 'username is require',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'email is already registered',
        },
        validate: {
          notNull: {
            msg: 'email is require',
          },
          notEmpty: {
            msg: 'email is require',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'password is require',
          },
          notEmpty: {
            msg: 'password is require',
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
<<<<<<< HEAD
          notNull: {
=======
          notNullL: {
>>>>>>> a1497b91cad98e8764c6e47aff5c1f1b82c03dba
            msg: 'role is require',
          },
          notEmpty: {
            msg: 'role is require',
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Phone Number is require',
          },
          notNull: {
            msg: 'Phone Number is require',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
<<<<<<< HEAD
        beforeCreate(instance, options) {
          instance.password = encryptPass(instance.password);
        },
=======
        beforeCreate(instance, options) {},
>>>>>>> a1497b91cad98e8764c6e47aff5c1f1b82c03dba
      },
    }
  );
  return User;
};
