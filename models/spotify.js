'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Spotify extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spotify.belongsTo(models.User)
    }

    get isExpired() {
      return Date.now() - new Date(this.updatedAt).getTime() > 3600000
    }
  }
  Spotify.init(
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
      spotifyId: { type: DataTypes.STRING, allowNull: false, unique: true },
      username: { type: DataTypes.STRING, allowNull: false },
      access_token: { type: DataTypes.STRING, allowNull: false },
      refresh_token: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Spotify',
    }
  )
  return Spotify
}
