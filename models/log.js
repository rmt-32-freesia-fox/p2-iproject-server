'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Log.init(
    {
      type: { allowNull: false, type: DataTypes.STRING },
      LinkId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'Links', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
    },
    {
      sequelize,
      modelName: 'Log',
    }
  )
  return Log
}
