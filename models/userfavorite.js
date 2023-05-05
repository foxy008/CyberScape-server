'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserFavorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserFavorite.belongsTo(models.User);
      UserFavorite.belongsTo(models.NFT);
    }
  }
  UserFavorite.init({
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
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
    modelName: 'UserFavorite',
  });
  return UserFavorite;
};
