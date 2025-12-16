const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Department = sequelize.define('Department', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  department_code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'Departments'
});

module.exports = Department;
