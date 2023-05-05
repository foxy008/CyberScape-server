'use strict';
const { hashPass } = require("../helpers/bcrypt")
const fs = require ("fs")


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"))
    // console.log(data);
    data.forEach((el) => {
      el.password = hashPass(el.password)
      el.createdAt = new Date(),
      el.updatedAt = new Date()  
      return el      
    });
    await queryInterface.bulkInsert('Users', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});

  }
};
