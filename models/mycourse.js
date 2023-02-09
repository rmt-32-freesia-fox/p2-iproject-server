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
          notNull: {
            msg: 'UserId is require',
          },
          notEmpty: {
            msg: 'UserId is require',
          },
        },
      },
      isSubscribe: DataTypes.BOOLEAN,
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'imgUrl is require',
          },
          notEmpty: {
            imgUrl: 'imgUrl is require',
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'description is require',
          },
          notEmpty: {
            imgUrl: 'description is require',
          },
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'title is require',
          },
          notEmpty: {
            imgUrl: 'title is require',
          },
        },
      },
      channelTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'channelTitle is require',
          },
          notEmpty: {
            imgUrl: 'channelTitle is require',
          },
        },
      },
      publishedAt: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'publishedAt is require',
          },
          notEmpty: {
            imgUrl: 'publishedAt is require',
          },
        },
      },
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
