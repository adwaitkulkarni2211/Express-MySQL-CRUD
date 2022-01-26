const myqsl = require("mysql");
require('dotenv').config();

exports.connection = myqsl.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})