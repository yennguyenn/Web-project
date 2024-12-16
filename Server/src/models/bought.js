'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bougth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bougth.init({
    invoiceId: DataTypes.INTEGER, 
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL(10,2),
  }, {
    sequelize,
    modelName: 'Bougth',
  });
  return Bougth;
};