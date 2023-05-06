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
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      allowNull: false,
      unique : {
        args : true,
        msg : "Email already used"
      },
      validate : {
        notEmpty: {
          msg : "Email is required"
        },
        notNull : {
          msg : "Email is required"
        },
        isEmail:{
          args : true,
          msg : "Invalid email format"
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty : {
          msg : "Password is required"
        },
        notNull : {
          msg : "Password is required"
        },
        min : {
          args : 5,
          msg : "password minimal 5 huruf"
        },
      }
    },
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
