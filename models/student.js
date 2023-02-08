'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.hasMany(models.Class, {foreignKey:'StudentId'})
    }
  }
  Student.init({
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"username is required"
        },
        notEmpty:{
          msg:'username is required'
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        notNull:{
          msg:"email is required"
        },
        notEmpty:{
          msg:'email is required'
        },
        isEmail:{
          msg:'email format is wrong'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"password is required"
        },
        notEmpty:{
          msg:'password is required'
        }
      }
    },
    role: {
      type:DataTypes.STRING,
    },
    profileImg: {
      type:DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Student',
    hooks:{
      beforeCreate(user){
        user.password = hashPassword(user.password)
        user.role = 'student'
      }
    }
  });
  return Student;
};