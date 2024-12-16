'use strict';

const { Unique } = require('@sequelize/core/decorators-legacy');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RecieveDiscount', {
      discountId: {
        allowNull: false,
        primaryKey:true,
        type:Sequelize.INTEGER,
        references:{
            model:"Discounts",
            key:"discountId"
        }
      },
      userid:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        references:{
            model:"Users",
            key:"userId"
        }
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
    await queryInterface.dropTable('RecieveDiscount');
  }
};