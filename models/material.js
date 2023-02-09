'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Material.belongsTo(models.Course,{foreignKey:'CourseId'})
    }
  }
  Material.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:'is required'
        },
        notEmpty:{
          msg:'is required'
        }
      }
    },
    videoId: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:'is required'
        },
        notEmpty:{
          msg:'is required'
        }
      }
    },
    docsId: {
      type:DataTypes.STRING,
    },
    CourseId:{
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:"Courses",
        key:"id"
      },
      onDelete:'cascade'
    }
  }, {
    sequelize,
    modelName: 'Material',
  });
  return Material;
};