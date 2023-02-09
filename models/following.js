'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Following extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Following.belongsTo(models.User, {
        foreignKey: 'UserId',
        unique: false,
        as: 'Followers'
      })
      Following.belongsTo(models.User, {
        foreignKey: 'FollowId',
        unique: false,
        as: 'Followings'
      })
    }
  }
  Following.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'Followers'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      FollowId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'Followings'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
    },
    {
      sequelize,
      modelName: 'Following',
    }
  )
  return Following
}
