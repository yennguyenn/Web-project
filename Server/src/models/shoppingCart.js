'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShoppingCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ShoppingCart.init({
    userId: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    productId:{
      type :DataTypes.STRING,
      allowNull:false,
    } ,
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ShoppingCart',
  });
  return ShoppingCart;
};