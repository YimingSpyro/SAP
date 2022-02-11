const mysql = require('mysql');
const config = require('./config');
//To find out more on createPool:
//https://www.npmjs.com/package/mysql#pooling-connections
/* //Localhost Dev URL
const pool = mysql.createPool({
        connectionLimit: 100,
        host: 'sap-united-db.chaoomqaxpcs.ap-southeast-1.rds.amazonaws.com',
        user: 'root',
        password: 'SbFdYtnnFqOjdi2ra5NK',
        database: 'tas',
        multipleStatements: true
}); */
//Live URL
const pool = mysql.createPool({
        connectionLimit: 65,
        host: config.databaseHost,
        user: config.databaseUserName,
        password: config.databasePassword,
        database: config.databaseName,
        multipleStatements: true
});
 module.exports=pool;