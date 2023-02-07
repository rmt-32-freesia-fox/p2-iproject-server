'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Teacher.hasMany(models.Course, {foreignKey:'TeacherId'})
    }
  }
  Teacher.init({
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"is required"
        },
        notEmpty:{
          msg:'is required'
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        notNull:{
          msg:"is required"
        },
        notEmpty:{
          msg:'is required'
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
          msg:"is required"
        },
        notEmpty:{
          msg:'is required'
        }
      }
    },
    profileImg: {
      type:DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Teacher',
    hooks:{
      beforeCreate(user){
        user.password = hashPassword(user.password)
      }
    }
  });
  return Teacher;
};