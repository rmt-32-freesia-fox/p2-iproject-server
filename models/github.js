'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Github extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Github.belongsTo(models.User, { onDelete: 'cascade' })
    }
  }
  Github.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      email: { type: DataTypes.STRING, allowNull: false },
      access_token: { type: DataTypes.STRING, allowNull: false },
      githubId: { type: DataTypes.INTEGER, unique: true, allowNull: false },
      username: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Github',
    }
  )
  return Github
}
