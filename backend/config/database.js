const mysql = require('mysql');
const config = require('./config');
//To find out more on createPool:
//https://www.npmjs.com/package/mysql#pooling-connections
const pool = mysql.createPool({
        connectionLimit: 100,
        host: 'localhost',
        user: 'root',
        password: 'TYKdatabase@123',
        database: 'tas',
        multipleStatements: true
    });

 module.exports=pool;