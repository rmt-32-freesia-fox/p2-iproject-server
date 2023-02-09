'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('MyCourses', 'title', { type: Sequelize.STRING, allowNull: false });
    await queryInterface.addColumn('MyCourses', 'channelTitle', { type: Sequelize.TEXT, allowNull: false });
    await queryInterface.addColumn('MyCourses', 'publishedAt', { type: Sequelize.TEXT, allowNull: false });

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('MyCourses', 'title');
    await queryInterface.removeColumn('MyCourses', 'channelTitle');
    await queryInterface.removeColumn('MyCourses', 'publishedAt');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
