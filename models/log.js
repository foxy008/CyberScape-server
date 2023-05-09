'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Log.belongsTo(models.User)
    }
  }
  Log.init({
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    orderId: DataTypes.STRING,
    status:{
      type: DataTypes.STRING,
      defaultValue : "Pending"
    }
  }, {
    sequelize,
    modelName: 'Log',
  });
  return Log;
};