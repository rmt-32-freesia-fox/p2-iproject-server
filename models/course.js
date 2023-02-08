'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Teacher, { foreignKey:'TeacherId' })
      Course.hasMany(models.Material, {foreignKey:'CourseId'})
      Course.hasMany(models.Class, {foreignKey:'CourseId'})
      Course.belongsTo(models.Category,{foreignKey:'CategoryId'})
    }
  }
  Course.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:'course name is required'
        },
        notEmpty:{
          msg: 'course name is required'
        }
      }
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:'description is required'
        },
        notEmpty:{
          msg: 'description is required'
        }
      }
    },
    imgUrl:{
      type:DataTypes.STRING
    },
    TeacherId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'Teachers',
        key:'id'
      },
      onDelete:'cascade'
    },
    CategoryId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'Categories',
        key:'id'
      },
      onDelete:'cascade'
    },
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};