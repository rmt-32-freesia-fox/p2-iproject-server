'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Anime,{through: models.AnimePlaylist, foreignKey:"UserId"})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Username is required",
        },
        notNull: {
          msg: "Username is required",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Email is required",
        },
        notNull: {
          msg: "Email is required",
        },
        isEmail: {
          args: true,
          msg: "Email is not valid",
        },
        isUnique(value) { 
          return User.findOne({where:{email:value}})
            .then((email) => {
              if (email) {
                throw new Error('Email has been registered');
              }
            })
        }
      },
  
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required",
        },
        notNull: {
          msg: "Password is required",
        },
        minimumLength() {
          if (this.password.length < 5) {
            throw new Error("Minimal password is 5 character");
          }
        },
      },
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async (user) => {
    let hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
  })
  return User;
};