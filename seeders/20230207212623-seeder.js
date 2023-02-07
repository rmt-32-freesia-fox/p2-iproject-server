'use strict';

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Teachers', require('../db/data.json').teachers.map(e=>{
      e.createdAt = new Date()
      e.updatedAt = new Date()
      e.password = hashPassword(e.password)
      return e
    }), {});
    await queryInterface.bulkInsert('Students', require('../db/data.json').students.map(e=>{
      e.createdAt = new Date()
      e.updatedAt = new Date()
      e.password = hashPassword(e.password)
      return e
    }), {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
    */
    await queryInterface.bulkDelete('Teachers', null, {});
    await queryInterface.bulkDelete('Students', null, {});
  }
};
