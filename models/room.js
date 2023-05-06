'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.hasMany(models.RoomNFT)
      Room.belongsTo(models.Artist)
    }
  }
  Room.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    cursor: DataTypes.STRING,
    ArtistId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Artists',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};
