const config = require('../config/config');
const pool = require('../config/database')

module.exports.insertNewComponent = () => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO;`, [], (err, results) => {
            if (err) {
                reject(err);
            } else {
                if (results) {

                    return resolve(results);
                } else {
                    return resolve('Error Message');
                }
            }
            
        });
    });
};