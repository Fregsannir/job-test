const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../', process.env.NODE_ENV === 'development' ? 'dev.env' : '.env'),
});

module.exports = {
  development: {
    username: process.env.APP_DB_USERNAME,
    password: process.env.APP_DB_PASSWORD,
    database: process.env.APP_DB_NAME,
    host: 'localhost',
    port: process.env.APP_DB_PORT,
    dialect: 'postgres',
  },
  test: {
    username: process.env.APP_DB_USERNAME,
    password: process.env.APP_DB_PASSWORD,
    database: process.env.APP_DB_NAME,
    host: 'localhost',
    port: process.env.APP_DB_PORT,
    dialect: 'postgres',
  },
  production: {
    username: process.env.APP_DB_USERNAME,
    password: process.env.APP_DB_PASSWORD,
    database: process.env.APP_DB_NAME,
    host: 'localhost',
    port: process.env.APP_DB_PORT,
    dialect: 'postgres',
  },
};
