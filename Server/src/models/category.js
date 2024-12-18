'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    categoryId: {
        type :DataTypes.INTEGER, 
        primaryKey:true,
    },
    description:{
      type: DataTypes.STRING,
      allowNull : false,
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};