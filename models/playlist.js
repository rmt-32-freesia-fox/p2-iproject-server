'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Playlist.hasMany(models.UserPlaylist, { foreignKey: 'PlaylistId' })
    }
  }
  Playlist.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `title is required` },
        notEmpty: { msg: `title is required` },
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `image is required` },
        notEmpty: { msg: `image is required` },
      }
    },
    audio: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `audio is required` },
        notEmpty: { msg: `audio is required` },
      }
    },
    post_content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `post_ is required` },
        notEmpty: { msg: `post_ is required` },
      }
    },
    published_at: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `publi is required` },
        notEmpty: { msg: `publi is required` },
      }
    }
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};