'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyCourse.belongsTo(models.User);
    }
  }
  MyCourse.init(
    {
      idCourse: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Course is require',
          },
          notEmpty: {
            msg: 'Course is require',
          },
        },
      },
      UserId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          msg: 'UserId is require',
        },
        notEmpty: {
          msg: 'UserId is require',
        },
      },
      isSubscribe: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'MyCourse',
      hooks: {
        beforeCreate(instance, options) {
          instance.isSubscribe = false;
        },
      },
    }
  );
  return MyCourse;
};
