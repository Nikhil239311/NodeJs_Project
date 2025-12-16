'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'department', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Users', 'salary', {
      type: Sequelize.DECIMAL(10, 2), // suitable for money
      allowNull: true
    });

    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'department');
    await queryInterface.removeColumn('Users', 'salary');
    await queryInterface.removeColumn('Users', 'role');
  }
};
