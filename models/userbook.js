'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      UserBook.belongsTo(models.User, { foreignKey: 'UserId' })
      UserBook.belongsTo(models.Book, { foreignKey: 'BookId' })
    }
  }
  UserBook.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'UserId is required' },
        notEmpty: { msg: 'UserId is required' }
      }
    },
    BookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'BookId is required' },
        notEmpty: { msg: 'BookId is required' }
      }
    }
  }, {
    sequelize,
    modelName: 'UserBook',
  });
  return UserBook;
};