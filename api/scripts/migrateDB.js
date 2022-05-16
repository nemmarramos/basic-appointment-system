/* eslint-disable import/no-dynamic-require */
const { exec } = require('child_process');
const mysql = require('mysql2/promise');
const { DB_PASSWORD, DB_USER, DB_HOST } = require('../src/env');

async function migrateDatabase() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: 3306,
    user: DB_USER,
    password: DB_PASSWORD,
  });
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`,
  );
  await connection.end();
  return new Promise((resolve, reject) => {
    exec(
      `DB_NAME=${process.env.DB_NAME} npx sequelize-cli db:migrate`,
      (error) => {
        if (error) return reject();
        return resolve();
      },
    );
  });
}

async function initSeedDatabase() {
  return new Promise((resolve, reject) => {
    exec(
      `DB_NAME=${process.env.DB_NAME} npx sequelize-cli db:seed:all`,
      (error) => {
        if (error) return reject();
        return resolve();
      },
    );
  });
}

module.exports = {
  migrateDatabase,
  initSeedDatabase,
};
