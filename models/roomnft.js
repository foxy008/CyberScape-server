'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomNFT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RoomNFT.belongsTo(models.Room);
      RoomNFT.belongsTo(models.NFT);
    }
  }
  RoomNFT.init({
    position: DataTypes.STRING,
    RoomId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Rooms',
        key: 'id'
      }
    },
    NFTId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'NFTs',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'RoomNFT',
  });
  return RoomNFT;
};
