require('dotenv').config();

module.exports = {
  APP_PORT: process.env.PORT || 5678,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || 'password',
  DB_NAME: process.env.DB_NAME || 'growsari',
  APP_SECRET: process.env.APP_SECRET || 'growsari2022',
};
