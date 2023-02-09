'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    await queryInterface.addColumn('Events', 'status', {
      type: Sequelize.DataTypes.STRING,
      defaultValue: 'pending'
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
    */
    await queryInterface.removeColumn('Events', 'status', {});
  }
};
