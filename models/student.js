'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init({
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
    modelName: 'Student',
    hooks:{
      beforeCreate(user){
        user.password = hashPassword(user.password)
      }
    }
  });
  return Student;
};