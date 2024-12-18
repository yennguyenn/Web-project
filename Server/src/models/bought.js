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
    invoiceId: {
      type:DataTypes.INTEGER, 
      allowNull:false,
    },
    productId: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    quantity: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        min:0.01
      }
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10,2),
    }
  }, {
    sequelize,
    modelName: 'Bougth',
  });
  return Bougth;
};