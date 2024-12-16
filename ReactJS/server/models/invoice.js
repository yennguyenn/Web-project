'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invoice.init({
    invoiceId: DataTypes.STRING,
    userId: DataTypes.STRING,
    totalPrice: DataTypes.DECIMAL(10,2),
    paymentId: DataTypes.INTEGER,
    createAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};