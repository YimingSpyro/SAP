//config.js
const dotenv = require('dotenv');
dotenv.config(); //Build the process.env object.
module.exports = {
    databaseHost: process.env.DB_HOST,
    databaseUserName: process.env.DB_USERNAME,
    databasePassword: process.env.DB_PASSWORD,
    databaseName: process.env.DB_DATABASE_NAME,
    
    JWTKey: process.env.JWTKEY,
    JWTExpire: process.env.JWT_EXPIRES_IN
};
//Reference