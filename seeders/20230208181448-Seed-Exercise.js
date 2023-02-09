"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const exercises = require("../data/exercise.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Exercises", exercises, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Exercises", null, {});
  },
};
