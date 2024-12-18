'use strict';

const { Unique } = require('@sequelize/core/decorators-legacy');
const { TEXT } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Category', {
      categoryId:{
        autoIncrement:true,
        primaryKey:true,
        type:Sequelize.INTEGER,
        allowNull:false,
      },
     description:{
        type:Sequelize.STRING,
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
    await queryInterface.dropTable('Category');
  }
};