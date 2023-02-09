'use strict';

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

    const CATEGORY= require('../Category.json').map(el =>{
      return {
        name: el.name,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    // console.log(CATEGORY);

    await queryInterface.bulkInsert('Categories',CATEGORY)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Categories',null,{truncate:true,cascade:true,restartIdentity:true})
  }
};
