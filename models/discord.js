'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Discord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Discord.belongsTo(models.User)
    }
  }
  Discord.init(
    {
      UserId: {
        unique: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      email: { type: DataTypes.STRING, allowNull: false },
      discordId: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: { type: DataTypes.STRING, allowNull: false },
      discriminator: { type: DataTypes.INTEGER, allowNull: false },
      access_token: { type: DataTypes.STRING, allowNull: false },
      refresh_token: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Discord',
    }
  )
  return Discord
}
