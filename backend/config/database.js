const mysql = require('mysql');
const config = require('./config');
//To find out more on createPool:
//https://www.npmjs.com/package/mysql#pooling-connections
const pool = mysql.createPool({
        connectionLimit: 100,
        host: 'remotemysql.com',
        user: 'Htge9DZLeE',
        password: 'J9px4se9RA',
        database: 'Htge9DZLeE',
        multipleStatements: true
    });
/* const pool = mysql.createPool({
        connectionLimit: 100,
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'tas',
        multipleStatements: true
    }); */

 module.exports=pool;