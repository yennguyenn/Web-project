'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  email: DataTypes.STRING,
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  address: DataTypes.STRING,
  gender: DataTypes.BOOLEAN,
  roleid: DataTypes.STRING,
  typeRole: DataTypes.STRING,
  keyRole: DataTypes.STRING,

  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin@gmail.com',
        password:"12345",//plain text
        firstName: 'Dang',
        lastName: 'Nhan Hoa',
        gender : 1,
        typeRole:'ROLE',
        keyRole:'R1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
