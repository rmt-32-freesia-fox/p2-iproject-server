"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyExercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyExercise.belongsTo(models.User);
      MyExercise.belongsTo(models.Exercise);
    }
  }
  MyExercise.init(
    {
      UserId: DataTypes.INTEGER,
      ExerciseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "MyExercise",
    }
  );
  return MyExercise;
};
