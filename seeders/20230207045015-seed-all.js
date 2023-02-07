"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = require("../db/data.json").users.map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });

    const auctions = require("../db/data.json").auctions.map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });

    const images = require("../db/data.json").images.map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });

    const histories = require("../db/data.json").histories.map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });

    await queryInterface.bulkInsert("Users", users);
    await queryInterface.bulkInsert("Auctions", auctions);
    await queryInterface.bulkInsert("Images", images);
    await queryInterface.bulkInsert("Histories", histories);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Auctions", null, {});
    await queryInterface.bulkDelete("Images", null, {});
    await queryInterface.bulkDelete("Histories", null, {});
  },
};
