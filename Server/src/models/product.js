'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    productId:{
      type : DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    productName: DataTypes.STRING,
    price:DataTypes.DECIMAL(10,2),
    categoryId: DataTypes.INTEGER,
    quantityInStock: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};