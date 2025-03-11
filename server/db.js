const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 5,

    // Need to check these
    supportBigNumbers: true,
    bigNumberStrings: true,
    insertIdAsNumber: true,
});

module.exports = pool;