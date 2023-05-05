'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Rating);
      User.hasMany(models.UserFavorite);
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    quota: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    hooks:{
      beforeCreate: user => {
        user.password = hashPass(user.password);
        return user;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
