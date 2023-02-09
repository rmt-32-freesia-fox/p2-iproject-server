'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Link)
      User.hasMany(models.Log)
      // User.hasMany(models.Following)
      User.hasOne(models.Github)
      User.hasOne(models.Discord)
      User.hasOne(models.Spotify)
      User.belongsToMany(models.User, {
        through: models.Following,
        as: 'Followings',
        foreignKey: 'UserId',
      })
      User.belongsToMany(models.User, {
        through: models.Following,
        as: 'Followers',
        foreignKey: 'FollowId',
      })
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          validUsername(username) {
            if (username === 'callback') throw 'Invalid Username'
            if (username == '0') throw 'Invalid Username'
            const valid = username.match(/^[a-zA-Z0-9\-\_]+$/)
            if(!valid) throw 'Invalid Username'
          },
        },
      },
      name: { allowNull: false, type: DataTypes.STRING },
      profilePicture: DataTypes.STRING,
      bio: DataTypes.TEXT,
      background: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
