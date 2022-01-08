const config = require('../config/config');
const pool = require('../config/database')

module.exports.getProfilePicture = (staff_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM profile_picture WHERE fk_staff_id = ?;',[staff_id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
};

exports.updateProfilePicture = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM profile_picture WHERE fk_staff_id = ?;', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
            connection.release();
        })
    })
}