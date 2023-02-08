"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const myexercises = require("../data/myexercise.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("MyExercises", myexercises, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("MyExercises", null, {});
  },
};
