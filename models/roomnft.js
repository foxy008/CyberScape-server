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
    }
  }
  RoomNFT.init({
    posX: DataTypes.INTEGER,
    posY: DataTypes.INTEGER,
    posZ: DataTypes.INTEGER,
    RoomId: DataTypes.INTEGER,
    NFTId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RoomNFT',
  });
  return RoomNFT;
};