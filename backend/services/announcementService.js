const pool = require('../config/database')

// SECTION
module.exports.getAllAnnouncements = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM announcement`, [], (err, results) => {
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