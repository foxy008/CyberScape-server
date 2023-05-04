'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RoomNFTs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      posX: {
        type: Sequelize.INTEGER
      },
      posY: {
        type: Sequelize.INTEGER
      },
      posZ: {
        type: Sequelize.INTEGER
      },
      RoomId: {
        type: Sequelize.INTEGER
      },
      NFTId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RoomNFTs');
  }
};