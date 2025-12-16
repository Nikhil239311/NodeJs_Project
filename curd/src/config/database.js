require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'training_db',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432
  }
};
