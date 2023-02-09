'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPlaylist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserPlaylist.belongsTo(models.User, { foreignKey: 'UserId', sourceKey: 'id' })
      UserPlaylist.belongsTo(models.Playlist, { foreignKey: 'PlaylistId', sourceKey: 'id' })
    }
  }
  UserPlaylist.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `UserId is required` },
        notEmpty: { msg: `UserId is required` },
      }
    },
    PlaylistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `PlaylistId is required` },
        notEmpty: { msg: `PlaylistId is required` },
      }
    }
  }, {
    sequelize,
    modelName: 'UserPlaylist',
  });
  return UserPlaylist;
};