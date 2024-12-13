'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    userId:{
      type: DataTypes.INTEGER,
      primaryKey:true
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    password:{
      type: DataTypes.STRING,
      allowNull:false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    phonenumber: {
      type: DataTypes.STRING,
      unique:true,
    },
    roleId:DataTypes.STRING,
    image:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};