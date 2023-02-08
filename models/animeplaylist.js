'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnimePlaylist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AnimePlaylist.belongsTo(models.User,{foreignKey: "UserId"})
      AnimePlaylist.belongsTo(models.Anime,{foreignKey: "AnimeId"})
    }
  }
  AnimePlaylist.init({
    UserId: DataTypes.INTEGER,
    AnimeId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    totalEpisodes: DataTypes.INTEGER,
    watchedEpisodes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AnimePlaylist',
  });
  return AnimePlaylist;
};