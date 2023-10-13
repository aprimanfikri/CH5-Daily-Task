"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const ownerData = [];
    const authData = [];
    for (let i = 1; i <= 5; i++) {
      ownerData.push({
        name: `Owner ${i}`,
        age: 20 + i,
        address: `Address ${i}`,
        role: "Owner",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const hashedPassword = bcrypt.hashSync("password123", 10);
      authData.push({
        email: `owner${i}@mail.com`,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        userId: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("Users", ownerData, {});
    await queryInterface.bulkInsert("Auths", authData, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Auths", null, {});
  },
};
