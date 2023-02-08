'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.hasMany(models.Subscribe)
    }
  }
  Event.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Title is required'
        },
        notEmpty: {
          msg: 'Title is required'
        },
      }
    },
    link: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Link is required'
        },
        notEmpty: {
          msg: 'Link is required'
        },
      }
    },
    eventDate: {
      allowNull: false,
      type: DataTypes.DATE,
      validate: {
        notNull: {
          msg: 'EventDate is required'
        },
        notEmpty: {
          msg: 'EventDate is required'
        },
      }
    },
    imageUrl: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'ImageUrl is required'
        },
        notEmpty: {
          msg: 'ImageUrl is required'
        },
      }
    },
    desc: {
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        notNull: {
          msg: 'Desc is required'
        },
        notEmpty: {
          msg: 'Desc is required'
        },
      }
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: 'Price is required'
        },
        notEmpty: {
          msg: 'Price is required'
        },
      }
    },
    status: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};