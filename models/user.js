'use strict';
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
    userId: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: { 
        msg:'userId must be unique'
      },
      validate: {
        notNull: {
          msg : 'userId is required'
        },
        notEmpty: {
          msg : 'userId is required'
        }
      },
    }, 
    isPaid:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};