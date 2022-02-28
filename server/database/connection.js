require('dotenv').config()

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});


module.exports = pool


