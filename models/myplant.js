'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyPlant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyPlant.belongsTo(models.User)
      MyPlant.belongsTo(models.Plant)
    }
  }
  MyPlant.init({
    UserId:{
      type:DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id"
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'

,    },
      
    ProductId: {
      type:DataTypes.INTEGER,
      references: {
        model: "Plant",
        key: "id"
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'

    },
    
    quantity: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'MyPlant',
  });
  return MyPlant;
};