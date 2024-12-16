'use strict';

const { Unique } = require('@sequelize/core/decorators-legacy');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // porductName: DataTypes.STRING,
    // price:DataTypes.INTEGER,
    // description: DataTypes.TEXT,
    // image: DataTypes.STRING
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      productId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      price:{
        type: Sequelize.DECIMAL(10,2)
      },
      productTypeId:{
        type:Sequelize.INTEGER,
        references:{
          model:"ProductTypes",
          key:"productTypeId"
        }
      },
      quantityInStock:{
        type:Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.STRING
      },
     
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};