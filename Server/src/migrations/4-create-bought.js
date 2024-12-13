'use strict';

const { Unique } = require('@sequelize/core/decorators-legacy');
const invoice = require('../models/invoice');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bought', {
      invoiceId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
            model:"Invoices",
            key:"invoiceId"
        }
      },
      productId:{
        allowNull:false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model:"Products",
          key:"productId"
        }
      },
      quantity: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            min:0.01,
        }
    },
    totalPrice:{
        type: Sequelize.DECIMAL(10,2)
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
    await queryInterface.dropTable('Bought');
  }
};