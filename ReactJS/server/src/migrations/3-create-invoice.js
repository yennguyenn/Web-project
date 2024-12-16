'use strict';

const { Unique } = require('@sequelize/core/decorators-legacy');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invoices', {
      invoiceId: {
        allowNull: false,
        primaryKey: true,
        autoIncrement:true,
        type: Sequelize.INTEGER
      },
      userId:{
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:"Users",
          key:"userId"
        }
      },
    totalPrice:{
        type: Sequelize.DECIMAL(10,2),
        allowNull:false,
    },
    paymentId:{
      type:Sequelize.INTEGER,
      references:{
        model:"Payments",
        key:"paymentId"
      },
      allowNull:false
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
    await queryInterface.dropTable('Invoices');
  }
};