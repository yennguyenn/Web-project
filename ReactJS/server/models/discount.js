'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Example association:
      // Discount.hasMany(models.Product, { foreignKey: 'discountId' });
    }
  }
  Discount.init(
    {
      discountId: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Explicitly mark as primary key
        autoIncrement: true, // Automatically increment
        allowNull: false, // Prevent null values
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true, // Optional field
      },
    },
    {
      sequelize,
      modelName: 'Discount',
      tableName: 'discounts', // Optional: explicitly set table name
      timestamps: true, // Adds createdAt and updatedAt columns by default
    }
  );
  return Discount;
};
