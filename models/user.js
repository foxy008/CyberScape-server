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
      User.hasMany(models.Log)
    }
  }
  User.init({
    firstName: {
      type:DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty : {
          msg : "Firstname is required"
        },
        notNull : {
          msg : "Firstname is required"
        },
      }
    },
    lastName: {
      type:DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty : {
          msg : "Lastname is required"
        },
        notNull : {
          msg : "Lastname is required"
        },
      }
    },
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
          args : 8,
          msg : "password minimum 8 character"
        },
      }
    },
    quota: {
      type: DataTypes.INTEGER,
      defaultValue: 3
    },
    isVerified: {
      type : DataTypes.BOOLEAN,
      defaultValue : false
    },
  }, {
    hooks:{
      beforeCreate: user => {
        user.password = hashPass(user.password);
        user.firstName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
        user.lastName = user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1);
        return user;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
