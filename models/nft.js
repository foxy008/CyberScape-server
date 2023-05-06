'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NFT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NFT.hasMany(models.RoomNFT);
      NFT.hasMany(models.Rating);
    }
  }
  NFT.init({
    token: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    averageRating: DataTypes.FLOAT,
    ratingLength: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'NFT',
  });
  return NFT;
};
