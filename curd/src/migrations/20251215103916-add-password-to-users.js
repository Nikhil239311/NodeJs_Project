'use strict';

const { noTrueLogging } = require('sequelize/lib/utils/deprecations');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: true, // usually password should not be null
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'password');
  }
};
