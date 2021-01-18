const mysql = require("mysql");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const connection = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

module.exports = connection;
