const {
  DB_NAME, DB_USER, DB_PASSWORD, DB_HOST,
} = require('../env');

module.exports = {
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  dialect: 'mysql',
};
