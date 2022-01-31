const pool = require('../config/database')

// SECTION
module.exports.getAllAnnouncements = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM announcement ORDER BY announcement_start ASC`, [], (err, results) => {
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

module.exports.createAnnouncement = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO announcement (announcement_type,fk_announcement_roles,announcement_start,announcement_end,announcement_message,announcement_subject) VALUES (?,?,?,?,?,?)`, data, (err, results) => {
            if (err) {
                console.error(err);
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