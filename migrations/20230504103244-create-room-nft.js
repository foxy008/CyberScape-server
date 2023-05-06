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
        type: Sequelize.INTEGER,
        references: {
          model: 'Rooms',
          key: 'id'
        }
      },
      NFTId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'NFTs',
          key: 'id'
        }
      },
      AuthorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Authors',
          key: 'id'
        }
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
