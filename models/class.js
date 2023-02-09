'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Class.belongsTo(models.Student,{foreignKey:'StudentId'})
      Class.belongsTo(models.Course,{foreignKey:'CourseId'})
      
    }
  }
  Class.init({
    StudentId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'Students',
        key:'id'
      }
    },
    CourseId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'Courses',
        key:'id'
      }
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};