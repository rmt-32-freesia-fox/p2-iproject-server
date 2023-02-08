'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Anime.belongsToMany(models.User,{through: models.AnimePlaylist, foreignKey:"AnimeId"})
    }
  }
  Anime.init({
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    episodes: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Anime',
  });
  return Anime;
};