'use strict';

const { encryptPassword } = require('../helpers/bcrypt');

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

    let USER = [
    {
      email:'Kamil@mail.com',
      password:encryptPassword('12345'),
      createdAt: new Date(),
      updatedAt: new Date(),
      
    }
   ]

  //  console.log(USER);

  await queryInterface.bulkInsert('Users',USER)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users',null,{truncate:true,cascade:true,restartIdentity:true})
  }
};
