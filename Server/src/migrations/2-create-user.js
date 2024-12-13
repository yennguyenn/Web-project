'use strict';

const { Unique } = require('@sequelize/core/decorators-legacy');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      password:{
        type: Sequelize.STRING,
        allowNull:false,
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      gender:{
          type:Sequelize.BOOLEAN
      },
      phonenumber: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      roleId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Roles",
          key:"roleId"
        }
      },
      image:{
        type:Sequelize.STRING
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
    await queryInterface.dropTable('Users');
  }
};