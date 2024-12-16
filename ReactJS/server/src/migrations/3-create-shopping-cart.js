'use strict';

const { Unique } = require('@sequelize/core/decorators-legacy');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ShoppingCarts', {
      userId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        references:{
            model:"Users",
            key:"userId"
        }
      },
      productId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        references:{
            model:"Products",
            key:"productId"
        }
      },
      quantity:{
        type:Sequelize.INTEGER,
        validate:{
          min:0.01,
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
    await queryInterface.dropTable('ShoppingCarts');
  }
};