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

    const PLANTS= require('../Plant.json').map((el)=>{
      el.createdAt=el.updatedAt=new Date()
      return el
    })


    // console.log(PLANTS);
    await queryInterface.bulkInsert('Plants',PLANTS)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('Plants',null,{truncate:true,cascade:true,restartIdentity:true})
  }
};
