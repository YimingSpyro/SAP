const pool = require('../config/database')

// SECTION
module.exports.getAllAnnouncements = (order) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM announcement ORDER BY announcement_start ` + order, [], (err, results) => {
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
module.exports.updateAnnouncement = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE announcement 
         SET announcement_type = ?, fk_announcement_roles = ?, announcement_start = ?, announcement_end = ?, announcement_message = ?, announcement_subject = ? 
         WHERE announcement_id = ?`, data, (err, results) => {
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
module.exports.deleteAnnouncement = (announcement_id) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM announcement WHERE announcement_id = ?`, [announcement_id], (err, results) => {
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